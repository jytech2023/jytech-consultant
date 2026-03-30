import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { stripe, PLANS, type PlanKey } from "@/lib/stripe";

// POST /api/consultation/checkout — create Stripe checkout for a consultation booking
export async function POST(request: NextRequest) {
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    expertUserId,
    expertName,
    eventTypeName,
    duration,
    hourlyRate,
    schedulingUrl,
    locale = "en",
  } = body as {
    expertUserId: string;
    expertName: string;
    eventTypeName: string;
    duration: number;
    hourlyRate: number;
    schedulingUrl: string;
    locale?: string;
  };

  if (!expertUserId || !hourlyRate || !schedulingUrl) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const auth0Id = session.user.sub!;

  // Get or create client user
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

  // Get client's plan to determine commission rate
  const clientPlan = (dbUser.plan ?? "free") as PlanKey;
  const commissionPct = PLANS[clientPlan]?.commission ?? 50;

  // Expert rate is net — platform fee = commission% * expert rate
  const hours = duration / 60;
  const platformFee = hourlyRate * (commissionPct / 100);
  const totalRate = hourlyRate + platformFee;
  const amountCents = Math.round(totalRate * hours * 100);
  const expertAmountCents = Math.round(hourlyRate * hours * 100);
  const platformAmountCents = amountCents - expertAmountCents;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: session.user.email ?? undefined,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name:
              locale === "zh"
                ? `${expertName} — ${eventTypeName} 咨询 (${duration}分钟)`
                : `${expertName} — ${eventTypeName} Consultation (${duration}min)`,
            description:
              locale === "zh"
                ? `与 ${expertName} 的一对一专家咨询`
                : `One-on-one expert consultation with ${expertName}`,
          },
          unit_amount: amountCents,
        },
        quantity: 1,
      },
    ],
    metadata: {
      type: "consultation",
      clientUserId: dbUser.id,
      expertUserId,
      duration: String(duration),
      hourlyRate: String(hourlyRate),
      totalCharged: String(amountCents),
      expertPayout: String(expertAmountCents),
      platformFee: String(platformAmountCents),
      clientPlan,
      commissionPct: String(commissionPct),
    },
    // After payment, redirect to Calendly to pick the actual time
    success_url: `${schedulingUrl}?utm_source=jyconsultant&utm_medium=paid`,
    cancel_url: `${process.env.APP_BASE_URL}/${locale}?checkout=cancel`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
