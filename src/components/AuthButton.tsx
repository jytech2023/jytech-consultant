"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { locales, type Locale } from "@/lib/i18n";

function getInitials(name?: string | null, email?: string | null) {
  return (name ?? email ?? "?")
    .split(/[\s@]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0].toUpperCase())
    .join("");
}

function Avatar({ src, name, email }: { src?: string | null; name?: string | null; email?: string | null }) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={src}
        alt=""
        width={20}
        height={20}
        className="rounded-full"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
      {getInitials(name, email)}
    </span>
  );
}

export default function AuthButton() {
  const { user, isLoading } = useUser();
  const pathname = usePathname();

  // Extract locale from pathname
  const segments = pathname.split("/");
  const locale: Locale = locales.includes(segments[1] as Locale)
    ? (segments[1] as Locale)
    : "en";

  if (isLoading) {
    return <span className="text-xs text-muted animate-pulse">...</span>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href={`/${locale}/profile`}
          className="flex items-center gap-2 text-xs text-muted transition hover:text-foreground"
        >
          <Avatar src={user.picture} name={user.name} email={user.email} />
          <span className="truncate max-w-[100px]">
            {user.name ?? user.email}
          </span>
        </Link>
        <a
          href="/auth/logout"
          className="rounded-md border border-card-border px-3 py-1 text-xs text-muted transition hover:border-accent/40 hover:text-foreground"
        >
          {locale === "zh" ? "退出" : "Logout"}
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href="/auth/login"
        className="rounded-md border border-card-border px-3 py-1 text-xs text-muted transition hover:border-accent/40 hover:text-foreground"
      >
        {locale === "zh" ? "登录" : "Login"}
      </a>
      <a
        href="/auth/login?screen_hint=signup"
        className="rounded-md bg-accent px-3 py-1 text-xs text-white transition hover:bg-accent/80"
      >
        {locale === "zh" ? "注册" : "Sign Up"}
      </a>
    </div>
  );
}
