import { notFound, redirect } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n";
import { auth0 } from "@/lib/auth0";
import KnowledgeBase from "@/components/KnowledgeBase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "zh" ? "知识库" : "Knowledge Base",
  };
}

export default async function KnowledgePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const session = await auth0.getSession();
  if (!session) redirect(`/auth/login?returnTo=/${locale}/knowledge`);

  return (
    <div className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        <KnowledgeBase locale={locale as Locale} />
      </section>
    </div>
  );
}
