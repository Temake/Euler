import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { attemptId, weekNumber, answers, timeTakenSeconds } = body;

    if (!attemptId || !weekNumber || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Invalid submission payload' }, { status: 400 });
    }

    // Verify the attempt belongs to this user
    const attempt = await prisma.quizAttempt.findUnique({
      where: { id: attemptId },
    });

    if (!attempt || attempt.userId !== user.userId) {
      return NextResponse.json({ error: 'Attempt not found or unauthorized' }, { status: 404 });
    }

    // 1. Guard against duplicate submission of already scored attempt
    if (attempt.score !== -1) {
      return NextResponse.json(
        { error: 'This exam attempt has already been submitted and finalized.' },
        { status: 400 }
      );
    }

    // 2. Authoritative server elapsed time calculation (anti-cheating & leaderboard integrity)
    const startTime = new Date(attempt.submittedAt).getTime();
    const nowTime = Date.now();
    const serverElapsedSeconds = Math.max(1, Math.floor((nowTime - startTime) / 1000));
    const maxAllowedSeconds = weekNumber === 6 ? 60 * 60 : 30 * 60;
    const GRACE_PERIOD_SECONDS = 90; // network latency buffer

    // Prevent client from spoofing artificially low completion times
    let validatedTime = serverElapsedSeconds;
    if (typeof timeTakenSeconds === 'number' && timeTakenSeconds > 0) {
      // Only accept client time if it is within a reasonable tolerance of server measurement
      if (Math.abs(serverElapsedSeconds - timeTakenSeconds) <= 15) {
        validatedTime = timeTakenSeconds;
      }
    }
    // Cap completion time to the maximum allowed quiz duration
    validatedTime = Math.min(validatedTime, maxAllowedSeconds);

    // Retrieve the questions and correct options from the database
    const questionIds = answers.map((a: any) => a.questionId);
    const questions = await prisma.question.findMany({
      where: { id: { in: questionIds } },
      include: { options: true },
    });

    let correctCount = 0;
    const gradedResults = [];

    for (const q of questions) {
      const userAnswer = answers.find((a: any) => a.questionId === q.id);
      const selectedOptionIds = userAnswer?.selectedOptionIds || [];
      const selectedKeys = (userAnswer?.selectedOptionKeys || []).sort();

      const correctOptions = q.options.filter((opt) => opt.isCorrect);
      const correctOptionIds = correctOptions.map((opt) => opt.id).sort();
      const correctDbKeys = correctOptions.map((opt) => opt.optionKey).sort();

      // Check all-or-nothing match:
      // Prefer matching by option UUIDs for 100% resilient grading regardless of client shuffle
      let isCorrect = false;
      if (Array.isArray(selectedOptionIds) && selectedOptionIds.length > 0) {
        const sortedSelectedIds = [...selectedOptionIds].sort();
        isCorrect =
          sortedSelectedIds.length === correctOptionIds.length &&
          sortedSelectedIds.every((id: string, idx: number) => id === correctOptionIds[idx]);
      } else {
        isCorrect =
          selectedKeys.length === correctDbKeys.length &&
          selectedKeys.every((key: string, idx: number) => key === correctDbKeys[idx]);
      }

      if (isCorrect) {
        correctCount++;
      }

      // Convert selectedOptionIds to DB option keys for database storage consistency
      let dbStoredSelectedKeys = selectedKeys;
      if (Array.isArray(selectedOptionIds) && selectedOptionIds.length > 0) {
        dbStoredSelectedKeys = q.options
          .filter((opt) => selectedOptionIds.includes(opt.id))
          .map((opt) => opt.optionKey)
          .sort();
      }

      gradedResults.push({
        questionId: q.id,
        questionText: q.questionText,
        questionType: q.questionType,
        domain: q.domain,
        topic: q.topic,
        options: q.options.map((opt) => ({
          id: opt.id,
          optionKey: opt.optionKey,
          optionText: opt.optionText,
          isCorrect: opt.isCorrect,
        })),
        isCorrect,
        correctKeys: correctDbKeys,
        selectedKeys: dbStoredSelectedKeys,
        explanation: q.explanation,
      });

      // Update or create user answer record with isCorrect flag
      const existing = await prisma.userAnswer.findFirst({
        where: { attemptId, questionId: q.id },
      });

      if (existing) {
        await prisma.userAnswer.update({
          where: { id: existing.id },
          data: {
            selectedOptionKeys: dbStoredSelectedKeys,
            isCorrect,
          },
        });
      } else {
        await prisma.userAnswer.create({
          data: {
            userId: user.userId,
            attemptId,
            questionId: q.id,
            selectedOptionKeys: dbStoredSelectedKeys,
            isCorrect,
          },
        });
      }
    }

    const totalQuestions = questions.length || 1;
    const finalScore = Math.round((correctCount / totalQuestions) * 1000);

    // Update the attempt with final score and authoritative time taken
    const updatedAttempt = await prisma.quizAttempt.update({
      where: { id: attemptId },
      data: {
        score: finalScore,
        timeTakenSeconds: validatedTime,
        submittedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      score: finalScore,
      totalPossibleScore: 1000,
      correctCount,
      totalQuestions,
      timeTakenSeconds: validatedTime,
      passed: finalScore >= 600, // Huawei standard passing threshold
      results: gradedResults,
    });
  } catch (error) {
    console.error('Quiz submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
