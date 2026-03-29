import Link from "next/link";
import { industries, consultingModules, careerPartners } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-card-border px-6 py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
            AI-Powered{" "}
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              Business Consulting
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Intelligent insights for customer discovery, competitor analysis,
            strategy planning, market intelligence, supply chain optimization,
            and career development — across every industry.
          </p>
        </div>
      </section>

      {/* Industries */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight">
          Select Your Industry
        </h2>
        <p className="mt-2 text-muted">
          Choose an industry to get tailored AI consulting insights
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industry/${industry.slug}`}
              className="group relative overflow-hidden rounded-xl border border-card-border bg-card-bg p-6 transition hover:border-accent/40 hover:bg-card-bg/80"
            >
              <div
                className="absolute right-0 top-0 h-24 w-24 -translate-y-6 translate-x-6 rounded-full opacity-20 blur-2xl transition group-hover:opacity-40"
                style={{ background: industry.color }}
              />
              <div className="text-4xl">{industry.icon}</div>
              <h3 className="mt-4 text-lg font-semibold">
                {industry.name}{" "}
                <span className="text-sm text-muted">{industry.nameZh}</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {industry.description}
              </p>
              <div
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium"
                style={{ color: industry.color }}
              >
                Explore
                <span className="transition group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Modules Overview */}
      <section className="border-t border-card-border bg-card-bg/50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold tracking-tight">
            Consulting Modules
          </h2>
          <p className="mt-2 text-muted">
            Full-spectrum AI consulting services available for every industry
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {consultingModules.map((mod) => (
              <div
                key={mod.slug}
                className="rounded-xl border border-card-border bg-background p-6"
              >
                <div className="text-3xl">{mod.icon}</div>
                <h3 className="mt-3 font-semibold">
                  {mod.name}{" "}
                  <span className="text-sm text-muted">{mod.nameZh}</span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {mod.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-t border-card-border px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-2xl font-bold tracking-tight">Partners</h2>
          <p className="mt-2 text-muted">
            We partner with leading companies to provide consulting services
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {careerPartners.map((partner) => (
              <a
                key={partner.name}
                href={`https://${partner.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-4 py-2 transition hover:border-accent/40"
                title={partner.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://www.google.com/s2/favicons?domain=${partner.domain}&sz=64`}
                  alt={partner.name}
                  width={24}
                  height={24}
                  className="rounded-sm"
                />
                <span className="text-sm font-medium text-muted">
                  {partner.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-card-border px-6 py-8 text-center text-sm text-muted">
        © 2026 JY Consultant Service. All rights reserved.
      </footer>
    </div>
  );
}
