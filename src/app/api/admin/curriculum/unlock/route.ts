import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminSession(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const allWeeks = await prisma.trackWeek.findMany({
      orderBy: [{ track: 'asc' }, { weekNumber: 'asc' }],
    });

    return NextResponse.json({
      success: true,
      weeks: allWeeks,
    });
  } catch (error) {
    console.error('Error fetching admin track weeks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdminSession(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const body = await req.json();
    const { track, weekNumber, isUnlocked } = body;

    if (!track || typeof weekNumber !== 'number' || typeof isUnlocked !== 'boolean') {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    const updated = await prisma.trackWeek.upsert({
      where: {
        track_weekNumber: {
          track,
          weekNumber,
        },
      },
      update: {
        isUnlocked,
        unlockedAt: isUnlocked ? new Date() : null,
      },
      create: {
        track,
        weekNumber,
        title: `Week ${weekNumber}`,
        isUnlocked,
        unlockedAt: isUnlocked ? new Date() : null,
      },
    });

    return NextResponse.json({
      success: true,
      updated,
    });
  } catch (error) {
    console.error('Error toggling week unlock:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
