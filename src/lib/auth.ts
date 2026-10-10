import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const JWT_SECRET =
  process.env.JWT_SECRET || "euler_super_secret_jwt_key_2026_huawei_ict";
const SECRET_KEY = new TextEncoder().encode(JWT_SECRET);

export interface SessionPayload {
  userId: string;
  username: string;
  track: string;
  role: string;
  deviceUuid: string;
}

export interface AdminSessionPayload {
  role: "ADMIN";
  isAdmin: boolean;
}

export const SESSION_COOKIE_NAME = "euler_session";
export const ADMIN_COOKIE_NAME = "euler_admin_session";

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
};

export const ADMIN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
};

/**
 * Hashes a 6-digit numeric PIN using bcryptjs
 */
export async function hashPin(pin: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(pin, salt);
}

/**
 * Verifies a 6-digit numeric PIN against a bcrypt hash
 */
export async function verifyPin(pin: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pin, hash);
}

/**
 * Signs a JWT session token for an authenticated contestant
 */
export async function signSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({
    userId: payload.userId,
    username: payload.username,
    track: payload.track,
    role: payload.role,
    deviceUuid: payload.deviceUuid,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(SECRET_KEY);
}

/**
 * Verifies and decodes a contestant JWT session token
 */
export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
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

/**
 * Signs a JWT session token for an authenticated admin
 */
export async function signAdminToken(): Promise<string> {
  return new SignJWT({ role: "ADMIN", isAdmin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);
}

/**
 * Verifies an admin JWT session token
 */
export async function verifyAdminToken(
  token: string
): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    if (payload.role === "ADMIN" && payload.isAdmin === true) {
      return {
        role: "ADMIN",
        isAdmin: true,
      };
    }
    return null;
  } catch {
    return null;
  }
}

import crypto from "crypto";

/**
 * Verifies the admin master PIN using timing-safe comparison to prevent side-channel timing attacks
 */
export function verifyAdminPin(pin: string): boolean {
  const masterPin = (process.env.ADMIN_PIN || "888999").trim();
  const inputPin = pin.trim();

  const pinBuffer = Buffer.from(inputPin);
  const masterBuffer = Buffer.from(masterPin);

  if (pinBuffer.length !== masterBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(pinBuffer, masterBuffer);
}

/**
 * Helper to set contestant session cookie on a NextResponse
 */
export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
}

/**
 * Helper to clear contestant session cookie on a NextResponse
 */
export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    ...SESSION_COOKIE_OPTIONS,
    maxAge: 0,
  });
}

/**
 * Helper to set admin session cookie on a NextResponse
 */
export function setAdminCookie(response: NextResponse, token: string): void {
  response.cookies.set(ADMIN_COOKIE_NAME, token, ADMIN_COOKIE_OPTIONS);
}

/**
 * Helper to clear admin session cookie on a NextResponse
 */
export function clearAdminCookie(response: NextResponse): void {
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    ...ADMIN_COOKIE_OPTIONS,
    maxAge: 0,
  });
}

/**
 * Extracts and verifies the contestant session from a NextRequest,
 * validating both the cryptographic JWT signature AND ensuring the device session
 * remains active in PostgreSQL (enforcing single active device handover).
 */
export async function getSessionUser(req: any): Promise<SessionPayload | null> {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = await verifySessionToken(token);
  if (!payload) return null;

  try {
    const { prisma } = await import("@/lib/prisma");
    const dbSession = await prisma.deviceSession.findUnique({
      where: { sessionToken: token },
      select: { isActive: true },
    });

    if (!dbSession || !dbSession.isActive) {
      return null;
    }
  } catch (error) {
    console.error("Error validating active device session:", error);
    return null;
  }

  return payload;
}

/**
 * Extracts and verifies the admin session from a NextRequest
 */
export async function getAdminSession(req: any): Promise<AdminSessionPayload | null> {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}


