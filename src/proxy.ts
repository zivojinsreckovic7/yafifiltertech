import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

const prefixedLocales = locales.filter((locale) => locale !== defaultLocale);

function hasPrefix(pathname: string, prefix: string) {
  return pathname === `/${prefix}` || pathname.startsWith(`/${prefix}/`);
}

/**
 * Serbian is the primary language, so it has no URL prefix: `/proizvodi` is
 * rewritten onto the `app/[lang]` tree as `/sr/proizvodi` without the visitor
 * ever seeing it. Other locales keep their prefix (`/en/proizvodi`).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // `/sr/...` is an internal path only — redirect so there is one canonical URL.
  if (hasPrefix(pathname, defaultLocale)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (prefixedLocales.some((locale) => hasPrefix(pathname, locale))) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, generated metadata routes and anything with a file
  // extension — those must not be pushed onto a locale segment.
  matcher: [
    "/((?!_next/|icon|apple-icon|opengraph-image|twitter-image|manifest|sitemap|robots|.*\\.).*)",
  ],
};
