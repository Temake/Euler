import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, hashPin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminSession(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized admin access" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const trackFilter = searchParams.get("track");
    const searchQuery = searchParams.get("q")?.toLowerCase();

    const whereClause: any = {};
    if (trackFilter && trackFilter !== "ALL") {
      whereClause.track = trackFilter;
    }
    if (searchQuery) {
      whereClause.username = {
        contains: searchQuery,
        mode: "insensitive",
      };
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      include: {
        sessions: {
          orderBy: { lastActive: "desc" },
          take: 3,
        },
        attempts: {
          where: { isOfficialSubmission: true },
          select: {
            id: true,
            weekNumber: true,
            score: true,
            timeTakenSeconds: true,
            submittedAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formattedUsers = users.map((u) => {
      const activeSessionsCount = u.sessions.filter((s) => s.isActive).length;
      const latestSession = u.sessions[0] || null;
      const totalScore = u.attempts.reduce((sum, a) => sum + (a.score > 0 ? a.score : 0), 0);

      return {
        id: u.id,
        username: u.username,
        track: u.track,
        role: u.role,
        createdAt: u.createdAt,
        activeSessionsCount,
        latestDeviceUuid: latestSession?.deviceUuid || null,
        lastActive: latestSession?.lastActive || null,
        completedAttemptsCount: u.attempts.filter((a) => a.score >= 0).length,
        totalScore,
      };
    });

    // Overview Stats
    const totalCount = await prisma.user.count();
    const cloudCount = await prisma.user.count({ where: { track: "CLOUD" } });
    const compCount = await prisma.user.count({ where: { track: "COMPUTING" } });
    const netCount = await prisma.user.count({ where: { track: "NETWORK" } });
    const activeSessionsCount = await prisma.deviceSession.count({ where: { isActive: true } });
    const totalOfficialAttempts = await prisma.quizAttempt.count({
      where: { isOfficialSubmission: true, score: { gte: 0 } },
    });

    return NextResponse.json({
      success: true,
      users: formattedUsers,
      stats: {
        totalContestants: totalCount,
        cloudContestants: cloudCount,
        computingContestants: compCount,
        networkContestants: netCount,
        activeSessions: activeSessionsCount,
        totalQuizzesCompleted: totalOfficialAttempts,
      },
    });
  } catch (error) {
    console.error("Admin users GET error:", error);
    return NextResponse.json({ error: "Failed to fetch contestants" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdminSession(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized admin access" }, { status: 401 });
    }

    const body = await req.json();
    const { action, userId, newPin } = body;

    if (!userId || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "Contestant not found" }, { status: 404 });
    }

    if (action === "reset_session") {
      // Invalidate all active sessions for this student
      await prisma.deviceSession.updateMany({
        where: { userId, isActive: true },
        data: { isActive: false },
      });

      return NextResponse.json({
        success: true,
        message: `Device sessions reset successfully for contestant @${user.username}.`,
      });
    }

    if (action === "reset_pin") {
      if (!newPin || typeof newPin !== "string" || !/^\d{6}$/.test(newPin.trim())) {
        return NextResponse.json({ error: "New PIN must be exactly 6 digits" }, { status: 400 });
      }

      const hashed = await hashPin(newPin.trim());
      await prisma.user.update({
        where: { id: userId },
        data: { pinHash: hashed },
      });

      // Also reset sessions so they log in fresh with the new PIN
      await prisma.deviceSession.updateMany({
        where: { userId, isActive: true },
        data: { isActive: false },
      });

      return NextResponse.json({
        success: true,
        message: `PIN reset successfully to ${newPin.trim()} for contestant @${user.username}.`,
      });
    }

    if (action === "delete_user") {
      await prisma.user.delete({
        where: { id: userId },
      });

      return NextResponse.json({
        success: true,
        message: `Contestant @${user.username} deleted successfully.`,
      });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Admin user action error:", error);
    return NextResponse.json({ error: "Failed to perform user action" }, { status: 500 });
  }
}
