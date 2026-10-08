import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser, getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const user = await getSessionUser(req);
    const admin = await getAdminSession(req);

    if (!user && !admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Contestant can only view their own track leaderboard; admin can view any track
    const targetTrack = admin
      ? searchParams.get('track') || user?.track || 'NETWORK'
      : user!.track;

    const weekParam = searchParams.get('week');
    const isSeason = weekParam === 'season' || !weekParam;
    const weekNumber = parseInt(weekParam || '1', 10);

    if (isSeason) {
      // Cumulative Season Standings: sum of highest scores across weeks
      const users = await prisma.user.findMany({
        where: { track: targetTrack },
        include: {
          attempts: {
            where: {
              attemptType: 'WEEKLY_ARENA',
              isOfficialSubmission: true,
              score: { gte: 0 },
            },
          },
        },
      });

      const standings = users
        .map((u) => {
          const totalScore = u.attempts.reduce((sum, a) => sum + a.score, 0);
          const totalTime = u.attempts.reduce((sum, a) => sum + a.timeTakenSeconds, 0);
          const completedWeeks = u.attempts.length;

          return {
            userId: u.id,
            username: u.username,
            track: u.track,
            totalScore,
            totalTimeSeconds: totalTime,
            completedWeeks,
          };
        })
        .filter((s) => s.completedWeeks > 0)
        .sort((a, b) => {
          if (b.totalScore !== a.totalScore) {
            return b.totalScore - a.totalScore;
          }
          return a.totalTimeSeconds - b.totalTimeSeconds; // Tie-breaker: fastest total time
        })
        .map((entry, idx) => ({
          rank: idx + 1,
          ...entry,
        }));

      return NextResponse.json({
        success: true,
        type: 'SEASON_CUMULATIVE',
        track: targetTrack,
        standings,
      });
    }

    // Single Week Standings
    const attempts = await prisma.quizAttempt.findMany({
      where: {
        track: targetTrack,
        weekNumber,
        attemptType: 'WEEKLY_ARENA',
        isOfficialSubmission: true,
        score: { gte: 0 },
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: [
        { score: 'desc' },
        { timeTakenSeconds: 'asc' }, // Tie breaker
        { submittedAt: 'asc' },
      ],
    });

    const standings = attempts.map((att, idx) => ({
      rank: idx + 1,
      userId: att.userId,
      username: att.user.username,
      track: att.track,
      weekNumber: att.weekNumber,
      score: att.score,
      timeTakenSeconds: att.timeTakenSeconds,
      submittedAt: att.submittedAt,
    }));

    return NextResponse.json({
      success: true,
      type: 'WEEKLY',
      track: targetTrack,
      weekNumber,
      standings,
    });
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
