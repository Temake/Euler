import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminToken, clearAdminCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const adminCookie = request.cookies.get(ADMIN_COOKIE_NAME);

    if (!adminCookie || !adminCookie.value) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const payload = await verifyAdminToken(adminCookie.value);

    if (!payload) {
      const response = NextResponse.json({ authenticated: false }, { status: 200 });
      clearAdminCookie(response);
      return response;
    }

    return NextResponse.json({
      authenticated: true,
      role: "ADMIN",
    });
  } catch (error) {
    console.error("Error in /api/admin/session:", error);
    return NextResponse.json(
      { authenticated: false, error: "Failed to verify admin session." },
      { status: 500 }
    );
  }
}
