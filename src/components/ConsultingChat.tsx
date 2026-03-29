"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIMessage } from "ai";

const SUGGESTED_PROMPTS: Record<string, string[]> = {
  customers: [
    "Help me identify my ideal customer profile",
    "What are the best acquisition channels for my industry?",
    "Analyze customer segments for my business",
  ],
  competitors: [
    "Who are the top competitors in this space?",
    "Generate a SWOT analysis for my business",
    "Compare pricing strategies of key players",
  ],
  strategy: [
    "Help me plan a market entry strategy",
    "What growth opportunities should I prioritize?",
    "Recommend partnership strategies",
  ],
  market: [
    "What are the latest trends in this market?",
    "Estimate the market size and growth potential",
    "What regulations should I be aware of?",
  ],
  "supply-chain": [
    "Help me find reliable suppliers",
    "How can I reduce supply chain costs?",
    "What are the key risks in my supply chain?",
  ],
  career: [
    "Help me plan a career transition strategy",
    "Optimize my resume for this industry",
    "What skills are most in demand right now?",
  ],
};

export default function ConsultingChat({
  industryName,
  industrySlug,
  moduleName,
  moduleSlug,
  color,
}: {
  industryName: string;
  industrySlug: string;
  moduleName: string;
  moduleSlug: string;
  color: string;
}) {
  const [input, setInput] = useState("");

  const systemPrompt = `You are an expert AI ${moduleName} consultant specializing in the ${industryName} industry.
You provide actionable, data-driven insights tailored to this specific industry context.
Keep responses concise but thorough. Use bullet points and structured formatting when helpful.
Always end with a follow-up question or offer to dive deeper into a specific area.
Industry context: ${industrySlug}. Consulting module: ${moduleSlug}.`;

  const { messages, sendMessage, status } = useChat<UIMessage>({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { systemPrompt },
    }),
    messages: [
      {
        id: "welcome",
        role: "assistant" as const,
        parts: [
          {
            type: "text" as const,
            text: `Welcome! I'm your AI ${moduleName} consultant specializing in the **${industryName}** industry. I can help you with analysis, strategy, and actionable insights.\n\nHow can I assist you today? You can start with one of the suggested prompts or ask your own question.`,
          },
        ],
      },
    ] satisfies UIMessage[],
  });

  const isLoading = status === "submitted" || status === "streaming";
  const prompts = SUGGESTED_PROMPTS[moduleSlug] ?? SUGGESTED_PROMPTS.strategy;

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

  function getMessageText(msg: (typeof messages)[number]): string {
    return msg.parts
      .filter((p) => p.type === "text")
      .map((p) => p.text)
      .join("");
  }

  return (
    <div className="flex flex-1 flex-col rounded-xl border border-card-border bg-card-bg">
      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-accent text-white"
                  : "bg-background border border-card-border"
              }`}
            >
              <div className="whitespace-pre-wrap">{getMessageText(msg)}</div>
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

      {/* Input */}
      <div className="border-t border-card-border p-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask about ${moduleName.toLowerCase()} for ${industryName.toLowerCase()}...`}
            className="flex-1 rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent/60"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="rounded-lg px-5 py-2.5 text-sm font-medium text-white transition disabled:opacity-40"
            style={{ background: color }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
