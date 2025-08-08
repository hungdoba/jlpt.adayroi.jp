import { db } from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import { users, localStorage } from '@/db/schema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { id, localStorageData } = await request.json();

    // Validate input
    if (!id || !Array.isArray(localStorageData)) {
      return NextResponse.json(
        { error: 'Id and localStorageData are required and must be valid' },
        { status: 400 },
      );
    }

    // Check if user exists
    const existingUser = await db.select().from(users).where(eq(users.id, id));

    if (existingUser.length === 0) {
      // Insert user if not exists
      await db.insert(users).values({ id });
    }

    // Delete old localStorage entries for the user
    await db.delete(localStorage).where(eq(localStorage.userId, id));

    // Insert new localStorage entries
    await db.insert(localStorage).values(
      localStorageData.map(({ key, value }: { key: string; value: string }) => ({
        userId: id,
        key,
        value,
      })),
    );

    return NextResponse.json({
      success: true,
      message: 'Data synced successfully',
    });
  } catch (error) {
    console.error('Error syncing data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId query parameter' }, { status: 400 });
  }

  try {
    const userData = await db.select().from(localStorage).where(eq(localStorage.userId, userId));

    return NextResponse.json({
      success: true,
      data: userData,
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
