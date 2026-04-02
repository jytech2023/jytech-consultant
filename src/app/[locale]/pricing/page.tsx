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
  const isZh = locale === "zh";

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-card-border px-4 py-12 text-center sm:px-6 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {p.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted">{p.subtitle}</p>
        </div>
      </section>

      {/* Plans */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Free */}
          <div className="flex flex-col rounded-xl border border-card-border bg-card-bg p-8">
            <h3 className="text-lg font-semibold">{p.free}</h3>
            <div className="mt-4">
              <span className="text-4xl font-bold">{p.freePrice}</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-2">
              <span className="text-sm text-muted">{p.commission}:</span>
              <span className="rounded-full bg-red-400/10 px-2.5 py-0.5 text-sm font-semibold text-red-400">
                {p.freeCommission}
              </span>
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

          {/* Start — $29/mo */}
          <div className="flex flex-col rounded-xl border border-card-border bg-card-bg p-8">
            <h3 className="text-lg font-semibold">{p.start}</h3>
            <div className="mt-4">
              <span className="text-4xl font-bold">{p.startPrice}</span>
              <span className="text-muted">{p.startUnit}</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-2">
              <span className="text-sm text-muted">{p.commission}:</span>
              <span className="rounded-full bg-amber-400/10 px-2.5 py-0.5 text-sm font-semibold text-amber-400">
                {p.startCommission}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted">{p.startDesc}</p>
            <ul className="mt-6 flex-1 space-y-3">
              {p.startFeatures.map((f: string) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 text-amber-400">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <CheckoutButton
              plan="start"
              label={p.subscribe}
              className="mt-8 block w-full rounded-lg border border-card-border py-3 text-center text-sm font-medium transition hover:border-accent/40 hover:text-foreground disabled:opacity-50"
            />
          </div>

          {/* Growth — $299/mo */}
          <div className="relative flex flex-col rounded-xl border-2 border-accent bg-card-bg p-8">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-medium text-white">
              {p.popular}
            </span>
            <h3 className="text-lg font-semibold">{p.growth}</h3>
            <div className="mt-4">
              <span className="text-4xl font-bold">{p.growthPrice}</span>
              <span className="text-muted">{p.growthUnit}</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-2">
              <span className="text-sm text-muted">{p.commission}:</span>
              <span className="rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-sm font-semibold text-emerald-400">
                {p.growthCommission}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted">{p.growthDesc}</p>
            <ul className="mt-6 flex-1 space-y-3">
              {p.growthFeatures.map((f: string) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 text-accent-light">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <CheckoutButton
              plan="growth"
              label={p.subscribe}
              className="mt-8 block w-full rounded-lg bg-accent py-3 text-center text-sm font-medium text-white transition hover:bg-accent/80 disabled:opacity-50"
            />
          </div>

          {/* Enterprise */}
          <div className="flex flex-col rounded-xl border border-card-border bg-card-bg p-8">
            <h3 className="text-lg font-semibold">{p.enterprise}</h3>
            <div className="mt-4">
              <span className="text-2xl font-bold text-purple-400">
                {isZh ? "定制方案" : "Custom"}
              </span>
            </div>
            <div className="mt-2 inline-flex items-center gap-2">
              <span className="text-sm text-muted">{p.commission}:</span>
              <span className="rounded-full bg-purple-400/10 px-2.5 py-0.5 text-sm font-semibold text-purple-400">
                {isZh ? "定制" : "Custom"}
              </span>
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
            <a
              href="mailto:contact@jytech.us?subject=Enterprise%20Plan%20Inquiry"
              className="mt-8 block rounded-lg border border-card-border py-3 text-center text-sm font-medium transition hover:border-accent/40 hover:text-foreground"
            >
              {p.contactSales}
            </a>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-8 rounded-xl border border-card-border bg-card-bg p-5 sm:mt-12 sm:p-8">
          <h3 className="text-lg font-semibold">{p.howItWorks}</h3>
          <p className="mt-2 text-sm text-muted">{p.howItWorksDesc}</p>
          <div className="mt-6 rounded-lg bg-background p-5">
            <p className="text-sm font-medium">{p.example}</p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-20 shrink-0 rounded bg-red-400/10 px-2 py-1 text-center text-xs font-medium text-red-400">50%</span>
                <span className="text-muted">{p.exampleFree}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 shrink-0 rounded bg-amber-400/10 px-2 py-1 text-center text-xs font-medium text-amber-400">30%</span>
                <span className="text-muted">{p.exampleStart}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 shrink-0 rounded bg-emerald-400/10 px-2 py-1 text-center text-xs font-medium text-emerald-400">20%</span>
                <span className="text-muted">{p.exampleGrowth}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Travel note */}
        <div className="mt-6 rounded-lg border border-card-border bg-card-bg p-5 text-sm text-muted">
          <strong className="text-foreground">📍 {isZh ? "差旅说明" : "Travel Note"}:</strong>{" "}
          {p.travelNote}
        </div>
      </section>
    </div>
  );
}
