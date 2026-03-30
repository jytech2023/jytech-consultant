import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { calendlyTokens } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getAvailableTimes, refreshAccessToken } from "@/lib/calendly";

// GET /api/calendly/availability?userId=xxx&eventTypeUri=xxx&startTime=xxx&endTime=xxx
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const userId = searchParams.get("userId");
  const eventTypeUri = searchParams.get("eventTypeUri");
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");

  if (!userId || !eventTypeUri || !startTime || !endTime) {
    return NextResponse.json(
      { error: "userId, eventTypeUri, startTime, endTime are required" },
      { status: 400 }
    );
  }

  const [token] = await db
    .select()
    .from(calendlyTokens)
    .where(eq(calendlyTokens.userId, userId))
    .limit(1);

  if (!token) {
    return NextResponse.json(
      { error: "Expert has not connected Calendly" },
      { status: 404 }
    );
  }

  // Auto-refresh if expired
  let accessToken = token.accessToken;
  if (new Date() >= token.expiresAt) {
    try {
      const refreshed = await refreshAccessToken(token.refreshToken);
      accessToken = refreshed.access_token;
      await db
        .update(calendlyTokens)
        .set({
          accessToken: refreshed.access_token,
          refreshToken: refreshed.refresh_token,
          expiresAt: new Date(Date.now() + refreshed.expires_in * 1000),
          updatedAt: new Date(),
        })
        .where(eq(calendlyTokens.userId, userId));
    } catch {
      return NextResponse.json(
        { error: "Failed to refresh Calendly token" },
        { status: 500 }
      );
    }
  }

  try {
    const slots = await getAvailableTimes(
      accessToken,
      eventTypeUri,
      startTime,
      endTime
    );
    return NextResponse.json({ slots });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}
