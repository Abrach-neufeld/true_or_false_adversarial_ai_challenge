import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // Check if testing mode is enabled - skip database writes
    const testingMode = request.cookies.get("testing_mode")?.value === "true";
    if (testingMode) {
      return NextResponse.json({ success: true, testingMode: true });
    }

    const session = await getServerSession(authOptions);
    const body = await request.json();
    const { statementId, rating, alreadyKnewAnswer } = body;

    if (!statementId) {
      return NextResponse.json(
        { error: "Missing required field: statementId" },
        { status: 400 }
      );
    }

    // Rating must be 0-5 if provided
    if (rating !== undefined && (rating < 0 || rating > 5)) {
      return NextResponse.json(
        { error: "Rating must be between 0 and 5" },
        { status: 400 }
      );
    }

    // Create feedback record
    const feedback = await prisma.feedback.create({
      data: {
        statementId,
        userId: session?.user?.id || null,
        type: "RATING",
        rating: rating ?? null,
        alreadyKnewAnswer: alreadyKnewAnswer ?? null,
      },
    });

    return NextResponse.json({ success: true, feedbackId: feedback.id });
  } catch (error) {
    console.error("Error recording feedback:", error);
    return NextResponse.json(
      { error: "Failed to record feedback" },
      { status: 500 }
    );
  }
}
