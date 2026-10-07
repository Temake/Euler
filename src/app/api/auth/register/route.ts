import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPin, signSessionToken, setSessionCookie } from "@/lib/auth";

const VALID_TRACKS = ["CLOUD", "COMPUTING", "NETWORK"] as const;
type ValidTrack = (typeof VALID_TRACKS)[number];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, pin, track, deviceUuid } = body;

    // 1. Validation: username
    if (!username || typeof username !== "string") {
      return NextResponse.json(
        { success: false, error: "Username is required." },
        { status: 400 }
      );
    }
    const cleanUsername = username.trim();
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(cleanUsername)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Username must be 3-20 characters long and contain only letters, numbers, and underscores.",
        },
        { status: 400 }
      );
    }

    // 2. Validation: PIN
    if (!pin || typeof pin !== "string") {
      return NextResponse.json(
        { success: false, error: "6-digit PIN is required." },
        { status: 400 }
      );
    }
    const cleanPin = pin.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      return NextResponse.json(
        { success: false, error: "PIN must be exactly 6 digits." },
        { status: 400 }
      );
    }

    // 3. Validation: track
    if (!track || typeof track !== "string") {
      return NextResponse.json(
        { success: false, error: "Track is required." },
        { status: 400 }
      );
    }
    const normalizedTrack = track.trim().toUpperCase() as ValidTrack;
    if (!VALID_TRACKS.includes(normalizedTrack)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid track selected. Must be CLOUD, COMPUTING, or NETWORK.",
        },
        { status: 400 }
      );
    }

    // 4. Validation: deviceUuid
    if (!deviceUuid || typeof deviceUuid !== "string" || !deviceUuid.trim()) {
      return NextResponse.json(
        { success: false, error: "Device identifier (deviceUuid) is required." },
        { status: 400 }
      );
    }
    const cleanDeviceUuid = deviceUuid.trim();

    // 5. Check if username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username: cleanUsername },
    });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Username is already registered. Please choose another username or sign in.",
        },
        { status: 409 }
      );
    }

    // 6. Hash 6-digit PIN
    const pinHash = await hashPin(cleanPin);

    // 7. Create User in database
    const user = await prisma.user.create({
      data: {
        username: cleanUsername,
        pinHash,
        track: normalizedTrack,
        role: "STUDENT",
      },
    });

    // 8. Sign JWT session token
    const token = await signSessionToken({
      userId: user.id,
      username: user.username,
      track: user.track,
      role: user.role,
      deviceUuid: cleanDeviceUuid,
    });

    // 9. Create DeviceSession with isActive: true
    await prisma.deviceSession.create({
      data: {
        userId: user.id,
        deviceUuid: cleanDeviceUuid,
        sessionToken: token,
        isActive: true,
      },
    });

    // 10. Prepare response and set HTTP-only cookie
    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          username: user.username,
          track: user.track,
          role: user.role,
        },
      },
      { status: 201 }
    );

    setSessionCookie(response, token);

    return response;
  } catch (error) {
    console.error("Error in /api/auth/register:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred during registration. Please try again.",
      },
      { status: 500 }
    );
  }
}
