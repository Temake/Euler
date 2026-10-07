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

    // Query questions
    const whereClause: any = {
      track: targetTrack,
      weekNumber,
    };
    if (domainFilter) {
      whereClause.domain = domainFilter;
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

    // In Arena or Mock mode, strip explanations to prevent answer leaking in network responses
    const sanitizedQuestions = rawQuestions.map((q) => ({
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
    }));

    return NextResponse.json({
      success: true,
      track: targetTrack,
      weekNumber,
      mode,
      count: sanitizedQuestions.length,
      questions: sanitizedQuestions,
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
