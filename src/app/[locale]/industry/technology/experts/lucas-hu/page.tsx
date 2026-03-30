import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import CalendlyBooking from "@/components/CalendlyBooking";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

const LUCAS_EMAIL = "chu034@odu.edu";

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
        ? "Lucas Hu | 科技行业专家"
        : "Lucas Hu | Technology Industry Expert",
    description:
      locale === "zh"
        ? "Lucas Hu (胡春育) — AI 研究者，专注大语言模型、符号回归、AI 安全与对抗攻击，Old Dominion University 计算机科学博士候选人"
        : "Lucas Hu (Chunyu Hu) — AI researcher specializing in LLMs, symbolic regression, AI security & adversarial attacks, Ph.D. candidate in Computer Science at Old Dominion University",
    alternates: {
      languages: {
        en: "/en/industry/technology/experts/lucas-hu",
        zh: "/zh/industry/technology/experts/lucas-hu",
      },
    },
  };
}

const research = [
  {
    area: { en: "AI for Science", zh: "AI for Science" },
    description:
      "Applying large language models and symbolic regression techniques to physics and scientific discovery, bridging AI with fundamental science.",
    descriptionZh:
      "将大语言模型与符号回归技术应用于物理学和科学发现，架起 AI 与基础科学的桥梁。",
    icon: "🔬",
    color: "#3b82f6",
  },
  {
    area: { en: "AI Security & Robustness", zh: "AI 安全与鲁棒性" },
    description:
      "Research on adversarial attacks, backdoor attacks, and security of efficient AI models — ensuring AI systems are reliable and trustworthy.",
    descriptionZh:
      "研究对抗攻击、后门攻击及高效 AI 模型的安全性——确保 AI 系统可靠且可信。",
    icon: "🛡️",
    color: "#ef4444",
  },
  {
    area: { en: "Semantic Communication", zh: "语义通信" },
    description:
      "Published at IEEE MILCOM 2025 on contrastive multi-hop semantic communication, advancing next-generation communication systems with AI.",
    descriptionZh:
      "在 IEEE MILCOM 2025 发表对比多跳语义通信论文，用 AI 推进下一代通信系统。",
    icon: "📡",
    color: "#10b981",
  },
];

const highlights = {
  en: [
    {
      stat: "Ph.D.",
      label: "Computer Science",
      detail:
        "Doctoral candidate at Old Dominion University, advised by Dr. Yaohang Li",
    },
    {
      stat: "LLMs",
      label: "Large Language Models",
      detail:
        "Research on LLMs with symbolic regression for scientific applications",
    },
    {
      stat: "IEEE",
      label: "Published Researcher",
      detail:
        "Paper accepted at IEEE MILCOM 2025 on semantic communication systems",
    },
    {
      stat: "AI Safety",
      label: "Security Research",
      detail:
        "Adversarial attacks, backdoor attacks, and robustness of efficient AI models",
    },
  ],
  zh: [
    {
      stat: "博士",
      label: "计算机科学",
      detail: "Old Dominion University 博士候选人，导师 Dr. Yaohang Li",
    },
    {
      stat: "LLMs",
      label: "大语言模型",
      detail: "研究大语言模型结合符号回归在科学应用中的突破",
    },
    {
      stat: "IEEE",
      label: "学术发表",
      detail: "IEEE MILCOM 2025 论文——对比多跳语义通信",
    },
    {
      stat: "AI 安全",
      label: "安全性研究",
      detail: "对抗攻击、后门攻击与高效 AI 模型鲁棒性",
    },
  ],
};

const expertise = {
  en: [
    {
      title: "Large Language Models",
      description:
        "Deep expertise in LLM research, including applying language models with symbolic regression to solve complex scientific problems in physics and beyond.",
      icon: "🧠",
    },
    {
      title: "AI Security & Adversarial Robustness",
      description:
        "Research on adversarial attacks and backdoor attacks targeting neural networks, with a focus on ensuring the security and robustness of efficient AI models.",
      icon: "🛡️",
    },
    {
      title: "AI for Scientific Discovery",
      description:
        "Pioneering work at the intersection of AI and physics — using machine learning to accelerate scientific discovery and automate research processes.",
      icon: "🔬",
    },
    {
      title: "Semantic Communication",
      description:
        "Published research on contrastive multi-hop semantic communication systems, advancing the integration of AI into next-generation networks.",
      icon: "📡",
    },
    {
      title: "Computer Vision",
      description:
        "Experience in remote sensing image analysis and object detection using convolutional neural networks, with published work on airplane detection.",
      icon: "👁️",
    },
    {
      title: "Academic Research & Review",
      description:
        "Active reviewer for international conferences, science fair judge, and contributor to the broader AI research community.",
      icon: "📝",
    },
  ],
  zh: [
    {
      title: "大语言模型",
      description:
        "在 LLM 研究领域拥有深厚积累，包括将语言模型与符号回归结合，解决物理学等领域的复杂科学问题。",
      icon: "🧠",
    },
    {
      title: "AI 安全与对抗鲁棒性",
      description:
        "研究针对神经网络的对抗攻击和后门攻击，重点关注高效 AI 模型的安全性与鲁棒性。",
      icon: "🛡️",
    },
    {
      title: "AI 驱动的科学发现",
      description:
        "在 AI 与物理学交叉领域的开创性工作——利用机器学习加速科学发现和自动化研究流程。",
      icon: "🔬",
    },
    {
      title: "语义通信",
      description:
        "发表关于对比多跳语义通信系统的研究，推动 AI 与下一代网络的深度融合。",
      icon: "📡",
    },
    {
      title: "计算机视觉",
      description:
        "在遥感图像分析和基于卷积神经网络的目标检测领域拥有经验，发表过飞机检测相关研究。",
      icon: "👁️",
    },
    {
      title: "学术研究与评审",
      description:
        "国际学术会议审稿人、科学竞赛评委，积极参与 AI 研究社区建设。",
      icon: "📝",
    },
  ],
};

const education = [
  {
    degree: { en: "Ph.D. in Computer Science", zh: "计算机科学博士（在读）" },
    school: "Old Dominion University",
    detail: { en: "Advisor: Dr. Yaohang Li", zh: "导师：Dr. Yaohang Li" },
    icon: "🎓",
    color: "#3b82f6",
  },
  {
    degree: { en: "M.S. (2021)", zh: "硕士（2021）" },
    school: { en: "Harbin University of Science and Technology", zh: "哈尔滨理工大学" },
    detail: { en: "", zh: "" },
    icon: "📘",
    color: "#8b5cf6",
  },
  {
    degree: { en: "B.S. (2017)", zh: "学士（2017）" },
    school: { en: "Harbin University of Science and Technology", zh: "哈尔滨理工大学" },
    detail: { en: "", zh: "" },
    icon: "📗",
    color: "#10b981",
  },
];

export default async function LucasHuExpertPage({
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
    .where(eq(users.email, LUCAS_EMAIL))
    .limit(1);
  const expertUserId = expertUser?.id ?? null;
  const expertHourlyRate = expertUser?.hourlyRateOnline ?? expertUser?.hourlyRate ?? 150;
  const expertPicture = expertUser?.picture ?? null;

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-card-border px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/15 via-transparent to-transparent" />
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
                alt="Lucas Hu"
                className="h-28 w-28 shrink-0 rounded-full object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-4xl font-bold text-white shadow-lg">
                LH
              </div>
            )}
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
                {l === "zh" ? "科技行业专家" : "Technology Industry Expert"}
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                {l === "zh" ? (
                  <>
                    胡春育{" "}
                    <span className="text-lg font-normal text-muted">Lucas Hu</span>
                  </>
                ) : (
                  <>
                    Lucas Hu{" "}
                    <span className="text-lg font-normal text-muted">(胡春育)</span>
                  </>
                )}
              </h1>
              <p className="mt-1 text-muted">
                {l === "zh"
                  ? "AI 研究者 · Old Dominion University 博士候选人"
                  : "AI Researcher · Ph.D. Candidate, Old Dominion University"}
              </p>
              <p className="mt-4 max-w-2xl text-muted">
                {l === "zh"
                  ? "Lucas Hu 是 Old Dominion University 计算机科学博士候选人，专注于大语言模型、符号回归、AI 安全与语义通信等前沿领域。他在 AI for Science 方向探索将机器学习应用于物理学等基础科学，同时研究对抗攻击与后门攻击对高效 AI 模型的安全影响。研究成果发表于 IEEE MILCOM 等国际顶级会议。"
                  : "Lucas Hu is a Ph.D. candidate in Computer Science at Old Dominion University, specializing in large language models, symbolic regression, AI security, and semantic communication. His research in AI for Science explores applying machine learning to physics and fundamental sciences, while also investigating adversarial and backdoor attacks on efficient AI models. His work has been published at top venues including IEEE MILCOM."}
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
              <p className="text-2xl font-bold text-cyan-400">{item.stat}</p>
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
              ? "Lucas 在 AI 与计算机科学领域的核心研究方向"
              : "Lucas's core research areas in AI and computer science"}
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

      {/* Research Experience */}
      <section className="border-t border-card-border px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold tracking-tight">
            {l === "zh" ? "研究方向" : "Research Focus"}
          </h2>
          <p className="mt-2 text-muted">
            {l === "zh"
              ? "Lucas 当前的核心研究课题"
              : "Lucas's current core research topics"}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {research.map((r) => (
              <div
                key={l === "zh" ? r.area.zh : r.area.en}
                className="rounded-xl border border-card-border bg-card-bg p-6"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-xl"
                  style={{ background: `${r.color}20` }}
                >
                  {r.icon}
                </div>
                <h3 className="mt-3 font-semibold">
                  {l === "zh" ? r.area.zh : r.area.en}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {l === "zh" ? r.descriptionZh : r.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="border-t border-card-border bg-card-bg/50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold tracking-tight">
            {l === "zh" ? "教育背景" : "Education"}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {education.map((e) => (
              <div
                key={typeof e.degree === "string" ? e.degree : e.degree.en}
                className="rounded-xl border border-card-border bg-background p-6"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-xl"
                  style={{ background: `${e.color}20` }}
                >
                  {e.icon}
                </div>
                <h3 className="mt-3 font-semibold">
                  {l === "zh" ? e.degree.zh : e.degree.en}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {typeof e.school === "string" ? e.school : l === "zh" ? e.school.zh : e.school.en}
                </p>
                {(l === "zh" ? e.detail.zh : e.detail.en) && (
                  <p className="mt-1 text-xs text-muted">
                    {l === "zh" ? e.detail.zh : e.detail.en}
                  </p>
                )}
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
              ? "选择时间，与 Lucas Hu 进行一对一咨询"
              : "Select a time to schedule a one-on-one consultation with Lucas Hu"}
          </p>
          <div className="mt-8">
            <CalendlyBooking
              expertUserId={expertUserId}
              expertName="Lucas Hu"
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
