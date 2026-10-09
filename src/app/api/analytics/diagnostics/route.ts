import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export interface DomainMastery {
  domain: string;
  totalSyllabusQuestions: number;
  attemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  masteryPercentage: number;
  status: "NOT_ATTEMPTED" | "CRITICAL_WEAKNESS" | "NEEDS_PRACTICE" | "MASTERED";
  recommendedWeek: number;
}

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const track = user.track;

    // 1. Fetch all syllabus questions for the track (Weeks 1-5, unique pool)
    const syllabusQuestions = await prisma.question.findMany({
      where: {
        track,
        weekNumber: { in: [1, 2, 3, 4, 5] },
      },
      select: {
        id: true,
        domain: true,
        topic: true,
        weekNumber: true,
      },
    });

    // 2. Fetch all user answers for questions in this track
    const userAnswers = await prisma.userAnswer.findMany({
      where: {
        userId: user.userId,
        question: { track },
      },
      include: {
        question: {
          select: {
            id: true,
            domain: true,
            topic: true,
            weekNumber: true,
          },
        },
      },
      orderBy: { id: "desc" }, // latest first
    });

    // Deduplicate answers per question (latest attempt state)
    const latestAnswerPerQuestion = new Map<string, { isCorrect: boolean; domain: string }>();
    for (const ans of userAnswers) {
      if (!latestAnswerPerQuestion.has(ans.questionId)) {
        latestAnswerPerQuestion.set(ans.questionId, {
          isCorrect: ans.isCorrect,
          domain: ans.question.domain,
        });
      }
    }

    // 3. Group syllabus by domain
    const domainMap = new Map<
      string,
      {
        total: number;
        weekNumber: number;
        attempted: number;
        correct: number;
        incorrect: number;
      }
    >();

    for (const q of syllabusQuestions) {
      if (!domainMap.has(q.domain)) {
        domainMap.set(q.domain, {
          total: 0,
          weekNumber: q.weekNumber,
          attempted: 0,
          correct: 0,
          incorrect: 0,
        });
      }
      const entry = domainMap.get(q.domain)!;
      entry.total += 1;
    }

    // Aggregate answers into domains
    latestAnswerPerQuestion.forEach((ans) => {
      const entry = domainMap.get(ans.domain);
      if (entry) {
        entry.attempted += 1;
        if (ans.isCorrect) {
          entry.correct += 1;
        } else {
          entry.incorrect += 1;
        }
      }
    });

    // 4. Calculate domain proficiencies
    const domainDiagnostics: DomainMastery[] = [];
    let totalAttempted = 0;
    let totalCorrect = 0;

    domainMap.forEach((entry, domain) => {
      totalAttempted += entry.attempted;
      totalCorrect += entry.correct;

      const percentage =
        entry.attempted > 0
          ? Math.round((entry.correct / entry.attempted) * 100)
          : 0;

      let status: DomainMastery["status"] = "NOT_ATTEMPTED";
      if (entry.attempted > 0) {
        if (percentage >= 80) status = "MASTERED";
        else if (percentage >= 60) status = "NEEDS_PRACTICE";
        else status = "CRITICAL_WEAKNESS";
      }

      domainDiagnostics.push({
        domain,
        totalSyllabusQuestions: entry.total,
        attemptedCount: entry.attempted,
        correctCount: entry.correct,
        incorrectCount: entry.incorrect,
        masteryPercentage: percentage,
        status,
        recommendedWeek: entry.weekNumber,
      });
    });

    // Sort by mastery percentage ascending (weakest domains first for rapid intervention)
    domainDiagnostics.sort((a, b) => {
      if (a.attemptedCount === 0 && b.attemptedCount > 0) return 1;
      if (b.attemptedCount === 0 && a.attemptedCount > 0) return -1;
      return a.masteryPercentage - b.masteryPercentage;
    });

    // 5. Contestant's current rank on Season Leaderboard
    const allContestants = await prisma.user.findMany({
      where: { track },
      include: {
        attempts: {
          where: {
            attemptType: { in: ["WEEKLY_ARENA", "MOCK_EXAM"] },
            isOfficialSubmission: true,
            score: { gte: 0 },
          },
        },
      },
    });

    const leaderboardStandings = allContestants
      .map((u) => {
        const totalScore = u.attempts.reduce((sum, a) => sum + a.score, 0);
        const totalTime = u.attempts.reduce((sum, a) => sum + a.timeTakenSeconds, 0);
        return {
          userId: u.id,
          username: u.username,
          totalScore,
          totalTime,
          attemptCount: u.attempts.length,
        };
      })
      .filter((s) => s.attemptCount > 0)
      .sort((a, b) => {
        if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
        return a.totalTime - b.totalTime;
      });

    const userRankIndex = leaderboardStandings.findIndex((s) => s.userId === user.userId);
    const userStanding = userRankIndex >= 0 ? leaderboardStandings[userRankIndex] : null;

    const overallAccuracy =
      totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

    const attemptedDomains = domainDiagnostics.filter((d) => d.attemptedCount > 0);
    const weakestDomain =
      attemptedDomains.length > 0 ? attemptedDomains[0] : null;
    const strongestDomain =
      attemptedDomains.length > 0
        ? [...attemptedDomains].sort((a, b) => b.masteryPercentage - a.masteryPercentage)[0]
        : null;

    return NextResponse.json({
      success: true,
      track,
      summary: {
        totalAttempted,
        totalCorrect,
        overallAccuracy,
        totalSyllabusQuestions: syllabusQuestions.length,
        userRank: userRankIndex >= 0 ? userRankIndex + 1 : null,
        totalRankedContestants: leaderboardStandings.length,
        cumulativeScore: userStanding ? userStanding.totalScore : 0,
        completedRounds: userStanding ? userStanding.attemptCount : 0,
        weakestDomain: weakestDomain?.domain || null,
        weakestAccuracy: weakestDomain ? weakestDomain.masteryPercentage : null,
        strongestDomain: strongestDomain?.domain || null,
        strongestAccuracy: strongestDomain ? strongestDomain.masteryPercentage : null,
      },
      domains: domainDiagnostics,
    });
  } catch (error) {
    console.error("Diagnostics error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
