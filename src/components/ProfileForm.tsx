"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

const AI_MODELS = [
  { value: "openrouter/auto", label: "Auto (Recommended)", labelZh: "自动（推荐）" },
  { value: "anthropic/claude-sonnet-4", label: "Claude Sonnet 4", labelZh: "Claude Sonnet 4" },
  { value: "openai/gpt-4o", label: "GPT-4o", labelZh: "GPT-4o" },
  { value: "openai/gpt-4o-mini", label: "GPT-4o Mini", labelZh: "GPT-4o Mini" },
  { value: "google/gemini-2.5-flash", label: "Gemini 2.5 Flash", labelZh: "Gemini 2.5 Flash" },
  { value: "deepseek/deepseek-chat", label: "DeepSeek V3", labelZh: "DeepSeek V3" },
];

export default function ProfileForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [model, setModel] = useState("openrouter/auto");
  const [plan, setPlan] = useState("free");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setModel(data.user.preferredModel ?? "openrouter/auto");
          setPlan(data.user.plan ?? "free");
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
        body: JSON.stringify({ preferredModel: model }),
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
    pro: dict.profile.pro,
    enterprise: dict.profile.enterprise,
  };

  const planColors: Record<string, string> = {
    free: "text-muted",
    pro: "text-accent-light",
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
          {AI_MODELS.map((m) => (
            <button
              key={m.value}
              onClick={() => setModel(m.value)}
              className={`rounded-lg border px-4 py-3 text-left text-sm transition ${
                model === m.value
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-card-border text-muted hover:border-accent/40"
              }`}
            >
              {locale === "zh" ? m.labelZh : m.label}
            </button>
          ))}
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
    </div>
  );
}
