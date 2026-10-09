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
    const { attemptId, questionId, selectedOptionKeys, selectedOptionIds } = body;

    if (!questionId || !Array.isArray(selectedOptionKeys)) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    let dbKeysToSave = selectedOptionKeys;
    if (Array.isArray(selectedOptionIds) && selectedOptionIds.length > 0) {
      const dbOptions = await prisma.questionOption.findMany({
        where: { questionId, id: { in: selectedOptionIds } },
        select: { optionKey: true },
      });
      if (dbOptions.length > 0) {
        dbKeysToSave = dbOptions.map((o) => o.optionKey).sort();
      }
    }

    // Upsert the user answer linked to this attempt
    const existingAnswer = await prisma.userAnswer.findFirst({
      where: {
        userId: user.userId,
        attemptId: attemptId || null,
        questionId,
      },
    });

    if (existingAnswer) {
      await prisma.userAnswer.update({
        where: { id: existingAnswer.id },
        data: {
          selectedOptionKeys: dbKeysToSave,
        },
      });
    } else {
      await prisma.userAnswer.create({
        data: {
          userId: user.userId,
          attemptId: attemptId || null,
          questionId,
          selectedOptionKeys: dbKeysToSave,
          isCorrect: false, // Calculated upon final submission
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save answer error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
