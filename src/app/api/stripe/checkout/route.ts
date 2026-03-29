import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { stripe, PLANS, type PlanKey } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { plan, locale = "en" } = body as { plan: string; locale?: string };

  if (!plan || !(plan in PLANS)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const planConfig = PLANS[plan as PlanKey];
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

  // Create Stripe Checkout session with 20% platform application fee
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: session.user.email ?? undefined,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `JY Consultant — ${planConfig.name} Plan`,
            description: planConfig.features,
          },
          unit_amount: planConfig.basePrice,
          recurring: { interval: planConfig.interval },
        },
        quantity: 1,
      },
    ],
    subscription_data: {
      metadata: {
        userId: dbUser.id,
        auth0Id,
        plan,
        platformFee: String(planConfig.platformFee),
      },
    },
    metadata: {
      userId: dbUser.id,
      auth0Id,
      plan,
    },
    success_url: `${process.env.APP_BASE_URL}/${locale}/profile?checkout=success`,
    cancel_url: `${process.env.APP_BASE_URL}/${locale}/pricing?checkout=cancel`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
