"use client";

import { useState, useRef } from "react";

interface Connection {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  position: string;
  connectedOn: string;
}

export default function LinkedInImport({ locale }: { locale: string }) {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [invited, setInvited] = useState<Set<string>>(new Set());
  const fileRef = useRef<HTMLInputElement>(null);
  const isZh = locale === "zh";

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "connections");

      const res = await fetch("/api/linkedin-import", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.connections) {
        setConnections(data.connections);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  function handleInvite(email: string, name: string) {
    // For now, just mark as invited — could send email invite in the future
    setInvited((prev) => new Set(prev).add(email));
    // Copy invite link to clipboard
    const inviteUrl = `${window.location.origin}/${locale}/join`;
    navigator.clipboard.writeText(
      isZh
        ? `${name}，邀请你加入 JY Consulting —— Human + AI 商业咨询平台，让你的知识变现！注册链接：${inviteUrl}`
        : `${name}, you're invited to join JY Consulting — a Human + AI business consulting platform. Monetize your expertise! ${inviteUrl}`
    );
  }

  const filtered = filter
    ? connections.filter(
        (c) =>
          `${c.firstName} ${c.lastName} ${c.company} ${c.position}`
            .toLowerCase()
            .includes(filter.toLowerCase())
      )
    : connections;

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-6">
      <h2 className="font-semibold">
        {isZh ? "导入 LinkedIn 联系人" : "Import LinkedIn Connections"}
      </h2>
      <p className="mt-1 text-sm text-muted">
        {isZh
          ? "从 LinkedIn 数据导出中导入你的联系人，邀请他们成为平台顾问。"
          : "Import your connections from LinkedIn data export and invite them to become platform consultants."}
      </p>
      <div className="mt-2 flex items-center gap-2 rounded-lg bg-emerald-400/10 px-3 py-2">
        <span className="text-sm">💰</span>
        <p className="text-xs text-emerald-400">
          {isZh
            ? "导入联系人后，你推荐的人每笔咨询交易，你将获得 5% 的佣金分成"
            : "After importing, you earn 5% commission on every consultation booked by people you refer"}
        </p>
      </div>

      {/* Instructions */}
      <div className="mt-4 rounded-lg border border-card-border bg-background p-4">
        <p className="text-sm font-medium">
          {isZh ? "如何获取数据：" : "How to get your data:"}
        </p>
        <ol className="mt-2 space-y-1 text-sm text-muted">
          <li>
            1.{" "}
            <a
              href="https://www.linkedin.com/mypreferences/d/download-my-data"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-light underline"
            >
              {isZh
                ? "访问 LinkedIn 数据下载页面"
                : "Visit LinkedIn Data Download page"}
            </a>
          </li>
          <li>
            2.{" "}
            {isZh
              ? "选择 \"Want something in particular?\"，勾选 \"Connections\""
              : "Select \"Want something in particular?\", check \"Connections\""}
          </li>
          <li>
            3.{" "}
            {isZh
              ? "点击 \"Request archive\"，等待 LinkedIn 发送邮件"
              : "Click \"Request archive\", wait for LinkedIn email"}
          </li>
          <li>
            4.{" "}
            {isZh
              ? "下载并解压 zip，上传 Connections.csv 文件"
              : "Download & unzip, then upload the Connections.csv file"}
          </li>
        </ol>
      </div>

      {/* Upload */}
      <div className="mt-4">
        <input
          ref={fileRef}
          type="file"
          accept=".csv"
          onChange={handleUpload}
          className="hidden"
        />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={loading}
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent/80 disabled:opacity-50"
        >
          {loading
            ? "..."
            : isZh
              ? "上传 Connections.csv"
              : "Upload Connections.csv"}
        </button>
      </div>

      {/* Results */}
      {connections.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted">
              {isZh
                ? `共 ${connections.length} 位联系人`
                : `${connections.length} connections found`}
            </p>
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder={isZh ? "搜索姓名、公司、职位..." : "Search name, company, title..."}
              className="w-64 rounded-lg border border-card-border bg-background px-3 py-1.5 text-sm outline-none transition focus:border-accent/60"
            />
          </div>

          <div className="mt-4 max-h-96 overflow-y-auto rounded-lg border border-card-border">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card-bg text-left">
                <tr className="border-b border-card-border">
                  <th className="px-3 py-2 font-medium">{isZh ? "姓名" : "Name"}</th>
                  <th className="px-3 py-2 font-medium">{isZh ? "公司" : "Company"}</th>
                  <th className="px-3 py-2 font-medium">{isZh ? "职位" : "Position"}</th>
                  <th className="px-3 py-2 font-medium text-right">{isZh ? "操作" : "Action"}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 200).map((c, i) => (
                  <tr
                    key={`${c.firstName}-${c.lastName}-${i}`}
                    className="border-b border-card-border last:border-0"
                  >
                    <td className="px-3 py-2">
                      {c.firstName} {c.lastName}
                    </td>
                    <td className="px-3 py-2 text-muted">{c.company}</td>
                    <td className="px-3 py-2 text-muted">{c.position}</td>
                    <td className="px-3 py-2 text-right">
                      {invited.has(c.email || `${c.firstName}-${c.lastName}`) ? (
                        <span className="text-xs text-emerald-400">
                          {isZh ? "已复制邀请" : "Copied"}
                        </span>
                      ) : (
                        <button
                          onClick={() =>
                            handleInvite(
                              c.email || `${c.firstName}-${c.lastName}`,
                              `${c.firstName} ${c.lastName}`
                            )
                          }
                          className="rounded-md bg-accent/10 px-2.5 py-1 text-xs text-accent-light transition hover:bg-accent/20"
                        >
                          {isZh ? "邀请" : "Invite"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length > 200 && (
              <p className="px-3 py-2 text-center text-xs text-muted">
                {isZh
                  ? `显示前 200 条，共 ${filtered.length} 条`
                  : `Showing 200 of ${filtered.length}`}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
