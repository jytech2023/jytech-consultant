import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { chatRatings, modelScores, users } from "@/lib/schema";
import { sql, gte } from "drizzle-orm";

// GET /api/cron/model-scores — weekly cron job to aggregate model scores
// Call with: ?secret=<CRON_SECRET> or via Vercel Cron
export async function GET(request: NextRequest) {
  // Simple auth for cron
  const secret = request.nextUrl.searchParams.get("secret");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && secret !== cronSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Current ISO week
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNum = Math.ceil(
    ((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7
  );
  const period = `${now.getFullYear()}-W${String(weekNum).padStart(2, "0")}`;

  // Last 7 days of ratings
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // 1. Aggregate ratings by (modelId, industrySlug, locale)
  const ratingAgg = await db
    .select({
      modelId: chatRatings.modelId,
      industrySlug: chatRatings.industrySlug,
      locale: chatRatings.locale,
      total: sql<number>`count(*)`.as("total"),
      positive: sql<number>`count(*) filter (where ${chatRatings.rating} = 1)`.as("positive"),
    })
    .from(chatRatings)
    .where(gte(chatRatings.createdAt, sevenDaysAgo))
    .groupBy(chatRatings.modelId, chatRatings.industrySlug, chatRatings.locale);

  // 2. Count user model preferences as a signal
  const userPrefs = await db
    .select({
      model: users.preferredModel,
      count: sql<number>`count(*)`.as("count"),
    })
    .from(users)
    .groupBy(users.preferredModel);

  const prefMap = new Map<string, number>();
  for (const p of userPrefs) {
    if (p.model) prefMap.set(p.model, p.count);
  }

  // 3. Insert scores
  const inserts = ratingAgg.map((r) => ({
    modelId: r.modelId,
    industrySlug: r.industrySlug,
    locale: r.locale,
    totalRatings: r.total,
    positiveRatings: r.positive,
    score: r.total > 0 ? Math.round((r.positive / r.total) * 100) : 0,
    userSelectCount: prefMap.get(r.modelId) ?? 0,
    period,
  }));

  if (inserts.length > 0) {
    await db.insert(modelScores).values(inserts);
  }

  // 4. Also insert global scores per model (no industry/locale filter)
  const globalAgg = await db
    .select({
      modelId: chatRatings.modelId,
      total: sql<number>`count(*)`.as("total"),
      positive: sql<number>`count(*) filter (where ${chatRatings.rating} = 1)`.as("positive"),
    })
    .from(chatRatings)
    .where(gte(chatRatings.createdAt, sevenDaysAgo))
    .groupBy(chatRatings.modelId);

  const globalInserts = globalAgg.map((r) => ({
    modelId: r.modelId,
    industrySlug: null,
    locale: null,
    totalRatings: r.total,
    positiveRatings: r.positive,
    score: r.total > 0 ? Math.round((r.positive / r.total) * 100) : 0,
    userSelectCount: prefMap.get(r.modelId) ?? 0,
    period,
  }));

  if (globalInserts.length > 0) {
    await db.insert(modelScores).values(globalInserts);
  }

  return NextResponse.json({
    period,
    ratingsProcessed: ratingAgg.length,
    globalModels: globalAgg.length,
    detailedScores: inserts.length,
  });
}
