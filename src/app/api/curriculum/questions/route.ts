import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser, getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const weekNumber = parseInt(searchParams.get('weekNumber') || '1', 10);
    const mode = searchParams.get('mode') || 'PRACTICE'; // 'PRACTICE' | 'ARENA' | 'MOCK'
    const domainFilter = searchParams.get('domain');
    const topicFilter = searchParams.get('topic');
    const randomize = searchParams.get('randomize') === 'true';

    const admin = await getAdminSession(req);
    const user = await getSessionUser(req);

    if (!user && !admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Determine target track
    let targetTrack = user?.track;
    if (admin) {
      targetTrack = searchParams.get('track') || user?.track || 'NETWORK';
    }

    if (!targetTrack) {
      return NextResponse.json({ error: 'No track specified' }, { status: 400 });
    }

    // Unless admin, check if week is unlocked
    if (!admin) {
      const trackWeek = await prisma.trackWeek.findUnique({
        where: {
          track_weekNumber: {
            track: targetTrack,
            weekNumber,
          },
        },
      });

      if (!trackWeek || !trackWeek.isUnlocked) {
        return NextResponse.json(
          { error: `Week ${weekNumber} is locked for this track` },
          { status: 403 }
        );
      }
    }

    // Query distinct domains and topics for this week to facilitate frontend filtering
    const weekQuestions = await prisma.question.findMany({
      where: {
        track: targetTrack,
        weekNumber,
      },
      select: {
        domain: true,
        topic: true,
      },
    });

    const availableDomains = Array.from(new Set(weekQuestions.map((q) => q.domain))).sort();
    const availableTopics = Array.from(
      new Set(
        weekQuestions
          .filter((q) => !domainFilter || q.domain === domainFilter)
          .map((q) => q.topic)
      )
    ).sort();

    // Query questions
    const whereClause: any = {
      track: targetTrack,
      weekNumber,
    };
    if (domainFilter) {
      whereClause.domain = domainFilter;
    }
    if (topicFilter) {
      whereClause.topic = topicFilter;
    }

    const rawQuestions = await prisma.question.findMany({
      where: whereClause,
      include: {
        options: {
          select: {
            id: true,
            optionKey: true,
            optionText: true,
            isCorrect: mode === 'PRACTICE', // Only reveal correct answer in practice mode
          },
          orderBy: { optionKey: 'asc' },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    // Check user bookmarks if user is logged in
    let bookmarkedSet = new Set<string>();
    if (user) {
      const userBookmarks = await prisma.bookmark.findMany({
        where: { userId: user.userId },
        select: { questionId: true },
      });
      bookmarkedSet = new Set(userBookmarks.map((b) => b.questionId));
    }

    // In Arena or Mock mode, strip explanations to prevent answer leaking in network responses
    let sanitizedQuestions = rawQuestions.map((q) => ({
      id: q.id,
      track: q.track,
      weekNumber: q.weekNumber,
      domain: q.domain,
      topic: q.topic,
      stage: q.stage,
      questionType: q.questionType,
      questionText: q.questionText,
      explanation: mode === 'PRACTICE' ? q.explanation : undefined,
      options: q.options,
      isBookmarked: bookmarkedSet.has(q.id),
    }));

    const shouldRandomize = randomize || mode === 'ARENA' || mode === 'MOCK';

    if (shouldRandomize) {
      // 1. Fisher-Yates shuffle for question sequence order
      for (let i = sanitizedQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sanitizedQuestions[i], sanitizedQuestions[j]] = [sanitizedQuestions[j], sanitizedQuestions[i]];
      }
    }

    // 2. Option randomization: Uniform Fisher-Yates shuffle for choices per question
    // Ensures correct answer is uniformly distributed across positions A, B, C, D (~25% each)
    const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (const q of sanitizedQuestions) {
      const shuffled = [...q.options];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // Reassign optionKey to match display slot position (A, B, C, D)
      // and preserve dbOptionKey so downstream consumers have both
      q.options = shuffled.map((opt, idx) => ({
        id: opt.id,
        optionKey: OPTION_LETTERS[idx] || String.fromCharCode(65 + idx),
        dbOptionKey: opt.optionKey,
        optionText: opt.optionText,
        isCorrect: opt.isCorrect,
      }));
    }

    return NextResponse.json({
      success: true,
      track: targetTrack,
      weekNumber,
      mode,
      count: sanitizedQuestions.length,
      availableDomains,
      availableTopics,
      questions: sanitizedQuestions,
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
