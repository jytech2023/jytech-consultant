"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

const AI_MODELS = [
  // Free tier — OpenRouter free models
  { value: "openrouter/free", label: "Auto Free (Recommended)", labelZh: "自动免费（推荐）", minPlan: "free" },
  { value: "meta-llama/llama-3.3-70b-instruct:free", label: "Llama 3.3 70B", labelZh: "Llama 3.3 70B", minPlan: "free" },
  { value: "google/gemma-3-27b-it:free", label: "Gemma 3 27B", labelZh: "Gemma 3 27B", minPlan: "free" },
  { value: "qwen/qwen3-coder:free", label: "Qwen3 Coder 480B", labelZh: "Qwen3 Coder 480B", minPlan: "free" },
  { value: "nvidia/nemotron-3-super-120b-a12b:free", label: "Nemotron 3 Super 120B", labelZh: "Nemotron 3 Super 120B", minPlan: "free" },
  // Start tier — paid models
  { value: "openai/gpt-4o-mini", label: "GPT-4o Mini", labelZh: "GPT-4o Mini", minPlan: "start" },
  { value: "openai/gpt-4o", label: "GPT-4o", labelZh: "GPT-4o", minPlan: "start" },
  // Growth tier — premium models
  { value: "anthropic/claude-sonnet-4", label: "Claude Sonnet 4", labelZh: "Claude Sonnet 4", minPlan: "growth" },
  { value: "google/gemini-2.5-flash", label: "Gemini 2.5 Flash", labelZh: "Gemini 2.5 Flash", minPlan: "growth" },
];

const INDUSTRIES = [
  { slug: "restaurant", name: "Restaurant & Food Service", nameZh: "餐饮" },
  { slug: "cosmetic", name: "Cosmetic", nameZh: "美妆" },
  { slug: "manufacturing", name: "Manufacturing", nameZh: "制造" },
  { slug: "robotics", name: "Robotics", nameZh: "机器人" },
  { slug: "medical", name: "Medical", nameZh: "医疗" },
  { slug: "education", name: "Education", nameZh: "教育" },
  { slug: "technology", name: "Technology", nameZh: "科技" },
  { slug: "media", name: "Media", nameZh: "传媒广告" },
  { slug: "finance", name: "Finance", nameZh: "金融" },
];

const PLAN_RANK: Record<string, number> = {
  free: 0,
  start: 1,
  growth: 2,
  enterprise: 3,
};

export default function ProfileForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [model, setModel] = useState("openrouter/free");
  const [plan, setPlan] = useState("free");
  const [llamaKey, setLlamaKey] = useState("");
  const [hasLlamaKey, setHasLlamaKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [calendly, setCalendly] = useState<{ email: string; connected: boolean } | null>(null);
  const [isExpert, setIsExpert] = useState(false);
  const [expertStatus, setExpertStatus] = useState("draft"); // draft | pending | approved | rejected
  const [expertIndustries, setExpertIndustries] = useState<string[]>([]);
  const [hourlyRate, setHourlyRate] = useState("");
  const [hourlyRateOnline, setHourlyRateOnline] = useState("200");
  const [hourlyRateOnsite, setHourlyRateOnsite] = useState("200");
  const [expertCity, setExpertCity] = useState("");
  const [expertBio, setExpertBio] = useState("");
  const [expertSaving, setExpertSaving] = useState(false);
  const [expertSaved, setExpertSaved] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setModel(data.user.preferredModel ?? "openrouter/free");
          setPlan(data.user.plan ?? "free");
          setHasLlamaKey(!!data.user.llamaindexApiKey);
          setIsExpert(!!data.user.isExpert);
          setExpertStatus(data.user.expertStatus ?? "draft");
          setExpertIndustries(
            data.user.expertIndustries
              ? data.user.expertIndustries.split(",")
              : []
          );
          setHourlyRate(data.user.hourlyRate ? String(data.user.hourlyRate) : "");
          setHourlyRateOnline(data.user.hourlyRateOnline ? String(data.user.hourlyRateOnline) : "200");
          setHourlyRateOnsite(data.user.hourlyRateOnsite ? String(data.user.hourlyRateOnsite) : "200");
          setExpertCity(data.user.expertCity ?? "");
          setExpertBio(data.user.expertBio ?? "");
        }
        if (data.calendly) {
          setCalendly(data.calendly);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preferredModel: model,
          ...(llamaKey ? { llamaindexApiKey: llamaKey } : {}),
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  }

  const planLabels: Record<string, string> = {
    free: dict.profile.free,
    start: dict.profile.start,
    growth: dict.profile.growth,
    enterprise: dict.profile.enterprise,
  };

  const planColors: Record<string, string> = {
    free: "text-muted",
    start: "text-amber-400",
    growth: "text-accent-light",
    enterprise: "text-purple-400",
  };

  if (loading) {
    return (
      <div className="mt-8 animate-pulse text-sm text-muted">
        {locale === "zh" ? "加载中..." : "Loading..."}
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-8">
      {/* AI Model Selection */}
      <div className="rounded-xl border border-card-border bg-card-bg p-6">
        <h2 className="font-semibold">{dict.profile.aiModel}</h2>
        <p className="mt-1 text-sm text-muted">{dict.profile.aiModelDesc}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {AI_MODELS.map((m) => {
            const userRank = PLAN_RANK[plan] ?? 0;
            const modelRank = PLAN_RANK[m.minPlan] ?? 0;
            const locked = userRank < modelRank;

            return (
              <button
                key={m.value}
                onClick={() => !locked && setModel(m.value)}
                disabled={locked}
                className={`rounded-lg border px-4 py-3 text-left text-sm transition ${
                  locked
                    ? "cursor-not-allowed border-card-border opacity-50"
                    : model === m.value
                      ? "border-accent bg-accent/10 text-foreground"
                      : "border-card-border text-muted hover:border-accent/40"
                }`}
              >
                <span>{locale === "zh" ? m.labelZh : m.label}</span>
                {locked && (
                  <span className="ml-2 text-xs text-muted">
                    🔒 {planLabels[m.minPlan] ?? m.minPlan}+
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white transition hover:bg-accent/80 disabled:opacity-50"
          >
            {saving
              ? "..."
              : saved
                ? dict.profile.saved
                : dict.profile.save}
          </button>
        </div>
      </div>

      {/* BYOK — LlamaIndex API Key */}
      <div className="rounded-xl border border-card-border bg-card-bg p-6">
        <h2 className="font-semibold">
          {locale === "zh" ? "LlamaIndex API Key (BYOK)" : "LlamaIndex API Key (BYOK)"}
        </h2>
        <p className="mt-1 text-sm text-muted">
          {locale === "zh"
            ? "免费用户共享系统 Key。添加自己的 Key 可获得独立配额和更快的处理速度。"
            : "Free users share a system key. Add your own key for dedicated quota and faster processing."}
        </p>
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs ${hasLlamaKey ? "bg-emerald-400/10 text-emerald-400" : "bg-card-border text-muted"}`}>
              {hasLlamaKey
                ? (locale === "zh" ? "使用自有 Key" : "Using your key")
                : (locale === "zh" ? "使用系统 Key" : "Using system key")}
            </span>
          </div>
          <input
            type="password"
            value={llamaKey}
            onChange={(e) => setLlamaKey(e.target.value)}
            placeholder={hasLlamaKey ? "llx-••••••••" : "llx-xxxxxxxxxxxxx"}
            className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent/60"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={saving || !llamaKey}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/80 disabled:opacity-50"
            >
              {saving ? "..." : locale === "zh" ? "保存 Key" : "Save Key"}
            </button>
            {hasLlamaKey && (
              <button
                onClick={async () => {
                  await fetch("/api/profile", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ llamaindexApiKey: null }),
                  });
                  setHasLlamaKey(false);
                  setLlamaKey("");
                }}
                className="rounded-lg border border-card-border px-4 py-2 text-sm text-muted transition hover:border-red-400/40 hover:text-red-400"
              >
                {locale === "zh" ? "切回系统 Key" : "Switch to system key"}
              </button>
            )}
          </div>
          <p className="text-xs text-muted">
            {locale === "zh"
              ? "获取 Key: cloud.llamaindex.ai → Settings → API Keys"
              : "Get your key: cloud.llamaindex.ai → Settings → API Keys"}
          </p>
        </div>
      </div>

      {/* Expert Settings */}
      <div className="rounded-xl border border-card-border bg-card-bg p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">
            {locale === "zh" ? "专家设置" : "Expert Settings"}
          </h2>
          {isExpert && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                expertStatus === "approved"
                  ? "bg-emerald-400/10 text-emerald-400"
                  : expertStatus === "pending"
                    ? "bg-amber-400/10 text-amber-400"
                    : expertStatus === "rejected"
                      ? "bg-red-400/10 text-red-400"
                      : "bg-card-border text-muted"
              }`}
            >
              {expertStatus === "approved"
                ? locale === "zh" ? "已通过" : "Approved"
                : expertStatus === "pending"
                  ? locale === "zh" ? "审核中" : "Pending Review"
                  : expertStatus === "rejected"
                    ? locale === "zh" ? "未通过" : "Rejected"
                    : locale === "zh" ? "草稿" : "Draft"}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted">
          {locale === "zh"
            ? "申请成为咨询专家，设置您的行业和费率。入驻需支付 $99/年 身份验证费用，审核通过后将在相关行业页面展示。"
            : "Apply to become a consultant. Set your industries and rate. A $99/year verification fee is required. You'll appear on industry pages once approved."}
        </p>

        {/* Toggle */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => setIsExpert(!isExpert)}
            disabled={expertStatus === "pending"}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
              isExpert ? "bg-accent" : "bg-card-border"
            } ${expertStatus === "pending" ? "opacity-50" : ""}`}
          >
            <span
              className={`inline-block h-4 w-4 rounded-full bg-white transition ${
                isExpert ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-sm">
            {locale === "zh"
              ? isExpert ? "我要提供咨询服务" : "我不提供咨询服务"
              : isExpert ? "I want to offer consulting" : "I don't offer consulting"}
          </span>
        </div>

        {isExpert && (
        <div className="mt-6 space-y-5">
          {/* Industry Selection */}
          <div>
            <label className="text-sm font-medium">
              {locale === "zh" ? "咨询行业（可多选）" : "Consulting Industries (multi-select)"}
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {INDUSTRIES.map((ind) => {
                const selected = expertIndustries.includes(ind.slug);
                return (
                  <button
                    key={ind.slug}
                    disabled={expertStatus === "pending"}
                    onClick={() =>
                      setExpertIndustries((prev) =>
                        selected
                          ? prev.filter((s) => s !== ind.slug)
                          : [...prev, ind.slug]
                      )
                    }
                    className={`rounded-lg border px-3 py-1.5 text-sm transition ${
                      selected
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-card-border text-muted hover:border-accent/40"
                    } ${expertStatus === "pending" ? "opacity-60" : ""}`}
                  >
                    {locale === "zh" ? ind.nameZh : ind.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* City */}
          <div>
            <label className="text-sm font-medium">
              {locale === "zh" ? "所在城市" : "City"}
            </label>
            <input
              type="text"
              value={expertCity}
              onChange={(e) => setExpertCity(e.target.value)}
              placeholder={locale === "zh" ? "例如: San Francisco, CA" : "e.g. San Francisco, CA"}
              disabled={expertStatus === "pending"}
              className="mt-2 w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent/60 disabled:opacity-60"
            />
          </div>

          {/* Online Rate */}
          <div>
            <label className="text-sm font-medium">
              {locale === "zh" ? "线上咨询费 (USD)" : "Online Rate (USD)"}
            </label>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-muted">$</span>
              <input
                type="number"
                min="0"
                step="10"
                value={hourlyRateOnline}
                onChange={(e) => setHourlyRateOnline(e.target.value)}
                placeholder="200"
                disabled={expertStatus === "pending"}
                className="w-32 rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent/60 disabled:opacity-60"
              />
              <span className="text-sm text-muted">/ hr</span>
            </div>
            <p className="mt-1 text-xs text-muted">
              {locale === "zh" ? "视频/电话咨询" : "Video / phone consultation"}
            </p>
          </div>

          {/* On-site Rate */}
          <div>
            <label className="text-sm font-medium">
              {locale === "zh" ? "线下咨询费 (USD)" : "On-site Rate (USD)"}
            </label>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-muted">$</span>
              <input
                type="number"
                min="0"
                step="10"
                value={hourlyRateOnsite}
                onChange={(e) => setHourlyRateOnsite(e.target.value)}
                placeholder="200"
                disabled={expertStatus === "pending"}
                className="w-32 rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent/60 disabled:opacity-60"
              />
              <span className="text-sm text-muted">/ hr</span>
            </div>
            <p className="mt-1 text-xs text-muted">
              {locale === "zh" ? "面对面咨询（差旅费另计）" : "In-person consultation (travel costs extra)"}
            </p>
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm font-medium">
              {locale === "zh" ? "个人简介" : "Short Bio"}
            </label>
            <textarea
              value={expertBio}
              onChange={(e) => setExpertBio(e.target.value)}
              placeholder={
                locale === "zh"
                  ? "简要介绍您的专业背景和擅长领域..."
                  : "Briefly describe your expertise and background..."
              }
              disabled={expertStatus === "pending"}
              rows={3}
              className="mt-2 w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent/60 disabled:opacity-60"
            />
          </div>

          {/* Actions */}
          {expertStatus === "draft" || expertStatus === "rejected" ? (
              <div className="space-y-3">
                {expertStatus === "rejected" && (
                  <div className="rounded-lg border border-red-400/30 bg-red-400/5 p-3">
                    <p className="text-sm text-red-400">
                      {locale === "zh"
                        ? "您的申请未通过审核，请修改后重新提交。如有疑问，请联系客服微信: weijingjaylin"
                        : "Your application was not approved. Please revise and resubmit. Questions? Contact WeChat: weijingjaylin"}
                    </p>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  {/* Save Draft */}
                  <button
                    onClick={async () => {
                      setExpertSaving(true);
                      setExpertSaved(false);
                      try {
                        await fetch("/api/profile", {
                          method: "PATCH",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            isExpert: 1,
                            expertStatus: "draft",
                            expertIndustries: expertIndustries.join(",") || null,
                            hourlyRate: hourlyRateOnline ? Number(hourlyRateOnline) : null,
                            hourlyRateOnline: hourlyRateOnline ? Number(hourlyRateOnline) : null,
                            hourlyRateOnsite: hourlyRateOnsite ? Number(hourlyRateOnsite) : null,
                            expertCity: expertCity || null,
                            expertBio: expertBio || null,
                          }),
                        });
                        setExpertSaved(true);
                        setTimeout(() => setExpertSaved(false), 2000);
                      } catch {
                        // ignore
                      } finally {
                        setExpertSaving(false);
                      }
                    }}
                    disabled={expertSaving}
                    className="rounded-lg border border-card-border px-5 py-2 text-sm font-medium transition hover:border-accent/40 disabled:opacity-50"
                  >
                    {expertSaving
                      ? "..."
                      : expertSaved
                        ? locale === "zh" ? "已保存！" : "Saved!"
                        : locale === "zh" ? "保存草稿" : "Save Draft"}
                  </button>
                  {/* Pay & Submit for Review */}
                  <button
                    onClick={async () => {
                      if (!expertIndustries.length || !hourlyRateOnline) {
                        alert(
                          locale === "zh"
                            ? "请至少选择一个行业并设置线上咨询费率"
                            : "Please select at least one industry and set your online rate"
                        );
                        return;
                      }
                      setExpertSaving(true);
                      try {
                        const res = await fetch("/api/stripe/expert-checkout", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            locale,
                            expertIndustries: expertIndustries.join(",") || null,
                            hourlyRateOnline: hourlyRateOnline ? Number(hourlyRateOnline) : null,
                            hourlyRateOnsite: hourlyRateOnsite ? Number(hourlyRateOnsite) : null,
                            expertCity: expertCity || null,
                            expertBio: expertBio || null,
                          }),
                        });
                        const data = await res.json();
                        if (data.url) {
                          window.location.href = data.url;
                        }
                      } catch {
                        // ignore
                      } finally {
                        setExpertSaving(false);
                      }
                    }}
                    disabled={expertSaving || !expertIndustries.length || !hourlyRateOnline}
                    className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white transition hover:bg-accent/80 disabled:opacity-50"
                  >
                    {expertSaving
                      ? "..."
                      : locale === "zh" ? "支付 $99/年 并提交审核" : "Pay $99/yr & Submit"}
                  </button>
                </div>
              </div>
            ) : expertStatus === "pending" ? (
              <div className="rounded-lg border border-amber-400/30 bg-amber-400/5 p-4">
                <p className="text-sm text-amber-400">
                  {locale === "zh"
                    ? "您的专家申请正在审核中，审核通过后将在相关行业页面展示。如有疑问，请联系客服微信: weijingjaylin"
                    : "Your expert application is under review. You'll appear on industry pages once approved. Questions? Contact WeChat: weijingjaylin"}
                </p>
              </div>
            ) : expertStatus === "approved" ? (
              <div className="space-y-3">
                <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/5 p-4">
                  <p className="text-sm text-emerald-400">
                    {locale === "zh"
                      ? "您的专家资格已通过审核，客户可以在相关行业页面看到您的信息并进行预约。"
                      : "Your expert profile is approved. Clients can see your profile on industry pages and book consultations."}
                  </p>
                </div>
                <button
                  onClick={async () => {
                    setExpertSaving(true);
                    setExpertSaved(false);
                    try {
                      await fetch("/api/profile", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          isExpert: 1,
                          expertIndustries: expertIndustries.join(",") || null,
                          hourlyRate: hourlyRateOnline ? Number(hourlyRateOnline) : null,
                          hourlyRateOnline: hourlyRateOnline ? Number(hourlyRateOnline) : null,
                          hourlyRateOnsite: hourlyRateOnsite ? Number(hourlyRateOnsite) : null,
                          expertCity: expertCity || null,
                          expertBio: expertBio || null,
                        }),
                      });
                      setExpertSaved(true);
                      setTimeout(() => setExpertSaved(false), 2000);
                    } catch {
                      // ignore
                    } finally {
                      setExpertSaving(false);
                    }
                  }}
                  disabled={expertSaving}
                  className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white transition hover:bg-accent/80 disabled:opacity-50"
                >
                  {expertSaving
                    ? "..."
                    : expertSaved
                      ? locale === "zh" ? "已更新！" : "Updated!"
                      : locale === "zh" ? "更新信息" : "Update Profile"}
                </button>
              </div>
            ) : null}
          </div>
        )}

        {!isExpert && (
          <p className="mt-3 text-xs text-muted">
            {locale === "zh"
              ? "开启后，您可以申请成为平台咨询专家。"
              : "Enable this to apply as a platform consultant."}
          </p>
        )}
      </div>

      {/* Current Plan */}
      <div className="rounded-xl border border-card-border bg-card-bg p-6">
        <h2 className="font-semibold">{dict.profile.currentPlan}</h2>
        <div className="mt-3 flex items-center gap-3">
          <span
            className={`rounded-full border border-card-border px-4 py-1.5 text-sm font-medium ${planColors[plan] ?? "text-muted"}`}
          >
            {planLabels[plan] ?? plan}
          </span>
        </div>
        {plan === "free" && (
          <div className="mt-4">
            <Link
              href={`/${locale}/pricing`}
              className="inline-flex items-center gap-1 text-sm text-accent-light transition hover:text-foreground"
            >
              {dict.profile.viewPricing} →
            </Link>
          </div>
        )}
      </div>

      {/* Calendly Connection */}
      <div className="rounded-xl border border-card-border bg-card-bg p-6">
        <h2 className="font-semibold">
          {locale === "zh" ? "Calendly 预约系统" : "Calendly Booking"}
        </h2>
        <p className="mt-1 text-sm text-muted">
          {locale === "zh"
            ? "连接您的 Calendly 账户，让客户可以在您的专家页面上直接预约咨询。"
            : "Connect your Calendly account so clients can book consultations directly from your expert page."}
        </p>
        <div className="mt-4">
          {calendly?.connected ? (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1.5 text-sm text-emerald-400">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                {locale === "zh" ? "已连接" : "Connected"}
              </span>
              <span className="text-sm text-muted">{calendly.email}</span>
            </div>
          ) : (
            <a
              href="/api/calendly/authorize"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent/80"
            >
              {locale === "zh" ? "连接 Calendly" : "Connect Calendly"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
