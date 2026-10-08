import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET =
  process.env.JWT_SECRET || "euler_super_secret_jwt_key_2026_huawei_ict";
const SECRET_KEY = new TextEncoder().encode(JWT_SECRET);

const SESSION_COOKIE_NAME = "euler_session";
const ADMIN_COOKIE_NAME = "euler_admin_session";

const KNOWN_TRACKS = ["CLOUD", "COMPUTING", "NETWORK"];

interface SessionPayload {
  userId: string;
  username: string;
  track: string;
  role: string;
  deviceUuid: string;
}

async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return {
      userId: payload.userId as string,
      username: payload.username as string,
      track: payload.track as string,
      role: payload.role as string,
      deviceUuid: payload.deviceUuid as string,
    };
  } catch {
    return null;
  }
}

async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload.role === "ADMIN" && payload.isAdmin === true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 1. ADMIN ROUTES PROTECTION
  if (pathname.startsWith("/admin")) {
    const isAdminLogin = pathname === "/admin/login";
    const adminCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValidAdmin = adminCookie ? await verifyAdminToken(adminCookie) : false;

    if (isAdminLogin) {
      // If already authenticated as admin, redirect to admin root
      if (isValidAdmin) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }

    // All other /admin/* routes require valid admin session
    if (!isValidAdmin) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // 2. PUBLIC LOGIN & REGISTER ROUTES
  if (pathname === "/login" || pathname === "/register") {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (sessionCookie) {
      const session = await verifyToken(sessionCookie);
      if (session) {
        // Already authenticated contestant -> redirect to dashboard
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
    return NextResponse.next();
  }

  // 3. PROTECTED CONTESTANT ROUTES (/dashboard, /arena, /practice, /leaderboard)
  const isContestantRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/arena") ||
    pathname.startsWith("/practice") ||
    pathname.startsWith("/leaderboard");

  if (isContestantRoute) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname + (request.nextUrl.search || ""));
      return NextResponse.redirect(loginUrl);
    }

    const session = await verifyToken(sessionCookie);
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname + (request.nextUrl.search || ""));
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(SESSION_COOKIE_NAME);
      return response;
    }

    const userTrack = session.track ? session.track.toUpperCase() : "";

    // Track isolation 1: Check ?track= query parameter
    const trackParam = searchParams.get("track");
    if (trackParam && trackParam.toUpperCase() !== userTrack) {
      const correctedUrl = request.nextUrl.clone();
      correctedUrl.searchParams.set("track", userTrack);
      return NextResponse.redirect(correctedUrl);
    }

    // Track isolation 2: Check URL path segments (e.g., /arena/network or /practice/cloud)
    const pathSegments = pathname.split("/").filter(Boolean);
    for (let i = 0; i < pathSegments.length; i++) {
      const segmentUpper = pathSegments[i].toUpperCase();
      if (KNOWN_TRACKS.includes(segmentUpper) && segmentUpper !== userTrack) {
        // Replace cross-track path segment with the user's assigned track
        const newSegments = [...pathSegments];
        newSegments[i] = userTrack.toLowerCase();
        const correctedUrl = new URL("/" + newSegments.join("/"), request.url);
        correctedUrl.search = request.nextUrl.search;
        return NextResponse.redirect(correctedUrl);
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/arena/:path*",
    "/practice/:path*",
    "/leaderboard/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
