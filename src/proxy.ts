import { locales, defaultLocale } from "@/lib/i18n";
import { auth0 } from "@/lib/auth0";

export async function proxy(request: Request) {
  const url = new URL(request.url);
  const { pathname } = url;

  // Auth0 routes — let the SDK handle login, callback, logout, etc.
  if (pathname.startsWith("/auth/")) {
    return auth0.middleware(request);
  }

  // API routes — run auth0 middleware for session cookie refresh
  if (pathname.startsWith("/api/")) {
    return auth0.middleware(request);
  }

  // Check if the pathname already starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return auth0.middleware(request);
  }

  // No locale prefix — redirect to locale-prefixed path
  const acceptLang = request.headers.get("accept-language") ?? "";
  const preferred = acceptLang.includes("zh") ? "zh" : defaultLocale;

  url.pathname = `/${preferred}${pathname}`;
  return Response.redirect(url.toString(), 307);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|icon.svg|avatar/|USProGlove_Market_Report).*)",
  ],
};
