import type { Locale } from "@/i18n/config";

/*
 * Tile photography is Unsplash, free licence, no attribution required
 * (unsplash.com/license). Photo ids, in case one needs replacing:
 * bolnice Pk-KuizxQv8 · hoteli kfnWOD1Tbp8 · trzni-centri NSt9M4XPC7E ·
 * aerodromi SPovH_Hsi-U · skole Qw6wa96IvvQ · laboratorije 8yS04veb1TQ ·
 * data-centri VHmBX7FnXw0 · industrija pWUyHVJgLhg · farmacija 6RyofJC3sUw ·
 * muzeji hqOmsTeGazU · restorani nulJA9vxJII · poslovni-objekti 3dil0Olji38
 */

export type Facility = {
  slug: string;
  name: string;
  /** Tile artwork under `public/` — shared by both locales. */
  image: string;
};

/** The building types the filters go into, in the order the client listed. */
const facilities = [
  { slug: "bolnice", sr: "Bolnice", en: "Hospitals" },
  { slug: "hoteli", sr: "Hoteli", en: "Hotels" },
  { slug: "trzni-centri", sr: "Tržni centri", en: "Shopping centres" },
  { slug: "aerodromi", sr: "Aerodromi", en: "Airports" },
  { slug: "skole", sr: "Škole", en: "Schools" },
  { slug: "laboratorije", sr: "Laboratorije", en: "Laboratories" },
  { slug: "data-centri", sr: "Data centri", en: "Data centres" },
  { slug: "industrija", sr: "Industrija", en: "Industry" },
  { slug: "farmacija", sr: "Farmacija", en: "Pharmaceuticals" },
  { slug: "muzeji", sr: "Muzeji", en: "Museums" },
  { slug: "restorani", sr: "Restorani", en: "Restaurants" },
  { slug: "poslovni-objekti", sr: "Poslovni objekti", en: "Office buildings" },
] as const;

export function getFacilities(locale: Locale): Facility[] {
  return facilities.map((f) => ({
    slug: f.slug,
    name: f[locale],
    image: `/industrije/objekti/${f.slug}.webp`,
  }));
}
