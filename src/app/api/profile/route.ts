import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
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
    return NextResponse.json({ user: newUser });
  }

  return NextResponse.json({ user: existing[0] });
}

// PATCH /api/profile — update user preferences
export async function PATCH(request: NextRequest) {
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { preferredModel } = body as { preferredModel?: string };

  const auth0Id = session.user.sub!;

  const updateData: Record<string, unknown> = { updatedAt: new Date() };
  if (preferredModel) updateData.preferredModel = preferredModel;

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
