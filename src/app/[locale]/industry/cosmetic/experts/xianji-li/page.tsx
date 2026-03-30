import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

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
        ? "Xianji Li | 美妆行业专家"
        : "Xianji Li | Cosmetic Industry Expert",
    description:
      locale === "zh"
        ? "Xianji Li (李先基) — Unincore & Coway 旧金山湾区销售主管，年营业额百万级，深耕美妆与健康家电行业"
        : "Xianji Li — Regional Sales Director for Unincore & Coway in the San Francisco Bay Area, with annual revenue exceeding one million, specializing in beauty and wellness appliances",
    alternates: {
      languages: {
        en: "/en/industry/cosmetic/experts/xianji-li",
        zh: "/zh/industry/cosmetic/experts/xianji-li",
      },
    },
  };
}

const brands = [
  {
    name: "Unincore",
    role: { en: "Regional Sales Director", zh: "区域销售主管" },
    description:
      "Premium beauty and skincare brand, driving regional sales strategy and distribution across the San Francisco Bay Area.",
    descriptionZh:
      "高端美妆护肤品牌，负责旧金山湾区的区域销售策略与渠道拓展。",
    icon: "✨",
    color: "#ec4899",
  },
  {
    name: "Coway",
    role: { en: "Regional Sales Director", zh: "区域销售主管" },
    description:
      "Leading wellness and home appliance brand, managing Bay Area sales operations with annual revenue exceeding one million dollars.",
    descriptionZh:
      "领先的健康家电品牌，管理湾区销售运营，年营业额超百万美元。",
    icon: "💧",
    color: "#3b82f6",
  },
];

const highlights = {
  en: [
    {
      stat: "$1M+",
      label: "Annual Revenue",
      detail:
        "Consistently achieving seven-figure annual sales in the SF Bay Area market",
    },
    {
      stat: "Unincore & Coway",
      label: "Dual Brand Leadership",
      detail:
        "Managing sales operations for two major beauty and wellness brands simultaneously",
    },
    {
      stat: "SF Bay Area",
      label: "Regional Market Expert",
      detail:
        "Deep understanding of the Bay Area consumer landscape and distribution channels",
    },
    {
      stat: "Beauty & Wellness",
      label: "Industry Focus",
      detail:
        "Specialized expertise spanning cosmetics, skincare, and wellness home appliances",
    },
  ],
  zh: [
    {
      stat: "百万+",
      label: "年营业额",
      detail: "在旧金山湾区市场持续实现百万级年度销售业绩",
    },
    {
      stat: "Unincore & Coway",
      label: "双品牌领导力",
      detail: "同时管理两大美妆与健康品牌的销售运营",
    },
    {
      stat: "旧金山湾区",
      label: "区域市场专家",
      detail: "深度了解湾区消费者市场格局与渠道分布",
    },
    {
      stat: "美妆与健康",
      label: "行业聚焦",
      detail: "横跨美妆、护肤与健康家电领域的专业积累",
    },
  ],
};

const expertise = {
  en: [
    {
      title: "Beauty & Cosmetic Sales",
      description:
        "Extensive experience in premium beauty and skincare product sales, including brand positioning, product launches, and retail channel management.",
      icon: "💄",
    },
    {
      title: "Regional Sales Management",
      description:
        "Proven track record of managing multi-brand sales operations across the San Francisco Bay Area, consistently exceeding revenue targets.",
      icon: "📊",
    },
    {
      title: "Distribution & Channel Strategy",
      description:
        "Expert in building and optimizing distribution networks, from direct-to-consumer channels to retail partnerships and wholesale operations.",
      icon: "🔗",
    },
    {
      title: "Wellness & Home Appliances",
      description:
        "Deep knowledge in health and wellness appliance markets, bridging the gap between beauty and home wellness product categories.",
      icon: "💧",
    },
    {
      title: "Cross-Cultural Market Development",
      description:
        "Skilled at navigating the Bay Area's diverse consumer base, with particular strength in Asian-American market segments.",
      icon: "🌏",
    },
    {
      title: "Client Relationship Management",
      description:
        "Building and maintaining long-term client relationships that drive repeat business and sustainable revenue growth.",
      icon: "🤝",
    },
  ],
  zh: [
    {
      title: "美妆销售",
      description:
        "在高端美妆护肤产品销售方面拥有丰富经验，涵盖品牌定位、新品发布及零售渠道管理。",
      icon: "💄",
    },
    {
      title: "区域销售管理",
      description:
        "在旧金山湾区管理多品牌销售运营的成功经验，持续超额完成营收目标。",
      icon: "📊",
    },
    {
      title: "分销与渠道策略",
      description:
        "精通分销网络的构建与优化，涵盖DTC直销、零售合作及批发运营等多种模式。",
      icon: "🔗",
    },
    {
      title: "健康家电",
      description:
        "深入了解健康与家电市场，打通美妆与居家健康产品品类之间的关联。",
      icon: "💧",
    },
    {
      title: "跨文化市场开拓",
      description:
        "善于拓展湾区多元化消费者群体，尤其在亚裔美国人市场细分中具有突出优势。",
      icon: "🌏",
    },
    {
      title: "客户关系管理",
      description:
        "建立并维护长期客户关系，驱动复购与可持续的营收增长。",
      icon: "🤝",
    },
  ],
};

export default async function XianjiLiExpertPage({
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

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-card-border px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/15 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href={`/${l}/industry/cosmetic`}
            className="inline-flex items-center gap-1 text-sm text-muted transition hover:text-foreground"
          >
            {l === "zh" ? "← 返回美妆咨询" : "← Back to Cosmetic"}
          </Link>

          <div className="mt-8 flex flex-col items-start gap-8 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-rose-600 text-4xl font-bold text-white shadow-lg">
              XL
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-pink-400">
                {l === "zh" ? "美妆行业专家" : "Cosmetic Industry Expert"}
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                Xianji Li{" "}
                <span className="text-lg font-normal text-muted">
                  {l === "zh" ? "李先基" : "(Li Xianji)"}
                </span>
              </h1>
              <p className="mt-1 text-muted">
                {l === "zh"
                  ? "Unincore & Coway 旧金山湾区销售主管"
                  : "Regional Sales Director, Unincore & Coway · San Francisco Bay Area"}
              </p>
              <p className="mt-4 max-w-2xl text-muted">
                {l === "zh"
                  ? "Xianji Li 是 Unincore 与 Coway 旧金山湾区的销售主管，年营业额超百万美元。他深耕美妆护肤与健康家电领域，精通区域销售管理、渠道建设和跨文化市场开发，在湾区消费者市场拥有广泛的人脉与深厚的行业洞察。"
                  : "Xianji Li is the Regional Sales Director for Unincore and Coway in the San Francisco Bay Area, with annual revenue exceeding one million dollars. Specializing in beauty, skincare, and wellness appliances, he brings deep expertise in regional sales management, distribution strategy, and cross-cultural market development across the Bay Area consumer landscape."}
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
              <p className="text-2xl font-bold text-pink-400">{item.stat}</p>
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
              ? "Xianji 在美妆与健康行业的核心能力与专长"
              : "Xianji's core competencies and specializations in the beauty and wellness industry"}
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

      {/* Brands */}
      <section className="border-t border-card-border px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold tracking-tight">
            {l === "zh" ? "代理品牌" : "Brand Portfolio"}
          </h2>
          <p className="mt-2 text-muted">
            {l === "zh"
              ? "Xianji 负责运营与管理的品牌"
              : "Brands managed and operated by Xianji"}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {brands.map((b) => (
              <div
                key={b.name}
                className="flex gap-4 rounded-xl border border-card-border bg-card-bg p-6"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-2xl"
                  style={{ background: `${b.color}20` }}
                >
                  {b.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{b.name}</h3>
                    <span className="rounded-full bg-card-border px-2 py-0.5 text-xs text-muted">
                      {l === "zh" ? b.role.zh : b.role.en}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {l === "zh" ? b.descriptionZh : b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-card-border px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            {l === "zh"
              ? "与 Xianji Li 咨询"
              : "Consult with Xianji Li"}
          </h2>
          <p className="mt-3 text-muted">
            {l === "zh"
              ? "获取来自美妆与健康行业资深销售专家的商业洞察与市场策略建议。从品牌分销到区域市场开拓，Xianji 可以为您的业务提供专业指导。"
              : "Get business insights and market strategy advice from a seasoned beauty and wellness sales expert. From brand distribution to regional market development, Xianji can provide expert guidance for your business."}
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/${l}/industry/cosmetic`}
              className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-6 py-3 font-medium transition hover:border-accent/40"
            >
              {l === "zh" ? "探索美妆咨询" : "Explore Cosmetic Consulting"}
            </Link>
            <Link
              href={`/${l}/pricing`}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
              {l === "zh" ? "预约咨询" : "Book a Consultation"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
