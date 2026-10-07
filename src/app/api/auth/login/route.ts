import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPin, signSessionToken, setSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, pin, deviceUuid } = body;

    // 1. Validation
    if (!username || typeof username !== "string" || !username.trim()) {
      return NextResponse.json(
        { success: false, error: "Username is required." },
        { status: 400 }
      );
    }

    if (!pin || typeof pin !== "string" || !pin.trim()) {
      return NextResponse.json(
        { success: false, error: "6-digit PIN is required." },
        { status: 400 }
      );
    }

    if (!deviceUuid || typeof deviceUuid !== "string" || !deviceUuid.trim()) {
      return NextResponse.json(
        { success: false, error: "Device identifier (deviceUuid) is required." },
        { status: 400 }
      );
    }

    const cleanUsername = username.trim();
    const cleanPin = pin.trim();
    const cleanDeviceUuid = deviceUuid.trim();

    // 2. Look up user by username
    const user = await prisma.user.findUnique({
      where: { username: cleanUsername },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid username or PIN." },
        { status: 401 }
      );
    }

    // 3. Verify 6-digit PIN
    const isPinValid = await verifyPin(cleanPin, user.pinHash);
    if (!isPinValid) {
      return NextResponse.json(
        { success: false, error: "Invalid username or PIN." },
        { status: 401 }
      );
    }

    // 4. Implement Cross-Device Session Handshake:
    // Check if the user has active sessions on any different deviceUuid
    const existingOtherActiveSessions = await prisma.deviceSession.findMany({
      where: {
        userId: user.id,
        isActive: true,
        deviceUuid: { not: cleanDeviceUuid },
      },
    });

    const transferredDevice = existingOtherActiveSessions.length > 0;

    // Deactivate ALL previous active sessions for this user (enforcing single active device)
    await prisma.deviceSession.updateMany({
      where: {
        userId: user.id,
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });

    // 5. Issue new session token
    const token = await signSessionToken({
      userId: user.id,
      username: user.username,
      track: user.track,
      role: user.role,
      deviceUuid: cleanDeviceUuid,
    });

    // 6. Create new active DeviceSession for incoming deviceUuid
    await prisma.deviceSession.create({
      data: {
        userId: user.id,
        deviceUuid: cleanDeviceUuid,
        sessionToken: token,
        isActive: true,
      },
    });

    // 7. Prepare response and set cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        track: user.track,
        role: user.role,
      },
      transferredDevice,
    });

    setSessionCookie(response, token);

    return response;
  } catch (error) {
    console.error("Error in /api/auth/login:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred during login. Please try again.",
      },
      { status: 500 }
    );
  }
}
