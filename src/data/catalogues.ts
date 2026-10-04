import { localeTags, type Locale } from "@/i18n/config";

/**
 * The YAFI catalogues. Every catalogue exists once per language and each
 * locale's page lists only its own edition — nine Serbian documents on
 * `/katalozi`, nine English ones on `/en/katalozi`.
 *
 * Files on disk:
 * - PDFs: `public/documents/katalozi/<locale>/`
 * - page renders: `public/katalozi/<locale>/<slug>/` (`cover`, `page` — the
 *   first product sheet — and for the full catalogue `contents`, `opener`)
 * - section opener photos, shared by both languages (no text on them):
 *   `public/katalozi/fotografije/<slug>.webp`
 *
 * Page counts and byte sizes are written out rather than read at build time;
 * update them when a PDF is replaced.
 */

type Edition = {
  title: string;
  /** Path under `public/`. */
  href: string;
  pages: number;
  bytes: number;
};

type SectionEntry = {
  /** Product category slug — also names the preview folder and photo. */
  slug: string;
  /** Printed page the section opens on in the full catalogue. */
  startPage: number;
  editions: Record<Locale, Edition>;
};

const sections: SectionEntry[] = [
  {
    slug: "filter-materijali",
    startPage: 7,
    editions: {
      sr: { title: "Filterski materijali", href: "/documents/katalozi/sr/yafi-filterski-materijali.pdf", pages: 13, bytes: 221195 },
      en: { title: "Filter materials", href: "/documents/katalozi/en/yafi-filter-materials.pdf", pages: 13, bytes: 527388 },
    },
  },
  {
    slug: "kasetni-filteri",
    startPage: 21,
    editions: {
      sr: { title: "Kasetni filteri", href: "/documents/katalozi/sr/yafi-kasetni-filteri.pdf", pages: 11, bytes: 636426 },
      en: { title: "Cassette filters", href: "/documents/katalozi/en/yafi-cassette-filters.pdf", pages: 11, bytes: 596637 },
    },
  },
  {
    slug: "panelni-filteri",
    startPage: 33,
    editions: {
      sr: { title: "Panelni filteri", href: "/documents/katalozi/sr/yafi-panelni-filteri.pdf", pages: 15, bytes: 247036 },
      en: { title: "Panel filters", href: "/documents/katalozi/en/yafi-panel-filters.pdf", pages: 15, bytes: 783376 },
    },
  },
  {
    slug: "vrecasti-filteri",
    startPage: 49,
    editions: {
      sr: { title: "Vrećasti filteri", href: "/documents/katalozi/sr/yafi-vrecasti-filteri.pdf", pages: 11, bytes: 588641 },
      en: { title: "Bag filters", href: "/documents/katalozi/en/yafi-bag-filters.pdf", pages: 11, bytes: 546378 },
    },
  },
  {
    slug: "rigidni-v-filteri",
    startPage: 61,
    editions: {
      sr: { title: "Rigidni filteri", href: "/documents/katalozi/sr/yafi-rigidni-filteri.pdf", pages: 23, bytes: 355750 },
      en: { title: "Rigid filters", href: "/documents/katalozi/en/yafi-rigid-filters.pdf", pages: 23, bytes: 1014648 },
    },
  },
  {
    slug: "hepa-ulpa-filteri",
    startPage: 85,
    editions: {
      sr: { title: "HEPA filteri", href: "/documents/katalozi/sr/yafi-hepa-filteri.pdf", pages: 63, bytes: 865578 },
      en: { title: "HEPA filters", href: "/documents/katalozi/en/yafi-hepa-filters.pdf", pages: 63, bytes: 2818558 },
    },
  },
  {
    slug: "filteri-mirisi-masnoce",
    startPage: 149,
    editions: {
      sr: { title: "Filteri za mirise i masne pare", href: "/documents/katalozi/sr/yafi-filteri-za-mirise-i-masne-pare.pdf", pages: 11, bytes: 213891 },
      en: { title: "Odour and fatty vapour filters", href: "/documents/katalozi/en/yafi-odour-and-fatty-vapour-filters.pdf", pages: 11, bytes: 506599 },
    },
  },
  {
    slug: "ramovi-za-filtere",
    startPage: 161,
    editions: {
      sr: { title: "Ramovi za filtere", href: "/documents/katalozi/sr/yafi-ramovi-za-filtere.pdf", pages: 3, bytes: 85685 },
      en: { title: "Filter frames", href: "/documents/katalozi/en/yafi-filter-frames.pdf", pages: 3, bytes: 148445 },
    },
  },
];

const full = {
  slug: "katalog-proizvoda",
  editions: {
    sr: { title: "Katalog proizvoda", href: "/documents/katalozi/sr/yafi-katalog-proizvoda.pdf", pages: 165, bytes: 2813063 },
    en: { title: "Product catalogue", href: "/documents/katalozi/en/yafi-product-catalogue.pdf", pages: 163, bytes: 11827420 },
  } satisfies Record<Locale, Edition>,
  /**
   * PDF page index minus printed page number. The English edition has no
   * blank second page, so printed page 21 is the PDF's page 20.
   */
  pageOffset: { sr: 0, en: -1 } satisfies Record<Locale, number>,
};

/** One category catalogue, resolved to a locale. */
export type SectionCatalogue = Edition & {
  slug: string;
  startPage: number;
  cover: string;
  /** The first product sheet — the page that shows what is inside. */
  page: string;
  photo: string;
};

export function getSectionCatalogues(locale: Locale): SectionCatalogue[] {
  return sections.map(({ slug, startPage, editions }) => ({
    ...editions[locale],
    slug,
    startPage,
    cover: `/katalozi/${locale}/${slug}/cover.webp`,
    page: `/katalozi/${locale}/${slug}/page.webp`,
    photo: `/katalozi/fotografije/${slug}.webp`,
  }));
}

export function getFullCatalogue(locale: Locale) {
  const edition = full.editions[locale];
  const base = `/katalozi/${locale}/${full.slug}`;
  return {
    ...edition,
    slug: full.slug,
    cover: `${base}/cover.webp`,
    contentsPage: `${base}/contents.webp`,
    opener: `${base}/opener.webp`,
    /** Deep link that opens the PDF on the printed page given. */
    pageHref: (printed: number) =>
      `${edition.href}#page=${printed + full.pageOffset[locale]}`,
  };
}

/** "216 KB" / "2,7 MB" — binary units, matching what file managers show. */
export function formatFileSize(bytes: number, locale: Locale): string {
  const kib = bytes / 1024;
  if (kib < 1024) return `${Math.round(kib)} KB`;
  const mib = new Intl.NumberFormat(localeTags[locale], {
    maximumFractionDigits: 1,
  }).format(kib / 1024);
  return `${mib} MB`;
}
