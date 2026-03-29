import Link from "next/link";
import { caseStudies, getIndustry, getModule } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | AI Business Consultant",
  description:
    "In-depth market reports and industry analysis across medical, restaurant, and more.",
};

export default function StudiesPage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-card-border px-6 py-16 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Case Studies
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            In-depth market reports, competitive analyses, and strategic studies
            powered by AI consulting — across every industry we serve.
          </p>
        </div>
      </section>

      {/* Studies Grid */}
      <section className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => {
            const industry = getIndustry(study.industrySlug);
            const mod = getModule(study.moduleSlug);
            if (!industry) return null;
            return (
              <Link
                key={study.slug}
                href={`/industry/${industry.slug}/studies/${study.slug}`}
                className="group rounded-xl border border-card-border bg-card-bg p-6 transition hover:border-accent/40"
              >
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: study.heroColor }}
                  />
                  <span>
                    {industry.icon} {industry.name}
                  </span>
                  {mod && (
                    <>
                      <span>·</span>
                      <span>
                        {mod.icon} {mod.name}
                      </span>
                    </>
                  )}
                </div>
                <h2 className="mt-3 text-lg font-semibold leading-snug">
                  {study.title}
                </h2>
                <p className="mt-1 text-xs text-muted">{study.titleZh}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                  {study.subtitle}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span>{study.date}</span>
                    <span>· {study.readTime}</span>
                  </div>
                  <div
                    className="inline-flex items-center gap-1 text-sm font-medium"
                    style={{ color: industry.color }}
                  >
                    Read
                    <span className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
