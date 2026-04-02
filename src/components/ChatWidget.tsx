"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIMessage } from "ai";
import { useUser } from "@auth0/nextjs-auth0/client";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

const systemPrompt = `You are an expert business consultant for JY Consulting, a Human + AI consulting platform. You help users with customer discovery, competitor analysis, business strategy, market intelligence, supply chain optimization, and career consulting across multiple industries including restaurant, cosmetic, manufacturing, robotics, medical, and education.
Keep responses concise, actionable, and professional. Use bullet points when helpful. If the user asks in Chinese, respond in Chinese.`;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const { user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const segments = pathname.split("/");
  const locale: Locale = locales.includes(segments[1] as Locale)
    ? (segments[1] as Locale)
    : "en";
  const isZh = locale === "zh";

  const welcomeText = isZh
    ? "你好！我是 JY Consulting 顾问。有什么可以帮您的？"
    : "Hi! I'm the JY Consulting advisor. How can I help you?";

  const { messages, sendMessage, status, setMessages } = useChat<UIMessage>({
    id: "chat-widget",
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { systemPrompt },
    }),
    messages: [
      {
        id: "widget-welcome",
        role: "assistant" as const,
        parts: [{ type: "text" as const, text: welcomeText }],
      },
    ] satisfies UIMessage[],
  });

  const isLoading = status === "submitted" || status === "streaming";
  const [input, setInput] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput("");
    sendMessage({ text });
  }

  function getMessageText(msg: (typeof messages)[number]): string {
    return msg.parts
      .filter((p) => p.type === "text")
      .map((p) => p.text)
      .join("");
  }

  function handleClear() {
    setMessages([
      {
        id: "widget-welcome",
        role: "assistant" as const,
        parts: [{ type: "text" as const, text: welcomeText }],
      },
    ]);
  }

  // Don't show widget on module chat pages (they have their own chat)
  if (pathname.match(/\/industry\/[^/]+\/[^/]+$/) && !pathname.includes("/studies/")) {
    return null;
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition hover:bg-accent/80 hover:scale-105"
        title={isZh ? "JY Consulting" : "JY Consulting"}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    );
  }

  const panelClass = fullscreen
    ? "fixed inset-0 z-50 flex flex-col bg-background"
    : "fixed bottom-0 right-0 z-50 flex h-[100dvh] w-full flex-col bg-background sm:bottom-6 sm:right-6 sm:h-[560px] sm:w-[400px] sm:rounded-xl sm:border sm:border-card-border sm:shadow-2xl";

  return (
    <div className={panelClass}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-card-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <span className="text-sm font-semibold">
            {isZh ? "JY Consulting" : "JY Consulting"}
          </span>
          {user && (
            <span className="text-xs text-muted">
              · {user.name ?? user.email}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleClear}
            className="rounded p-1.5 text-muted transition hover:bg-card-bg hover:text-foreground"
            title={isZh ? "清除对话" : "Clear chat"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            </svg>
          </button>
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="rounded p-1.5 text-muted transition hover:bg-card-bg hover:text-foreground"
            title={fullscreen ? (isZh ? "退出全屏" : "Exit fullscreen") : (isZh ? "全屏" : "Fullscreen")}
          >
            {fullscreen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            )}
          </button>
          <button
            onClick={() => { setOpen(false); setFullscreen(false); }}
            className="rounded p-1.5 text-muted transition hover:bg-card-bg hover:text-foreground"
            title={isZh ? "关闭" : "Close"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-accent text-white"
                  : "bg-card-bg border border-card-border"
              }`}
            >
              <div className="whitespace-pre-wrap">{getMessageText(msg)}</div>
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="rounded-xl border border-card-border bg-card-bg px-3.5 py-2.5 text-sm text-muted">
              <span className="inline-flex gap-1">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>●</span>
                <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>●</span>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Login prompt */}
      {!user && messages.length > 3 && (
        <div className="border-t border-card-border bg-accent/5 px-4 py-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-muted">
              {isZh ? "登录以保存对话" : "Sign in to save chats"}
            </p>
            <a
              href="/auth/login"
              className="shrink-0 rounded bg-accent px-2.5 py-1 text-xs text-white transition hover:bg-accent/80"
            >
              {isZh ? "登录" : "Sign in"}
            </a>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-card-border p-3">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isZh ? "输入您的问题..." : "Ask anything..."}
            className="flex-1 rounded-lg border border-card-border bg-card-bg px-3 py-2 text-sm outline-none transition focus:border-accent/60"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/80 disabled:opacity-40"
          >
            {isZh ? "发送" : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
