import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import AuthButton from "./AuthButton";
import MobileMenu from "./MobileMenu";

export default function Navbar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const links = [
    { href: `/${locale}`, label: dict.nav.industries },
    { href: `/${locale}/studies`, label: dict.nav.caseStudies },
    { href: `/${locale}/pricing`, label: dict.nav.pricing },
    { href: `/${locale}/knowledge`, label: dict.nav.knowledge },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="text-lg font-bold tracking-tight">
            JY <span className="text-accent-light">Consulting</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 text-sm text-muted lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
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

        {/* Mobile nav */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher locale={locale} />
          <ThemeToggle />
          <MobileMenu
            locale={locale}
            links={links}
            joinLabel={dict.nav.join}
            authSlot={<AuthButton />}
          />
        </div>
      </div>
    </nav>
  );
}
