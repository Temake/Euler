import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/mistakes - Retrieve all distinct questions answered incorrectly by the user
export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const weekParam = searchParams.get("week");
    const domainParam = searchParams.get("domain");

    // Fetch all user answers for questions in user's track
    const userAnswers = await prisma.userAnswer.findMany({
      where: {
        userId: user.userId,
        question: {
          track: user.track,
          ...(weekParam ? { weekNumber: parseInt(weekParam, 10) } : {}),
          ...(domainParam ? { domain: domainParam } : {}),
        },
      },
      include: {
        question: {
          include: {
            options: {
              orderBy: { optionKey: "asc" },
            },
          },
        },
      },
      orderBy: { id: "desc" },
    });

    // Fetch user bookmarks for quick lookup
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: user.userId },
      select: { questionId: true },
    });
    const bookmarkedSet = new Set(bookmarks.map((b) => b.questionId));

    // Group answers by questionId to calculate latest state and mistake frequency
    const questionMap = new Map<string, {
      question: any;
      mistakeCount: number;
      lastAttemptCorrect: boolean;
      lastSelectedOptions: string[];
      isBookmarked: boolean;
    }>();

    for (const ans of userAnswers) {
      const qId = ans.questionId;
      if (!questionMap.has(qId)) {
        // First encountered is the latest attempt due to order
        questionMap.set(qId, {
          question: ans.question,
          mistakeCount: ans.isCorrect ? 0 : 1,
          lastAttemptCorrect: ans.isCorrect,
          lastSelectedOptions: ans.selectedOptionKeys,
          isBookmarked: bookmarkedSet.has(qId),
        });
      } else {
        const item = questionMap.get(qId)!;
        if (!ans.isCorrect) {
          item.mistakeCount += 1;
        }
      }
    }

    // Filter to active mistakes (where mistakeCount > 0 and user has not marked as mastered)
    // Or return all questions with past mistakes, highlighting resolved vs unresolved
    const activeMistakes: any[] = [];
    const resolvedMistakes: any[] = [];

    questionMap.forEach((entry, qId) => {
      if (entry.mistakeCount > 0) {
        const record = {
          questionId: qId,
          question: {
            id: entry.question.id,
            track: entry.question.track,
            weekNumber: entry.question.weekNumber,
            domain: entry.question.domain,
            topic: entry.question.topic,
            questionType: entry.question.questionType,
            questionText: entry.question.questionText,
            explanation: entry.question.explanation,
            options: entry.question.options,
            isBookmarked: entry.isBookmarked,
          },
          mistakeCount: entry.mistakeCount,
          isResolved: entry.lastAttemptCorrect,
          lastSelectedOptions: entry.lastSelectedOptions,
        };

        if (entry.lastAttemptCorrect) {
          resolvedMistakes.push(record);
        } else {
          activeMistakes.push(record);
        }
      }
    });

    return NextResponse.json({
      success: true,
      totalMistakes: activeMistakes.length,
      resolvedCount: resolvedMistakes.length,
      activeMistakes,
      resolvedMistakes,
    });
  } catch (error) {
    console.error("Error fetching mistakes:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/mistakes - Record practice mistake or retest result
export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { questionId, selectedOptionKeys, selectedOptionIds, isCorrect } = body;

    if (!questionId || !Array.isArray(selectedOptionKeys) || typeof isCorrect !== "boolean") {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    // Verify question belongs to contestant track
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      select: { id: true, track: true },
    });

    if (!question || question.track !== user.track) {
      return NextResponse.json({ error: "Question not found or track mismatch" }, { status: 404 });
    }

    // Convert selectedOptionIds to DB option keys if provided for database consistency
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

    // Record the attempt in UserAnswer
    const answerRecord = await prisma.userAnswer.create({
      data: {
        userId: user.userId,
        questionId,
        selectedOptionKeys: dbKeysToSave,
        isCorrect,
      },
    });

    return NextResponse.json({
      success: true,
      id: answerRecord.id,
      isCorrect,
      message: isCorrect
        ? "Question answered correctly! Mastered in notebook."
        : "Mistake logged to your Mistake Notebook.",
    });
  } catch (error) {
    console.error("Error recording practice mistake:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/mistakes - Manually resolve / clear a mistake from notebook
export async function DELETE(req: NextRequest) {
  try {
    const user = await getSessionUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const questionId = searchParams.get("questionId");

    if (!questionId) {
      return NextResponse.json({ error: "questionId is required" }, { status: 400 });
    }

    // Mark previous incorrect answers for this question as resolved (or delete)
    await prisma.userAnswer.updateMany({
      where: {
        userId: user.userId,
        questionId,
        isCorrect: false,
      },
      data: {
        isCorrect: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Mistake marked as resolved",
    });
  } catch (error) {
    console.error("Error clearing mistake:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
