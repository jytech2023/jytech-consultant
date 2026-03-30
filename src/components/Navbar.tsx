import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import AuthButton from "./AuthButton";

export default function Navbar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <nav className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="text-lg font-bold tracking-tight">
            AI <span className="text-accent-light">Consultant</span>
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-muted">
          <Link
            href={`/${locale}`}
            className="transition hover:text-foreground"
          >
            {dict.nav.industries}
          </Link>
          <Link
            href={`/${locale}/studies`}
            className="transition hover:text-foreground"
          >
            {dict.nav.caseStudies}
          </Link>
          <Link
            href={`/${locale}/pricing`}
            className="transition hover:text-foreground"
          >
            {dict.nav.pricing}
          </Link>
          <Link
            href={`/${locale}/knowledge`}
            className="transition hover:text-foreground"
          >
            {dict.nav.knowledge}
          </Link>
          <Link
            href={`/${locale}/join`}
            className="rounded-md bg-accent/10 px-3 py-1 text-accent-light transition hover:bg-accent/20"
          >
            {dict.nav.join}
          </Link>
          <LanguageSwitcher locale={locale} />
          <ThemeToggle />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
