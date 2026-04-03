import Link from "next/link";
import { notFound } from "next/navigation";
import {
  industries,
  consultingModules,
  getIndustry,
  getCaseStudiesForIndustry,
} from "@/lib/data";
import { getExpertsFromDB } from "@/lib/db";
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
        ? `${industry.nameZh}咨询 | JY Consulting`
        : `${industry.name} Consulting | JY Consulting`,
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
  const industryExperts = await getExpertsFromDB(industry.slug);

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-card-border px-4 py-12 sm:px-6 sm:py-16">
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
          <div className="mt-6 flex items-start gap-3 sm:items-center sm:gap-4">
            <span className="text-4xl sm:text-5xl">{industry.icon}</span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
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
          {industry.slug === "legal" && (
            <div className="mt-4 max-w-2xl rounded-lg border border-indigo-500/40 bg-indigo-500/15 px-4 py-3">
              <p className="text-sm text-foreground">
                {l === "zh"
                  ? "⚖️ 本板块由 GPULaw 提供持证律师支持。所有法律咨询均由具备执业资格的律师提供，确保合规与专业性。"
                  : "⚖️ This section is powered by GPULaw with licensed attorneys. All legal consultations are provided by qualified, licensed lawyers ensuring compliance and professionalism."}
              </p>
            </div>
          )}
          {industry.slug === "medical" && (
            <div className="mt-4 max-w-2xl rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-4 py-3">
              <p className="text-sm text-foreground">
                {l === "zh"
                  ? "🏥 临床咨询服务由持证医师（MD/DO）提供。医疗器械、运营策略等商业咨询不要求医师执照。"
                  : "🏥 Clinical consulting is provided by licensed physicians (MD/DO). Business consulting for medical devices, operations, and strategy does not require a medical license."}
              </p>
            </div>
          )}
          {industry.slug === "finance" && (
            <div className="mt-4 max-w-2xl rounded-lg border border-amber-500/40 bg-amber-500/15 px-4 py-3">
              <p className="text-sm text-foreground">
                {l === "zh"
                  ? "⚠️ 免责声明：本平台提供的是金融保险行业的商业咨询（市场分析、运营策略、获客策略等），不提供任何投资建议、理财规划或证券推荐。如需金融服务，请咨询持证金融顾问。"
                  : "⚠️ Disclaimer: This platform provides business consulting for the finance and insurance industry (market analysis, operational strategy, customer acquisition, etc.). We do not provide investment advice, financial planning, or securities recommendations. Please consult a licensed financial advisor for financial needs."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Industry Experts (from DB) */}
      {industryExperts.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
          <h2 className="text-xl font-bold">{dict.expert.title}</h2>
          <p className="mt-1 text-sm text-muted">{dict.expert.subtitle}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industryExperts.map((expert) => {
              const avatarSrc = expert.avatarUrl || expert.externalAvatarUrl;
              const initials = expert.name
                .split(/\s+/)
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <Link
                  key={expert.slug}
                  href={`/${l}${expert.profileUrl}`}
                  className="group flex items-start gap-3 rounded-xl border border-card-border bg-card-bg p-4 sm:gap-4 sm:p-6 transition hover:border-accent/40"
                >
                  {avatarSrc ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={avatarSrc}
                      alt={expert.name}
                      className="h-14 w-14 shrink-0 rounded-full object-cover shadow"
                    />
                  ) : (
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white shadow"
                      style={{ background: industry.color }}
                    >
                      {initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-semibold">
                      {expert.name}
                      {expert.nameZh && (
                        <>
                          {" "}
                          <span className="text-xs font-normal text-muted">
                            {l === "zh" ? expert.name : expert.nameZh}
                          </span>
                        </>
                      )}
                    </h3>
                    <p className="text-xs text-muted">
                      {l === "zh" ? (expert.titleZh ?? expert.title) : expert.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
                      {l === "zh" ? (expert.bioZh ?? expert.bio) : expert.bio}
                    </p>
                    <span
                      className="mt-3 inline-flex items-center gap-1 text-sm font-medium"
                      style={{ color: industry.color }}
                    >
                      {dict.expert.viewProfile}
                      <span className="transition group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Modules Grid */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
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
          <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
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
