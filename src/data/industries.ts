import type { Locale } from "@/i18n/config";

/*
 * Card photography is Unsplash, free licence, no attribution required
 * (unsplash.com/license). Photo ids, in case one needs replacing:
 * farmaceutska-industrija k2H_b2AEqbg · auto-industrija Xbgu6L9YyAE ·
 * hotelijerstvo Is2xP3QGb74 · teska-industrija-i-energetika io7dX_1EFCg
 */

export type Industry = {
  /** Locale-independent — the same URL segment serves every language. */
  slug: string;
  name: string;
  short: string;
  /**
   * Serbian needs the inflected forms: accusative after "za" (za farmaciju)
   * and dative (prilagođen farmaciji). English does not inflect, so both
   * fields carry the same phrase there.
   */
  shortAcc: string;
  shortDat: string;
  teaser: string;
  /** The filter types this sector runs on — the card's eyebrow line. */
  eyebrow: string;
  /** Card artwork under `public/` — shared by both locales. */
  image: string;
  challenge: string;
  solution: string;
  points: string[];
  filters: string[];
};

const sr: Industry[] = [
  {
    slug: "farmaceutska-industrija",
    name: "Farmaceutska industrija i bolnice",
    short: "Farmacija i bolnice",
    shortAcc: "farmaciju i bolnice",
    shortDat: "farmaciji i bolnicama",
    teaser:
      "HEPA/ULPA filtracija za čiste sobe, operacione sale i validovane proizvodne procese.",
    eyebrow: "Čiste sobe · HEPA/ULPA",
    image: "/industrije/farmaceutska-industrija.webp",
    challenge:
      "Proizvodnja lekova i sterilnih preparata, kao i bolnički prostori — operacione sale, izolacione i intenzivne nege — zahtevaju dokumentovanu, ponovljivu čistoću vazduha. Svako odstupanje od klase čistoće znači zaustavljen proces, gubitak šarže ili neusklađenost sa GMP regulativom.",
    solution:
      "Projektujemo višestepene sisteme filtracije — od predfiltracije do HEPA/ULPA terminalnih filtera — usklađene sa ISO 14644 klasama čistih prostora i ISO 16890 standardom, sa punom dokumentacijom za validaciju.",
    points: [
      "Validacija i dokumentacija za GMP inspekcije",
      "Terminalni HEPA/ULPA filteri klase H13–H14",
      "Programi zamene usklađeni sa proizvodnim ciklusima",
    ],
    filters: ["hepa-ulpa-filteri", "rigidni-v-filteri", "vrecasti-filteri"],
  },
  {
    slug: "auto-industrija",
    name: "Auto-industrija i lakirnice",
    short: "Auto-industrija",
    shortAcc: "auto-industriju i lakirnice",
    shortDat: "auto-industriji i lakirnicama",
    teaser:
      "Paint-stop i stropni filteri za lakirnice, bojarske kabine i proizvodne pogone.",
    eyebrow: "Paint-stop · stropni filteri",
    image: "/industrije/auto-industrija.webp",
    challenge:
      "Kvalitet farbe direktno zavisi od čistoće vazduha u kabini za lakiranje. Čestice prašine u pogonu uzrokuju škart, dodatnu doradu i zastoje u proizvodnji.",
    solution:
      "Isporučujemo paint-stop podne filtere i stropne filtere za bojarske kabine, kao i panelne i rigidne filtere za opštu ventilaciju proizvodnih hala, sa fokusom na predvidljiv interval zamene.",
    points: [
      "Manje škarta zahvaljujući stabilnoj čistoći vazduha u kabini",
      "Filteri prilagođeni specifikaciji proizvođača kabine",
      "Planovi redovne zamene usklađeni sa proizvodnim linijama",
    ],
    filters: ["filteri-za-lakirnice", "panelni-filteri", "rigidni-v-filteri"],
  },
  {
    slug: "hotelijerstvo",
    name: "Hotelijerstvo i poslovni objekti",
    short: "Hotelijerstvo",
    shortAcc: "hotelijerstvo i poslovne objekte",
    shortDat: "hotelijerstvu i poslovnim objektima",
    teaser:
      "Kasetni i vrećasti filteri za HVAC komore, uz energetski efikasan rad sistema.",
    eyebrow: "HVAC komore · kasetni i vrećasti filteri",
    image: "/industrije/hotelijerstvo.webp",
    challenge:
      "Gosti i zaposleni procenjuju objekat i kroz vazduh koji udišu — mirise iz kuhinje, vlagu, prašinu. Istovremeno, HVAC sistemi predstavljaju jednu od najvećih stavki u računu za energiju.",
    solution:
      "Kombinujemo kasetne i vrećaste filtere niskog pada pritiska u klima komorama sa filtracijom aktivnim ugljem za kontrolu mirisa, čime snižavamo opterećenje ventilacionih sistema i produžavamo interval održavanja.",
    points: [
      "Niži pad pritiska = manja potrošnja energije HVAC sistema",
      "Kontrola mirisa u restoranima i zajedničkim prostorima",
      "Diskretna ugradnja bez uticaja na goste i zaposlene",
    ],
    filters: ["kasetni-filteri", "vrecasti-filteri", "filteri-mirisi-masnoce"],
  },
  {
    slug: "teska-industrija-i-energetika",
    name: "Teška industrija i energetika",
    short: "Teška industrija",
    shortAcc: "tešku industriju i energetiku",
    shortDat: "teškoj industriji i energetici",
    teaser:
      "Otpršivanje i predfiltracija za pogone sa visokim opterećenjem prašinom.",
    eyebrow: "Otpršivanje · predfiltracija",
    image: "/industrije/teska-industrija-i-energetika.webp",
    challenge:
      "Livnice, cementare, obrada metala i energetska postrojenja rade sa velikim količinama prašine i abrazivnih čestica. Bez ozbiljne predfiltracije, fini filteri se zapušavaju za nekoliko nedelja, ventilatori rade pod stalnim opterećenjem, a zastoji zbog održavanja se množe.",
    solution:
      "Filtraciju postavljamo u stepenima: perivi metalni i sintetički predfilteri hvataju grubu frakciju i produžavaju vek finih stepena, dok kasetni i vrećasti filteri drže vazduh u komorama i pogonskim prostorima u zadatoj klasi. Materijal biramo prema temperaturi, vlazi i abrazivnosti prašine u vašem procesu.",
    points: [
      "Predfiltracija koja višestruko produžava vek finih filtera",
      "Perivi i visokotemperaturni materijali za teške uslove rada",
      "Interval zamene planiran prema stvarnom opterećenju prašinom",
    ],
    filters: ["filter-materijali", "panelni-filteri", "vrecasti-filteri"],
  },
];

const en: Industry[] = [
  {
    slug: "farmaceutska-industrija",
    name: "Pharmaceutical industry and hospitals",
    short: "Pharma and hospitals",
    shortAcc: "pharmaceutical production and hospitals",
    shortDat: "pharmaceutical production and hospitals",
    teaser:
      "HEPA/ULPA filtration for cleanrooms, operating theatres and validated production processes.",
    eyebrow: "Cleanrooms · HEPA/ULPA",
    image: "/industrije/farmaceutska-industrija.webp",
    challenge:
      "Manufacturing medicines and sterile preparations — and hospital spaces such as operating theatres, isolation rooms and intensive care — demand documented, repeatable air cleanliness. Any deviation from the cleanliness class means a halted process, a lost batch or non-compliance with GMP regulation.",
    solution:
      "We design multi-stage filtration systems — from pre-filtration to terminal HEPA/ULPA filters — aligned with ISO 14644 cleanroom classes and the ISO 16890 standard, with full documentation for validation.",
    points: [
      "Validation and documentation for GMP inspections",
      "Terminal HEPA/ULPA filters in classes H13–H14",
      "Replacement programmes aligned with production cycles",
    ],
    filters: ["hepa-ulpa-filteri", "rigidni-v-filteri", "vrecasti-filteri"],
  },
  {
    slug: "auto-industrija",
    name: "Automotive industry and paint shops",
    short: "Automotive",
    shortAcc: "the automotive industry and paint shops",
    shortDat: "the automotive industry and paint shops",
    teaser:
      "Paint-stop and ceiling filters for paint shops, spray booths and production plants.",
    eyebrow: "Paint-stop · ceiling filters",
    image: "/industrije/auto-industrija.webp",
    challenge:
      "Paint quality depends directly on the air cleanliness inside the spray booth. Dust particles on the shop floor cause rejects, rework and production downtime.",
    solution:
      "We supply paint-stop floor filters and ceiling filters for spray booths, as well as panel and rigid filters for general ventilation of production halls, with a focus on a predictable replacement interval.",
    points: [
      "Fewer rejects thanks to stable air cleanliness in the booth",
      "Filters matched to the booth manufacturer's specification",
      "Regular replacement plans aligned with production lines",
    ],
    filters: ["filteri-za-lakirnice", "panelni-filteri", "rigidni-v-filteri"],
  },
  {
    slug: "hotelijerstvo",
    name: "Hospitality and commercial buildings",
    short: "Hospitality",
    shortAcc: "hospitality and commercial buildings",
    shortDat: "hospitality and commercial buildings",
    teaser:
      "Cassette and bag filters for HVAC plant, alongside energy-efficient operation.",
    eyebrow: "HVAC plant · cassette and bag filters",
    image: "/industrije/hotelijerstvo.webp",
    challenge:
      "Guests and staff judge a building by the air they breathe too — kitchen odours, humidity, dust. At the same time, HVAC systems are one of the largest items on the energy bill.",
    solution:
      "We combine low pressure drop cassette and bag filters in air handling units with activated carbon filtration for odour control, which lowers the load on ventilation systems and extends the maintenance interval.",
    points: [
      "Lower pressure drop = lower HVAC energy consumption",
      "Odour control in restaurants and shared spaces",
      "Discreet installation with no impact on guests or staff",
    ],
    filters: ["kasetni-filteri", "vrecasti-filteri", "filteri-mirisi-masnoce"],
  },
  {
    slug: "teska-industrija-i-energetika",
    name: "Heavy industry and energy",
    short: "Heavy industry",
    shortAcc: "heavy industry and energy",
    shortDat: "heavy industry and energy",
    teaser:
      "Dust extraction and pre-filtration for plants carrying a heavy dust load.",
    eyebrow: "Dust extraction · pre-filtration",
    image: "/industrije/teska-industrija-i-energetika.webp",
    challenge:
      "Foundries, cement plants, metalworking and power generation run with large volumes of dust and abrasive particles. Without serious pre-filtration, fine filters clog within weeks, fans run under constant load, and maintenance downtime multiplies.",
    solution:
      "We stage the filtration: washable metal and synthetic pre-filters catch the coarse fraction and extend the life of the fine stages, while cassette and bag filters hold the air in plant rooms and production areas at the required class. Media are chosen for the temperature, humidity and abrasiveness of the dust in your process.",
    points: [
      "Pre-filtration that multiplies the life of the fine filters",
      "Washable and high-temperature media for demanding conditions",
      "Replacement intervals planned around the real dust load",
    ],
    filters: ["filter-materijali", "panelni-filteri", "vrecasti-filteri"],
  },
];

const byLocale: Record<Locale, Industry[]> = { sr, en };

export function getIndustries(locale: Locale): Industry[] {
  return byLocale[locale];
}

export function getIndustry(locale: Locale, slug: string) {
  return byLocale[locale].find((industry) => industry.slug === slug);
}

/** Slugs are shared across locales — used by `generateStaticParams`. */
export const industrySlugs = sr.map((industry) => industry.slug);
