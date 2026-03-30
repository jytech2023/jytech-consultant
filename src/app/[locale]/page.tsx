import Link from "next/link";
import { notFound } from "next/navigation";
import { industries, consultingModules, careerPartners } from "@/lib/data";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import PartnerLogo from "@/components/PartnerLogo";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const l = locale as Locale;

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-card-border px-4 py-16 text-center sm:px-6 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {dict.home.heroTitle}{" "}
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              {dict.home.heroTitleAccent}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            {dict.home.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Industries */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
          {dict.home.selectIndustry}
        </h2>
        <p className="mt-2 text-muted">{dict.home.selectIndustryDesc}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/${l}/industry/${industry.slug}`}
              className="group relative overflow-hidden rounded-xl border border-card-border bg-card-bg p-6 transition hover:border-accent/40 hover:bg-card-bg/80"
            >
              <div
                className="absolute right-0 top-0 h-24 w-24 -translate-y-6 translate-x-6 rounded-full opacity-20 blur-2xl transition group-hover:opacity-40"
                style={{ background: industry.color }}
              />
              <div className="text-4xl">{industry.icon}</div>
              <h3 className="mt-4 text-lg font-semibold">
                {l === "zh" ? industry.nameZh : industry.name}{" "}
                <span className="text-sm text-muted">
                  {l === "zh" ? industry.name : industry.nameZh}
                </span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {l === "zh"
                  ? (industry.descriptionZh ?? industry.description)
                  : industry.description}
              </p>
              <div
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium"
                style={{ color: industry.color }}
              >
                {dict.home.explore}
                <span className="transition group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Modules Overview */}
      <section className="border-t border-card-border bg-card-bg/50 px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            {dict.home.consultingModules}
          </h2>
          <p className="mt-2 text-muted">{dict.home.consultingModulesDesc}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {consultingModules.map((mod) => (
              <div
                key={mod.slug}
                className="rounded-xl border border-card-border bg-background p-6"
              >
                <div className="text-3xl">{mod.icon}</div>
                <h3 className="mt-3 font-semibold">
                  {l === "zh" ? mod.nameZh : mod.name}{" "}
                  <span className="text-sm text-muted">
                    {l === "zh" ? mod.name : mod.nameZh}
                  </span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {l === "zh"
                    ? (mod.descriptionZh ?? mod.description)
                    : mod.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-t border-card-border px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            {dict.home.partners}
          </h2>
          <p className="mt-2 text-muted">{dict.home.partnersDesc}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {careerPartners.map((partner) => (
              <a
                key={partner.name}
                href={`https://${partner.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-4 py-2 transition hover:border-accent/40"
                title={partner.name}
              >
                <PartnerLogo domain={partner.domain} name={partner.name} />
                <span className="text-sm font-medium text-muted">
                  {partner.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
