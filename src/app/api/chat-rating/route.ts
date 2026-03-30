import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { db } from "@/lib/db";
import { chatRatings, users } from "@/lib/schema";
import { eq } from "drizzle-orm";

// POST /api/chat-rating — submit a rating for an AI response
export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    modelId,
    rating,
    comment,
    industrySlug,
    moduleSlug,
    locale,
    sessionId,
  } = body as {
    modelId: string;
    rating: number; // 1 or -1
    comment?: string;
    industrySlug?: string;
    moduleSlug?: string;
    locale?: string;
    sessionId?: string;
  };

  if (!modelId || ![1, -1].includes(rating)) {
    return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
  }

  // Get user ID if logged in (optional — anonymous ratings allowed)
  let userId: string | null = null;
  const session = await auth0.getSession().catch(() => null);
  if (session?.user?.sub) {
    const [dbUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.auth0Id, session.user.sub))
      .limit(1);
    userId = dbUser?.id ?? null;
  }

  await db.insert(chatRatings).values({
    userId,
    sessionId: sessionId || null,
    modelId,
    industrySlug: industrySlug || null,
    moduleSlug: moduleSlug || null,
    locale: locale || null,
    rating,
    comment: comment || null,
  });

  return NextResponse.json({ ok: true });
}
