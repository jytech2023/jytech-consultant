import Link from "next/link";
import { notFound } from "next/navigation";
import {
  industries,
  consultingModules,
  careerPartners,
  getIndustry,
  getModule,
} from "@/lib/data";
import ConsultingChat from "@/components/ConsultingChat";

export function generateStaticParams() {
  const params: { slug: string; module: string }[] = [];
  for (const i of industries) {
    for (const m of consultingModules) {
      params.push({ slug: i.slug, module: m.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; module: string }>;
}) {
  const { slug, module: modSlug } = await params;
  const industry = getIndustry(slug);
  const mod = getModule(modSlug);
  if (!industry || !mod) return {};
  return {
    title: `${mod.name} — ${industry.name} | AI Business Consultant`,
    description: `${mod.description} Tailored for the ${industry.name} industry.`,
  };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string; module: string }>;
}) {
  const { slug, module: modSlug } = await params;
  const industry = getIndustry(slug);
  const mod = getModule(modSlug);
  if (!industry || !mod) notFound();

  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <section className="border-b border-card-border px-6 py-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="transition hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/industry/${industry.slug}`}
              className="transition hover:text-foreground"
            >
              {industry.icon} {industry.name}
            </Link>
            <span>/</span>
            <span className="text-foreground">
              {mod.icon} {mod.name}
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold">
            {mod.icon} {mod.name}{" "}
            <span className="text-muted">for {industry.name}</span>
          </h1>
          <p className="mt-1 text-sm text-muted">{mod.description}</p>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-8 lg:flex-row">
        {/* Sidebar - Features */}
        <aside className="w-full shrink-0 lg:w-64">
          <div className="rounded-xl border border-card-border bg-card-bg p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Capabilities
            </h3>
            <ul className="mt-3 space-y-2">
              {mod.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5" style={{ color: industry.color }}>
                    ✦
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {modSlug === "career" && (
            <div className="mt-4 rounded-xl border border-card-border bg-card-bg p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                Partners
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {careerPartners.map((p) => (
                  <a
                    key={p.name}
                    href={`https://${p.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-md border border-card-border bg-background px-2 py-1 transition hover:border-accent/40"
                    title={p.name}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${p.domain}&sz=64`}
                      alt={p.name}
                      width={16}
                      height={16}
                      className="rounded-sm"
                    />
                    <span className="text-xs text-muted">{p.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Content - Chat Interface */}
        <div className="flex flex-1 flex-col">
          <ConsultingChat
            industryName={industry.name}
            industrySlug={industry.slug}
            moduleName={mod.name}
            moduleSlug={mod.slug}
            color={industry.color}
          />
        </div>
      </div>
    </div>
  );
}
