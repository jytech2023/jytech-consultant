import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";
import { auth0 } from "@/lib/auth0";

export async function proxy(request: NextRequest) {
  // Let auth0 handle /auth/* routes
  const authResponse = await auth0.middleware(request);

  const { pathname } = request.nextUrl;

  // Let auth0 handle /auth/* routes
  if (pathname.startsWith("/auth/")) {
    return authResponse;
  }

  // Skip locale redirect for API routes
  if (pathname.startsWith("/api/")) {
    return authResponse;
  }

  // Check if the pathname already starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return authResponse;

  // Detect locale from Accept-Language header
  const acceptLang = request.headers.get("accept-language") ?? "";
  const preferred = acceptLang.includes("zh") ? "zh" : defaultLocale;

  // Redirect to locale-prefixed path
  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|icon.svg|avatar/|USProGlove_Market_Report).*)",
  ],
};
