import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { getAuthorizationUrl } from "@/lib/calendly";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";

// GET /api/calendly/authorize — initiate Calendly OAuth for the logged-in expert
export async function GET() {
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify user exists in DB
  const auth0Id = session.user.sub!;
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.auth0Id, auth0Id))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Generate state token with user ID for security
  const state = `${user.id}:${randomBytes(16).toString("hex")}`;

  const url = getAuthorizationUrl(state);
  return NextResponse.redirect(url);
}
