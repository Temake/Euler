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
      const selectedKeys = (userAnswer?.selectedOptionKeys || []).sort();

      const correctKeys = q.options
        .filter((opt) => opt.isCorrect)
        .map((opt) => opt.optionKey)
        .sort();

      // Check all-or-nothing match
      const isCorrect =
        selectedKeys.length === correctKeys.length &&
        selectedKeys.every((key: string, idx: number) => key === correctKeys[idx]);

      if (isCorrect) {
        correctCount++;
      }

      gradedResults.push({
        questionId: q.id,
        isCorrect,
        correctKeys,
        selectedKeys,
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
            selectedOptionKeys: selectedKeys,
            isCorrect,
          },
        });
      } else {
        await prisma.userAnswer.create({
          data: {
            userId: user.userId,
            attemptId,
            questionId: q.id,
            selectedOptionKeys: selectedKeys,
            isCorrect,
          },
        });
      }
    }

    const totalQuestions = questions.length || 1;
    const finalScore = Math.round((correctCount / totalQuestions) * 1000);
    const validatedTime = Math.max(1, timeTakenSeconds || 60);

    // Update the attempt with final score and time taken
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
