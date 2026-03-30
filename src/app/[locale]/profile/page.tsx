import { notFound, redirect } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { auth0 } from "@/lib/auth0";
import ProfileForm from "@/components/ProfileForm";
import LinkedInImport from "@/components/LinkedInImport";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "zh" ? "个人资料" : "Profile",
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const session = await auth0.getSession();
  if (!session) redirect(`/auth/login?returnTo=/${locale}/profile`);

  const dict = await getDictionary(locale as Locale);
  const l = locale as Locale;

  return (
    <div className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight">
          {dict.profile.title}
        </h1>

        {/* User info */}
        <div className="mt-8 flex items-center gap-4 rounded-xl border border-card-border bg-card-bg p-6">
          {session.user.picture ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={session.user.picture}
              alt=""
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent/10 text-lg font-bold text-accent">
              {(session.user.name ?? session.user.email ?? "?").charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-semibold">{session.user.name}</p>
            <p className="text-sm text-muted">{session.user.email}</p>
          </div>
        </div>

        {/* Settings form (client component) */}
        <ProfileForm locale={l} dict={dict} />

        {/* LinkedIn Import */}
        <div className="mt-8">
          <LinkedInImport locale={l} />
        </div>
      </section>
    </div>
  );
}
