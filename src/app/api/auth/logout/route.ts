import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE_NAME, clearSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

    if (sessionCookie?.value) {
      // Invalidate the session in the database
      await prisma.deviceSession.updateMany({
        where: { sessionToken: sessionCookie.value },
        data: { isActive: false },
      });
    }

    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully.",
    });

    clearSessionCookie(response);

    return response;
  } catch (error) {
    console.error("Error in /api/auth/logout:", error);
    // Still clear the cookie even if database update fails
    const response = NextResponse.json(
      {
        success: true,
        message: "Logged out successfully.",
      },
      { status: 200 }
    );
    clearSessionCookie(response);
    return response;
  }
}
