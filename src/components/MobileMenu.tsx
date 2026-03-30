"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu({
  locale,
  links,
  joinLabel,
}: {
  locale: string;
  links: { href: string; label: string }[];
  joinLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — mobile only */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-card-border text-muted transition hover:text-foreground lg:hidden"
        aria-label="Menu"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="absolute left-0 right-0 top-16 z-50 border-b border-card-border bg-background/95 backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-card-bg hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/join`}
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg bg-accent/10 px-3 py-2.5 text-sm text-accent-light transition hover:bg-accent/20"
            >
              {joinLabel}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
