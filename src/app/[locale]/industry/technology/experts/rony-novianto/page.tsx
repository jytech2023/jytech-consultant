import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import CalendlyBooking from "@/components/CalendlyBooking";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

const RONY_EMAIL = "rony@pxrobotics.com";

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
        ? "Rony Novianto | 科技行业专家"
        : "Rony Novianto | Technology Industry Expert",
    description:
      locale === "zh"
        ? "Rony Novianto — AI 与机器人专家，认知计算与自主系统，PX Robotics（小鹏收购），IBM 博士奖学金获得者"
        : "Rony Novianto — AI & robotics specialist in cognitive computing and autonomous systems at PX Robotics (acquired by XPENG), IBM PhD Fellowship recipient",
    alternates: {
      languages: {
        en: "/en/industry/technology/experts/rony-novianto",
        zh: "/zh/industry/technology/experts/rony-novianto",
      },
    },
  };
}

const research = [
  {
    area: { en: "Cognitive Software Architecture", zh: "认知软件架构" },
    description:
      "Groundbreaking research on cognitive software architecture, recognized by IBM PhD Fellowship — the sole Australian recipient in 2011.",
    descriptionZh:
      "认知软件架构开创性研究，获 IBM 博士奖学金——2011年唯一澳洲获奖者。",
    icon: "🧠",
    color: "#3b82f6",
  },
  {
    area: { en: "Autonomous Systems", zh: "自主系统" },
    description:
      "Designing attentive autonomous systems, including a Valeo Innovation Challenge finalist project for autonomous car management.",
    descriptionZh:
      "设计注意力自主系统，包括入围 Valeo 创新挑战赛的自动驾驶汽车管理系统。",
    icon: "🚗",
    color: "#ef4444",
  },
  {
    area: { en: "AI & Robotics", zh: "AI 与机器人" },
    description:
      "Building intelligent robotic systems at PX Robotics (acquired by XPENG), bridging AI research with real-world robotic applications.",
    descriptionZh:
      "在 PX Robotics（小鹏收购）构建智能机器人系统，将 AI 研究与实际机器人应用相结合。",
    icon: "🤖",
    color: "#10b981",
  },
];

const highlights = {
  en: [
    {
      stat: "IBM",
      label: "PhD Fellowship",
      detail:
        "Sole Australian recipient in 2011 for groundbreaking work on cognitive software architecture",
    },
    {
      stat: "XPENG",
      label: "PX Robotics",
      detail:
        "AI & robotics specialist at PX Robotics, acquired by XPENG",
    },
    {
      stat: "Valeo",
      label: "Innovation Finalist",
      detail:
        "Designed an Attentive Autonomous Car management system for the Valeo Innovation Challenge",
    },
    {
      stat: "Ph.D.",
      label: "UTS Sydney",
      detail:
        "Doctoral research reviewed by examiners from MIT, Stanford, and CMU",
    },
  ],
  zh: [
    {
      stat: "IBM",
      label: "博士奖学金",
      detail: "2011年唯一澳洲获奖者，表彰认知软件架构开创性研究",
    },
    {
      stat: "小鹏",
      label: "PX Robotics",
      detail: "PX Robotics AI 与机器人专家，该公司已被小鹏收购",
    },
    {
      stat: "Valeo",
      label: "创新挑战赛决赛",
      detail: "为 Valeo 创新挑战赛设计注意力自动驾驶汽车管理系统",
    },
    {
      stat: "博士",
      label: "悉尼科技大学",
      detail: "博士论文由 MIT、Stanford、CMU 教授评审",
    },
  ],
};

const expertise = {
  en: [
    {
      title: "Cognitive Computing",
      description:
        "Pioneering cognitive software architecture that enables AI systems to exhibit attention, learning, and adaptive behavior — recognized by IBM's prestigious PhD Fellowship.",
      icon: "🧠",
    },
    {
      title: "Robotics & Autonomous Systems",
      description:
        "Building intelligent robotic platforms at PX Robotics (XPENG), with deep expertise in autonomous navigation, perception, and real-time decision making.",
      icon: "🤖",
    },
    {
      title: "Autonomous Driving",
      description:
        "Designed attentive autonomous car management systems, finalist in the Valeo Innovation Challenge for novel approaches to vehicle autonomy.",
      icon: "🚗",
    },
    {
      title: "Machine Learning",
      description:
        "Extensive experience applying machine learning to robotics and autonomous systems, bridging theoretical AI research with practical applications.",
      icon: "⚙️",
    },
    {
      title: "Cross-Cultural AI Research",
      description:
        "International research experience spanning Australia, Sweden (Lund University), and Silicon Valley. Fluent in English, Indonesian, Malay, and Chinese.",
      icon: "🌏",
    },
    {
      title: "Academic & Industry Bridge",
      description:
        "Member of ACM, IEEE, ARAA, BICA (founding member), and SAIS. Combines rigorous academic research with industry product development.",
      icon: "🎓",
    },
  ],
  zh: [
    {
      title: "认知计算",
      description:
        "开创性认知软件架构研究，使 AI 系统具备注意力、学习和自适应行为——获 IBM 博士奖学金认可。",
      icon: "🧠",
    },
    {
      title: "机器人与自主系统",
      description:
        "在 PX Robotics（小鹏）构建智能机器人平台，深耕自主导航、感知和实时决策。",
      icon: "🤖",
    },
    {
      title: "自动驾驶",
      description:
        "设计注意力自动驾驶汽车管理系统，入围 Valeo 创新挑战赛决赛。",
      icon: "🚗",
    },
    {
      title: "机器学习",
      description:
        "丰富的机器学习应用经验，将理论 AI 研究与机器人和自主系统的实际应用相结合。",
      icon: "⚙️",
    },
    {
      title: "跨文化 AI 研究",
      description:
        "横跨澳洲、瑞典（隆德大学）和硅谷的国际研究经历。精通英语、印尼语、马来语和中文。",
      icon: "🌏",
    },
    {
      title: "学术与产业融合",
      description:
        "ACM、IEEE、ARAA、BICA（创始成员）和 SAIS 会员。将严谨的学术研究与产业产品开发相结合。",
      icon: "🎓",
    },
  ],
};

const education = [
  {
    degree: { en: "Ph.D. in Computer Science", zh: "计算机科学博士" },
    school: { en: "University of Technology, Sydney", zh: "悉尼科技大学" },
    detail: {
      en: "IBM PhD Fellowship · Examiners from MIT, Stanford, CMU",
      zh: "IBM 博士奖学金 · MIT、Stanford、CMU 教授评审",
    },
    icon: "🎓",
    color: "#3b82f6",
  },
  {
    degree: { en: "Endeavour Research Fellowship", zh: "Endeavour 研究奖学金" },
    school: { en: "Lund University, Sweden", zh: "瑞典隆德大学" },
    detail: {
      en: "Collaborative research in cognitive systems",
      zh: "认知系统合作研究",
    },
    icon: "🏅",
    color: "#8b5cf6",
  },
];

export default async function RonyNoviantoExpertPage({
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
    .where(eq(users.email, RONY_EMAIL))
    .limit(1);
  const expertUserId = expertUser?.id ?? null;
  const expertHourlyRate = expertUser?.hourlyRateOnline ?? expertUser?.hourlyRate ?? 300;
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
                alt="Rony Novianto"
                className="h-28 w-28 shrink-0 rounded-full object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-4xl font-bold text-white shadow-lg">
                RN
              </div>
            )}
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
                {l === "zh" ? "科技行业专家" : "Technology Industry Expert"}
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                Rony Novianto
              </h1>
              <p className="mt-1 text-muted">
                {l === "zh"
                  ? "AI 与机器人专家 · PX Robotics（小鹏收购）"
                  : "AI & Robotics Specialist · PX Robotics (acquired by XPENG)"}
              </p>
              <p className="mt-4 max-w-2xl text-muted">
                {l === "zh"
                  ? "Rony Novianto 是 AI 与机器人领域专家，专注认知计算和自主系统。现任职于 PX Robotics（已被小鹏汽车收购）。他是 2011 年 IBM 博士奖学金唯一澳洲获得者，获 Endeavour 研究奖学金赴瑞典隆德大学合作研究。Valeo 创新挑战赛决赛入围者，设计注意力自动驾驶汽车管理系统。博士论文由 MIT、Stanford 和 CMU 教授评审。"
                  : "Rony Novianto is an AI and robotics specialist with expertise in cognitive computing and autonomous systems, currently at PX Robotics (acquired by XPENG). He is the sole Australian recipient of the IBM PhD Fellowship in 2011 for groundbreaking work on cognitive software architecture. Awarded the Endeavour Research Fellowship to collaborate with Lund University researchers. Finalist in the Valeo Innovation Challenge for designing an Attentive Autonomous Car management system. His doctoral work was reviewed by examiners from MIT, Stanford, and CMU."}
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
              ? "Rony 在 AI、机器人与认知计算领域的核心专长"
              : "Rony's core expertise in AI, robotics, and cognitive computing"}
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

      {/* Research Focus */}
      <section className="border-t border-card-border px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold tracking-tight">
            {l === "zh" ? "研究方向" : "Research Focus"}
          </h2>
          <p className="mt-2 text-muted">
            {l === "zh"
              ? "Rony 的核心研究领域"
              : "Rony's core research areas"}
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
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {education.map((e) => (
              <div
                key={e.degree.en}
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
                  {l === "zh" ? e.school.zh : e.school.en}
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
              ? "选择时间，与 Rony Novianto 进行一对一咨询"
              : "Select a time to schedule a one-on-one consultation with Rony Novianto"}
          </p>
          <div className="mt-8">
            <CalendlyBooking
              expertUserId={expertUserId}
              expertName="Rony Novianto"
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
