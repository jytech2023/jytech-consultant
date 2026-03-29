import Link from "next/link";
import { notFound } from "next/navigation";
import {
  industries,
  consultingModules,
  getIndustry,
  getCaseStudiesForIndustry,
} from "@/lib/data";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return {
    title:
      locale === "zh"
        ? `${industry.nameZh}咨询 | AI商业顾问`
        : `${industry.name} Consulting | AI Business Consultant`,
    description: industry.description,
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const dict = await getDictionary(locale as Locale);
  const l = locale as Locale;

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-card-border px-6 py-16">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(ellipse at top, ${industry.color}, transparent 70%)`,
          }}
        />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href={`/${l}`}
            className="inline-flex items-center gap-1 text-sm text-muted transition hover:text-foreground"
          >
            {dict.industry.backToIndustries}
          </Link>
          <div className="mt-6 flex items-center gap-4">
            <span className="text-5xl">{industry.icon}</span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {l === "zh" ? industry.nameZh : industry.name}{" "}
                {dict.industry.consulting}
              </h1>
              <p className="mt-1 text-muted">
                {l === "zh" ? industry.name : industry.nameZh}
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-muted">
            {l === "zh"
              ? (industry.descriptionZh ?? industry.description)
              : industry.description}
          </p>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="mx-auto w-full max-w-7xl px-6 py-12">
        <h2 className="text-xl font-bold">{dict.industry.chooseModule}</h2>
        <p className="mt-1 text-sm text-muted">
          {dict.industry.chooseModuleDesc.replace(
            "{industry}",
            l === "zh"
              ? industry.nameZh
              : industry.name.toLowerCase()
          )}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {consultingModules.map((mod) => (
            <Link
              key={mod.slug}
              href={`/${l}/industry/${industry.slug}/${mod.slug}`}
              className="group rounded-xl border border-card-border bg-card-bg p-6 transition hover:border-accent/40"
            >
              <div className="text-3xl">{mod.icon}</div>
              <h3 className="mt-3 font-semibold">
                {l === "zh" ? mod.nameZh : mod.name}{" "}
                <span className="text-sm text-muted">
                  {l === "zh" ? mod.name : mod.nameZh}
                </span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {l === "zh" ? (mod.descriptionZh ?? mod.description) : mod.description}
              </p>
              <ul className="mt-4 space-y-1">
                {mod.features.slice(0, 3).map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-xs text-muted"
                  >
                    <span style={{ color: industry.color }}>●</span>
                    {f}
                  </li>
                ))}
                <li className="text-xs text-muted">
                  {dict.industry.more.replace(
                    "{count}",
                    String(mod.features.length - 3)
                  )}
                </li>
              </ul>
              <div
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium"
                style={{ color: industry.color }}
              >
                {dict.industry.startAnalysis}
                <span className="transition group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      {(() => {
        const studies = getCaseStudiesForIndustry(industry.slug);
        if (studies.length === 0) return null;
        return (
          <section className="mx-auto w-full max-w-7xl px-6 py-12">
            <h2 className="text-xl font-bold">{dict.industry.caseStudies}</h2>
            <p className="mt-1 text-sm text-muted">
              {dict.industry.caseStudiesDesc.replace(
                "{industry}",
                l === "zh"
                  ? industry.nameZh
                  : industry.name.toLowerCase()
              )}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {studies.map((study) => (
                <Link
                  key={study.slug}
                  href={`/${l}/industry/${industry.slug}/studies/${study.slug}`}
                  className="group rounded-xl border border-card-border bg-card-bg p-6 transition hover:border-accent/40"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: study.heroColor }}
                    />
                    <span className="text-xs text-muted">{study.date}</span>
                    <span className="text-xs text-muted">
                      · {study.readTime}
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold leading-snug">
                    {l === "zh" ? study.titleZh : study.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    {l === "zh" ? study.title : study.titleZh}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                    {l === "zh"
                      ? (study.subtitleZh ?? study.subtitle)
                      : study.subtitle}
                  </p>
                  <div
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium"
                    style={{ color: industry.color }}
                  >
                    {dict.industry.readStudy}
                    <span className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })()}
    </div>
  );
}
