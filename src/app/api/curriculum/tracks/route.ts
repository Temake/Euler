import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only return track weeks for the contestant's assigned track (strict isolation)
    const weeks = await prisma.trackWeek.findMany({
      where: { track: user.track },
      orderBy: { weekNumber: 'asc' },
    });

    return NextResponse.json({
      success: true,
      track: user.track,
      weeks,
    });
  } catch (error) {
    console.error('Error fetching track weeks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
