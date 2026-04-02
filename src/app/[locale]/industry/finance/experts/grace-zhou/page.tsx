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
        ? "Grace Zhou | 金融保险行业专家"
        : "Grace Zhou | Finance & Insurance Expert",
    description:
      locale === "zh"
        ? "Grace Zhou — Lions Club 旧金山分会会长，深耕海外资产配置、人寿保险、退休投资理财，同时涉足高级珠宝设计与健康美容领域"
        : "Grace Zhou — President of SF Global Healthcare Lions Club, specializing in overseas asset allocation, life insurance, retirement planning, plus custom jewelry and health & beauty",
    alternates: {
      languages: {
        en: "/en/industry/finance/experts/grace-zhou",
        zh: "/zh/industry/finance/experts/grace-zhou",
      },
    },
  };
}

const highlights = {
  en: [
    {
      stat: "Lions Club",
      label: "Community Leadership",
      detail:
        "President of SF Global Healthcare Cyber Lions Club, District 4 C4 California",
    },
    {
      stat: "Insurance & Wealth",
      label: "Financial Expertise",
      detail:
        "Overseas asset allocation, life insurance, and retirement investment planning",
    },
    {
      stat: "Jewelry Design",
      label: "Creative Ventures",
      detail:
        "Senior custom jewelry designer with unique aesthetic and craftsmanship",
    },
    {
      stat: "Bay Area",
      label: "Regional Presence",
      detail:
        "Based in San Mateo, CA — serving the greater San Francisco Bay Area community",
    },
  ],
  zh: [
    {
      stat: "Lions Club",
      label: "社区领袖",
      detail:
        "旧金山国际大健康狮子会会长，District 4 C4 California",
    },
    {
      stat: "保险理财",
      label: "金融专长",
      detail:
        "海外资产配置、人寿保险与退休投资理财顾问",
    },
    {
      stat: "珠宝设计",
      label: "创意跨界",
      detail:
        "高级珠宝定制设计师，兼具独特审美与精湛工艺",
    },
    {
      stat: "湾区",
      label: "区域深耕",
      detail:
        "坐标 San Mateo, CA，服务旧金山湾区广大社区",
    },
  ],
};

const expertise = {
  en: [
    {
      title: "Life Insurance Planning",
      description:
        "Comprehensive life insurance solutions tailored to individuals and families, including term, whole life, and universal life policies for long-term financial security.",
      icon: "🛡️",
    },
    {
      title: "Retirement Investment Planning",
      description:
        "Strategic retirement planning and investment advisory, helping clients build sustainable wealth through diversified portfolios and tax-efficient strategies.",
      icon: "📈",
    },
    {
      title: "Overseas Asset Allocation",
      description:
        "Expert guidance on cross-border asset allocation and wealth management, bridging opportunities between the US and international markets.",
      icon: "🌏",
    },
    {
      title: "Custom Jewelry Design",
      description:
        "Senior custom jewelry designer creating unique, high-end pieces. Combining artistic vision with precious materials for discerning clients.",
      icon: "💎",
    },
    {
      title: "Health & Beauty Products",
      description:
        "Curating premium health care products and skin care beauty cosmetics, with deep knowledge of wellness and beauty industry trends.",
      icon: "✨",
    },
    {
      title: "Community & Nonprofit Leadership",
      description:
        "As Lions Club president, experienced in community engagement, fundraising, healthcare initiatives, and building cross-cultural networks in the Bay Area.",
      icon: "🤝",
    },
  ],
  zh: [
    {
      title: "人寿保险规划",
      description:
        "为个人与家庭量身定制人寿保险方案，涵盖定期寿险、终身寿险与万能寿险，保障长期财务安全。",
      icon: "🛡️",
    },
    {
      title: "退休投资理财",
      description:
        "提供战略性退休规划与投资顾问服务，帮助客户通过多元化投资组合与节税策略实现可持续财富增长。",
      icon: "📈",
    },
    {
      title: "海外资产配置",
      description:
        "跨境资产配置与财富管理专家，链接美国与国际市场的投资机遇。",
      icon: "🌏",
    },
    {
      title: "高级珠宝定制",
      description:
        "高级珠宝定制设计师，将艺术审美与珍贵材料完美结合，为高端客户打造独一无二的作品。",
      icon: "💎",
    },
    {
      title: "健康美容产品",
      description:
        "精选优质健康保健品与美容美妆品，深入了解健康与美容行业趋势。",
      icon: "✨",
    },
    {
      title: "社区与公益领导力",
      description:
        "作为 Lions Club 会长，在社区参与、筹款、健康倡议和湾区跨文化网络建设方面拥有丰富经验。",
      icon: "🤝",
    },
  ],
};

export default async function GraceZhouExpertPage({
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
      <section className="relative overflow-hidden border-b border-card-border px-4 py-12 sm:px-6 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/15 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href={`/${l}/industry/finance`}
            className="inline-flex items-center gap-1 text-sm text-muted transition hover:text-foreground"
          >
            {l === "zh" ? "← 返回金融保险咨询" : "← Back to Finance & Insurance"}
          </Link>

          <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/avatar/grace-zhou.png"
              alt="Grace Zhou"
              className="h-28 w-28 shrink-0 rounded-full object-cover shadow-lg"
            />
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
                {l === "zh" ? "金融保险行业专家" : "Finance & Insurance Expert"}
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                Grace Zhou
              </h1>
              <p className="mt-1 text-muted">
                {l === "zh"
                  ? "Lions Club 旧金山国际大健康狮子会会长 · 保险理财顾问 · 高级珠宝设计师"
                  : "President, SF Global Healthcare Lions Club · Insurance & Wealth Advisor · Senior Jewelry Designer"}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                {l === "zh"
                  ? "Grace Zhou 是旧金山国际大健康狮子会（Lions Club District 4 C4）会长，坐标 San Mateo。她深耕海外资产配置、人寿保险与退休投资理财领域，同时是一位资深的高级珠宝定制设计师，并涉足健康保健品与美容美妆品行业。她以多元的专业背景和广泛的社区网络，为湾区华人社区提供全方位的金融与生活方式服务。"
                  : "Grace Zhou is the President of the San Francisco Global Healthcare Cyber Lions Club (District 4 C4 California), based in San Mateo. She specializes in overseas asset allocation, life insurance, and retirement investment planning, while also being a senior custom jewelry designer with ventures in health care and beauty products. With her diverse expertise and extensive community network, she serves the Bay Area community with comprehensive financial and lifestyle services."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {h.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6"
            >
              <p className="text-2xl font-bold text-emerald-400">{item.stat}</p>
              <p className="mt-1 font-semibold">{item.label}</p>
              <p className="mt-2 text-sm text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="border-t border-card-border bg-card-bg/50 px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            {l === "zh" ? "专业领域" : "Areas of Expertise"}
          </h2>
          <p className="mt-2 text-muted">
            {l === "zh"
              ? "Grace 在金融保险与跨界领域的核心能力与专长"
              : "Grace's core competencies across finance, insurance, and beyond"}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {exp.map((area) => (
              <div
                key={area.title}
                className="rounded-xl border border-card-border bg-background p-5 sm:p-6"
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

      {/* Contact & Location */}
      <section className="border-t border-card-border px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            {l === "zh" ? "联系方式" : "Contact Information"}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
              <div className="text-2xl">📍</div>
              <h3 className="mt-2 font-semibold">
                {l === "zh" ? "办公地址" : "Office"}
              </h3>
              <p className="mt-1 text-sm text-muted">
                1875 S Grant Street #100
                <br />
                San Mateo, CA 94402
              </p>
            </div>
            <div className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
              <div className="text-2xl">🦁</div>
              <h3 className="mt-2 font-semibold">Lions Club</h3>
              <p className="mt-1 text-sm text-muted">
                {l === "zh"
                  ? "旧金山国际大健康狮子会会长"
                  : "SF Global Healthcare Cyber Lions Club"}
                <br />
                District 4 C4 California
              </p>
            </div>
            <div className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
              <div className="text-2xl">📧</div>
              <h3 className="mt-2 font-semibold">
                {l === "zh" ? "联系邮箱" : "Email"}
              </h3>
              <p className="mt-1 text-sm text-muted">
                <a
                  href="mailto:czhouc2002@gmail.com"
                  className="transition hover:text-foreground"
                >
                  czhouc2002@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-card-border px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            {l === "zh"
              ? "与 Grace Zhou 咨询"
              : "Consult with Grace Zhou"}
          </h2>
          <p className="mt-3 text-muted">
            {l === "zh"
              ? "获取来自金融保险行业资深顾问的专业建议。从海外资产配置到人寿保险规划，Grace 为您提供全方位的金融咨询服务。"
              : "Get expert advice from a seasoned finance and insurance professional. From overseas asset allocation to life insurance planning, Grace provides comprehensive financial consulting services."}
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/${l}/industry/finance`}
              className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-6 py-3 font-medium transition hover:border-accent/40"
            >
              {l === "zh" ? "探索金融保险咨询" : "Explore Finance & Insurance"}
            </Link>
            <Link
              href={`/${l}/pricing`}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
              {l === "zh" ? "预约咨询" : "Book a Consultation"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
