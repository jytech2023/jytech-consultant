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
        ? "Helen Lan | 制造业专家"
        : "Helen Lan | Manufacturing Industry Expert",
    description:
      locale === "zh"
        ? "Helen Lan — 深圳电子制造与外贸出海专家，曾管理超百人团队，深耕电子制造、供应链与跨境贸易"
        : "Helen Lan — Shenzhen electronics manufacturing and international trade expert, managed teams of 100+, specializing in electronics manufacturing, supply chain, and cross-border commerce",
    alternates: {
      languages: {
        en: "/en/industry/manufacturing/experts/helen-lan",
        zh: "/zh/industry/manufacturing/experts/helen-lan",
      },
    },
  };
}

const experience = [
  {
    company: { en: "Electronics Manufacturing", zh: "电子制造" },
    description:
      "Led electronics manufacturing operations in Shenzhen, one of the world's largest electronics manufacturing hubs, overseeing production, quality control, and supply chain management.",
    descriptionZh:
      "在全球最大的电子制造中心之一——深圳领导电子制造运营，负责生产管理、品质控制与供应链管理。",
    icon: "🏭",
    color: "#f59e0b",
  },
  {
    company: { en: "Foreign Trade & Export", zh: "外贸出口" },
    description:
      "Extensive experience in international trade operations, export compliance, and building global distribution networks for manufactured goods.",
    descriptionZh:
      "在国际贸易运营、出口合规以及制造业产品全球分销网络建设方面拥有丰富经验。",
    icon: "🌍",
    color: "#3b82f6",
  },
  {
    company: { en: "Team Leadership", zh: "团队管理" },
    description:
      "Managed cross-functional teams of over 100 people across manufacturing, quality assurance, logistics, and sales departments.",
    descriptionZh:
      "管理超过百人的跨职能团队，涵盖制造、质量保证、物流和销售等部门。",
    icon: "👥",
    color: "#10b981",
  },
];

const highlights = {
  en: [
    {
      stat: "100+",
      label: "Team Size Managed",
      detail:
        "Led large cross-functional teams across manufacturing, QA, logistics, and sales",
    },
    {
      stat: "Shenzhen",
      label: "Manufacturing Hub",
      detail:
        "Based in the world's electronics manufacturing capital with deep factory networks",
    },
    {
      stat: "Global",
      label: "Export & Trade",
      detail:
        "Established international trade channels across multiple continents and markets",
    },
    {
      stat: "Electronics",
      label: "Industry Specialization",
      detail:
        "Deep expertise in consumer and industrial electronics manufacturing and supply chain",
    },
  ],
  zh: [
    {
      stat: "100+",
      label: "团队管理规模",
      detail: "领导涵盖制造、质量、物流和销售的大型跨职能团队",
    },
    {
      stat: "深圳",
      label: "制造业枢纽",
      detail: "扎根全球电子制造之都，拥有深厚的工厂资源网络",
    },
    {
      stat: "全球化",
      label: "外贸出海",
      detail: "建立覆盖多个大洲和市场的国际贸易渠道",
    },
    {
      stat: "电子制造",
      label: "行业专精",
      detail: "深耕消费电子与工业电子制造及供应链领域",
    },
  ],
};

const expertise = {
  en: [
    {
      title: "Electronics Manufacturing",
      description:
        "Deep expertise in Shenzhen's electronics manufacturing ecosystem — from PCB assembly to finished goods, managing full production lifecycles.",
      icon: "🔧",
    },
    {
      title: "Supply Chain Management",
      description:
        "Building and optimizing manufacturing supply chains, including component sourcing, vendor management, and cost optimization strategies.",
      icon: "🔗",
    },
    {
      title: "International Trade & Export",
      description:
        "Navigating complex international trade regulations, export compliance, tariffs, and cross-border logistics for manufactured goods.",
      icon: "🌍",
    },
    {
      title: "Going Global Strategy",
      description:
        "Helping Chinese manufacturers expand into international markets — from market selection and pricing strategy to channel development and localization.",
      icon: "🚀",
    },
    {
      title: "Large Team Leadership",
      description:
        "Proven experience managing teams of over 100 people, building organizational structures, and driving operational efficiency at scale.",
      icon: "👥",
    },
    {
      title: "Quality Control & Compliance",
      description:
        "Implementing quality management systems, international certifications, and ensuring product compliance for global markets.",
      icon: "✅",
    },
  ],
  zh: [
    {
      title: "电子制造",
      description:
        "深耕深圳电子制造生态——从PCB组装到成品，全面管理产品生产全生命周期。",
      icon: "🔧",
    },
    {
      title: "供应链管理",
      description:
        "构建和优化制造业供应链，包括元器件采购、供应商管理及成本优化策略。",
      icon: "🔗",
    },
    {
      title: "国际贸易与出口",
      description:
        "精通复杂的国际贸易法规、出口合规、关税政策及制造业产品的跨境物流。",
      icon: "🌍",
    },
    {
      title: "出海战略",
      description:
        "帮助中国制造企业拓展国际市场——从市场选择、定价策略到渠道建设与本地化运营。",
      icon: "🚀",
    },
    {
      title: "大型团队管理",
      description:
        "管理超百人团队的成功经验，擅长组织架构搭建与大规模运营效率提升。",
      icon: "👥",
    },
    {
      title: "品质管控与合规",
      description:
        "实施质量管理体系与国际认证，确保产品符合全球市场合规要求。",
      icon: "✅",
    },
  ],
};

export default async function HelenLanExpertPage({
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href={`/${l}/industry/manufacturing`}
            className="inline-flex items-center gap-1 text-sm text-muted transition hover:text-foreground"
          >
            {l === "zh" ? "← 返回制造业咨询" : "← Back to Manufacturing"}
          </Link>

          <div className="mt-8 flex flex-col items-start gap-8 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-4xl font-bold text-white shadow-lg">
              HL
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-amber-400">
                {l === "zh" ? "制造业专家" : "Manufacturing Industry Expert"}
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                Helen Lan{" "}
                <span className="text-lg font-normal text-muted">
                  {l === "zh" ? "蓝海伦" : "(Lan Helen)"}
                </span>
              </h1>
              <p className="mt-1 text-muted">
                {l === "zh"
                  ? "深圳电子制造 · 外贸出海专家"
                  : "Shenzhen Electronics Manufacturing · International Trade Expert"}
              </p>
              <p className="mt-4 max-w-2xl text-muted">
                {l === "zh"
                  ? "Helen Lan 是一位扎根深圳的电子制造与外贸出海专家，曾管理超过百人的团队，横跨制造、品控、物流与销售等多个核心部门。她在电子产品制造全流程管理、国际贸易合规、全球分销渠道建设以及中国制造企业出海战略方面拥有丰富的实战经验。"
                  : "Helen Lan is a Shenzhen-based electronics manufacturing and international trade expert who has managed cross-functional teams of over 100 people spanning manufacturing, quality control, logistics, and sales. She brings extensive hands-on experience in end-to-end electronics production management, international trade compliance, global distribution channel development, and go-global strategies for Chinese manufacturers."}
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
              <p className="text-2xl font-bold text-amber-400">{item.stat}</p>
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
              ? "Helen 在制造业与外贸领域的核心能力与专长"
              : "Helen's core competencies and specializations in manufacturing and international trade"}
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

      {/* Industry Experience */}
      <section className="border-t border-card-border px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold tracking-tight">
            {l === "zh" ? "核心经历" : "Core Experience"}
          </h2>
          <p className="mt-2 text-muted">
            {l === "zh"
              ? "Helen 在制造业与国际贸易领域的关键经验"
              : "Helen's key experience in manufacturing and international trade"}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {experience.map((e) => (
              <div
                key={l === "zh" ? e.company.zh : e.company.en}
                className="rounded-xl border border-card-border bg-card-bg p-6"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-xl"
                  style={{ background: `${e.color}20` }}
                >
                  {e.icon}
                </div>
                <h3 className="mt-3 font-semibold">
                  {l === "zh" ? e.company.zh : e.company.en}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {l === "zh" ? e.descriptionZh : e.description}
                </p>
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
              ? "与 Helen Lan 咨询"
              : "Consult with Helen Lan"}
          </h2>
          <p className="mt-3 text-muted">
            {l === "zh"
              ? "获取来自制造业与外贸行业资深专家的商业洞察与出海策略建议。从电子制造到国际贸易，从供应链优化到全球市场拓展，Helen 可以为您的业务提供专业指导。"
              : "Get business insights and go-global strategy advice from a seasoned manufacturing and trade expert. From electronics manufacturing to international trade, supply chain optimization to global market expansion — Helen can provide expert guidance for your business."}
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/${l}/industry/manufacturing`}
              className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-6 py-3 font-medium transition hover:border-accent/40"
            >
              {l === "zh" ? "探索制造业咨询" : "Explore Manufacturing Consulting"}
            </Link>
            <Link
              href={`/${l}/pricing`}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
              {l === "zh" ? "预约咨询" : "Book a Consultation"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
