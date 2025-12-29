import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ seenIds: [] });
    }

    const userId = session.user.id;

    // Get all statement IDs this user has attempted
    const attempts = await prisma.questionAttempt.findMany({
      where: {
        userId,
      },
      select: {
        statementId: true,
      },
      distinct: ["statementId"],
    });

    const seenIds = attempts.map((a) => a.statementId);

    return NextResponse.json({ seenIds });
  } catch (error) {
    console.error("Error fetching seen questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch seen questions" },
      { status: 500 }
    );
  }
}
