"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIMessage } from "ai";
import { useUser } from "@auth0/nextjs-auth0/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Locale } from "@/lib/i18n";

const SUGGESTED_PROMPTS: Record<string, { en: string[]; zh: string[] }> = {
  customers: {
    en: [
      "Help me identify my ideal customer profile",
      "What are the best acquisition channels for my industry?",
      "Analyze customer segments for my business",
    ],
    zh: [
      "帮我识别理想客户画像",
      "我所在行业最佳的获客渠道有哪些？",
      "分析我的业务客户细分",
    ],
  },
  competitors: {
    en: [
      "Who are the top competitors in this space?",
      "Generate a SWOT analysis for my business",
      "Compare pricing strategies of key players",
    ],
    zh: [
      "这个领域的主要竞争对手有哪些？",
      "为我的业务生成SWOT分析",
      "比较主要竞争者的定价策略",
    ],
  },
  strategy: {
    en: [
      "Help me plan a market entry strategy",
      "What growth opportunities should I prioritize?",
      "Recommend partnership strategies",
    ],
    zh: [
      "帮我制定市场进入策略",
      "我应该优先考虑哪些增长机会？",
      "推荐合作伙伴策略",
    ],
  },
  market: {
    en: [
      "What are the latest trends in this market?",
      "Estimate the market size and growth potential",
      "What regulations should I be aware of?",
    ],
    zh: [
      "这个市场的最新趋势是什么？",
      "估算市场规模和增长潜力",
      "我需要了解哪些法规？",
    ],
  },
  "supply-chain": {
    en: [
      "Help me find reliable suppliers",
      "How can I reduce supply chain costs?",
      "What are the key risks in my supply chain?",
    ],
    zh: [
      "帮我找到可靠的供应商",
      "如何降低供应链成本？",
      "我的供应链有哪些主要风险？",
    ],
  },
  career: {
    en: [
      "Help me plan a career transition strategy",
      "Optimize my resume for this industry",
      "What skills are most in demand right now?",
    ],
    zh: [
      "帮我规划职业转型策略",
      "为这个行业优化我的简历",
      "目前最受欢迎的技能有哪些？",
    ],
  },
};

interface SavedSession {
  id: string;
  title: string;
  messageCount: number;
  updatedAt: string;
}

export default function ConsultingChat({
  industryName,
  industrySlug,
  moduleName,
  moduleSlug,
  color,
  locale = "en",
}: {
  industryName: string;
  industrySlug: string;
  moduleName: string;
  moduleSlug: string;
  color: string;
  locale?: Locale;
}) {
  const [input, setInput] = useState("");
  const { user } = useUser();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [savedSessions, setSavedSessions] = useState<SavedSession[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const lastSavedCount = useRef(0);
  const [modelName, setModelName] = useState("openrouter/free");

  const systemPrompt = `You are an expert AI ${moduleName} consultant specializing in the ${industryName} industry.
You provide actionable, data-driven insights tailored to this specific industry context.
Keep responses concise but thorough. Use bullet points and structured formatting when helpful.
Always end with a follow-up question or offer to dive deeper into a specific area.
Industry context: ${industrySlug}. Consulting module: ${moduleSlug}.
${locale === "zh" ? "Please respond in Chinese (中文)." : ""}`;

  const welcomeText =
    locale === "zh"
      ? `欢迎！我是您的AI${moduleName}顾问，专注于**${industryName}**行业。我可以帮助您进行分析、战略规划和提供可行的洞察。\n\n今天有什么可以帮您的？您可以从下面的建议提示开始，也可以直接提出您的问题。`
      : `Welcome! I'm your AI ${moduleName} consultant specializing in the **${industryName}** industry. I can help you with analysis, strategy, and actionable insights.\n\nHow can I assist you today? You can start with one of the suggested prompts or ask your own question.`;

  const { messages, sendMessage, status, setMessages } = useChat<UIMessage>({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { systemPrompt },
    }),
    messages: [
      {
        id: "welcome",
        role: "assistant" as const,
        parts: [{ type: "text" as const, text: welcomeText }],
      },
    ] satisfies UIMessage[],
  });

  const isLoading = status === "submitted" || status === "streaming";
  const promptSet = SUGGESTED_PROMPTS[moduleSlug] ?? SUGGESTED_PROMPTS.strategy;
  const prompts = promptSet[locale] ?? promptSet.en;

  // Fetch actual model name after each response completes
  useEffect(() => {
    if (status === "ready" && messages.length > 1) {
      fetch("/api/chat")
        .then((r) => r.json())
        .then((data) => {
          if (data.model) setModelName(data.model);
        })
        .catch(() => {});
    }
  }, [status, messages.length]);

  // Load saved sessions list for logged-in users
  useEffect(() => {
    if (!user) return;
    fetch(
      `/api/chat-history?industrySlug=${industrySlug}&moduleSlug=${moduleSlug}`
    )
      .then((r) => r.json())
      .then((data) => setSavedSessions(data.sessions ?? []))
      .catch(() => {});
  }, [user, industrySlug, moduleSlug]);

  // Auto-save messages for logged-in users
  const saveMessages = useCallback(async () => {
    if (!user) return;

    // Get unsaved messages (skip welcome message and already-saved ones)
    const realMessages = messages.filter((m) => m.id !== "welcome");
    const unsaved = realMessages.slice(lastSavedCount.current);
    if (!unsaved.length) return;

    const toSave = unsaved.map((m) => ({
      role: m.role,
      content: m.parts
        .filter((p) => p.type === "text")
        .map((p) => p.text)
        .join(""),
    }));

    try {
      const res = await fetch("/api/chat-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          industrySlug,
          moduleSlug,
          messages: toSave,
        }),
      });
      const data = await res.json();
      if (data.sessionId) {
        setSessionId(data.sessionId);
        lastSavedCount.current = realMessages.length;
      }
    } catch {
      // Silently fail — chat still works without persistence
    }
  }, [user, messages, sessionId, industrySlug, moduleSlug]);

  // Save after assistant replies (when streaming is done)
  useEffect(() => {
    if (status === "ready" && messages.length > 1 && user) {
      saveMessages();
    }
  }, [status, messages.length, user, saveMessages]);

  // Load a saved session
  async function loadSession(id: string) {
    try {
      const res = await fetch(`/api/chat-history?sessionId=${id}`);
      const data = await res.json();
      if (data.messages?.length) {
        const loaded: UIMessage[] = [
          {
            id: "welcome",
            role: "assistant" as const,
            parts: [{ type: "text" as const, text: welcomeText }],
          },
          ...data.messages.map(
            (m: { id: string; role: string; content: string }) => ({
              id: m.id,
              role: m.role as "user" | "assistant",
              parts: [{ type: "text" as const, text: m.content }],
            })
          ),
        ];
        setMessages(loaded);
        setSessionId(id);
        lastSavedCount.current = data.messages.length;
        setShowHistory(false);
      }
    } catch {
      // ignore
    }
  }

  function startNewChat() {
    setSessionId(null);
    lastSavedCount.current = 0;
    setMessages([
      {
        id: "welcome",
        role: "assistant" as const,
        parts: [{ type: "text" as const, text: welcomeText }],
      },
    ]);
    setShowHistory(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput("");
    sendMessage({ text });
  }

  function handlePromptClick(text: string) {
    sendMessage({ text });
  }

  function getReasoningText(msg: (typeof messages)[number]): string {
    return msg.parts
      .filter((p): p is { type: "reasoning"; text: string } => p.type === "reasoning")
      .map((p) => p.text)
      .join("");
  }

  function getMessageText(msg: (typeof messages)[number]): string {
    const textParts = msg.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text);
    const raw = textParts.length > 1
      ? textParts.map((t) => t.trimEnd()).join("\n\n")
      : textParts.join("");
    // Normalize markdown: ensure block elements start on their own line
    // Process line by line, skip table rows (lines starting with |)
    const lines = raw.split("\n");
    const result: string[] = [];
    for (const line of lines) {
      if (line.trimStart().startsWith("|")) {
        // Table row — keep as-is
        result.push(line);
        continue;
      }
      let fixed = line
        // Headings: ensure newline before # when not at line start
        .replace(/(.+?)(#{1,6}\s)/g, "$1\n\n$2")
        // Numbered list: ensure newline before "1." etc. when preceded by text
        .replace(/(.+?)\s{2,}(\d+\.\s)/g, "$1\n\n$2")
        // Bullet list: ensure newline before "- " when preceded by text
        .replace(/(.+?)\s{2,}(-\s)/g, "$1\n$2")
        // HR: ensure newline around ---
        .replace(/(.+?)(---)/g, "$1\n\n$2")
        .replace(/(---)(.+)/g, "$1\n\n$2");
      result.push(fixed);
    }
    return result.join("\n");
  }

  return (
    <div className="flex flex-1 flex-col rounded-xl border border-card-border bg-card-bg">
      {/* Header with history toggle */}
      {user && savedSessions.length > 0 && (
        <div className="flex items-center justify-between border-b border-card-border px-5 py-2">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-xs text-muted transition hover:text-foreground"
          >
            {showHistory
              ? locale === "zh"
                ? "关闭历史"
                : "Close History"
              : locale === "zh"
                ? `📋 历史对话 (${savedSessions.length})`
                : `📋 History (${savedSessions.length})`}
          </button>
          {sessionId && (
            <button
              onClick={startNewChat}
              className="text-xs text-accent-light transition hover:text-foreground"
            >
              {locale === "zh" ? "+ 新对话" : "+ New Chat"}
            </button>
          )}
        </div>
      )}

      {/* History panel */}
      {showHistory && (
        <div className="max-h-48 overflow-y-auto border-b border-card-border">
          {savedSessions.map((s) => (
            <button
              key={s.id}
              onClick={() => loadSession(s.id)}
              className={`flex w-full items-center justify-between px-5 py-2.5 text-left text-xs transition hover:bg-background ${
                s.id === sessionId ? "bg-accent/10 text-foreground" : "text-muted"
              }`}
            >
              <span className="truncate pr-3">
                {s.title || (locale === "zh" ? "未命名对话" : "Untitled")}
              </span>
              <span className="shrink-0 text-muted">
                {s.messageCount} {locale === "zh" ? "条" : "msgs"}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[92%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-accent text-white"
                  : "bg-background border border-card-border"
              }`}
            >
              {msg.role === "assistant" ? (
                <>
                  {getReasoningText(msg) && (() => {
                    const hasText = !!getMessageText(msg);
                    const isThinking = isLoading && !hasText;
                    return isThinking ? (
                      // Streaming reasoning — show open, with pulsing indicator
                      <div className="mb-2 rounded-lg border border-amber-400/30 bg-amber-400/5">
                        <div className="flex items-center gap-2 px-3 py-1.5 text-xs text-amber-400">
                          <span className="animate-pulse">💭</span>
                          {locale === "zh" ? "思考中..." : "Thinking..."}
                        </div>
                        <div className="border-t border-amber-400/20 px-3 py-2 text-xs leading-relaxed text-muted whitespace-pre-wrap max-h-48 overflow-y-auto">
                          {getReasoningText(msg)}
                        </div>
                      </div>
                    ) : (
                      // Completed reasoning — collapsible
                      <details className="mb-2 rounded-lg border border-card-border bg-card-bg">
                        <summary className="cursor-pointer select-none px-3 py-1.5 text-xs text-muted">
                          {locale === "zh" ? "💭 思考过程" : "💭 Reasoning"}
                        </summary>
                        <div className="border-t border-card-border px-3 py-2 text-xs leading-relaxed text-muted whitespace-pre-wrap max-h-64 overflow-y-auto">
                          {getReasoningText(msg)}
                        </div>
                      </details>
                    );
                  })()}
                  {getMessageText(msg) && (
                    <div className="chat-markdown">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{getMessageText(msg)}</ReactMarkdown>
                    </div>
                  )}
                  {msg.id !== "welcome" && getMessageText(msg) && (
                    <div className="mt-2 border-t border-card-border pt-1.5 text-[10px] text-muted opacity-60">
                      {modelName.split("/").pop()}
                    </div>
                  )}
                </>
              ) : (
                <div className="whitespace-pre-wrap">{getMessageText(msg)}</div>
              )}
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="rounded-xl border border-card-border bg-background px-4 py-3 text-sm text-muted">
              <span className="inline-flex gap-1">
                <span className="animate-bounce">●</span>
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                >
                  ●
                </span>
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                >
                  ●
                </span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Prompts */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 border-t border-card-border px-5 py-3">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handlePromptClick(prompt)}
              className="rounded-lg border border-card-border px-3 py-1.5 text-xs text-muted transition hover:border-accent/40 hover:text-foreground"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Login prompt for chat history */}
      {!user && messages.length > 2 && (
        <div className="border-t border-card-border bg-accent/5 px-5 py-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted">
              {locale === "zh"
                ? "登录以保存您的对话记录"
                : "Sign in to save your chat history"}
            </p>
            <a
              href="/auth/login"
              className="shrink-0 rounded-md bg-accent px-3 py-1 text-xs text-white transition hover:bg-accent/80"
            >
              {locale === "zh" ? "登录" : "Sign in"}
            </a>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-card-border p-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              locale === "zh"
                ? `询问关于${industryName}行业的${moduleName}...`
                : `Ask about ${moduleName.toLowerCase()} for ${industryName.toLowerCase()}...`
            }
            className="flex-1 rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent/60"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="rounded-lg px-5 py-2.5 text-sm font-medium text-white transition disabled:opacity-40"
            style={{ background: color }}
          >
            {locale === "zh" ? "发送" : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
