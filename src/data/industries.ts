export type Industry = {
  slug: string;
  name: string;
  short: string;
  /** Accusative after "za" (za farmaciju) and dative (prilagođen farmaciji). */
  shortAcc: string;
  shortDat: string;
  teaser: string;
  eyebrow: string;
  challenge: string;
  solution: string;
  points: string[];
  filters: string[];
};

export const industries: Industry[] = [
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
    filters: ["hepa-ulpa-filteri", "kompaktni-filteri", "dzepasti-filteri"],
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
    filters: ["kasetni-filteri", "filteri-aktivni-ugalj", "panelni-filteri"],
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
      "filteri-bojarske-kabine",
      "panelni-filteri",
      "kompaktni-filteri",
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
    filters: ["dzepasti-filteri", "kasetni-filteri", "panelni-filteri"],
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
