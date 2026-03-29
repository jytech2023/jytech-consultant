"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

const labels: Record<Locale, string> = { en: "EN", zh: "中文" };

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  function switchedPath(target: Locale) {
    // Replace /en/... or /zh/... with /target/...
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = target;
    }
    return segments.join("/") || `/${target}`;
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((l) => (
        <Link
          key={l}
          href={switchedPath(l)}
          className={`rounded px-2 py-0.5 transition ${
            l === locale
              ? "bg-accent/20 text-accent-light font-medium"
              : "text-muted hover:text-foreground"
          }`}
        >
          {labels[l]}
        </Link>
      ))}
    </div>
  );
}
