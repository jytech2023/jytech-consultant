import { notFound } from "next/navigation";
import { locales, hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import Navbar from "@/components/Navbar";

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
    title:
      locale === "zh"
        ? "AI商业顾问 | 各行业智能解决方案"
        : "AI Business Consultant | Smart Solutions for Every Industry",
    description: dict.home.heroSubtitle,
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

  return (
    <>
      <Navbar locale={locale as Locale} dict={dict} />
      {children}
    </>
  );
}
