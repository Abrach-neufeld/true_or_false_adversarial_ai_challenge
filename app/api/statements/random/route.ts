import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const excludeIds = searchParams.get('excludeIds')?.split(',').filter(Boolean) || [];

    // Build where clause
    const where: {
      isActive: boolean;
      category?: { name: string };
      id?: { notIn: string[] };
    } = {
      isActive: true,
    };

    if (category) {
      where.category = { name: category };
    }

    if (excludeIds.length > 0) {
      where.id = { notIn: excludeIds };
    }

    // Get count for random selection
    const count = await prisma.statement.count({ where });

    if (count === 0) {
      return NextResponse.json(
        { error: 'No statements available' },
        { status: 404 }
      );
    }

    // Get random statement using skip
    const skip = Math.floor(Math.random() * count);
    const statement = await prisma.statement.findFirst({
      where,
      skip,
      include: {
        category: true,
      },
    });

    return NextResponse.json(statement);
  } catch (error) {
    console.error('Error fetching random statement:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statement' },
      { status: 500 }
    );
  }
}
