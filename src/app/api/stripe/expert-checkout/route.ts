import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { stripe } from "@/lib/stripe";

// POST /api/stripe/expert-checkout — create Stripe checkout for expert verification ($99/year)
export async function POST(request: NextRequest) {
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    locale = "en",
    expertIndustries,
    hourlyRateOnline,
    hourlyRateOnsite,
    expertCity,
    expertBio,
  } = body as {
    locale?: string;
    expertIndustries?: string;
    hourlyRateOnline?: number;
    hourlyRateOnsite?: number;
    expertCity?: string;
    expertBio?: string;
  };

  const auth0Id = session.user.sub!;

  // Get or create user in DB
  let dbUser = await db
    .select()
    .from(users)
    .where(eq(users.auth0Id, auth0Id))
    .limit(1)
    .then((r) => r[0]);

  if (!dbUser) {
    [dbUser] = await db
      .insert(users)
      .values({
        auth0Id,
        email: session.user.email,
        name: session.user.name,
        picture: session.user.picture,
      })
      .returning();
  }

  // Save expert profile data as draft before checkout
  await db
    .update(users)
    .set({
      isExpert: 1,
      expertStatus: "draft",
      expertIndustries: expertIndustries || null,
      hourlyRate: hourlyRateOnline ?? null,
      hourlyRateOnline: hourlyRateOnline ?? null,
      hourlyRateOnsite: hourlyRateOnsite ?? null,
      expertCity: expertCity || null,
      expertBio: expertBio || null,
      updatedAt: new Date(),
    })
    .where(eq(users.auth0Id, auth0Id));

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: session.user.email ?? undefined,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name:
              locale === "zh"
                ? "JY Consultant — 专家身份验证"
                : "JY Consultant — Expert Verification",
            description:
              locale === "zh"
                ? "年度专家入驻身份验证费用，通过审核后将在行业页面展示"
                : "Annual expert verification fee. Your profile will appear on industry pages once approved.",
          },
          unit_amount: 9900, // $99.00
          recurring: { interval: "year" },
        },
        quantity: 1,
      },
    ],
    subscription_data: {
      metadata: {
        type: "expert_verification",
        userId: dbUser.id,
        auth0Id,
      },
    },
    metadata: {
      type: "expert_verification",
      userId: dbUser.id,
      auth0Id,
    },
    success_url: `${process.env.APP_BASE_URL}/${locale}/profile?expert_checkout=success`,
    cancel_url: `${process.env.APP_BASE_URL}/${locale}/profile?expert_checkout=cancel`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
