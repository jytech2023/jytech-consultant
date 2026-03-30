import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import CalendlyBooking from "@/components/CalendlyBooking";
import { db } from "@/lib/db";
import { users, calendlyTokens } from "@/lib/schema";
import { eq } from "drizzle-orm";

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
        ? "Jay Lin | 科技行业专家"
        : "Jay Lin | Technology Industry Expert",
    description:
      locale === "zh"
        ? "Jay Lin (林维京) — JYTech 创始人，湾区中文网、Yeoso 联合创始人，曾参与华为机器人研发、Meta IoT/广告系统、Intuit/PayPal 内部 AI 平台研发"
        : "Jay Lin (Weijing Lin) — Founder of JYTech, Co-founder of BayAreaChinese.com & Yeoso, with experience at Huawei Robotics, Meta IoT/Ads, and Intuit/PayPal internal AI platforms",
    alternates: {
      languages: {
        en: "/en/industry/technology/experts/jay-lin",
        zh: "/zh/industry/technology/experts/jay-lin",
      },
    },
  };
}

const ventures = [
  {
    name: "JYTech",
    role: { en: "Founder", zh: "创始人" },
    description: "AI consulting and technology services company, providing enterprise AI solutions and strategic consulting.",
    descriptionZh: "AI 咨询与技术服务公司，提供企业级 AI 解决方案与战略咨询。",
    icon: "⚡",
    color: "#3b82f6",
  },
  {
    name: "BayAreaChinese.com",
    nameZh: "湾区中文网",
    role: { en: "Co-founder", zh: "联合创始人" },
    description: "The go-to Chinese-language community platform for the San Francisco Bay Area.",
    descriptionZh: "旧金山湾区领先的中文社区平台。",
    icon: "🌐",
    color: "#10b981",
  },
  {
    name: "Yeoso",
    role: { en: "Co-founder", zh: "联合创始人" },
    description: "AI-powered platform bridging technology and user experiences.",
    descriptionZh: "以 AI 驱动的平台，连接技术与用户体验。",
    icon: "🔮",
    color: "#8b5cf6",
  },
  {
    name: "AutoClaw",
    role: { en: "Creator", zh: "创建者" },
    description: "Open-source AI agent framework supporting RAG, MCP, and A2A protocols for enterprise AI applications.",
    descriptionZh: "开源 AI Agent 框架，支持 RAG、MCP、A2A 协议，面向企业级 AI 应用。",
    icon: "🦀",
    color: "#f59e0b",
  },
];

const experience = [
  {
    company: "Intuit / PayPal",
    description: "Led and contributed to internal AI platform R&D, including RAG systems, MCP integration, and A2A agent-to-agent protocols.",
    descriptionZh: "负责并参与内部 AI 平台研发，包括 RAG 系统、MCP 集成、A2A 智能体间协议。",
    icon: "💳",
    color: "#3b82f6",
  },
  {
    company: "Huawei / Meta",
    description: "Robotics R&D and IoT infrastructure — hardware-software integration for intelligent systems and large-scale connected devices.",
    descriptionZh: "机器人研发与 IoT 基础设施——智能系统与大规模物联网设备的软硬件集成。",
    icon: "🤖",
    color: "#ef4444",
  },
  {
    company: "Meta",
    description: "Built and optimized large-scale advertising systems powering billions of ad impressions.",
    descriptionZh: "构建并优化支撑数十亿广告曝光的大规模广告系统。",
    icon: "📱",
    color: "#0ea5e9",
  },
];

const highlights = {
  en: [
    {
      stat: "10+",
      label: "Years in Software Engineering",
      detail: "From full-stack development to enterprise AI platforms at scale",
    },
    {
      stat: "JYTech",
      label: "Founder",
      detail: "AI consulting and technology services for enterprises",
    },
    {
      stat: "Huawei · Meta",
      label: "Robotics & IoT",
      detail: "Robotics R&D and IoT infrastructure — hardware-software integration at scale",
    },
    {
      stat: "Intuit · PayPal",
      label: "Enterprise AI Platforms",
      detail: "Internal AI platform R&D with RAG, MCP, A2A, and AutoClaw",
    },
  ],
  zh: [
    {
      stat: "10+",
      label: "年软件工程经验",
      detail: "从全栈开发到企业级 AI 平台的规模化实践",
    },
    {
      stat: "JYTech",
      label: "创始人",
      detail: "面向企业的 AI 咨询与技术服务",
    },
    {
      stat: "华为 · Meta",
      label: "机器人与 IoT",
      detail: "机器人研发与 IoT 基础设施——大规模软硬件集成",
    },
    {
      stat: "Intuit · PayPal",
      label: "企业级 AI 平台",
      detail: "内部 AI 平台研发（RAG、MCP、A2A、AutoClaw）",
    },
  ],
};

const expertise = {
  en: [
    {
      title: "Enterprise AI Platforms",
      description:
        "Built internal AI platforms at Intuit and PayPal, implementing RAG pipelines, MCP server integration, and A2A agent-to-agent communication protocols.",
      icon: "🧠",
    },
    {
      title: "Robotics & IoT",
      description:
        "Huawei robotics R&D and Meta IoT infrastructure — bridging intelligent software with hardware systems and large-scale connected devices.",
      icon: "🤖",
    },
    {
      title: "Advertising Systems",
      description:
        "Built and optimized large-scale advertising systems at Meta, powering billions of ad impressions.",
      icon: "📣",
    },
    {
      title: "AI Agent Frameworks",
      description:
        "Created AutoClaw, an open-source AI agent framework supporting RAG, MCP, and A2A protocols for enterprise applications.",
      icon: "🦀",
    },
    {
      title: "Full-Stack Development",
      description:
        "End-to-end engineering across frontend, backend, and infrastructure — from startup MVPs to enterprise-scale systems.",
      icon: "💻",
    },
    {
      title: "Serial Entrepreneurship",
      description:
        "Founded JYTech, co-founded BayAreaChinese.com and Yeoso — ventures spanning e-commerce, education, social platforms, and AI.",
      icon: "🚀",
    },
  ],
  zh: [
    {
      title: "企业级 AI 平台",
      description:
        "在 Intuit 和 PayPal 构建内部 AI 平台，实现 RAG 管道、MCP 服务器集成及 A2A 智能体间通信协议。",
      icon: "🧠",
    },
    {
      title: "机器人与 IoT",
      description:
        "华为机器人研发与 Meta IoT 基础设施——智能软件与硬件系统及大规模物联网设备的深度集成。",
      icon: "🤖",
    },
    {
      title: "广告系统",
      description:
        "在 Meta 构建并优化大规模广告系统，支撑数十亿广告曝光。",
      icon: "📣",
    },
    {
      title: "AI Agent 框架",
      description:
        "创建 AutoClaw 开源 AI Agent 框架，支持 RAG、MCP、A2A 协议，面向企业级应用。",
      icon: "🦀",
    },
    {
      title: "全栈开发",
      description:
        "覆盖前端、后端与基础设施的端到端工程能力——从创业 MVP 到企业级系统。",
      icon: "💻",
    },
    {
      title: "连续创业",
      description:
        "创立 JYTech，联合创立湾区中文网和 Yeoso——涵盖电商、教育、社交平台及 AI 等多个领域。",
      icon: "🚀",
    },
  ],
};

export default async function JayLinExpertPage({
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
    .where(eq(users.email, "weijingjaylin@gmail.com"))
    .limit(1);
  const expertUserId = expertUser?.id ?? null;
  const expertHourlyRate = expertUser?.hourlyRateOnline ?? expertUser?.hourlyRate ?? 500;
  const expertPicture = expertUser?.picture ?? null;

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-card-border px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/15 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href={`/${l}/industry/technology`}
            className="inline-flex items-center gap-1 text-sm text-muted transition hover:text-foreground"
          >
            {l === "zh" ? "← 返回科技咨询" : "← Back to Technology"}
          </Link>

          <div className="mt-8 flex flex-col items-start gap-8 sm:flex-row sm:items-center">
            {expertPicture ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={expertPicture}
                alt="Jay Lin"
                className="h-28 w-28 shrink-0 rounded-full object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 text-4xl font-bold text-white shadow-lg">
                JL
              </div>
            )}
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-blue-400">
                {l === "zh" ? "科技行业专家" : "Technology Industry Expert"}
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                {l === "zh" ? (
                  <>
                    林维京{" "}
                    <span className="text-lg font-normal text-muted">Jay Lin</span>
                  </>
                ) : (
                  <>
                    Jay Lin{" "}
                    <span className="text-lg font-normal text-muted">(林维京)</span>
                  </>
                )}
              </h1>
              <p className="mt-1 text-muted">
                {l === "zh"
                  ? "JYTech 创始人 · 湾区中文网 / Yeoso 联合创始人 · 旧金山"
                  : "Founder, JYTech · Co-founder, BayAreaChinese.com & Yeoso · San Francisco"}
              </p>
              <p className="mt-4 max-w-2xl text-muted">
                {l === "zh"
                  ? "拥有超过10年软件工程经验的全栈技术专家，JYTech 创始人。曾参与华为机器人研发、Meta 的 IoT/广告系统项目，负责并参与 Intuit/PayPal 内部 AI 平台研发，涵盖 RAG、MCP、A2A 等前沿技术。联合创立湾区中文网和 Yeoso，创建 AutoClaw 开源 AI Agent 框架。"
                  : "A full-stack technology expert with over 10 years of software engineering experience and founder of JYTech. Contributed to Huawei's robotics R&D, Meta's IoT and advertising systems, and led AI platform development at Intuit/PayPal — including RAG, MCP, and A2A protocols. Co-founded BayAreaChinese.com and Yeoso, and created the AutoClaw open-source AI agent framework."}
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
              <p className="text-2xl font-bold text-blue-400">{item.stat}</p>
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
              ? "Jay 在科技行业的核心能力与专长"
              : "Jay's core competencies and specializations in the technology industry"}
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

      {/* Ventures */}
      <section className="border-t border-card-border px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold tracking-tight">
            {l === "zh" ? "创业项目" : "Ventures & Projects"}
          </h2>
          <p className="mt-2 text-muted">
            {l === "zh"
              ? "Jay 创立与联合创立的产品与平台，涵盖电商、教育、社交及 AI"
              : "Products and platforms founded and co-founded by Jay — spanning e-commerce, education, social, and AI"}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {ventures.map((v) => (
              <div
                key={v.name}
                className="flex gap-4 rounded-xl border border-card-border bg-card-bg p-6"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-2xl"
                  style={{ background: `${v.color}20` }}
                >
                  {v.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">
                      {v.nameZh && l === "zh" ? v.nameZh : v.name}
                    </h3>
                    <span className="rounded-full bg-card-border px-2 py-0.5 text-xs text-muted">
                      {l === "zh" ? v.role.zh : v.role.en}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {l === "zh" ? v.descriptionZh : v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Experience */}
      <section className="border-t border-card-border bg-card-bg/50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold tracking-tight">
            {l === "zh" ? "企业经历" : "Industry Experience"}
          </h2>
          <p className="mt-2 text-muted">
            {l === "zh"
              ? "在顶级科技企业的核心项目经验"
              : "Core project experience at leading technology companies"}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {experience.map((e) => (
              <div
                key={e.company}
                className="rounded-xl border border-card-border bg-background p-6"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-xl"
                  style={{ background: `${e.color}20` }}
                >
                  {e.icon}
                </div>
                <h3 className="mt-3 font-semibold">{e.company}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {l === "zh" ? e.descriptionZh : e.description}
                </p>
              </div>
            ))}
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
              ? "选择时间，与 Jay Lin 进行一对一咨询"
              : "Select a time to schedule a one-on-one consultation with Jay Lin"}
          </p>
          <div className="mt-8">
            <CalendlyBooking
              expertUserId={expertUserId}
              expertName="Jay Lin"
              hourlyRate={expertHourlyRate}
              locale={l}
            />
          </div>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/${l}/industry/technology`}
              className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-6 py-3 font-medium transition hover:border-accent/40"
            >
              {l === "zh" ? "探索科技咨询" : "Explore Tech Consulting"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
