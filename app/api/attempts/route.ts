import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Check if testing mode is enabled - skip database writes
    const testingMode = request.cookies.get("testing_mode")?.value === "true";
    if (testingMode) {
      return NextResponse.json({ success: true, testingMode: true });
    }

    const body = await request.json();
    const { statementId, userGuess, isCorrect, skipped } = body;

    if (!statementId) {
      return NextResponse.json(
        { error: "Missing required field: statementId" },
        { status: 400 }
      );
    }

    // For non-skipped attempts, require userGuess and isCorrect
    if (!skipped && (!userGuess || typeof isCorrect !== "boolean")) {
      return NextResponse.json(
        { error: "Missing required fields for answer: userGuess, isCorrect" },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    // Find or create an active game session for this user
    let gameSession = await prisma.gameSession.findFirst({
      where: {
        userId,
        endedAt: null,
      },
      orderBy: {
        startedAt: "desc",
      },
    });

    if (!gameSession) {
      gameSession = await prisma.gameSession.create({
        data: {
          userId,
        },
      });
    }

    // Create the attempt record
    const attempt = await prisma.questionAttempt.create({
      data: {
        statementId,
        sessionId: gameSession.id,
        userId,
        userGuess: skipped ? null : userGuess,
        isCorrect: skipped ? null : isCorrect,
        skipped: skipped || false,
      },
    });

    // Update game session stats (only count non-skipped attempts)
    if (!skipped) {
      await prisma.gameSession.update({
        where: { id: gameSession.id },
        data: {
          totalQuestions: { increment: 1 },
          correctAnswers: isCorrect ? { increment: 1 } : undefined,
        },
      });
    }

    return NextResponse.json({ success: true, attemptId: attempt.id });
  } catch (error) {
    console.error("Error recording attempt:", error);
    return NextResponse.json(
      { error: "Failed to record attempt" },
      { status: 500 }
    );
  }
}
