/**
 * Locale setup. Serbian is the primary language and lives at the root
 * (`/proizvodi`); every other locale is served from a prefixed path
 * (`/en/proizvodi`). `src/proxy.ts` rewrites unprefixed requests onto the
 * `sr` segment so the prefix never shows up in the URL bar.
 */

export const locales = ["sr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "sr";

/** Each language written in its own language — never translated. */
export const localeNames: Record<Locale, string> = {
  sr: "Srpski",
  en: "English",
};

/** Compact form for the nav trigger. */
export const localeCodes: Record<Locale, string> = {
  sr: "SR",
  en: "EN",
};

/** BCP 47 tags for `<html lang>`, `toLocaleString` and hreflang. */
export const localeTags: Record<Locale, string> = {
  sr: "sr-RS",
  en: "en",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Narrows the `[lang]` route param. The proxy only ever routes known locales
 * into `app/[lang]`, so the fallback is defensive.
 */
export function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

/**
 * Turns a locale-agnostic path (`/proizvodi`, `/#o-nama`) into the real href
 * for `locale`. Hashes survive the prefixing: `/#o-nama` → `/en#o-nama`.
 */
export function localePath(locale: Locale, path: string): string {
  const hashAt = path.indexOf("#");
  const pathname = hashAt === -1 ? path : path.slice(0, hashAt);
  const hash = hashAt === -1 ? "" : path.slice(hashAt);
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  const base = `${prefix}${pathname === "/" ? "" : pathname}`;
  return `${base || "/"}${hash}`;
}

/**
 * Inverse of `localePath` for pathnames only. Tolerates both the public
 * Serbian form (`/proizvodi`) and the internal rewritten one (`/sr/proizvodi`)
 * so the language switcher renders the same href on server and client.
 */
export function stripLocale(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}
