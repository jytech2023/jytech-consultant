import { NextResponse } from "next/server";

function mask(val: string | undefined): string {
  if (!val) return "❌ NOT SET";
  if (val.length <= 8) return `✅ (${val.length} chars)`;
  return `✅ ${val.slice(0, 4)}...${val.slice(-4)} (${val.length} chars)`;
}

// GET /api/debug-auth — temporary debug endpoint to diagnose Auth0 issues
export async function GET() {
  // 1. Check env vars
  const envCheck = {
    AUTH0_DOMAIN: mask(process.env.AUTH0_DOMAIN),
    AUTH0_CLIENT_ID: mask(process.env.AUTH0_CLIENT_ID),
    AUTH0_CLIENT_SECRET: mask(process.env.AUTH0_CLIENT_SECRET),
    AUTH0_SECRET: mask(process.env.AUTH0_SECRET),
    APP_BASE_URL: process.env.APP_BASE_URL ?? "❌ NOT SET",
  };

  // 2. Test Auth0 OIDC discovery
  let oidcStatus = "❌ FAILED";
  let oidcIssuer = "";
  try {
    const res = await fetch(
      `https://${process.env.AUTH0_DOMAIN}/.well-known/openid-configuration`,
      { cache: "no-store" }
    );
    if (res.ok) {
      const data = await res.json();
      oidcStatus = `✅ ${res.status}`;
      oidcIssuer = data.issuer ?? "";
    } else {
      oidcStatus = `❌ HTTP ${res.status}`;
    }
  } catch (e) {
    oidcStatus = `❌ ${e instanceof Error ? e.message : "Unknown error"}`;
  }

  // 3. Verify callback URL construction
  const callbackUrl = process.env.APP_BASE_URL
    ? `${process.env.APP_BASE_URL}/auth/callback`
    : "❌ Cannot construct (APP_BASE_URL missing)";

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    env: envCheck,
    oidc: {
      status: oidcStatus,
      issuer: oidcIssuer,
      discoveryUrl: `https://${process.env.AUTH0_DOMAIN ?? "?"}/.well-known/openid-configuration`,
    },
    callbackUrl,
    runtime: process.env.VERCEL ? "vercel" : "local",
    region: process.env.VERCEL_REGION ?? "unknown",
  });
}
