import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
  clearSessionCookie,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json(
        { authenticated: false, reason: "No session cookie" },
        { status: 200 }
      );
    }

    const token = sessionCookie.value;
    const payload = await verifySessionToken(token);

    if (!payload) {
      const response = NextResponse.json(
        { authenticated: false, reason: "Invalid or expired token" },
        { status: 200 }
      );
      clearSessionCookie(response);
      return response;
    }

    // Check if the deviceSession exists and is still active in the database
    const dbSession = await prisma.deviceSession.findUnique({
      where: { sessionToken: token },
    });

    if (!dbSession || !dbSession.isActive) {
      const response = NextResponse.json(
        {
          authenticated: false,
          sessionConflict: true,
          error:
            "Your session has been transferred to another device or has been terminated.",
        },
        { status: 200 }
      );
      clearSessionCookie(response);
      return response;
    }

    // Touch the session's lastActive timestamp
    await prisma.deviceSession.update({
      where: { id: dbSession.id },
      data: { lastActive: new Date() },
    });

    // Retrieve fresh user details
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        username: true,
        track: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      const response = NextResponse.json(
        { authenticated: false, reason: "User not found" },
        { status: 200 }
      );
      clearSessionCookie(response);
      return response;
    }

    return NextResponse.json({
      authenticated: true,
      user,
      activeTrack: user.track,
      deviceUuid: payload.deviceUuid,
    });
  } catch (error) {
    console.error("Error in /api/auth/session:", error);
    return NextResponse.json(
      {
        authenticated: false,
        error: "Failed to verify session status.",
      },
      { status: 500 }
    );
  }
}
