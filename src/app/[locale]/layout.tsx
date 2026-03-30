import Link from "next/link";
import { notFound } from "next/navigation";
import { locales, hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/ChatWidget";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return {
    title: {
      default:
        locale === "zh"
          ? "JY顾问 | AI驱动的商业咨询"
          : "JY Consultant | AI-Powered Business Consulting",
      template:
        locale === "zh" ? "%s | JY顾问" : "%s | JY Consultant",
    },
    description: dict.home.heroSubtitle,
    alternates: {
      languages: {
        en: "/en",
        zh: "/zh",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  const l = locale as Locale;

  return (
    <>
      <Navbar locale={l} dict={dict} />
      {children}
      <ChatWidget />
      <footer className="border-t border-card-border px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted">{dict.footer.copyright}</p>
          <div className="flex items-center gap-6 text-sm text-muted">
            <Link
              href={`/${l}/terms`}
              className="transition hover:text-foreground"
            >
              {dict.footer.terms}
            </Link>
            <Link
              href={`/${l}/privacy`}
              className="transition hover:text-foreground"
            >
              {dict.footer.privacy}
            </Link>
            <a
              href="mailto:contact@jytech.us"
              className="transition hover:text-foreground"
            >
              {dict.footer.contact}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
