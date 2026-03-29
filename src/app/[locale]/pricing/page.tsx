import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import CheckoutButton from "@/components/CheckoutButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "zh" ? "咨询方案" : "Consulting Plans",
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const p = dict.pricing;

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-card-border px-6 py-16 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {p.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted">{p.subtitle}</p>
        </div>
      </section>

      {/* Plans */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Free */}
          <div className="flex flex-col rounded-xl border border-card-border bg-card-bg p-8">
            <h3 className="text-lg font-semibold">{p.free}</h3>
            <div className="mt-4">
              <span className="text-4xl font-bold">{p.freePrice}</span>
            </div>
            <p className="mt-2 text-sm text-muted">{p.freeDesc}</p>
            <ul className="mt-6 flex-1 space-y-3">
              {p.freeFeatures.map((f: string) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 text-emerald-400">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="/auth/login?screen_hint=signup"
              className="mt-8 block rounded-lg border border-card-border py-3 text-center text-sm font-medium transition hover:border-accent/40 hover:text-foreground"
            >
              {p.getStarted}
            </a>
          </div>

          {/* Pro — $299/mo */}
          <div className="relative flex flex-col rounded-xl border-2 border-accent bg-card-bg p-8">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-medium text-white">
              {p.popular}
            </span>
            <h3 className="text-lg font-semibold">{p.pro}</h3>
            <div className="mt-4">
              <span className="text-4xl font-bold">{p.proPrice}</span>
              <span className="text-muted">{p.proUnit}</span>
            </div>
            <p className="mt-2 text-sm text-muted">{p.proDesc}</p>
            <ul className="mt-6 flex-1 space-y-3">
              {p.proFeatures.map((f: string) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 text-accent-light">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <CheckoutButton
              plan="pro"
              label={p.subscribe}
              className="mt-8 block w-full rounded-lg bg-accent py-3 text-center text-sm font-medium text-white transition hover:bg-accent/80 disabled:opacity-50"
            />
          </div>

          {/* Enterprise — $899/mo */}
          <div className="flex flex-col rounded-xl border border-card-border bg-card-bg p-8">
            <h3 className="text-lg font-semibold">{p.enterprise}</h3>
            <div className="mt-4">
              <span className="text-4xl font-bold">{p.enterprisePrice}</span>
              <span className="text-muted">{p.enterpriseUnit}</span>
            </div>
            <p className="mt-2 text-sm text-muted">{p.enterpriseDesc}</p>
            <ul className="mt-6 flex-1 space-y-3">
              {p.enterpriseFeatures.map((f: string) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 text-purple-400">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <CheckoutButton
              plan="enterprise"
              label={p.subscribe}
              className="mt-8 block w-full rounded-lg border border-card-border py-3 text-center text-sm font-medium transition hover:border-accent/40 hover:text-foreground disabled:opacity-50"
            />
          </div>
        </div>

        {/* Fee breakdown */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-card-border bg-card-bg p-5 text-sm">
            <h4 className="font-semibold">
              {locale === "zh" ? "💰 费用明细 — 专业版" : "💰 Fee Breakdown — Pro"}
            </h4>
            <div className="mt-3 space-y-1.5 text-muted">
              <div className="flex justify-between">
                <span>{locale === "zh" ? "咨询服务费" : "Consulting service"}</span>
                <span>$239.20</span>
              </div>
              <div className="flex justify-between">
                <span>{locale === "zh" ? "平台服务费 (20%)" : "Platform fee (20%)"}</span>
                <span>$59.80</span>
              </div>
              <div className="flex justify-between border-t border-card-border pt-1.5 font-medium text-foreground">
                <span>{locale === "zh" ? "总计" : "Total"}</span>
                <span>$299.00/{locale === "zh" ? "月" : "mo"}</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-card-border bg-card-bg p-5 text-sm">
            <h4 className="font-semibold">
              {locale === "zh" ? "💰 费用明细 — 企业版" : "💰 Fee Breakdown — Enterprise"}
            </h4>
            <div className="mt-3 space-y-1.5 text-muted">
              <div className="flex justify-between">
                <span>{locale === "zh" ? "咨询服务费" : "Consulting service"}</span>
                <span>$719.20</span>
              </div>
              <div className="flex justify-between">
                <span>{locale === "zh" ? "平台服务费 (20%)" : "Platform fee (20%)"}</span>
                <span>$179.80</span>
              </div>
              <div className="flex justify-between border-t border-card-border pt-1.5 font-medium text-foreground">
                <span>{locale === "zh" ? "总计" : "Total"}</span>
                <span>$899.00/{locale === "zh" ? "月" : "mo"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Travel note */}
        <div className="mt-6 rounded-lg border border-card-border bg-card-bg p-5 text-sm text-muted">
          <strong className="text-foreground">📍 {locale === "zh" ? "差旅说明" : "Travel Note"}:</strong>{" "}
          {p.travelNote}
        </div>
      </section>
    </div>
  );
}
