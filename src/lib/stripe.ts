import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Platform commission tiers
// Subscription fee lowers the platform's commission rate on expert consulting
export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    commission: 50, // 50% platform commission
    interval: null,
  },
  start: {
    name: "Start",
    price: 2900, // $29.00/mo in cents
    commission: 30, // 30% platform commission
    interval: "month" as const,
  },
  growth: {
    name: "Growth",
    price: 29900, // $299.00/mo in cents
    commission: 20, // 20% platform commission
    interval: "month" as const,
  },
  enterprise: {
    name: "Enterprise",
    price: 0, // Custom pricing
    commission: 0, // Custom
    interval: null,
  },
} as const;

export type PlanKey = keyof typeof PLANS;
