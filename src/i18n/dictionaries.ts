import type { Metadata } from "next";
import { defaultLocale, locales, localePath, localeTags, type Locale } from "./config";
import { sr, type Dictionary } from "./dictionaries/sr";
import { en } from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { sr, en };

/**
 * Server-side only — the dictionaries hold template functions, so they cannot
 * cross into Client Components. Pass plain strings down instead.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };

/**
 * `canonical` + `hreflang` for one page. Metadata is inherited per field, so
 * every page has to declare its own alternates — otherwise it would advertise
 * the layout's homepage URLs.
 */
export function alternatesFor(locale: Locale, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const candidate of locales) {
    languages[localeTags[candidate]] = localePath(candidate, path);
  }
  languages["x-default"] = localePath(defaultLocale, path);

  return { canonical: localePath(locale, path), languages };
}
