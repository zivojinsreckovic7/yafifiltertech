import type { Locale } from "@/i18n/config";

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
  eyebrow: string;
  challenge: string;
  solution: string;
  points: string[];
  filters: string[];
};

const sr: Industry[] = [
  {
    slug: "farmaceutska-industrija",
    name: "Farmaceutska industrija",
    short: "Farmacija",
    shortAcc: "farmaciju",
    shortDat: "farmaciji",
    teaser:
      "HEPA/ULPA filtracija za čiste sobe i validovane proizvodne procese.",
    eyebrow: "GMP / ISO 14644",
    challenge:
      "Proizvodnja lekova i sterilnih preparata zahteva dokumentovanu, ponovljivu čistoću vazduha. Svako odstupanje od klase čistoće znači zaustavljen proces, gubitak šarže ili neusklađenost sa GMP regulativom.",
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
    slug: "hotelijerstvo",
    name: "Hotelijerstvo",
    short: "Hotelijerstvo",
    shortAcc: "hotelijerstvo",
    shortDat: "hotelijerstvu",
    teaser:
      "Kvalitet vazduha za goste uz energetski efikasan rad HVAC sistema.",
    eyebrow: "Komfor i energetska efikasnost",
    challenge:
      "Gosti procenjuju kvalitet objekta i kroz vazduh koji udišu — mirise iz kuhinje, vlagu, prašinu. Istovremeno, HVAC sistemi predstavljaju jednu od najvećih stavki u računu za energiju.",
    solution:
      "Kombinujemo kasetne i džepaste filtere niskog pada pritiska sa filtracijom aktivnim ugljem za kontrolu mirisa, čime snižavamo opterećenje ventilacionih sistema i produžavamo interval održavanja.",
    points: [
      "Niži pad pritiska = manja potrošnja energije HVAC sistema",
      "Kontrola mirisa u restoranima i zajedničkim prostorima",
      "Diskretna ugradnja bez uticaja na goste",
    ],
    filters: ["kasetni-filteri", "filteri-mirisi-masnoce", "panelni-filteri"],
  },
  {
    slug: "auto-industrija",
    name: "Auto-industrija",
    short: "Auto-industrija",
    shortAcc: "auto-industriju",
    shortDat: "auto-industriji",
    teaser: "Filtracija za lakirnice, bojarske kabine i proizvodne pogone.",
    eyebrow: "Procesi lakiranja i montaže",
    challenge:
      "Kvalitet farbe direktno zavisi od čistoće vazduha u kabini za lakiranje. Čestice prašine u pogonu uzrokuju škart, dodatnu doradu i zastoje u proizvodnji.",
    solution:
      "Isporučujemo podne i plafonske filtere za bojarske kabine, kao i panelne i kompaktne filtere za opštu ventilaciju proizvodnih hala, sa fokusom na predvidljiv interval zamene.",
    points: [
      "Manje škarta zahvaljujući stabilnoj čistoći vazduha u kabini",
      "Filteri prilagođeni specifikaciji proizvođača kabine",
      "Planovi redovne zamene usklađeni sa proizvodnim linijama",
    ],
    filters: [
      "filteri-za-lakirnice",
      "panelni-filteri",
      "rigidni-v-filteri",
    ],
  },
  {
    slug: "aerodromi",
    name: "Aerodromi",
    short: "Aerodromi",
    shortAcc: "aerodrome",
    shortDat: "aerodromima",
    teaser:
      "Sistemi visokog kapaciteta za neprekidan rad i velike protoke vazduha.",
    eyebrow: "Kontinuiran rad, veliki protoci",
    challenge:
      "Terminali rade 24/7 sa velikim brojem putnika i velikim protocima vazduha. Sistemi filtracije moraju da izdrže kontinuirano opterećenje bez kompromisa u kvalitetu vazduha.",
    solution:
      "Preporučujemo robusne džepaste i kasetne sisteme visokog kapaciteta sa dugim vekom trajanja, projektovane da smanje frekvenciju servisa i operativni trošak na velikim objektima.",
    points: [
      "Visok kapacitet protoka uz stabilnu efikasnost",
      "Duži interval zamene = manje zastoja u održavanju",
      "Rešenja skalabilna za velike centralne sisteme",
    ],
    filters: ["vrecasti-filteri", "kasetni-filteri", "panelni-filteri"],
  },
];

const en: Industry[] = [
  {
    slug: "farmaceutska-industrija",
    name: "Pharmaceutical industry",
    short: "Pharmaceuticals",
    shortAcc: "pharmaceutical production",
    shortDat: "pharmaceutical production",
    teaser:
      "HEPA/ULPA filtration for cleanrooms and validated production processes.",
    eyebrow: "GMP / ISO 14644",
    challenge:
      "Manufacturing medicines and sterile preparations demands documented, repeatable air cleanliness. Any deviation from the cleanliness class means a halted process, a lost batch or non-compliance with GMP regulation.",
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
    slug: "hotelijerstvo",
    name: "Hospitality",
    short: "Hospitality",
    shortAcc: "hospitality",
    shortDat: "hospitality",
    teaser:
      "Air quality for guests alongside energy-efficient HVAC operation.",
    eyebrow: "Comfort and energy efficiency",
    challenge:
      "Guests judge a property by the air they breathe too — kitchen odours, humidity, dust. At the same time, HVAC systems are one of the largest items on the energy bill.",
    solution:
      "We combine low pressure drop cassette and bag filters with activated carbon filtration for odour control, which lowers the load on ventilation systems and extends the maintenance interval.",
    points: [
      "Lower pressure drop = lower HVAC energy consumption",
      "Odour control in restaurants and shared spaces",
      "Discreet installation with no impact on guests",
    ],
    filters: ["kasetni-filteri", "filteri-mirisi-masnoce", "panelni-filteri"],
  },
  {
    slug: "auto-industrija",
    name: "Automotive industry",
    short: "Automotive",
    shortAcc: "the automotive industry",
    shortDat: "the automotive industry",
    teaser: "Filtration for paint shops, spray booths and production plants.",
    eyebrow: "Coating and assembly processes",
    challenge:
      "Paint quality depends directly on the air cleanliness inside the spray booth. Dust particles on the shop floor cause rejects, rework and production downtime.",
    solution:
      "We supply floor and ceiling filters for spray booths, as well as panel and compact filters for general ventilation of production halls, with a focus on a predictable replacement interval.",
    points: [
      "Fewer rejects thanks to stable air cleanliness in the booth",
      "Filters matched to the booth manufacturer's specification",
      "Regular replacement plans aligned with production lines",
    ],
    filters: [
      "filteri-za-lakirnice",
      "panelni-filteri",
      "rigidni-v-filteri",
    ],
  },
  {
    slug: "aerodromi",
    name: "Airports",
    short: "Airports",
    shortAcc: "airports",
    shortDat: "airports",
    teaser:
      "High-capacity systems for continuous operation and large air flows.",
    eyebrow: "Continuous operation, large air flows",
    challenge:
      "Terminals run 24/7 with high passenger numbers and large air flows. Filtration systems have to withstand continuous load without compromising air quality.",
    solution:
      "We recommend robust high-capacity bag and cassette systems with a long service life, designed to reduce service frequency and operating cost on large facilities.",
    points: [
      "High flow capacity with stable efficiency",
      "Longer replacement intervals = less maintenance downtime",
      "Solutions that scale to large central systems",
    ],
    filters: ["vrecasti-filteri", "kasetni-filteri", "panelni-filteri"],
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
