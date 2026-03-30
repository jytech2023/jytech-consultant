import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title:
      locale === "zh"
        ? "加入我们 | JY Consultant"
        : "Join Us | JY Consultant",
    description:
      locale === "zh"
        ? "让你的知识变现——加入 JY Consultant 成为行业顾问"
        : "Monetize your expertise — join JY Consultant as an industry advisor",
  };
}

const values = {
  en: [
    {
      icon: "⏳",
      title: "Your Time Is Valuable",
      description:
        "Every hour you spend sharing expertise should be compensated fairly. We believe professionals deserve to be paid what they're worth — no exceptions.",
    },
    {
      icon: "🧠",
      title: "Your Knowledge Has Real Value",
      description:
        "Years of experience, hard-won insights, and industry know-how aren't free. We built this platform so that your knowledge can generate real income.",
    },
    {
      icon: "🚫",
      title: "Stop Giving It Away",
      description:
        "Too many experts spend time advising people who don't value their input. We connect you with clients who are ready to pay for quality advice.",
    },
  ],
  zh: [
    {
      icon: "⏳",
      title: "你的时间很宝贵",
      description:
        "你分享专业知识的每一个小时都应该获得合理的报酬。我们相信专业人士值得被尊重——没有例外。",
    },
    {
      icon: "🧠",
      title: "你的知识很值钱",
      description:
        "多年的经验、来之不易的洞察和行业积累不是免费的。我们搭建这个平台，就是为了让你的知识能够变现。",
    },
    {
      icon: "🚫",
      title: "不要浪费在不尊重你的人身上",
      description:
        "太多专家把时间花在了不重视他们意见的人身上。我们帮你连接那些愿意为优质建议付费的客户。",
    },
  ],
};

const steps = {
  en: [
    { step: "01", title: "Create Your Profile", description: "Sign up and fill in your industry expertise, city, and consulting rates." },
    { step: "02", title: "Pay Verification Fee", description: "A one-time $99/year identity verification fee ensures platform quality." },
    { step: "03", title: "Get Approved", description: "Our team reviews your application. Once approved, your profile goes live." },
    { step: "04", title: "Start Earning", description: "Clients find you on industry pages, book consultations, and you get paid." },
  ],
  zh: [
    { step: "01", title: "创建你的档案", description: "注册并填写你的行业专长、所在城市和咨询费率。" },
    { step: "02", title: "支付验证费用", description: "$99/年的身份验证费用，确保平台的专业品质。" },
    { step: "03", title: "通过审核", description: "我们的团队审核你的申请，通过后你的档案将正式上线。" },
    { step: "04", title: "开始赚钱", description: "客户在行业页面找到你，预约咨询，你获得报酬。" },
  ],
};

const requirements = {
  en: [
    "3+ years of professional experience in your industry",
    "A genuine desire to help others with your expertise",
    "Commitment to providing actionable, high-quality advice",
    "Based anywhere — we support remote and on-site consulting",
  ],
  zh: [
    "在所在行业拥有 3 年以上的工作经历",
    "真心愿意用自己的专业知识帮助他人",
    "承诺提供可落地的、高质量的咨询建议",
    "不限地点——我们支持线上和线下咨询",
  ],
};

export default async function JoinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const l = locale as Locale;

  const v = values[l];
  const s = steps[l];
  const r = requirements[l];

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-card-border px-6 py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-accent-light">
            {l === "zh" ? "成为顾问" : "Become a Consultant"}
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {l === "zh" ? (
              <>
                让你的知识{" "}
                <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                  变现
                </span>
              </>
            ) : (
              <>
                Monetize Your{" "}
                <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                  Expertise
                </span>
              </>
            )}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {l === "zh"
              ? "如果你在行业中拥有一技之长和 3 年以上的工作经历，我们欢迎你加入 JY Consultant，成为我们的顾问成员。你的经验值得被尊重，你的时间值得被定价。"
              : "If you have specialized skills and 3+ years of professional experience, we invite you to join JY Consultant as an advisor. Your experience deserves respect, and your time deserves a price tag."}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/${l}/profile`}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent to-accent-light px-8 py-3.5 font-medium text-white transition hover:opacity-90"
            >
              {l === "zh" ? "立即申请" : "Apply Now"}
            </Link>
            <Link
              href={`/${l}/pricing`}
              className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-8 py-3.5 font-medium transition hover:border-accent/40"
            >
              {l === "zh" ? "了解收益模式" : "See Earnings Model"}
            </Link>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {l === "zh" ? "我们的理念" : "Our Philosophy"}
          </h2>
          <p className="mt-3 text-muted">
            {l === "zh"
              ? "这个平台的初衷很简单——专业知识应该有价"
              : "The premise is simple — expertise should be valued and compensated"}
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {v.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-card-border bg-card-bg p-8"
            >
              <div className="text-4xl">{item.icon}</div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-card-border bg-card-bg/50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {l === "zh" ? "如何加入" : "How It Works"}
            </h2>
            <p className="mt-3 text-muted">
              {l === "zh"
                ? "四步成为平台顾问，开始用知识赚钱"
                : "Four steps to start earning from your expertise"}
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {s.map((item) => (
              <div key={item.step} className="relative rounded-xl border border-card-border bg-background p-6">
                <div className="text-3xl font-bold text-accent/20">{item.step}</div>
                <h3 className="mt-2 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="border-t border-card-border px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {l === "zh" ? "加入条件" : "Who Can Join"}
            </h2>
            <p className="mt-3 text-muted">
              {l === "zh"
                ? "我们欢迎各行各业的专业人士"
                : "We welcome professionals from all industries"}
            </p>
          </div>
          <div className="mt-10 space-y-4">
            {r.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-card-border bg-card-bg p-5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                  ✓
                </div>
                <p className="leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings Highlight */}
      <section className="border-t border-card-border bg-card-bg/50 px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {l === "zh" ? "你的知识值多少？" : "What's Your Knowledge Worth?"}
          </h2>
          <p className="mt-3 text-muted">
            {l === "zh"
              ? "顾问自主定价，平台根据客户订阅等级收取佣金"
              : "You set your own rates. Platform commission depends on client subscription tier."}
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-card-border bg-background p-6">
              <p className="text-3xl font-bold text-accent-light">$200</p>
              <p className="mt-1 text-sm text-muted">{l === "zh" ? "每小时起" : "per hour starting"}</p>
              <p className="mt-3 text-xs text-muted">
                {l === "zh" ? "初级顾问（3-5年经验）" : "Junior consultant (3-5 yrs)"}
              </p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
              <p className="text-3xl font-bold text-accent-light">$500</p>
              <p className="mt-1 text-sm text-muted">{l === "zh" ? "每小时" : "per hour"}</p>
              <p className="mt-3 text-xs text-muted">
                {l === "zh" ? "资深顾问（5-10年经验）" : "Senior consultant (5-10 yrs)"}
              </p>
            </div>
            <div className="rounded-xl border border-card-border bg-background p-6">
              <p className="text-3xl font-bold text-accent-light">$1000+</p>
              <p className="mt-1 text-sm text-muted">{l === "zh" ? "每小时" : "per hour"}</p>
              <p className="mt-3 text-xs text-muted">
                {l === "zh" ? "行业专家（10年以上经验）" : "Industry expert (10+ yrs)"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-card-border px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {l === "zh" ? (
              <>
                准备好让知识{" "}
                <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                  为你工作
                </span>
                {" "}了吗？
              </>
            ) : (
              <>
                Ready to Make Your Expertise{" "}
                <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                  Work for You
                </span>
                ?
              </>
            )}
          </h2>
          <p className="mt-4 text-lg text-muted">
            {l === "zh"
              ? "不再免费输出，不再被低估。加入我们，让每一次咨询都有价值。"
              : "No more free advice. No more being undervalued. Join us and make every consultation count."}
          </p>
          <Link
            href={`/${l}/profile`}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent to-accent-light px-10 py-4 text-lg font-medium text-white transition hover:opacity-90"
          >
            {l === "zh" ? "立即加入 →" : "Join Now →"}
          </Link>
        </div>
      </section>
    </div>
  );
}
