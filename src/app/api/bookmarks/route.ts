import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/bookmarks - List all bookmarked questions for the authenticated user
export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const weekParam = searchParams.get("week");
    const domainParam = searchParams.get("domain");

    const whereClause: any = {
      userId: user.userId,
      question: {
        track: user.track,
      },
    };

    if (weekParam) {
      whereClause.question.weekNumber = parseInt(weekParam, 10);
    }
    if (domainParam) {
      whereClause.question.domain = domainParam;
    }

    const bookmarks = await prisma.bookmark.findMany({
      where: whereClause,
      include: {
        question: {
          include: {
            options: {
              orderBy: { optionKey: "asc" },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formattedBookmarks = bookmarks.map((b) => ({
      bookmarkId: b.id,
      createdAt: b.createdAt,
      question: {
        id: b.question.id,
        track: b.question.track,
        weekNumber: b.question.weekNumber,
        domain: b.question.domain,
        topic: b.question.topic,
        questionType: b.question.questionType as any,
        questionText: b.question.questionText,
        explanation: b.question.explanation,
        options: b.question.options,
        isBookmarked: true,
      },
    }));

    return NextResponse.json({
      success: true,
      count: formattedBookmarks.length,
      bookmarks: formattedBookmarks,
    });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/bookmarks - Toggle bookmark state for a question
export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { questionId } = body;

    if (!questionId || typeof questionId !== "string") {
      return NextResponse.json({ error: "Question ID is required" }, { status: 400 });
    }

    // Verify question exists and matches user's track
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      select: { id: true, track: true },
    });

    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    if (question.track !== user.track) {
      return NextResponse.json(
        { error: "Access denied to questions outside your registered track" },
        { status: 403 }
      );
    }

    // Check if bookmark already exists
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_questionId: {
          userId: user.userId,
          questionId,
        },
      },
    });

    if (existingBookmark) {
      // Remove bookmark
      await prisma.bookmark.delete({
        where: { id: existingBookmark.id },
      });
      return NextResponse.json({
        success: true,
        isBookmarked: false,
        message: "Question removed from bookmarks",
      });
    } else {
      // Create bookmark
      await prisma.bookmark.create({
        data: {
          userId: user.userId,
          questionId,
        },
      });
      return NextResponse.json({
        success: true,
        isBookmarked: true,
        message: "Question bookmarked successfully",
      });
    }
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
