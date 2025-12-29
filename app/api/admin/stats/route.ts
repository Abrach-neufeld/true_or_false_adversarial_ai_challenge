import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import prisma from "@/lib/prisma";

export interface StatementStats {
  id: string;
  statementText: string;
  truthValue: string;
  categoryName: string;
  attemptsCount: number;
  answeredCount: number;
  skippedCount: number;
  skipRate: number;
  successRate: number;
  averageRating: number | null;
  feedbackCount: number;
  alreadyKnewPercentage: number | null;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email || !isAdmin(session.user.email)) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    // Fetch all statements with their attempts and feedback
    const statements = await prisma.statement.findMany({
      include: {
        category: {
          select: { name: true },
        },
        attempts: {
          select: { isCorrect: true, skipped: true },
        },
        feedback: {
          select: {
            rating: true,
            alreadyKnewAnswer: true,
          },
        },
      },
      orderBy: {
        statementText: "asc",
      },
    });

    // Process data to calculate statistics
    const stats: StatementStats[] = statements.map((statement) => {
      const attemptsCount = statement.attempts.length;
      const skippedCount = statement.attempts.filter((a) => a.skipped).length;
      const answeredCount = attemptsCount - skippedCount;
      const correctCount = statement.attempts.filter((a) => a.isCorrect === true).length;
      const skipRate = attemptsCount > 0 ? (skippedCount / attemptsCount) * 100 : 0;
      const successRate = answeredCount > 0 ? (correctCount / answeredCount) * 100 : 0;

      const feedbackWithRating = statement.feedback.filter((f) => f.rating !== null);
      const averageRating =
        feedbackWithRating.length > 0
          ? feedbackWithRating.reduce((sum, f) => sum + (f.rating || 0), 0) / feedbackWithRating.length
          : null;

      const feedbackWithAlreadyKnew = statement.feedback.filter(
        (f) => f.alreadyKnewAnswer !== null
      );
      const alreadyKnewCount = feedbackWithAlreadyKnew.filter(
        (f) => f.alreadyKnewAnswer === true
      ).length;
      const alreadyKnewPercentage =
        feedbackWithAlreadyKnew.length > 0
          ? (alreadyKnewCount / feedbackWithAlreadyKnew.length) * 100
          : null;

      return {
        id: statement.id,
        statementText: statement.statementText,
        truthValue: statement.truthValue,
        categoryName: statement.category.name,
        attemptsCount,
        answeredCount,
        skippedCount,
        skipRate: Math.round(skipRate * 10) / 10,
        successRate: Math.round(successRate * 10) / 10,
        averageRating: averageRating !== null ? Math.round(averageRating * 10) / 10 : null,
        feedbackCount: statement.feedback.length,
        alreadyKnewPercentage:
          alreadyKnewPercentage !== null ? Math.round(alreadyKnewPercentage * 10) / 10 : null,
      };
    });

    // Get unique categories for filtering
    const categories = [...new Set(statements.map((s) => s.category.name))].sort();

    return NextResponse.json({ stats, categories });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
