import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";
import { auth0 } from "@/lib/auth0";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Auth0 routes — let the SDK handle login, callback, logout, etc.
  if (pathname.startsWith("/auth/")) {
    return auth0.middleware(request);
  }

  // API routes — run auth0 middleware for session cookie refresh
  if (pathname.startsWith("/api/")) {
    return auth0.middleware(request);
  }

  // For all other routes, handle locale redirect WITHOUT running auth0.middleware().
  // This avoids unnecessary session cookie writes on every page navigation
  // which can cause race conditions with the Auth0 transaction cookie,
  // leading to "state parameter is invalid" errors.

  // Check if the pathname already starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Run auth0 middleware to handle session refresh on locale-prefixed pages
    return auth0.middleware(request);
  }

  // No locale prefix — redirect to locale-prefixed path
  // Do NOT run auth0.middleware() here to avoid cookie interference
  const acceptLang = request.headers.get("accept-language") ?? "";
  const preferred = acceptLang.includes("zh") ? "zh" : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|icon.svg|avatar/|USProGlove_Market_Report).*)",
  ],
};
