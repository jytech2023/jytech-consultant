import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import CalendlyBooking from "@/components/CalendlyBooking";
import { db } from "@/lib/db";
import { getExpertBySlug } from "@/lib/db";
import { getIndustry } from "@/lib/data";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

type Props = {
  params: Promise<{ locale: string; slug: string; expertSlug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale, expertSlug } = await params;
  const expert = await getExpertBySlug(expertSlug);
  if (!expert) return {};

  const name = locale === "zh" && expert.nameZh ? expert.nameZh : expert.name;
  const title =
    locale === "zh" && expert.titleZh ? expert.titleZh : expert.title;

  return {
    title: `${name} | ${locale === "zh" ? "行业专家" : "Industry Expert"}`,
    description: locale === "zh" && expert.bioZh ? expert.bioZh : expert.bio,
    alternates: {
      languages: {
        en: `/en${expert.profileUrl}`,
        zh: `/zh${expert.profileUrl}`,
      },
    },
  };
}

export default async function ExpertFallbackPage({ params }: Props) {
  const { locale, slug: industrySlug, expertSlug } = await params;
  if (!hasLocale(locale)) notFound();

  const expert = await getExpertBySlug(expertSlug);
  if (!expert || !expert.active) notFound();

  // Verify the expert belongs to this industry
  const expertIndustries = expert.industries.split(",");
  if (!expertIndustries.includes(industrySlug)) notFound();

  const industry = getIndustry(industrySlug);
  const dict = await getDictionary(locale as Locale);
  const l = locale as Locale;

  const name = l === "zh" && expert.nameZh ? expert.nameZh : expert.name;
  const title = l === "zh" && expert.titleZh ? expert.titleZh : expert.title;
  const bio = l === "zh" && expert.bioZh ? expert.bioZh : expert.bio;
  const industryName =
    industry
      ? l === "zh"
        ? industry.nameZh
        : industry.name
      : industrySlug;
  const initials = expert.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Look up expert's user record for Calendly booking
  const expertUser = expert.userId
    ? (
        await db
          .select({
            id: users.id,
            hourlyRate: users.hourlyRate,
            hourlyRateOnline: users.hourlyRateOnline,
            picture: users.picture,
          })
          .from(users)
          .where(eq(users.id, expert.userId))
          .limit(1)
      )[0] ?? null
    : null;

  const expertUserId = expertUser?.id ?? null;
  const expertHourlyRate =
    expertUser?.hourlyRateOnline ??
    expertUser?.hourlyRate ??
    expert.hourlyRate ??
    200;
  const avatarUrl =
    expertUser?.picture ?? expert.externalAvatarUrl ?? expert.avatarUrl ?? null;

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-card-border px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/15 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href={`/${l}/industry/${industrySlug}`}
            className="inline-flex items-center gap-1 text-sm text-muted transition hover:text-foreground"
          >
            {l === "zh"
              ? `← 返回${industryName}咨询`
              : `← Back to ${industryName}`}
          </Link>

          <div className="mt-8 flex flex-col items-start gap-8 sm:flex-row sm:items-center">
            {avatarUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={avatarUrl}
                alt={expert.name}
                className="h-28 w-28 shrink-0 rounded-full object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-4xl font-bold text-white shadow-lg">
                {initials}
              </div>
            )}
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
                {l === "zh"
                  ? `${industryName}行业专家`
                  : `${industryName} Industry Expert`}
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                {name}
              </h1>
              <p className="mt-1 text-muted">{title}</p>
              {bio && (
                <p className="mt-4 max-w-2xl text-muted">{bio}</p>
              )}
              {expert.city && (
                <p className="mt-2 text-sm text-muted">
                  📍 {expert.city}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="border-t border-card-border px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight">
            {l === "zh" ? "预约咨询" : "Book a Consultation"}
          </h2>
          <p className="mt-2 text-muted">
            {l === "zh"
              ? `选择时间，与 ${expert.name} 进行一对一咨询`
              : `Select a time to schedule a one-on-one consultation with ${expert.name}`}
          </p>
          <div className="mt-8">
            <CalendlyBooking
              expertUserId={expertUserId}
              expertName={expert.name}
              hourlyRate={expertHourlyRate}
              locale={l}
            />
          </div>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/${l}/industry/${industrySlug}`}
              className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-6 py-3 font-medium transition hover:border-accent/40"
            >
              {l === "zh"
                ? `探索${industryName}咨询`
                : `Explore ${industryName} Consulting`}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
