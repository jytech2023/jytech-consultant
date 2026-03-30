import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { exchangeCodeForTokens, getCurrentUser } from "@/lib/calendly";
import { db } from "@/lib/db";
import { users, calendlyTokens } from "@/lib/schema";
import { eq } from "drizzle-orm";

// GET /api/calendly/callback — handle OAuth callback from Calendly
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL("/en/profile?calendly=error", request.url)
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      new URL("/en/profile?calendly=missing_params", request.url)
    );
  }

  // Verify the logged-in user matches the state
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const auth0Id = session.user.sub!;
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.auth0Id, auth0Id))
    .limit(1);

  if (!user) {
    return NextResponse.redirect(
      new URL("/en/profile?calendly=error", request.url)
    );
  }

  const stateUserId = state.split(":")[0];
  if (stateUserId !== user.id) {
    return NextResponse.redirect(
      new URL("/en/profile?calendly=state_mismatch", request.url)
    );
  }

  try {
    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code);

    // Get Calendly user info
    const calendlyUser = await getCurrentUser(tokens.access_token);

    // Upsert token record
    const existing = await db
      .select()
      .from(calendlyTokens)
      .where(eq(calendlyTokens.userId, user.id))
      .limit(1);

    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);

    if (existing.length) {
      await db
        .update(calendlyTokens)
        .set({
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          expiresAt,
          calendlyUserUri: calendlyUser.uri,
          calendlyEmail: calendlyUser.email,
          updatedAt: new Date(),
        })
        .where(eq(calendlyTokens.userId, user.id));
    } else {
      await db.insert(calendlyTokens).values({
        userId: user.id,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt,
        calendlyUserUri: calendlyUser.uri,
        calendlyEmail: calendlyUser.email,
      });
    }

    return NextResponse.redirect(
      new URL("/en/profile?calendly=connected", request.url)
    );
  } catch {
    return NextResponse.redirect(
      new URL("/en/profile?calendly=error", request.url)
    );
  }
}
