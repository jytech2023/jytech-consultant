import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import CalendlyBooking from "@/components/CalendlyBooking";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

const JEFF_EMAIL = "jeffguan@bannershopusa.com";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title:
      locale === "zh"
        ? "Jeff Guan | 传媒行业专家"
        : "Jeff Guan | Media Industry Expert",
    description:
      locale === "zh"
        ? "Jeff Guan — BannerShop USA 创始人，ShopDineGuide、FoodieGuide、FoodieCoupon 及东方新媒体创始人，拥有百万级流量的传媒行业专家"
        : "Jeff Guan — Founder of BannerShop USA, ShopDineGuide, FoodieGuide, FoodieCoupon and Eastern New Media channels, a media industry expert with millions of reach",
    alternates: {
      languages: {
        en: "/en/industry/media/experts/jeff-guan",
        zh: "/zh/industry/media/experts/jeff-guan",
      },
    },
  };
}

const platforms = [
  {
    name: "BannerShop USA",
    url: "https://bannershopusa.com",
    description:
      "Bay Area's trusted print & signage shop since 1993, now evolving into a digital media hub.",
    descriptionZh:
      "湾区值得信赖的印刷与标识店，创立于1993年，现正转型为数字传媒枢纽。",
    icon: "🏪",
    color: "#f59e0b",
  },
  {
    name: "ShopDineGuide",
    url: "https://shopdineguide.com",
    description:
      "Local shopping & dining discovery platform connecting Bay Area consumers with businesses.",
    descriptionZh: "本地购物与美食发现平台，连接湾区消费者与商家。",
    icon: "🛍️",
    color: "#3b82f6",
  },
  {
    name: "FoodieGuide",
    url: "https://foodieguide.com",
    description:
      "Curated food content and restaurant recommendations for food enthusiasts.",
    descriptionZh: "精选美食内容与餐厅推荐，为美食爱好者打造。",
    icon: "🍜",
    color: "#ef4444",
  },
  {
    name: "FoodieCoupon",
    url: "https://foodiecoupon.com",
    description:
      "Digital coupon & promotion platform driving foot traffic for local restaurants.",
    descriptionZh: "数字优惠券与促销平台，为本地餐厅带来客流。",
    icon: "🎟️",
    color: "#10b981",
  },
];

const highlights = {
  en: [
    {
      stat: "30+",
      label: "Years in Media & Print",
      detail: "From traditional print to digital media transformation since 1993",
    },
    {
      stat: "1M+",
      label: "Audience Reach",
      detail:
        "Combined traffic across all platforms and Eastern New Media channels",
    },
    {
      stat: "4",
      label: "Digital Platforms",
      detail:
        "BannerShopUSA, ShopDineGuide, FoodieGuide, and FoodieCoupon",
    },
    {
      stat: "SF Bay Area",
      label: "Local Market Focus",
      detail:
        "Deep expertise in Bay Area's Chinese-American business community",
    },
  ],
  zh: [
    {
      stat: "30+",
      label: "年传媒与印刷经验",
      detail: "自1993年起，从传统印刷到数字传媒的全面转型",
    },
    {
      stat: "100万+",
      label: "受众覆盖",
      detail: "所有平台及东方新媒体频道的综合流量",
    },
    {
      stat: "4",
      label: "个数字平台",
      detail: "BannerShopUSA、ShopDineGuide、FoodieGuide 和 FoodieCoupon",
    },
    {
      stat: "旧金山湾区",
      label: "深耕本地市场",
      detail: "深度了解湾区华裔商业社区",
    },
  ],
};

const expertise = {
  en: [
    {
      title: "Print-to-Digital Transformation",
      description:
        "Pioneered the transition from traditional print services to a comprehensive digital media ecosystem, blending offline and online channels.",
      icon: "🔄",
    },
    {
      title: "Local Media Platform Building",
      description:
        "Built multiple interconnected platforms (shopping, dining, coupons) that serve as a local commerce and content ecosystem.",
      icon: "📡",
    },
    {
      title: "Audience Growth & Content Strategy",
      description:
        "Grew Eastern New Media channels to reach millions, mastering content creation for the Chinese-American community.",
      icon: "📈",
    },
    {
      title: "Local Business Advertising",
      description:
        "Extensive experience helping local businesses — restaurants, retail, services — reach their target audiences through integrated media campaigns.",
      icon: "📣",
    },
    {
      title: "Cross-Cultural Media Operations",
      description:
        "Bridging Chinese and American media landscapes, creating bilingual content and ad strategies for diverse audiences.",
      icon: "🌏",
    },
    {
      title: "Digital Coupon & Commerce",
      description:
        "Designed and operated digital coupon and promotion systems that drive measurable foot traffic and conversions for local merchants.",
      icon: "💰",
    },
  ],
  zh: [
    {
      title: "印刷到数字化转型",
      description:
        "开创性地完成从传统印刷服务到综合数字传媒生态系统的转型，融合线上线下渠道。",
      icon: "🔄",
    },
    {
      title: "本地传媒平台建设",
      description:
        "构建多个相互关联的平台（购物、餐饮、优惠券），打造本地商业与内容生态系统。",
      icon: "📡",
    },
    {
      title: "流量增长与内容策略",
      description:
        "将东方新媒体频道发展至百万级覆盖，精通华裔社区内容创作。",
      icon: "📈",
    },
    {
      title: "本地商业广告",
      description:
        "丰富的帮助本地商家（餐厅、零售、服务业）通过整合传媒推广触达目标受众的经验。",
      icon: "📣",
    },
    {
      title: "跨文化传媒运营",
      description:
        "搭建中美传媒桥梁，为多元受众创建双语内容与广告策略。",
      icon: "🌏",
    },
    {
      title: "数字优惠券与商务",
      description:
        "设计并运营数字优惠券与促销系统，为本地商家带来可衡量的客流与转化。",
      icon: "💰",
    },
  ],
};

export default async function JeffGuanExpertPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const l = locale as Locale;

  const h = highlights[l];
  const exp = expertise[l];

  // Look up expert's user record for Calendly booking
  const [expertUser] = await db
    .select({
      id: users.id,
      hourlyRate: users.hourlyRate,
      hourlyRateOnline: users.hourlyRateOnline,
      picture: users.picture,
    })
    .from(users)
    .where(eq(users.email, JEFF_EMAIL))
    .limit(1);
  const expertUserId = expertUser?.id ?? null;
  const expertHourlyRate = expertUser?.hourlyRateOnline ?? expertUser?.hourlyRate ?? 500;

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-card-border px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/15 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href={`/${l}/industry/media`}
            className="inline-flex items-center gap-1 text-sm text-muted transition hover:text-foreground"
          >
            {l === "zh" ? "← 返回传媒广告" : "← Back to Media"}
          </Link>

          <div className="mt-8 flex flex-col items-start gap-8 sm:flex-row sm:items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://shopdineguide.com/images/logo/store02.png"
              alt="Jeff Guan"
              className="h-28 w-28 shrink-0 rounded-full object-cover shadow-lg"
            />
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-orange-400">
                {l === "zh" ? "传媒行业专家" : "Media Industry Expert"}
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                Jeff Guan
              </h1>
              <p className="mt-1 text-muted">
                {l === "zh"
                  ? "BannerShop USA 创始人 · 东方新媒体"
                  : "Founder, BannerShop USA · Eastern New Media"}
              </p>
              <p className="mt-4 max-w-2xl text-muted">
                {l === "zh"
                  ? "拥有超过30年传媒与印刷行业经验，Jeff Guan 创办了 BannerShop USA 并成功构建了包含 ShopDineGuide、FoodieGuide、FoodieCoupon 和东方新媒体频道在内的数字传媒生态系统，综合流量超百万，是旧金山湾区华裔商业传媒领域的领军人物。"
                  : "With over 30 years in media and print, Jeff Guan founded BannerShop USA and built a digital media ecosystem spanning ShopDineGuide, FoodieGuide, FoodieCoupon, and the Eastern New Media channels — reaching over a million combined audience and establishing himself as a leading figure in the Bay Area's Chinese-American business media landscape."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {h.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-card-border bg-card-bg p-6"
            >
              <p className="text-2xl font-bold text-orange-400">{item.stat}</p>
              <p className="mt-1 font-semibold">{item.label}</p>
              <p className="mt-2 text-sm text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="border-t border-card-border bg-card-bg/50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold tracking-tight">
            {l === "zh" ? "专业领域" : "Areas of Expertise"}
          </h2>
          <p className="mt-2 text-muted">
            {l === "zh"
              ? "Jeff 在传媒行业的核心能力与专长"
              : "Jeff's core competencies and specializations in the media industry"}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {exp.map((area) => (
              <div
                key={area.title}
                className="rounded-xl border border-card-border bg-background p-6"
              >
                <div className="text-3xl">{area.icon}</div>
                <h3 className="mt-3 font-semibold">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="border-t border-card-border px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold tracking-tight">
            {l === "zh" ? "旗下平台" : "Platforms & Properties"}
          </h2>
          <p className="mt-2 text-muted">
            {l === "zh"
              ? "Jeff 创建并运营的数字传媒平台"
              : "Digital media platforms founded and operated by Jeff"}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {platforms.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 rounded-xl border border-card-border bg-card-bg p-6 transition hover:border-orange-400/40"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-2xl"
                  style={{ background: `${p.color}20` }}
                >
                  {p.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="mt-0.5 truncate text-xs text-muted">
                    {p.url.replace("https://", "")}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {l === "zh" ? p.descriptionZh : p.description}
                  </p>
                  <span
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium"
                    style={{ color: p.color }}
                  >
                    {l === "zh" ? "访问网站" : "Visit Site"}
                    <span className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Eastern New Media */}
          <div className="mt-8 rounded-xl border border-card-border bg-card-bg p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-purple-500/20 text-2xl">
                📺
              </div>
              <div>
                <h3 className="font-semibold">
                  {l === "zh" ? "东方新媒体" : "Eastern New Media"}
                </h3>
                <p className="text-sm text-muted">
                  {l === "zh"
                    ? "覆盖百万受众的华语新媒体频道矩阵，涵盖美食、生活方式、本地商业资讯等内容"
                    : "A Chinese-language new media channel network reaching over a million audiences, covering food, lifestyle, and local business content"}
                </p>
              </div>
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
              ? "选择时间，与 Jeff Guan 进行一对一咨询"
              : "Select a time to schedule a one-on-one consultation with Jeff Guan"}
          </p>
          <div className="mt-8">
            <CalendlyBooking
              expertUserId={expertUserId}
              expertName="Jeff Guan"
              hourlyRate={expertHourlyRate}
              locale={l}
            />
          </div>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/${l}/industry/media`}
              className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-6 py-3 font-medium transition hover:border-accent/40"
            >
              {l === "zh" ? "探索传媒咨询" : "Explore Media Consulting"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
