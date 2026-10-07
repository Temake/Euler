import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPin, signAdminToken, setAdminCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { adminPin } = body;

    if (!adminPin || typeof adminPin !== "string" || !adminPin.trim()) {
      return NextResponse.json(
        { success: false, error: "Admin Master PIN is required." },
        { status: 400 }
      );
    }

    const isValid = verifyAdminPin(adminPin);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid Admin Master PIN." },
        { status: 401 }
      );
    }

    // Issue admin session token
    const token = await signAdminToken();

    const response = NextResponse.json({
      success: true,
      message: "Admin authenticated successfully.",
    });

    setAdminCookie(response, token);

    return response;
  } catch (error) {
    console.error("Error in /api/admin/login:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred during admin authentication.",
      },
      { status: 500 }
    );
  }
}
