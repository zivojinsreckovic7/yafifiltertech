import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

const prefixedLocales = locales.filter((locale) => locale !== defaultLocale);

function hasPrefix(pathname: string, prefix: string) {
  return pathname === `/${prefix}` || pathname.startsWith(`/${prefix}/`);
}

/**
 * Generated social images live inside `app/[lang]` so their copy can follow
 * the page language. That makes `/sr/opengraph-image` a real address that
 * must not be redirected off its prefix — Next puts it in every Serbian
 * page's `og:image` — while an unprefixed `/opengraph-image` rewrites onto it
 * like any other Serbian path.
 */
function isLocalizedMetadataRoute(pathname: string) {
  return /\/(opengraph-image|twitter-image)$/.test(pathname);
}

/**
 * Serbian is the primary language, so it has no URL prefix: `/proizvodi` is
 * rewritten onto the `app/[lang]` tree as `/sr/proizvodi` without the visitor
 * ever seeing it. Other locales keep their prefix (`/en/proizvodi`).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // `/sr/...` is an internal path only — redirect so there is one canonical
  // URL. Per-locale social images are the exception (`isLocalizedMetadataRoute`).
  if (hasPrefix(pathname, defaultLocale)) {
    if (isLocalizedMetadataRoute(pathname)) {
      return NextResponse.next();
    }
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
  // Skip Next internals, root-level generated metadata routes and anything
  // with a file extension — those must not be pushed onto a locale segment.
  // (Social images are per-locale and handled in `proxy` above.)
  matcher: [
    "/((?!_next/|icon|apple-icon|manifest|sitemap|robots|.*\\.).*)",
  ],
};
