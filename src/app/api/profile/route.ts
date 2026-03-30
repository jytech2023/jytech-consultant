import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { db } from "@/lib/db";
import { users, calendlyTokens } from "@/lib/schema";
import { eq } from "drizzle-orm";

// GET /api/profile — get current user profile
export async function GET() {
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const auth0Id = session.user.sub!;
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.auth0Id, auth0Id))
    .limit(1);

  if (!existing.length) {
    // Create user on first profile access
    const [newUser] = await db
      .insert(users)
      .values({
        auth0Id,
        email: session.user.email,
        name: session.user.name,
        picture: session.user.picture,
      })
      .returning();
    return NextResponse.json({ user: newUser, calendly: null });
  }

  // Check Calendly connection
  const [calendly] = await db
    .select({ email: calendlyTokens.calendlyEmail })
    .from(calendlyTokens)
    .where(eq(calendlyTokens.userId, existing[0].id))
    .limit(1);

  return NextResponse.json({
    user: existing[0],
    calendly: calendly ? { email: calendly.email, connected: true } : null,
  });
}

// PATCH /api/profile — update user preferences
export async function PATCH(request: NextRequest) {
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    preferredModel, llamaindexApiKey,
    isExpert, expertIndustries, hourlyRate,
    hourlyRateOnline, hourlyRateOnsite, expertCity,
    expertBio, expertStatus,
  } = body as {
    preferredModel?: string;
    llamaindexApiKey?: string | null;
    isExpert?: number;
    expertIndustries?: string | null;
    hourlyRate?: number | null;
    hourlyRateOnline?: number | null;
    hourlyRateOnsite?: number | null;
    expertCity?: string | null;
    expertBio?: string | null;
    expertStatus?: string;
  };

  const auth0Id = session.user.sub!;

  const updateData: Record<string, unknown> = { updatedAt: new Date() };
  if (preferredModel) updateData.preferredModel = preferredModel;
  if (llamaindexApiKey !== undefined) updateData.llamaindexApiKey = llamaindexApiKey;
  if (isExpert !== undefined) updateData.isExpert = isExpert;
  if (expertIndustries !== undefined) updateData.expertIndustries = expertIndustries;
  if (hourlyRate !== undefined) updateData.hourlyRate = hourlyRate;
  if (hourlyRateOnline !== undefined) updateData.hourlyRateOnline = hourlyRateOnline;
  if (hourlyRateOnsite !== undefined) updateData.hourlyRateOnsite = hourlyRateOnsite;
  if (expertCity !== undefined) updateData.expertCity = expertCity;
  if (expertBio !== undefined) updateData.expertBio = expertBio;
  if (expertStatus !== undefined) updateData.expertStatus = expertStatus;

  const [updated] = await db
    .update(users)
    .set(updateData)
    .where(eq(users.auth0Id, auth0Id))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user: updated });
}
