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
    const { weekNumber, attemptType } = body; // 'WEEKLY_ARENA' | 'PRACTICE_DRILL' | 'MOCK_EXAM'

    if (!weekNumber || typeof weekNumber !== 'number') {
      return NextResponse.json({ error: 'Invalid week number' }, { status: 400 });
    }

    // Verify the week is unlocked for the user's track
    const trackWeek = await prisma.trackWeek.findUnique({
      where: {
        track_weekNumber: {
          track: user.track,
          weekNumber,
        },
      },
    });

    if (!trackWeek || !trackWeek.isUnlocked) {
      return NextResponse.json(
        { error: `Week ${weekNumber} is currently locked by the exam proctor.` },
        { status: 403 }
      );
    }

    // For WEEKLY_ARENA: Check if contestant already has a completed official submission
    if (attemptType === 'WEEKLY_ARENA') {
      const existingOfficial = await prisma.quizAttempt.findFirst({
        where: {
          userId: user.userId,
          track: user.track,
          weekNumber,
          attemptType: 'WEEKLY_ARENA',
          isOfficialSubmission: true,
          score: { gt: -1 }, // Completed submission has calculated score
        },
      });

      if (existingOfficial) {
        return NextResponse.json({
          alreadyCompleted: true,
          message: 'You have already completed your official competitive attempt for this week.',
          attempt: existingOfficial,
        });
      }

      // Check for an ongoing (uncompleted) attempt within the time window to support Cross-Device Handover!
      const ongoingAttempt = await prisma.quizAttempt.findFirst({
        where: {
          userId: user.userId,
          track: user.track,
          weekNumber,
          attemptType: 'WEEKLY_ARENA',
          score: -1, // -1 denotes in-progress
        },
        include: {
          userAnswers: true,
        },
        orderBy: { submittedAt: 'desc' },
      });

      const DURATION_SECONDS = weekNumber === 6 ? 60 * 60 : 30 * 60; // 60 mins for Mock, 30 mins for Arena

      if (ongoingAttempt) {
        const elapsedSeconds = Math.floor(
          (Date.now() - new Date(ongoingAttempt.submittedAt).getTime()) / 1000
        );
        const remainingSeconds = Math.max(0, DURATION_SECONDS - elapsedSeconds);

        if (remainingSeconds > 0) {
          // Handover active attempt to current device!
          return NextResponse.json({
            success: true,
            resumed: true,
            attemptId: ongoingAttempt.id,
            remainingSeconds,
            durationSeconds: DURATION_SECONDS,
            savedAnswers: ongoingAttempt.userAnswers.map((a) => ({
              questionId: a.questionId,
              selectedOptionKeys: a.selectedOptionKeys,
            })),
          });
        }
      }
    }

    // Create a new in-progress attempt
    const DURATION_SECONDS = weekNumber === 6 ? 60 * 60 : 30 * 60;
    const newAttempt = await prisma.quizAttempt.create({
      data: {
        userId: user.userId,
        track: user.track,
        weekNumber,
        attemptType: attemptType || 'WEEKLY_ARENA',
        score: -1, // -1 indicates in-progress
        totalPossibleScore: 1000,
        timeTakenSeconds: 0,
        isOfficialSubmission: attemptType === 'WEEKLY_ARENA',
      },
    });

    return NextResponse.json({
      success: true,
      resumed: false,
      attemptId: newAttempt.id,
      remainingSeconds: DURATION_SECONDS,
      durationSeconds: DURATION_SECONDS,
      savedAnswers: [],
    });
  } catch (error) {
    console.error('Quiz start error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
