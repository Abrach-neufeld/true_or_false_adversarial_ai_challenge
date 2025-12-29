import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export interface DailyStat {
  date: string;
  answered: number;
  skipped: number;
  correct: number;
}

export interface UserStats {
  totalAnswered: number;
  totalSkipped: number;
  totalCorrect: number;
  successRate: number;
  dailyStats: DailyStat[];
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Get all attempts for the user
    const attempts = await prisma.questionAttempt.findMany({
      where: { userId },
      select: {
        isCorrect: true,
        skipped: true,
        attemptedAt: true,
      },
    });

    // Calculate totals
    const totalAnswered = attempts.filter((a) => !a.skipped).length;
    const totalSkipped = attempts.filter((a) => a.skipped).length;
    const totalCorrect = attempts.filter((a) => a.isCorrect === true).length;
    const successRate =
      totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 1000) / 10 : 0;

    // Generate last 7 days
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const last7Days: DailyStat[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStart = new Date(date);
      dateStart.setHours(0, 0, 0, 0);
      const dateEnd = new Date(date);
      dateEnd.setHours(23, 59, 59, 999);

      const dayAttempts = attempts.filter((a) => {
        const attemptDate = new Date(a.attemptedAt);
        return attemptDate >= dateStart && attemptDate <= dateEnd;
      });

      const dayAnswered = dayAttempts.filter((a) => !a.skipped).length;
      const daySkipped = dayAttempts.filter((a) => a.skipped).length;
      const dayCorrect = dayAttempts.filter((a) => a.isCorrect === true).length;

      last7Days.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        answered: dayAnswered,
        skipped: daySkipped,
        correct: dayCorrect,
      });
    }

    const stats: UserStats = {
      totalAnswered,
      totalSkipped,
      totalCorrect,
      successRate,
      dailyStats: last7Days,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
