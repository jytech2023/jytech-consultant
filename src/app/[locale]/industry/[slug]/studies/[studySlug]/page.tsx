import Link from "next/link";
import { notFound } from "next/navigation";
import {
  industries,
  caseStudies,
  getIndustry,
  getCaseStudy,
  getModule,
} from "@/lib/data";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

export function generateStaticParams() {
  const params: { slug: string; studySlug: string }[] = [];
  for (const study of caseStudies) {
    const industry = industries.find((i) => i.slug === study.industrySlug);
    if (industry) {
      params.push({ slug: industry.slug, studySlug: study.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string; studySlug: string }>;
}) {
  const { locale, slug, studySlug } = await params;
  const industry = getIndustry(slug);
  const study = getCaseStudy(studySlug);
  if (!industry || !study) return {};
  return {
    title:
      locale === "zh"
        ? `${study.titleZh} | ${industry.nameZh} | AI商业顾问`
        : `${study.title} | ${industry.name} | AI Business Consultant`,
    description: locale === "zh" ? (study.subtitleZh ?? study.subtitle) : study.subtitle,
  };
}

export default async function StudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; studySlug: string }>;
}) {
  const { locale, slug, studySlug } = await params;
  if (!hasLocale(locale)) notFound();
  const industry = getIndustry(slug);
  const study = getCaseStudy(studySlug);
  if (!industry || !study || study.industrySlug !== slug) notFound();

  const dict = await getDictionary(locale as Locale);
  const l = locale as Locale;
  const mod = getModule(study.moduleSlug);

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-card-border px-6 py-12">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(ellipse at top, ${study.heroColor}, transparent 70%)`,
          }}
        />
        <div className="relative mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <Link
              href={`/${l}`}
              className="transition hover:text-foreground"
            >
              {dict.study.home}
            </Link>
            <span>/</span>
            <Link
              href={`/${l}/industry/${industry.slug}`}
              className="transition hover:text-foreground"
            >
              {industry.icon}{" "}
              {l === "zh" ? industry.nameZh : industry.name}
            </Link>
            {mod && (
              <>
                <span>/</span>
                <Link
                  href={`/${l}/industry/${industry.slug}/${mod.slug}`}
                  className="transition hover:text-foreground"
                >
                  {mod.icon} {l === "zh" ? mod.nameZh : mod.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-foreground">{dict.study.caseStudy}</span>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
            {l === "zh" ? study.titleZh : study.title}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {l === "zh" ? study.title : study.titleZh}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
            {l === "zh"
              ? (study.subtitleZh ?? study.subtitle)
              : study.subtitle}
          </p>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted">
            <span className="rounded-full border border-card-border px-3 py-1">
              {study.date}
            </span>
            <span className="rounded-full border border-card-border px-3 py-1">
              {study.readTime}
            </span>
            <span
              className="rounded-full px-3 py-1 text-white"
              style={{ background: study.heroColor }}
            >
              {industry.icon}{" "}
              {l === "zh" ? industry.nameZh : industry.name} —{" "}
              {mod
                ? l === "zh"
                  ? mod.nameZh
                  : mod.name
                : dict.study.caseStudy}
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-10 lg:flex-row">
        {/* Sidebar — Table of Contents */}
        <aside className="w-full shrink-0 lg:sticky lg:top-20 lg:h-fit lg:w-56">
          <nav className="rounded-xl border border-card-border bg-card-bg p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
              {dict.study.contents}
            </h3>
            <ul className="mt-3 space-y-1.5">
              {study.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block text-xs text-muted transition hover:text-foreground"
                  >
                    {l === "zh" ? section.titleZh : section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href={`/USProGlove_Market_Report/USProGlove_Market_Report_Final.md`}
            target="_blank"
            className="mt-4 block rounded-xl border border-card-border bg-card-bg p-4 text-center text-xs text-muted transition hover:border-accent/40 hover:text-foreground"
          >
            {dict.study.viewFullReport}
          </Link>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-12">
          {study.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-20">
              <h2 className="text-xl font-bold">
                {l === "zh" ? section.titleZh : section.title}{" "}
                <span className="text-sm font-normal text-muted">
                  {l === "zh" ? section.title : section.titleZh}
                </span>
              </h2>
              <div
                className="study-content mt-4 text-sm leading-relaxed text-foreground/90"
                dangerouslySetInnerHTML={{
                  __html:
                    l === "zh"
                      ? (section.contentZh ?? section.content)
                      : section.content,
                }}
              />
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
