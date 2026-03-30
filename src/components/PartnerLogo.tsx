"use client";

import { useState, useRef } from "react";

export default function PartnerLogo({
  domain,
  name,
}: {
  domain: string;
  name: string;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  if (failed) {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-card-border text-[10px] font-bold text-muted">
        {name.charAt(0)}
      </span>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      ref={imgRef}
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt={name}
      width={24}
      height={24}
      className="rounded-sm"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      onLoad={() => {
        // Google returns a tiny default globe icon (≤ 200 bytes) for unknown domains
        const img = imgRef.current;
        if (img && img.naturalWidth <= 1) setFailed(true);
      }}
    />
  );
}
