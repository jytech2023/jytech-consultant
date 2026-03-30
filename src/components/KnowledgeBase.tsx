"use client";

import { useState, useEffect, useCallback } from "react";
import type { Locale } from "@/lib/i18n";

interface Document {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  parseStatus: string;
  keySource: string;
  createdAt: string;
}

export default function KnowledgeBase({ locale }: { locale: Locale }) {
  const [docs, setDocs] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const isZh = locale === "zh";

  const loadDocs = useCallback(() => {
    fetch("/api/documents")
      .then((r) => r.json())
      .then((data) => setDocs(data.documents ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadDocs();
  }, [loadDocs]);

  // Poll for processing docs
  useEffect(() => {
    const processing = docs.some((d) => d.parseStatus === "processing");
    if (!processing) return;
    const interval = setInterval(loadDocs, 3000);
    return () => clearInterval(interval);
  }, [docs, loadDocs]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      await fetch("/api/documents", { method: "POST", body: formData }).catch(
        () => {}
      );
    }
    setUploading(false);
    loadDocs();
    e.target.value = "";
  }

  async function handleDelete(id: string) {
    await fetch(`/api/documents?id=${id}`, { method: "DELETE" });
    setDocs((prev) => prev.filter((d) => d.id !== id));
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  const statusLabel: Record<string, { text: string; color: string }> = {
    pending: {
      text: isZh ? "等待中" : "Pending",
      color: "bg-yellow-400/10 text-yellow-400",
    },
    processing: {
      text: isZh ? "解析中..." : "Processing...",
      color: "bg-blue-400/10 text-blue-400",
    },
    success: {
      text: isZh ? "就绪" : "Ready",
      color: "bg-emerald-400/10 text-emerald-400",
    },
    error: {
      text: isZh ? "失败" : "Failed",
      color: "bg-red-400/10 text-red-400",
    },
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isZh ? "知识库" : "Knowledge Base"}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {isZh
              ? "上传文档，AI 顾问将在咨询中参考您的资料"
              : "Upload documents — the AI consultant will reference them in your sessions"}
          </p>
        </div>
        <label
          className={`shrink-0 cursor-pointer rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent/80 ${uploading ? "opacity-50 pointer-events-none" : ""}`}
        >
          {uploading
            ? isZh
              ? "上传中..."
              : "Uploading..."
            : isZh
              ? "上传文档"
              : "Upload"}
          <input
            type="file"
            multiple
            accept=".pdf,.txt,.md,.docx,.csv,.html,.json"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      <p className="mt-1 text-xs text-muted">
        {isZh
          ? "支持 PDF、TXT、Markdown、DOCX、CSV、HTML、JSON"
          : "Supports PDF, TXT, Markdown, DOCX, CSV, HTML, JSON"}
      </p>

      {/* Document list */}
      <div className="mt-8 space-y-3">
        {loading ? (
          <p className="text-sm text-muted animate-pulse">
            {isZh ? "加载中..." : "Loading..."}
          </p>
        ) : docs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-card-border p-12 text-center">
            <p className="text-lg text-muted">📄</p>
            <p className="mt-2 text-sm text-muted">
              {isZh
                ? "还没有文档。上传文档后，AI 顾问将能够参考您的资料。"
                : "No documents yet. Upload files to give the AI consultant context about your business."}
            </p>
          </div>
        ) : (
          docs.map((doc) => {
            const s = statusLabel[doc.parseStatus] ?? statusLabel.pending;
            return (
              <div
                key={doc.id}
                className="flex items-center gap-4 rounded-xl border border-card-border bg-card-bg p-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">{doc.fileName}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted">
                    <span>{formatSize(doc.fileSize)}</span>
                    <span>·</span>
                    <span
                      className={`rounded-full px-2 py-0.5 ${s.color}`}
                    >
                      {s.text}
                    </span>
                    <span>·</span>
                    <span>
                      {doc.keySource === "byok"
                        ? isZh
                          ? "自有 Key"
                          : "Your key"
                        : isZh
                          ? "系统 Key"
                          : "System key"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="shrink-0 rounded p-1.5 text-muted transition hover:bg-red-400/10 hover:text-red-400"
                  title={isZh ? "删除" : "Delete"}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M8 6V4h8v2" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  </svg>
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
