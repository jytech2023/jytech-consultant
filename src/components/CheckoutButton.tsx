"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { locales, type Locale } from "@/lib/i18n";

export default function CheckoutButton({
  plan,
  label,
  className,
}: {
  plan: string;
  label: string;
  className: string;
}) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const segments = pathname.split("/");
  const locale: Locale = locales.includes(segments[1] as Locale)
    ? (segments[1] as Locale)
    : "en";

  async function handleClick() {
    if (!user) {
      // Redirect to login first
      window.location.href = "/auth/login";
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, locale }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleClick} disabled={loading} className={className}>
      {loading ? "..." : label}
    </button>
  );
}
