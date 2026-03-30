import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const auth0Id = session.metadata?.auth0Id;
      const type = session.metadata?.type;
      const plan = session.metadata?.plan;

      if (auth0Id && type === "expert_verification") {
        // Expert verification payment completed — set status to pending review
        await db
          .update(users)
          .set({
            isExpert: 1,
            expertStatus: "pending",
            updatedAt: new Date(),
          })
          .where(eq(users.auth0Id, auth0Id));
      } else if (auth0Id && plan) {
        await db
          .update(users)
          .set({
            plan,
            updatedAt: new Date(),
          })
          .where(eq(users.auth0Id, auth0Id));
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object;
      const auth0Id = subscription.metadata?.auth0Id;
      const plan = subscription.metadata?.plan;

      if (auth0Id) {
        const isActive =
          subscription.status === "active" ||
          subscription.status === "trialing";

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const periodEnd = (subscription as any).current_period_end as number | undefined;

        await db
          .update(users)
          .set({
            plan: isActive ? (plan ?? "pro") : "free",
            planExpiresAt: periodEnd
              ? new Date(periodEnd * 1000)
              : null,
            updatedAt: new Date(),
          })
          .where(eq(users.auth0Id, auth0Id));
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const auth0Id = subscription.metadata?.auth0Id;

      if (auth0Id) {
        await db
          .update(users)
          .set({
            plan: "free",
            planExpiresAt: null,
            updatedAt: new Date(),
          })
          .where(eq(users.auth0Id, auth0Id));
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
