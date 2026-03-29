import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Plan configuration with 20% platform fee
export const PLANS = {
  pro: {
    name: "Pro",
    basePrice: 29900, // $299.00 in cents
    platformFee: 5980, // 20% of $299 = $59.80
    interval: "month" as const,
    features: "60-min monthly live consulting + AI priority access",
  },
  enterprise: {
    name: "Enterprise",
    basePrice: 89900, // $899.00 in cents
    platformFee: 17980, // 20% of $899 = $179.80
    interval: "month" as const,
    features: "1-day monthly on-site consulting + dedicated account manager",
  },
} as const;

export type PlanKey = keyof typeof PLANS;
