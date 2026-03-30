import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { calendlyTokens } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getEventTypes, refreshAccessToken } from "@/lib/calendly";

// GET /api/calendly/event-types?userId=xxx — get expert's Calendly event types
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json(
      { error: "userId is required" },
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
    const eventTypes = await getEventTypes(accessToken, token.calendlyUserUri);
    return NextResponse.json({ eventTypes });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch event types" },
      { status: 500 }
    );
  }
}
