import type { Locale } from "@/i18n/config";

/**
 * One variant inside a category — a card on the category page and a detail
 * page of its own at `/proizvodi/<category>/<item>`.
 *
 * Everything below `image` is detail-page content and every field is optional:
 * a variant with nothing but a slug, name, label and image still renders a
 * complete page, falling back to its category's copy. Add fields here as the
 * catalogue grows rather than special-casing them in the page.
 */
/**
 * One block of the long-form description that runs below the two hero columns
 * on a variant page. Every field is optional and rendered in the order below,
 * so a block can be a heading with prose, a bare bullet list, a table on its
 * own, or any combination — the catalogue's blocks differ per product family.
 */
export type ProductSection = {
  heading?: string;
  /** Body copy — one string per paragraph. */
  body?: string[];
  /** Bulleted points listed under the body. */
  list?: string[];
  /**
   * Rows are rendered in order. A row shorter than the table is allowed: its
   * last cell spans the remaining columns, which is how the catalogue prints
   * a value that holds for every type in the range. An empty first cell
   * continues the row above it, the way the sheets read.
   */
  table?: { head?: string[]; rows: string[][] };
};

export type ProductItem = {
  /** Locale-independent. */
  slug: string;
  name: string;
  /** Media or type qualifier shown above the name. */
  label: string;
  /**
   * Optional family heading. When items carry groups the category page splits
   * them into labelled blocks instead of one long grid; keep the group strings
   * identical across the locale arrays for the same items.
   */
  group?: string;
  /**
   * Path under `public/`. Cut-outs with a transparent background sit best on
   * the dark surface; the card reserves the space until one is supplied.
   */
  image?: string;
  /** Catalogue product code, shown as meta under the lead. */
  sku?: string;
  /** Detail-page lead paragraph. Falls back to the category intro. */
  intro?: string;
  /** Short selling points listed under the lead. */
  highlights?: string[];
  /** Spec rows, rendered in the order given. */
  specs?: { label: string; value: string }[];
  /** Classification and certification chips. Falls back to the category's. */
  standards?: string[];
  /** Long-form description blocks below the hero columns. */
  sections?: ProductSection[];
};

export type ProductCategory = {
  /** Locale-independent — used for routes and industry cross-references. */
  slug: string;
  /** Short label for the nav dropdown, cards and footer. */
  name: string;
  /** Serbian accusative ("ponuda za filterske materijale"); English repeats `name`. */
  nameAcc: string;
  /** Category page heading, including the YAFI range code. Falls back to `name`. */
  title?: string;
  class: string;
  /**
   * Overview-card photo, path under `public/`. One representative variant
   * per range; the square white-background shots sit on a white plate, so a
   * card without one keeps the same footprint with a watermark instead.
   */
  image?: string;
  /** One-line copy for the overview card. */
  description: string;
  /** Category page lead paragraph. Falls back to `description`. */
  intro?: string;
  applications: string[];
  /** Classification and certification chips shown on the category page. */
  standards?: string[];
  keywords: string[];
  items?: ProductItem[];
};

/**
 * One size in a panel filter range listing. The figures are identical in both
 * locales — only the ISO wording and the decimal mark differ — so a range is
 * written once as tuples and localised by `panelTable`.
 */
type PanelRow = [
  code: string,
  dimensions: string,
  filterClass: string,
  /** ISO 16890 coarse percentage. */
  coarse: number,
  /** Media area in m². */
  area: number,
  /** Air flow as printed, sometimes "flow / pressure drop". */
  flow: string,
  /** Weight in kg. */
  weight: number,
];

/**
 * A block heading inside the listing. A bare string is printed as given
 * ("6-G3"); the object form appends the localised ISO wording, since the
 * cassette ranges label their bands "48-G4 · Grubost 65%".
 */
type PanelEntry = string | { band: string; coarse: number } | PanelRow;

const decimal = (locale: Locale, value: number) =>
  locale === "sr" ? String(value).replace(".", ",") : String(value);

/** The same for a decimal already embedded in a label, e.g. "ePM2.5 65%". */
const decimal2 = (locale: Locale, value: string) =>
  locale === "sr" ? value.replace(".", ",") : value;

function panelTable(locale: Locale, entries: PanelEntry[]) {
  const sr = locale === "sr";
  return {
    head: sr
      ? [
          "Oznaka proizvoda",
          "Dimenzija (W×H×D)",
          "Klasa EN 779",
          "ISO 16890",
          "Površina platna (m²)",
          "Protok vazduha (m³/h)",
          "Težina (kg)",
        ]
      : [
          "Product code",
          "Dimensions (W×H×D)",
          "Class EN 779",
          "ISO 16890",
          "Media area (m²)",
          "Air flow (m³/h)",
          "Weight (kg)",
        ],
    rows: entries.map((entry) => {
      const coarse = (value: number) =>
        `${sr ? "Grubost" : "Coarse"} ${value}%`;
      if (typeof entry === "string") return [entry];
      if (!Array.isArray(entry)) return [`${entry.band} · ${coarse(entry.coarse)}`];
      return [
        entry[0],
        entry[1],
        entry[2],
        coarse(entry[3]),
        decimal(locale, entry[4]),
        entry[5],
        decimal(locale, entry[6]),
      ];
    }),
  };
}

/**
 * One size in a bag filter listing. Same idea as `PanelRow`, plus the pocket
 * count. The ISO cell is either a coarse percentage — localised like the panel
 * ranges — or an ePM designation, which reads the same in both languages.
 */
type BagRow = [
  code: string,
  dimensions: string,
  pockets: number,
  filterClass: string,
  iso: number | string,
  area: number,
  flow: string,
  weight: number,
];

type BagEntry = string | { band: string; coarse: number } | BagRow;

function bagTable(locale: Locale, entries: BagEntry[]) {
  const sr = locale === "sr";
  const coarse = (value: number) => `${sr ? "Grub." : "Coarse"} ${value}%`;
  /** ePM2.5 is the only designation carrying a decimal mark. */
  const iso = (value: number | string) =>
    typeof value === "number" ? coarse(value) : decimal2(locale, value);

  return {
    head: sr
      ? [
          "Oznaka proizvoda",
          "Dimenzije (W×H×D)",
          "Vreće",
          "Klasa EN 779",
          "ISO 16890",
          "Površina platna (m²)",
          "Protok vazduha (m³/h)",
          "Težina (kg)",
        ]
      : [
          "Product code",
          "Dimensions (W×H×D)",
          "Pockets",
          "Class EN 779",
          "ISO 16890",
          "Media area (m²)",
          "Air flow (m³/h)",
          "Weight (kg)",
        ],
    rows: entries.map((entry) => {
      if (typeof entry === "string") return [entry];
      if (!Array.isArray(entry))
        return [`${entry.band} · ${sr ? "Grubost" : "Coarse"} ${entry.coarse}%`];
      return [
        entry[0],
        entry[1],
        String(entry[2]),
        entry[3],
        iso(entry[4]),
        decimal(locale, entry[5]),
        entry[6],
        decimal(locale, entry[7]),
      ];
    }),
  };
}

/** Filteri za visoke temperature – YAFI PF. */
const highTempRows: PanelEntry[] = [
  ["YAFI PF-240/480/14", "240 × 480 × 14", "G4", 65, 0.11, "420 / 60", 0.4],
  ["YAFI PF-480/480/14", "480 × 480 × 15", "G4", 65, 0.23, "840 / 60", 0.8],
  ["YAFI PF-610/610/14", "610 × 610 × 16", "G4", 65, 0.37, "1340 / 60", 0.9],
];

/** Predfilter metalnog okvira i ravne površine – YAFI PF. */
const flatMetalRows: PanelEntry[] = [
  "6-G3",
  ["YAFI PF-205/400/6-G3", "205 × 400 × 6", "G3", 50, 0.08, "720 / 35", 0.4],
  ["YAFI PF-205/650/6-G3", "205 × 650 × 6", "G3", 50, 0.13, "1200 / 35", 0.5],
  ["YAFI PF-205/800/6-G3", "205 × 800 × 6", "G3", 50, 0.16, "1450 / 35", 0.65],
  ["YAFI PF-205/900/6-G3", "205 × 900 × 6", "G3", 50, 0.18, "1650 / 35", 0.8],
  ["YAFI PF-395/495/6-G3", "395 × 495 × 6", "G3", 50, 0.2, "1800 / 35", 0.9],
  ["YAFI PF-395/620/6-G3", "395 × 620 × 6", "G3", 50, 0.24, "2160 / 35", 1],
  ["YAFI PF-495/595/6-G3", "495 × 595 × 6", "G3", 50, 0.29, "2650 / 35", 1],
  "8-G3",
  ["YAFI PF-205/400/8-G3", "205 × 400 × 8", "G3", 50, 0.08, "720 / 40", 0.4],
  ["YAFI PF-205/650/8-G3", "205 × 650 × 8", "G3", 50, 0.13, "1200 / 40", 0.5],
  ["YAFI PF-205/800/8-G3", "205 × 800 × 8", "G3", 50, 0.16, "1450 / 40", 0.65],
  ["YAFI PF-205/900/8-G3", "205 × 900 × 8", "G3", 50, 0.18, "1650 / 40", 0.8],
  ["YAFI PF-395/495/8-G3", "395 × 495 × 8", "G3", 50, 0.2, "1800 / 40", 0.9],
  ["YAFI PF-395/620/8-G3", "395 × 620 × 8", "G3", 50, 0.24, "2160 / 40", 1],
  ["YAFI PF-495/595/8-G3", "495 × 595 × 8", "G3", 50, 0.29, "2650 / 40", 1],
  "10-G3",
  ["YAFI PF-105/400/10-G3", "105 × 400 × 10", "G3", 50, 0.08, "720 / 40", 0.4],
  ["YAFI PF-105/650/10-G3", "105 × 650 × 10", "G3", 50, 0.13, "1200 / 40", 0.5],
  ["YAFI PF-105/800/10-G3", "105 × 800 × 10", "G3", 50, 0.16, "1450 / 40", 0.65],
  ["YAFI PF-105/900/10-G3", "105 × 900 × 10", "G3", 50, 0.18, "1650 / 40", 0.8],
  ["YAFI PF-395/495/10-G3", "395 × 495 × 10", "G3", 50, 0.2, "1800 / 40", 0.9],
  ["YAFI PF-395/610/10-G3", "395 × 610 × 10", "G3", 50, 0.24, "2160 / 40", 1],
  ["YAFI PF-495/595/10-G3", "495 × 595 × 10", "G3", 50, 0.29, "2650 / 40", 1],
];

/** Predfilter sa žičanim okvirom – YAFI PF. */
const wireFrameRows: PanelEntry[] = [
  "6-G3",
  ["YAFI PF-205/400/4-G3", "205 × 400 × 4", "G3", 50, 0.08, "720", 0.15],
  ["YAFI PF-205/650/4-G3", "205 × 650 × 4", "G3", 50, 0.13, "1200", 0.2],
  ["YAFI PF-205/800/4-G3", "205 × 800 × 4", "G3", 50, 0.16, "1450", 0.3],
  ["YAFI PF-205/900/4-G3", "205 × 900 × 4", "G3", 50, 0.18, "1650", 0.35],
  ["YAFI PF-395/495/4-G3", "395 × 495 × 4", "G3", 50, 0.2, "1800", 0.25],
  ["YAFI PF-395/620/4-G3", "395 × 620 × 4", "G3", 50, 0.24, "2160", 0.25],
  ["YAFI PF-495/595/4-G3", "495 × 595 × 4", "G3", 50, 0.29, "2650", 0.3],
  "8-G3",
  ["YAFI PF-205/400/6-G3", "205 × 400 × 6", "G3", 50, 0.08, "720", 0.15],
  ["YAFI PF-205/650/6-G3", "205 × 650 × 6", "G3", 50, 0.13, "1200", 0.2],
  ["YAFI PF-205/800/6-G3", "205 × 800 × 6", "G3", 50, 0.16, "1450", 0.3],
  ["YAFI PF-205/900/6-G3", "205 × 900 × 6", "G3", 50, 0.18, "1650", 0.35],
  ["YAFI PF-395/495/6-G3", "395 × 495 × 6", "G3", 50, 0.2, "1800", 0.25],
  ["YAFI PF-395/620/6-G3", "395 × 620 × 6", "G3", 50, 0.24, "2160", 0.25],
  ["YAFI PF-495/595/6-G3", "495 × 595 × 6", "G3", 50, 0.29, "2650", 0.3],
  "10-G3",
  ["YAFI PF-105/400/8-G3", "105 × 400 × 8", "G3", 50, 0.08, "720", 0.2],
  ["YAFI PF-105/650/8-G3", "105 × 650 × 8", "G3", 50, 0.13, "1200", 0.25],
  ["YAFI PF-105/800/8-G3", "105 × 800 × 8", "G3", 50, 0.16, "1450", 0.35],
  ["YAFI PF-105/900/8-G3", "105 × 900 × 8", "G3", 50, 0.18, "1650", 0.4],
  ["YAFI PF-395/495/8-G3", "395 × 495 × 8", "G3", 50, 0.2, "1800", 0.3],
  ["YAFI PF-395/610/8-G3", "395 × 610 × 8", "G3", 50, 0.24, "2160", 0.3],
  ["YAFI PF-495/595/8-G3", "495 × 595 × 8", "G3", 50, 0.29, "2650", 0.35],
];

/** Ravni i perivi predfilter sa metalnim okvirom – YAFI PF. */
const washableMetalRows: PanelEntry[] = [
  "10-G2 · POL 20/10",
  ["YAFI PF-205/400/10-G2", "205 × 400 × 10", "G2", 40, 0.08, "720 / 25", 0.45],
  ["YAFI PF-205/650/10-G2", "205 × 650 × 10", "G2", 40, 0.13, "1200 / 25", 0.55],
  ["YAFI PF-205/800/10-G2", "205 × 800 × 10", "G2", 40, 0.16, "1450 / 25", 0.7],
  ["YAFI PF-205/900/10-G2", "205 × 900 × 10", "G2", 40, 0.18, "1650 / 25", 0.85],
  ["YAFI PF-395/495/10-G2", "395 × 495 × 10", "G2", 40, 0.2, "1800 / 25", 0.95],
  ["YAFI PF-395/620/10-G2", "395 × 620 × 10", "G2", 40, 0.24, "2160 / 25", 1.1],
  ["YAFI PF-495/595/10-G2", "495 × 595 × 10", "G2", 40, 0.29, "2650 / 25", 1.1],
  "15-G2 · POL 20/15",
  ["YAFI PF-205/400/15-G2", "205 × 400 × 15", "G2", 40, 0.08, "720 / 30", 0.45],
  ["YAFI PF-205/650/15-G2", "205 × 650 × 15", "G2", 40, 0.13, "1200 / 30", 0.55],
  ["YAFI PF-205/800/15-G2", "205 × 800 × 15", "G2", 40, 0.16, "1450 / 30", 0.7],
  ["YAFI PF-205/900/15-G2", "205 × 900 × 15", "G2", 40, 0.18, "1650 / 30", 0.85],
  ["YAFI PF-395/495/15-G2", "395 × 495 × 15", "G2", 40, 0.2, "1800 / 30", 0.95],
  ["YAFI PF-395/620/15-G2", "395 × 620 × 15", "G2", 40, 0.24, "2160 / 30", 1.1],
  ["YAFI PF-495/595/15-G2", "495 × 595 × 15", "G2", 40, 0.29, "2650 / 30", 1.1],
  "20-G2 · POL 20/20",
  ["YAFI PF-205/400/20-G2", "205 × 400 × 20", "G2", 40, 0.08, "720 / 35", 0.45],
  ["YAFI PF-205/650/20-G2", "205 × 650 × 20", "G2", 40, 0.13, "1200 / 35", 0.55],
  ["YAFI PF-205/800/20-G2", "205 × 800 × 20", "G2", 40, 0.16, "1450 / 35", 0.7],
  ["YAFI PF-205/900/20-G2", "205 × 900 × 20", "G2", 40, 0.18, "1650 / 35", 0.85],
  ["YAFI PF-395/495/20-G2", "395 × 495 × 20", "G2", 40, 0.2, "1800 / 35", 0.95],
  ["YAFI PF-395/620/20-G2", "395 × 620 × 20", "G2", 40, 0.24, "2160 / 35", 1.1],
  ["YAFI PF-495/595/20-G2", "495 × 595 × 20", "G2", 40, 0.29, "2650 / 35", 1.1],
];

/** Žičani i perivi predfilter – YAFI PF. */
const washableWireRows: PanelEntry[] = [
  "6-G3",
  ["YAFI PF-205/400/4-G3", "205 × 400 × 4", "G3", 50, 0.08, "720", 0.15],
  ["YAFI PF-205/650/4-G3", "205 × 650 × 4", "G3", 50, 0.13, "1200", 0.2],
  ["YAFI PF-205/800/4-G3", "205 × 800 × 4", "G3", 50, 0.16, "1450", 0.3],
  ["YAFI PF-205/900/4-G3", "205 × 900 × 4", "G3", 50, 0.18, "1650", 0.35],
  ["YAFI PF-395/495/4-G3", "395 × 495 × 4", "G3", 50, 0.2, "1800", 0.25],
  ["YAFI PF-395/620/4-G3", "395 × 620 × 4", "G3", 50, 0.24, "2160", 0.25],
  ["YAFI PF-495/595/4-G3", "495 × 595 × 4", "G3", 50, 0.29, "2650", 0.3],
  "4-G2",
  ["YAFI PF-205/400/4-G2", "205 × 400 × 4", "G2", 35, 0.08, "720 / 20", 0.25],
  ["YAFI PF-205/650/4-G2", "205 × 650 × 4", "G2", 35, 0.13, "1200", 0.4],
  ["YAFI PF-205/800/4-G2", "205 × 800 × 4", "G2", 35, 0.16, "1450", 0.5],
  ["YAFI PF-205/900/4-G2", "205 × 900 × 4", "G2", 35, 0.18, "1650", 0.55],
  ["YAFI PF-395/495/4-G2", "395 × 495 × 4", "G2", 35, 0.2, "1800", 0.45],
  ["YAFI PF-395/620/4-G2", "395 × 620 × 4", "G2", 35, 0.24, "2160", 0.55],
  ["YAFI PF-495/595/4-G2", "495 × 595 × 4", "G2", 35, 0.29, "2650", 0.65],
  "6-G2",
  ["YAFI PF-205/400/6-G2", "205 × 400 × 6", "G2", 35, 0.08, "720", 0.25],
  ["YAFI PF-205/650/6-G2", "205 × 650 × 6", "G2", 35, 0.13, "1200", 0.4],
  ["YAFI PF-205/800/6-G2", "205 × 800 × 6", "G2", 35, 0.16, "1450", 0.5],
  ["YAFI PF-205/900/6-G2", "205 × 900 × 6", "G2", 35, 0.18, "1650", 0.55],
  ["YAFI PF-395/495/6-G2", "395 × 495 × 6", "G2", 35, 0.2, "1800", 0.45],
  ["YAFI PF-395/620/6-G2", "395 × 620 × 6", "G2", 35, 0.24, "2160", 0.55],
  ["YAFI PF-495/595/6-G2", "495 × 595 × 6", "G2", 35, 0.29, "2650", 0.65],
  "8-G2",
  ["YAFI PF-105/400/8-G2", "105 × 400 × 8", "G2", 35, 0.08, "720", 0.3],
  ["YAFI PF-105/650/8-G2", "105 × 650 × 8", "G2", 35, 0.13, "1200", 0.45],
  ["YAFI PF-105/800/8-G2", "105 × 800 × 8", "G2", 35, 0.16, "1450", 0.55],
  ["YAFI PF-105/900/8-G2", "105 × 900 × 8", "G2", 35, 0.18, "1650", 0.6],
  ["YAFI PF-395/495/8-G2", "395 × 495 × 8", "G2", 35, 0.2, "1800", 0.5],
  ["YAFI PF-395/610/8-G2", "395 × 610 × 8", "G2", 35, 0.24, "2160", 0.6],
  ["YAFI PF-495/595/8-G2", "495 × 595 × 8", "G2", 35, 0.29, "2650", 0.7],
];

/** Kartonski filter sa materijalom bez žice – YAFI KF. */
const cassetteNoWireRows: PanelEntry[] = [
  { band: "22-G4", coarse: 70 },
  ["YAFI KF-289/289/20-G4", "289 × 289 × 20", "G4", 70, 0.25, "850 / 95", 0.1],
  ["YAFI KF-394/495/20-G4", "394 × 495 × 20", "G4", 70, 0.35, "1850 / 95", 0.25],
  ["YAFI KF-495/495/20-G4", "495 × 495 × 20", "G4", 70, 0.8, "2400 / 95", 0.35],
  ["YAFI KF-495/622/20-G4", "495 × 622 × 20", "G4", 70, 0.95, "3000 / 95", 0.45],
  ["YAFI KF-289/594/20-G4", "289 × 594 × 20", "G4", 70, 0.5, "1700 / 95", 0.2],
  ["YAFI KF-495/594/20-G4", "495 × 594 × 20", "G4", 70, 0.9, "2500 / 95", 0.4],
  ["YAFI KF-594/594/20-G4", "594 × 594 × 20", "G4", 70, 1.1, "3400 / 95", 0.45],
  { band: "48-G4", coarse: 70 },
  ["YAFI KF-289/289/45-G4", "289 × 289 × 45", "G4", 70, 0.3, "850 / 60", 0.15],
  ["YAFI KF-394/495/45-G4", "394 × 495 × 45", "G4", 70, 0.8, "1850 / 60", 0.3],
  ["YAFI KF-495/495/45-G4", "495 × 495 × 45", "G4", 70, 1, "2400 / 60", 0.4],
  ["YAFI KF-495/622/45-G4", "495 × 622 × 45", "G4", 70, 1.2, "3000 / 60", 0.5],
  ["YAFI KF-289/594/45-G4", "289 × 594 × 45", "G4", 70, 0.65, "1700 / 60", 0.25],
  ["YAFI KF-495/594/45-G4", "495 × 594 × 45", "G4", 70, 1.05, "2500 / 60", 0.5],
  ["YAFI KF-594/594/45-G4", "594 × 594 × 45", "G4", 70, 1.3, "3400 / 60", 0.55],
  { band: "96-G4", coarse: 70 },
  ["YAFI KF-289/289/95-G4", "289 × 289 × 95", "G4", 70, 0.55, "1050 / 70", 0.25],
  ["YAFI KF-394/495/95-G4", "394 × 495 × 95", "G4", 70, 1.3, "2400 / 70", 0.55],
  ["YAFI KF-495/495/95-G4", "495 × 495 × 95", "G4", 70, 1.6, "3000 / 70", 0.75],
  ["YAFI KF-495/622/95-G4", "495 × 622 × 95", "G4", 70, 1.5, "3400 / 70", 0.9],
  ["YAFI KF-289/594/95-G4", "289 × 594 × 95", "G4", 70, 1.1, "2150 / 70", 0.45],
  ["YAFI KF-495/594/95-G4", "495 × 594 × 95", "G4", 70, 1.9, "3400 / 70", 1],
  ["YAFI KF-594/594/95-G4", "594 × 594 × 95", "G4", 70, 2.2, "4250 / 70", 1.1],
];

/** Kartonski filter za jednokratnu upotrebu – YAFI KF. */
const cassetteDisposableRows: PanelEntry[] = [
  { band: "20-G2", coarse: 45 },
  ["YAFI KF-287/287/20-G2", "289 × 595 × 20", "G2", 40, 0.17, "1700 / 25", 0.1],
  ["YAFI KF-392/492/20-G2", "495 × 595 × 20", "G2", 40, 0.29, "2500 / 25", 0.15],
  ["YAFI KF-492/492/20-G2", "595 × 595 × 20", "G2", 40, 0.35, "3400 / 25", 0.2],
  ["YAFI KF-495/625/20-G2", "495 × 495 × 20", "G2", 40, 0.25, "2400 / 25", 0.3],
  ["YAFI KF-287/592/20-G2", "395 × 495 × 20", "G2", 40, 0.2, "1850 / 25", 0.15],
  ["YAFI KF-492/592/20-G2", "395 × 624 × 20", "G2", 40, 0.25, "2400 / 25", 0.3],
  ["YAFI KF-592/592/20-G2", "495 × 624 × 20", "G2", 40, 0.31, "3000 / 25", 0.35],
  { band: "45-G3", coarse: 55 },
  ["YAFI KF-287/287/45-G4", "287 × 287 × 45", "G3", 50, 0.25, "1700 / 45", 0.15],
  ["YAFI KF-392/492/45-G4", "392 × 492 × 45", "G3", 50, 0.6, "4500 / 45", 0.2],
  ["YAFI KF-492/492/45-G4", "492 × 492 × 45", "G3", 50, 0.75, "3400 / 45", 0.25],
  ["YAFI KF-495/625/45-G4", "492 × 625 × 45", "G3", 50, 0.95, "2400 / 45", 0.35],
  ["YAFI KF-287/592/45-G4", "287 × 592 × 45", "G3", 50, 0.5, "1850 / 45", 0.2],
  ["YAFI KF-492/592/45-G4", "492 × 592 × 45", "G3", 50, 0.9, "2400 / 45", 0.35],
  ["YAFI KF-592/592/45-G4", "592 × 592 × 45", "G3", 50, 1.1, "3000 / 45", 0.4],
  { band: "45-G3", coarse: 65 },
  ["YAFI KF-287/287/96-G4", "287 × 287 × 96", "G4", 60, 0.25, "1070 / 75", 0.25],
  ["YAFI KF-392/492/96-G4", "392 × 492 × 96", "G4", 60, 0.6, "2400 / 75", 0.3],
  ["YAFI KF-492/492/96-G4", "492 × 492 × 96", "G4", 60, 0.75, "3000 / 75", 0.35],
  ["YAFI KF-495/625/96-G4", "492 × 625 × 96", "G4", 60, 0.95, "3700 / 75", 0.45],
  ["YAFI KF-287/592/96-G4", "287 × 592 × 96", "G4", 60, 0.5, "2125 / 75", 0.3],
  ["YAFI KF-492/592/96-G4", "492 × 592 × 96", "G4", 60, 0.9, "3500 / 75", 0.45],
  ["YAFI KF-592/592/96-G4", "592 × 592 × 96", "G4", 60, 1.1, "4250 / 75", 0.55],
];

/** Perivi predfilter sa metalnim okvirom – YAFI KF. */
const cassetteWashableRows: PanelEntry[] = [
  { band: "48-G3", coarse: 50 },
  ["YAFI KF-287/287/48-G3", "287 × 287 × 48", "G3", 50, 0.17, "850 / 35", 0.38],
  ["YAFI KF-392/492/48-G3", "392 × 492 × 48", "G3", 50, 0.4, "1950 / 35", 1.1],
  ["YAFI KF-492/492/48-G3", "492 × 492 × 48", "G3", 50, 0.5, "2600 / 35", 1.5],
  ["YAFI KF-492/625/48-G3", "492 × 625 × 48", "G3", 50, 0.62, "3000 / 35", 1.4],
  ["YAFI KF-287/592/48-G3", "287 × 592 × 48", "G3", 50, 0.34, "1700 / 35", 0.8],
  ["YAFI KF-492/592/48-G3", "492 × 592 × 48", "G3", 50, 0.6, "2820 / 35", 1.35],
  ["YAFI KF-592/592/48-G3", "592 × 592 × 48", "G3", 50, 0.7, "3400 / 35", 1.65],
  { band: "96-G3", coarse: 50 },
  ["YAFI KF-287/287/96-G3", "287 × 287 × 96", "G3", 50, 0.25, "1060 / 40", 0.8],
  ["YAFI KF-392/492/96-G3", "392 × 492 × 96", "G3", 50, 0.6, "2400 / 40", 1.75],
  ["YAFI KF-492/492/96-G3", "492 × 492 × 96", "G3", 50, 0.75, "3000 / 40", 2.2],
  ["YAFI KF-492/625/96-G3", "492 × 625 × 96", "G3", 50, 0.95, "3600 / 40", 2.9],
  ["YAFI KF-287/592/96-G3", "287 × 592 × 96", "G3", 50, 0.5, "2125 / 40", 1.6],
  ["YAFI KF-492/592/96-G3", "492 × 592 × 96", "G3", 50, 0.9, "3500 / 40", 2.65],
  ["YAFI KF-592/592/96-G3", "592 × 592 × 96", "G3", 50, 1.1, "4250 / 40", 3.3],
];

/** Predfilter sa kartonskim okvirom – YAFI KF. */
const cassetteCardboardRows: PanelEntry[] = [
  { band: "23-G4", coarse: 65 },
  ["YAFI KF-289/289/23-G4", "289 × 289 × 23", "G4", 65, 0.2, "450 / 50", 0.3],
  ["YAFI KF-394/495/23-G4", "394 × 495 × 23", "G4", 65, 0.5, "1000 / 50", 0.45],
  ["YAFI KF-495/495/23-G4", "495 × 495 × 23", "G4", 65, 0.6, "1300 / 50", 0.55],
  ["YAFI KF-495/622/23-G4", "495 × 622 × 23", "G4", 65, 0.75, "1600 / 50", 0.65],
  ["YAFI KF-289/594/23-G4", "289 × 594 × 23", "G4", 65, 0.4, "900 / 50", 0.4],
  ["YAFI KF-495/594/23-G4", "495 × 594 × 23", "G4", 65, 0.7, "1460 / 50", 0.65],
  ["YAFI KF-594/594/23-G4", "594 × 594 × 23", "G4", 65, 0.85, "1800 / 50", 0.7],
  { band: "48-G4", coarse: 65 },
  ["YAFI KF-289/289/48-G4", "289 × 289 × 48", "G4", 65, 0.45, "850 / 60", 0.3],
  ["YAFI KF-394/495/48-G4", "394 × 495 × 48", "G4", 65, 1.1, "1950 / 60", 0.6],
  ["YAFI KF-495/495/48-G4", "495 × 495 × 48", "G4", 65, 1.3, "2450 / 60", 0.7],
  ["YAFI KF-495/622/48-G4", "495 × 622 × 48", "G4", 65, 1.4, "300 / 60", 0.8],
  ["YAFI KF-289/594/48-G4", "289 × 594 × 48", "G4", 65, 0.9, "1700 / 60", 0.5],
  ["YAFI KF-495/594/48-G4", "495 × 594 × 48", "G4", 65, 1.2, "2800 / 60", 0.8],
  ["YAFI KF-594/594/48-G4", "594 × 594 × 48", "G4", 65, 1.6, "3400 / 60", 0.9],
  { band: "98-G4", coarse: 65 },
  ["YAFI KF-289/289/96-G4", "289 × 289 × 96", "G4", 65, 0.7, "1000 / 70", 0.45],
  ["YAFI KF-394/495/96-G4", "394 × 495 × 96", "G4", 65, 1.5, "2400 / 70", 0.75],
  ["YAFI KF-495/495/96-G4", "495 × 495 × 96", "G4", 65, 1.9, "3000 / 70", 0.85],
  ["YAFI KF-495/622/96-G4", "496 × 622 × 96", "G4", 65, 1.85, "3600 / 70", 0.95],
  ["YAFI KF-289/594/96-G4", "289 × 594 × 96", "G4", 65, 1.3, "2100 / 70", 0.75],
  ["YAFI KF-495/594/96-G4", "495 × 594 × 96", "G4", 65, 2.1, "3500 / 70", 1.05],
  ["YAFI KF-594/594/96-G4", "594 × 594 × 96", "G4", 65, 2.5, "4250 / 70", 1.15],
];

/** Predfilter sa metalnim okvirom – YAFI KF. */
const cassetteMetalRows: PanelEntry[] = [
  { band: "48-G4", coarse: 65 },
  ["YAFI KF-287/287/48-G4", "287 × 287 × 48", "G4", 65, 0.17, "850 / 60", 0.6],
  ["YAFI KF-392/492/48-G4", "392 × 492 × 48", "G4", 65, 0.4, "1950 / 60", 1],
  ["YAFI KF-492/492/48-G4", "492 × 492 × 48", "G4", 65, 0.5, "2600 / 60", 1.5],
  ["YAFI KF-495/625/48-G4", "492 × 625 × 48", "G4", 65, 0.62, "3000 / 60", 1.7],
  ["YAFI KF-287/592/48-G4", "287 × 592 × 48", "G4", 65, 0.34, "1700 / 60", 1.1],
  ["YAFI KF-492/592/48-G4", "492 × 592 × 48", "G4", 65, 0.6, "2820 / 60", 1.6],
  ["YAFI KF-592/592/48-G4", "592 × 592 × 48", "G4", 65, 0.7, "3400 / 60", 1.8],
  { band: "96-G4", coarse: 65 },
  ["YAFI KF-287/287/96-G4", "287 × 287 × 96", "G4", 65, 0.25, "1070 / 70", 0.7],
  ["YAFI KF-392/492/96-G4", "392 × 492 × 96", "G4", 65, 0.6, "2400 / 70", 1.6],
  ["YAFI KF-492/492/96-G4", "492 × 492 × 96", "G4", 65, 0.75, "3000 / 70", 2],
  ["YAFI KF-495/625/96-G4", "492 × 625 × 96", "G4", 65, 0.95, "3700 / 70", 2.6],
  ["YAFI KF-287/592/96-G4", "287 × 592 × 96", "G4", 65, 0.5, "2125 / 70", 1.45],
  ["YAFI KF-492/592/96-G4", "492 × 592 × 96", "G4", 65, 0.9, "3500 / 70", 2.4],
  ["YAFI KF-592/592/96-G4", "592 × 592 × 96", "G4", 65, 1.1, "4250 / 70", 3],
];

/**
 * One size in a rigid V-cell listing. The separator range prints only its ISO
 * designation, so `filterClass` is dropped from the table when a range passes
 * `showClass: false`.
 */
type RigidRow = [
  code: string,
  dimensions: string,
  filterClass: string,
  /** ISO 16890 designation, e.g. "ePM1 80%". */
  iso: string,
  /** Media area in m². */
  area: number,
  /** Air flow as printed, sometimes "flow / pressure drop". */
  flow: string,
  /** Weight in kg. */
  weight: number,
];

type RigidEntry = string | RigidRow;

function rigidTable(
  locale: Locale,
  entries: RigidEntry[],
  { showClass = true }: { showClass?: boolean } = {},
) {
  const sr = locale === "sr";
  const head = sr
    ? [
        "Oznaka proizvoda",
        "Dimenzija (W×H×D)",
        "Klasa EN 779",
        "ISO 16890",
        "Površina (m²)",
        "Protok vazduha (m³/h)",
        "Težina (kg)",
      ]
    : [
        "Product code",
        "Dimensions (W×H×D)",
        "Class EN 779",
        "ISO 16890",
        "Media area (m²)",
        "Air flow (m³/h)",
        "Weight (kg)",
      ];

  return {
    head: showClass ? head : head.filter((_, i) => i !== 2),
    rows: entries.map((entry) => {
      if (typeof entry === "string") return [entry];
      const cells = [
        entry[0],
        entry[1],
        entry[2],
        decimal2(locale, entry[3]),
        decimal(locale, entry[4]),
        entry[5],
        decimal(locale, entry[6]),
      ];
      return showClass ? cells : cells.filter((_, i) => i !== 2);
    }),
  };
}

/** Vrećasti filteri u metalnom limenom ramu G4/M5 – YAFI VF. */
const bagMetalRows: BagEntry[] = [
  { band: "G3", coarse: 50 },
  ["YAFI VF-287/592/360-3-G3", "287 × 592 × 360", 3, "G3", 50, 1.3, "1700 / 40", 1.2],
  ["YAFI VF-490/592/360-5-G3", "490 × 592 × 360", 5, "G3", 50, 2.2, "2800 / 40", 1.85],
  ["YAFI VF-592/592/360-6-G3", "592 × 592 × 360", 6, "G3", 50, 2.7, "3400 / 40", 2],
  ["YAFI VF-287/592/500-3-G3", "287 × 592 × 500", 3, "G3", 50, 1.9, "1700 / 35", 1.35],
  ["YAFI VF-490/592/500-5-G3", "490 × 592 × 500", 5, "G3", 50, 3.1, "2800 / 35", 2],
  ["YAFI VF-592/592/500-6-G3", "592 × 592 × 500", 6, "G3", 50, 3.7, "3400 / 35", 2.25],
  ["YAFI VF-287/592/600-3-G3", "287 × 592 × 600", 3, "G3", 50, 2.2, "1700 / 30", 1.5],
  ["YAFI VF-490/592/600-5-G3", "490 × 592 × 600", 5, "G3", 50, 3.7, "2800 / 30", 2.2],
  ["YAFI VF-592/592/600-6-G3", "592 × 592 × 600", 6, "G3", 50, 4.5, "3400 / 30", 2.5],
  { band: "G4", coarse: 65 },
  ["YAFI VF-287/592/360-3-G4", "287 × 592 × 360", 3, "G4", 65, 1.3, "1700 / 50", 1.2],
  ["YAFI VF-490/592/360-5-G4", "490 × 592 × 360", 5, "G4", 65, 2.2, "2800 / 50", 1.85],
  ["YAFI VF-592/592/360-6-G4", "592 × 592 × 360", 6, "G4", 65, 2.7, "3400 / 50", 2],
  ["YAFI VF-287/592/500-3-G4", "287 × 592 × 500", 3, "G4", 65, 1.9, "1700 / 45", 1.35],
  ["YAFI VF-490/592/500-5-G4", "490 × 592 × 500", 5, "G4", 65, 3.1, "2800 / 45", 2],
  ["YAFI VF-592/592/500-6-G4", "592 × 592 × 500", 6, "G4", 65, 3.7, "3400 / 45", 2.25],
  ["YAFI VF-287/592/600-3-G4", "287 × 592 × 600", 3, "G4", 65, 2.2, "1700 / 40", 1.5],
  ["YAFI VF-490/592/600-5-G4", "490 × 592 × 600", 5, "G4", 65, 3.7, "2800 / 40", 2.2],
  ["YAFI VF-592/592/600-6-G4", "592 × 592 × 600", 6, "G4", 65, 4.5, "3400 / 40", 2.5],
  { band: "M5", coarse: 80 },
  ["YAFI VF-287/592/360-3-M5", "287 × 592 × 360", 3, "M5", 80, 1.3, "1700 / 55", 1.2],
  ["YAFI VF-490/592/360-5-M5", "490 × 592 × 360", 5, "M5", 80, 2.2, "2800 / 55", 1.85],
  ["YAFI VF-592/592/360-6-M5", "592 × 592 × 360", 6, "M5", 80, 2.7, "3400 / 55", 2],
  ["YAFI VF-287/592/500-3-M5", "287 × 592 × 500", 3, "M5", 80, 1.9, "1700 / 50", 1.35],
  ["YAFI VF-490/592/500-5-M5", "490 × 592 × 500", 5, "M5", 80, 3.1, "2800 / 50", 2],
  ["YAFI VF-592/592/500-6-M5", "592 × 592 × 500", 6, "M5", 80, 3.7, "3400 / 50", 2.25],
  ["YAFI VF-287/592/600-3-M5", "287 × 592 × 600", 3, "M5", 80, 2.2, "1700 / 45", 1.5],
  ["YAFI VF-490/592/600-5-M5", "490 × 592 × 600", 5, "M5", 80, 3.7, "2800 / 45", 2.2],
  ["YAFI VF-592/592/600-6-M5", "592 × 592 × 600", 6, "M5", 80, 4.5, "3400 / 45", 2.5],
];

/** Vrećasti filter za finu prašinu – metalni okvir M6 – YAFI VF. */
const bagM6Rows: BagEntry[] = [
  "M6 · 500",
  ["YAFI VF-287/287/500-3-M6", "287 × 287 × 500", 3, "M6", "ePM10 65%", 1.1, "560 / 60 Pa", 0.65],
  ["YAFI VF-287/287/500-4-M6", "287 × 287 × 500", 4, "M6", "ePM10 65%", 1.4, "560 / 50 Pa", 0.7],
  ["YAFI VF-287/592/500-3-M6", "287 × 592 × 500", 3, "M6", "ePM10 65%", 2, "1125 / 60 Pa", 1.1],
  ["YAFI VF-287/592/500-4-M6", "287 × 592 × 500", 4, "M6", "ePM10 65%", 2.7, "1125 / 50 Pa", 1.2],
  ["YAFI VF-490/592/500-5-M6", "490 × 592 × 500", 5, "M6", "ePM10 65%", 3.4, "1870 / 60 Pa", 1.85],
  ["YAFI VF-490/592/500-6-M6", "490 × 592 × 500", 6, "M6", "ePM10 65%", 4.1, "1870 / 50 Pa", 2],
  ["YAFI VF-592/592/500-6-M6", "592 × 592 × 500", 6, "M6", "ePM10 65%", 4.1, "2250 / 60 Pa", 2],
  ["YAFI VF-592/592/500-8-M6", "592 × 592 × 500", 8, "M6", "ePM10 65%", 5.4, "2250 / 50 Pa", 2.2],
  "M6 · 600",
  ["YAFI VF-287/287/600-3-M6", "287 × 287 × 600", 3, "M6", "ePM10 65%", 1.3, "640 / 70 Pa", 0.7],
  ["YAFI VF-287/287/600-4-M6", "287 × 287 × 600", 4, "M6", "ePM10 65%", 1.7, "640 / 60 Pa", 0.75],
  ["YAFI VF-287/592/600-3-M6", "287 × 592 × 600", 3, "M6", "ePM10 65%", 2.4, "1275 / 70 Pa", 1.2],
  ["YAFI VF-287/592/600-4-M6", "287 × 592 × 600", 4, "M6", "ePM10 65%", 3.3, "1275 / 60 Pa", 1.3],
  ["YAFI VF-490/592/600-5-M6", "490 × 592 × 600", 5, "M6", "ePM10 65%", 4.1, "2050 / 70 Pa", 2],
  ["YAFI VF-490/592/600-6-M6", "490 × 592 × 600", 6, "M6", "ePM10 65%", 4.9, "2050 / 60 Pa", 2.2],
  ["YAFI VF-592/592/600-6-M6", "592 × 592 × 600", 6, "M6", "ePM10 65%", 4.9, "2550 / 70 Pa", 2.2],
  ["YAFI VF-592/592/600-8-M6", "592 × 592 × 600", 8, "M6", "ePM10 65%", 6.5, "2550 / 60 Pa", 2.4],
];

/** Vrećasti filter za finu prašinu – metalni okvir F7 – YAFI VF. */
const bagF7Rows: BagEntry[] = [
  "F7 · 500",
  ["YAFI VF-287/287/500-3-F7", "287 × 287 × 500", 3, "F7", "ePM2.5 65%", 1.1, "560 / 85 Pa", 0.65],
  ["YAFI VF-287/287/500-4-F7", "287 × 287 × 500", 4, "F7", "ePM2.5 65%", 1.4, "560 / 75 Pa", 0.7],
  ["YAFI VF-287/592/500-3-F7", "287 × 592 × 500", 3, "F7", "ePM2.5 65%", 2, "1125 / 85 Pa", 1.1],
  ["YAFI VF-287/592/500-4-F7", "287 × 592 × 500", 4, "F7", "ePM2.5 65%", 2.7, "1125 / 75 Pa", 1.2],
  ["YAFI VF-490/592/500-5-F7", "490 × 592 × 500", 5, "F7", "ePM2.5 65%", 3.4, "1870 / 85 Pa", 1.85],
  ["YAFI VF-490/592/500-6-F7", "490 × 592 × 500", 6, "F7", "ePM2.5 65%", 4.1, "1870 / 75 Pa", 2],
  ["YAFI VF-592/592/500-6-F7", "592 × 592 × 500", 6, "F7", "ePM2.5 65%", 4.1, "2250 / 85 Pa", 2],
  ["YAFI VF-592/592/500-8-F7", "592 × 592 × 500", 8, "F7", "ePM2.5 65%", 5.4, "2250 / 75 Pa", 2.2],
  "F7 · 600",
  ["YAFI VF-287/287/600-3-F7", "287 × 287 × 600", 3, "F7", "ePM2.5 65%", 1.3, "640 / 95 Pa", 0.7],
  ["YAFI VF-287/287/600-4-F7", "287 × 287 × 600", 4, "F7", "ePM2.5 65%", 1.7, "640 / 85 Pa", 0.75],
  ["YAFI VF-287/592/600-3-F7", "287 × 592 × 600", 3, "F7", "ePM2.5 65%", 2.4, "1275 / 95 Pa", 1.2],
  ["YAFI VF-287/592/600-4-F7", "287 × 592 × 600", 4, "F7", "ePM2.5 65%", 3.3, "1275 / 85 Pa", 1.3],
  ["YAFI VF-490/592/600-5-F7", "490 × 592 × 600", 5, "F7", "ePM2.5 65%", 4.1, "2050 / 95 Pa", 2],
  ["YAFI VF-490/592/600-6-F7", "490 × 592 × 600", 6, "F7", "ePM2.5 65%", 4.9, "2050 / 85 Pa", 2.2],
  ["YAFI VF-592/592/600-6-F7", "592 × 592 × 600", 6, "F7", "ePM2.5 65%", 4.9, "2550 / 95 Pa", 2.2],
  ["YAFI VF-592/592/600-8-F7", "592 × 592 × 600", 8, "F7", "ePM2.5 65%", 6.5, "2550 / 85 Pa", 2.4],
];

/** Vrećasti filter za finu prašinu – metalni okvir F8 – YAFI VF. */
const bagF8Rows: BagEntry[] = [
  "F8 · 500",
  ["YAFI VF-287/287/500-3-F8", "287 × 287 × 500", 3, "F8", "ePM1 70%", 1.1, "560 / 125 Pa", 0.65],
  ["YAFI VF-287/287/500-4-F8", "287 × 287 × 500", 4, "F8", "ePM1 70%", 1.4, "560 / 115 Pa", 0.7],
  ["YAFI VF-287/592/500-3-F8", "287 × 592 × 500", 3, "F8", "ePM1 70%", 2, "1125 / 125 Pa", 1.1],
  ["YAFI VF-287/592/500-4-F8", "287 × 592 × 500", 4, "F8", "ePM1 70%", 2.7, "1125 / 115 Pa", 1.2],
  ["YAFI VF-490/592/500-5-F8", "490 × 592 × 500", 5, "F8", "ePM1 70%", 3.4, "1870 / 125 Pa", 1.85],
  ["YAFI VF-490/592/500-6-F8", "490 × 592 × 500", 6, "F8", "ePM1 70%", 4.1, "1870 / 115 Pa", 2],
  ["YAFI VF-592/592/500-6-F8", "592 × 592 × 500", 6, "F8", "ePM1 70%", 4.1, "2250 / 125 Pa", 2],
  ["YAFI VF-592/592/500-8-F8", "592 × 592 × 500", 8, "F8", "ePM1 70%", 5.4, "2250 / 115 Pa", 2.2],
  "F8 · 600",
  ["YAFI VF-287/287/600-3-F8", "287 × 287 × 600", 3, "F8", "ePM1 70%", 1.3, "640 / 140 Pa", 0.7],
  ["YAFI VF-287/287/600-4-F8", "287 × 287 × 600", 4, "F8", "ePM1 70%", 1.7, "640 / 125 Pa", 0.75],
  ["YAFI VF-287/592/600-3-F8", "287 × 592 × 600", 3, "F8", "ePM1 70%", 2.4, "1275 / 140 Pa", 1.2],
  ["YAFI VF-287/592/600-4-F8", "287 × 592 × 600", 4, "F8", "ePM1 70%", 3.3, "1275 / 125 Pa", 1.3],
  ["YAFI VF-490/592/600-5-F8", "490 × 592 × 600", 5, "F8", "ePM1 70%", 4.1, "2050 / 140 Pa", 2],
  ["YAFI VF-490/592/600-6-F8", "490 × 592 × 600", 6, "F8", "ePM1 70%", 4.9, "2050 / 125 Pa", 2.2],
  ["YAFI VF-592/592/600-6-F8", "592 × 592 × 600", 6, "F8", "ePM1 70%", 4.9, "2550 / 140 Pa", 2.2],
  ["YAFI VF-592/592/600-8-F8", "592 × 592 × 600", 8, "F8", "ePM1 70%", 6.5, "2550 / 125 Pa", 2.4],
];

/** Vrećasti filter za finu prašinu – metalni okvir F9 – YAFI VF. */
const bagF9Rows: BagEntry[] = [
  "F9 · 500",
  ["YAFI VF-287/287/500-3-F9", "287 × 287 × 500", 3, "F9", "ePM1 80%", 1.1, "560 / 125 Pa", 0.65],
  ["YAFI VF-287/287/500-4-F9", "287 × 287 × 500", 4, "F9", "ePM1 80%", 1.4, "560 / 115 Pa", 0.7],
  ["YAFI VF-287/592/500-3-F9", "287 × 592 × 500", 3, "F9", "ePM1 80%", 2, "1125 / 125 Pa", 1.1],
  ["YAFI VF-287/592/500-4-F9", "287 × 592 × 500", 4, "F9", "ePM1 80%", 2.7, "1125 / 115 Pa", 1.2],
  ["YAFI VF-490/592/500-5-F9", "490 × 592 × 500", 5, "F9", "ePM1 80%", 3.4, "1870 / 125 Pa", 1.85],
  ["YAFI VF-490/592/500-6-F9", "490 × 592 × 500", 6, "F9", "ePM1 80%", 4.1, "1870 / 115 Pa", 2],
  ["YAFI VF-592/592/500-6-F9", "592 × 592 × 500", 6, "F9", "ePM1 80%", 4.1, "2250 / 125 Pa", 2],
  ["YAFI VF-592/592/500-8-F9", "592 × 592 × 500", 8, "F9", "ePM1 80%", 5.4, "2250 / 115 Pa", 2.2],
  "F9 · 600",
  ["YAFI VF-287/287/600-3-F9", "287 × 287 × 600", 3, "F9", "ePM1 80%", 1.3, "640 / 140 Pa", 0.7],
  ["YAFI VF-287/287/600-4-F9", "287 × 287 × 600", 4, "F9", "ePM1 80%", 1.7, "640 / 125 Pa", 0.75],
  ["YAFI VF-287/592/600-3-F9", "287 × 592 × 600", 3, "F9", "ePM1 80%", 2.4, "1275 / 140 Pa", 1.2],
  ["YAFI VF-287/592/600-4-F9", "287 × 592 × 600", 4, "F9", "ePM1 80%", 3.3, "1275 / 125 Pa", 1.3],
  ["YAFI VF-490/592/600-5-F9", "490 × 592 × 600", 5, "F9", "ePM1 80%", 4.1, "2050 / 140 Pa", 2],
  ["YAFI VF-490/592/600-6-F9", "490 × 592 × 600", 6, "F9", "ePM1 80%", 4.9, "2050 / 125 Pa", 2.2],
  ["YAFI VF-592/592/600-6-F9", "592 × 592 × 600", 6, "F9", "ePM1 80%", 4.9, "2550 / 140 Pa", 2.2],
  ["YAFI VF-592/592/600-8-F9", "592 × 592 × 600", 8, "F9", "ePM1 80%", 6.5, "2550 / 125 Pa", 2.4],
];

/** Vrećasti filter od staklenih vlakana od M6 do F9 – YAFI VF. */
const bagGlassRows: BagEntry[] = [
  "M6",
  ["YAFI VF-592/287/500-3-M6", "592 × 287 × 500", 4, "M6", "ePM10 65%", 2.4, "1700 / 75", 1.2],
  ["YAFI VF-592/492/500-4-M6", "592 × 492 × 500", 6, "M6", "ePM10 65%", 3.6, "2800 / 75", 2.1],
  ["YAFI VF-592/592/500-8-M6", "592 × 592 × 500", 8, "M6", "ePM10 65%", 4.8, "3400 / 75", 2.2],
  ["YAFI VF-592/287/600-3-M6", "592 × 287 × 600", 4, "M6", "ePM10 65%", 2.8, "1700 / 65", 1.3],
  ["YAFI VF-592/492/600-4-M6", "592 × 492 × 600", 6, "M6", "ePM10 65%", 4.3, "2800 / 65", 2.2],
  ["YAFI VF-592/592/600-8-M6", "592 × 592 × 600", 8, "M6", "ePM10 65%", 5.6, "3400 / 65", 2.3],
  "F7",
  ["YAFI VF-592/287/500-3-F7", "592 × 287 × 500", 4, "F2", "ePM1 55%", 2.4, "1700 / 105", 1.2],
  ["YAFI VF-592/492/500-4-F7", "592 × 492 × 500", 6, "F3", "ePM1 55%", 3.6, "2800 / 105", 2.1],
  ["YAFI VF-592/592/500-8-F7", "592 × 592 × 500", 8, "F4", "ePM1 55%", 4.8, "3400 / 105", 2.2],
  ["YAFI VF-592/287/600-3-F7", "592 × 287 × 600", 4, "F5", "ePM1 55%", 2.8, "1700 / 95", 1.3],
  ["YAFI VF-592/492/600-4-F7", "592 × 492 × 600", 6, "F6", "ePM1 55%", 4.3, "2800 / 95", 2.2],
  ["YAFI VF-592/592/600-8-F7", "592 × 592 × 600", 8, "F7", "ePM1 55%", 5.6, "3400 / 95", 2.3],
  "F8",
  ["YAFI VF-592/287/500-3-F8", "592 × 287 × 500", 4, "F8", "ePM1 80%", 2.4, "1700 / 160", 1.2],
  ["YAFI VF-592/492/500-4-F8", "592 × 492 × 500", 6, "F8", "ePM1 80%", 3.6, "2800 / 160", 2.1],
  ["YAFI VF-592/592/500-8-F8", "592 × 592 × 500", 8, "F8", "ePM1 80%", 4.8, "3400 / 160", 2.2],
  ["YAFI VF-592/287/600-3-F8", "592 × 287 × 600", 4, "F8", "ePM1 80%", 2.8, "1700 / 145", 1.3],
  ["YAFI VF-592/492/600-4-F8", "592 × 492 × 600", 6, "F8", "ePM1 80%", 4.3, "2800 / 145", 2.2],
  ["YAFI VF-592/592/600-8-F8", "592 × 592 × 600", 8, "F8", "ePM1 80%", 5.6, "3400 / 145", 2.3],
  "F9",
  ["YAFI VF-592/287/500-3-F9", "592 × 287 × 500", 4, "F8", "ePM1 80%", 2.4, "1700 / 160", 1.2],
  ["YAFI VF-592/492/500-4-F9", "592 × 492 × 500", 6, "F8", "ePM1 80%", 3.6, "2800 / 160", 2.1],
  ["YAFI VF-592/592/500-8-F9", "592 × 592 × 500", 8, "F8", "ePM1 80%", 4.8, "3400 / 160", 2.2],
  ["YAFI VF-592/287/600-3-F9", "592 × 287 × 600", 4, "F8", "ePM1 80%", 2.8, "1700 / 145", 1.3],
  ["YAFI VF-592/492/600-4-F9", "592 × 492 × 600", 6, "F8", "ePM1 80%", 4.3, "2800 / 145", 2.2],
  ["YAFI VF-592/592/600-8-F9", "592 × 592 × 600", 8, "F8", "ePM1 80%", 5.6, "3400 / 145", 2.3],
];

/**
 * A one-off listing whose columns do not match any of the ranges above — the
 * carbon and grease filters each print their own set. The figures are shared
 * between the locales and only the header is translated; numbers pick up the
 * locale's decimal mark, `null` leaves a cell blank.
 */
type FigureEntry = string | (string | number | null)[];

function figureTable(
  locale: Locale,
  head: Record<Locale, string[]>,
  entries: FigureEntry[],
) {
  return {
    head: head[locale],
    rows: entries.map((entry) =>
      typeof entry === "string"
        ? [entry]
        : entry.map((cell) =>
            typeof cell === "number" ? decimal(locale, cell) : (cell ?? ""),
          ),
    ),
  };
}

/** Carbon filters print a carbon weight and a pressure drop of their own. */
const carbonHead: Record<Locale, string[]> = {
  sr: [
    "Oznaka proizvoda",
    "Dimenzije (W×H×D)",
    "Materijal",
    "Težina uglja (kg)",
    "Protok vazduha (m³/h)",
    "Početni pad pritiska (Pa)",
    "Težina (kg)",
  ],
  en: [
    "Product code",
    "Dimensions (W×H×D)",
    "Media",
    "Carbon weight (kg)",
    "Air flow (m³/h)",
    "Initial pressure drop (Pa)",
    "Weight (kg)",
  ],
};

/** Filter sa aktivnim ugljem napunjen ugljeničnim peletom – YAFI MF. */
const carbonPelletRows: FigureEntry[] = [
  "30-AC",
  ["YAFI MF-AU-287/287/30-AC", "287 × 287 × 30", "AC", 1.35, 85, 45, 2.8],
  ["YAFI MF-AU-392/492/30-AC", "392 × 492 × 30", "AC", 3.2, 200, 45, 5.4],
  ["YAFI MF-AU-492/492/30-AC", "492 × 492 × 30", "AC", 4, 240, 45, 8],
  ["YAFI MF-AU-492/625/30-AC", "492 × 625 × 30", "AC", 5, 310, 45, 9],
  ["YAFI MF-AU-287/592/30-AC", "287 × 592 × 30", "AC", 2.8, 175, 45, 5.5],
  ["YAFI MF-AU-492/592/30-AC", "492 × 592 × 30", "AC", 4.8, 290, 45, 9.8],
  ["YAFI MF-AU-592/592/30-AC", "592 × 592 × 30", "AC", 5.8, 350, 45, 11.5],
  "48-AC",
  ["YAFI MF-AU-287/287/48-AC", "287 × 287 × 48", "AC", 2.2, 85, 80, 3.5],
  ["YAFI MF-AU-392/492/48-AC", "392 × 492 × 48", "AC", 5, 200, 80, 6.75],
  ["YAFI MF-AU-492/492/48-AC", "492 × 492 × 48", "AC", 6.4, 240, 80, 10],
  ["YAFI MF-AU-492/625/48-AC", "492 × 625 × 48", "AC", 8, 310, 80, 11.2],
  ["YAFI MF-AU-287/592/48-AC", "287 × 592 × 48", "AC", 4.5, 175, 80, 6.9],
  ["YAFI MF-AU-492/592/48-AC", "492 × 592 × 48", "AC", 7.7, 290, 80, 12],
  ["YAFI MF-AU-592/592/48-AC", "592 × 592 × 48", "AC", 9, 350, 80, 14.5],
];

/** Filter sa čvrstim vrećama i aktivnim ugljem – YAFI MF. */
const carbonBagHead: Record<Locale, string[]> = {
  sr: [
    "Oznaka proizvoda",
    "Dimenzije (W×H×D)",
    "Klasa EN 779",
    "ISO 16890",
    "Površina (m²)",
    "Protok vazduha (m³/h)",
    "Težina (kg)",
  ],
  en: [
    "Product code",
    "Dimensions (W×H×D)",
    "Class EN 779",
    "ISO 16890",
    "Media area (m²)",
    "Air flow (m³/h)",
    "Weight (kg)",
  ],
};

const carbonBagRows: FigureEntry[] = [
  "F7",
  ["YAFI MF AU-287/592/292-CF7", "287 × 592 × 292", "F7", "ePM1 55%", 4.5, "1700 / 120", null],
  ["YAFI MF AU-490/592/292-CF7", "490 × 592 × 292", "F7", "ePM1 55%", 7.2, "2800 / 120", null],
  ["YAFI MF AU-592/592/292-CF7", "592 × 592 × 292", "F7", "ePM1 55%", 9, "3400 / 120", null],
];

/** Filter sa produženom površinom od aktivnog uglja – YAFI MF. */
const carbonPleatedRows: PanelEntry[] = [
  "48-ZW",
  ["YAFI MF-AU-287/287/48-ZW", "287 × 287 × 48", "G4", 65, 0.17, "850 / 55", 0.7],
  ["YAFI MF-AU-392/492/48-ZW", "392 × 492 × 48", "G4", 65, 0.4, "1950 / 55", 1.3],
  ["YAFI MF-AU-492/492/48-ZW", "492 × 492 × 48", "G4", 65, 0.5, "2600 / 55", 1.6],
  ["YAFI MF-AU-492/625/48-ZW", "492 × 625 × 48", "G4", 65, 0.62, "3000 / 55", 2],
  ["YAFI MF-AU-287/592/48-ZW", "287 × 592 × 48", "G4", 65, 0.34, "1700 / 55", 1.2],
  ["YAFI MF-AU-492/592/48-ZW", "492 × 592 × 48", "G4", 65, 0.6, "2820 / 55", 1.8],
  ["YAFI MF-AU-592/592/48-ZW", "592 × 592 × 48", "G4", 65, 0.7, "3400 / 55", 2.1],
  "96-ZW",
  ["YAFI MF-AU-287/287/96-ZW", "287 × 287 × 96", "G4", 65, 0.25, "1060 / 40", 1.2],
  ["YAFI MF-AU-392/492/96-ZW", "392 × 492 × 96", "G4", 65, 0.6, "2400 / 40", 2.3],
  ["YAFI MF-AU-492/492/96-ZW", "492 × 492 × 96", "G4", 65, 0.75, "3000 / 40", 2.6],
  ["YAFI MF-AU-492/625/96-ZW", "492 × 625 × 96", "G4", 65, 0.95, "3600 / 40", 3.2],
  ["YAFI MF-AU-287/592/96-ZW", "287 × 592 × 96", "G4", 65, 0.5, "2125 / 40", 2],
  ["YAFI MF-AU-492/592/96-ZW", "492 × 592 × 96", "G4", 65, 0.9, "3500 / 40", 3.2],
  ["YAFI MF-AU-592/592/96-ZW", "592 × 592 × 96", "G4", 65, 1.1, "4250 / 40", 3.9],
];

/** Filteri za masti sa pletenim mrežnim okvirom – YAFI MF. */
const greaseMeshRows: PanelEntry[] = [
  "20-G2",
  ["YAFI MF AU-287/287/20-G3", "287 × 287 × 20", "G3", 50, 0.1, "850 / 45", 1],
  ["YAFI MF AU-400/500/20-G3", "400 × 500 × 20", "G3", 50, 0.25, "1850 / 45", 3],
  ["YAFI MF AU-495/495/20-G3", "495 × 495 × 20", "G3", 50, 0.25, "2400 / 45", 3.1],
  ["YAFI MF AU-495/620/20-G3", "495 × 620 × 20", "G3", 50, 0.3, "3000 / 45", 3.3],
  ["YAFI MF AU-287/592/20-G3", "287 × 592 × 20", "G3", 50, 0.17, "1700 / 45", 1.8],
  ["YAFI MF AU-490/592/20-G3", "490 × 592 × 20", "G3", 50, 0.3, "2500 / 45", 3.2],
  ["YAFI MF AU-592/592/20-G3", "592 × 592 × 20", "G3", 50, 0.35, "3400 / 45", 3.4],
  "48-G2",
  ["YAFI MF AU-287/287/48-G3", "287 × 287 × 48", "G3", 50, 0.1, "850 / 55", 1.2],
  ["YAFI MF AU-400/500/48-G3", "400 × 500 × 48", "G3", 50, 0.25, "1850 / 55", 3.2],
  ["YAFI MF AU-495/495/48-G3", "495 × 495 × 48", "G3", 50, 0.25, "2400 / 55", 3.4],
  ["YAFI MF AU-495/620/48-G3", "495 × 620 × 48", "G3", 50, 0.3, "3000 / 55", 3.7],
  ["YAFI MF AU-287/592/48-G3", "287 × 592 × 48", "G3", 50, 0.17, "1700 / 55", 2.1],
  ["YAFI MF AU-490/592/48-G3", "490 × 592 × 48", "G3", 50, 0.3, "2500 / 55", 3.6],
  ["YAFI MF AU-592/592/48-G3", "592 × 592 × 48", "G3", 50, 0.35, "3400 / 55", 3.8],
];

/** Kertridži sa aktivnim ugljem – YAFI MF. Three separate listings. */
const cartridgeSetRows: FigureEntry[] = [
  ["CARBOSORB GA450 - 1/4", "305 × 305 × 40", "AC", 9.6, 850, 150, 11],
  ["CARBOSORB GA450 - 1/2", "305 × 610 × 40", "AC", 19.2, 1700, 150, 22.5],
  ["CARBOSORB GA450 - 3/4", "508 × 610 × 40", "AC", 29, 2550, 150, 34],
  ["CARBOSORB GA450 - 1/1", "610 × 610 × 40", "AC", 39, 3400, 150, 44.5],
];

const cartridgeSpareHead: Record<Locale, string[]> = {
  sr: [
    "Oznaka proizvoda",
    "Prečnik OD / ID (mm)",
    "Dužina (mm)",
    "Protok vazduha (m³/h)",
    "Početni pad pritiska (Pa)",
    "Težina uglja (kg)",
    "Ukupna težina (kg)",
  ],
  en: [
    "Product code",
    "Diameter OD / ID (mm)",
    "Length (mm)",
    "Air flow (m³/h)",
    "Initial pressure drop (Pa)",
    "Carbon weight (kg)",
    "Total weight (kg)",
  ],
};

const cartridgeSpareRows: FigureEntry[] = [
  ["YAFI MF-AU-145/250", "145 / 88", 250, 85, 80, 1.4, 2.2],
  ["YAFI MF-AU-145/450", "145 / 88", 450, 210, 270, 2.4, 3.9],
  ["YAFI MF-AU-145/600", "145 / 88", 600, 210, 145, 3.4, 5.5],
];

const cartridgeFrameHead: Record<Locale, string[]> = {
  sr: [
    "Oznaka proizvoda",
    "Dimenzije (W×H×D)",
    "Broj kertridža",
    "Težina (kg)",
  ],
  en: ["Product code", "Dimensions (W×H×D)", "Cartridge count", "Weight (kg)"],
};

const cartridgeFrameRows: FigureEntry[] = [
  ["FT-GA-ST-04-305/305/40", "305 × 305 × 70", 4, 1.5],
  ["FT-GA-ST-08-305/305/40", "305 × 610 × 70", 8, 3],
  ["FT-GA-ST-12-305/305/40", "508 × 610 × 70", 12, 5],
  ["FT-GA-ST-16-305/305/40", "610 × 610 × 70", 16, 5.5],
];

/** Kertridži sa aktivnim ugljem – model B – YAFI MF. */
const cartridgeBSetRows: FigureEntry[] = [
  ["CARBOSORB GB400 - 1/4", "305 × 305 × 40", "AC", 1.2, 850, 270, 13.8],
  ["CARBOSORB GB400 - 1/2", "305 × 610 × 40", "AC", 24, 1700, 270, 27.5],
  ["CARBOSORB GB400 - 3/4", "508 × 610 × 40", "AC", 36, 2250, 270, 41.5],
  ["CARBOSORB GB400 - 1/1", "610 × 610 × 40", "AC", 48, 3400, 270, 54],
];

const cartridgeBSpareRows: FigureEntry[] = [
  ["YAFI MF-AU-140/250", "140 / 68", 250, 85, null, 1.9, 2.6],
  ["YAFI MF-AU-140/400", "140 / 68", 400, 210, 270, 3, 4.1],
  ["YAFI MF-AU-140/600", "140 / 68", 600, 210, 145, 4.5, 6.1],
];

const cartridgeBFrameRows: FigureEntry[] = [
  ["FT-GB-SV-04-305/305/40", "305 × 305 × 70", 4, 1.8],
  ["FT-GB-SV-08-305/610/40", "305 × 610 × 70", 8, 3.5],
  ["FT-GB-SV-12-508/610/40", "508 × 610 × 70", 12, 5.5],
  ["FT-GB-SV-16-610/610/40", "610 × 610 × 70", 16, 6],
];

/** Ramovi i iner frejmovi za filtere – YAFI. */
const filterFrameHead: Record<Locale, string[]> = {
  sr: [
    "Oznaka proizvoda",
    "Dimenzije rama (W×H×D)",
    "Dimenzije filtera",
    "Dostupne dubine filtera (mm)",
  ],
  en: [
    "Product code",
    "Frame dimensions (W×H×D)",
    "Filter dimensions",
    "Available filter depths (mm)",
  ],
};

const filterFrameRows: FigureEntry[] = [
  "75 mm",
  ["FK-G75-XX-305/305/75", "305 × 305 × 75", "287 × 287", "25, 48"],
  ["FK-G75-XX-305/610/75", "305 × 610 × 75", "287 × 592", "25, 48"],
  ["FK-G75-XX-508/610/75", "508 × 610 × 75", "490 × 592", "25, 48"],
  ["FK-G75-XX-610/610/75", "610 × 610 × 75", "592 × 592", "25, 48"],
  "100 mm",
  [
    "FK-G100-XX-305/305/100",
    "305 × 305 × 100",
    "287 × 287",
    "25, 48, 75 / 25 + 48",
  ],
  [
    "FK-G100-XX-305/610/100",
    "305 × 610 × 100",
    "287 × 592",
    "25, 48, 75 / 25 + 48",
  ],
  [
    "FK-G100-XX-508/610/100",
    "508 × 610 × 100",
    "490 × 592",
    "25, 48, 75 / 25 + 48",
  ],
  [
    "FK-G100-XX-610/610/100",
    "610 × 610 × 100",
    "592 × 592",
    "25, 48, 75 / 25 + 48",
  ],
  "125 mm",
  [
    "FK-G125-XX-305/305/125",
    "305 × 305 × 125",
    "287 × 287",
    "25, 48, 75, 96 / 25 + 48 / 25 + 75",
  ],
  [
    "FK-G125-XX-305/610/125",
    "305 × 610 × 125",
    "287 × 592",
    "25, 48, 75, 96 / 25 + 48 / 25 + 75",
  ],
  [
    "FK-G125-XX-508/610/125",
    "508 × 610 × 125",
    "490 × 592",
    "25, 48, 75, 96 / 25 + 48 / 25 + 75",
  ],
  [
    "FK-G125-XX-610/610/125",
    "610 × 610 × 125",
    "592 × 592",
    "25, 48, 75, 96 / 25 + 48 / 25 + 75",
  ],
];

/** Metalni okvir kuhinjske nape – YAFI PF. */
const kitchenHoodRows: PanelEntry[] = [
  "20-G2",
  ["YAFI PF-287/287/20-G2", "287 × 287 × 20", "G2", 40, 0.12, "850 / 25", 0.65],
  ["YAFI PF-400/500/20-G2", "400 × 500 × 20", "G2", 40, 0.35, "1850 / 25", 1.9],
  ["YAFI PF-495/495/20-G2", "495 × 495 × 20", "G2", 40, 0.45, "2400 / 25", 2],
  ["YAFI PF-495/620/20-G2", "495 × 620 × 20", "G2", 40, 0.55, "3000 / 25", 2.3],
  ["YAFI PF-287/592/20-G2", "287 × 592 × 20", "G2", 40, 0.35, "1700 / 25", 1.2],
  ["YAFI PF-490/592/20-G2", "490 × 592 × 20", "G2", 40, 0.55, "2500 / 25", 2.2],
  ["YAFI PF-592/592/20-G2", "592 × 592 × 20", "G2", 40, 0.6, "3400 / 25", 2.3],
  "48-G2",
  ["YAFI PF-287/287/48-G2", "287 × 287 × 48", "G2", 40, 0.2, "850 / 30", 0.75],
  ["YAFI PF-400/500/48-G2", "400 × 500 × 48", "G2", 40, 0.45, "1850 / 30", 2],
  ["YAFI PF-495/495/48-G2", "495 × 495 × 48", "G2", 40, 0.55, "2400 / 30", 2.2],
  ["YAFI PF-495/620/48-G2", "495 × 620 × 48", "G2", 40, 0.7, "3000 / 30", 2.5],
  ["YAFI PF-287/592/48-G2", "287 × 592 × 48", "G2", 40, 0.42, "1700 / 30", 1.4],
  ["YAFI PF-490/592/48-G2", "490 × 592 × 48", "G2", 40, 0.65, "2500 / 30", 2.4],
  ["YAFI PF-592/592/48-G2", "592 × 592 × 48", "G2", 40, 0.8, "3400 / 30", 2.5],
];

/** Aluminijumski separator filteri – YAFI RF. Printed without a class column. */
const rigidSeparatorRows: RigidEntry[] = [
  "M6",
  ["YAFI RF-287/592/292-M6", "287 × 592 × 292", "M6", "ePM10 65%", 7, "1700 / 110 Pa", 6],
  ["YAFI RF-490/592/292-M6", "490 × 592 × 292", "M6", "ePM10 65%", 11, "2500 / 110 Pa", 9],
  ["YAFI RF-592/592/292-M6", "592 × 592 × 292", "M6", "ePM10 65%", 14, "3400 / 110 Pa", 10],
  ["YAFI RF-305/610/292-M6", "305 × 610 × 292", "M6", "ePM10 65%", 7, "2125 / 135 Pa", 6],
  ["YAFI RF-490/610/292-M6", "490 × 610 × 292", "M6", "ePM10 65%", 11, "3400 / 135 Pa", 9],
  ["YAFI RF-610/610/292-M6", "610 × 610 × 292", "M6", "ePM10 65%", 14, "4250 / 135 Pa", 10],
  "F7",
  ["YAFI RF-287/592/292-F7", "287 × 592 × 292", "F7", "ePM1 55%", 7, "1700 / 125 Pa", 6],
  ["YAFI RF-490/592/292-F7", "490 × 592 × 292", "F7", "ePM1 55%", 11, "2500 / 125 Pa", 9],
  ["YAFI RF-592/592/292-F7", "592 × 592 × 292", "F7", "ePM1 55%", 14, "3400 / 125 Pa", 10],
  ["YAFI RF-305/610/292-F7", "305 × 610 × 292", "F7", "ePM1 55%", 7, "2125 / 145 Pa", 6],
  ["YAFI RF-490/610/292-F7", "490 × 610 × 292", "F7", "ePM1 55%", 11, "3400 / 145 Pa", 9],
  ["YAFI RF-610/610/292-F7", "610 × 610 × 292", "F7", "ePM1 55%", 14, "4250 / 145 Pa", 10],
  "F8",
  ["YAFI RF-287/592/292-F7", "287 × 592 × 292", "F8", "ePM1 65%", 7, "1700 / 135 Pa", 6],
  ["YAFI RF-490/592/292-F7", "490 × 592 × 292", "F8", "ePM1 65%", 11, "2500 / 135 Pa", 9],
  ["YAFI RF-592/592/292-F7", "592 × 592 × 292", "F8", "ePM1 65%", 14, "3400 / 135 Pa", 10],
  ["YAFI RF-305/610/292-F7", "305 × 610 × 292", "F8", "ePM1 65%", 7, "2125 / 155 Pa", 6],
  ["YAFI RF-490/610/292-F7", "490 × 610 × 292", "F8", "ePM1 65%", 11, "3400 / 155 Pa", 9],
  ["YAFI RF-610/610/292-F7", "610 × 610 × 292", "F8", "ePM1 65%", 14, "4250 / 155 Pa", 10],
  "F9",
  ["YAFI RF-287/592/292-F7", "287 × 592 × 292", "F9", "ePM1 80%", 7, "1700 / 155 Pa", 6],
  ["YAFI RF-490/592/292-F7", "490 × 592 × 292", "F9", "ePM1 80%", 11, "2500 / 155 Pa", 9],
  ["YAFI RF-592/592/292-F7", "592 × 592 × 292", "F9", "ePM1 80%", 14, "3400 / 155 Pa", 10],
  ["YAFI RF-305/610/292-F7", "305 × 610 × 292", "F9", "ePM1 80%", 7, "2125 / 175 Pa", 6],
  ["YAFI RF-490/610/292-F7", "490 × 610 × 292", "F9", "ePM1 80%", 11, "3400 / 175 Pa", 9],
  ["YAFI RF-610/610/292-F7", "610 × 610 × 292", "F9", "ePM1 80%", 14, "4250 / 175 Pa", 10],
];

/** Rigidni panelni filter – aluminijumski okvir – YAFI RF. */
const rigidAluminiumRows: RigidEntry[] = [
  "M6 · ePM10 65%",
  ["YAFI RF-287/592/130-M6", "287 × 592 × 130", "M6", "ePM10 65%", 6.4, "1500 / 90", 3.2],
  ["YAFI RF-490/592/130-M6", "490 × 592 × 130", "M6", "ePM10 65%", 10.5, "2500 / 90", 4.8],
  ["YAFI RF-592/592/130-M6", "592 × 592 × 130", "M6", "ePM10 65%", 13, "3000 / 90", 5.7],
  "F7 · ePM1 50%",
  ["YAFI RF-287/592/130-F7", "287 × 592 × 130", "F7", "ePM1 50%", 6.4, "1500 / 110", 3.2],
  ["YAFI RF-490/592/130-F7", "490 × 592 × 130", "F7", "ePM1 50%", 10.5, "2500 / 110", 4.8],
  ["YAFI RF-592/592/130-F7", "592 × 592 × 130", "F7", "ePM1 50%", 13, "3000 / 110", 5.7],
  "F8 · ePM1 65%",
  ["YAFI RF-287/592/130-F8", "287 × 592 × 130", "F8", "ePM1 65%", 6.4, "1500 / 140", 3.2],
  ["YAFI RF-490/592/130-F8", "490 × 592 × 130", "F8", "ePM1 65%", 10.5, "2500 / 140", 4.8],
  ["YAFI RF-592/592/130-F8", "592 × 592 × 130", "F8", "ePM1 65%", 13, "3000 / 140", 5.7],
  "F9 · ePM1 80%",
  ["YAFI RF-287/592/130-F9", "287 × 592 × 130", "F9", "ePM1 80%", 6.4, "1500 / 175", 3.2],
  ["YAFI RF-490/592/130-F9", "490 × 592 × 130", "F9", "ePM1 80%", 10.5, "2500 / 175", 4.8],
  ["YAFI RF-592/592/130-F9", "592 × 592 × 130", "F9", "ePM1 80%", 13, "3000 / 175", 5.7],
];

/** Rigidni panelni filter – metalni okvir sa zaglavljem – YAFI RF. */
const rigidHeaderRows: RigidEntry[] = [
  "M6 · ePM10 65%",
  ["YAFI RF-287/592/88-M6", "287 × 592 × 88", "M6", "ePM10 65%", 4.5, "1500 / 100", 3],
  ["YAFI RF-490/592/88-M6", "490 × 592 × 88", "M6", "ePM10 65%", 7.6, "2500 / 100", 4.5],
  ["YAFI RF-592/592/88-M6", "592 × 592 × 88", "M6", "ePM10 65%", 9, "3000 / 100", 5],
  "F7 · ePM1 50%",
  ["YAFI RF-287/592/88-F7", "287 × 592 × 88", "F7", "ePM1 50%", 6.4, "1500 / 125", 3],
  ["YAFI RF-490/592/88-F7", "490 × 592 × 88", "F7", "ePM1 50%", 10.5, "2500 / 125", 4.5],
  ["YAFI RF-592/592/88-F7", "592 × 592 × 88", "F7", "ePM1 50%", 13, "3000 / 125", 5],
  "F8 · ePM1 65%",
  ["YAFI RF-287/592/88-F8", "287 × 592 × 88", "F8", "ePM1 65%", 6.4, "1500 / 150", 3],
  ["YAFI RF-490/592/88-F8", "490 × 592 × 88", "F8", "ePM1 65%", 10.5, "2500 / 150", 4.5],
  ["YAFI RF-592/592/88-F8", "592 × 592 × 88", "F8", "ePM1 65%", 13, "3000 / 150", 5],
  "F9 · ePM1 80%",
  ["YAFI RF-287/592/88-F9", "287 × 592 × 88", "F9", "ePM1 80%", 6.4, "1500 / 170", 3],
  ["YAFI RF-490/592/88-F9", "490 × 592 × 88", "F9", "ePM1 80%", 10.5, "2500 / 170", 4.5],
  ["YAFI RF-592/592/88-F9", "592 × 592 × 88", "F9", "ePM1 80%", 13, "3000 / 170", 5],
];

/** Rigidni panelni filter – plastični okvir – YAFI RF. */
const rigidPlasticRows: RigidEntry[] = [
  "M6 · 48 / 96",
  ["YAFI RF-287/592/48-M6", "287 × 592 × 48", "M6", "ePM10 65%", 3, "1000 / 65", 1.4],
  ["YAFI RF-490/592/48-M6", "490 × 592 × 48", "M6", "ePM10 65%", 5, "1660 / 65", 2.2],
  ["YAFI RF-592/592/48-M6", "592 × 592 × 48", "M6", "ePM10 65%", 6, "2000 / 65", 2.5],
  ["YAFI RF-287/592/96-M6", "287 × 592 × 96", "M6", "ePM10 65%", 6, "1500 / 75", 1.9],
  ["YAFI RF-490/592/96-M6", "490 × 592 × 96", "M6", "ePM10 65%", 10, "2500 / 75", 3.2],
  ["YAFI RF-592/592/96-M6", "592 × 592 × 96", "M6", "ePM10 65%", 12, "3000 / 75", 3.4],
  "F7 · 48 / 96",
  ["YAFI RF-287/592/48-F7", "287 × 592 × 48", "F7", "ePM1 50%", 3, "1000", 1.4],
  ["YAFI RF-490/592/48-F7", "490 × 592 × 48", "F7", "ePM1 50%", 5, "1660", 2.2],
  ["YAFI RF-592/592/48-F7", "592 × 592 × 48", "F7", "ePM1 50%", 6, "2000", 2.5],
  ["YAFI RF-287/592/96-F7", "287 × 592 × 96", "F7", "ePM1 50%", 6, "1500 / 85", 1.9],
  ["YAFI RF-490/592/96-F7", "490 × 592 × 96", "F7", "ePM1 50%", 10, "2500 / 85", 3.2],
  ["YAFI RF-592/592/96-F7", "592 × 592 × 96", "F7", "ePM1 50%", 12, "3000 / 85", 3.4],
  "F8 · 48 / 96",
  ["YAFI RF-287/592/48-F8", "287 × 592 × 48", "F8", "ePM1 65%", 3, "1000 / 100", 1.4],
  ["YAFI RF-490/592/48-F8", "490 × 592 × 48", "F8", "ePM1 65%", 5, "1660 / 100", 2.2],
  ["YAFI RF-592/592/48-F8", "592 × 592 × 48", "F8", "ePM1 65%", 6, "2000 / 100", 2.5],
  ["YAFI RF-287/592/96-F8", "287 × 592 × 96", "F8", "ePM1 65%", 6, "1500 / 105", 1.9],
  ["YAFI RF-490/592/96-F8", "490 × 592 × 96", "F8", "ePM1 65%", 10, "2500 / 105", 3.2],
  ["YAFI RF-592/592/96-F8", "592 × 592 × 96", "F8", "ePM1 65%", 12, "3000 / 105", 3.4],
  "F9 · 48 / 96",
  ["YAFI RF-287/592/48-F9", "287 × 592 × 48", "F9", "ePM1 80%", 3, "1000 / 140", 1.4],
  ["YAFI RF-490/592/48-F9", "490 × 592 × 48", "F9", "ePM1 80%", 5, "1660 / 140", 2.2],
  ["YAFI RF-592/592/48-F9", "592 × 592 × 48", "F9", "ePM1 80%", 6, "2000 / 140", 2.5],
  ["YAFI RF-287/592/96-F9", "287 × 592 × 96", "F9", "ePM1 80%", 6, "1500 / 145", 1.9],
  ["YAFI RF-490/592/96-F9", "490 × 592 × 96", "F9", "ePM1 80%", 10, "2500 / 145", 3.2],
  ["YAFI RF-592/592/96-F9", "592 × 592 × 96", "F9", "ePM1 80%", 12, "3000 / 145", 3.4],
];

/** Rigidni panelni filter – plastični okvir sa zaglavljem – YAFI RF. */
const rigidPlasticHeaderRows: RigidEntry[] = [
  "M6 · ePM10 65%",
  ["YAFI RF-287/592/130-M6", "287 × 592 × 130", "M6", "ePM10 65%", 3.2, "1125 / 90", 1.8],
  ["YAFI RF-490/592/130-M6", "490 × 592 × 130", "M6", "ePM10 65%", 5, "1900 / 90", 3.1],
  ["YAFI RF-592/592/130-M6", "592 × 592 × 130", "M6", "ePM10 65%", 6.5, "2250 / 90", 3],
  ["YAFI RF-287/592/130-M6", "287 × 592 × 130", "M6", "ePM10 65%", 6.4, "1700 / 120", 2],
  ["YAFI RF-490/592/130-M6", "490 × 592 × 130", "M6", "ePM10 65%", 10.5, "2750 / 120", 3.6],
  ["YAFI RF-592/592/130-M6", "592 × 592 × 130", "M6", "ePM10 65%", 13, "3400 / 120", 3.5],
  "F7 · ePM1 50%",
  ["YAFI RF-287/592/130-F7", "287 × 592 × 130", "F7", "ePM1 50%", 3.2, "1125 / 100", 2.5],
  ["YAFI RF-490/592/130-F7", "490 × 592 × 130", "F7", "ePM1 50%", 5, "1900 / 100", 3.6],
  ["YAFI RF-592/592/130-F7", "592 × 592 × 130", "F7", "ePM1 50%", 6.5, "2250 / 100", 4],
  ["YAFI RF-287/592/130-F7", "287 × 592 × 130", "F7", "ePM1 50%", 6.4, "1500 / 90", 2.5],
  ["YAFI RF-490/592/130-F7", "490 × 592 × 130", "F7", "ePM1 50%", 10.5, "2500 / 90", 4.1],
  ["YAFI RF-592/592/130-F7", "592 × 592 × 130", "F7", "ePM1 50%", 13, "3000 / 90", 4.5],
  "F8 · ePM1 65%",
  ["YAFI RF-287/592/130-F8", "287 × 592 × 130", "F8", "ePM1 65%", 3.2, "1125 / 120", 1.8],
  ["YAFI RF-490/592/130-F8", "490 × 592 × 130", "F8", "ePM1 65%", 5, "1900 / 120", 3.1],
  ["YAFI RF-592/592/130-F8", "592 × 592 × 130", "F8", "ePM1 65%", 6.5, "2250 / 120", 3],
  ["YAFI RF-287/592/130-F8", "287 × 592 × 130", "F8", "ePM1 65%", 6.4, "1700 / 135", 2],
  ["YAFI RF-490/592/130-F8", "490 × 592 × 130", "F8", "ePM1 65%", 10.5, "2750 / 135", 3.6],
  ["YAFI RF-592/592/130-F8", "592 × 592 × 130", "F8", "ePM1 65%", 13, "3400 / 135", 3.5],
  "F9 · ePM1 80%",
  ["YAFI RF-287/592/130-F9", "287 × 592 × 130", "F9", "ePM1 80%", 3.2, "1125 / 145", 1.8],
  ["YAFI RF-490/592/130-F9", "490 × 592 × 130", "F9", "ePM1 80%", 5, "1900 / 145", 3.1],
  ["YAFI RF-592/592/130-F9", "592 × 592 × 130", "F9", "ePM1 80%", 6.5, "2250 / 145", 3],
  ["YAFI RF-287/592/130-F9", "287 × 592 × 130", "F9", "ePM1 80%", 6.4, "1700 / 150", 2],
  ["YAFI RF-490/592/130-F9", "490 × 592 × 130", "F9", "ePM1 80%", 10.5, "2750 / 150", 3.6],
  ["YAFI RF-592/592/130-F9", "592 × 592 × 130", "F9", "ePM1 80%", 13, "3400 / 150", 3.5],
];

/** Rigidni vrećasti filter – metalni okvir 4V – YAFI RF. */
const rigidBag4VMetalRows: RigidEntry[] = [
  "292 · M6",
  ["YAFI RF-287/592/292-M6", "287 × 592 × 292", "M6", "ePM10 65%", 9, "1750 / 65", 9],
  ["YAFI RF-490/592/292-M6", "490 × 592 × 292", "M6", "ePM10 65%", 14.5, "2800 / 65", 11],
  ["YAFI RF-592/592/292-M6", "592 × 592 × 292", "M6", "ePM10 65%", 18, "3400 / 65", 12.5],
  "292 · F7",
  ["YAFI RF-287/592/292-F7", "287 × 592 × 292", "F7", "ePM1 50%", 9, "1750 / 80", 9],
  ["YAFI RF-490/592/292-F7", "490 × 592 × 292", "F7", "ePM1 50%", 14.5, "2800 / 80", 11],
  ["YAFI RF-592/592/292-F7", "592 × 592 × 292", "F7", "ePM1 50%", 18, "3400 / 80", 12.5],
  "292 · F8",
  ["YAFI RF-287/592/292-F8", "287 × 592 × 292", "F8", "ePM1 65%", 9, "1750 / 95", 9],
  ["YAFI RF-490/592/292-F8", "490 × 592 × 292", "F8", "ePM1 65%", 14.5, "2800 / 95", 11],
  ["YAFI RF-592/592/292-F8", "592 × 592 × 292", "F8", "ePM1 65%", 18, "3400 / 95", 12.5],
  "292 · F9",
  ["YAFI RF-287/592/292-F9", "287 × 592 × 292", "F9", "ePM1 80%", 9, "1750 / 115", 9],
  ["YAFI RF-490/592/292-F9", "490 × 592 × 292", "F9", "ePM1 80%", 14.5, "2800 / 115", 11],
  ["YAFI RF-592/592/292-F9", "592 × 592 × 292", "F9", "ePM1 80%", 18, "3400 / 115", 12.5],
];

/** Rigidni vrećasti filter – plastični okvir 4V | Energy – YAFI RF. */
const rigidBag4VEnergyRows: RigidEntry[] = [
  "292 · M6",
  ["YAFI RF-287/592/292-M6", "287 × 592 × 292", "M6", "ePM10 65%", 10, "1700 / 65", 6.5],
  ["YAFI RF-490/592/292-M6", "490 × 592 × 292", "M6", "ePM10 65%", 16, "2800 / 65", 8],
  ["YAFI RF-592/592/292-M6", "592 × 592 × 292", "M6", "ePM10 65%", 20, "3400 / 65", 9.5],
  "292 · F7",
  ["YAFI RF-287/592/292-F7", "287 × 592 × 292", "F7", "ePM1 50%", 10, "1700 / 75", 6.5],
  ["YAFI RF-490/592/292-F7", "490 × 592 × 292", "F7", "ePM1 50%", 16, "2800 / 75", 8],
  ["YAFI RF-592/592/292-F7", "592 × 592 × 292", "F7", "ePM1 50%", 20, "3400 / 75", 9.5],
  "292 · F8",
  ["YAFI RF-287/592/292-F8", "287 × 592 × 292", "F8", "ePM1 65%", 10, "17000 / 85", 6.5],
  ["YAFI RF-490/592/292-F8", "490 × 592 × 292", "F8", "ePM1 65%", 16, "2800 / 85", 8],
  ["YAFI RF-592/592/292-F8", "592 × 592 × 292", "F8", "ePM1 65%", 20, "3400 / 85", 9.5],
  "292 · F9",
  ["YAFI RF-287/592/292-F9", "287 × 592 × 292", "F9", "ePM1 80%", 10, "1700 / 95", 6.5],
  ["YAFI RF-490/592/292-F9", "490 × 592 × 292", "F9", "ePM1 80%", 16, "2800 / 95", 8],
  ["YAFI RF-592/592/292-F9", "592 × 592 × 292", "F9", "ePM1 80%", 20, "3400 / 95", 9.5],
];

/** Rigidni vrećasti filter – plastični okvir 4V | Max Flow – YAFI RF. */
const rigidBag4VMaxFlowRows: RigidEntry[] = [
  "292 · M6",
  ["YAFI RF-287/592/292-M6", "287 × 592 × 292", "M6", "ePM10 65%", 10, "1700 / 65", 6.5],
  ["YAFI RF-490/592/292-M6", "490 × 592 × 292", "M6", "ePM10 65%", 16, "2800 / 65", 8],
  ["YAFI RF-592/592/292-M6", "592 × 592 × 292", "M6", "ePM10 65%", 20, "3400 / 65", 9.5],
  "292 · F7",
  ["YAFI RF-287/592/292-F7", "287 × 592 × 292", "F7", "ePM1 50%", 10, "1700 / 75", 6.5],
  ["YAFI RF-490/592/292-F7", "490 × 592 × 292", "F7", "ePM1 50%", 16, "2800 / 75", 8],
  ["YAFI RF-592/592/292-F7", "592 × 592 × 292", "F7", "ePM1 50%", 20, "3400 / 75", 9.5],
  "292 · F8",
  ["YAFI RF-287/592/292-F8", "287 × 592 × 292", "F8", "ePM1 65%", 10, "1700 / 85", 6.5],
  ["YAFI RF-490/592/292-F8", "490 × 592 × 292", "F8", "ePM1 65%", 16, "2800 / 85", 8],
  ["YAFI RF-592/592/292-F8", "592 × 592 × 292", "F8", "ePM1 65%", 20, "3400 / 85", 9.5],
  "292 · F9",
  ["YAFI RF-287/592/292-F9", "287 × 592 × 292", "F9", "ePM1 80%", 10, "1700 / 95", 6.5],
  ["YAFI RF-490/592/292-F9", "490 × 592 × 292", "F9", "ePM1 80%", 16, "2800 / 95", 8],
  ["YAFI RF-592/592/292-F9", "592 × 592 × 292", "F9", "ePM1 80%", 20, "3400 / 95", 9.5],
];

/** Rigidni vrećasti filter – plastični okvir 4V | Standard – YAFI RF. */
const rigidBag4VStandardRows: RigidEntry[] = [
  "M6 · ePM10 65%",
  ["YAFI RF-287/592/292-M6", "287 × 592 × 292", "M6", "ePM10 65%", 9, "1750 / 65", 3.5],
  ["YAFI RF-490/592/292-M6", "490 × 592 × 292", "M6", "ePM10 65%", 14.5, "2800 / 65", 5.4],
  ["YAFI RF-592/592/292-M6", "592 × 592 × 292", "M6", "ePM10 65%", 18, "3400 / 65", 6.5],
  "F7 · ePM1 50%",
  ["YAFI RF-287/592/292-F7", "287 × 592 × 292", "F7", "ePM1 50%", 9, "1750", 3.5],
  ["YAFI RF-490/592/292-F7", "490 × 592 × 292", "F7", "ePM1 50%", 14.5, "2800", 5.4],
  ["YAFI RF-592/592/292-F7", "592 × 592 × 292", "F7", "ePM1 50%", 18, "3400", 6.5],
  "F8 · ePM1 65%",
  ["YAFI RF-287/592/292-F8", "287 × 592 × 292", "F8", "ePM1 65%", 9, "1750 / 95", 3.5],
  ["YAFI RF-490/592/292-F8", "490 × 592 × 292", "F8", "ePM1 65%", 14.5, "2800 / 95", 5.4],
  ["YAFI RF-592/592/292-F8", "592 × 592 × 292", "F8", "ePM1 65%", 18, "3400 / 95", 6.5],
  "F9 · ePM1 80%",
  ["YAFI RF-287/592/292-F9", "287 × 592 × 292", "F9", "ePM1 80%", 9, "1750 / 115", 3.5],
  ["YAFI RF-490/592/292-F9", "490 × 592 × 292", "F9", "ePM1 80%", 14.5, "2800 / 115", 5.4],
  ["YAFI RF-592/592/292-F9", "592 × 592 × 292", "F9", "ePM1 80%", 18, "3400 / 115", 6.5],
];

/**
 * The M5 synthetic fibre media is listed under two categories — filter
 * materials and paint-shop filters. Only the photo differs between the two
 * entries, so the copy lives here once and both spread it with their own
 * `image`; `primaryCategorySlug` decides which of the two URLs is canonical.
 */
const srSyntheticM5: ProductItem = {
  slug: "sinteticka-vlakna-m5",
  name: "Filteri od sintetičkih vlakana – M5 – YAFI FM",
  label: "Sintetička vlakna · M5",
  sku: "YAFI FM-5",
  intro:
    "Filteri od sintetičkih vlakana sastoje se od superfinih, termički povezanih poliesterskih vlakana, navlaženih vezivnim aktivnim sredstvom, a njihova čista vazdušna strana ojačana je rešetkasto strukturiranom tkaninom. Višeslojna struktura i progresivna gustina pružaju veoma visoke standarde čistoće vazduha. Ne sadrži silikon ili druge štetne supstance.",
  standards: [
    "Klase G3 – G4 – EN 779",
    "Grubost 30 – 65% – ISO 16890",
    "Zapaljivost F1 – DIN 53438",
    "Bez silikona i štetnih supstanci",
  ],
  sections: [
    {
      heading: "Filteri od sintetičkih vlakana – M5 – Opis",
      body: [
        "Filteri od sintetičkih vlakana sastoje se od superfinih, termički povezanih poliesterskih vlakana, navlaženih vezivnim aktivnim sredstvom, a njihova čista vazdušna strana ojačana je rešetkasto strukturiranom tkaninom. Višeslojna struktura i progresivna gustina pružaju veoma visoke standarde čistoće vazduha.",
        "Ne sadrži silikon ili druge štetne supstance.",
      ],
    },
    {
      heading: "Primena",
      body: [
        "Za konačnu filtraciju dovodnog vazduha u jedinicama za farbanje i prskanje bojom.",
      ],
    },
    {
      heading: "Prednosti",
      list: [
        "Proizvedeno od super dugačkih i protivlomljivih sintetičkih vlakana",
        "Sintetički mediji se nanose čvrstim lepkovima",
        "Površina je pričvršćena mrežama od fiberglasa visokog intenziteta",
        "Ravnomerno raspoređuje protok vazduha u celom radnom prostoru",
        "Dostupno u rolnama ili izrezano po meri",
      ],
    },
    {
      heading: "YAFI FM",
      table: {
        head: ["Oznaka", "Kod", "Značenje"],
        rows: [
          ["Tip filtera", "RF", "Rol Filter"],
          ["Sastav", "CE", "Staklena vlakna"],
          ["Model", "PS YAFI FM"],
          ["Dimenzije", "–", "W × H"],
          ["Efikasnost", "G3", "EN 779"],
          ["", "Grubost 65%", "ISO 16890"],
        ],
      },
    },
    {
      heading: "Tehničke karakteristike",
      table: {
        head: ["TYPE", "PS250", "PS500", "PS1000"],
        rows: [
          ["Klasa filtera (EN 779)", "G3", "G3", "G4"],
          [
            "Klasa filtera (ISO 16890)",
            "Grubost 30%",
            "Grubost 40%",
            "Grubost 60%",
          ],
          ["Sastav", "Stakleno vlakno"],
          ["Debljina (mm)", "60", "15 – 18", "20 – 22"],
          ["Težina (g/m²)", "200", "200", "270"],
          ["Nominalna brzina vazduha (m/s)", "1,5", "1,5", "1,5"],
          ["Nominalni protok vazduha (m³/h·m²)", "5400", "5400", "5400"],
          ["Početni pad pritiska (Pa)", "20", "35", "38"],
          ["Finalni pad pritiska (Pa)", "250", "250", "250"],
          [
            "Prosečno zadržavanje raspršene boje (%)",
            "90 – 95",
            "87",
            "91",
          ],
          [
            "Kapacitet zadržavanja prašine (g)",
            "3.000 – 5.000",
            "400",
            "478",
          ],
          [
            "Otpornost na temperaturu (°C)",
            "Stalna temperatura do 100 °C, u piku do 120 °C",
          ],
          ["Zapaljivost (DIN 53438)", "F1", "F1", "F1"],
          [
            "Dimenzija rolne",
            "Standard: 20,00 × 2,00 m – dostupno sečenje po meri",
          ],
          ["Maks. relativna vlažnost", "1", "1", "1"],
        ],
      },
    },
  ],
};

const enSyntheticM5: ProductItem = {
  slug: "sinteticka-vlakna-m5",
  name: "Synthetic fibre media – M5 – YAFI FM",
  label: "Synthetic fibre · M5",
  sku: "YAFI FM-5",
  intro:
    "Synthetic fibre media are made of superfine, thermally bonded polyester fibres wetted with an active binding agent, with the clean air side reinforced by a grid-structured fabric. The multi-layer structure and progressive density deliver very high air cleanliness standards. Free of silicone and other harmful substances.",
  standards: [
    "Classes G3 – G4 – EN 779",
    "Coarse 30 – 65% – ISO 16890",
    "Flammability F1 – DIN 53438",
    "Free of silicone and harmful substances",
  ],
  sections: [
    {
      heading: "Synthetic fibre media – M5 – Description",
      body: [
        "Synthetic fibre media are made of superfine, thermally bonded polyester fibres wetted with an active binding agent, with the clean air side reinforced by a grid-structured fabric. The multi-layer structure and progressive density deliver very high air cleanliness standards.",
        "Free of silicone and other harmful substances.",
      ],
    },
    {
      heading: "Applications",
      body: [
        "For the final filtration of supply air in painting and spray booths.",
      ],
    },
    {
      heading: "Benefits",
      list: [
        "Made from extra-long, break-resistant synthetic fibres",
        "The synthetic media are bonded with firm adhesives",
        "The surface is secured with high-tenacity fibreglass mesh",
        "Distributes the air flow evenly across the whole working area",
        "Available in rolls or cut to size",
      ],
    },
    {
      heading: "YAFI FM",
      table: {
        head: ["Designation", "Code", "Meaning"],
        rows: [
          ["Filter type", "RF", "Roll Filter"],
          ["Composition", "CE", "Glass fibre"],
          ["Model", "PS YAFI FM"],
          ["Dimensions", "–", "W × H"],
          ["Efficiency", "G3", "EN 779"],
          ["", "Coarse 65%", "ISO 16890"],
        ],
      },
    },
    {
      heading: "Technical characteristics",
      table: {
        head: ["TYPE", "PS250", "PS500", "PS1000"],
        rows: [
          ["Filter class (EN 779)", "G3", "G3", "G4"],
          [
            "Filter class (ISO 16890)",
            "Coarse 30%",
            "Coarse 40%",
            "Coarse 60%",
          ],
          ["Composition", "Glass fibre"],
          ["Thickness (mm)", "60", "15 – 18", "20 – 22"],
          ["Weight (g/m²)", "200", "200", "270"],
          ["Nominal air velocity (m/s)", "1.5", "1.5", "1.5"],
          ["Nominal air flow (m³/h·m²)", "5400", "5400", "5400"],
          ["Initial pressure drop (Pa)", "20", "35", "38"],
          ["Final pressure drop (Pa)", "250", "250", "250"],
          ["Average paint overspray arrestance (%)", "90 – 95", "87", "91"],
          ["Dust holding capacity (g)", "3,000 – 5,000", "400", "478"],
          [
            "Temperature resistance (°C)",
            "Continuous up to 100 °C, peaks up to 120 °C",
          ],
          ["Flammability (DIN 53438)", "F1", "F1", "F1"],
          ["Roll dimensions", "Standard: 20.00 × 2.00 m – cut to size available"],
          ["Max. relative humidity", "1", "1", "1"],
        ],
      },
    },
  ],
};

/** Also listed under two categories — see the note on `srSyntheticM5`. */
const srGlassFibre: ProductItem = {
  slug: "staklena-vlakna",
  name: "Filteri od staklenih vlakana – YAFI FM",
  label: "Staklena vlakna",
  sku: "YAFI FM-4",
  intro:
    "Filteri od staklenih vlakana su progresivno strukturirani filtracioni mediji od staklenih vlakana, posebno dizajnirani za filtraciju čestica boje i laka na bazi rastvarača.",
  standards: [
    "Klasa G3 – EN 779",
    "Grubost 65% – ISO 16890",
    "Zapaljivost F1 – DIN 53438",
    "Rolne ili sečeno po meri",
  ],
  sections: [
    {
      heading: "Filteri od staklenih vlakana – Opis",
      body: [
        "Filteri od staklenih vlakana su progresivno strukturirani filtracioni mediji od staklenih vlakana, posebno dizajnirani za filtraciju čestica boje i laka na bazi rastvarača.",
        "Kao rezultat ove progresivne konstrukcije, koja je najvažnija karakteristika filtera od fiberglasa visokih performansi, PAINTSTOP prostirke za filtere nude puno prednosti.",
        "Nasumično poređana fina staklena vlakna sa povećanom gustinom u smeru ka strani sa čistim vazduhom. Standardna strana za usis vazduha zelena / strana sa čistim vazduhom bela.",
      ],
    },
    {
      heading: "Primena",
      list: [
        "Predfilter za sve tipove kabina za bojenje",
        "Zaštita ovlaživača i ventilatora",
        "Predfiltracija kompresora",
      ],
    },
    {
      heading: "Prednosti",
      list: [
        "Osigurano progresivnom distribucijom vlakana",
        "Veliki kapacitet zadržavanja prašine i boje, nizak pad pritiska",
        "Nezapaljiv, samogasiv i neškodljiv za zdravlje",
        "Dostupno u rolnama ili izrezano po meri",
      ],
    },
    {
      heading: "YAFI FM",
      table: {
        head: ["Oznaka", "Kod", "Značenje"],
        rows: [
          ["Tip filtera", "RF", "Rol Filter"],
          ["Sastav", "CE", "Staklena vlakna"],
          ["Model", "PS YAFI FM"],
          ["Dimenzije", "–", "W × H"],
          ["Efikasnost", "G3", "EN 779"],
          ["", "Grubost 65%", "ISO 16890"],
        ],
      },
    },
    {
      heading: "Tehničke karakteristike",
      table: {
        head: ["TYPE", "PS250", "PS500", "PS1000"],
        rows: [
          ["Klasa filtera (EN 779)", "G3", "G3", "G4"],
          [
            "Klasa filtera (ISO 16890)",
            "Grubost 30%",
            "Grubost 40%",
            "Grubost 60%",
          ],
          ["Sastav", "Stakleno vlakno"],
          ["Debljina (mm)", "60", "15 – 18", "20 – 22"],
          ["Težina (g/m²)", "200", "200", "270"],
          ["Nominalna brzina vazduha (m/s)", "1,5", "1,5", "1,5"],
          ["Nominalni protok vazduha (m³/h·m²)", "5400", "5400", "5400"],
          ["Početni pad pritiska (Pa)", "20", "35", "38"],
          ["Finalni pad pritiska (Pa)", "250", "250", "250"],
          ["Prosečno zadržavanje raspršene boje (%)", "90 – 95", "87", "91"],
          [
            "Kapacitet zadržavanja prašine (g)",
            "3.000 – 5.000",
            "400",
            "478",
          ],
          [
            "Otpornost na temperaturu (°C)",
            "Stalna temperatura do 100 °C, u piku do 120 °C",
          ],
          ["Zapaljivost (DIN 53438)", "F1", "F1", "F1"],
          [
            "Dimenzija rolne",
            "Standard: 20,00 × 2,00 m – dostupno sečenje po meri",
          ],
          ["Maks. relativna vlažnost", "1", "1", "1"],
        ],
      },
    },
  ],
};

const enGlassFibre: ProductItem = {
  slug: "staklena-vlakna",
  name: "Glass fibre media – YAFI FM",
  label: "Glass fibre",
  sku: "YAFI FM-4",
  intro:
    "Glass fibre media are progressively structured glass fibre filter media designed specifically for filtering solvent-based paint and lacquer particles.",
  standards: [
    "Class G3 – EN 779",
    "Coarse 65% – ISO 16890",
    "Flammability F1 – DIN 53438",
    "Rolls or cut to size",
  ],
  sections: [
    {
      heading: "Glass fibre media – Description",
      body: [
        "Glass fibre media are progressively structured glass fibre filter media designed specifically for filtering solvent-based paint and lacquer particles.",
        "As a result of this progressive construction — the most important property of a high-performance fibreglass filter — PAINTSTOP filter mats offer a great many advantages.",
        "Randomly arranged fine glass fibres with increasing density towards the clean air side. Standard air intake side green / clean air side white.",
      ],
    },
    {
      heading: "Applications",
      list: [
        "Pre-filter for all types of paint booths",
        "Protection of humidifiers and fans",
        "Compressor pre-filtration",
      ],
    },
    {
      heading: "Benefits",
      list: [
        "Secured by a progressive fibre distribution",
        "High dust and paint holding capacity at a low pressure drop",
        "Non-flammable, self-extinguishing and harmless to health",
        "Available in rolls or cut to size",
      ],
    },
    {
      heading: "YAFI FM",
      table: {
        head: ["Designation", "Code", "Meaning"],
        rows: [
          ["Filter type", "RF", "Roll Filter"],
          ["Composition", "CE", "Glass fibre"],
          ["Model", "PS YAFI FM"],
          ["Dimensions", "–", "W × H"],
          ["Efficiency", "G3", "EN 779"],
          ["", "Coarse 65%", "ISO 16890"],
        ],
      },
    },
    {
      heading: "Technical characteristics",
      table: {
        head: ["TYPE", "PS250", "PS500", "PS1000"],
        rows: [
          ["Filter class (EN 779)", "G3", "G3", "G4"],
          [
            "Filter class (ISO 16890)",
            "Coarse 30%",
            "Coarse 40%",
            "Coarse 60%",
          ],
          ["Composition", "Glass fibre"],
          ["Thickness (mm)", "60", "15 – 18", "20 – 22"],
          ["Weight (g/m²)", "200", "200", "270"],
          ["Nominal air velocity (m/s)", "1.5", "1.5", "1.5"],
          ["Nominal air flow (m³/h·m²)", "5400", "5400", "5400"],
          ["Initial pressure drop (Pa)", "20", "35", "38"],
          ["Final pressure drop (Pa)", "250", "250", "250"],
          ["Average paint overspray arrestance (%)", "90 – 95", "87", "91"],
          ["Dust holding capacity (g)", "3,000 – 5,000", "400", "478"],
          [
            "Temperature resistance (°C)",
            "Continuous up to 100 °C, peaks up to 120 °C",
          ],
          ["Flammability (DIN 53438)", "F1", "F1", "F1"],
          [
            "Roll dimensions",
            "Standard: 20.00 × 2.00 m – cut to size available",
          ],
          ["Max. relative humidity", "1", "1", "1"],
        ],
      },
    },
  ],
};

/** Also listed under two categories — see the note on `srSyntheticM5`. */
const srPaintStop: ProductItem = {
  slug: "medija-za-lakirnice",
  name: "Filteri za lakirnice",
  label: "Paint stop",
  sku: "YAFI FM-3",
  intro:
    "Filteri za lakirnice PAINTFLO su dizajnirani da uhvate sve vlažne čvrste materije ili tečne čestice u vazdušnom toku: visoko čvrste emajle, pečene i vazduhom sušene emajle, lepkove, ulja, mrlje, lakove, fiberglas, epokside, asfalte, prozirne premaze, katran, teflon i slično.",
  standards: [
    "Prosečna efikasnost 98,1% (Am)",
    "Kapacitet zadržavanja 18 kg/m²",
    "Radna temperatura do 100 °C",
    "Samonosiva konstrukcija",
  ],
  sections: [
    {
      heading: "Filteri za lakirnice – Opis",
      body: [
        "Filteri za lakirnice PAINTFLO su dizajnirani da uhvate sve vlažne čvrste materije ili tečne čestice u vazdušnom toku: visoko čvrste emajle, pečene i vazduhom sušene emajle, lepkove, ulja, mrlje, lakove, fiberglas, epokside, asfalte, prozirne premaze, katran, teflon i slično.",
      ],
    },
    {
      heading: "Primena",
      body: [
        "Predfilter za sve vrste klimatizacionih i ventilacionih instalacija.",
      ],
    },
    {
      heading: "Prednosti",
      list: [
        "Osigurano progresivnom distribucijom vlakana",
        "Veliki kapacitet zadržavanja prašine i boje, nizak pad pritiska",
        "Samonosiva konstrukcija",
        "Nezapaljiv, samogasiv i neškodljiv za zdravlje",
        "Dostupno u rolnama ili izrezano po meri",
      ],
    },
    {
      heading: "YAFI FM",
      table: {
        head: ["Oznaka", "Kod", "Značenje"],
        rows: [
          ["Tip filtera", "PF", "Kartonski separator"],
          ["Dužina", "YAFI FM", "100 cm"],
        ],
      },
    },
    {
      heading: "Tehničke karakteristike",
      table: {
        head: ["TIP", "PAINTFLO Y5", "PAINTFLO 90", "PAINTFLO 100"],
        rows: [
          ["Površina", "10", "10", "10"],
          [
            "Sastav",
            "2 sloja teškog kraft papira — bušenog, plisiranog i lepljenog",
          ],
          [
            "Preporučena brzina vazduha",
            "0,25 – 1,0 m/s",
            "0,25 – 1,0 m/s",
            "0,25 – 1,0 m/s",
          ],
          ["Pad pritiska", "0,25 – 8 Pa / 0,75 – 30 Pa"],
          ["Konačni pad pritiska (Pa)", "128 Pa, moguće do 256 Pa"],
          [
            "Prosečna efikasnost zadržavanja (Am)",
            "98,1%",
            "98,1%",
            "98,1%",
          ],
          [
            "Kapacitet zadržavanja prašine",
            "18 kg/m²",
            "18 kg/m²",
            "18 kg/m²",
          ],
          ["Otpornost na temperaturu (°C)", "100 °C", "100 °C", "100 °C"],
        ],
      },
    },
  ],
};

const enPaintStop: ProductItem = {
  slug: "medija-za-lakirnice",
  name: "Paint shop media",
  label: "Paint stop",
  sku: "YAFI FM-3",
  intro:
    "PAINTFLO paint shop filters are designed to capture every wet solid or liquid particle in the air stream: high-solid enamels, baked and air-dried enamels, adhesives, oils, stains, lacquers, fibreglass, epoxies, asphalts, clear coats, tar, Teflon and similar.",
  standards: [
    "Average arrestance 98.1% (Am)",
    "Holding capacity 18 kg/m²",
    "Working temperature up to 100 °C",
    "Self-supporting construction",
  ],
  sections: [
    {
      heading: "Paint shop media – Description",
      body: [
        "PAINTFLO paint shop filters are designed to capture every wet solid or liquid particle in the air stream: high-solid enamels, baked and air-dried enamels, adhesives, oils, stains, lacquers, fibreglass, epoxies, asphalts, clear coats, tar, Teflon and similar.",
      ],
    },
    {
      heading: "Applications",
      body: [
        "Pre-filter for all types of air conditioning and ventilation installations.",
      ],
    },
    {
      heading: "Benefits",
      list: [
        "Secured by a progressive fibre distribution",
        "High dust and paint holding capacity at a low pressure drop",
        "Self-supporting construction",
        "Non-flammable, self-extinguishing and harmless to health",
        "Available in rolls or cut to size",
      ],
    },
    {
      heading: "YAFI FM",
      table: {
        head: ["Designation", "Code", "Meaning"],
        rows: [
          ["Filter type", "PF", "Cardboard separator"],
          ["Length", "YAFI FM", "100 cm"],
        ],
      },
    },
    {
      heading: "Technical characteristics",
      table: {
        head: ["TYPE", "PAINTFLO Y5", "PAINTFLO 90", "PAINTFLO 100"],
        rows: [
          ["Surface area", "10", "10", "10"],
          [
            "Composition",
            "2 layers of heavy kraft paper — punched, pleated and glued",
          ],
          [
            "Recommended air velocity",
            "0.25 – 1.0 m/s",
            "0.25 – 1.0 m/s",
            "0.25 – 1.0 m/s",
          ],
          ["Pressure drop", "0.25 – 8 Pa / 0.75 – 30 Pa"],
          ["Final pressure drop (Pa)", "128 Pa, possible up to 256 Pa"],
          ["Average arrestance (Am)", "98.1%", "98.1%", "98.1%"],
          ["Dust holding capacity", "18 kg/m²", "18 kg/m²", "18 kg/m²"],
          ["Temperature resistance (°C)", "100 °C", "100 °C", "100 °C"],
        ],
      },
    },
  ],
};

/**
 * Catalogue order — this is the order the nav dropdown and the products page
 * render in, so keep the two locale arrays in step.
 */
const sr: ProductCategory[] = [
  {
    slug: "filter-materijali",
    name: "Filter materijali",
    nameAcc: "filterske materijale",
    title: "Filterski materijali – YAFI FM",
    class: "Rolne i ploče, EU2 – F9",
    image: "/yafiproducts/filter-materijali/Filteri-od-sintetickih-vlakana.webp",
    description:
      "Filterska medija u rolnama i pločama — sintetička, staklena vlakna i podne medije za sopstvenu konfekciju i zamenu uložaka.",
    intro:
      "Filterski materijali klase EU2 – F9 od renomiranih svetskih proizvođača. Posedujemo sve ateste i sertifikate, a pri isporuci gotovih proizvoda možemo dostaviti i EUROVENT i FIATEC sertifikate.",
    applications: ["Konfekcija filtera", "Zamena uložaka", "Podne medije"],
    standards: [
      "Klase EU2 – F9",
      "EUROVENT sertifikat",
      "FIATEC sertifikat",
      "Atesti za sve materijale",
    ],
    keywords: [
      "filter materijali",
      "filterska medija",
      "rolne",
      "filter media",
      "roll media",
    ],
    items: [
      {
        slug: "aktivni-ugalj-medija",
        name: "Filteri impregnirani aktivnim ugljem – YAFI FM",
        label: "Aktivni ugalj",
        image: "/yafiproducts/filter-materijali/Filteri-impregnirani-aktivnim-ugljem.webp",
        sku: "RF-KE-ZKW400-2.00/20-RL",
        intro:
          "Rolne od karbonskog poliestera su jednostavan način za smanjenje ili uklanjanje mirisa i isparenja. Filteri sa karbonskim rolnama su napravljeni od netkanog poliestera, impregniranog fino mlevenim, aktivnim ugljem. Ravnomerna raspodela ugljenika kroz poliesterski medij osigurava odličan procenat hvatanja pri prvom prolasku.",
        standards: [
          "Klasa G4 – EN 779",
          "Grubost 60% – ISO 16890",
          "Zapaljivost F1 – DIN 53438",
          "Rolne ili sečeno po meri",
        ],
        sections: [
          {
            heading: "Filteri impregnirani aktivnim ugljem – Opis",
            body: [
              "Rolne od karbonskog poliestera su jednostavan način za smanjenje ili uklanjanje mirisa i isparenja. Filteri sa karbonskim rolnama su napravljeni od netkanog poliestera, impregniranog fino mlevenim, aktivnim ugljem. Ravnomerna raspodela ugljenika kroz poliesterski medij osigurava odličan procenat hvatanja pri prvom prolasku.",
            ],
          },
          {
            heading: "Primena",
            body: [
              "Idealno za upotrebu u neventiliranim aplikacijama kao što su nape, prečišćivači i prečišćivači vazduha, sobni klima uređaji i ventilatori za kupatilo.",
            ],
          },
          {
            heading: "Prednosti",
            list: [
              "Osigurano progresivnom distribucijom vlakana",
              "Veoma efikasan za mirise na organskoj bazi",
              "Nezapaljiv, samogasiv i zdravlju neškodljiv",
              "Dostupno u rolnama ili izrezano po meri",
            ],
          },
          {
            heading: "YAFI FM",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "RF", "Roll Filter"],
                ["Sastav filtera", "SE", "Synthetic Fiber"],
                ["Model", "", "YAFI FM"],
                ["Dimenzija", "–", "W × H × D"],
                ["Efikasnost", "G4", "EN 779"],
                ["", "Grubost 60%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: {
              head: ["TYPE", "SBW 220", "ZKW 400"],
              rows: [
                ["Masa po jedinici, g/m² (EN 29073-1)", "340 ± 35", "400 ± 40"],
                [
                  "Debljina, mm (EN ISO 9073-2, metoda A)",
                  "8 ± 1,5",
                  "11 ± 2",
                ],
                [
                  "Propusnost vazduha, l/m²/s (@50 Pa)",
                  "800 ± 200",
                  "1600 ± 350",
                ],
                ["Zapaljivost (DIN 53438, deo 3)", "F1", "F1"],
                ["Boja", "Crni i beli", "Crni"],
                ["Sastav", "Poliester", "Poliester"],
                [
                  "Lepljenje vlakana",
                  "Toplotno lepljenje",
                  "Toplotno lepljenje",
                ],
                ["Tretman", "Prahom (LDPE)", "Impregniran"],
              ],
            },
          },
        ],
      },
      {
        ...srSyntheticM5,
        image: "/yafiproducts/filter-materijali/Filter-od-sintetickih-vlakana-M5.webp",
      },
      {
        slug: "sinteticka-vlakna",
        name: "Filteri od sintetičkih vlakana – YAFI FM",
        label: "Sintetička vlakna",
        image: "/yafiproducts/filter-materijali/Filteri-od-sintetickih-vlakana.webp",
        sku: "RF-SE-SF2Y0-2/20-G4",
        intro:
          "Napravljeni od 100% poliesterskih vlakana sa netkanom strukturom, mogu se koristiti za širok spektar vazdušnih uslova. Filteri se sastoje od visoko elastičnih, napetih, nasumično raspoređenih vlakana. Sa smanjenom debljinom vlakana, medij za filtriranje postaje gušći i finiji prema čistoj strani vazduha (progresivna konstrukcija), čime se postiže visok nivo odvajanja i veliki kapacitet nakupljanja prašine. Nezapaljiv, samogasiv i neškodljiv za zdravlje.",
        standards: [
          "Klasa G4 – EN 779",
          "Grubost 60% – ISO 16890",
          "Progresivna konstrukcija",
          "Rolne ili sečeno po meri",
        ],
        sections: [
          {
            heading: "Filteri od sintetičkih vlakana – Opis",
            body: [
              "Napravljeni od 100% poliesterskih vlakana sa netkanom strukturom, mogu se koristiti za širok spektar vazdušnih uslova. Filteri se sastoje od visoko elastičnih, napetih, nasumično raspoređenih vlakana. Sa smanjenom debljinom vlakana, medij za filtriranje postaje gušći i finiji prema čistoj strani vazduha (progresivna konstrukcija), čime se postiže visok nivo odvajanja i veliki kapacitet nakupljanja prašine. Nezapaljiv, samogasiv i neškodljiv za zdravlje.",
            ],
          },
          {
            heading: "Primena",
            body: [
              "Predfilter za sve vrste klimatizacionih i ventilacionih instalacija.",
            ],
          },
          {
            heading: "Prednosti",
            list: [
              "Osigurano progresivnom distribucijom vlakana",
              "Veliki kapacitet zadržavanja prašine, nizak pad pritiska",
              "Nezapaljiv, samogasiv i zdravlju neškodljiv",
              "Dostupno u rolnama ili izrezano po meri",
            ],
          },
          {
            heading: "YAFI FM-G4",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "RF", "Roll Filter"],
                ["Sastav filtera", "SE", "Synthetic Fiber"],
                ["Model", "YAFI FM"],
                ["Dimenzija", "–", "W × H × D"],
                ["Efikasnost", "G4", "EN 779"],
                ["", "Grubost 60%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: {
              head: ["TYPE", "PS250", "PS500", "PS1000"],
              rows: [
                ["Klasa filtera (EN 779)", "G3", "G3", "G4"],
                [
                  "Klasa filtera (ISO 16890)",
                  "Grubost 30%",
                  "Grubost 40%",
                  "Grubost 60%",
                ],
                ["Sastav", "Stakleno vlakno"],
                ["Debljina (mm)", "60", "15 – 18", "20 – 22"],
                ["Težina (g/m²)", "200", "200", "270"],
                ["Nominalna brzina vazduha (m/s)", "1,5", "1,5", "1,5"],
                ["Nominalni protok vazduha (m³/h·m²)", "5400", "5400", "5400"],
                ["Početni pad pritiska (Pa)", "20", "35", "38"],
                ["Finalni pad pritiska (Pa)", "250", "250", "250"],
                [
                  "Prosečno zadržavanje raspršene boje (%)",
                  "90 – 95",
                  "87",
                  "91",
                ],
                [
                  "Kapacitet zadržavanja prašine (g)",
                  "3.000 – 5.000",
                  "400",
                  "478",
                ],
                [
                  "Otpornost na temperaturu (°C)",
                  "Stalna temperatura do 100 °C, u piku do 120 °C",
                ],
                ["Zapaljivost (DIN 53438)", "F1", "F1", "F1"],
                [
                  "Dimenzija rolne",
                  "Standard: 20,00 × 2,00 m – dostupno sečenje po meri",
                ],
                ["Maks. relativna vlažnost", "1", "1", "1"],
              ],
            },
          },
        ],
      },
      {
        ...srGlassFibre,
        image: "/yafiproducts/filter-materijali/Filteri-od-staklenih-vlakana.webp",
      },
      {
        ...srPaintStop,
        image: "/yafiproducts/filter-materijali/filteri-za-lakirnice.webp",
      },
      {
        slug: "periva-pena",
        name: "Periva pena za filtriranje – YAFI FM",
        label: "Periva pena",
        image: "/yafiproducts/filter-materijali/Periva-pena-za-filtriranje.webp",
        sku: "RF-POL20/10-1.5/2",
        intro:
          "Filterska pena je poliuretanska pena otvorenih ćelija na bazi polietera/poliestera i može se koristiti u aplikacijama filtriranja. Filterske pene se obično razlikuju u veličini pora i broju pora po kvadratnom inču (PPI).",
        standards: [
          "Klase G2 – G3 – EN 779",
          "Grubost 30 – 40% – ISO 16890",
          "Zapaljivost F1 – DIN 53438",
          "Periva, višekratna upotreba",
        ],
        sections: [
          {
            heading: "Periva pena za filtriranje – Opis",
            body: [
              "Filterska pena je poliuretanska pena otvorenih ćelija na bazi polietera/poliestera i može se koristiti u aplikacijama filtriranja. Filterske pene se obično razlikuju u veličini pora i broju pora po kvadratnom inču (PPI).",
              "Materijal POLFIL se može koristiti u bilo kojoj debljini, a raspon dostupnih veličina pora pokriva široko područje efikasnosti, posebno različite poroznosti. Povezuju se zajedno u tandemu da bi se postigla željena efikasnost pomoću stepenastog mehanizma.",
            ],
          },
          {
            heading: "Primena",
            body: [
              "Predfilter za sve vrste klimatizacionih i ventilacionih instalacija.",
            ],
          },
          {
            heading: "Prednosti",
            list: [
              "Progresivna struktura otvorenih ćelija, velika mehanička čvrstoća",
              "Veliki kapacitet zadržavanja prašine, nizak pad pritiska",
              "Perivi filter, višekratna upotreba",
              "Dostupno u rolnama ili izrezano po meri",
            ],
          },
          {
            heading: "YAFI FM",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "RF", "Roll Filter"],
                ["Sastav", "POL", "Poliuretanska pena"],
                ["Model", "20", "Veličina pora"],
                ["Dimenzija", "10", "Debljina"],
                ["Dimenzija", "", "W × L"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: {
              head: [
                "TYPE",
                "POL 10/20",
                "POL 20/6",
                "POL 20/10",
                "POL 20/20",
                "POL 45/10",
              ],
              rows: [
                ["Klasa filtera (EN 779)", "G2", "G2", "G2 – G3", "G2 – G3", "G3"],
                [
                  "Klasa filtera (ISO 16890)",
                  "Grubost 30%",
                  "Grubost 30%",
                  "Grubost 35%",
                  "Grubost 35%",
                  "Grubost 40%",
                ],
                [
                  "Sastav",
                  "Poliuretan",
                  "Poliuretan",
                  "Poliuretan",
                  "Poliuretan",
                  "Poliuretan",
                ],
                ["Debljina (mm)", "20", "6", "10", "20", "10"],
                [
                  "Nominalna brzina vazduha (m/s)",
                  "1,5",
                  "1,5",
                  "1,5",
                  "1,5",
                  "0,25",
                ],
                [
                  "Protok vazduha (m³/h·m²)",
                  "5400",
                  "5400",
                  "5400",
                  "5400",
                  "5400",
                ],
                ["Početni pad pritiska (Pa)", "5", "5", "10", "15", "20"],
                ["Konačni pad pritiska (Pa)", "250", "250", "250", "250", "250"],
                [
                  "Prosečna efikasnost zadržavanja (Am)",
                  "0,75",
                  "0,75",
                  "0,77",
                  "0,78",
                  "80%",
                ],
                [
                  "Kapacitet zadržavanja prašine (g)",
                  "300",
                  "11",
                  "220",
                  "300",
                  "300",
                ],
                [
                  "Otpornost na temperaturu (°C)",
                  "Stalne temperature do 100 °C, u piku do 120 °C",
                ],
                ["Zapaljivost (DIN 53438)", "F1", "F1", "F1", "F1", "F1"],
                ["Dimenzija rolne", "1,50 × 2,00 m i sečeno po meri"],
                ["Maks. relativna vlažnost", "1", "1", "1", "1", "1"],
              ],
            },
          },
        ],
      },
    ],
  },
  {
    slug: "panelni-filteri",
    name: "Panelni filteri – YAFI PF",
    nameAcc: "panelne filtere",
    class: "G2 – M5, poliester",
    image: "/yafiproducts/panelni-filteri/predfilter-metalnog-okvira-i-ravne-povrsine.webp",
    description:
      "Prvi stepen zaštite ventilacionih sistema. Zadržavaju krupnije čestice i produžavaju vek trajanja narednih filterskih stepeni.",
    intro:
      "Panelni filteri male filterske površine za filtraciju vazduha u zatvorenim prostorima — bolnicama, šoping centrima i prehrambenoj industriji. Koriste se i kao predfilteri za apsolutne filtere, kao i u kompresorskim postrojenjima. Klase G2 – M5 (poliester).",
    applications: [
      "Bolnice i zdravstveni objekti",
      "Šoping centri",
      "Prehrambena industrija",
      "Predfilter za apsolutne filtere",
      "Kompresorska postrojenja",
    ],
    standards: ["Klase G2 – M5", "Poliesterska medija", "ISO Coarse / ePM10"],
    keywords: ["panelni filter", "coarse filter", "predfilter", "yafi pf"],
    items: [
      {
        slug: "filteri-visoke-temperature",
        name: "Filteri za visoke temperature – YAFI PF",
        label: "Visoke temperature",
        image: "/yafiproducts/panelni-filteri/panelni-filteri-za-visoke-temperature.webp",
        sku: "PF 480/480/14",
        intro:
          "Specijalno dizajniran za filtriranje usisnog i cirkulišućeg vazduha u kabinama za prskanje i sušenje. Progresivno strukturirani filterski mediji sastavljeni od najfinijih staklenih vlakana, povezanih vezivom otpornim na visoke temperature.",
        specs: [
          { label: "Tip filtera", value: "Filter za visoke temperature" },
          {
            label: "Materijal",
            value:
              "Filterski medijum otporan na visoke temperature (do 300 °C) od nasumično raspoređenih najfinijih staklenih vlakana",
          },
          { label: "Okvir", value: "Metalni" },
          { label: "Klasa filtera", value: "G4 / Grubost 65%" },
          { label: "Konačni pad pritiska", value: "220 Pa" },
          { label: "Maks. temperatura", value: "300 °C" },
        ],
        standards: [
          "Klasa G4 – EN 779",
          "Grubost 65% – ISO 16890",
          "Radna temperatura do 300 °C",
          "Pocinkovani okvir",
        ],
        sections: [
          {
            heading: "Filteri za visoke temperature – Opis",
            body: [
              "Specijalno dizajniran za filtriranje usisnog i cirkulišućeg vazduha u kabinama za prskanje i sušenje. Progresivno strukturirani filterski mediji sastavljeni od najfinijih staklenih vlakana, povezanih vezivom otpornim na visoke temperature.",
              "Pretvoreni u gotove filter ćelije pomoću aluminijumskih rešetki na nosačima i pocinkovanog okvira.",
            ],
          },
          {
            heading: "Primena",
            body: [
              "Usisna i cirkulaciona filtracija vazduha u kabinama za prskanje i sušenje.",
            ],
          },
          {
            heading: "Prednosti",
            list: [
              "Filter medija otporna na temperature do 300 °C",
              "Visok stepen otprašivanja uz minimalni gubitak pritiska",
              "Ekonomičan rad i površina visoke filtracije",
              "Veliki kapacitet zadržavanja prašine, nizak pad pritiska",
              "Kompaktna, kruta konstrukcija za brzu ugradnju",
              "Brza instalacija",
            ],
          },
          {
            heading: "YAFI PF 480/480/14 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "HT", "Za visoke temperature"],
                ["Okvir", "G", "Pocinkovan"],
                ["Materijal", "G", "Staklena vlakna"],
                ["Tip nabora", "L", "Ravan"],
                ["Zaptivka", "X", "Ne"],
                ["Dimenzija", "–", "W × H × D"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: panelTable("sr", highTempRows),
          },
        ],
      },
      {
        slug: "predfilter-metalni-okvir-ravni",
        name: "Predfilter metalnog okvira i ravne površine – YAFI PF",
        label: "Metalni okvir · ravni",
        image: "/yafiproducts/panelni-filteri/predfilter-metalnog-okvira-i-ravne-povrsine.webp",
        sku: "YAFI PF 495/595/10-G3",
        intro:
          "Dizajnirani kao predfilteri za ventilokonvektore i ventilacione jedinice. Nude visoku efikasnost filtracije sa vrlo malim padom pritiska. YAFI PF se proizvodi sa pocinkovanim ramom i sintetičkim materijalima za filtriranje. Podloga za filtriranje podržana je proširenom metalnom mrežicom sa obe strane okvira.",
        specs: [
          { label: "Tip filtera", value: "Ravni materijal" },
          { label: "Materijal", value: "Sintetička vlakna" },
          { label: "Okvir", value: "Pocinkovani lim" },
          { label: "Klasa", value: "G3 / ISO Grubost 50%" },
          { label: "Konačni pad pritiska", value: "250 Pa" },
          { label: "Maks. temperatura", value: "100 °C" },
        ],
        standards: [
          "Klasa G3 – EN 779",
          "Grubost 50% – ISO 16890",
          "Radna temperatura do 100 °C",
          "Standardne i prilagođene veličine",
        ],
        sections: [
          {
            heading: "Predfilter metalnog okvira i ravne površine – Opis",
            body: [
              "Dizajnirani kao predfilteri za ventilokonvektore i ventilacione jedinice. Nude visoku efikasnost filtracije sa vrlo malim padom pritiska. YAFI PF se proizvodi sa pocinkovanim ramom i sintetičkim materijalima za filtriranje. Podloga za filtriranje podržana je proširenom metalnom mrežicom sa obe strane okvira.",
              "Dostupni u standardnim i prilagođenim veličinama.",
            ],
          },
          {
            heading: "Primena",
            body: ["Primarni filter za klimatizacione sisteme."],
          },
          {
            heading: "Prednosti",
            list: [
              "Robusna konstrukcija za pouzdan rad",
              "Ravan filter materijal između dve metalne mreže",
              "Prilagođene veličine mogu se lako proizvesti",
            ],
          },
          {
            heading: "YAFI PF 495/595/10-G3 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "KF", "Panelni filter"],
                ["Okvir", "G", "Pocinkovani lim"],
                ["Materijal", "S", "Sintetičko vlakno"],
                ["Tip nabora", "L", "Ravan"],
                ["Zaptivka", "X", "Ne"],
                ["Dimenzija", "–", "W × H × D"],
                ["Efikasnost", "G3", "EN 779"],
                ["", "Grubost 50%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: panelTable("sr", flatMetalRows),
          },
        ],
      },
      {
        slug: "predfilter-zicani-okvir",
        name: "Predfilter sa žičanim okvirom – YAFI PF",
        label: "Žičani okvir",
        image: "/yafiproducts/panelni-filteri/predfilter-sa-zicanim-okvirom.webp",
        sku: "PF 495/595/8-G3 - 1",
        intro:
          "Dizajnirani kao predfilteri za klima uređaje, sisteme ventilokonvektora, peći za topli vazduh, rashladne uređaje, brojače i ormane za elektronsku opremu — često se koriste i za zaštitu namotaja izmenjivača toplote od prašine.",
        specs: [
          { label: "Tip filtera", value: "Fan coil filter" },
          { label: "Materijal", value: "Sintetička vlakna" },
          { label: "Okvir", value: "Svetlovučena žica" },
          { label: "Klasa", value: "G3 / ISO Grubost 50%" },
          { label: "Konačni pad pritiska", value: "250 Pa" },
          { label: "Maks. temperatura", value: "100 °C" },
        ],
        standards: [
          "Klasa G3 – EN 779",
          "Grubost 50% – ISO 16890",
          "Radna temperatura do 100 °C",
          "Standardne i prilagođene veličine",
        ],
        sections: [
          {
            heading: "Predfilter sa žičanim okvirom – Opis",
            body: [
              "Dizajnirani kao predfilteri za klima uređaje, sisteme ventilokonvektora, peći za topli vazduh, rashladne uređaje, brojače i ormane za elektronsku opremu, takođe se često koriste za zaštitu namotaja izmenjivača toplote od prašine. YAFI PF je proizveden šivenjem sintetičkih medija na prethodno pocinkovani presvučeni žičani okvir koji ima poprečne zagrade pričvršćene po potrebi. Nude sporu efikasnost filtracije sa vrlo malim padom pritiska.",
              "Dostupno u standardnim i prilagođenim veličinama.",
            ],
          },
          {
            heading: "Primena",
            body: [
              "Primarni filter za ventilokonvektore i ventilacione jedinice.",
            ],
          },
          {
            heading: "Prednosti",
            list: [
              "Robusna konstrukcija za pouzdan rad",
              "Ekonomičan rad",
              "Mogu se proizvesti prilagođene veličine",
            ],
          },
          {
            heading: "YAFI PF 495/595/8-G3 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "CT", "Žičani filter"],
                ["Okvir", "G", "Svetlovučena žica"],
                ["Materijal", "S", "Sintetičko vlakno"],
                ["Tip nabora", "X", "Ravan"],
                ["Zaptivka", "X", "Ne"],
                ["Dimenzije", "–", "W × H × D"],
                ["Efikasnost", "G3", "EN 779"],
                ["", "Grubost 50%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: panelTable("sr", wireFrameRows),
          },
        ],
      },
      {
        slug: "ravni-perivi-predfilter-metalni-okvir",
        name: "Ravni i perivi predfilter sa metalnim okvirom – YAFI PF",
        label: "Metalni okvir · perivi",
        image: "/yafiproducts/panelni-filteri/ravni-i-perivi-predfilter-sa-metalnim-okvirom.webp",
        sku: "YAFI PF 495/595/10-G2",
        intro:
          "Dizajnirani kao predfilteri za ventilokonvektore i ventilacione jedinice. YAFI PF se proizvodi od pocinkovanog okvira sa poliuretanskim materijalom koji se može prati. Materijali za filtriranje podržani su produženom metalnom mrežicom sa obe strane okvira.",
        specs: [
          { label: "Tip filtera", value: "Ravni panelni filter" },
          { label: "Materijal", value: "Poliuretanska pena" },
          { label: "Okvir", value: "Pocinkovani lim" },
          { label: "Klasa", value: "G2 / ISO Grubost 40%" },
          { label: "Konačni pad pritiska", value: "250 Pa" },
          { label: "Maks. temperatura", value: "100 °C" },
        ],
        standards: [
          "Klasa G2 – EN 779",
          "Grubost 40% – ISO 16890",
          "Perivo i obnovljivo",
          "Okvir debljine 6, 8 i 10 mm",
        ],
        sections: [
          {
            heading: "Ravni i perivi predfilter sa metalnim okvirom – Opis",
            body: [
              "Dizajnirani kao predfilteri za ventilokonvektore i ventilacione jedinice. YAFI PF se proizvodi od pocinkovanog okvira sa poliuretanskim materijalom koji se može prati. Materijali za filtriranje podržani su produženom metalnom mrežicom sa obe strane okvira.",
              "Dostupno u standardnim i prilagođenim veličinama.",
            ],
          },
          {
            heading: "Primena",
            body: ["Primarni filter za klimatizacione sisteme."],
          },
          {
            heading: "Prednosti",
            list: [
              "Robusna konstrukcija za pouzdan rad",
              "Ravan filter materijal između dve metalne mreže",
              "Potpuno perivi i obnovljivi materijali",
              "Prilagođene veličine mogu se lako proizvesti",
              "Okvir debljine 6 mm, 8 mm i 10 mm",
            ],
          },
          {
            heading: "YAFI PF 495/595/10-G2 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "YK", "Panelni filter"],
                ["Okvir", "G", "Pocinkovani lim"],
                ["Materijal", "P", "Poliuretanska pena"],
                ["Tip nabora", "L", "Ravan"],
                ["Zaptivka", "2", "POL 20/10"],
                ["Dimenzija", "–", "W × H × D"],
                ["Efikasnost", "G2", "EN 779"],
                ["", "Grubost 40%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: panelTable("sr", washableMetalRows),
          },
        ],
      },
      {
        slug: "zicani-perivi-predfilter",
        name: "Žičani i perivi predfilter – YAFI PF",
        label: "Žičani okvir · perivi",
        image: "/yafiproducts/panelni-filteri/zicani-i-perivi-predfilter.webp",
        sku: "PF 495/595/8-G3",
        intro:
          "Dizajnirani kao predfilteri za klima uređaje, sisteme ventilokonvektora, peći za topli vazduh, rashladne uređaje, brojače i ormane za elektronsku opremu — često se koriste i za zaštitu kalemova izmenjivača toplote od prašine.",
        specs: [
          { label: "Tip filtera", value: "Fan coil filter" },
          { label: "Materijal", value: "PP mreža – crna" },
          { label: "Okvir", value: "Metalna žičana šipka" },
          { label: "Klasa", value: "G3 / ISO Grubost 35%" },
          { label: "Konačni pad pritiska", value: "250 Pa" },
          { label: "Maks. temperatura", value: "100 °C" },
        ],
        standards: [
          "Klasa G3 – EN 779",
          "Grubost 35% – ISO 16890",
          "Perivo i obnovljivo",
          "Standardne i prilagođene veličine",
        ],
        sections: [
          {
            heading: "Žičani i perivi predfilter – Opis",
            body: [
              "Dizajnirani kao predfilteri za klima uređaje, sisteme ventilokonvektora, peći za topli vazduh, rashladne uređaje, brojače i ormane za elektronsku opremu, takođe se često koriste za zaštitu kalemova izmenjivača toplote od prašine. YAFI PF se proizvodi šivenjem PP mrežastih filterskih materijala na prethodno oblikovani okvir od pocinkovane presvučene žice koji ima poprečne zagrade pričvršćene po potrebi. Nude sporu efikasnost filtracije sa vrlo malim padom pritiska.",
              "Dostupno u standardnim i prilagođenim veličinama.",
            ],
          },
          {
            heading: "Primena",
            body: [
              "Primarni filter za ventilokonvektore i ventilacione jedinice.",
            ],
          },
          {
            heading: "Prednosti",
            list: [
              "Robusna konstrukcija za pouzdan rad",
              "Ekonomičan rad",
              "Mogu se proizvesti prilagođene veličine",
              "Perivo i obnovljivo",
            ],
          },
          {
            heading: "YAFI PF 495/595/8-G3 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "CT", "Žičani filter"],
                ["Okvir", "G", "Metalna žičana šipka"],
                ["Materijal", "B", "PP mrežasti"],
                ["Tip nabora", "X", "Ravan"],
                ["Zaptivka", "X", "Ne"],
                ["Dimenzija", "–", "W × H × D"],
                ["Efikasnost", "G3", "EN 779"],
                ["", "Grubost 35%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: panelTable("sr", washableWireRows),
          },
        ],
      },
    ],
  },
  {
    slug: "kasetni-filteri",
    name: "Kasetni filteri",
    nameAcc: "kasetne filtere",
    title: "Kasetni filteri – YAFI KF",
    class: "G3 – F9, poliester i mini plit",
    image: "/yafiproducts/kasetni-filteri/predfilter-sa-metalnim-okvirom.webp",
    description:
      "Kompaktna konstrukcija sa velikom filtracionom površinom i niskim padom pritiska — direktan uticaj na potrošnju energije.",
    intro:
      "YAFI KF su visokokvalitetni filteri za različite zahteve — visoka propustljivost vazduha omogućava i veliko zadržavanje prašine. Koriste se za filtraciju vazduha u šoping centrima, vrtićima i školama, kao i za predfiltraciju ispred visokokvalitetnih filtera. Uglavnom se koriste materijali G3 do M5 (poliester), a mini plit izvedbe sa staklenim vlaknima pokrivaju klase M5 do F9.",
    applications: [
      "Šoping centri",
      "Vrtići i škole",
      "Poslovni objekti i hoteli",
      "Predfiltracija za visokokvalitetne filtere",
    ],
    standards: [
      "Klase G3 – M5 (poliester)",
      "Mini plit M5 – F9 (staklena vlakna)",
      "ISO ePM1 / ePM2.5",
    ],
    keywords: [
      "kasetni filter",
      "cassette filter",
      "compact filter",
      "yafi kf",
      "yafi kkf",
    ],
    items: [
      {
        slug: "kartonski-filter-bez-zice",
        name: "Kartonski filter sa materijalom bez žice – YAFI KF",
        label: "Kartonski okvir · YAFI KKF",
        image: "/yafiproducts/kasetni-filteri/kartonski-predfilter-sa-materijalom-bez-zice.webp",
        sku: "PF 592/592/48-G4",
        intro:
          "Posebno dizajniran kao filter za klimatizacionu i ventilacionu opremu. Plisirani medij za filtriranje visokih performansi je samonosiv. Nije korozivan i ne sadrži metale, što olakšava odlaganje. Preklopljeni samonosivi materijali drže se zajedno sa krutim okvirom ploče.",
        specs: [
          { label: "Tip filtera", value: "Panelni filter proširene površine" },
          { label: "Materijal", value: "Samostojeće sintetičko vlakno" },
          { label: "Okvir", value: "Karton" },
          { label: "Klasa", value: "G4 / ISO Grubost 70%" },
          { label: "Konačni pad pritiska", value: "250 Pa" },
          { label: "Maks. temperatura", value: "80 °C" },
        ],
        standards: [
          "Klasa G4 – EN 779",
          "Grubost 70% – ISO 16890",
          "Radna temperatura do 80 °C",
          "Bez metala, lako odlaganje",
        ],
        sections: [
          {
            heading: "Kartonski filter sa materijalom bez žice – Opis",
            body: [
              "Posebno dizajniran kao filter za klimatizacionu i ventilacionu opremu. Plisirani medij za filtriranje visokih performansi je samonosiv. Nije korozivan i ne sadrži metale, što olakšava odlaganje. Preklopljeni samonosivi materijali drže se zajedno sa krutim okvirom ploče.",
              "Dostupno i u drugim veličinama.",
            ],
          },
          {
            heading: "Primena",
            body: ["Primarni filter za klimatizacione sisteme."],
          },
          {
            heading: "Prednosti",
            list: [
              "Prilagođeno uslovima visoke vlažnosti",
              "Odlična mehanička otpornost",
              "Ekonomičan rad i površina visoke filtracije",
              "Veliki kapacitet zadržavanja prašine, nizak pad pritiska",
              "Kompaktna, kruta konstrukcija za brzu ugradnju",
              "100% nezapaljiv i nekorozivan",
            ],
          },
          {
            heading: "YAFI KF 592/592/48-G4 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "KF", "Panelni filter"],
                ["Okvir", "K", "Karton"],
                ["Materijal", "H", "Samostojeći"],
                ["Tip nabora", "M", "Cik-cak bez mreže"],
                ["Zaptivka", "X", "Ne / opciono"],
                ["Dimenzija", "–", "W × H × D"],
                ["Efikasnost", "G4", "EN 779"],
                ["", "Grubost 70%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: panelTable("sr", cassetteNoWireRows),
          },
        ],
      },
      {
        slug: "kartonski-filter-jednokratni",
        name: "Kartonski filter za jednokratnu upotrebu – YAFI KF",
        label: "Kartonski okvir · YAFI KKF",
        image: "/yafiproducts/kasetni-filteri/kartonski-filter-za-jednokratnu-upotrebu.webp",
        sku: "PF 592/592/48-G3",
        intro:
          "Koristi se u ventilacionim jedinicama i industrijskim HVAC jedinicama kao filter za zaustavljanje prašine i boje. Gustina medija od staklenih vlakana koji se koriste unutar kartonske ploče povećava kapacitet usisanog vazduha. Ova progresivna struktura pruža visoke performanse filtriranja.",
        specs: [
          { label: "Tip filtera", value: "Panelni" },
          { label: "Filter materijal", value: "Staklena vlakna" },
          { label: "Okvir", value: "Karton" },
          { label: "Klasa", value: "G4 / Grubost 65%" },
          { label: "Konačni pad pritiska", value: "250 Pa" },
        ],
        standards: [
          "Klasa G3 – G4 – EN 779",
          "Grubost 40 – 60% – ISO 16890",
          "Staklena vlakna",
          "Standardne i prilagođene veličine",
        ],
        sections: [
          {
            heading: "Kartonski filter za jednokratnu upotrebu – Opis",
            body: [
              "Koristi se u ventilacionim jedinicama i industrijskim HVAC jedinicama kao filter za zaustavljanje prašine i boje. Gustina medija od staklenih vlakana koji se koriste unutar kartonske ploče povećava kapacitet usisanog vazduha. Ova progresivna struktura pruža visoke performanse filtriranja.",
              "Dostupno u standardnim i prilagođenim veličinama.",
            ],
          },
          {
            heading: "Primena",
            body: ["Primarni filter za klimatizacione sisteme."],
          },
          {
            heading: "Prednosti",
            list: [
              "Robusna konstrukcija za pouzdan rad",
              "Ekonomičan rad i površina visoke filtracije",
              "Veliki kapacitet zadržavanja prašine, nizak pad pritiska",
              "Prilagođene veličine dostupne na zahtev",
            ],
          },
          {
            heading: "YAFI KF 592/592/48-G3 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "KF", "Panelni filter"],
                ["Okvir", "K", "Karton"],
                ["Materijal", "C", "Staklena vlakna"],
                ["Tip nabora", "L", "Prav"],
                ["Zaptivka", "X", "Ne"],
                ["Dimenzija", "–", "W × H × D"],
                ["Efikasnost", "G3", "EN 779"],
                ["", "Grubost 55%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: panelTable("sr", cassetteDisposableRows),
          },
        ],
      },
      {
        slug: "perivi-predfilter-metalni-okvir",
        name: "Perivi predfilter sa metalnim okvirom – YAFI KF",
        label: "Metalni okvir · perivi",
        image: "/yafiproducts/kasetni-filteri/perivi-predfilteri-sa-metalnim-okvirom.webp",
        sku: "PF 592/592/48-G3-1",
        intro:
          "Filteri koji se peru posebno su dizajnirani kao filteri prvog stepena u ventilacionim jedinicama za suvu prašinu i kao predfilteri filtera veće efikasnosti. Poliuretanski materijal za filtriranje, poduprt metalnom mrežicom, postavljen je u metalni okvir i može se lako oprati više puta.",
        specs: [
          { label: "Tip filtera", value: "Panelni filter proširene površine" },
          { label: "Materijal", value: "Poliuretanska pena" },
          { label: "Okvir", value: "Pocinkovani lim" },
          { label: "Klasa", value: "G4 / ISO Grubost 50%" },
          { label: "Konačni pad pritiska", value: "300 Pa" },
          { label: "Maks. temperatura", value: "80 °C" },
        ],
        standards: [
          "Klasa G4 – EN 779",
          "Grubost 50% – ISO 16890",
          "Perivo i obnovljivo",
          "Radna temperatura do 80 °C",
        ],
        sections: [
          {
            heading: "Perivi predfilter sa metalnim okvirom – Opis",
            body: [
              "Filteri koji se peru posebno su dizajnirani kao filteri prvog stepena u ventilacionim jedinicama za suvu prašinu i kao predfilteri filtera veće efikasnosti. Poliuretanski materijal za filtriranje koji je poduprt metalnom mrežicom postavljen je u metalni okvir. Zahvaljujući poliuretanskim materijalima može se lako oprati nekoliko puta. Za niski pad pritiska i veliki kapacitet zadržavanja prašine, filterski materijal je postavljen u cik-cak obliku.",
              "Dostupan u standardnim i prilagođenim veličinama.",
            ],
          },
          {
            heading: "Primena",
            body: ["Primarni filter za klimatizacione sisteme."],
          },
          {
            heading: "Prednosti",
            list: [
              "Robusna konstrukcija za pouzdan rad",
              "Potpuno oslonjen materijal nalepljen na žičanu mrežu",
              "Ekonomičan rad i površina visoke filtracije",
              "Potpuno periv i obnovljiv materijal",
              "Kompaktna, kruta konstrukcija za brzu ugradnju",
              "Prilagođene veličine mogu se lako proizvesti",
            ],
          },
          {
            heading: "YAFI KF 592/592/48-G3 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "YK", "Perivi filter"],
                ["Okvir", "G", "Pocinkovan lim"],
                ["Materijal", "P", "Poliuretan"],
                ["Tip nabora", "Z", "Cik-cak"],
                ["Zaptivka", "4", "POL 45/10"],
                ["Dimenzija", "–", "W × H × D"],
                ["Efikasnost", "G4", "EN 779"],
                ["", "Grubost 50%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: panelTable("sr", cassetteWashableRows),
          },
        ],
      },
      {
        slug: "predfilter-kartonski-okvir",
        name: "Predfilter sa kartonskim okvirom – YAFI KF",
        label: "Kartonski okvir · YAFI KKF",
        image: "/yafiproducts/kasetni-filteri/predfilter-sa-kartonskim-okvirom.webp",
        sku: "PF 592/592/48-G4-1",
        intro:
          "Specijalno dizajnirani kao prvostepeni filteri u ventilacionim jedinicama za suvu prašinu i kao predfilter za filtere veće efikasnosti. Plavi sintetički materijal za filtriranje, podržan tankom metalnom mrežom, postavljen je u vodootporni kartonski okvir.",
        specs: [
          { label: "Tip filtera", value: "Panelni filter proširene površine" },
          {
            label: "Materijal",
            value: "Sintetička vlakna laminirana sa produženom metalnom mrežom",
          },
          { label: "Okvir", value: "Karton" },
          { label: "Klasa", value: "G4 / ISO Grubost 65%" },
          { label: "Konačni pad pritiska", value: "250 Pa" },
          { label: "Maks. temperatura", value: "80 °C" },
        ],
        standards: [
          "Klasa G4 – EN 779",
          "Grubost 65% – ISO 16890",
          "Vodootporni kartonski okvir",
          "Radna temperatura do 80 °C",
        ],
        sections: [
          {
            heading: "Predfilter sa kartonskim okvirom – Opis",
            body: [
              "Specijalno dizajnirani kao prvostepeni filteri u ventilacionim jedinicama za suvu prašinu i kao predfilter za filtere veće efikasnosti. Plavi sintetički materijal za filtriranje koji je podržan tankom metalnom mrežom postavljen je u vodootporni kartonski okvir. Za niski pad pritiska i veliku sposobnost zadržavanja prašine filterski materijal se postavlja u cik-cak obliku.",
              "Dostupno u standardnim i prilagođenim veličinama.",
            ],
          },
          {
            heading: "Primena",
            body: ["Primarni filter za klimatizacione sisteme."],
          },
          {
            heading: "Prednosti",
            list: [
              "Vodootporni kartonski okvir za jednokratnu upotrebu",
              "Potpuno oslonjeni mediji nalepljeni na žičanu mrežu",
              "Ekonomičan rad i površina visoke filtracije",
              "Veliki kapacitet zadržavanja prašine, nizak pad pritiska",
              "Kompaktna, kruta konstrukcija za brzu ugradnju",
              "Brza instalacija",
            ],
          },
          {
            heading: "YAFI KF 592/592/48-G4 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "KF", "Panelni filter"],
                ["Okvir", "K", "Karton"],
                ["Materijal", "M", "Plavi sintetički materijal"],
                ["Tip nabora", "Z", "Cik-cak"],
                ["Zaptivka", "X", "Ne"],
                ["Dimenzija", "–", "W × H × D"],
                ["Efikasnost", "G4", "EN 779"],
                ["", "Grubost 65%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: panelTable("sr", cassetteCardboardRows),
          },
        ],
      },
      {
        slug: "predfilter-metalni-okvir",
        name: "Predfilter sa metalnim okvirom – YAFI KF",
        label: "Metalni okvir · YAFI KF",
        image: "/yafiproducts/kasetni-filteri/predfilter-sa-metalnim-okvirom.webp",
        sku: "PF 592/592/48-G4 - 1",
        intro:
          "Specijalno dizajnirani kao prvostepeni filteri u ventilacionim jedinicama za suvu prašinu i kao predfilter za filtere veće efikasnosti. Sintetički medij za filtriranje poduprt je metalnom mrežicom postavljenom u metalni okvir.",
        specs: [
          { label: "Tip filtera", value: "Panelni filter proširene površine" },
          {
            label: "Materijal",
            value: "Sintetičko vlakno laminirano produženom metalnom mrežom",
          },
          { label: "Okvir", value: "Pocinkovani lim" },
          { label: "Klasa", value: "G4 / ISO Grubost 65%" },
          { label: "Konačni pad pritiska", value: "250 Pa" },
          { label: "Maks. temperatura", value: "100 °C" },
        ],
        standards: [
          "Klasa G4 – EN 779",
          "Grubost 65% – ISO 16890",
          "Pocinkovani okvir",
          "Radna temperatura do 100 °C",
        ],
        sections: [
          {
            heading: "Predfilter sa metalnim okvirom – Opis",
            body: [
              "Specijalno dizajnirani kao prvostepeni filteri u ventilacionim jedinicama za suvu prašinu i kao predfilter za filtere veće efikasnosti. Sintetički medij za filtriranje je poduprt metalnom mrežicom postavljenom u metalni okvir. Za niski pad pritiska i veliku sposobnost zadržavanja prašine, filterski materijal se postavlja u cik-cak obliku.",
              "Dostupno u standardnim i prilagođenim veličinama.",
            ],
          },
          {
            heading: "Primena",
            body: ["Primarni filter za klimatizacione sisteme."],
          },
          {
            heading: "Prednosti",
            list: [
              "Robusna konstrukcija za pouzdan rad",
              "Potpuno oslonjeni mediji nalepljeni na žičanu mrežu",
              "Ekonomičan rad i površina visoke filtracije",
              "Veliki kapacitet zadržavanja prašine, nizak pad pritiska",
              "Kompaktna, kruta konstrukcija za brzu ugradnju",
              "Prilagođene veličine su dostupne na zahtev",
            ],
          },
          {
            heading: "YAFI KF 592/592/48-G3 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "KF", "Panelni filter"],
                ["Okvir", "G", "Pocinkovani lim"],
                ["Materijal", "S", "Sintetika"],
                ["Tip nabora", "Z", "Cik-cak"],
                ["Zaptivka", "X", "Ne"],
                ["Dimenzija", "–", "W × H × D"],
                ["Efikasnost", "G4", "EN 779"],
                ["", "Grubost 65%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: panelTable("sr", cassetteMetalRows),
          },
        ],
      },
    ],
  },
  {
    slug: "vrecasti-filteri",
    name: "Vrećasti filteri",
    nameAcc: "vrećaste filtere",
    title: "Vrećasti filteri – YAFI VF",
    class: "G3 – F9, poliester i polipropilen",
    image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-za-finu-prasinu-metalni-okvir-F7.webp",
    description:
      "Multi-vrećasta konstrukcija za velike protoke vazduha uz dugotrajnu efikasnost, standard u industrijskim sistemima.",
    intro:
      "Vrećasti filteri od poliesterskih vlakana za filtraciju vazduha klasa G3 do M5. Filtracione vreće obezbeđuju ujednačen protok vazduha i kvalitetno zadržavanje prašine, a u izradi se koriste materijali usklađeni sa ekološkim standardima. Poliesterske vreće pokrivaju klase G3 – M5, a polipropilenske klase M5 – F9.",
    applications: [
      "Industrijski pogoni",
      "Aerodromi",
      "Bolnice",
      "Fina filtracija u klima komorama",
    ],
    standards: [
      "Klase G3 – M5 (poliester)",
      "Klase M5 – F9 (polipropilen)",
      "Staklena vlakna M6 – F9",
      "ISO ePM1 / ePM2.5 / ePM10",
    ],
    keywords: [
      "vrecasti filter",
      "dzepasti filter",
      "bag filter",
      "pocket filter",
      "yafi vf",
    ],
    items: [
      {
        slug: "vrecasti-filter-metalni-ram-g4-m5",
        name: "Vrećasti filteri u metalnom limenom ramu G4/M5 – YAFI VF",
        label: "Metalni lim · G4 / M5",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filteri-u-metalnom-limenom-ramu-G4-M5.webp",
        sku: "VF-592/592/360-6-G4",
        intro:
          "Koristi se kao prvostepeni filter ili kao predfilter za filtere veće efikasnosti u ventilacionim jedinicama, sa izdržljivim ramom koji se može proizvesti sa različitim brojem vreća i dubinom vreće u zavisnosti od primene. Sintetički medij za filtriranje i metalni okvir odupiru se teškim radnim uslovima.",
        specs: [
          { label: "Tip filtera", value: "Vrećasti filter" },
          { label: "Materijal", value: "Sintetička vlakna" },
          { label: "Okvir", value: "Pocinkovani čelik" },
          { label: "Klasa", value: "G4 / Grubost 65%" },
          { label: "Konačni pad pritiska", value: "250 Pa" },
          { label: "Maks. temperatura", value: "80 °C" },
        ],
        standards: [
          "Klase G3 – M5 – EN 779",
          "Grubost 50 – 80% – ISO 16890",
          "Pocinkovani čelični ram",
          "Radna temperatura do 80 °C",
        ],
        sections: [
          {
            heading: "Vrećasti filteri u metalnom limenom ramu G4/M5 – Opis",
            body: [
              "Koristi se kao prvostepeni filter ili kao predfilter za filtere veće efikasnosti u ventilacionim jedinicama, sa izdržljivim ramom koji se može proizvesti sa različitim brojem vreća i dubinom vreće u zavisnosti od primene. Sintetički medij za filtriranje i metalni okvir odupiru se teškim radnim uslovima.",
            ],
          },
          {
            heading: "Primena",
            body: ["Primarni filter klima i ventilacionih sistema."],
          },
          {
            heading: "Prednosti",
            list: [
              "Robusna konstrukcija za pouzdan rad",
              "Optimizovana površina medija u obliku konusnog džepa",
              "Veliki kapacitet zadržavanja prašine, nizak pad pritiska",
              "Kompaktna, kruta konstrukcija za brzu ugradnju",
              "Mogu se proizvesti prilagođene veličine",
              "Dostupno sa plastičnim okvirom",
            ],
          },
          {
            heading: "YAFI VF 592/592/360-6-G4 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "VF", "Vrećasti filter"],
                ["Okvir", "G", "Pocinkovan"],
                ["Materijal", "S", "Sintetička vlakna"],
                ["Debljina okvira", "H", "L: 20 mm, H: 25 mm"],
                ["Dimenzija", "–", "W × H × D"],
                ["Broj džepova", "6", "6"],
                ["Efikasnost", "G4", "EN 779"],
                ["", "Grubost 65%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: bagTable("sr", bagMetalRows),
          },
        ],
      },
      {
        slug: "vrecasti-filter-fina-prasina-m6",
        name: "Vrećasti filter za finu prašinu – metalni okvir M6 – YAFI VF",
        label: "Fina prašina · M6",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-za-finu-prasinu-metalni-okvir-M6.webp",
        sku: "VF-592/592/500-8-M6",
        intro:
          "Napravljeni od troslojnih visokokvalitetnih sintetičkih materijala kao fini i visoko efikasni filteri. Termozavarene vreće garantuju dugotrajnost. Filterski medij je izgrađen od niza zapečaćenih vreća za postizanje visokog protoka vazduha pri niskom padu pritiska.",
        specs: [
          { label: "Tip filtera", value: "Visoko efikasni vrećasti filter" },
          { label: "Materijal", value: "Sintetička vlakna" },
          { label: "Okvir", value: "Pocinkovani čelik" },
          { label: "Klasa", value: "M6 / ePM10 65%" },
          { label: "Konačni pad pritiska", value: "450 Pa" },
          { label: "Maks. temperatura", value: "90 °C" },
        ],
        standards: [
          "Klasa M6 – EN 779",
          "ePM10 65% – ISO 16890",
          "Termozavarene vreće",
          "Radna temperatura do 90 °C",
        ],
        sections: [
          {
            heading: "Vrećasti filter za finu prašinu – metalni okvir M6 – Opis",
            body: [
              "Napravljeni od troslojnih visokokvalitetnih sintetičkih materijala kao fini i visoko efikasni filteri. Termozavarene vreće garantuju dugotrajnost. Filterski medij je izgrađen od niza zapečaćenih vreća za postizanje visokog protoka vazduha pri niskom padu pritiska.",
            ],
          },
          { heading: "Primena", body: ["Klima uređaji."] },
          {
            heading: "Prednosti",
            list: [
              "Robusna konstrukcija za pouzdan rad",
              "Optimizovana površina medija u obliku konusnog džepa",
              "Veliki kapacitet zadržavanja prašine, nizak pad pritiska",
              "Kompaktna, kruta konstrukcija za brzu ugradnju",
              "Debljina okvira može biti 20 mm ili 25 mm",
            ],
          },
          {
            heading: "YAFI VF 592/592/500-8-M6 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "TF", "Vrećasti filter"],
                ["Okvir", "G", "Pocinkovani čelik"],
                ["Materijal", "S", "Sintetička vlakna"],
                ["Debljina okvira", "H", "L: 20 mm, H: 25 mm"],
                ["Dimenzije", "–", "W × H × D"],
                ["Broj džepova", "8", "8 džepova"],
                ["Efikasnost", "M6", "EN 779"],
                ["", "ePM10 65%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: bagTable("sr", bagM6Rows),
          },
        ],
      },
      {
        slug: "vrecasti-filter-fina-prasina-f7",
        name: "Vrećasti filter za finu prašinu – metalni okvir F7 – YAFI VF",
        label: "Fina prašina · F7",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-za-finu-prasinu-metalni-okvir-F7.webp",
        sku: "VF-592/592/500-8-FY",
        intro:
          "Napravljeni od troslojnih visokokvalitetnih sintetičkih medija kao fini i visoko efikasni filteri nakon filtriranja u prvoj fazi. Termozavarene vreće garantuju dugotrajnost. Materijal je izgrađen od niza zapečaćenih vreća za postizanje visokog protoka vazduha pri niskom padu pritiska.",
        specs: [
          { label: "Tip filtera", value: "Visoko efikasni vrećasti filter" },
          { label: "Materijal", value: "Sintetička vlakna" },
          { label: "Okvir", value: "Pocinkovani čelik" },
          { label: "Klasa", value: "F7 / ePM2,5 65%" },
          { label: "Konačni pad pritiska", value: "450 Pa" },
          { label: "Maks. temperatura", value: "90 °C" },
        ],
        standards: [
          "Klasa F7 – EN 779",
          "ePM2,5 65% – ISO 16890",
          "Termozavarene vreće",
          "Radna temperatura do 90 °C",
        ],
        sections: [
          {
            heading: "Vrećasti filter za finu prašinu – metalni okvir F7 – Opis",
            body: [
              "Napravljeni od troslojnih visokokvalitetnih sintetičkih medija kao fini i visoko efikasni filteri nakon filtriranja u prvoj fazi. Termozavarene vreće garantuju dugotrajnost. Materijal je izgrađen od niza zapečaćenih vreća za postizanje visokog protoka vazduha pri niskom padu pritiska.",
            ],
          },
          { heading: "Primena", body: ["Klima uređaji."] },
          {
            heading: "Prednosti",
            list: [
              "Robusna konstrukcija za pouzdan rad",
              "Optimizovana površina medija u obliku konusnog džepa",
              "Veliki kapacitet zadržavanja prašine, nizak pad pritiska",
              "Kompaktna, kruta konstrukcija za brzu ugradnju",
              "Debljina okvira može biti 20 mm ili 25 mm",
            ],
          },
          {
            heading: "YAFI VF 592/592/500-8-FY – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "TF", "Vrećasti filter"],
                ["Okvir", "G", "Pocinkovani čelik"],
                ["Materijal", "S", "Sintetička vlakna"],
                ["Debljina okvira", "H", "L: 20 mm, H: 25 mm"],
                ["Dimenzije", "–", "W × H × D"],
                ["Broj džepova", "8", "8 džepova"],
                ["Efikasnost", "F7", "EN 779:2012"],
                ["", "ePM2,5 65%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: bagTable("sr", bagF7Rows),
          },
        ],
      },
      {
        slug: "vrecasti-filter-fina-prasina-f8",
        name: "Vrećasti filter za finu prašinu – metalni okvir F8 – YAFI VF",
        label: "Fina prašina · F8",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-za-finu-prasinu-metalni-okvir-F8.webp",
        sku: "VF-592/592/500-8-F8",
        intro:
          "Napravljeni od troslojnih visokokvalitetnih sintetičkih medija kao fini i visoko efikasni filteri nakon filtriranja u prvoj fazi. Termozavarene vreće garantuju dugotrajnost. Filter je izgrađen od niza zapečaćenih vreća za postizanje visokog protoka vazduha pri niskom padu pritiska.",
        specs: [
          { label: "Tip filtera", value: "Visoko efikasni vrećasti filter" },
          { label: "Materijal", value: "Sintetička vlakna" },
          { label: "Okvir", value: "Pocinkovani čelik" },
          { label: "Klasa", value: "F8 / ePM1 70%" },
          { label: "Konačni pad pritiska", value: "450 Pa" },
          { label: "Maks. temperatura", value: "90 °C" },
        ],
        standards: [
          "Klasa F8 – EN 779",
          "ePM1 70% – ISO 16890",
          "Termozavarene vreće",
          "Radna temperatura do 90 °C",
        ],
        sections: [
          {
            heading: "Vrećasti filter za finu prašinu – metalni okvir F8 – Opis",
            body: [
              "Napravljeni od troslojnih visokokvalitetnih sintetičkih medija kao fini i visoko efikasni filteri nakon filtriranja u prvoj fazi. Termozavarene vreće garantuju dugotrajnost. Filter je izgrađen od niza zapečaćenih vreća za postizanje visokog protoka vazduha pri niskom padu pritiska.",
            ],
          },
          { heading: "Primena", body: ["Klima uređaji."] },
          {
            heading: "Prednosti",
            list: [
              "Robusna konstrukcija za pouzdan rad",
              "Optimizovana površina medija u obliku konusnog džepa",
              "Veliki kapacitet zadržavanja prašine, nizak pad pritiska",
              "Kompaktna, kruta konstrukcija za brzu ugradnju",
              "Debljina okvira može biti 20 mm ili 25 mm",
            ],
          },
          {
            heading: "YAFI VF 592/592/500-8-F8 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "TF", "Vrećasti filter"],
                ["Okvir", "G", "Pocinkovani čelik"],
                ["Materijal", "S", "Sintetička vlakna"],
                ["Debljina okvira", "H", "L: 20 mm, H: 25 mm"],
                ["Dimenzije", "–", "W × H × D"],
                ["Broj džepova", "8", "8 džepova"],
                ["Efikasnost", "F8", "EN 779"],
                ["", "ePM1 70%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: bagTable("sr", bagF8Rows),
          },
        ],
      },
      {
        slug: "vrecasti-filter-fina-prasina-f9",
        name: "Vrećasti filter za finu prašinu – metalni okvir F9 – YAFI VF",
        label: "Fina prašina · F9",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-za-finu-prasinu-metalni-okvir-F9.webp",
        sku: "YAFI VF - 592/592/500-8-F8-1",
        intro:
          "Napravljeni od troslojnih visokokvalitetnih sintetičkih medija kao fini i visoko efikasni filteri nakon filtriranja u prvoj fazi. Termozavarene vreće garantuju dugotrajnost. Filter je izgrađen od niza zapečaćenih vreća za postizanje visokog protoka vazduha pri niskom padu pritiska.",
        specs: [
          { label: "Tip filtera", value: "Visoko efikasni vrećasti filter" },
          { label: "Materijal", value: "Sintetička vlakna" },
          { label: "Okvir", value: "Pocinkovani čelik" },
          { label: "Klasa", value: "F9 / ePM1 80%" },
          { label: "Konačni pad pritiska", value: "450 Pa" },
          { label: "Maks. temperatura", value: "90 °C" },
        ],
        standards: [
          "Klasa F9 – EN 779",
          "ePM1 80% – ISO 16890",
          "Termozavarene vreće",
          "Radna temperatura do 90 °C",
        ],
        sections: [
          {
            heading: "Vrećasti filter za finu prašinu – metalni okvir F9 – Opis",
            body: [
              "Napravljeni od troslojnih visokokvalitetnih sintetičkih medija kao fini i visoko efikasni filteri nakon filtriranja u prvoj fazi. Termozavarene vreće garantuju dugotrajnost. Filter je izgrađen od niza zapečaćenih vreća za postizanje visokog protoka vazduha pri niskom padu pritiska.",
            ],
          },
          { heading: "Primena", body: ["Klima uređaji."] },
          {
            heading: "Prednosti",
            list: [
              "Robusna konstrukcija za pouzdan rad",
              "Optimizovana površina medija u obliku konusnog džepa",
              "Veliki kapacitet zadržavanja prašine, nizak pad pritiska",
              "Kompaktna, kruta konstrukcija za brzu ugradnju",
              "Debljina okvira može biti 20 mm ili 25 mm",
            ],
          },
          {
            heading: "YAFI VF 592/592/500-8-F8 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "TF", "Vrećasti filter"],
                ["Okvir", "G", "Pocinkovani čelik"],
                ["Materijal", "S", "Sintetička vlakna"],
                ["Debljina okvira", "H", "L: 20 mm, H: 25 mm"],
                ["Dimenzije", "–", "W × H × D"],
                ["Broj džepova", "8", "8 džepova"],
                ["Efikasnost", "F9", "EN 779"],
                ["", "ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: bagTable("sr", bagF9Rows),
          },
        ],
      },
      {
        slug: "vrecasti-filter-staklena-vlakna-m6-f9",
        name: "Vrećasti filter od staklenih vlakana od M6 do F9 – YAFI VF",
        label: "Staklena vlakna · M6 – F9",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-od-staklenih-vlakana-za-finu-prasinu.webp",
        sku: "VF-592/592/500-8-F9",
        intro:
          "Napravljeni od visokokvalitetnih staklenih vlakana kao fini filteri visoke efikasnosti nakon prve faze filtracije. Kvalitetno zavarene vreće garantuju dugotrajnost. Filter je izgrađen od niza zapečaćenih vreća za postizanje visokog protoka vazduha pri niskom padu pritiska.",
        specs: [
          { label: "Tip filtera", value: "Visoko efikasni vrećasti filter" },
          { label: "Materijal", value: "Sintetička vlakna" },
          { label: "Okvir", value: "Pocinkovani čelik" },
          { label: "Klasa", value: "M6 do F8 / ePM10 60% – ePM1 65%" },
          { label: "Konačni pad pritiska", value: "450 Pa" },
          { label: "Maks. temperatura", value: "90 °C" },
        ],
        standards: [
          "Klase M6 – F9 – EN 779",
          "ePM10 60% – ePM1 80% – ISO 16890",
          "Staklena vlakna",
          "Radna temperatura do 90 °C",
        ],
        sections: [
          {
            heading: "Vrećasti filter od staklenih vlakana od M6 do F9 – Opis",
            body: [
              "Napravljeni od visokokvalitetnih staklenih vlakana kao fini filteri visoke efikasnosti nakon prve faze filtracije. Kvalitetno zavarene vreće garantuju dugotrajnost. Filter je izgrađen od niza zapečaćenih vreća za postizanje visokog protoka vazduha pri niskom padu pritiska.",
            ],
          },
          { heading: "Primena", body: ["Klima uređaji."] },
          {
            heading: "Prednosti",
            list: [
              "Robusna konstrukcija za pouzdan rad",
              "Novi razvijeni dizajn za najbolju distribuciju vazduha",
              "Veliki kapacitet zadržavanja prašine, nizak pad pritiska",
              "Kompaktna, kruta konstrukcija za brzu ugradnju",
              "Debljina okvira može biti 20 mm ili 25 mm",
            ],
          },
          {
            heading: "YAFI VF 592/592/500-8-F9 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "TF", "Vrećasti filter"],
                ["Okvir", "G", "Pocinkovani čelik"],
                ["Materijal", "G", "Staklena vlakna"],
                ["Debljina okvira", "H", "L: 20 mm, H: 25 mm"],
                ["Dimenzija", "–", "W × H × D"],
                ["Broj vreća", "8", "8 vreća"],
                ["Efikasnost", "M6-F9", "EN 779"],
                ["", "ePM10 60% – ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: bagTable("sr", bagGlassRows),
          },
        ],
      },
    ],
  },
  {
    slug: "rigidni-v-filteri",
    name: "Rigidni V filteri – YAFI RF",
    nameAcc: "rigidne V filtere",
    class: "F6 – F9, staklena i celulozna vlakna",
    image: "/yafiproducts/rigidni-v-filteri/Rigidni-Vrecasti-Filter-Plasticni-Okvir-4V-Standard.webp",
    description:
      "Rigidna V konstrukcija sa mini-plisiranom medijom visoke gustine — maksimalna filtraciona površina u ograničenom prostoru ugradnje.",
    intro:
      "Rigidni V filteri izrađeni su od staklenih ili celuloznih vlakana i služe za visokokvalitetnu filtraciju najfinije prašine. Program obuhvata klase F6 – F9, u panelnim i vrećastim izvedbama sa aluminijumskim, metalnim ili plastičnim okvirom.",
    applications: [
      "Čiste zone",
      "Farmaceutska industrija",
      "Elektronika",
      "Fina filtracija ispred HEPA filtera",
    ],
    standards: [
      "Klase F6 – F9",
      "Staklena vlakna",
      "Celulozna vlakna",
      "ISO ePM1",
    ],
    keywords: [
      "rigidni filter",
      "v filter",
      "kompaktni filter",
      "mini-pleat",
      "separator",
      "4v",
      "yafi rf",
    ],
    items: [
      {
        slug: "aluminijumski-separator-filteri",
        name: "Filteri sa aluminijumskim separatorima",
        label: "Separator",
        image: "/yafiproducts/rigidni-v-filteri/Aluminijumski-Seperator-Filteri-Pocinkovani-lim-292mm.webp",
        sku: "YAFI RF - 592|592|48-FY-8",
        intro:
          "Filteri sa aluminijumskim separatorima su duboko naborani filteri dizajnirani za visoku efikasnost filtracije i veliku brzinu protoka vazduha, za upotrebu u bolnicama, farmaceutskoj industriji i sličnim objektima. Umesto tradicionalnog mini naboranog dizajna, kao separator se koristi valoviti aluminijum.",
        specs: [
          {
            label: "Tip filtera",
            value: "Aluminijumski separator panelni filter",
          },
          { label: "Materijal", value: "Mikro staklena vlakna" },
          { label: "Okvir", value: "Pocinkovani lim" },
          { label: "Separatori", value: "Aluminijum" },
          { label: "Vezivanje", value: "Dvokomponentni poliuretan" },
          { label: "Konačni pad pritiska", value: "450 Pa" },
          { label: "Maks. temperatura", value: "350 °C" },
        ],
        standards: [
          "Klase M6 – F9 – EN 779",
          "ePM10 65% – ePM1 80% – ISO 16890",
          "Radna temperatura do 350 °C",
          "Aluminijumski separatori",
        ],
        sections: [
          {
            heading:
              "Aluminijumski separator filteri, pocinkovani lim – 292 mm – Opis",
            body: [
              "Filteri sa aluminijumskim separatorima su duboko naborani filteri dizajnirani za visoku efikasnost filtracije i veliku brzinu protoka vazduha, za upotrebu u bolnicama, farmaceutskoj industriji i sličnim objektima. Umesto tradicionalnog mini naboranog dizajna, kao separator se koristi valoviti aluminijum. Ovi separatori sa udvostručenim rubom daju krutost filteru, pa filter može da odoli visokoj radnoj temperaturi.",
              "Izvedba od pocinkovanog lima sa prednjom i dvostrukom prirubnicom takođe je dostupna na zahtev.",
            ],
          },
          {
            heading: "Primena",
            body: ["Klima uređaji i industrijski sistemi."],
          },
          {
            heading: "Prednosti",
            list: [
              "Kompaktan dizajn i robusna konstrukcija",
              "Odlične performanse u teškim uslovima uz visok kapacitet zadržavanja prašine",
              "Velika površina za filtriranje sa najnovije razvijenim medijima od staklenih vlakana visoke vodoodbojnosti",
              "Mogu se proizvesti prilagođene veličine",
            ],
          },
          {
            heading: "YAFI RF 592|592|292-M6 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "AS", "Aluminijumski separator"],
                ["Okvir", "G", "G: Pocinkovani lim"],
                ["Model", "S", "S: Standard Flow, H: High Flow"],
                [
                  "Prirubnica",
                  "T",
                  "X: Bez, T: Jednostruka, D: Dvostruka",
                ],
                ["Zaptivka", "P", "X: Ne, E: EPDM, P: Poliuretan"],
                ["Efikasnost", "M6 do F9", "EN 779"],
                ["", "ePM10 65% – ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: rigidTable("sr", rigidSeparatorRows, { showClass: false }),
          },
        ],
      },
      {
        slug: "rigidni-panelni-aluminijumski-okvir",
        name: "Rigidni panelni filter – aluminijumski okvir – YAFI RF",
        label: "Panelni · aluminijum",
        image:
          "/yafiproducts/rigidni-v-filteri/Rigidni-Panelni-Filter-Metalni-Okvir-sa-zaglavljem.webp",
        sku: "YAFI RF - 592|592|48-FY-3",
        intro:
          "Rigidni panelni filter sa aluminijumskim okvirom dizajniran je za visoko efikasnu filtraciju, za upotrebu u bolnicama, farmaceutskoj industriji i sličnim objektima. Pogodan je za klimatizacione jedinice u kojima je prostor ograničen.",
        specs: [
          { label: "Tip filtera", value: "Kompaktni panelni filter" },
          { label: "Materijal", value: "Stakleno vlakno" },
          { label: "Okvir", value: "Pocinkovani lim" },
          {
            label: "Klasa filtera",
            value: "M6 do F8 / ePM10 65% – ePM1 80%",
          },
          { label: "Konačni pad pritiska", value: "450 Pa" },
          { label: "Maks. temperatura", value: "90 °C" },
        ],
        standards: [
          "Klase M6 – F9 – EN 779",
          "ePM10 65% – ePM1 80% – ISO 16890",
          "Aluminijumski okvir",
          "Radna temperatura do 90 °C",
        ],
        sections: [
          {
            heading: "Rigidni panelni filter, aluminijumski okvir – Opis",
            body: [
              "Dizajniran za visoko efikasnu filtraciju, za upotrebu u bolnicama, farmaceutskoj industriji i sličnim objektima. Pogodan je za klimatizacione jedinice u kojima je prostor ograničen. Može se koristiti kao filter visoke efikasnosti umesto postojećeg filtera niske efikasnosti u sistemima klimatizacije.",
              "Ekstrudirani aluminijumski okvir drži ploču od staklenog mikrovlakna. Materijal je nabran kako bi se stvorila kruta struktura filtera.",
            ],
          },
          {
            heading: "Primena",
            body: ["Klima uređaji i industrijski sistemi."],
          },
          {
            heading: "Prednosti",
            list: [
              "Čvrst filter za ugradnju u uskom prostoru",
              "Zamenljiv sa postojećim filterima bez izmena postojeće konstrukcije",
              "Velika površina filtracije, nizak pad pritiska",
              "Dug radni vek, smanjeni operativni troškovi",
              "Mogu se proizvesti prilagođene veličine",
            ],
          },
          {
            heading: "YAFI RF 592|592|130-FY – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "LK", "Rigidni panelni filter (header)"],
                ["Okvir", "A", "A: Aluminijum"],
                ["Visina plita", "L", "N: 50 mm, L: 100 mm"],
                [
                  "Zaštitna mreža",
                  "T",
                  "X: Ne, T: Jednostruka, D: Dvostruka",
                ],
                ["Zaptivka", "X", "X: Ne, E: EPDM"],
                ["Efikasnost", "M6 do F9", "EN 779"],
                ["", "ePM10 65% – ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: rigidTable("sr", rigidAluminiumRows),
          },
        ],
      },
      {
        slug: "rigidni-panelni-metalni-okvir-zaglavlje",
        name: "Rigidni panelni filter – metalni okvir sa zaglavljem – YAFI RF",
        label: "Panelni · metal, zaglavlje",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Panelni-Filter-Metalni-Okvir-sa-zaglavljem.webp",
        sku: "YAFI RF - 592|592|48-FY-2",
        intro:
          "Rigidni panelni filter sa metalnim okvirom i zaglavljem dizajniran je za visoko efikasnu filtraciju, za upotrebu u bolnicama, farmaceutskoj industriji i sličnim objektima. Pogodan je za jedinice u kojima je prostor ograničen.",
        specs: [
          { label: "Tip filtera", value: "Kompaktni panelni filter" },
          { label: "Materijal", value: "Stakleno vlakno" },
          { label: "Okvir", value: "Pocinkovani lim" },
          {
            label: "Klasa filtera",
            value: "M6 do F8 / ePM10 65% – ePM1 80%",
          },
          { label: "Konačni pad pritiska", value: "450 Pa" },
          { label: "Maks. temperatura", value: "90 °C" },
        ],
        standards: [
          "Klase M6 – F9 – EN 779",
          "ePM10 65% – ePM1 80% – ISO 16890",
          "Metalni okvir sa zaglavljem",
          "Radna temperatura do 90 °C",
        ],
        sections: [
          {
            heading:
              "Rigidni panelni filter, metalni okvir sa zaglavljem – Opis",
            body: [
              "Rigidni panelni filter sa metalnim okvirom i zaglavljem dizajniran je za visoko efikasnu filtraciju, za upotrebu u bolnicama, farmaceutskoj industriji i sličnim objektima. Pogodan je za jedinice u kojima je prostor ograničen. Može se koristiti kao filter visoke efikasnosti umesto postojećeg filtera niske efikasnosti u sistemima klimatizacije.",
              "Zbog kompaktne i robusne konstrukcije i veće efikasnosti tokom rada mogu se koristiti i kao završni filter. Materijal je nabran kako bi se stvorila kruta struktura filtera.",
            ],
          },
          {
            heading: "Primena",
            body: ["Klima uređaji i industrijski sistemi."],
          },
          {
            heading: "Prednosti",
            list: [
              "Čvrst filter za ugradnju u uskom prostoru",
              "Zamenljiv sa postojećim filterima bez izmena postojeće konstrukcije",
              "Velika površina filtracije, nizak pad pritiska",
              "Dug radni vek, smanjeni operativni troškovi",
              "Mogu se proizvesti prilagođene veličine",
            ],
          },
          {
            heading: "YAFI RF 592|592|48-FY – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "LK", "Rigidni panelni filter (header)"],
                ["Okvir", "G", "G: Pocinkovani lim"],
                ["Visina plita", "M", "M: 75 mm"],
                [
                  "Zaštitna mreža",
                  "T",
                  "X: Ne, T: Jednostruka, D: Dvostruka",
                ],
                ["Zaptivka", "X", "X: Ne, E: EPDM, P: Poliuretan"],
                ["Efikasnost", "M6 do F9", "EN 779"],
                ["", "ePM10 65% – ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: rigidTable("sr", rigidHeaderRows),
          },
        ],
      },
      {
        slug: "rigidni-panelni-plasticni-okvir",
        name: "Rigidni panelni filter – plastični okvir – YAFI RF",
        label: "Panelni · plastika",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Panelni-Filter-Plasticni-Okvir.webp",
        sku: "YAFI RF - 592|592|48-FY",
        intro:
          "Rigidni panelni filter sa plastičnim okvirom dizajniran je za visoko efikasnu filtraciju, za upotrebu u bolnicama, farmaceutskoj industriji i sličnim objektima. Pogodan je za jedinice u kojima je prostor ograničen.",
        specs: [
          { label: "Tip filtera", value: "Kompaktni panelni filter" },
          { label: "Materijal", value: "Staklena vuna" },
          { label: "Okvir", value: "Plastični okvir" },
          {
            label: "Klasa filtera",
            value: "M6 do F8 / ePM10 65% – ePM1 80%",
          },
          { label: "Konačni pad pritiska", value: "450 Pa" },
          { label: "Maks. temperatura", value: "90 °C" },
        ],
        standards: [
          "Klase M6 – F9 – EN 779",
          "ePM10 65% – ePM1 80% – ISO 16890",
          "Plastični okvir",
          "Radna temperatura do 90 °C",
        ],
        sections: [
          {
            heading: "Rigidni panelni filter, plastični okvir – Opis",
            body: [
              "Rigidni panelni filter sa plastičnim okvirom dizajniran je za visoko efikasnu filtraciju, za upotrebu u bolnicama, farmaceutskoj industriji i sličnim objektima. Pogodan je za jedinice u kojima je prostor ograničen. Može se koristiti kao filter visoke efikasnosti umesto postojećeg filtera niske efikasnosti u sistemima klimatizacije.",
              "Alternativa tradicionalnim panelnim filterima, za primene u kojima je potreban vazduh visoke čistoće.",
            ],
          },
          {
            heading: "Primena",
            body: ["Klima uređaji i industrijski sistemi."],
          },
          {
            heading: "Prednosti",
            list: [
              "Čvrst filter za ugradnju u uskom prostoru",
              "Zamenljiv sa postojećim filterima bez izmena postojeće konstrukcije",
              "Velika površina filtracije, nizak pad pritiska",
              "Veliki kapacitet zadržavanja prašine, nizak pad pritiska",
              "Dug radni vek, smanjeni operativni troškovi",
            ],
          },
          {
            heading: "YAFI RF 592|592|48-FY – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "UK", "Rigidni panelni filter"],
                ["Okvir", "P", "P: Plastika"],
                ["Visina plita", "N", "N: 50 mm, L: 100 mm"],
                [
                  "Zaštitna mreža",
                  "X",
                  "X: Ne, T: Jednostruka, D: Dvostruka",
                ],
                ["Zaptivka", "X", "X: Ne, E: EPDM, P: Poliuretan"],
                ["Efikasnost", "M6 do F9", "EN 779"],
                ["", "ePM10 65% – ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: rigidTable("sr", rigidPlasticRows),
          },
        ],
      },
      {
        slug: "rigidni-panelni-plasticni-okvir-zaglavlje",
        name: "Rigidni panelni filter – plastični okvir sa zaglavljem – YAFI RF",
        label: "Panelni · plastika, zaglavlje",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Panelni-Filter-Plasticni-Okvir-sa-zaglavljem.webp",
        sku: "YAFI RF - 592|592|48-FY-1",
        intro:
          "Rigidni panelni filter sa plastičnim okvirom i zaglavljem dizajniran je za visoko efikasnu filtraciju, za upotrebu u bolnicama, farmaceutskoj industriji i sličnim objektima. Pogodan je za jedinice u kojima je prostor ograničen.",
        specs: [
          { label: "Tip filtera", value: "Kompaktni panelni filter" },
          { label: "Materijal", value: "Stakleno vlakno" },
          { label: "Okvir", value: "Plastični okvir" },
          {
            label: "Klasa filtera",
            value: "M6 do F8 / ePM10 65% – ePM1 80%",
          },
          { label: "Konačni pad pritiska", value: "450 Pa" },
          { label: "Maks. temperatura", value: "90 °C" },
        ],
        standards: [
          "Klase M6 – F9 – EN 779",
          "ePM10 65% – ePM1 80% – ISO 16890",
          "Plastični okvir sa zaglavljem",
          "Radna temperatura do 90 °C",
        ],
        sections: [
          {
            heading:
              "Rigidni panelni filter, plastični okvir sa zaglavljem – Opis",
            body: [
              "Rigidni panelni filter sa plastičnim okvirom i zaglavljem dizajniran je za visoko efikasnu filtraciju, za upotrebu u bolnicama, farmaceutskoj industriji i sličnim objektima. Pogodan je za jedinice u kojima je prostor ograničen. Može se koristiti kao filter visoke efikasnosti umesto postojećeg filtera niske efikasnosti u sistemima klimatizacije.",
              "Alternativa tradicionalnim panelnim filterima, za primene u kojima je potreban vazduh visoke čistoće. Mogu se proizvesti standardne i vanstandardne veličine.",
            ],
          },
          {
            heading: "Primena",
            body: ["Klima uređaji i industrijski sistemi."],
          },
          {
            heading: "Prednosti",
            list: [
              "Čvrst filter za ugradnju u uskom prostoru",
              "Zamenljiv sa postojećim filterima bez izmena postojeće konstrukcije",
              "Velika površina filtracije, nizak pad pritiska",
              "Veliki kapacitet zadržavanja prašine, nizak pad pritiska",
              "Dug radni vek, smanjeni operativni troškovi",
            ],
          },
          {
            heading: "YAFI RF 592|592|48-FY – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "UK", "Rigidni panelni filter (header)"],
                ["Okvir", "P", "P: Plastika"],
                ["Visina plita", "N", "N: 50 mm, L: 100 mm"],
                [
                  "Zaštitna mreža",
                  "X",
                  "X: Ne, T: Jednostruka, D: Dvostruka",
                ],
                ["Zaptivka", "X", "X: Ne, E: EPDM, P: Poliuretan"],
                ["Efikasnost", "M6 do F9", "EN 779"],
                ["", "ePM10 65% – ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: rigidTable("sr", rigidPlasticHeaderRows),
          },
        ],
      },
      {
        slug: "rigidni-vrecasti-metalni-okvir-4v",
        name: "Rigidni vrećasti filter – metalni okvir 4V",
        label: "Vrećasti 4V · metal",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Vrecasti-Filter-Metalni-Okvir-4V.webp",
        sku: "YAFI RF - 592|592|48-FY-7",
        intro:
          "Rigidni vrećasti filter dizajniran je za visoko efikasnu filtraciju, za upotrebu u bolnicama, farmaceutskoj industriji i sličnim objektima. Papir od staklenih vlakana visoke filtracije preklopljen je konstantno kalibrisanim razmakom pomoću termoplastičnih niti.",
        specs: [
          { label: "Tip filtera", value: "W kompaktni panelni filter" },
          { label: "Materijal", value: "Stakleno vlakno" },
          { label: "Okvir", value: "Pocinkovani lim" },
          {
            label: "Klasa filtera",
            value: "M6 do F8 / ePM10 65% – ePM1 80%",
          },
          { label: "Konačni pad pritiska", value: "450 Pa" },
          { label: "Maks. temperatura", value: "80 °C" },
        ],
        standards: [
          "Klase M6 – F9 – EN 779",
          "ePM10 65% – ePM1 80% – ISO 16890",
          "Pocinkovani metalni okvir",
          "Radna temperatura do 80 °C",
        ],
        sections: [
          {
            heading: "Rigidni vrećasti filter, metalni okvir 4V – Opis",
            body: [
              "Rigidni vrećasti filter dizajniran je za visoko efikasnu filtraciju, za upotrebu u bolnicama, farmaceutskoj industriji i sličnim objektima. Papir od staklenih vlakana visoke filtracije preklopljen je konstantno kalibrisanim razmakom pomoću termoplastičnih niti. Velika površina filtracije omogućava veliku brzinu protoka vazduha pri niskom padu pritiska i visok kapacitet zadržavanja prašine u poređenju sa tradicionalnim vrećastim filterima.",
              "Kompaktan dizajn i lagana konstrukcija daju filteru vrhunsku mehaničku otpornost i jednostavnu ugradnju.",
            ],
          },
          {
            heading: "Primena",
            body: ["Klima uređaji i industrijski sistemi."],
          },
          {
            heading: "Prednosti",
            list: [
              "Čvrst filter za ugradnju u uskom prostoru",
              "Odlične performanse u teškim uslovima uz visok kapacitet zadržavanja prašine",
              "Velika površina za filtriranje sa najnovije razvijenim medijima od staklenih vlakana visoke vodoodbojnosti",
              "Mogu se proizvesti prilagođene veličine",
            ],
          },
          {
            heading: "YAFI RF 592|592|292-FY – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "WK", "W kompaktni filter"],
                ["Okvir", "G", "G: Pocinkovani lim"],
                ["Visina plita", "S", "S: 25 mm"],
                ["Zaštitna mreža", "X", "X: Ne, P: Plastika"],
                ["Zaptivka", "X", "X: Ne, E: EPDM, P: Poliuretan"],
                ["Efikasnost", "M6 do F9", "EN 779"],
                ["", "ePM10 65% – ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: rigidTable("sr", rigidBag4VMetalRows),
          },
        ],
      },
      {
        slug: "rigidni-vrecasti-plasticni-okvir-4v-energy",
        name: "Rigidni vrećasti filter – plastični okvir 4V | Energy",
        label: "Vrećasti 4V · Energy",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Vrecasti-Filter-Plasticni-Okvir-4V-Energy.webp",
        sku: "YAFI RF - 592|592|48-FY-5",
        intro:
          "Rigidni vrećasti filter dizajniran je za visoko efikasnu filtraciju, za upotrebu u bolnicama, farmaceutskoj industriji i sličnim objektima. Papir od staklenih vlakana visoke filtracije preklopljen je konstantno kalibrisanim razmakom pomoću termoplastičnih niti.",
        specs: [
          { label: "Tip filtera", value: "W kompaktni panelni filter" },
          { label: "Materijal", value: "Stakleno vlakno" },
          { label: "Okvir", value: "Plastika" },
          {
            label: "Klasa filtera",
            value: "M6 do F8 / ePM10 65% – ePM1 80%",
          },
          { label: "Konačni pad pritiska", value: "450 Pa" },
          { label: "Maks. temperatura", value: "80 °C" },
        ],
        standards: [
          "Klase M6 – F9 – EN 779",
          "ePM10 65% – ePM1 80% – ISO 16890",
          "Plastični okvir",
          "Radna temperatura do 80 °C",
        ],
        sections: [
          {
            heading:
              "Rigidni vrećasti filter, plastični okvir 4V | Energy – Opis",
            body: [
              "Rigidni vrećasti filter dizajniran je za visoko efikasnu filtraciju, za upotrebu u bolnicama, farmaceutskoj industriji i sličnim objektima. Papir od staklenih vlakana visoke filtracije preklopljen je konstantno kalibrisanim razmakom pomoću termoplastičnih niti. Velika površina filtracije omogućava veliku brzinu protoka vazduha pri niskom padu pritiska i visok kapacitet zadržavanja prašine u poređenju sa tradicionalnim vrećastim filterima.",
              "Kompaktan dizajn i lagana konstrukcija daju filteru vrhunsku mehaničku otpornost i jednostavnu ugradnju.",
            ],
          },
          {
            heading: "Primena",
            body: ["Klima uređaji i industrijski sistemi."],
          },
          {
            heading: "Prednosti",
            list: [
              "Čvrst filter za ugradnju u uskom prostoru",
              "Odlične performanse u teškim uslovima uz visok kapacitet zadržavanja prašine",
              "Velika površina za filtriranje sa najnovije razvijenim medijima od staklenih vlakana visoke vodoodbojnosti",
              "Lako održavanje",
            ],
          },
          {
            heading: "YAFI RF 592|592|292-FY – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "WK", "W kompaktni filter"],
                ["Okvir", "P", "P: Plastika"],
                ["Visina plita", "E", "S: 25 mm"],
                ["Zaštitna mreža", "X", "X: Ne, P: Plastika"],
                ["Zaptivka", "X", "X: Ne, E: EPDM"],
                ["Efikasnost", "M6 do F9", "EN 779"],
                ["", "ePM10 65% – ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: rigidTable("sr", rigidBag4VEnergyRows),
          },
        ],
      },
      {
        slug: "rigidni-vrecasti-plasticni-okvir-4v-max-flow",
        name: "Rigidni vrećasti filter – plastični okvir 4V | Max Flow",
        label: "Vrećasti 4V · Max Flow",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Vrecasti-Filter-Plasticni-Okvir-Max-Flow.webp",
        sku: "YAFI RF - 592|592|48-FY-6",
        intro:
          "Rigidni vrećasti filter dizajniran je za visoko efikasnu filtraciju, za upotrebu u bolnicama, farmaceutskoj industriji i sličnim objektima. Papir od staklenih vlakana visoke filtracije preklopljen je konstantno kalibrisanim razmakom pomoću termoplastičnih niti.",
        specs: [
          { label: "Tip filtera", value: "W kompaktni panelni filter" },
          { label: "Materijal", value: "Stakleno vlakno" },
          { label: "Okvir", value: "Plastika" },
          {
            label: "Klasa filtera",
            value: "M6 do F8 / ePM10 65% – ePM1 80%",
          },
          { label: "Konačni pad pritiska", value: "450 Pa" },
          { label: "Maks. temperatura", value: "80 °C" },
        ],
        standards: [
          "Klase M6 – F9 – EN 779",
          "ePM10 65% – ePM1 80% – ISO 16890",
          "Close pleat izvedba",
          "Radna temperatura do 80 °C",
        ],
        sections: [
          {
            heading:
              "Rigidni vrećasti filter, plastični okvir 4V | Max Flow – Opis",
            body: [
              "Rigidni vrećasti filter dizajniran je za visoko efikasnu filtraciju, za upotrebu u bolnicama, farmaceutskoj industriji i sličnim objektima. Papir od staklenih vlakana visoke filtracije preklopljen je konstantno kalibrisanim razmakom pomoću termoplastičnih niti. Velika površina filtracije omogućava veliku brzinu protoka vazduha pri niskom padu pritiska i visok kapacitet zadržavanja prašine u poređenju sa tradicionalnim vrećastim filterima.",
              "Kompaktan dizajn i lagana konstrukcija daju filteru vrhunsku mehaničku otpornost i jednostavnu ugradnju.",
            ],
          },
          {
            heading: "Primena",
            body: ["Klima uređaji i industrijski sistemi."],
          },
          {
            heading: "Prednosti",
            list: [
              "Čvrst filter za ugradnju u uskom prostoru",
              "Odlične performanse u teškim uslovima uz visok kapacitet zadržavanja prašine",
              "Velika površina za filtriranje sa najnovije razvijenim medijima od staklenih vlakana visoke vodoodbojnosti",
              "Lako održavanje",
            ],
          },
          {
            heading: "YAFI RF 592|592|292-FY – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "WK", "W kompaktni filter"],
                ["Okvir", "P", "P: Plastika"],
                ["Visina plita", "M", "M: 25 mm – Close Pleat"],
                ["Zaštitna mreža", "D", "D: Dvostruka"],
                ["Zaptivka", "P", "E: EPDM, P: Poliuretan"],
                ["Efikasnost", "M6 do F9", "EN 779"],
                ["", "ePM10 65% – ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: rigidTable("sr", rigidBag4VMaxFlowRows),
          },
        ],
      },
      {
        slug: "rigidni-vrecasti-plasticni-okvir-4v-standard",
        name: "Rigidni vrećasti filter – plastični okvir 4V | Standard",
        label: "Vrećasti 4V · Standard",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Vrecasti-Filter-Plasticni-Okvir-4V-Standard.webp",
        sku: "YAFI RF - 592|592|48-FY-4",
        intro:
          "Rigidni vrećasti filter dizajniran je za visoko efikasnu filtraciju, za upotrebu u bolnicama, farmaceutskoj industriji i sličnim objektima. Papir od staklenih vlakana visoke filtracije preklopljen je konstantno kalibrisanim razmakom pomoću termoplastičnih niti.",
        specs: [
          { label: "Tip filtera", value: "W kompaktni panelni filter" },
          { label: "Materijal", value: "Stakleno vlakno" },
          { label: "Okvir", value: "Plastika" },
          {
            label: "Klasa filtera",
            value: "M6 do F8 / ePM10 65% – ePM1 80%",
          },
          { label: "Konačni pad pritiska", value: "450 Pa" },
          { label: "Maks. temperatura", value: "80 °C" },
        ],
        standards: [
          "Klase M6 – F9 – EN 779",
          "ePM10 65% – ePM1 80% – ISO 16890",
          "Plastični okvir",
          "Radna temperatura do 80 °C",
        ],
        sections: [
          {
            heading:
              "Rigidni vrećasti filter, plastični okvir 4V | Standard – Opis",
            body: [
              "Rigidni vrećasti filter dizajniran je za visoko efikasnu filtraciju, za upotrebu u bolnicama, farmaceutskoj industriji i sličnim objektima. Papir od staklenih vlakana visoke filtracije preklopljen je konstantno kalibrisanim razmakom pomoću termoplastičnih niti. Velika površina filtracije omogućava veliku brzinu protoka vazduha pri niskom padu pritiska i visok kapacitet zadržavanja prašine u poređenju sa tradicionalnim vrećastim filterima.",
              "Kompaktan dizajn i lagana konstrukcija daju filteru vrhunsku mehaničku otpornost i jednostavnu ugradnju.",
            ],
          },
          {
            heading: "Primena",
            body: ["Klima uređaji i industrijski sistemi."],
          },
          {
            heading: "Prednosti",
            list: [
              "Čvrst filter za ugradnju u uskom prostoru",
              "Odlične performanse u teškim uslovima uz visok kapacitet zadržavanja prašine",
              "Velika površina za filtriranje sa najnovije razvijenim medijima od staklenih vlakana visoke vodoodbojnosti",
              "Lako održavanje",
            ],
          },
          {
            heading: "YAFI RF 592|592|292-FY – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "WK", "W kompaktni filter"],
                ["Okvir", "P", "P: Plastika"],
                ["Visina plita", "S", "S: 25 mm"],
                ["Zaštitna mreža", "X", "X: Ne, P: Plastika"],
                ["Zaptivka", "X", "X: Ne, E: EPDM"],
                ["Efikasnost", "M6 do F9", "EN 779"],
                ["", "ePM10 65% – ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: rigidTable("sr", rigidBag4VStandardRows),
          },
        ],
      },
    ],
  },
  {
    slug: "hepa-ulpa-filteri",
    name: "Apsolutni filteri – HEPA",
    nameAcc: "apsolutne HEPA filtere",
    title: "Apsolutni filteri – HEPA – YAFI AF",
    class: "EN 1822, E10 – H14",
    image: "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filteri-MDF-Okvir-78mm.webp",
    description:
      "Krajnji stepen filtracije za validovane čiste prostore. Zadržavaju čestice submikronskih dimenzija sa visokom pouzdanošću.",
    intro:
      "YAFI AF su HEPA, odnosno apsolutni filteri, proizvedeni od finih sintetičkih i mikrostaklenih vlakana, sa visokim procentom zadržavanja prašine. Izrađuju se u ramovima od aluminijuma i medijapana (MDF), uz minimalnu potrošnju energije. Koriste se tamo gde su zahtevi za čistoću vazduha najveći — u farmaciji, mikroelektronici, operacionim salama, živinskim farmama i čistim sobama.",
    applications: [
      "Farmaceutska industrija",
      "Mikroelektronika",
      "Operacione sale",
      "Živinske farme",
      "Čiste sobe",
    ],
    standards: [
      "EN 1822 · E10 – H14",
      "EPA i HEPA klase",
      "Sintetička i mikrostaklena vlakna",
      "Aluminijumski i MDF ramovi",
      "Gelom zaptivane izvedbe",
    ],
    keywords: [
      "apsolutni filter",
      "hepa filter",
      "ulpa filter",
      "cleanroom filter",
      "laminarni protok",
      "mdf",
      "yafi af",
      "yafi hf",
    ],
    items: [
      {
        slug: "hepa-mdf-78mm",
        name: "Apsolutni HEPA filteri – MDF okvir 78 mm – YAFI HF",
        label: "MDF 78 mm · YAFI HF",
        group: "MDF i galvanizovani okvir",
        image: "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filteri-MDF-Okvir-78mm.webp",
      },
      {
        slug: "hepa-mdf-mn",
        name: "Apsolutni HEPA filteri MN – MDF okvir",
        label: "MN",
        group: "MDF i galvanizovani okvir",
        image: "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filteri-MN-MDF-Okvir.webp",
      },
      {
        slug: "hepa-mdf-mn-150mm",
        name: "Apsolutni HEPA filteri MN – MDF okvir 150 mm – YAFI HF",
        label: "MN · 150 mm",
        group: "MDF i galvanizovani okvir",
        image: "/yafiproducts/apsolutni-filteri/3/Apsolutni-HEPA-Filteri-MN-MDF-Okvir-150mm.webp",
      },
      {
        slug: "hepa-mdf-ml-150mm",
        name: "Apsolutni HEPA filteri ML – MDF okvir 150 mm",
        label: "ML · 150 mm",
        group: "MDF i galvanizovani okvir",
        image: "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filteri-ML-MDF-Okvir.webp",
      },
      {
        slug: "hepa-mdf-292mm-hf-ml-xp",
        name: "Apsolutni HEPA filteri – MDF okvir 292 mm – HF-ML-XP",
        label: "HF-ML-XP · 292 mm",
        group: "MDF i galvanizovani okvir",
        image: "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filteri-MDF-Okvir-292mm-HF-ML-XP.webp",
      },
      {
        slug: "hepa-mdf-hf-mx-xp",
        name: "Apsolutni HEPA filteri – MDF okvir – HF-MX-XP",
        label: "HF-MX-XP",
        group: "MDF i galvanizovani okvir",
        image: "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filteri-MDF-Okvir-HF-MX-XP.webp",
      },
      {
        slug: "hepa-mdf-hf-mh-xp",
        name: "Apsolutni HEPA filteri – MDF okvir – HF-MH-XP",
        label: "HF-MH-XP",
        group: "MDF i galvanizovani okvir",
        image: "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filteri-MDF-okvir-HF-MH-XP.webp",
      },
      {
        slug: "hepa-hf-mn-xp",
        name: "Apsolutni HEPA filteri – HF-MN-XP",
        label: "HF-MN-XP",
        group: "MDF i galvanizovani okvir",
        image: "/yafiproducts/apsolutni-filteri/3/Apsolutni-HEPA-Filteri-HF-MN-XP.webp",
      },
      {
        slug: "hepa-galvanizovan-gx",
        name: "Apsolutni HEPA filter – galvanizovan okvir GX",
        label: "GX",
        group: "MDF i galvanizovani okvir",
        image: "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filter-Galvanizovan-Okvir-GX.webp",
      },
      {
        slug: "hepa-galvanizovan-gh",
        name: "Apsolutni HEPA filter – galvanizovan okvir GH",
        label: "GH",
        group: "MDF i galvanizovani okvir",
        image: "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filter-Galvanizovan-Okvir-GH.webp",
      },
      {
        slug: "hepa-galvanizovan-ax",
        name: "Apsolutni HEPA filter – galvanizovan okvir AX",
        label: "AX",
        group: "MDF i galvanizovani okvir",
        image:
          "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filter-Galvanizovan-Okvir-GX.webp",
      },
      {
        slug: "hepa-galvanizovan-ah",
        name: "Apsolutni HEPA filter – galvanizovan okvir AH",
        label: "AH",
        group: "MDF i galvanizovani okvir",
        image:
          "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filter-Galvanizovan-Okvir-GH-1.webp",
      },
      {
        slug: "hepa-pocinkovani-lim-gs-gh",
        name: "Filter od pocinkovanog lima GS/GH",
        label: "GS / GH",
        group: "MDF i galvanizovani okvir",
        image: "/yafiproducts/apsolutni-filteri/2/Filter-od-pocinkovanog-lima-GS-GH.webp",
      },
      {
        slug: "hepa-rigidni-ph-plasticni-4v",
        name: "Rigidni filter PH – plastični okvir 4V – EPA / HEPA",
        label: "PH · plastični okvir",
        group: "Rigidni 4V i visoki kapacitet",
        image: "/yafiproducts/apsolutni-filteri/1/Rigidni-Filter-PH-Plasticni-Okvir-4V-EPA-HEPA.webp",
      },
      {
        slug: "hepa-rigidni-gh-metalni-4v",
        name: "Rigidni filter GH – metalni okvir 4V – EPA / HEPA",
        label: "GH · metalni okvir",
        group: "Rigidni 4V i visoki kapacitet",
        image: "/yafiproducts/apsolutni-filteri/1/Rigidni-Filter-GH-Metalnii-Okvir-4V-EPA-HEPA.webp",
      },
      {
        slug: "hepa-rigidni-panelni-metalni",
        name: "Rigidni panelni filter – metalni okvir",
        label: "Panelni · metalni okvir",
        group: "Rigidni 4V i visoki kapacitet",
        image: "/yafiproducts/apsolutni-filteri/3/Rigidni-Panelni-Filter-Metalni-okvir.webp",
      },
      {
        slug: "hepa-v-tip-g30",
        name: "Apsolutni HEPA filter visokog kapaciteta – V tip G30 (standard)",
        label: "G30 · standard",
        group: "Rigidni 4V i visoki kapacitet",
        image: "/yafiproducts/apsolutni-filteri/2/Apsolutni-HEPA-Filter-Visokog-Capaciteta-V-Type-G30-Standard.webp",
      },
      {
        slug: "hepa-v-tip-40",
        name: "Apsolutni HEPA filter visokog kapaciteta – V tip 40",
        label: "40",
        group: "Rigidni 4V i visoki kapacitet",
        image: "/yafiproducts/apsolutni-filteri/2/Apsolutni-HEPA-Filter-Visokog-Capaciteta-V-Type-40.webp",
      },
      {
        slug: "hepa-v-tip-p30",
        name: "Apsolutni HEPA filter visokog kapaciteta – V tip P30, standardni plastični okvir",
        label: "P30 · plastični okvir",
        group: "Rigidni 4V i visoki kapacitet",
        image: "/yafiproducts/apsolutni-filteri/2/Apsolutni-HEPA-Filter-Visokog-kapaciteta-V-Type-P30-Standardni-Plasticni-Okvir.webp",
      },
      {
        slug: "hepa-v-tip-p40",
        name: "Apsolutni HEPA filter visokog kapaciteta – V tip P40, plastični okvir",
        label: "P40 · plastični okvir",
        group: "Rigidni 4V i visoki kapacitet",
        image: "/yafiproducts/apsolutni-filteri/2/Apsolutni-HEPA-Filter-Visokog-kapaciteta-V-Type-P40-Plasticni-Okvir.webp",
      },
      {
        slug: "hepa-v-tip-nbc",
        name: "Apsolutni HEPA filter visokog kapaciteta – V tip NBC Grade",
        label: "NBC Grade",
        group: "Rigidni 4V i visoki kapacitet",
        image: "/yafiproducts/apsolutni-filteri/2/Apsolutni-HEPA-Filter-Visokog-Kapaciteta-V-Tip-NBC-Grade.webp",
      },
      {
        slug: "hepa-laminarni-as",
        name: "HEPA filter sa laminarnim protokom – aluminijumski okvir AS",
        label: "AS",
        group: "Laminarni protok i gelom zaptivani",
        image: "/yafiproducts/apsolutni-filteri/2/HEPA-Filter-sa-Laminarnim-protokom-Aluminijumski-okvir-AS.webp",
      },
      {
        slug: "hepa-laminarni-al-125",
        name: "HEPA filter sa laminarnim protokom – aluminijumski okvir AL 125 mm",
        label: "AL · 125 mm",
        group: "Laminarni protok i gelom zaptivani",
        image: "/yafiproducts/apsolutni-filteri/3/HEPA-Filter-sa-Laminarnim-protokom-Aluminijumski-Okvir-AL-125mm.webp",
      },
      {
        slug: "hepa-laminarni-al-150",
        name: "HEPA filter sa laminarnim protokom – aluminijumski okvir AL 150 mm",
        label: "AL · 150 mm",
        group: "Laminarni protok i gelom zaptivani",
        image: "/yafiproducts/apsolutni-filteri/3/HEPA-Filter-sa-Luminarnim-protokom-Aluminijumski-Okvir-AL-150mm.webp",
      },
      {
        slug: "hepa-laminarni-am-110",
        name: "HEPA filter sa laminarnim protokom – aluminijumski okvir AM 110 mm",
        label: "AM · 110 mm",
        group: "Laminarni protok i gelom zaptivani",
        image: "/yafiproducts/apsolutni-filteri/2/HEPA-Filter-sa-Luminarnim-protokom-Aluminijumski-Okvir-AM-110mm.webp",
      },
      {
        slug: "hepa-laminarni-an-66",
        name: "HEPA filter sa laminarnim protokom – aluminijumski okvir AN 66 mm",
        label: "AN · 66 mm",
        group: "Laminarni protok i gelom zaptivani",
        image: "/yafiproducts/apsolutni-filteri/2/HEPA-Filter-sa-Luminarnim-protokom-Aluminijumski-Okvir-AN-66mm.webp",
      },
      {
        slug: "hepa-laminarni-an-69",
        name: "HEPA filter sa laminarnim protokom – aluminijumski okvir AN 69 mm",
        label: "AN · 69 mm",
        group: "Laminarni protok i gelom zaptivani",
        image: "/yafiproducts/apsolutni-filteri/2/HEPA-Filter-sa-Luminarnim-protokom-Aluminijumski-Okvir-AN-69mm.webp",
      },
      {
        slug: "hepa-laminarni-an-78",
        name: "HEPA filter sa laminarnim protokom – aluminijumski okvir AN 78 mm",
        label: "AN · 78 mm",
        group: "Laminarni protok i gelom zaptivani",
        image: "/yafiproducts/apsolutni-filteri/2/HEPA-Filter-sa-Luminarnim-protokom-Aluminijumski-Okvir-AN-78mm.webp",
      },
      {
        slug: "hepa-laminarni-an-110",
        name: "HEPA filter sa laminarnim protokom – aluminijumski okvir AN 110 mm",
        label: "AN · 110 mm",
        group: "Laminarni protok i gelom zaptivani",
        image: "/yafiproducts/apsolutni-filteri/3/HEPA-Filter-sa-Luminarnim-protokom-Aluminijumski-Okvir-AN-110mm.webp",
      },
      {
        slug: "hepa-laminarni-an-125",
        name: "HEPA filter sa laminarnim protokom – aluminijumski okvir AN 125 mm",
        label: "AN · 125 mm",
        group: "Laminarni protok i gelom zaptivani",
        image: "/yafiproducts/apsolutni-filteri/2/HEPA-Filter-sa-Luminarnim-protokom-Aluminijumski-Okvir-AN-125mm.webp",
      },
      {
        slug: "hepa-laminarni-an-150",
        name: "HEPA filter sa laminarnim protokom – aluminijumski okvir AN 150 mm",
        label: "AN · 150 mm",
        group: "Laminarni protok i gelom zaptivani",
        image: "/yafiproducts/apsolutni-filteri/3/HEPA-Filter-sa-Luminarnim-protokom-Aluminijumski-Okvir-AN-150mm.webp",
      },
      {
        slug: "hepa-gel-an-80",
        name: "Gelom zaptivani HEPA filteri – aluminijumski okvir AN 80 mm",
        label: "AN · 80 mm",
        group: "Laminarni protok i gelom zaptivani",
        image: "/yafiproducts/apsolutni-filteri/3/Gelom-Zaptivani-HEPA-Filteri-Aluminijumski-Okvir-AN-80mm.webp",
      },
      {
        slug: "hepa-gel-an-91",
        name: "Gelom zaptivani HEPA filteri – aluminijumski okvir AN 91 mm",
        label: "AN · 91 mm",
        group: "Laminarni protok i gelom zaptivani",
        image: "/yafiproducts/apsolutni-filteri/3/Gelom-Zaptivani-HEPA-Filteri-Aluminijumski-Okvir-AN-91mm.webp",
      },
      {
        slug: "hepa-gel-an-104",
        name: "Gelom zaptivani HEPA filteri – aluminijumski okvir AN 104 mm",
        label: "AN · 104 mm",
        group: "Laminarni protok i gelom zaptivani",
        image: "/yafiproducts/apsolutni-filteri/3/Gelom-Zaptivani-HEPA-Filteri-Aluminijumski-Okvir-AN-104mm.webp",
      },
    ],
  },
  {
    slug: "filteri-mirisi-masnoce",
    name: "Filteri za uklanjanje mirisa i masnoće",
    nameAcc: "filtere za uklanjanje mirisa i masnoće",
    title: "Filteri za masne pare – YAFI MF",
    class: "Aktivni ugalj i masni filteri",
    image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/Kertridzi-sa-aktivnim-ugljem.webp",
    description:
      "Aktivni ugalj za gasovite polutante i mirise, i masni filteri za kuhinjske nape — tamo gde mehanička filtracija nije dovoljna.",
    intro:
      "Filteri za masne pare namenjeni su restoranima, napama za roštilj i zaštiti od mirisa — pre svega u proizvodnji i preradi hrane. Program obuhvata izvedbe sa aktivnim ugljem, kertridž izvedbe i masne filtere sa mrežnim okvirom.",
    applications: [
      "Restorani i kuhinje",
      "Nape za roštilj",
      "Proizvodnja i prerada hrane",
      "Kontrola mirisa",
      "Parking garaže",
    ],
    keywords: [
      "ugalj filter",
      "carbon filter",
      "gas filter",
      "masni filter",
      "masne pare",
      "grease filter",
      "kertridz",
      "napa",
      "mirisi",
      "yafi mf",
    ],
    items: [
      {
        slug: "filter-aktivni-ugalj-pelet",
        name: "Filter sa aktivnim ugljem napunjen ugljeničnim peletom",
        label: "Aktivni ugalj · pelet",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/Filter-sa-aktivnim-ugljem-napunjen-ugljenicnim-peletom.webp",
        sku: "YAFI MV-AU 592/592/48-AC",
        intro:
          "Dizajniran za apsorpciju mirisa i gasova u industrijskim i komercijalnim klima uređajima. Plastični okvir ispunjen je labavim granuliranim ili ekstrudiranim aktivnim ugljem, što omogućava veoma dug radni vek.",
        specs: [
          { label: "Tip filtera", value: "AC panelni filter" },
          { label: "Materijal", value: "Pelet sa aktivnim ugljem" },
          {
            label: "Okvir",
            value: "Pocinkovani čelik / nerđajući čelik",
          },
          { label: "Klasa", value: "Filtracija mirisa" },
          { label: "Maks. temperatura", value: "80 °C" },
          { label: "Maks. relativna vlažnost", value: "70%" },
        ],
        standards: [
          "Filtracija mirisa i gasova",
          "Aktivni ugalj u peletu",
          "Radna temperatura do 80 °C",
          "RH maks. 70%",
        ],
        sections: [
          {
            heading:
              "Filter sa aktivnim ugljem napunjen ugljeničnim peletom – Opis",
            body: [
              "Dizajniran za apsorpciju mirisa i gasova u industrijskim i komercijalnim klima uređajima. Plastični okvir ispunjen je labavim granuliranim ili ekstrudiranim aktivnim ugljem, što omogućava veoma dug radni vek.",
              "Pogodno za tešku industrijsku primenu sa visokim performansama.",
            ],
          },
          {
            heading: "Primena",
            body: ["Apsorpcija mirisa i gasova u vazduhu."],
          },
          {
            heading: "Prednosti",
            list: [
              "Robusna konstrukcija za brzu ugradnju",
              "Tehnika vibriranog punjenja sprečava taloženje medija",
              "Dostupan u izvedbi za gasnu apsorpciju i hemisorpciju",
              "Robusna konstrukcija omogućava lako montiranje i uklanjanje",
              "Mogu se proizvesti prilagođene veličine",
            ],
          },
          {
            heading: "YAFI MV-AU 592/592/48-AC – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "KD", "Panelni filter sa aktivnim ugljem"],
                ["Okvir", "G", "Galvanizovan čelik"],
                ["Materijal", "K", "Pelet od aktivnog uglja"],
                ["Tip plita", "D", "Popunjen"],
                ["Zaptivka", "X", "–"],
                ["Dimenzije", "–", "W × H × D"],
                ["Efikasnost", "AC", "Aktivni ugalj"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: figureTable("sr", carbonHead, carbonPelletRows),
          },
        ],
      },
      {
        slug: "filter-cvrste-vrece-aktivni-ugalj",
        name: "Filter sa čvrstim vrećama i aktivnim ugljem",
        label: "Aktivni ugalj · čvrste vreće",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/Filter-sa-cvrstim-vrecama.webp",
        sku: "YAFI KW-PC-XX-592|592|292-CFY",
        intro:
          "Dizajniran za apsorpciju mirisa i gasova uz efikasnost filtracije prašine, u industrijskim i komercijalnim klima uređajima. Netkani materijal efikasnosti F7, sa dva sloja koji sadrže male granule aktivnog uglja, naboran je i postavljen u plastični okvir.",
        specs: [
          { label: "Tip filtera", value: "W kompaktni AC filter" },
          {
            label: "Materijal",
            value: "Aktivni ugalj između sintetičkih slojeva, 400 g/m²",
          },
          { label: "Okvir", value: "Plastika (polipropilen)" },
          { label: "Klasa filtera", value: "F7 / ePM1 55%" },
          { label: "Finalni pad pritiska", value: "450 Pa" },
          { label: "Maks. temperatura", value: "75 °C" },
        ],
        standards: [
          "Klasa F7 – EN 779",
          "ePM1 55% – ISO 16890",
          "Plastični okvir",
          "Radna temperatura do 75 °C",
        ],
        sections: [
          {
            heading: "Filter sa čvrstim vrećama i aktivnim ugljem – Opis",
            body: [
              "Dizajniran za apsorpciju mirisa i gasova uz efikasnost filtracije prašine, u industrijskim i komercijalnim klima uređajima. Netkani materijal efikasnosti F7, sa dva sloja koji sadrže male granule aktivnog uglja, naboran je i postavljen u plastični okvir. Poliuretanska smola garantuje zaptivanje između filterskog paketa i okvira.",
              "Da bi se produžio radni vek filtera, savetuje se korišćenje G4 – F5 predfiltera.",
            ],
          },
          {
            heading: "Primena",
            body: [
              "Molekularni filter za visoku efikasnost i dugotrajnu kontrolu molekularnih zagađivača.",
            ],
          },
          {
            heading: "Prednosti",
            list: [
              "Čvrst filter za ugradnju u uskom prostoru",
              "Manji pad pritiska uz visoke performanse i visok kapacitet uklanjanja kontaminacije",
              "Male granule aktivnog uglja u dva sloja netkanog materijala, bez otpuštanja prašine i regeneracije",
              "Lagan i lako održiv zahvaljujući ručkama",
            ],
          },
          {
            heading: "YAFI KW-PC-XX-592|592|292-CFY – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "KW", "V-bank AC filter"],
                ["Okvir", "P", "P: Plastika"],
                ["Materijal", "C", "S: 25 mm"],
                ["Zaštitna mreža", "X", "X: Ne, P: Plastika"],
                ["Zaptivka", "X", "X: Ne, E: EPDM, P: Poliuretan"],
                ["Efikasnost", "EN 779", "F7"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: figureTable("sr", carbonBagHead, carbonBagRows),
          },
        ],
      },
      {
        slug: "filter-produzena-povrsina-aktivni-ugalj",
        name: "Filter sa produženom površinom od aktivnog uglja",
        label: "Aktivni ugalj · produžena površina",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/Filter-sa-produzenom-povrsinom-od-aktivnog-uglja.webp",
        sku: "YAFI MV-AU 592/592/48-ZW",
        intro:
          "Dizajniran za apsorpciju mirisa i gasova u industrijskim i komercijalnim klima uređajima. Sintetički materijal impregniran aktivnim ugljem naboran je i postavljen u vodootporni kartonski okvir.",
        specs: [
          { label: "Tip filtera", value: "Filter proširene površine" },
          {
            label: "Materijal",
            value: "Sintetička vlakna impregnirana aktivnim ugljem",
          },
          { label: "Okvir", value: "Pocinkovani čelik" },
          { label: "Klasa filtera", value: "Filtracija mirisa" },
          { label: "Finalni pad pritiska", value: "250 Pa" },
          { label: "Maks. temperatura", value: "80 °C" },
        ],
        standards: [
          "Filtracija mirisa i dima",
          "Klasa G4 – Grubost 65%",
          "Impregnirana sintetička vlakna",
          "Radna temperatura do 80 °C",
        ],
        sections: [
          {
            heading:
              "Filter sa produženom površinom od aktivnog uglja – Opis",
            body: [
              "Dizajniran za apsorpciju mirisa i gasova u industrijskim i komercijalnim klima uređajima. Sintetički materijal impregniran aktivnim ugljem naboran je i postavljen u vodootporni kartonski okvir. Sintetički materijali podržani su metalnom mrežom i naborani radi velike površine filtracije. Dostupan u standardnim i vanstandardnim veličinama.",
              "Idealno rešenje za poboljšanje kvaliteta vazduha u zatvorenom prostoru, za lake industrijske primene.",
            ],
          },
          {
            heading: "Primena",
            body: ["Primarni filter za filtriranje mirisa i dima."],
          },
          {
            heading: "Prednosti",
            list: [
              "Robusna konstrukcija za brzu ugradnju",
              "Potpuno podržani mediji između dve žičane mreže",
              "Ekonomičan rad i velika površina filtracije",
              "Medij od sintetičkih vlakana impregniran fino mlevenim aktivnim ugljem",
              "Prilagođene veličine dostupne na zahtev",
            ],
          },
          {
            heading: "YAFI MF-AU 592/592/48-ZW – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "KK", "Panelni filter sa aktivnim ugljem"],
                ["Okvir", "G", "Galvanizovan čelik"],
                [
                  "Materijal",
                  "S",
                  "Sintetička vlakna impregnirana aktivnim ugljem",
                ],
                ["Tip plita", "Z", "Cik-cak"],
                ["Zaptivka", "X", "Bez zaptivke"],
                ["Dimenzija", "–", "W × H × D"],
                ["Efikasnost", "ZW", "Aktivni ugalj"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: panelTable("sr", carbonPleatedRows),
          },
        ],
      },
      {
        slug: "filteri-za-masti-mrezni-okvir",
        name: "Filteri za masti sa mrežnim okvirom",
        label: "Mrežni okvir · masti",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/filteri-za-masti-sa-pletenim-mreznim-okvirom.webp",
        sku: "YAFI PF 592/592/48-G3",
        intro:
          "Filteri za masti dizajnirani su za teške industrijske primene i kuhinjske nape, kao perivi filteri za prašinu i masnoću. Filterski medij od višeslojnih pocinkovanih pletenih mreža osigurava visoku sposobnost zadržavanja uz veoma dug radni vek.",
        specs: [
          { label: "Tip filtera", value: "Metalni panelni filter" },
          { label: "Materijal", value: "Pocinkovana pletena mreža" },
          { label: "Okvir", value: "Pocinkovani lim" },
          { label: "Klasa", value: "G2 / ISO Grubost 50%" },
          { label: "Konačni pad pritiska", value: "250 Pa" },
          { label: "Maks. temperatura", value: "120 °C" },
        ],
        standards: [
          "Klasa G3 – EN 779",
          "Grubost 50% – ISO 16890",
          "Perivo u mašini za pranje posuđa",
          "Radna temperatura do 120 °C",
        ],
        sections: [
          {
            heading: "Filteri za masti sa pletenim mrežnim okvirom – Opis",
            body: [
              "Filteri za masti dizajnirani su za teške industrijske primene i kuhinjske nape, kao perivi filteri za prašinu i masnoću. Okvir filtera može se proizvesti od pocinkovanog aluminijuma ili nerđajućeg čelika, a filterski mediji sastoje se od višeslojnih pocinkovanih pletenih mreža. Filterski medij osigurava visoku sposobnost zadržavanja prašine uz veoma dug radni vek i optimalnu efikasnost.",
              "Dostupno u standardnim i prilagođenim veličinama.",
            ],
          },
          {
            heading: "Primena",
            body: [
              "Primarni filter za odvajanje masti ili uljne maglice.",
            ],
          },
          {
            heading: "Prednosti",
            list: [
              "Robusna konstrukcija za pouzdan rad",
              "Ekonomičan rad i velika površina filtracije",
              "Kompaktna, kruta konstrukcija za brzu ugradnju",
              "Može se proizvesti i model od nerđajućeg čelika",
              "Može se očistiti u mašini za pranje posuđa ili pod visokim pritiskom",
            ],
          },
          {
            heading: "YAFI MF AU 592/592/48-G3 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "MK", "Metalni panelni filter"],
                ["Okvir", "G", "Pocinkovani lim"],
                ["Materijal", "G", "Pocinkovana pletena mreža"],
                ["Tip nabora", "D", "Ispunjen mrežicom"],
                ["Zaptivka", "X", "Ne"],
                ["Dimenzija", "–", "W × H × D"],
                ["Efikasnost", "G3", "EN 779"],
                ["", "Grubost 50%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: panelTable("sr", greaseMeshRows),
          },
        ],
      },
      {
        slug: "kertridzi-aktivni-ugalj",
        name: "Kertridži sa aktivnim ugljem",
        label: "Kertridž",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/Kertridzi-sa-aktivnim-ugljem.webp",
        sku: "YAFI MV-AU 145/450",
        intro:
          "Dizajniran za apsorpciju mirisa (dezodorizaciju) i adsorpciju VOC i gasova niske toksičnosti, za upotrebu u industrijskim i komercijalnim klima uređajima. Izbor najpogodnijeg adsorpcionog medijuma za svaki zahtev obezbeđuje najbolju adsorpciju mirisa i zagađivača.",
        specs: [
          { label: "Tip filtera", value: "Cilindar punjen aktivnim ugljem" },
          {
            label: "Materijal",
            value: "Aktivni ugalj, impregnirani aktivni ugalj",
          },
          {
            label: "Okvir",
            value: "Pocinkovani čelik / nerđajući čelik",
          },
          { label: "Klasa", value: "Filtracija mirisa" },
          { label: "Maks. temperatura", value: "40 °C" },
          { label: "Maks. relativna vlažnost", value: "70%" },
        ],
        standards: [
          "Filtracija mirisa i VOC",
          "Sistem brzog bajoneta",
          "Ponovno punjenje ugljenim medijem",
          "RH maks. 70%",
        ],
        sections: [
          {
            heading: "Kertridži sa aktivnim ugljem – Opis",
            body: [
              "Dizajniran za apsorpciju mirisa (dezodorizaciju) i adsorpciju VOC i gasova niske toksičnosti, za upotrebu u industrijskim i komercijalnim klima uređajima. Izbor najpogodnijeg adsorpcionog medijuma za svaki zahtev obezbeđuje najbolju adsorpciju mirisa i zagađivača. Kertridži su izrađeni od pocinkovanog ekspandiranog lima i punjeni aktivnim ugljem, a sistemom za brzo pričvršćivanje spajaju se na noseću ploču za 8 ili 16 kertridža; zaptivka daje maksimalnu nepropusnost vazduha.",
              "Specijalni dizajn kertridža čini održavanje i zamenu uglja veoma jednostavnim.",
            ],
          },
          {
            heading: "Primena",
            body: [
              "Molekularni filter za visoku efikasnost i dugotrajnu kontrolu molekularnih zagađivača.",
            ],
          },
          {
            heading: "Prednosti",
            list: [
              "Robusna konstrukcija za pouzdan rad",
              "Sistem brzog bajoneta",
              "Manji pad pritiska uz visoke performanse",
              "Ugradnja bez curenja obezbeđuje maksimalnu moguću efikasnost",
              "Ponovo se puni novim ugljenim medijem",
            ],
          },
          {
            heading: "YAFI MF-AU 145/450 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "SK", "Kertridž filter od ugljenika"],
                ["Materijal", "AC", "AC: Aktivni ugalj"],
                ["Okvir", "G", "G: Pocinkovan, S: Nerđajući čelik"],
                ["Model", "A", "Model A"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike – kompletan set",
            table: figureTable("sr", carbonHead, cartridgeSetRows),
          },
          {
            heading: "Rezervni kertridži",
            table: figureTable("sr", cartridgeSpareHead, cartridgeSpareRows),
          },
          {
            heading: "Noseći okviri",
            table: figureTable("sr", cartridgeFrameHead, cartridgeFrameRows),
          },
        ],
      },
      {
        slug: "kertridzi-aktivni-ugalj-model-b",
        name: "Kertridži sa aktivnim ugljem – model B",
        label: "Kertridž · model B",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/Kertridzi-sa-aktivnim-ugljem-B.webp",
        sku: "YAFI MV-AU 140/400",
        intro:
          "Dizajniran za apsorpciju mirisa (dezodorizaciju) i adsorpciju VOC i gasova niske toksičnosti, za upotrebu u industrijskim i komercijalnim klima uređajima. Izbor najpogodnijeg adsorpcionog medijuma za svaki zahtev obezbeđuje najbolju adsorpciju mirisa i zagađivača.",
        specs: [
          { label: "Tip filtera", value: "Cilindar punjen aktivnim ugljem" },
          {
            label: "Materijal",
            value: "Aktivni ugalj, impregnirani aktivni ugalj",
          },
          {
            label: "Okvir",
            value: "Pocinkovani čelik / nerđajući čelik",
          },
          { label: "Klasa", value: "Filtracija mirisa" },
          { label: "Maks. temperatura", value: "40 °C" },
          { label: "Maks. relativna vlažnost", value: "70%" },
        ],
        standards: [
          "Filtracija mirisa i VOC",
          "Sistem brzog bajoneta",
          "Ponovno punjenje ugljenim medijem",
          "RH maks. 70%",
        ],
        sections: [
          {
            heading: "Kertridži sa aktivnim ugljem model B – Opis",
            body: [
              "Dizajniran za apsorpciju mirisa (dezodorizaciju) i adsorpciju VOC i gasova niske toksičnosti, za upotrebu u industrijskim i komercijalnim klima uređajima. Izbor najpogodnijeg adsorpcionog medijuma za svaki zahtev obezbeđuje najbolju adsorpciju mirisa i zagađivača. Kertridži su izrađeni od obojenog ekspandiranog lima i punjeni aktivnim ugljem, a sistemom za brzo pričvršćivanje spajaju se na noseću ploču za 8 ili 16 kertridža; zaptivka daje maksimalnu nepropusnost vazduha.",
              "Specijalni dizajn kertridža čini održavanje i zamenu uglja veoma jednostavnim.",
            ],
          },
          {
            heading: "Primena",
            body: [
              "Molekularni filter za visoku efikasnost i dugotrajnu kontrolu molekularnih zagađivača.",
            ],
          },
          {
            heading: "Prednosti",
            list: [
              "Robusna konstrukcija za pouzdan rad",
              "Sistem brzog bajoneta",
              "Manji pad pritiska uz visoke performanse",
              "Ugradnja bez curenja obezbeđuje maksimalnu moguću efikasnost",
              "Ponovo se puni novim ugljenim medijem",
            ],
          },
          {
            heading: "YAFI MF-AU 140/400 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "SK", "Kertridž filter od ugljenika"],
                ["Materijal", "AC", "AC: Aktivni ugalj"],
                ["Okvir", "G", "G: Pocinkovan, S: Nerđajući čelik"],
                ["Model", "B", "Model B"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike – kompletan set",
            table: figureTable("sr", carbonHead, cartridgeBSetRows),
          },
          {
            heading: "Rezervni kertridži",
            table: figureTable("sr", cartridgeSpareHead, cartridgeBSpareRows),
          },
          {
            heading: "Noseći okviri",
            table: figureTable("sr", cartridgeFrameHead, cartridgeBFrameRows),
          },
        ],
      },
      {
        slug: "metalni-okvir-kuhinjske-nape",
        name: "Metalni okvir kuhinjske nape – YAFI PF",
        label: "Kuhinjska napa · YAFI PF",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/metalni-okvir-kuhinjske-nape.webp",
        sku: "PF 592/592/48-G2",
        intro:
          "Dizajniran za teške industrijske primene i kuhinjske nape, kao perivi filter za prašinu i masnoću. Filterski mediji sastoje se od višeslojnih aluminijumskih mreža koje osiguravaju visoku sposobnost zadržavanja masti uz veoma dug radni vek.",
        specs: [
          { label: "Tip filtera", value: "Metalni panelni filter" },
          { label: "Materijal", value: "Aluminijumska mreža" },
          { label: "Okvir", value: "Pocinkovani lim" },
          { label: "Klasa", value: "G2 / ISO Grubost 40%" },
          { label: "Konačni pad pritiska", value: "250 Pa" },
          { label: "Maks. temperatura", value: "120 °C" },
        ],
        standards: [
          "Klasa G2 – EN 779",
          "Grubost 40% – ISO 16890",
          "Perivo u mašini za pranje posuđa",
          "Radna temperatura do 120 °C",
        ],
        sections: [
          {
            heading: "Metalni okvir kuhinjske nape – Opis",
            body: [
              "Dizajniran za teške industrijske primene i kuhinjske nape, kao perivi filter za prašinu i masnoću. Okvir filtera može se proizvesti od pocinkovanog aluminijuma ili nerđajućeg čelika, a filterski mediji sastoje se od višeslojnih aluminijumskih mreža. Filterski medij osigurava visoku sposobnost zadržavanja masti uz veoma dug radni vek.",
              "Dostupno u standardnim i prilagođenim veličinama.",
            ],
          },
          {
            heading: "Primena",
            body: [
              "Primarni filter za odvajanje masti ili uljne maglice.",
            ],
          },
          {
            heading: "Prednosti",
            list: [
              "Robusna konstrukcija za pouzdan rad",
              "Ekonomičan rad i velika površina filtracije",
              "Kompaktna, kruta konstrukcija za brzu ugradnju",
              "Može se proizvesti i model od nerđajućeg čelika",
              "Može se očistiti u mašini za pranje posuđa ili pod visokim pritiskom",
            ],
          },
          {
            heading: "YAFI PF 592/592/48-G2 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Tip filtera", "MK", "Metalni panelni filter"],
                ["Okvir", "G", "Pocinkovani lim"],
                ["Materijal", "A", "Proširivi aluminijum"],
                ["Tip nabora", "Z", "Cik-cak"],
                ["Zaptivka", "X", "Ne"],
                ["Dimenzija", "–", "W × H × D"],
                ["Efikasnost", "G2", "EN 779"],
                ["", "Grubost 40%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: panelTable("sr", kitchenHoodRows),
          },
        ],
      },
    ],
  },
  {
    slug: "filteri-za-lakirnice",
    name: "Filteri za lakirnice",
    nameAcc: "filtere za lakirnice",
    class: "Podni, plafonski i paint-stop",
    image: "/yafiproducts/filteri-za-lakirnice/filteri-za-lakirnice.webp",
    description:
      "Podni, plafonski i paint-stop filteri za zadržavanje čestica boje u procesima lakiranja u auto-industriji i metalnoj industriji.",
    intro:
      "Filtracija za procese lakiranja — paint-stop medija i medije od sintetičkih i staklenih vlakana za zadržavanje čestica boje u lakirnicama i bojarskim kabinama.",
    applications: ["Lakirnice", "Auto-industrija", "Metalna industrija"],
    keywords: [
      "lakirnica",
      "bojarska kabina",
      "paint stop",
      "paint booth filter",
      "spray booth",
      "yafi fm",
    ],
    // Same media as on the filter-materijali page — shared slugs so one photo
    // and one future detail page serve both categories.
    items: [
      {
        ...srSyntheticM5,
        image: "/yafiproducts/filteri-za-lakirnice/Filter-od-sintetickih-vlakana-M5.webp",
      },
      {
        ...srGlassFibre,
        image: "/yafiproducts/filteri-za-lakirnice/Filteri-od-staklenih-vlakana.webp",
      },
      {
        ...srPaintStop,
        image: "/yafiproducts/filteri-za-lakirnice/filteri-za-lakirnice.webp",
      },
    ],
  },
  {
    slug: "ramovi-za-filtere",
    name: "Ramovi za filtere",
    nameAcc: "ramove za filtere",
    class: "Nosivi i zatezni sistemi",
    image: "/yafiproducts/ramovi-za-filtere/ramovi-za-filtere.webp",
    description:
      "Nosivi ramovi, zatezni okviri i kućišta koja obezbeđuju zaptivanje filtera — bez propuštanja vazduha oko uloška.",
    intro:
      "Ramovi i iner frejmovi za filtere, predfiltere i fine filtere — obezbeđuju zaptivanje uloška u kanalu ili klima komori, bez propuštanja vazduha oko filtera.",
    applications: ["Klima komore", "Čiste sobe", "Rekonstrukcije sistema"],
    keywords: [
      "ram za filter",
      "nosivi ram",
      "iner frejm",
      "unutrasnji ram",
      "okvir za filter",
      "filter frame",
      "holding frame",
      "housing",
    ],
    items: [
      {
        slug: "ramovi-iner-frejmovi",
        name: "Ramovi i iner frejmovi za filtere, predfiltere i fine filtere",
        label: "Nosivi i unutrašnji ramovi",
        image: "/yafiproducts/ramovi-za-filtere/ramovi-za-filtere.webp",
        sku: "FK-GY5-610/610/Y5",
        intro:
          "Dizajnirano kao terminalno kućište za HEPA/ULPA filtere koji se koriste u čistim prostorima u bolnicama, farmaceutskoj i prehrambenoj industriji.",
        specs: [
          { label: "Tip filtera", value: "Ram za filtere" },
          {
            label: "Materijal",
            value: "Pocinkovani čelik / nerđajući čelik",
          },
          { label: "Zaptivka", value: "Poliuretan / EPDM (ravna)" },
          { label: "Napomena", value: "Sigurno držanje sa 4 kopče" },
          {
            label: "Modeli filtera",
            value: "Panelni / vrećasti / kompakt filteri",
          },
        ],
        standards: [
          "Ispitano prema DIN 1946/4",
          "Test nepropusnosti kućišta",
          "Pocinkovani čelik ili inoks",
          "Dubine 75, 100 i 125 mm",
        ],
        sections: [
          {
            heading:
              "Ramovi i iner frejmovi za filtere za vazduh, predfiltere i fine filtere – Opis",
            body: [
              "Dizajnirano kao terminalno kućište za HEPA/ULPA filtere za vazduh koji se koriste u čistim prostorima u bolnicama, farmaceutskoj i prehrambenoj industriji. Omogućava jednostavnu i brzu ugradnju filtera za vazduh pomoću obrtnih stezaljki opremljenih graničnikom kompresije.",
              "Napravljen od pocinkovanog čelika, sa potpuno zavarenim šavovima, farban belim epoksidom i pečen u pećnici. Može se proizvoditi sa priključkom odozgo ili sa strane. Sve kutije su ispitane prema DIN 1946/4 i garantuju nepropusnost kućišta kroz test na curenje.",
            ],
          },
          {
            heading: "Prednosti",
            list: [
              "Modularni koncept za sve instalacije",
              "Robusna konstrukcija za brzu ugradnju",
              "Dostupno za nekoliko filtera u jednom ramu",
              "Prilagođene veličine dostupne na zahtev",
            ],
          },
          {
            heading: "FK-GY5-610/610/Y5 – konstrukcija",
            table: {
              head: ["Oznaka", "Kod", "Značenje"],
              rows: [
                ["Model", "FK", "Ram filtera"],
                [
                  "Okvir",
                  "G",
                  "G: Pocinkovani čelik, S: Nerđajući čelik",
                ],
                ["Medija", "Y5", "Dubina: 75 / 100 / 125"],
                ["Dimenzija", "–", "W × H × D"],
              ],
            },
          },
          {
            heading: "Tehničke karakteristike",
            table: figureTable("sr", filterFrameHead, filterFrameRows),
          },
        ],
      },
    ],
  },
];

const en: ProductCategory[] = [
  {
    slug: "filter-materijali",
    name: "Filter media",
    nameAcc: "filter media",
    title: "Filter media – YAFI FM",
    class: "Rolls and pads, EU2 – F9",
    image: "/yafiproducts/filter-materijali/Filteri-od-sintetickih-vlakana.webp",
    description:
      "Filter media in rolls and pads — synthetic, glass fibre and floor media for in-house fabrication and insert replacement.",
    intro:
      "Filter media in classes EU2 – F9 from established international manufacturers. We hold test certificates and attestations for every material, and we can supply EUROVENT and FIATEC certificates together with the finished products.",
    applications: ["Filter fabrication", "Insert replacement", "Floor media"],
    standards: [
      "Classes EU2 – F9",
      "EUROVENT certificate",
      "FIATEC certificate",
      "Test certificates for all media",
    ],
    keywords: [
      "filter media",
      "roll media",
      "media pads",
      "filter materijali",
      "filterska medija",
    ],
    items: [
      {
        slug: "aktivni-ugalj-medija",
        name: "Activated carbon impregnated media – YAFI FM",
        label: "Activated carbon",
        image: "/yafiproducts/filter-materijali/Filteri-impregnirani-aktivnim-ugljem.webp",
        sku: "RF-KE-ZKW400-2.00/20-RL",
        intro:
          "Carbon polyester rolls are a simple way to reduce or remove odours and fumes. Carbon roll filters are made from non-woven polyester impregnated with finely ground activated carbon. The even distribution of carbon through the polyester medium delivers an excellent first-pass capture rate.",
        standards: [
          "Class G4 – EN 779",
          "Coarse 60% – ISO 16890",
          "Flammability F1 – DIN 53438",
          "Rolls or cut to size",
        ],
        sections: [
          {
            heading: "Activated carbon impregnated media – Description",
            body: [
              "Carbon polyester rolls are a simple way to reduce or remove odours and fumes. Carbon roll filters are made from non-woven polyester impregnated with finely ground activated carbon. The even distribution of carbon through the polyester medium delivers an excellent first-pass capture rate.",
            ],
          },
          {
            heading: "Applications",
            body: [
              "Ideal for unventilated applications such as cooker hoods, air purifiers and air cleaners, room air conditioners and bathroom fans.",
            ],
          },
          {
            heading: "Benefits",
            list: [
              "Secured by a progressive fibre distribution",
              "Highly effective against organic odours",
              "Non-flammable, self-extinguishing and harmless to health",
              "Available in rolls or cut to size",
            ],
          },
          {
            heading: "YAFI FM",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "RF", "Roll Filter"],
                ["Filter composition", "SE", "Synthetic Fiber"],
                ["Model", "", "YAFI FM"],
                ["Dimensions", "–", "W × H × D"],
                ["Efficiency", "G4", "EN 779"],
                ["", "Coarse 60%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: {
              head: ["TYPE", "SBW 220", "ZKW 400"],
              rows: [
                ["Weight per unit area, g/m² (EN 29073-1)", "340 ± 35", "400 ± 40"],
                [
                  "Thickness, mm (EN ISO 9073-2, method A)",
                  "8 ± 1.5",
                  "11 ± 2",
                ],
                [
                  "Air permeability, l/m²/s (@50 Pa)",
                  "800 ± 200",
                  "1600 ± 350",
                ],
                ["Flammability (DIN 53438, part 3)", "F1", "F1"],
                ["Colour", "Black and white", "Black"],
                ["Composition", "Polyester", "Polyester"],
                ["Fibre bonding", "Thermal bonding", "Thermal bonding"],
                ["Treatment", "Powder (LDPE)", "Impregnated"],
              ],
            },
          },
        ],
      },
      {
        ...enSyntheticM5,
        image: "/yafiproducts/filter-materijali/Filter-od-sintetickih-vlakana-M5.webp",
      },
      {
        slug: "sinteticka-vlakna",
        name: "Synthetic fibre media – YAFI FM",
        label: "Synthetic fibre",
        image: "/yafiproducts/filter-materijali/Filteri-od-sintetickih-vlakana.webp",
        sku: "RF-SE-SF2Y0-2/20-G4",
        intro:
          "Made from 100% polyester fibres in a non-woven structure, suitable for a wide range of air conditions. The media consist of highly elastic, tensioned, randomly arranged fibres. As the fibre thickness decreases, the filter medium becomes denser and finer towards the clean air side (progressive construction), achieving a high level of separation and a large dust holding capacity. Non-flammable, self-extinguishing and harmless to health.",
        standards: [
          "Class G4 – EN 779",
          "Coarse 60% – ISO 16890",
          "Progressive construction",
          "Rolls or cut to size",
        ],
        sections: [
          {
            heading: "Synthetic fibre media – Description",
            body: [
              "Made from 100% polyester fibres in a non-woven structure, suitable for a wide range of air conditions. The media consist of highly elastic, tensioned, randomly arranged fibres. As the fibre thickness decreases, the filter medium becomes denser and finer towards the clean air side (progressive construction), achieving a high level of separation and a large dust holding capacity. Non-flammable, self-extinguishing and harmless to health.",
            ],
          },
          {
            heading: "Applications",
            body: [
              "Pre-filter for all types of air conditioning and ventilation installations.",
            ],
          },
          {
            heading: "Benefits",
            list: [
              "Secured by a progressive fibre distribution",
              "High dust holding capacity at a low pressure drop",
              "Non-flammable, self-extinguishing and harmless to health",
              "Available in rolls or cut to size",
            ],
          },
          {
            heading: "YAFI FM-G4",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "RF", "Roll Filter"],
                ["Filter composition", "SE", "Synthetic Fiber"],
                ["Model", "YAFI FM"],
                ["Dimensions", "–", "W × H × D"],
                ["Efficiency", "G4", "EN 779"],
                ["", "Coarse 60%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: {
              head: ["TYPE", "PS250", "PS500", "PS1000"],
              rows: [
                ["Filter class (EN 779)", "G3", "G3", "G4"],
                [
                  "Filter class (ISO 16890)",
                  "Coarse 30%",
                  "Coarse 40%",
                  "Coarse 60%",
                ],
                ["Composition", "Glass fibre"],
                ["Thickness (mm)", "60", "15 – 18", "20 – 22"],
                ["Weight (g/m²)", "200", "200", "270"],
                ["Nominal air velocity (m/s)", "1.5", "1.5", "1.5"],
                ["Nominal air flow (m³/h·m²)", "5400", "5400", "5400"],
                ["Initial pressure drop (Pa)", "20", "35", "38"],
                ["Final pressure drop (Pa)", "250", "250", "250"],
                ["Average paint overspray arrestance (%)", "90 – 95", "87", "91"],
                ["Dust holding capacity (g)", "3,000 – 5,000", "400", "478"],
                [
                  "Temperature resistance (°C)",
                  "Continuous up to 100 °C, peaks up to 120 °C",
                ],
                ["Flammability (DIN 53438)", "F1", "F1", "F1"],
                [
                  "Roll dimensions",
                  "Standard: 20.00 × 2.00 m – cut to size available",
                ],
                ["Max. relative humidity", "1", "1", "1"],
              ],
            },
          },
        ],
      },
      {
        ...enGlassFibre,
        image: "/yafiproducts/filter-materijali/Filteri-od-staklenih-vlakana.webp",
      },
      {
        ...enPaintStop,
        image: "/yafiproducts/filter-materijali/filteri-za-lakirnice.webp",
      },
      {
        slug: "periva-pena",
        name: "Washable filter foam – YAFI FM",
        label: "Washable foam",
        image: "/yafiproducts/filter-materijali/Periva-pena-za-filtriranje.webp",
        sku: "RF-POL20/10-1.5/2",
        intro:
          "Filter foam is an open-cell polyurethane foam based on polyether/polyester and can be used in filtration applications. Filter foams typically differ in pore size and in the number of pores per square inch (PPI).",
        standards: [
          "Classes G2 – G3 – EN 779",
          "Coarse 30 – 40% – ISO 16890",
          "Flammability F1 – DIN 53438",
          "Washable, reusable",
        ],
        sections: [
          {
            heading: "Washable filter foam – Description",
            body: [
              "Filter foam is an open-cell polyurethane foam based on polyether/polyester and can be used in filtration applications. Filter foams typically differ in pore size and in the number of pores per square inch (PPI).",
              "POLFIL material can be used in any thickness, and the range of available pore sizes covers a wide efficiency band, in particular different porosities. The layers are bonded together in tandem to reach the required efficiency through a staged mechanism.",
            ],
          },
          {
            heading: "Applications",
            body: [
              "Pre-filter for all types of air conditioning and ventilation installations.",
            ],
          },
          {
            heading: "Benefits",
            list: [
              "Progressive open-cell structure with high mechanical strength",
              "High dust holding capacity at a low pressure drop",
              "Washable filter, reusable",
              "Available in rolls or cut to size",
            ],
          },
          {
            heading: "YAFI FM",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "RF", "Roll Filter"],
                ["Composition", "POL", "Polyurethane foam"],
                ["Model", "20", "Pore size"],
                ["Dimensions", "10", "Thickness"],
                ["Dimensions", "", "W × L"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: {
              head: [
                "TYPE",
                "POL 10/20",
                "POL 20/6",
                "POL 20/10",
                "POL 20/20",
                "POL 45/10",
              ],
              rows: [
                ["Filter class (EN 779)", "G2", "G2", "G2 – G3", "G2 – G3", "G3"],
                [
                  "Filter class (ISO 16890)",
                  "Coarse 30%",
                  "Coarse 30%",
                  "Coarse 35%",
                  "Coarse 35%",
                  "Coarse 40%",
                ],
                [
                  "Composition",
                  "Polyurethane",
                  "Polyurethane",
                  "Polyurethane",
                  "Polyurethane",
                  "Polyurethane",
                ],
                ["Thickness (mm)", "20", "6", "10", "20", "10"],
                [
                  "Nominal air velocity (m/s)",
                  "1.5",
                  "1.5",
                  "1.5",
                  "1.5",
                  "0.25",
                ],
                ["Air flow (m³/h·m²)", "5400", "5400", "5400", "5400", "5400"],
                ["Initial pressure drop (Pa)", "5", "5", "10", "15", "20"],
                ["Final pressure drop (Pa)", "250", "250", "250", "250", "250"],
                [
                  "Average arrestance (Am)",
                  "0.75",
                  "0.75",
                  "0.77",
                  "0.78",
                  "80%",
                ],
                ["Dust holding capacity (g)", "300", "11", "220", "300", "300"],
                [
                  "Temperature resistance (°C)",
                  "Continuous up to 100 °C, peaks up to 120 °C",
                ],
                ["Flammability (DIN 53438)", "F1", "F1", "F1", "F1", "F1"],
                ["Roll dimensions", "1.50 × 2.00 m and cut to size"],
                ["Max. relative humidity", "1", "1", "1", "1", "1"],
              ],
            },
          },
        ],
      },
    ],
  },
  {
    slug: "panelni-filteri",
    name: "Panel filters – YAFI PF",
    nameAcc: "panel filters",
    class: "G2 – M5, polyester",
    image: "/yafiproducts/panelni-filteri/predfilter-metalnog-okvira-i-ravne-povrsine.webp",
    description:
      "The first line of protection for ventilation systems. They capture coarser particles and extend the service life of the filter stages that follow.",
    intro:
      "Panel filters with a small filtration area for air filtration in enclosed spaces — hospitals, shopping centres and the food industry. They also serve as pre-filters ahead of absolute filters and in compressor plants. Classes G2 – M5 (polyester).",
    applications: [
      "Hospitals and healthcare facilities",
      "Shopping centres",
      "Food industry",
      "Pre-filter ahead of absolute filters",
      "Compressor plants",
    ],
    standards: ["Classes G2 – M5", "Polyester media", "ISO Coarse / ePM10"],
    keywords: ["panel filter", "coarse filter", "pre-filter", "yafi pf"],
    items: [
      {
        slug: "filteri-visoke-temperature",
        name: "High-temperature panel filters – YAFI PF",
        label: "High temperature",
        image: "/yafiproducts/panelni-filteri/panelni-filteri-za-visoke-temperature.webp",
        sku: "PF 480/480/14",
        intro:
          "Specially designed for filtering intake and recirculated air in spray and drying booths. Progressively structured filter media made of the finest glass fibres, bonded with a high-temperature resistant binder.",
        specs: [
          { label: "Filter type", value: "High-temperature filter" },
          {
            label: "Media",
            value:
              "High-temperature resistant filter medium (up to 300 °C) of randomly arranged finest glass fibres",
          },
          { label: "Frame", value: "Metal" },
          { label: "Filter class", value: "G4 / Coarse 65%" },
          { label: "Final pressure drop", value: "220 Pa" },
          { label: "Max. temperature", value: "300 °C" },
        ],
        standards: [
          "Class G4 – EN 779",
          "Coarse 65% – ISO 16890",
          "Working temperature up to 300 °C",
          "Galvanised frame",
        ],
        sections: [
          {
            heading: "High-temperature panel filters – Description",
            body: [
              "Specially designed for filtering intake and recirculated air in spray and drying booths. Progressively structured filter media made of the finest glass fibres, bonded with a high-temperature resistant binder.",
              "Converted into finished filter cells with aluminium grids on supports and a galvanised frame.",
            ],
          },
          {
            heading: "Applications",
            body: [
              "Intake and recirculation air filtration in spray and drying booths.",
            ],
          },
          {
            heading: "Benefits",
            list: [
              "Filter media resistant to temperatures up to 300 °C",
              "High dust removal with minimal pressure loss",
              "Economical operation and a large filtration area",
              "High dust holding capacity at a low pressure drop",
              "Compact, rigid construction for quick installation",
              "Fast installation",
            ],
          },
          {
            heading: "YAFI PF 480/480/14 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "HT", "High temperature"],
                ["Frame", "G", "Galvanised"],
                ["Media", "G", "Glass fibre"],
                ["Pleat type", "L", "Flat"],
                ["Gasket", "X", "No"],
                ["Dimensions", "–", "W × H × D"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: panelTable("en", highTempRows),
          },
        ],
      },
      {
        slug: "predfilter-metalni-okvir-ravni",
        name: "Flat-surface pre-filter with metal frame – YAFI PF",
        label: "Metal frame · flat",
        image: "/yafiproducts/panelni-filteri/predfilter-metalnog-okvira-i-ravne-povrsine.webp",
        sku: "YAFI PF 495/595/10-G3",
        intro:
          "Designed as pre-filters for fan coil units and ventilation units. They offer high filtration efficiency at a very low pressure drop. YAFI PF is manufactured with a galvanised frame and synthetic filter media. The filter media is supported by expanded metal mesh on both sides of the frame.",
        specs: [
          { label: "Filter type", value: "Flat media" },
          { label: "Media", value: "Synthetic fibre" },
          { label: "Frame", value: "Galvanised sheet" },
          { label: "Class", value: "G3 / ISO Coarse 50%" },
          { label: "Final pressure drop", value: "250 Pa" },
          { label: "Max. temperature", value: "100 °C" },
        ],
        standards: [
          "Class G3 – EN 779",
          "Coarse 50% – ISO 16890",
          "Working temperature up to 100 °C",
          "Standard and custom sizes",
        ],
        sections: [
          {
            heading: "Flat-surface pre-filter with metal frame – Description",
            body: [
              "Designed as pre-filters for fan coil units and ventilation units. They offer high filtration efficiency at a very low pressure drop. YAFI PF is manufactured with a galvanised frame and synthetic filter media. The filter media is supported by expanded metal mesh on both sides of the frame.",
              "Available in standard and custom sizes.",
            ],
          },
          {
            heading: "Applications",
            body: ["Primary filter for air conditioning systems."],
          },
          {
            heading: "Benefits",
            list: [
              "Robust construction for reliable operation",
              "Flat filter media between two metal meshes",
              "Custom sizes are easily manufactured",
            ],
          },
          {
            heading: "YAFI PF 495/595/10-G3 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "KF", "Panel filter"],
                ["Frame", "G", "Galvanised sheet"],
                ["Media", "S", "Synthetic fibre"],
                ["Pleat type", "L", "Flat"],
                ["Gasket", "X", "No"],
                ["Dimensions", "–", "W × H × D"],
                ["Efficiency", "G3", "EN 779"],
                ["", "Coarse 50%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: panelTable("en", flatMetalRows),
          },
        ],
      },
      {
        slug: "predfilter-zicani-okvir",
        name: "Pre-filter with wire frame – YAFI PF",
        label: "Wire frame",
        image: "/yafiproducts/panelni-filteri/predfilter-sa-zicanim-okvirom.webp",
        sku: "PF 495/595/8-G3 - 1",
        intro:
          "Designed as pre-filters for air conditioners, fan coil systems, warm air furnaces, refrigeration units, counters and electronic equipment cabinets — they are also widely used to protect heat exchanger coils from dust.",
        specs: [
          { label: "Filter type", value: "Fan coil filter" },
          { label: "Media", value: "Synthetic fibre" },
          { label: "Frame", value: "Bright drawn wire" },
          { label: "Class", value: "G3 / ISO Coarse 50%" },
          { label: "Final pressure drop", value: "250 Pa" },
          { label: "Max. temperature", value: "100 °C" },
        ],
        standards: [
          "Class G3 – EN 779",
          "Coarse 50% – ISO 16890",
          "Working temperature up to 100 °C",
          "Standard and custom sizes",
        ],
        sections: [
          {
            heading: "Pre-filter with wire frame – Description",
            body: [
              "Designed as pre-filters for air conditioners, fan coil systems, warm air furnaces, refrigeration units, counters and electronic equipment cabinets, they are also widely used to protect heat exchanger coils from dust. YAFI PF is manufactured by stitching synthetic media onto a pre-formed galvanised coated wire frame with cross braces fitted as required. They offer slow filtration efficiency at a very low pressure drop.",
              "Available in standard and custom sizes.",
            ],
          },
          {
            heading: "Applications",
            body: ["Primary filter for fan coil and ventilation units."],
          },
          {
            heading: "Benefits",
            list: [
              "Robust construction for reliable operation",
              "Economical operation",
              "Custom sizes can be manufactured",
            ],
          },
          {
            heading: "YAFI PF 495/595/8-G3 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "CT", "Wire filter"],
                ["Frame", "G", "Bright drawn wire"],
                ["Media", "S", "Synthetic fibre"],
                ["Pleat type", "X", "Flat"],
                ["Gasket", "X", "No"],
                ["Dimensions", "–", "W × H × D"],
                ["Efficiency", "G3", "EN 779"],
                ["", "Coarse 50%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: panelTable("en", wireFrameRows),
          },
        ],
      },
      {
        slug: "ravni-perivi-predfilter-metalni-okvir",
        name: "Flat washable pre-filter with metal frame – YAFI PF",
        label: "Metal frame · washable",
        image: "/yafiproducts/panelni-filteri/ravni-i-perivi-predfilter-sa-metalnim-okvirom.webp",
        sku: "YAFI PF 495/595/10-G2",
        intro:
          "Designed as pre-filters for fan coil units and ventilation units. YAFI PF is manufactured from a galvanised frame with washable polyurethane media. The filter media is supported by expanded metal mesh on both sides of the frame.",
        specs: [
          { label: "Filter type", value: "Flat panel filter" },
          { label: "Media", value: "Polyurethane foam" },
          { label: "Frame", value: "Galvanised sheet" },
          { label: "Class", value: "G2 / ISO Coarse 40%" },
          { label: "Final pressure drop", value: "250 Pa" },
          { label: "Max. temperature", value: "100 °C" },
        ],
        standards: [
          "Class G2 – EN 779",
          "Coarse 40% – ISO 16890",
          "Washable and renewable",
          "Frame thickness 6, 8 and 10 mm",
        ],
        sections: [
          {
            heading:
              "Flat washable pre-filter with metal frame – Description",
            body: [
              "Designed as pre-filters for fan coil units and ventilation units. YAFI PF is manufactured from a galvanised frame with washable polyurethane media. The filter media is supported by expanded metal mesh on both sides of the frame.",
              "Available in standard and custom sizes.",
            ],
          },
          {
            heading: "Applications",
            body: ["Primary filter for air conditioning systems."],
          },
          {
            heading: "Benefits",
            list: [
              "Robust construction for reliable operation",
              "Flat filter media between two metal meshes",
              "Fully washable and renewable media",
              "Custom sizes are easily manufactured",
              "Frame thickness 6 mm, 8 mm and 10 mm",
            ],
          },
          {
            heading: "YAFI PF 495/595/10-G2 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "YK", "Panel filter"],
                ["Frame", "G", "Galvanised sheet"],
                ["Media", "P", "Polyurethane foam"],
                ["Pleat type", "L", "Flat"],
                ["Gasket", "2", "POL 20/10"],
                ["Dimensions", "–", "W × H × D"],
                ["Efficiency", "G2", "EN 779"],
                ["", "Coarse 40%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: panelTable("en", washableMetalRows),
          },
        ],
      },
      {
        slug: "zicani-perivi-predfilter",
        name: "Washable wire-frame pre-filter – YAFI PF",
        label: "Wire frame · washable",
        image: "/yafiproducts/panelni-filteri/zicani-i-perivi-predfilter.webp",
        sku: "PF 495/595/8-G3",
        intro:
          "Designed as pre-filters for air conditioners, fan coil systems, warm air furnaces, refrigeration units, counters and electronic equipment cabinets — they are also widely used to protect heat exchanger coils from dust.",
        specs: [
          { label: "Filter type", value: "Fan coil filter" },
          { label: "Media", value: "PP mesh – black" },
          { label: "Frame", value: "Metal wire rod" },
          { label: "Class", value: "G3 / ISO Coarse 35%" },
          { label: "Final pressure drop", value: "250 Pa" },
          { label: "Max. temperature", value: "100 °C" },
        ],
        standards: [
          "Class G3 – EN 779",
          "Coarse 35% – ISO 16890",
          "Washable and renewable",
          "Standard and custom sizes",
        ],
        sections: [
          {
            heading: "Washable wire-frame pre-filter – Description",
            body: [
              "Designed as pre-filters for air conditioners, fan coil systems, warm air furnaces, refrigeration units, counters and electronic equipment cabinets, they are also widely used to protect heat exchanger coils from dust. YAFI PF is manufactured by stitching PP mesh filter media onto a pre-formed galvanised coated wire frame with cross braces fitted as required. They offer slow filtration efficiency at a very low pressure drop.",
              "Available in standard and custom sizes.",
            ],
          },
          {
            heading: "Applications",
            body: ["Primary filter for fan coil and ventilation units."],
          },
          {
            heading: "Benefits",
            list: [
              "Robust construction for reliable operation",
              "Economical operation",
              "Custom sizes can be manufactured",
              "Washable and renewable",
            ],
          },
          {
            heading: "YAFI PF 495/595/8-G3 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "CT", "Wire filter"],
                ["Frame", "G", "Metal wire rod"],
                ["Media", "B", "PP mesh"],
                ["Pleat type", "X", "Flat"],
                ["Gasket", "X", "No"],
                ["Dimensions", "–", "W × H × D"],
                ["Efficiency", "G3", "EN 779"],
                ["", "Coarse 35%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: panelTable("en", washableWireRows),
          },
        ],
      },
    ],
  },
  {
    slug: "kasetni-filteri",
    name: "Cassette filters",
    nameAcc: "cassette filters",
    title: "Cassette filters – YAFI KF",
    class: "G3 – F9, polyester and mini-pleat",
    image: "/yafiproducts/kasetni-filteri/predfilter-sa-metalnim-okvirom.webp",
    description:
      "A compact construction with a large filtration area and a low pressure drop — with a direct effect on energy consumption.",
    intro:
      "YAFI KF are high-quality filters for varied requirements — high air permeability combined with a large dust holding capacity. They are used for air filtration in shopping centres, kindergartens and schools, and as pre-filtration ahead of high-efficiency filters. The media is mostly G3 to M5 (polyester), while mini-pleat versions with glass fibre cover classes M5 to F9.",
    applications: [
      "Shopping centres",
      "Kindergartens and schools",
      "Office buildings and hotels",
      "Pre-filtration ahead of high-efficiency filters",
    ],
    standards: [
      "Classes G3 – M5 (polyester)",
      "Mini-pleat M5 – F9 (glass fibre)",
      "ISO ePM1 / ePM2.5",
    ],
    keywords: [
      "cassette filter",
      "compact filter",
      "kasetni filter",
      "yafi kf",
      "yafi kkf",
    ],
    items: [
      {
        slug: "kartonski-filter-bez-zice",
        name: "Cardboard-frame filter with wire-free media – YAFI KF",
        label: "Cardboard frame · YAFI KKF",
        image: "/yafiproducts/kasetni-filteri/kartonski-predfilter-sa-materijalom-bez-zice.webp",
        sku: "PF 592/592/48-G4",
        intro:
          "Specially designed as a filter for air conditioning and ventilation equipment. The high-performance pleated filter medium is self-supporting. It is non-corrosive and metal-free, which makes disposal easy. The folded self-supporting media are held together by the rigid panel frame.",
        specs: [
          { label: "Filter type", value: "Extended surface panel filter" },
          { label: "Media", value: "Self-supporting synthetic fibre" },
          { label: "Frame", value: "Cardboard" },
          { label: "Class", value: "G4 / ISO Coarse 70%" },
          { label: "Final pressure drop", value: "250 Pa" },
          { label: "Max. temperature", value: "80 °C" },
        ],
        standards: [
          "Class G4 – EN 779",
          "Coarse 70% – ISO 16890",
          "Working temperature up to 80 °C",
          "Metal-free, easy disposal",
        ],
        sections: [
          {
            heading: "Cardboard-frame filter with wire-free media – Description",
            body: [
              "Specially designed as a filter for air conditioning and ventilation equipment. The high-performance pleated filter medium is self-supporting. It is non-corrosive and metal-free, which makes disposal easy. The folded self-supporting media are held together by the rigid panel frame.",
              "Other sizes are also available.",
            ],
          },
          {
            heading: "Applications",
            body: ["Primary filter for air conditioning systems."],
          },
          {
            heading: "Benefits",
            list: [
              "Suited to high-humidity conditions",
              "Excellent mechanical resistance",
              "Economical operation and a large filtration area",
              "High dust holding capacity at a low pressure drop",
              "Compact, rigid construction for quick installation",
              "100% non-flammable and non-corrosive",
            ],
          },
          {
            heading: "YAFI KF 592/592/48-G4 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "KF", "Panel filter"],
                ["Frame", "K", "Cardboard"],
                ["Media", "H", "Self-supporting"],
                ["Pleat type", "M", "Zig-zag without mesh"],
                ["Gasket", "X", "No / optional"],
                ["Dimensions", "–", "W × H × D"],
                ["Efficiency", "G4", "EN 779"],
                ["", "Coarse 70%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: panelTable("en", cassetteNoWireRows),
          },
        ],
      },
      {
        slug: "kartonski-filter-jednokratni",
        name: "Disposable cardboard-frame filter – YAFI KF",
        label: "Cardboard frame · YAFI KKF",
        image: "/yafiproducts/kasetni-filteri/kartonski-filter-za-jednokratnu-upotrebu.webp",
        sku: "PF 592/592/48-G3",
        intro:
          "Used in ventilation units and industrial HVAC units as a filter for arresting dust and paint. The density of the glass fibre media used inside the cardboard panel increases the intake air capacity. This progressive structure delivers high filtration performance.",
        specs: [
          { label: "Filter type", value: "Panel" },
          { label: "Filter media", value: "Glass fibre" },
          { label: "Frame", value: "Cardboard" },
          { label: "Class", value: "G4 / Coarse 65%" },
          { label: "Final pressure drop", value: "250 Pa" },
        ],
        standards: [
          "Classes G3 – G4 – EN 779",
          "Coarse 40 – 60% – ISO 16890",
          "Glass fibre media",
          "Standard and custom sizes",
        ],
        sections: [
          {
            heading: "Disposable cardboard-frame filter – Description",
            body: [
              "Used in ventilation units and industrial HVAC units as a filter for arresting dust and paint. The density of the glass fibre media used inside the cardboard panel increases the intake air capacity. This progressive structure delivers high filtration performance.",
              "Available in standard and custom sizes.",
            ],
          },
          {
            heading: "Applications",
            body: ["Primary filter for air conditioning systems."],
          },
          {
            heading: "Benefits",
            list: [
              "Robust construction for reliable operation",
              "Economical operation and a large filtration area",
              "High dust holding capacity at a low pressure drop",
              "Custom sizes available on request",
            ],
          },
          {
            heading: "YAFI KF 592/592/48-G3 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "KF", "Panel filter"],
                ["Frame", "K", "Cardboard"],
                ["Media", "C", "Glass fibre"],
                ["Pleat type", "L", "Straight"],
                ["Gasket", "X", "No"],
                ["Dimensions", "–", "W × H × D"],
                ["Efficiency", "G3", "EN 779"],
                ["", "Coarse 55%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: panelTable("en", cassetteDisposableRows),
          },
        ],
      },
      {
        slug: "perivi-predfilter-metalni-okvir",
        name: "Washable pre-filter with metal frame – YAFI KF",
        label: "Metal frame · washable",
        image: "/yafiproducts/kasetni-filteri/perivi-predfilteri-sa-metalnim-okvirom.webp",
        sku: "PF 592/592/48-G3-1",
        intro:
          "Washable filters are specially designed as first-stage filters in ventilation units handling dry dust, and as pre-filters ahead of higher-efficiency filters. The polyurethane filter media, backed by metal mesh, is set into a metal frame and can easily be washed several times.",
        specs: [
          { label: "Filter type", value: "Extended surface panel filter" },
          { label: "Media", value: "Polyurethane foam" },
          { label: "Frame", value: "Galvanised sheet" },
          { label: "Class", value: "G4 / ISO Coarse 50%" },
          { label: "Final pressure drop", value: "300 Pa" },
          { label: "Max. temperature", value: "80 °C" },
        ],
        standards: [
          "Class G4 – EN 779",
          "Coarse 50% – ISO 16890",
          "Washable and renewable",
          "Working temperature up to 80 °C",
        ],
        sections: [
          {
            heading: "Washable pre-filter with metal frame – Description",
            body: [
              "Washable filters are specially designed as first-stage filters in ventilation units handling dry dust, and as pre-filters ahead of higher-efficiency filters. The polyurethane filter media backed by metal mesh is set into a metal frame. Thanks to the polyurethane media it can easily be washed several times. For a low pressure drop and a high dust holding capacity, the filter media is set in a zig-zag form.",
              "Available in standard and custom sizes.",
            ],
          },
          {
            heading: "Applications",
            body: ["Primary filter for air conditioning systems."],
          },
          {
            heading: "Benefits",
            list: [
              "Robust construction for reliable operation",
              "Fully supported media bonded to the wire mesh",
              "Economical operation and a large filtration area",
              "Fully washable and renewable media",
              "Compact, rigid construction for quick installation",
              "Custom sizes are easily manufactured",
            ],
          },
          {
            heading: "YAFI KF 592/592/48-G3 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "YK", "Washable filter"],
                ["Frame", "G", "Galvanised sheet"],
                ["Media", "P", "Polyurethane"],
                ["Pleat type", "Z", "Zig-zag"],
                ["Gasket", "4", "POL 45/10"],
                ["Dimensions", "–", "W × H × D"],
                ["Efficiency", "G4", "EN 779"],
                ["", "Coarse 50%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: panelTable("en", cassetteWashableRows),
          },
        ],
      },
      {
        slug: "predfilter-kartonski-okvir",
        name: "Pre-filter with cardboard frame – YAFI KF",
        label: "Cardboard frame · YAFI KKF",
        image: "/yafiproducts/kasetni-filteri/predfilter-sa-kartonskim-okvirom.webp",
        sku: "PF 592/592/48-G4-1",
        intro:
          "Specially designed as first-stage filters in ventilation units handling dry dust, and as pre-filters ahead of higher-efficiency filters. The blue synthetic filter media, backed by a fine metal mesh, is set into a water-resistant cardboard frame.",
        specs: [
          { label: "Filter type", value: "Extended surface panel filter" },
          {
            label: "Media",
            value: "Synthetic fibre laminated with expanded metal mesh",
          },
          { label: "Frame", value: "Cardboard" },
          { label: "Class", value: "G4 / ISO Coarse 65%" },
          { label: "Final pressure drop", value: "250 Pa" },
          { label: "Max. temperature", value: "80 °C" },
        ],
        standards: [
          "Class G4 – EN 779",
          "Coarse 65% – ISO 16890",
          "Water-resistant cardboard frame",
          "Working temperature up to 80 °C",
        ],
        sections: [
          {
            heading: "Pre-filter with cardboard frame – Description",
            body: [
              "Specially designed as first-stage filters in ventilation units handling dry dust, and as pre-filters ahead of higher-efficiency filters. The blue synthetic filter media backed by a fine metal mesh is set into a water-resistant cardboard frame. For a low pressure drop and a high dust holding capacity, the filter media is set in a zig-zag form.",
              "Available in standard and custom sizes.",
            ],
          },
          {
            heading: "Applications",
            body: ["Primary filter for air conditioning systems."],
          },
          {
            heading: "Benefits",
            list: [
              "Water-resistant disposable cardboard frame",
              "Fully supported media bonded to the wire mesh",
              "Economical operation and a large filtration area",
              "High dust holding capacity at a low pressure drop",
              "Compact, rigid construction for quick installation",
              "Fast installation",
            ],
          },
          {
            heading: "YAFI KF 592/592/48-G4 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "KF", "Panel filter"],
                ["Frame", "K", "Cardboard"],
                ["Media", "M", "Blue synthetic media"],
                ["Pleat type", "Z", "Zig-zag"],
                ["Gasket", "X", "No"],
                ["Dimensions", "–", "W × H × D"],
                ["Efficiency", "G4", "EN 779"],
                ["", "Coarse 65%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: panelTable("en", cassetteCardboardRows),
          },
        ],
      },
      {
        slug: "predfilter-metalni-okvir",
        name: "Pre-filter with metal frame – YAFI KF",
        label: "Metal frame · YAFI KF",
        image: "/yafiproducts/kasetni-filteri/predfilter-sa-metalnim-okvirom.webp",
        sku: "PF 592/592/48-G4 - 1",
        intro:
          "Specially designed as first-stage filters in ventilation units handling dry dust, and as pre-filters ahead of higher-efficiency filters. The synthetic filter media is backed by metal mesh set into a metal frame.",
        specs: [
          { label: "Filter type", value: "Extended surface panel filter" },
          {
            label: "Media",
            value: "Synthetic fibre laminated with expanded metal mesh",
          },
          { label: "Frame", value: "Galvanised sheet" },
          { label: "Class", value: "G4 / ISO Coarse 65%" },
          { label: "Final pressure drop", value: "250 Pa" },
          { label: "Max. temperature", value: "100 °C" },
        ],
        standards: [
          "Class G4 – EN 779",
          "Coarse 65% – ISO 16890",
          "Galvanised frame",
          "Working temperature up to 100 °C",
        ],
        sections: [
          {
            heading: "Pre-filter with metal frame – Description",
            body: [
              "Specially designed as first-stage filters in ventilation units handling dry dust, and as pre-filters ahead of higher-efficiency filters. The synthetic filter media is backed by metal mesh set into a metal frame. For a low pressure drop and a high dust holding capacity, the filter media is set in a zig-zag form.",
              "Available in standard and custom sizes.",
            ],
          },
          {
            heading: "Applications",
            body: ["Primary filter for air conditioning systems."],
          },
          {
            heading: "Benefits",
            list: [
              "Robust construction for reliable operation",
              "Fully supported media bonded to the wire mesh",
              "Economical operation and a large filtration area",
              "High dust holding capacity at a low pressure drop",
              "Compact, rigid construction for quick installation",
              "Custom sizes available on request",
            ],
          },
          {
            heading: "YAFI KF 592/592/48-G3 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "KF", "Panel filter"],
                ["Frame", "G", "Galvanised sheet"],
                ["Media", "S", "Synthetic"],
                ["Pleat type", "Z", "Zig-zag"],
                ["Gasket", "X", "No"],
                ["Dimensions", "–", "W × H × D"],
                ["Efficiency", "G4", "EN 779"],
                ["", "Coarse 65%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: panelTable("en", cassetteMetalRows),
          },
        ],
      },
    ],
  },
  {
    slug: "vrecasti-filteri",
    name: "Bag filters",
    nameAcc: "bag filters",
    title: "Bag filters – YAFI VF",
    class: "G3 – F9, polyester and polypropylene",
    image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-za-finu-prasinu-metalni-okvir-F7.webp",
    description:
      "A multi-pocket construction for high air flows with long-lasting efficiency — the standard in industrial systems.",
    intro:
      "Bag filters made from polyester fibre for air filtration in classes G3 to M5. The filter bags deliver an even air flow and a high dust holding capacity, and the materials used in their construction comply with ecological standards. Polyester bags cover classes G3 – M5, polypropylene bags classes M5 – F9.",
    applications: [
      "Industrial plants",
      "Airports",
      "Hospitals",
      "Fine filtration in air handling units",
    ],
    standards: [
      "Classes G3 – M5 (polyester)",
      "Classes M5 – F9 (polypropylene)",
      "Glass fibre M6 – F9",
      "ISO ePM1 / ePM2.5 / ePM10",
    ],
    keywords: [
      "bag filter",
      "pocket filter",
      "vrecasti filter",
      "dzepasti filter",
      "yafi vf",
    ],
    items: [
      {
        slug: "vrecasti-filter-metalni-ram-g4-m5",
        name: "Bag filters in a sheet-metal frame G4/M5 – YAFI VF",
        label: "Sheet metal frame · G4 / M5",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filteri-u-metalnom-limenom-ramu-G4-M5.webp",
        sku: "VF-592/592/360-6-G4",
        intro:
          "Used as a first-stage filter or as a pre-filter ahead of higher-efficiency filters in ventilation units, with a durable frame that can be produced with different pocket counts and pocket depths depending on the application. The synthetic filter media and the metal frame withstand demanding operating conditions.",
        specs: [
          { label: "Filter type", value: "Bag filter" },
          { label: "Media", value: "Synthetic fibre" },
          { label: "Frame", value: "Galvanised steel" },
          { label: "Class", value: "G4 / Coarse 65%" },
          { label: "Final pressure drop", value: "250 Pa" },
          { label: "Max. temperature", value: "80 °C" },
        ],
        standards: [
          "Classes G3 – M5 – EN 779",
          "Coarse 50 – 80% – ISO 16890",
          "Galvanised steel frame",
          "Working temperature up to 80 °C",
        ],
        sections: [
          {
            heading: "Bag filters in a sheet-metal frame G4/M5 – Description",
            body: [
              "Used as a first-stage filter or as a pre-filter ahead of higher-efficiency filters in ventilation units, with a durable frame that can be produced with different pocket counts and pocket depths depending on the application. The synthetic filter media and the metal frame withstand demanding operating conditions.",
            ],
          },
          {
            heading: "Applications",
            body: [
              "Primary filter for air conditioning and ventilation systems.",
            ],
          },
          {
            heading: "Benefits",
            list: [
              "Robust construction for reliable operation",
              "Optimised media area in a tapered pocket form",
              "High dust holding capacity at a low pressure drop",
              "Compact, rigid construction for quick installation",
              "Custom sizes can be manufactured",
              "Available with a plastic frame",
            ],
          },
          {
            heading: "YAFI VF 592/592/360-6-G4 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "VF", "Bag filter"],
                ["Frame", "G", "Galvanised"],
                ["Media", "S", "Synthetic fibre"],
                ["Frame thickness", "H", "L: 20 mm, H: 25 mm"],
                ["Dimensions", "–", "W × H × D"],
                ["Pocket count", "6", "6"],
                ["Efficiency", "G4", "EN 779"],
                ["", "Coarse 65%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: bagTable("en", bagMetalRows),
          },
        ],
      },
      {
        slug: "vrecasti-filter-fina-prasina-m6",
        name: "Fine-dust bag filter – metal frame M6 – YAFI VF",
        label: "Fine dust · M6",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-za-finu-prasinu-metalni-okvir-M6.webp",
        sku: "VF-592/592/500-8-M6",
        intro:
          "Made from three-layer high-quality synthetic media as fine, high-efficiency filters. Thermally welded pockets guarantee a long service life. The filter media is built from a series of sealed pockets to achieve a high air flow at a low pressure drop.",
        specs: [
          { label: "Filter type", value: "High-efficiency bag filter" },
          { label: "Media", value: "Synthetic fibre" },
          { label: "Frame", value: "Galvanised steel" },
          { label: "Class", value: "M6 / ePM10 65%" },
          { label: "Final pressure drop", value: "450 Pa" },
          { label: "Max. temperature", value: "90 °C" },
        ],
        standards: [
          "Class M6 – EN 779",
          "ePM10 65% – ISO 16890",
          "Thermally welded pockets",
          "Working temperature up to 90 °C",
        ],
        sections: [
          {
            heading: "Fine-dust bag filter – metal frame M6 – Description",
            body: [
              "Made from three-layer high-quality synthetic media as fine, high-efficiency filters. Thermally welded pockets guarantee a long service life. The filter media is built from a series of sealed pockets to achieve a high air flow at a low pressure drop.",
            ],
          },
          { heading: "Applications", body: ["Air conditioning units."] },
          {
            heading: "Benefits",
            list: [
              "Robust construction for reliable operation",
              "Optimised media area in a tapered pocket form",
              "High dust holding capacity at a low pressure drop",
              "Compact, rigid construction for quick installation",
              "Frame thickness can be 20 mm or 25 mm",
            ],
          },
          {
            heading: "YAFI VF 592/592/500-8-M6 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "TF", "Bag filter"],
                ["Frame", "G", "Galvanised steel"],
                ["Media", "S", "Synthetic fibre"],
                ["Frame thickness", "H", "L: 20 mm, H: 25 mm"],
                ["Dimensions", "–", "W × H × D"],
                ["Pocket count", "8", "8 pockets"],
                ["Efficiency", "M6", "EN 779"],
                ["", "ePM10 65%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: bagTable("en", bagM6Rows),
          },
        ],
      },
      {
        slug: "vrecasti-filter-fina-prasina-f7",
        name: "Fine-dust bag filter – metal frame F7 – YAFI VF",
        label: "Fine dust · F7",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-za-finu-prasinu-metalni-okvir-F7.webp",
        sku: "VF-592/592/500-8-FY",
        intro:
          "Made from three-layer high-quality synthetic media as fine, high-efficiency filters downstream of first-stage filtration. Thermally welded pockets guarantee a long service life. The media is built from a series of sealed pockets to achieve a high air flow at a low pressure drop.",
        specs: [
          { label: "Filter type", value: "High-efficiency bag filter" },
          { label: "Media", value: "Synthetic fibre" },
          { label: "Frame", value: "Galvanised steel" },
          { label: "Class", value: "F7 / ePM2.5 65%" },
          { label: "Final pressure drop", value: "450 Pa" },
          { label: "Max. temperature", value: "90 °C" },
        ],
        standards: [
          "Class F7 – EN 779",
          "ePM2.5 65% – ISO 16890",
          "Thermally welded pockets",
          "Working temperature up to 90 °C",
        ],
        sections: [
          {
            heading: "Fine-dust bag filter – metal frame F7 – Description",
            body: [
              "Made from three-layer high-quality synthetic media as fine, high-efficiency filters downstream of first-stage filtration. Thermally welded pockets guarantee a long service life. The media is built from a series of sealed pockets to achieve a high air flow at a low pressure drop.",
            ],
          },
          { heading: "Applications", body: ["Air conditioning units."] },
          {
            heading: "Benefits",
            list: [
              "Robust construction for reliable operation",
              "Optimised media area in a tapered pocket form",
              "High dust holding capacity at a low pressure drop",
              "Compact, rigid construction for quick installation",
              "Frame thickness can be 20 mm or 25 mm",
            ],
          },
          {
            heading: "YAFI VF 592/592/500-8-FY – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "TF", "Bag filter"],
                ["Frame", "G", "Galvanised steel"],
                ["Media", "S", "Synthetic fibre"],
                ["Frame thickness", "H", "L: 20 mm, H: 25 mm"],
                ["Dimensions", "–", "W × H × D"],
                ["Pocket count", "8", "8 pockets"],
                ["Efficiency", "F7", "EN 779:2012"],
                ["", "ePM2.5 65%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: bagTable("en", bagF7Rows),
          },
        ],
      },
      {
        slug: "vrecasti-filter-fina-prasina-f8",
        name: "Fine-dust bag filter – metal frame F8 – YAFI VF",
        label: "Fine dust · F8",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-za-finu-prasinu-metalni-okvir-F8.webp",
        sku: "VF-592/592/500-8-F8",
        intro:
          "Made from three-layer high-quality synthetic media as fine, high-efficiency filters downstream of first-stage filtration. Thermally welded pockets guarantee a long service life. The filter is built from a series of sealed pockets to achieve a high air flow at a low pressure drop.",
        specs: [
          { label: "Filter type", value: "High-efficiency bag filter" },
          { label: "Media", value: "Synthetic fibre" },
          { label: "Frame", value: "Galvanised steel" },
          { label: "Class", value: "F8 / ePM1 70%" },
          { label: "Final pressure drop", value: "450 Pa" },
          { label: "Max. temperature", value: "90 °C" },
        ],
        standards: [
          "Class F8 – EN 779",
          "ePM1 70% – ISO 16890",
          "Thermally welded pockets",
          "Working temperature up to 90 °C",
        ],
        sections: [
          {
            heading: "Fine-dust bag filter – metal frame F8 – Description",
            body: [
              "Made from three-layer high-quality synthetic media as fine, high-efficiency filters downstream of first-stage filtration. Thermally welded pockets guarantee a long service life. The filter is built from a series of sealed pockets to achieve a high air flow at a low pressure drop.",
            ],
          },
          { heading: "Applications", body: ["Air conditioning units."] },
          {
            heading: "Benefits",
            list: [
              "Robust construction for reliable operation",
              "Optimised media area in a tapered pocket form",
              "High dust holding capacity at a low pressure drop",
              "Compact, rigid construction for quick installation",
              "Frame thickness can be 20 mm or 25 mm",
            ],
          },
          {
            heading: "YAFI VF 592/592/500-8-F8 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "TF", "Bag filter"],
                ["Frame", "G", "Galvanised steel"],
                ["Media", "S", "Synthetic fibre"],
                ["Frame thickness", "H", "L: 20 mm, H: 25 mm"],
                ["Dimensions", "–", "W × H × D"],
                ["Pocket count", "8", "8 pockets"],
                ["Efficiency", "F8", "EN 779"],
                ["", "ePM1 70%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: bagTable("en", bagF8Rows),
          },
        ],
      },
      {
        slug: "vrecasti-filter-fina-prasina-f9",
        name: "Fine-dust bag filter – metal frame F9 – YAFI VF",
        label: "Fine dust · F9",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-za-finu-prasinu-metalni-okvir-F9.webp",
        sku: "YAFI VF - 592/592/500-8-F8-1",
        intro:
          "Made from three-layer high-quality synthetic media as fine, high-efficiency filters downstream of first-stage filtration. Thermally welded pockets guarantee a long service life. The filter is built from a series of sealed pockets to achieve a high air flow at a low pressure drop.",
        specs: [
          { label: "Filter type", value: "High-efficiency bag filter" },
          { label: "Media", value: "Synthetic fibre" },
          { label: "Frame", value: "Galvanised steel" },
          { label: "Class", value: "F9 / ePM1 80%" },
          { label: "Final pressure drop", value: "450 Pa" },
          { label: "Max. temperature", value: "90 °C" },
        ],
        standards: [
          "Class F9 – EN 779",
          "ePM1 80% – ISO 16890",
          "Thermally welded pockets",
          "Working temperature up to 90 °C",
        ],
        sections: [
          {
            heading: "Fine-dust bag filter – metal frame F9 – Description",
            body: [
              "Made from three-layer high-quality synthetic media as fine, high-efficiency filters downstream of first-stage filtration. Thermally welded pockets guarantee a long service life. The filter is built from a series of sealed pockets to achieve a high air flow at a low pressure drop.",
            ],
          },
          { heading: "Applications", body: ["Air conditioning units."] },
          {
            heading: "Benefits",
            list: [
              "Robust construction for reliable operation",
              "Optimised media area in a tapered pocket form",
              "High dust holding capacity at a low pressure drop",
              "Compact, rigid construction for quick installation",
              "Frame thickness can be 20 mm or 25 mm",
            ],
          },
          {
            heading: "YAFI VF 592/592/500-8-F8 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "TF", "Bag filter"],
                ["Frame", "G", "Galvanised steel"],
                ["Media", "S", "Synthetic fibre"],
                ["Frame thickness", "H", "L: 20 mm, H: 25 mm"],
                ["Dimensions", "–", "W × H × D"],
                ["Pocket count", "8", "8 pockets"],
                ["Efficiency", "F9", "EN 779"],
                ["", "ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: bagTable("en", bagF9Rows),
          },
        ],
      },
      {
        slug: "vrecasti-filter-staklena-vlakna-m6-f9",
        name: "Glass fibre bag filter, M6 to F9 – YAFI VF",
        label: "Glass fibre · M6 – F9",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-od-staklenih-vlakana-za-finu-prasinu.webp",
        sku: "VF-592/592/500-8-F9",
        intro:
          "Made from high-quality glass fibre as fine, high-efficiency filters downstream of first-stage filtration. Precision-welded pockets guarantee a long service life. The filter is built from a series of sealed pockets to achieve a high air flow at a low pressure drop.",
        specs: [
          { label: "Filter type", value: "High-efficiency bag filter" },
          { label: "Media", value: "Synthetic fibre" },
          { label: "Frame", value: "Galvanised steel" },
          { label: "Class", value: "M6 to F8 / ePM10 60% – ePM1 65%" },
          { label: "Final pressure drop", value: "450 Pa" },
          { label: "Max. temperature", value: "90 °C" },
        ],
        standards: [
          "Classes M6 – F9 – EN 779",
          "ePM10 60% – ePM1 80% – ISO 16890",
          "Glass fibre media",
          "Working temperature up to 90 °C",
        ],
        sections: [
          {
            heading: "Glass fibre bag filter, M6 to F9 – Description",
            body: [
              "Made from high-quality glass fibre as fine, high-efficiency filters downstream of first-stage filtration. Precision-welded pockets guarantee a long service life. The filter is built from a series of sealed pockets to achieve a high air flow at a low pressure drop.",
            ],
          },
          { heading: "Applications", body: ["Air conditioning units."] },
          {
            heading: "Benefits",
            list: [
              "Robust construction for reliable operation",
              "A newly developed design for the best air distribution",
              "High dust holding capacity at a low pressure drop",
              "Compact, rigid construction for quick installation",
              "Frame thickness can be 20 mm or 25 mm",
            ],
          },
          {
            heading: "YAFI VF 592/592/500-8-F9 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "TF", "Bag filter"],
                ["Frame", "G", "Galvanised steel"],
                ["Media", "G", "Glass fibre"],
                ["Frame thickness", "H", "L: 20 mm, H: 25 mm"],
                ["Dimensions", "–", "W × H × D"],
                ["Pocket count", "8", "8 pockets"],
                ["Efficiency", "M6-F9", "EN 779"],
                ["", "ePM10 60% – ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: bagTable("en", bagGlassRows),
          },
        ],
      },
    ],
  },
  {
    slug: "rigidni-v-filteri",
    name: "Rigid V-cell filters – YAFI RF",
    nameAcc: "rigid V-cell filters",
    class: "F6 – F9, glass and cellulose fibre",
    image: "/yafiproducts/rigidni-v-filteri/Rigidni-Vrecasti-Filter-Plasticni-Okvir-4V-Standard.webp",
    description:
      "A rigid V-cell construction with high-density mini-pleat media — the maximum filtration area within a limited installation depth.",
    intro:
      "Rigid V-cell filters made from glass or cellulose fibre for high-quality filtration of the finest dust. The range covers classes F6 – F9, in panel and bag versions with aluminium, metal or plastic frames.",
    applications: [
      "Clean zones",
      "Pharmaceutical industry",
      "Electronics",
      "Fine filtration ahead of HEPA filters",
    ],
    standards: [
      "Classes F6 – F9",
      "Glass fibre",
      "Cellulose fibre",
      "ISO ePM1",
    ],
    keywords: [
      "rigid filter",
      "v-cell filter",
      "compact filter",
      "mini-pleat",
      "separator",
      "4v",
      "yafi rf",
    ],
    items: [
      {
        slug: "aluminijumski-separator-filteri",
        name: "Filters with aluminium separators",
        label: "Separator",
        image: "/yafiproducts/rigidni-v-filteri/Aluminijumski-Seperator-Filteri-Pocinkovani-lim-292mm.webp",
        sku: "YAFI RF - 592|592|48-FY-8",
        intro:
          "Aluminium separator filters are deep-pleated filters designed for high filtration efficiency and a high air flow rate, for use in hospitals, the pharmaceutical industry and similar facilities. Instead of the traditional mini-pleat design, corrugated aluminium is used as the separator.",
        specs: [
          { label: "Filter type", value: "Aluminium separator panel filter" },
          { label: "Media", value: "Micro glass fibre" },
          { label: "Frame", value: "Galvanised sheet" },
          { label: "Separators", value: "Aluminium" },
          { label: "Bonding", value: "Two-component polyurethane" },
          { label: "Final pressure drop", value: "450 Pa" },
          { label: "Max. temperature", value: "350 °C" },
        ],
        standards: [
          "Classes M6 – F9 – EN 779",
          "ePM10 65% – ePM1 80% – ISO 16890",
          "Working temperature up to 350 °C",
          "Aluminium separators",
        ],
        sections: [
          {
            heading:
              "Aluminium separator filters, galvanised sheet – 292 mm – Description",
            body: [
              "Aluminium separator filters are deep-pleated filters designed for high filtration efficiency and a high air flow rate, for use in hospitals, the pharmaceutical industry and similar facilities. Instead of the traditional mini-pleat design, corrugated aluminium is used as the separator. These double-edged separators give the filter its rigidity, so it withstands a high operating temperature.",
              "A galvanised sheet version with a front flange and a double flange is also available on request.",
            ],
          },
          {
            heading: "Applications",
            body: ["Air conditioning units and industrial systems."],
          },
          {
            heading: "Benefits",
            list: [
              "Compact design and robust construction",
              "Excellent performance in demanding conditions with a high dust holding capacity",
              "A large filtration area with the latest glass fibre media of high water repellency",
              "Custom sizes can be manufactured",
            ],
          },
          {
            heading: "YAFI RF 592|592|292-M6 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "AS", "Aluminium separator"],
                ["Frame", "G", "G: Galvanised sheet"],
                ["Model", "S", "S: Standard Flow, H: High Flow"],
                ["Flange", "T", "X: Without, T: Single, D: Double"],
                ["Gasket", "P", "X: No, E: EPDM, P: Polyurethane"],
                ["Efficiency", "M6 to F9", "EN 779"],
                ["", "ePM10 65% – ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: rigidTable("en", rigidSeparatorRows, { showClass: false }),
          },
        ],
      },
      {
        slug: "rigidni-panelni-aluminijumski-okvir",
        name: "Rigid panel filter – aluminium frame – YAFI RF",
        label: "Panel · aluminium",
        image:
          "/yafiproducts/rigidni-v-filteri/Rigidni-Panelni-Filter-Metalni-Okvir-sa-zaglavljem.webp",
        sku: "YAFI RF - 592|592|48-FY-3",
        intro:
          "The rigid panel filter with an aluminium frame is designed for high-efficiency filtration, for use in hospitals, the pharmaceutical industry and similar facilities. It suits air handling units where installation depth is limited.",
        specs: [
          { label: "Filter type", value: "Compact panel filter" },
          { label: "Media", value: "Glass fibre" },
          { label: "Frame", value: "Galvanised sheet" },
          { label: "Filter class", value: "M6 to F8 / ePM10 65% – ePM1 80%" },
          { label: "Final pressure drop", value: "450 Pa" },
          { label: "Max. temperature", value: "90 °C" },
        ],
        standards: [
          "Classes M6 – F9 – EN 779",
          "ePM10 65% – ePM1 80% – ISO 16890",
          "Aluminium frame",
          "Working temperature up to 90 °C",
        ],
        sections: [
          {
            heading: "Rigid panel filter, aluminium frame – Description",
            body: [
              "Designed for high-efficiency filtration, for use in hospitals, the pharmaceutical industry and similar facilities. It suits air handling units where installation depth is limited. It can be used as a high-efficiency filter in place of an existing low-efficiency filter in air conditioning systems.",
              "The extruded aluminium frame holds the glass micro-fibre filter pack. The media is pleated to create a rigid filter structure.",
            ],
          },
          {
            heading: "Applications",
            body: ["Air conditioning units and industrial systems."],
          },
          {
            heading: "Benefits",
            list: [
              "A rigid filter for installation in a tight space",
              "Interchangeable with existing filters without modifying the existing construction",
              "A large filtration area at a low pressure drop",
              "A long service life and reduced operating costs",
              "Custom sizes can be manufactured",
            ],
          },
          {
            heading: "YAFI RF 592|592|130-FY – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "LK", "Rigid panel filter (header)"],
                ["Frame", "A", "A: Aluminium"],
                ["Pleat height", "L", "N: 50 mm, L: 100 mm"],
                ["Protective mesh", "T", "X: No, T: Single, D: Double"],
                ["Gasket", "X", "X: No, E: EPDM"],
                ["Efficiency", "M6 to F9", "EN 779"],
                ["", "ePM10 65% – ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: rigidTable("en", rigidAluminiumRows),
          },
        ],
      },
      {
        slug: "rigidni-panelni-metalni-okvir-zaglavlje",
        name: "Rigid panel filter – metal frame with header – YAFI RF",
        label: "Panel · metal, header",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Panelni-Filter-Metalni-Okvir-sa-zaglavljem.webp",
        sku: "YAFI RF - 592|592|48-FY-2",
        intro:
          "The rigid panel filter with a metal frame and header is designed for high-efficiency filtration, for use in hospitals, the pharmaceutical industry and similar facilities. It suits units where installation depth is limited.",
        specs: [
          { label: "Filter type", value: "Compact panel filter" },
          { label: "Media", value: "Glass fibre" },
          { label: "Frame", value: "Galvanised sheet" },
          { label: "Filter class", value: "M6 to F8 / ePM10 65% – ePM1 80%" },
          { label: "Final pressure drop", value: "450 Pa" },
          { label: "Max. temperature", value: "90 °C" },
        ],
        standards: [
          "Classes M6 – F9 – EN 779",
          "ePM10 65% – ePM1 80% – ISO 16890",
          "Metal frame with header",
          "Working temperature up to 90 °C",
        ],
        sections: [
          {
            heading:
              "Rigid panel filter, metal frame with header – Description",
            body: [
              "The rigid panel filter with a metal frame and header is designed for high-efficiency filtration, for use in hospitals, the pharmaceutical industry and similar facilities. It suits units where installation depth is limited. It can be used as a high-efficiency filter in place of an existing low-efficiency filter in air conditioning systems.",
              "Thanks to their compact, robust construction and higher efficiency in operation they can also be used as a final filter. The media is pleated to create a rigid filter structure.",
            ],
          },
          {
            heading: "Applications",
            body: ["Air conditioning units and industrial systems."],
          },
          {
            heading: "Benefits",
            list: [
              "A rigid filter for installation in a tight space",
              "Interchangeable with existing filters without modifying the existing construction",
              "A large filtration area at a low pressure drop",
              "A long service life and reduced operating costs",
              "Custom sizes can be manufactured",
            ],
          },
          {
            heading: "YAFI RF 592|592|48-FY – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "LK", "Rigid panel filter (header)"],
                ["Frame", "G", "G: Galvanised sheet"],
                ["Pleat height", "M", "M: 75 mm"],
                ["Protective mesh", "T", "X: No, T: Single, D: Double"],
                ["Gasket", "X", "X: No, E: EPDM, P: Polyurethane"],
                ["Efficiency", "M6 to F9", "EN 779"],
                ["", "ePM10 65% – ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: rigidTable("en", rigidHeaderRows),
          },
        ],
      },
      {
        slug: "rigidni-panelni-plasticni-okvir",
        name: "Rigid panel filter – plastic frame – YAFI RF",
        label: "Panel · plastic",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Panelni-Filter-Plasticni-Okvir.webp",
        sku: "YAFI RF - 592|592|48-FY",
        intro:
          "The rigid panel filter with a plastic frame is designed for high-efficiency filtration, for use in hospitals, the pharmaceutical industry and similar facilities. It suits units where installation depth is limited.",
        specs: [
          { label: "Filter type", value: "Compact panel filter" },
          { label: "Media", value: "Glass wool" },
          { label: "Frame", value: "Plastic frame" },
          { label: "Filter class", value: "M6 to F8 / ePM10 65% – ePM1 80%" },
          { label: "Final pressure drop", value: "450 Pa" },
          { label: "Max. temperature", value: "90 °C" },
        ],
        standards: [
          "Classes M6 – F9 – EN 779",
          "ePM10 65% – ePM1 80% – ISO 16890",
          "Plastic frame",
          "Working temperature up to 90 °C",
        ],
        sections: [
          {
            heading: "Rigid panel filter, plastic frame – Description",
            body: [
              "The rigid panel filter with a plastic frame is designed for high-efficiency filtration, for use in hospitals, the pharmaceutical industry and similar facilities. It suits units where installation depth is limited. It can be used as a high-efficiency filter in place of an existing low-efficiency filter in air conditioning systems.",
              "An alternative to traditional panel filters, for applications that call for high-purity air.",
            ],
          },
          {
            heading: "Applications",
            body: ["Air conditioning units and industrial systems."],
          },
          {
            heading: "Benefits",
            list: [
              "A rigid filter for installation in a tight space",
              "Interchangeable with existing filters without modifying the existing construction",
              "A large filtration area at a low pressure drop",
              "High dust holding capacity at a low pressure drop",
              "A long service life and reduced operating costs",
            ],
          },
          {
            heading: "YAFI RF 592|592|48-FY – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "UK", "Rigid panel filter"],
                ["Frame", "P", "P: Plastic"],
                ["Pleat height", "N", "N: 50 mm, L: 100 mm"],
                ["Protective mesh", "X", "X: No, T: Single, D: Double"],
                ["Gasket", "X", "X: No, E: EPDM, P: Polyurethane"],
                ["Efficiency", "M6 to F9", "EN 779"],
                ["", "ePM10 65% – ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: rigidTable("en", rigidPlasticRows),
          },
        ],
      },
      {
        slug: "rigidni-panelni-plasticni-okvir-zaglavlje",
        name: "Rigid panel filter – plastic frame with header – YAFI RF",
        label: "Panel · plastic, header",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Panelni-Filter-Plasticni-Okvir-sa-zaglavljem.webp",
        sku: "YAFI RF - 592|592|48-FY-1",
        intro:
          "The rigid panel filter with a plastic frame and header is designed for high-efficiency filtration, for use in hospitals, the pharmaceutical industry and similar facilities. It suits units where installation depth is limited.",
        specs: [
          { label: "Filter type", value: "Compact panel filter" },
          { label: "Media", value: "Glass fibre" },
          { label: "Frame", value: "Plastic frame" },
          { label: "Filter class", value: "M6 to F8 / ePM10 65% – ePM1 80%" },
          { label: "Final pressure drop", value: "450 Pa" },
          { label: "Max. temperature", value: "90 °C" },
        ],
        standards: [
          "Classes M6 – F9 – EN 779",
          "ePM10 65% – ePM1 80% – ISO 16890",
          "Plastic frame with header",
          "Working temperature up to 90 °C",
        ],
        sections: [
          {
            heading:
              "Rigid panel filter, plastic frame with header – Description",
            body: [
              "The rigid panel filter with a plastic frame and header is designed for high-efficiency filtration, for use in hospitals, the pharmaceutical industry and similar facilities. It suits units where installation depth is limited. It can be used as a high-efficiency filter in place of an existing low-efficiency filter in air conditioning systems.",
              "An alternative to traditional panel filters, for applications that call for high-purity air. Both standard and non-standard sizes can be manufactured.",
            ],
          },
          {
            heading: "Applications",
            body: ["Air conditioning units and industrial systems."],
          },
          {
            heading: "Benefits",
            list: [
              "A rigid filter for installation in a tight space",
              "Interchangeable with existing filters without modifying the existing construction",
              "A large filtration area at a low pressure drop",
              "High dust holding capacity at a low pressure drop",
              "A long service life and reduced operating costs",
            ],
          },
          {
            heading: "YAFI RF 592|592|48-FY – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "UK", "Rigid panel filter (header)"],
                ["Frame", "P", "P: Plastic"],
                ["Pleat height", "N", "N: 50 mm, L: 100 mm"],
                ["Protective mesh", "X", "X: No, T: Single, D: Double"],
                ["Gasket", "X", "X: No, E: EPDM, P: Polyurethane"],
                ["Efficiency", "M6 to F9", "EN 779"],
                ["", "ePM10 65% – ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: rigidTable("en", rigidPlasticHeaderRows),
          },
        ],
      },
      {
        slug: "rigidni-vrecasti-metalni-okvir-4v",
        name: "Rigid bag filter – metal frame 4V",
        label: "Bag 4V · metal",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Vrecasti-Filter-Metalni-Okvir-4V.webp",
        sku: "YAFI RF - 592|592|48-FY-7",
        intro:
          "The rigid bag filter is designed for high-efficiency filtration, for use in hospitals, the pharmaceutical industry and similar facilities. The high-filtration glass fibre paper is folded at a constantly calibrated spacing using thermoplastic threads.",
        specs: [
          { label: "Filter type", value: "W compact panel filter" },
          { label: "Media", value: "Glass fibre" },
          { label: "Frame", value: "Galvanised sheet" },
          { label: "Filter class", value: "M6 to F8 / ePM10 65% – ePM1 80%" },
          { label: "Final pressure drop", value: "450 Pa" },
          { label: "Max. temperature", value: "80 °C" },
        ],
        standards: [
          "Classes M6 – F9 – EN 779",
          "ePM10 65% – ePM1 80% – ISO 16890",
          "Galvanised metal frame",
          "Working temperature up to 80 °C",
        ],
        sections: [
          {
            heading: "Rigid bag filter, metal frame 4V – Description",
            body: [
              "The rigid bag filter is designed for high-efficiency filtration, for use in hospitals, the pharmaceutical industry and similar facilities. The high-filtration glass fibre paper is folded at a constantly calibrated spacing using thermoplastic threads. The large filtration area allows a high air flow rate at a low pressure drop and a high dust holding capacity compared with traditional bag filters.",
              "The compact design and lightweight construction give the filter superior mechanical resistance and easy installation.",
            ],
          },
          {
            heading: "Applications",
            body: ["Air conditioning units and industrial systems."],
          },
          {
            heading: "Benefits",
            list: [
              "A rigid filter for installation in a tight space",
              "Excellent performance in demanding conditions with a high dust holding capacity",
              "A large filtration area with the latest glass fibre media of high water repellency",
              "Custom sizes can be manufactured",
            ],
          },
          {
            heading: "YAFI RF 592|592|292-FY – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "WK", "W compact filter"],
                ["Frame", "G", "G: Galvanised sheet"],
                ["Pleat height", "S", "S: 25 mm"],
                ["Protective mesh", "X", "X: No, P: Plastic"],
                ["Gasket", "X", "X: No, E: EPDM, P: Polyurethane"],
                ["Efficiency", "M6 to F9", "EN 779"],
                ["", "ePM10 65% – ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: rigidTable("en", rigidBag4VMetalRows),
          },
        ],
      },
      {
        slug: "rigidni-vrecasti-plasticni-okvir-4v-energy",
        name: "Rigid bag filter – plastic frame 4V | Energy",
        label: "Bag 4V · Energy",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Vrecasti-Filter-Plasticni-Okvir-4V-Energy.webp",
        sku: "YAFI RF - 592|592|48-FY-5",
        intro:
          "The rigid bag filter is designed for high-efficiency filtration, for use in hospitals, the pharmaceutical industry and similar facilities. The high-filtration glass fibre paper is folded at a constantly calibrated spacing using thermoplastic threads.",
        specs: [
          { label: "Filter type", value: "W compact panel filter" },
          { label: "Media", value: "Glass fibre" },
          { label: "Frame", value: "Plastic" },
          { label: "Filter class", value: "M6 to F8 / ePM10 65% – ePM1 80%" },
          { label: "Final pressure drop", value: "450 Pa" },
          { label: "Max. temperature", value: "80 °C" },
        ],
        standards: [
          "Classes M6 – F9 – EN 779",
          "ePM10 65% – ePM1 80% – ISO 16890",
          "Plastic frame",
          "Working temperature up to 80 °C",
        ],
        sections: [
          {
            heading:
              "Rigid bag filter, plastic frame 4V | Energy – Description",
            body: [
              "The rigid bag filter is designed for high-efficiency filtration, for use in hospitals, the pharmaceutical industry and similar facilities. The high-filtration glass fibre paper is folded at a constantly calibrated spacing using thermoplastic threads. The large filtration area allows a high air flow rate at a low pressure drop and a high dust holding capacity compared with traditional bag filters.",
              "The compact design and lightweight construction give the filter superior mechanical resistance and easy installation.",
            ],
          },
          {
            heading: "Applications",
            body: ["Air conditioning units and industrial systems."],
          },
          {
            heading: "Benefits",
            list: [
              "A rigid filter for installation in a tight space",
              "Excellent performance in demanding conditions with a high dust holding capacity",
              "A large filtration area with the latest glass fibre media of high water repellency",
              "Easy maintenance",
            ],
          },
          {
            heading: "YAFI RF 592|592|292-FY – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "WK", "W compact filter"],
                ["Frame", "P", "P: Plastic"],
                ["Pleat height", "E", "S: 25 mm"],
                ["Protective mesh", "X", "X: No, P: Plastic"],
                ["Gasket", "X", "X: No, E: EPDM"],
                ["Efficiency", "M6 to F9", "EN 779"],
                ["", "ePM10 65% – ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: rigidTable("en", rigidBag4VEnergyRows),
          },
        ],
      },
      {
        slug: "rigidni-vrecasti-plasticni-okvir-4v-max-flow",
        name: "Rigid bag filter – plastic frame 4V | Max Flow",
        label: "Bag 4V · Max Flow",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Vrecasti-Filter-Plasticni-Okvir-Max-Flow.webp",
        sku: "YAFI RF - 592|592|48-FY-6",
        intro:
          "The rigid bag filter is designed for high-efficiency filtration, for use in hospitals, the pharmaceutical industry and similar facilities. The high-filtration glass fibre paper is folded at a constantly calibrated spacing using thermoplastic threads.",
        specs: [
          { label: "Filter type", value: "W compact panel filter" },
          { label: "Media", value: "Glass fibre" },
          { label: "Frame", value: "Plastic" },
          { label: "Filter class", value: "M6 to F8 / ePM10 65% – ePM1 80%" },
          { label: "Final pressure drop", value: "450 Pa" },
          { label: "Max. temperature", value: "80 °C" },
        ],
        standards: [
          "Classes M6 – F9 – EN 779",
          "ePM10 65% – ePM1 80% – ISO 16890",
          "Close-pleat version",
          "Working temperature up to 80 °C",
        ],
        sections: [
          {
            heading:
              "Rigid bag filter, plastic frame 4V | Max Flow – Description",
            body: [
              "The rigid bag filter is designed for high-efficiency filtration, for use in hospitals, the pharmaceutical industry and similar facilities. The high-filtration glass fibre paper is folded at a constantly calibrated spacing using thermoplastic threads. The large filtration area allows a high air flow rate at a low pressure drop and a high dust holding capacity compared with traditional bag filters.",
              "The compact design and lightweight construction give the filter superior mechanical resistance and easy installation.",
            ],
          },
          {
            heading: "Applications",
            body: ["Air conditioning units and industrial systems."],
          },
          {
            heading: "Benefits",
            list: [
              "A rigid filter for installation in a tight space",
              "Excellent performance in demanding conditions with a high dust holding capacity",
              "A large filtration area with the latest glass fibre media of high water repellency",
              "Easy maintenance",
            ],
          },
          {
            heading: "YAFI RF 592|592|292-FY – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "WK", "W compact filter"],
                ["Frame", "P", "P: Plastic"],
                ["Pleat height", "M", "M: 25 mm – Close Pleat"],
                ["Protective mesh", "D", "D: Double"],
                ["Gasket", "P", "E: EPDM, P: Polyurethane"],
                ["Efficiency", "M6 to F9", "EN 779"],
                ["", "ePM10 65% – ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: rigidTable("en", rigidBag4VMaxFlowRows),
          },
        ],
      },
      {
        slug: "rigidni-vrecasti-plasticni-okvir-4v-standard",
        name: "Rigid bag filter – plastic frame 4V | Standard",
        label: "Bag 4V · Standard",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Vrecasti-Filter-Plasticni-Okvir-4V-Standard.webp",
        sku: "YAFI RF - 592|592|48-FY-4",
        intro:
          "The rigid bag filter is designed for high-efficiency filtration, for use in hospitals, the pharmaceutical industry and similar facilities. The high-filtration glass fibre paper is folded at a constantly calibrated spacing using thermoplastic threads.",
        specs: [
          { label: "Filter type", value: "W compact panel filter" },
          { label: "Media", value: "Glass fibre" },
          { label: "Frame", value: "Plastic" },
          { label: "Filter class", value: "M6 to F8 / ePM10 65% – ePM1 80%" },
          { label: "Final pressure drop", value: "450 Pa" },
          { label: "Max. temperature", value: "80 °C" },
        ],
        standards: [
          "Classes M6 – F9 – EN 779",
          "ePM10 65% – ePM1 80% – ISO 16890",
          "Plastic frame",
          "Working temperature up to 80 °C",
        ],
        sections: [
          {
            heading:
              "Rigid bag filter, plastic frame 4V | Standard – Description",
            body: [
              "The rigid bag filter is designed for high-efficiency filtration, for use in hospitals, the pharmaceutical industry and similar facilities. The high-filtration glass fibre paper is folded at a constantly calibrated spacing using thermoplastic threads. The large filtration area allows a high air flow rate at a low pressure drop and a high dust holding capacity compared with traditional bag filters.",
              "The compact design and lightweight construction give the filter superior mechanical resistance and easy installation.",
            ],
          },
          {
            heading: "Applications",
            body: ["Air conditioning units and industrial systems."],
          },
          {
            heading: "Benefits",
            list: [
              "A rigid filter for installation in a tight space",
              "Excellent performance in demanding conditions with a high dust holding capacity",
              "A large filtration area with the latest glass fibre media of high water repellency",
              "Easy maintenance",
            ],
          },
          {
            heading: "YAFI RF 592|592|292-FY – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "WK", "W compact filter"],
                ["Frame", "P", "P: Plastic"],
                ["Pleat height", "S", "S: 25 mm"],
                ["Protective mesh", "X", "X: No, P: Plastic"],
                ["Gasket", "X", "X: No, E: EPDM"],
                ["Efficiency", "M6 to F9", "EN 779"],
                ["", "ePM10 65% – ePM1 80%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: rigidTable("en", rigidBag4VStandardRows),
          },
        ],
      },
    ],
  },
  {
    slug: "hepa-ulpa-filteri",
    name: "Absolute filters – HEPA",
    nameAcc: "absolute HEPA filters",
    title: "Absolute filters – HEPA – YAFI AF",
    class: "EN 1822, E10 – H14",
    image: "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filteri-MDF-Okvir-78mm.webp",
    description:
      "The final filtration stage for validated clean environments. They capture submicron particles with high reliability.",
    intro:
      "YAFI AF are HEPA, or absolute, filters made from fine synthetic and microglass fibre, with a high dust holding capacity. They are built in aluminium and MDF frames and run at minimal energy consumption. They are used wherever air cleanliness requirements are highest — in pharmaceutical production, microelectronics, operating theatres, poultry farms and cleanrooms.",
    applications: [
      "Pharmaceutical industry",
      "Microelectronics",
      "Operating theatres",
      "Poultry farms",
      "Cleanrooms",
    ],
    standards: [
      "EN 1822 · E10 – H14",
      "EPA and HEPA classes",
      "Synthetic and microglass fibre",
      "Aluminium and MDF frames",
      "Gel-sealed versions",
    ],
    keywords: [
      "absolute filter",
      "hepa filter",
      "ulpa filter",
      "cleanroom filter",
      "laminar flow",
      "mdf",
      "yafi af",
      "yafi hf",
    ],
    items: [
      {
        slug: "hepa-mdf-78mm",
        name: "Absolute HEPA filters – MDF frame 78 mm – YAFI HF",
        label: "MDF 78 mm · YAFI HF",
        group: "MDF and galvanised frame",
        image: "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filteri-MDF-Okvir-78mm.webp",
      },
      {
        slug: "hepa-mdf-mn",
        name: "Absolute HEPA filters MN – MDF frame",
        label: "MN",
        group: "MDF and galvanised frame",
        image: "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filteri-MN-MDF-Okvir.webp",
      },
      {
        slug: "hepa-mdf-mn-150mm",
        name: "Absolute HEPA filters MN – MDF frame 150 mm – YAFI HF",
        label: "MN · 150 mm",
        group: "MDF and galvanised frame",
        image: "/yafiproducts/apsolutni-filteri/3/Apsolutni-HEPA-Filteri-MN-MDF-Okvir-150mm.webp",
      },
      {
        slug: "hepa-mdf-ml-150mm",
        name: "Absolute HEPA filters ML – MDF frame 150 mm",
        label: "ML · 150 mm",
        group: "MDF and galvanised frame",
        image: "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filteri-ML-MDF-Okvir.webp",
      },
      {
        slug: "hepa-mdf-292mm-hf-ml-xp",
        name: "Absolute HEPA filters – MDF frame 292 mm – HF-ML-XP",
        label: "HF-ML-XP · 292 mm",
        group: "MDF and galvanised frame",
        image: "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filteri-MDF-Okvir-292mm-HF-ML-XP.webp",
      },
      {
        slug: "hepa-mdf-hf-mx-xp",
        name: "Absolute HEPA filters – MDF frame – HF-MX-XP",
        label: "HF-MX-XP",
        group: "MDF and galvanised frame",
        image: "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filteri-MDF-Okvir-HF-MX-XP.webp",
      },
      {
        slug: "hepa-mdf-hf-mh-xp",
        name: "Absolute HEPA filters – MDF frame – HF-MH-XP",
        label: "HF-MH-XP",
        group: "MDF and galvanised frame",
        image: "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filteri-MDF-okvir-HF-MH-XP.webp",
      },
      {
        slug: "hepa-hf-mn-xp",
        name: "Absolute HEPA filters – HF-MN-XP",
        label: "HF-MN-XP",
        group: "MDF and galvanised frame",
        image: "/yafiproducts/apsolutni-filteri/3/Apsolutni-HEPA-Filteri-HF-MN-XP.webp",
      },
      {
        slug: "hepa-galvanizovan-gx",
        name: "Absolute HEPA filter – galvanised frame GX",
        label: "GX",
        group: "MDF and galvanised frame",
        image: "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filter-Galvanizovan-Okvir-GX.webp",
      },
      {
        slug: "hepa-galvanizovan-gh",
        name: "Absolute HEPA filter – galvanised frame GH",
        label: "GH",
        group: "MDF and galvanised frame",
        image: "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filter-Galvanizovan-Okvir-GH.webp",
      },
      {
        slug: "hepa-galvanizovan-ax",
        name: "Absolute HEPA filter – galvanised frame AX",
        label: "AX",
        group: "MDF and galvanised frame",
        image:
          "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filter-Galvanizovan-Okvir-GX.webp",
      },
      {
        slug: "hepa-galvanizovan-ah",
        name: "Absolute HEPA filter – galvanised frame AH",
        label: "AH",
        group: "MDF and galvanised frame",
        image:
          "/yafiproducts/apsolutni-filteri/1/Apsolutni-HEPA-Filter-Galvanizovan-Okvir-GH-1.webp",
      },
      {
        slug: "hepa-pocinkovani-lim-gs-gh",
        name: "Galvanised sheet steel filter GS/GH",
        label: "GS / GH",
        group: "MDF and galvanised frame",
        image: "/yafiproducts/apsolutni-filteri/2/Filter-od-pocinkovanog-lima-GS-GH.webp",
      },
      {
        slug: "hepa-rigidni-ph-plasticni-4v",
        name: "Rigid filter PH – plastic frame 4V – EPA / HEPA",
        label: "PH · plastic frame",
        group: "Rigid 4V and high capacity",
        image: "/yafiproducts/apsolutni-filteri/1/Rigidni-Filter-PH-Plasticni-Okvir-4V-EPA-HEPA.webp",
      },
      {
        slug: "hepa-rigidni-gh-metalni-4v",
        name: "Rigid filter GH – metal frame 4V – EPA / HEPA",
        label: "GH · metal frame",
        group: "Rigid 4V and high capacity",
        image: "/yafiproducts/apsolutni-filteri/1/Rigidni-Filter-GH-Metalnii-Okvir-4V-EPA-HEPA.webp",
      },
      {
        slug: "hepa-rigidni-panelni-metalni",
        name: "Rigid panel filter – metal frame",
        label: "Panel · metal frame",
        group: "Rigid 4V and high capacity",
        image: "/yafiproducts/apsolutni-filteri/3/Rigidni-Panelni-Filter-Metalni-okvir.webp",
      },
      {
        slug: "hepa-v-tip-g30",
        name: "High-capacity absolute HEPA filter – V type G30 (standard)",
        label: "G30 · standard",
        group: "Rigid 4V and high capacity",
        image: "/yafiproducts/apsolutni-filteri/2/Apsolutni-HEPA-Filter-Visokog-Capaciteta-V-Type-G30-Standard.webp",
      },
      {
        slug: "hepa-v-tip-40",
        name: "High-capacity absolute HEPA filter – V type 40",
        label: "40",
        group: "Rigid 4V and high capacity",
        image: "/yafiproducts/apsolutni-filteri/2/Apsolutni-HEPA-Filter-Visokog-Capaciteta-V-Type-40.webp",
      },
      {
        slug: "hepa-v-tip-p30",
        name: "High-capacity absolute HEPA filter – V type P30, standard plastic frame",
        label: "P30 · plastic frame",
        group: "Rigid 4V and high capacity",
        image: "/yafiproducts/apsolutni-filteri/2/Apsolutni-HEPA-Filter-Visokog-kapaciteta-V-Type-P30-Standardni-Plasticni-Okvir.webp",
      },
      {
        slug: "hepa-v-tip-p40",
        name: "High-capacity absolute HEPA filter – V type P40, plastic frame",
        label: "P40 · plastic frame",
        group: "Rigid 4V and high capacity",
        image: "/yafiproducts/apsolutni-filteri/2/Apsolutni-HEPA-Filter-Visokog-kapaciteta-V-Type-P40-Plasticni-Okvir.webp",
      },
      {
        slug: "hepa-v-tip-nbc",
        name: "High-capacity absolute HEPA filter – V type NBC Grade",
        label: "NBC Grade",
        group: "Rigid 4V and high capacity",
        image: "/yafiproducts/apsolutni-filteri/2/Apsolutni-HEPA-Filter-Visokog-Kapaciteta-V-Tip-NBC-Grade.webp",
      },
      {
        slug: "hepa-laminarni-as",
        name: "Laminar flow HEPA filter – aluminium frame AS",
        label: "AS",
        group: "Laminar flow and gel-sealed",
        image: "/yafiproducts/apsolutni-filteri/2/HEPA-Filter-sa-Laminarnim-protokom-Aluminijumski-okvir-AS.webp",
      },
      {
        slug: "hepa-laminarni-al-125",
        name: "Laminar flow HEPA filter – aluminium frame AL 125 mm",
        label: "AL · 125 mm",
        group: "Laminar flow and gel-sealed",
        image: "/yafiproducts/apsolutni-filteri/3/HEPA-Filter-sa-Laminarnim-protokom-Aluminijumski-Okvir-AL-125mm.webp",
      },
      {
        slug: "hepa-laminarni-al-150",
        name: "Laminar flow HEPA filter – aluminium frame AL 150 mm",
        label: "AL · 150 mm",
        group: "Laminar flow and gel-sealed",
        image: "/yafiproducts/apsolutni-filteri/3/HEPA-Filter-sa-Luminarnim-protokom-Aluminijumski-Okvir-AL-150mm.webp",
      },
      {
        slug: "hepa-laminarni-am-110",
        name: "Laminar flow HEPA filter – aluminium frame AM 110 mm",
        label: "AM · 110 mm",
        group: "Laminar flow and gel-sealed",
        image: "/yafiproducts/apsolutni-filteri/2/HEPA-Filter-sa-Luminarnim-protokom-Aluminijumski-Okvir-AM-110mm.webp",
      },
      {
        slug: "hepa-laminarni-an-66",
        name: "Laminar flow HEPA filter – aluminium frame AN 66 mm",
        label: "AN · 66 mm",
        group: "Laminar flow and gel-sealed",
        image: "/yafiproducts/apsolutni-filteri/2/HEPA-Filter-sa-Luminarnim-protokom-Aluminijumski-Okvir-AN-66mm.webp",
      },
      {
        slug: "hepa-laminarni-an-69",
        name: "Laminar flow HEPA filter – aluminium frame AN 69 mm",
        label: "AN · 69 mm",
        group: "Laminar flow and gel-sealed",
        image: "/yafiproducts/apsolutni-filteri/2/HEPA-Filter-sa-Luminarnim-protokom-Aluminijumski-Okvir-AN-69mm.webp",
      },
      {
        slug: "hepa-laminarni-an-78",
        name: "Laminar flow HEPA filter – aluminium frame AN 78 mm",
        label: "AN · 78 mm",
        group: "Laminar flow and gel-sealed",
        image: "/yafiproducts/apsolutni-filteri/2/HEPA-Filter-sa-Luminarnim-protokom-Aluminijumski-Okvir-AN-78mm.webp",
      },
      {
        slug: "hepa-laminarni-an-110",
        name: "Laminar flow HEPA filter – aluminium frame AN 110 mm",
        label: "AN · 110 mm",
        group: "Laminar flow and gel-sealed",
        image: "/yafiproducts/apsolutni-filteri/3/HEPA-Filter-sa-Luminarnim-protokom-Aluminijumski-Okvir-AN-110mm.webp",
      },
      {
        slug: "hepa-laminarni-an-125",
        name: "Laminar flow HEPA filter – aluminium frame AN 125 mm",
        label: "AN · 125 mm",
        group: "Laminar flow and gel-sealed",
        image: "/yafiproducts/apsolutni-filteri/2/HEPA-Filter-sa-Luminarnim-protokom-Aluminijumski-Okvir-AN-125mm.webp",
      },
      {
        slug: "hepa-laminarni-an-150",
        name: "Laminar flow HEPA filter – aluminium frame AN 150 mm",
        label: "AN · 150 mm",
        group: "Laminar flow and gel-sealed",
        image: "/yafiproducts/apsolutni-filteri/3/HEPA-Filter-sa-Luminarnim-protokom-Aluminijumski-Okvir-AN-150mm.webp",
      },
      {
        slug: "hepa-gel-an-80",
        name: "Gel-sealed HEPA filters – aluminium frame AN 80 mm",
        label: "AN · 80 mm",
        group: "Laminar flow and gel-sealed",
        image: "/yafiproducts/apsolutni-filteri/3/Gelom-Zaptivani-HEPA-Filteri-Aluminijumski-Okvir-AN-80mm.webp",
      },
      {
        slug: "hepa-gel-an-91",
        name: "Gel-sealed HEPA filters – aluminium frame AN 91 mm",
        label: "AN · 91 mm",
        group: "Laminar flow and gel-sealed",
        image: "/yafiproducts/apsolutni-filteri/3/Gelom-Zaptivani-HEPA-Filteri-Aluminijumski-Okvir-AN-91mm.webp",
      },
      {
        slug: "hepa-gel-an-104",
        name: "Gel-sealed HEPA filters – aluminium frame AN 104 mm",
        label: "AN · 104 mm",
        group: "Laminar flow and gel-sealed",
        image: "/yafiproducts/apsolutni-filteri/3/Gelom-Zaptivani-HEPA-Filteri-Aluminijumski-Okvir-AN-104mm.webp",
      },
    ],
  },
  {
    slug: "filteri-mirisi-masnoce",
    name: "Odour and grease removal filters",
    nameAcc: "odour and grease removal filters",
    title: "Grease vapour filters – YAFI MF",
    class: "Activated carbon and grease filters",
    image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/Kertridzi-sa-aktivnim-ugljem.webp",
    description:
      "Activated carbon for gaseous pollutants and odours, and grease filters for kitchen extraction hoods — where mechanical filtration alone is not enough.",
    intro:
      "Grease vapour filters for restaurants, grill hoods and odour control — above all in food production and processing. The range covers activated carbon versions, cartridge versions and grease filters with a mesh frame.",
    applications: [
      "Restaurants and kitchens",
      "Grill hoods",
      "Food production and processing",
      "Odour control",
      "Parking garages",
    ],
    keywords: [
      "carbon filter",
      "gas filter",
      "odour filter",
      "grease filter",
      "grease vapour",
      "cartridge",
      "kitchen hood",
      "yafi mf",
    ],
    items: [
      {
        slug: "filter-aktivni-ugalj-pelet",
        name: "Activated carbon filter filled with carbon pellets",
        label: "Activated carbon · pellet",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/Filter-sa-aktivnim-ugljem-napunjen-ugljenicnim-peletom.webp",
        sku: "YAFI MV-AU 592/592/48-AC",
        intro:
          "Designed to absorb odours and gases in industrial and commercial air conditioning applications. The plastic frame is filled with loose granular or extruded activated carbon, which gives a very long service life.",
        specs: [
          { label: "Filter type", value: "AC panel filter" },
          { label: "Media", value: "Activated carbon pellets" },
          { label: "Frame", value: "Galvanised steel / stainless steel" },
          { label: "Class", value: "Odour filtration" },
          { label: "Max. temperature", value: "80 °C" },
          { label: "Max. relative humidity", value: "70%" },
        ],
        standards: [
          "Odour and gas filtration",
          "Pelletised activated carbon",
          "Working temperature up to 80 °C",
          "RH max. 70%",
        ],
        sections: [
          {
            heading:
              "Activated carbon filter filled with carbon pellets – Description",
            body: [
              "Designed to absorb odours and gases in industrial and commercial air conditioning applications. The plastic frame is filled with loose granular or extruded activated carbon, which gives a very long service life.",
              "Suited to demanding industrial applications with high performance requirements.",
            ],
          },
          {
            heading: "Applications",
            body: ["Absorption of odours and gases from the air."],
          },
          {
            heading: "Benefits",
            list: [
              "Robust construction for quick installation",
              "A vibrated filling technique prevents the media from settling",
              "Available in gas absorption and chemisorption versions",
              "The robust construction makes fitting and removal easy",
              "Custom sizes can be manufactured",
            ],
          },
          {
            heading: "YAFI MV-AU 592/592/48-AC – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "KD", "Activated carbon panel filter"],
                ["Frame", "G", "Galvanised steel"],
                ["Media", "K", "Activated carbon pellets"],
                ["Pleat type", "D", "Filled"],
                ["Gasket", "X", "–"],
                ["Dimensions", "–", "W × H × D"],
                ["Efficiency", "AC", "Activated carbon"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: figureTable("en", carbonHead, carbonPelletRows),
          },
        ],
      },
      {
        slug: "filter-cvrste-vrece-aktivni-ugalj",
        name: "Filter with rigid bags and activated carbon",
        label: "Activated carbon · rigid bags",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/Filter-sa-cvrstim-vrecama.webp",
        sku: "YAFI KW-PC-XX-592|592|292-CFY",
        intro:
          "Designed to absorb odours and gases while delivering dust filtration efficiency, in industrial and commercial air conditioning applications. An F7-efficiency non-woven media with two layers containing small activated carbon granules is pleated and set into a plastic frame.",
        specs: [
          { label: "Filter type", value: "W compact AC filter" },
          {
            label: "Media",
            value: "Activated carbon between synthetic layers, 400 g/m²",
          },
          { label: "Frame", value: "Plastic (polypropylene)" },
          { label: "Filter class", value: "F7 / ePM1 55%" },
          { label: "Final pressure drop", value: "450 Pa" },
          { label: "Max. temperature", value: "75 °C" },
        ],
        standards: [
          "Class F7 – EN 779",
          "ePM1 55% – ISO 16890",
          "Plastic frame",
          "Working temperature up to 75 °C",
        ],
        sections: [
          {
            heading:
              "Filter with rigid bags and activated carbon – Description",
            body: [
              "Designed to absorb odours and gases while delivering dust filtration efficiency, in industrial and commercial air conditioning applications. An F7-efficiency non-woven media with two layers containing small activated carbon granules is pleated and set into a plastic frame. Polyurethane resin guarantees the seal between the filter pack and the frame.",
              "To extend the service life of the filter, a G4 – F5 pre-filter is recommended.",
            ],
          },
          {
            heading: "Applications",
            body: [
              "A molecular filter for high-efficiency, long-lasting control of molecular contaminants.",
            ],
          },
          {
            heading: "Benefits",
            list: [
              "A rigid filter for installation in a tight space",
              "A lower pressure drop with high performance and a high contamination removal capacity",
              "Small activated carbon granules in two layers of non-woven media, with no dust release and no regeneration",
              "Lightweight and easy to service thanks to the handles",
            ],
          },
          {
            heading: "YAFI KW-PC-XX-592|592|292-CFY – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "KW", "V-bank AC filter"],
                ["Frame", "P", "P: Plastic"],
                ["Media", "C", "S: 25 mm"],
                ["Protective mesh", "X", "X: No, P: Plastic"],
                ["Gasket", "X", "X: No, E: EPDM, P: Polyurethane"],
                ["Efficiency", "EN 779", "F7"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: figureTable("en", carbonBagHead, carbonBagRows),
          },
        ],
      },
      {
        slug: "filter-produzena-povrsina-aktivni-ugalj",
        name: "Extended-surface activated carbon filter",
        label: "Activated carbon · extended surface",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/Filter-sa-produzenom-povrsinom-od-aktivnog-uglja.webp",
        sku: "YAFI MV-AU 592/592/48-ZW",
        intro:
          "Designed to absorb odours and gases in industrial and commercial air conditioning applications. Synthetic media impregnated with activated carbon is pleated and set into a water-resistant cardboard frame.",
        specs: [
          { label: "Filter type", value: "Extended surface filter" },
          {
            label: "Media",
            value: "Synthetic fibre impregnated with activated carbon",
          },
          { label: "Frame", value: "Galvanised steel" },
          { label: "Filter class", value: "Odour filtration" },
          { label: "Final pressure drop", value: "250 Pa" },
          { label: "Max. temperature", value: "80 °C" },
        ],
        standards: [
          "Odour and smoke filtration",
          "Class G4 – Coarse 65%",
          "Impregnated synthetic fibre",
          "Working temperature up to 80 °C",
        ],
        sections: [
          {
            heading:
              "Extended-surface activated carbon filter – Description",
            body: [
              "Designed to absorb odours and gases in industrial and commercial air conditioning applications. Synthetic media impregnated with activated carbon is pleated and set into a water-resistant cardboard frame. The synthetic media is supported by metal mesh and pleated for a large filtration area. Available in standard and non-standard sizes.",
              "An ideal solution for improving indoor air quality in light industrial applications.",
            ],
          },
          {
            heading: "Applications",
            body: ["Primary filter for odour and smoke filtration."],
          },
          {
            heading: "Benefits",
            list: [
              "Robust construction for quick installation",
              "Fully supported media between two wire meshes",
              "Economical operation and a large filtration area",
              "Synthetic fibre media impregnated with finely ground activated carbon",
              "Custom sizes available on request",
            ],
          },
          {
            heading: "YAFI MF-AU 592/592/48-ZW – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "KK", "Activated carbon panel filter"],
                ["Frame", "G", "Galvanised steel"],
                [
                  "Media",
                  "S",
                  "Synthetic fibre impregnated with activated carbon",
                ],
                ["Pleat type", "Z", "Zig-zag"],
                ["Gasket", "X", "No gasket"],
                ["Dimensions", "–", "W × H × D"],
                ["Efficiency", "ZW", "Activated carbon"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: panelTable("en", carbonPleatedRows),
          },
        ],
      },
      {
        slug: "filteri-za-masti-mrezni-okvir",
        name: "Grease filters with mesh frame",
        label: "Mesh frame · grease",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/filteri-za-masti-sa-pletenim-mreznim-okvirom.webp",
        sku: "YAFI PF 592/592/48-G3",
        intro:
          "Grease filters are designed for demanding industrial applications and kitchen hoods, as washable filters for dust and grease. The media of multi-layer galvanised knitted mesh delivers a high holding capacity with a very long service life.",
        specs: [
          { label: "Filter type", value: "Metal panel filter" },
          { label: "Media", value: "Galvanised knitted mesh" },
          { label: "Frame", value: "Galvanised sheet" },
          { label: "Class", value: "G2 / ISO Coarse 50%" },
          { label: "Final pressure drop", value: "250 Pa" },
          { label: "Max. temperature", value: "120 °C" },
        ],
        standards: [
          "Class G3 – EN 779",
          "Coarse 50% – ISO 16890",
          "Dishwasher safe",
          "Working temperature up to 120 °C",
        ],
        sections: [
          {
            heading: "Grease filters with knitted mesh frame – Description",
            body: [
              "Grease filters are designed for demanding industrial applications and kitchen hoods, as washable filters for dust and grease. The filter frame can be made from galvanised aluminium or stainless steel, and the filter media consists of multi-layer galvanised knitted mesh. The media delivers a high dust holding capacity with a very long service life at optimal efficiency.",
              "Available in standard and custom sizes.",
            ],
          },
          {
            heading: "Applications",
            body: [
              "Primary filter for separating grease or oil mist.",
            ],
          },
          {
            heading: "Benefits",
            list: [
              "Robust construction for reliable operation",
              "Economical operation and a large filtration area",
              "Compact, rigid construction for quick installation",
              "A stainless steel version can be manufactured",
              "Can be cleaned in a dishwasher or with a pressure washer",
            ],
          },
          {
            heading: "YAFI MF AU 592/592/48-G3 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "MK", "Metal panel filter"],
                ["Frame", "G", "Galvanised sheet"],
                ["Media", "G", "Galvanised knitted mesh"],
                ["Pleat type", "D", "Mesh filled"],
                ["Gasket", "X", "No"],
                ["Dimensions", "–", "W × H × D"],
                ["Efficiency", "G3", "EN 779"],
                ["", "Coarse 50%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: panelTable("en", greaseMeshRows),
          },
        ],
      },
      {
        slug: "kertridzi-aktivni-ugalj",
        name: "Activated carbon cartridges",
        label: "Cartridge",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/Kertridzi-sa-aktivnim-ugljem.webp",
        sku: "YAFI MV-AU 145/450",
        intro:
          "Designed for odour absorption (deodorisation) and for the adsorption of VOCs and low-toxicity gases, for use in industrial and commercial air conditioning. Being able to choose the most suitable adsorption medium for each requirement ensures the best adsorption of odours and pollutants.",
        specs: [
          { label: "Filter type", value: "Cylinder filled with activated carbon" },
          {
            label: "Media",
            value: "Activated carbon, impregnated activated carbon",
          },
          { label: "Frame", value: "Galvanised steel / stainless steel" },
          { label: "Class", value: "Odour filtration" },
          { label: "Max. temperature", value: "40 °C" },
          { label: "Max. relative humidity", value: "70%" },
        ],
        standards: [
          "Odour and VOC filtration",
          "Quick bayonet system",
          "Refillable with new carbon media",
          "RH max. 70%",
        ],
        sections: [
          {
            heading: "Activated carbon cartridges – Description",
            body: [
              "Designed for odour absorption (deodorisation) and for the adsorption of VOCs and low-toxicity gases, for use in industrial and commercial air conditioning. Being able to choose the most suitable adsorption medium for each requirement ensures the best adsorption of odours and pollutants. The cartridges are made from galvanised expanded metal filled with activated carbon and attach with a quick-fastening system to a holding frame for 8 or 16 cartridges; the gasket gives maximum air tightness.",
              "The special cartridge design makes maintenance and carbon replacement very easy.",
            ],
          },
          {
            heading: "Applications",
            body: [
              "A molecular filter for high-efficiency, long-lasting control of molecular contaminants.",
            ],
          },
          {
            heading: "Benefits",
            list: [
              "Robust construction for reliable operation",
              "Quick bayonet system",
              "A lower pressure drop with high performance",
              "Leak-free installation delivers the maximum possible efficiency",
              "Refillable with new carbon media",
            ],
          },
          {
            heading: "YAFI MF-AU 145/450 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "SK", "Carbon cartridge filter"],
                ["Media", "AC", "AC: Activated carbon"],
                ["Frame", "G", "G: Galvanised, S: Stainless steel"],
                ["Model", "A", "Model A"],
              ],
            },
          },
          {
            heading: "Technical characteristics – complete set",
            table: figureTable("en", carbonHead, cartridgeSetRows),
          },
          {
            heading: "Spare cartridges",
            table: figureTable("en", cartridgeSpareHead, cartridgeSpareRows),
          },
          {
            heading: "Holding frames",
            table: figureTable("en", cartridgeFrameHead, cartridgeFrameRows),
          },
        ],
      },
      {
        slug: "kertridzi-aktivni-ugalj-model-b",
        name: "Activated carbon cartridges – model B",
        label: "Cartridge · model B",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/Kertridzi-sa-aktivnim-ugljem-B.webp",
        sku: "YAFI MV-AU 140/400",
        intro:
          "Designed for odour absorption (deodorisation) and for the adsorption of VOCs and low-toxicity gases, for use in industrial and commercial air conditioning. Being able to choose the most suitable adsorption medium for each requirement ensures the best adsorption of odours and pollutants.",
        specs: [
          {
            label: "Filter type",
            value: "Cylinder filled with activated carbon",
          },
          {
            label: "Media",
            value: "Activated carbon, impregnated activated carbon",
          },
          { label: "Frame", value: "Galvanised steel / stainless steel" },
          { label: "Class", value: "Odour filtration" },
          { label: "Max. temperature", value: "40 °C" },
          { label: "Max. relative humidity", value: "70%" },
        ],
        standards: [
          "Odour and VOC filtration",
          "Quick bayonet system",
          "Refillable with new carbon media",
          "RH max. 70%",
        ],
        sections: [
          {
            heading: "Activated carbon cartridges model B – Description",
            body: [
              "Designed for odour absorption (deodorisation) and for the adsorption of VOCs and low-toxicity gases, for use in industrial and commercial air conditioning. Being able to choose the most suitable adsorption medium for each requirement ensures the best adsorption of odours and pollutants. The cartridges are made from coated expanded metal filled with activated carbon and attach with a quick-fastening system to a holding frame for 8 or 16 cartridges; the gasket gives maximum air tightness.",
              "The special cartridge design makes maintenance and carbon replacement very easy.",
            ],
          },
          {
            heading: "Applications",
            body: [
              "A molecular filter for high-efficiency, long-lasting control of molecular contaminants.",
            ],
          },
          {
            heading: "Benefits",
            list: [
              "Robust construction for reliable operation",
              "Quick bayonet system",
              "A lower pressure drop with high performance",
              "Leak-free installation delivers the maximum possible efficiency",
              "Refillable with new carbon media",
            ],
          },
          {
            heading: "YAFI MF-AU 140/400 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "SK", "Carbon cartridge filter"],
                ["Media", "AC", "AC: Activated carbon"],
                ["Frame", "G", "G: Galvanised, S: Stainless steel"],
                ["Model", "B", "Model B"],
              ],
            },
          },
          {
            heading: "Technical characteristics – complete set",
            table: figureTable("en", carbonHead, cartridgeBSetRows),
          },
          {
            heading: "Spare cartridges",
            table: figureTable("en", cartridgeSpareHead, cartridgeBSpareRows),
          },
          {
            heading: "Holding frames",
            table: figureTable("en", cartridgeFrameHead, cartridgeBFrameRows),
          },
        ],
      },
      {
        slug: "metalni-okvir-kuhinjske-nape",
        name: "Metal frame for kitchen hoods – YAFI PF",
        label: "Kitchen hood · YAFI PF",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/metalni-okvir-kuhinjske-nape.webp",
        sku: "PF 592/592/48-G2",
        intro:
          "Designed for demanding industrial applications and kitchen hoods, as a washable filter for dust and grease. The filter media consists of multi-layer aluminium mesh that delivers a high grease holding capacity with a very long service life.",
        specs: [
          { label: "Filter type", value: "Metal panel filter" },
          { label: "Media", value: "Aluminium mesh" },
          { label: "Frame", value: "Galvanised sheet" },
          { label: "Class", value: "G2 / ISO Coarse 40%" },
          { label: "Final pressure drop", value: "250 Pa" },
          { label: "Max. temperature", value: "120 °C" },
        ],
        standards: [
          "Class G2 – EN 779",
          "Coarse 40% – ISO 16890",
          "Dishwasher safe",
          "Working temperature up to 120 °C",
        ],
        sections: [
          {
            heading: "Metal frame for kitchen hoods – Description",
            body: [
              "Designed for demanding industrial applications and kitchen hoods, as a washable filter for dust and grease. The filter frame can be made from galvanised aluminium or stainless steel, and the filter media consists of multi-layer aluminium mesh. The media delivers a high grease holding capacity with a very long service life.",
              "Available in standard and custom sizes.",
            ],
          },
          {
            heading: "Applications",
            body: ["Primary filter for separating grease or oil mist."],
          },
          {
            heading: "Benefits",
            list: [
              "Robust construction for reliable operation",
              "Economical operation and a large filtration area",
              "Compact, rigid construction for quick installation",
              "A stainless steel version can be manufactured",
              "Can be cleaned in a dishwasher or with a pressure washer",
            ],
          },
          {
            heading: "YAFI PF 592/592/48-G2 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Filter type", "MK", "Metal panel filter"],
                ["Frame", "G", "Galvanised sheet"],
                ["Media", "A", "Expanded aluminium"],
                ["Pleat type", "Z", "Zig-zag"],
                ["Gasket", "X", "No"],
                ["Dimensions", "–", "W × H × D"],
                ["Efficiency", "G2", "EN 779"],
                ["", "Coarse 40%", "ISO 16890"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: panelTable("en", kitchenHoodRows),
          },
        ],
      },
    ],
  },
  {
    slug: "filteri-za-lakirnice",
    name: "Paint shop filters",
    nameAcc: "paint shop filters",
    class: "Floor, ceiling and paint-stop",
    image: "/yafiproducts/filteri-za-lakirnice/filteri-za-lakirnice.webp",
    description:
      "Floor, ceiling and paint-stop filters that capture paint particles in coating processes across the automotive and metal industries.",
    intro:
      "Filtration for coating processes — paint-stop media plus synthetic and glass fibre media that capture paint particles in paint shops and spray booths.",
    applications: ["Paint shops", "Automotive industry", "Metal industry"],
    keywords: [
      "paint booth filter",
      "spray booth filter",
      "paint stop",
      "lakirnica",
      "yafi fm",
    ],
    // Same media as on the filter-materijali page — shared slugs so one photo
    // and one future detail page serve both categories.
    items: [
      {
        ...enSyntheticM5,
        image: "/yafiproducts/filteri-za-lakirnice/Filter-od-sintetickih-vlakana-M5.webp",
      },
      {
        ...enGlassFibre,
        image: "/yafiproducts/filteri-za-lakirnice/Filteri-od-staklenih-vlakana.webp",
      },
      {
        ...enPaintStop,
        image: "/yafiproducts/filteri-za-lakirnice/filteri-za-lakirnice.webp",
      },
    ],
  },
  {
    slug: "ramovi-za-filtere",
    name: "Filter frames",
    nameAcc: "filter frames",
    class: "Holding and clamping systems",
    image: "/yafiproducts/ramovi-za-filtere/ramovi-za-filtere.webp",
    description:
      "Holding frames, clamping frames and housings that seal the filter in place — so no air bypasses the insert.",
    intro:
      "Holding frames and inner frames for filters, pre-filters and fine filters — they seal the insert inside the duct or air handling unit so no air bypasses the filter.",
    applications: ["Air handling units", "Cleanrooms", "System retrofits"],
    keywords: [
      "filter frame",
      "holding frame",
      "inner frame",
      "clamping frame",
      "housing",
      "ram za filter",
    ],
    items: [
      {
        slug: "ramovi-iner-frejmovi",
        name: "Holding frames and inner frames for filters, pre-filters and fine filters",
        label: "Holding and inner frames",
        image: "/yafiproducts/ramovi-za-filtere/ramovi-za-filtere.webp",
        sku: "FK-GY5-610/610/Y5",
        intro:
          "Designed as a terminal housing for HEPA/ULPA filters used in cleanrooms in hospitals and in the pharmaceutical and food industries.",
        specs: [
          { label: "Filter type", value: "Filter frame" },
          { label: "Material", value: "Galvanised steel / stainless steel" },
          { label: "Gasket", value: "Polyurethane / EPDM (flat)" },
          { label: "Note", value: "Secure hold with 4 clamps" },
          {
            label: "Filter models",
            value: "Panel / bag / compact filters",
          },
        ],
        standards: [
          "Tested to DIN 1946/4",
          "Housing leak test",
          "Galvanised or stainless steel",
          "Depths of 75, 100 and 125 mm",
        ],
        sections: [
          {
            heading:
              "Holding frames and inner frames for air filters, pre-filters and fine filters – Description",
            body: [
              "Designed as a terminal housing for HEPA/ULPA air filters used in cleanrooms in hospitals and in the pharmaceutical and food industries. It allows quick and simple filter installation using swivel clamps fitted with a compression stop.",
              "Made from galvanised steel with fully welded seams, painted with white epoxy and oven baked. It can be manufactured with a top or side connection. Every housing is tested to DIN 1946/4, and a leak test guarantees its air tightness.",
            ],
          },
          {
            heading: "Benefits",
            list: [
              "A modular concept for every installation",
              "Robust construction for quick installation",
              "Available for several filters in a single frame",
              "Custom sizes available on request",
            ],
          },
          {
            heading: "FK-GY5-610/610/Y5 – construction",
            table: {
              head: ["Designation", "Code", "Meaning"],
              rows: [
                ["Model", "FK", "Filter frame"],
                ["Frame", "G", "G: Galvanised steel, S: Stainless steel"],
                ["Media", "Y5", "Depth: 75 / 100 / 125"],
                ["Dimensions", "–", "W × H × D"],
              ],
            },
          },
          {
            heading: "Technical characteristics",
            table: figureTable("en", filterFrameHead, filterFrameRows),
          },
        ],
      },
    ],
  },
];

const byLocale: Record<Locale, ProductCategory[]> = { sr, en };

export function getProducts(locale: Locale): ProductCategory[] {
  return byLocale[locale];
}

export function getProduct(locale: Locale, slug: string) {
  return byLocale[locale].find((category) => category.slug === slug);
}

/** Slugs are shared across locales — used by `generateStaticParams`. */
export const productSlugs = sr.map((category) => category.slug);

/**
 * Every `<category, variant>` pair in the catalogue, for the detail route's
 * `generateStaticParams`. Slugs are locale-independent, so one list covers
 * both languages.
 */
export const productItemParams = sr.flatMap((category) =>
  (category.items ?? []).map((item) => ({
    slug: category.slug,
    item: item.slug,
  }))
);

/** A variant together with the category it was reached through. */
export function getProductItem(
  locale: Locale,
  categorySlug: string,
  itemSlug: string
) {
  const category = getProduct(locale, categorySlug);
  const item = category?.items?.find((entry) => entry.slug === itemSlug);
  if (!category || !item) return undefined;
  return { category, item };
}

/**
 * A handful of variants are listed under two categories — the paint-shop media
 * also sit under filter materials — which would give one product two URLs.
 * Catalogue order decides: the first category holding the slug owns it, and
 * the duplicate points its canonical there.
 */
export function primaryCategorySlug(itemSlug: string): string | undefined {
  return sr.find((category) =>
    category.items?.some((item) => item.slug === itemSlug)
  )?.slug;
}

/**
 * Every category a variant is listed under, in catalogue order — the detail
 * page prints all of them, the way the product sheet does.
 */
export function getItemCategories(
  locale: Locale,
  itemSlug: string
): ProductCategory[] {
  return byLocale[locale].filter((category) =>
    category.items?.some((item) => item.slug === itemSlug)
  );
}

/** Other variants in the same category, for the detail page's siblings row. */
export function getSiblingItems(
  locale: Locale,
  categorySlug: string,
  itemSlug: string
): ProductItem[] {
  const category = getProduct(locale, categorySlug);
  return (category?.items ?? []).filter((item) => item.slug !== itemSlug);
}
