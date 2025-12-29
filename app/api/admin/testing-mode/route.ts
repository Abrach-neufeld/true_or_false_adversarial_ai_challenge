import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";

const COOKIE_NAME = "testing_mode";

export async function GET(request: NextRequest) {
  const testingMode = request.cookies.get(COOKIE_NAME)?.value === "true";
  return NextResponse.json({ testingMode });
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email || !isAdmin(session.user.email)) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { enabled } = body;

    const response = NextResponse.json({ success: true, testingMode: enabled });

    if (enabled) {
      response.cookies.set(COOKIE_NAME, "true", {
        httpOnly: false, // Allow client-side access for UI
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });
    } else {
      response.cookies.delete(COOKIE_NAME);
    }

    return response;
  } catch (error) {
    console.error("Error toggling testing mode:", error);
    return NextResponse.json(
      { error: "Failed to toggle testing mode" },
      { status: 500 }
    );
  }
}
