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
        ? "Mak 麦梓浩 | 传媒与互动设计专家"
        : "Mak | Media & Interactive Design Expert",
    description:
      locale === "zh"
        ? "Mak 麦梓浩 — 产品设计师，专注 UI/UX、游戏设计与互动媒体，UCSC 游戏与可玩媒体硕士"
        : "Mak — Product designer specializing in UI/UX, game design, and interactive media. M.S. Games & Playable Media from UC Santa Cruz",
    alternates: {
      languages: {
        en: "/en/industry/media/experts/tszho-mak",
        zh: "/zh/industry/media/experts/tszho-mak",
      },
    },
  };
}

const highlights = {
  en: [
    {
      stat: "4.0 GPA",
      label: "UCSC M.S.",
      detail:
        "Master of Science in Games & Playable Media from UC Santa Cruz with a perfect GPA",
    },
    {
      stat: "40%",
      label: "Usability Improvement",
      detail:
        "Led UI/UX redesigns that improved mobile usability by 40% and responsiveness across devices",
    },
    {
      stat: "UI/UX Lead",
      label: "Cross-Functional Leadership",
      detail:
        "Served as interim UI/UX Lead, driving collaboration and creating unified style guides",
    },
    {
      stat: "Bay Area",
      label: "Based In",
      detail:
        "San Francisco Bay Area — available for both remote and on-site consulting",
    },
  ],
  zh: [
    {
      stat: "4.0 GPA",
      label: "UCSC 硕士",
      detail:
        "加州大学圣克鲁兹分校游戏与可玩媒体硕士，满绩毕业",
    },
    {
      stat: "40%",
      label: "可用性提升",
      detail:
        "主导 UI/UX 重设计，移动端可用性提升 40%，全设备响应式适配",
    },
    {
      stat: "UI/UX 负责人",
      label: "跨团队协作",
      detail:
        "担任 UI/UX 临时负责人，推动跨职能协作，建立统一设计规范",
    },
    {
      stat: "湾区",
      label: "所在地",
      detail:
        "旧金山湾区，支持远程与线下咨询",
    },
  ],
};

const expertise = {
  en: [
    {
      title: "Product & UX Design",
      description:
        "End-to-end product design from user research and wireframing to high-fidelity prototypes. Expertise in UX strategy, interaction design, and A/B testing to drive measurable outcomes.",
      icon: "🎨",
    },
    {
      title: "Game UI/UX Design",
      description:
        "Specialized in game interface design with focus on visual hierarchy, typography, and color systems. Experience designing core game screens and interactive prototypes for slot and casual games.",
      icon: "🎮",
    },
    {
      title: "Interactive Media & Prototyping",
      description:
        "Creating engaging interactive experiences using Figma, After Effects, Unity, and Unreal. Bridging design and development with hands-on prototyping skills.",
      icon: "✨",
    },
    {
      title: "Design Systems & Style Guides",
      description:
        "Building unified design systems that improve developer handoff efficiency by 30%. Establishing branding, typography, iconography, and component standards across teams.",
      icon: "📐",
    },
    {
      title: "User Research & Testing",
      description:
        "Conducting user interviews, usability testing, and competitor benchmarking. Translating qualitative insights into actionable design improvements.",
      icon: "🔍",
    },
    {
      title: "Cross-Functional Collaboration",
      description:
        "Experienced leading design efforts across engineering, product, and marketing teams. Mentored 20+ student teams on UI/UX best practices at UC Santa Cruz.",
      icon: "🤝",
    },
  ],
  zh: [
    {
      title: "产品与 UX 设计",
      description:
        "从用户研究、线框图到高保真原型的端到端产品设计。擅长 UX 策略、交互设计和 A/B 测试，驱动可衡量的业务成果。",
      icon: "🎨",
    },
    {
      title: "游戏 UI/UX 设计",
      description:
        "专注游戏界面设计，擅长视觉层级、字体排版和色彩系统。曾为老虎机和休闲游戏设计核心界面与交互原型。",
      icon: "🎮",
    },
    {
      title: "互动媒体与原型设计",
      description:
        "使用 Figma、After Effects、Unity 和 Unreal 创建沉浸式互动体验。兼具设计与开发能力，快速实现原型。",
      icon: "✨",
    },
    {
      title: "设计系统与规范",
      description:
        "构建统一的设计系统，提升开发交付效率 30%。建立品牌、字体、图标和组件标准。",
      icon: "📐",
    },
    {
      title: "用户研究与测试",
      description:
        "开展用户访谈、可用性测试和竞品分析，将定性洞察转化为可落地的设计改进。",
      icon: "🔍",
    },
    {
      title: "跨团队协作",
      description:
        "在工程、产品和市场团队之间推动设计工作。在 UCSC 指导 20+ 学生团队的 UI/UX 实践。",
      icon: "🤝",
    },
  ],
};

const experience = [
  {
    company: "Bitus Labs",
    role: { en: "Game UI/UX Designer", zh: "游戏 UI/UX 设计师" },
    period: "2025 - Present",
    description:
      "Redesigned company and game websites, designed core slot-game UI screens, served as interim UI/UX Lead driving cross-functional collaboration.",
    descriptionZh:
      "重设计公司与游戏网站，设计老虎机核心 UI 界面，担任 UI/UX 临时负责人推动跨职能协作。",
    icon: "🎮",
    color: "#8b5cf6",
  },
  {
    company: "37 Interactive Entertainment",
    role: { en: "GUI Designer Intern", zh: "GUI 设计实习生" },
    period: "2024",
    description:
      "Conducted UI benchmarking on top casual mobile games, created style guides for 10+ UI screens improving visual consistency across features.",
    descriptionZh:
      "对头部休闲手游进行 UI 基准分析，为 10+ UI 界面创建设计规范，提升跨功能视觉一致性。",
    icon: "🕹️",
    color: "#f59e0b",
  },
  {
    company: "fAIshion.AI",
    role: { en: "UI/UX Designer", zh: "UI/UX 设计师" },
    period: "2025",
    description:
      "Redesigned AI-powered website flows using insights from 11 user interviews and usability testing, improving task completion by 40%.",
    descriptionZh:
      "基于 11 次用户访谈与可用性测试，重设计 AI 驱动的网站流程，任务完成率提升 40%。",
    icon: "🤖",
    color: "#ec4899",
  },
];

export default async function TszhoMakExpertPage({
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-500/15 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href={`/${l}/industry/media`}
            className="inline-flex items-center gap-1 text-sm text-muted transition hover:text-foreground"
          >
            {l === "zh" ? "← 返回传媒咨询" : "← Back to Media & Advertising"}
          </Link>

          <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/avatar/papi.jpg"
              alt="Mak"
              className="h-28 w-28 shrink-0 rounded-full object-cover shadow-lg"
            />
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-violet-400">
                {l === "zh" ? "传媒与互动设计专家" : "Media & Interactive Design Expert"}
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                Mak{" "}
                <span className="text-lg font-normal text-muted">
                  {l === "zh" ? "麦梓浩" : "(Mak Tszho)"}
                </span>
              </h1>
              <p className="mt-1 text-muted">
                {l === "zh"
                  ? "产品设计师 · UCSC 游戏与可玩媒体硕士 (GPA 4.0)"
                  : "Product Designer · M.S. Games & Playable Media, UC Santa Cruz (4.0 GPA)"}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                {l === "zh"
                  ? "Mak 是一位专注 UI/UX 与互动媒体的产品设计师，毕业于加州大学圣克鲁兹分校游戏与可玩媒体专业（满绩）。他曾在 Bitus Labs 担任游戏 UI/UX 设计师并兼任临时 UI/UX 负责人，在 37互娱和 fAIshion.AI 积累了丰富的游戏界面设计与 AI 产品设计经验。擅长将用户研究洞察转化为可落地的设计方案，驱动可衡量的产品体验提升。"
                  : "Mak is a product designer specializing in UI/UX and interactive media, graduating with a perfect 4.0 GPA from UC Santa Cruz's Games & Playable Media program. He has served as Game UI/UX Designer and interim UI/UX Lead at Bitus Labs, with additional experience at 37 Interactive Entertainment and fAIshion.AI. He excels at translating user research insights into actionable design solutions that drive measurable product improvements."}
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
              <p className="text-2xl font-bold text-violet-400">{item.stat}</p>
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
              ? "Mak 在产品设计与互动媒体领域的核心能力"
              : "Mak's core competencies in product design and interactive media"}
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

      {/* Experience */}
      <section className="border-t border-card-border px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            {l === "zh" ? "工作经历" : "Experience"}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {experience.map((e) => (
              <div
                key={e.company}
                className="flex gap-4 rounded-xl border border-card-border bg-card-bg p-5 sm:p-6"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-2xl"
                  style={{ background: `${e.color}20` }}
                >
                  {e.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{e.company}</h3>
                    <span className="text-xs text-muted">{e.period}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted">
                    {l === "zh" ? e.role.zh : e.role.en}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {l === "zh" ? e.descriptionZh : e.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-card-border px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            {l === "zh"
              ? "与 Mak 咨询"
              : "Consult with Mak"}
          </h2>
          <p className="mt-3 text-muted">
            {l === "zh"
              ? "获取来自产品设计与互动媒体领域的专业建议。从游戏 UI 设计到用户体验策略，Mak 可以为您的项目提供专业指导。"
              : "Get expert advice on product design and interactive media. From game UI design to UX strategy, Mak can provide professional guidance for your project."}
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/${l}/industry/media`}
              className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-6 py-3 font-medium transition hover:border-accent/40"
            >
              {l === "zh" ? "探索传媒咨询" : "Explore Media Consulting"}
            </Link>
            <Link
              href={`/${l}/pricing`}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
              {l === "zh" ? "预约咨询" : "Book a Consultation"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
