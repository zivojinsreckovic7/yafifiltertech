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
  /** Detail-page lead paragraph. Falls back to the category intro. */
  intro?: string;
  /** Short selling points listed under the lead. */
  highlights?: string[];
  /** Spec rows, rendered in the order given. */
  specs?: { label: string; value: string }[];
  /** Classification and certification chips. Falls back to the category's. */
  standards?: string[];
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
      },
      {
        slug: "sinteticka-vlakna-m5",
        name: "Filteri od sintetičkih vlakana – M5 – YAFI FM",
        label: "Sintetička vlakna · M5",
        image: "/yafiproducts/filter-materijali/Filter-od-sintetickih-vlakana-M5.webp",
      },
      {
        slug: "sinteticka-vlakna",
        name: "Filteri od sintetičkih vlakana – YAFI FM",
        label: "Sintetička vlakna",
        image: "/yafiproducts/filter-materijali/Filteri-od-sintetickih-vlakana.webp",
      },
      {
        slug: "staklena-vlakna",
        name: "Filteri od staklenih vlakana – YAFI FM",
        label: "Staklena vlakna",
        image: "/yafiproducts/filter-materijali/Filteri-od-staklenih-vlakana.webp",
      },
      {
        slug: "medija-za-lakirnice",
        name: "Filteri za lakirnice",
        label: "Paint stop",
        image: "/yafiproducts/filter-materijali/filteri-za-lakirnice.webp",
      },
      {
        slug: "periva-pena",
        name: "Periva pena za filtriranje – YAFI FM",
        label: "Periva pena",
        image: "/yafiproducts/filter-materijali/Periva-pena-za-filtriranje.webp",
      },
    ],
  },
  {
    slug: "panelni-filteri",
    name: "Panelni filteri – YAFI PF",
    nameAcc: "panelne filtere",
    class: "G2 – M5, poliester",
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
      },
      {
        slug: "predfilter-metalni-okvir-ravni",
        name: "Predfilter metalnog okvira i ravne površine – YAFI PF",
        label: "Metalni okvir · ravni",
        image: "/yafiproducts/panelni-filteri/predfilter-metalnog-okvira-i-ravne-povrsine.webp",
      },
      {
        slug: "predfilter-zicani-okvir",
        name: "Predfilter sa žičanim okvirom – YAFI PF",
        label: "Žičani okvir",
        image: "/yafiproducts/panelni-filteri/predfilter-sa-zicanim-okvirom.webp",
      },
      {
        slug: "ravni-perivi-predfilter-metalni-okvir",
        name: "Ravni i perivi predfilter sa metalnim okvirom – YAFI PF",
        label: "Metalni okvir · perivi",
        image: "/yafiproducts/panelni-filteri/ravni-i-perivi-predfilter-sa-metalnim-okvirom.webp",
      },
      {
        slug: "zicani-perivi-predfilter",
        name: "Žičani i perivi predfilter – YAFI PF",
        label: "Žičani okvir · perivi",
        image: "/yafiproducts/panelni-filteri/zicani-i-perivi-predfilter.webp",
      },
    ],
  },
  {
    slug: "kasetni-filteri",
    name: "Kasetni filteri",
    nameAcc: "kasetne filtere",
    title: "Kasetni filteri – YAFI KF",
    class: "G3 – F9, poliester i mini plit",
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
      },
      {
        slug: "kartonski-filter-jednokratni",
        name: "Kartonski filter za jednokratnu upotrebu – YAFI KF",
        label: "Kartonski okvir · YAFI KKF",
        image: "/yafiproducts/kasetni-filteri/kartonski-filter-za-jednokratnu-upotrebu.webp",
      },
      {
        slug: "perivi-predfilter-metalni-okvir",
        name: "Perivi predfilter sa metalnim okvirom – YAFI KF",
        label: "Metalni okvir · perivi",
        image: "/yafiproducts/kasetni-filteri/perivi-predfilteri-sa-metalnim-okvirom.webp",
      },
      {
        slug: "predfilter-kartonski-okvir",
        name: "Predfilter sa kartonskim okvirom – YAFI KF",
        label: "Kartonski okvir · YAFI KKF",
        image: "/yafiproducts/kasetni-filteri/predfilter-sa-kartonskim-okvirom.webp",
      },
      {
        slug: "predfilter-metalni-okvir",
        name: "Predfilter sa metalnim okvirom – YAFI KF",
        label: "Metalni okvir · YAFI KF",
        image: "/yafiproducts/kasetni-filteri/predfilter-sa-metalnim-okvirom.webp",
      },
    ],
  },
  {
    slug: "vrecasti-filteri",
    name: "Vrećasti filteri",
    nameAcc: "vrećaste filtere",
    title: "Vrećasti filteri – YAFI VF",
    class: "G3 – F9, poliester i polipropilen",
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
      },
      {
        slug: "vrecasti-filter-fina-prasina-m6",
        name: "Vrećasti filter za finu prašinu – metalni okvir M6 – YAFI VF",
        label: "Fina prašina · M6",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-za-finu-prasinu-metalni-okvir-M6.webp",
      },
      {
        slug: "vrecasti-filter-fina-prasina-f7",
        name: "Vrećasti filter za finu prašinu – metalni okvir F7 – YAFI VF",
        label: "Fina prašina · F7",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-za-finu-prasinu-metalni-okvir-F7.webp",
      },
      {
        slug: "vrecasti-filter-fina-prasina-f8",
        name: "Vrećasti filter za finu prašinu – metalni okvir F8 – YAFI VF",
        label: "Fina prašina · F8",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-za-finu-prasinu-metalni-okvir-F8.webp",
      },
      {
        slug: "vrecasti-filter-fina-prasina-f9",
        name: "Vrećasti filter za finu prašinu – metalni okvir F9 – YAFI VF",
        label: "Fina prašina · F9",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-za-finu-prasinu-metalni-okvir-F9.webp",
      },
      {
        slug: "vrecasti-filter-staklena-vlakna-m6-f9",
        name: "Vrećasti filter od staklenih vlakana od M6 do F9 – YAFI VF",
        label: "Staklena vlakna · M6 – F9",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-od-staklenih-vlakana-za-finu-prasinu.webp",
      },
    ],
  },
  {
    slug: "rigidni-v-filteri",
    name: "Rigidni V filteri – YAFI RF",
    nameAcc: "rigidne V filtere",
    class: "F6 – F9, staklena i celulozna vlakna",
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
      },
      {
        slug: "rigidni-panelni-aluminijumski-okvir",
        name: "Rigidni panelni filter – aluminijumski okvir – YAFI RF",
        label: "Panelni · aluminijum",
        image:
          "/yafiproducts/rigidni-v-filteri/Rigidni-Panelni-Filter-Metalni-Okvir-sa-zaglavljem.webp",
      },
      {
        slug: "rigidni-panelni-metalni-okvir-zaglavlje",
        name: "Rigidni panelni filter – metalni okvir sa zaglavljem – YAFI RF",
        label: "Panelni · metal, zaglavlje",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Panelni-Filter-Metalni-Okvir-sa-zaglavljem.webp",
      },
      {
        slug: "rigidni-panelni-plasticni-okvir",
        name: "Rigidni panelni filter – plastični okvir – YAFI RF",
        label: "Panelni · plastika",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Panelni-Filter-Plasticni-Okvir.webp",
      },
      {
        slug: "rigidni-panelni-plasticni-okvir-zaglavlje",
        name: "Rigidni panelni filter – plastični okvir sa zaglavljem – YAFI RF",
        label: "Panelni · plastika, zaglavlje",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Panelni-Filter-Plasticni-Okvir-sa-zaglavljem.webp",
      },
      {
        slug: "rigidni-vrecasti-metalni-okvir-4v",
        name: "Rigidni vrećasti filter – metalni okvir 4V",
        label: "Vrećasti 4V · metal",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Vrecasti-Filter-Metalni-Okvir-4V.webp",
      },
      {
        slug: "rigidni-vrecasti-plasticni-okvir-4v-energy",
        name: "Rigidni vrećasti filter – plastični okvir 4V | Energy",
        label: "Vrećasti 4V · Energy",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Vrecasti-Filter-Plasticni-Okvir-4V-Energy.webp",
      },
      {
        slug: "rigidni-vrecasti-plasticni-okvir-4v-max-flow",
        name: "Rigidni vrećasti filter – plastični okvir 4V | Max Flow",
        label: "Vrećasti 4V · Max Flow",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Vrecasti-Filter-Plasticni-Okvir-Max-Flow.webp",
      },
      {
        slug: "rigidni-vrecasti-plasticni-okvir-4v-standard",
        name: "Rigidni vrećasti filter – plastični okvir 4V | Standard",
        label: "Vrećasti 4V · Standard",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Vrecasti-Filter-Plasticni-Okvir-4V-Standard.webp",
      },
    ],
  },
  {
    slug: "hepa-ulpa-filteri",
    name: "Apsolutni filteri – HEPA",
    nameAcc: "apsolutne HEPA filtere",
    title: "Apsolutni filteri – HEPA – YAFI AF",
    class: "EN 1822, E10 – H14",
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
      },
      {
        slug: "filter-cvrste-vrece-aktivni-ugalj",
        name: "Filter sa čvrstim vrećama i aktivnim ugljem",
        label: "Aktivni ugalj · čvrste vreće",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/Filter-sa-cvrstim-vrecama.webp",
      },
      {
        slug: "filter-produzena-povrsina-aktivni-ugalj",
        name: "Filter sa produženom površinom od aktivnog uglja",
        label: "Aktivni ugalj · produžena površina",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/Filter-sa-produzenom-povrsinom-od-aktivnog-uglja.webp",
      },
      {
        slug: "filteri-za-masti-mrezni-okvir",
        name: "Filteri za masti sa mrežnim okvirom",
        label: "Mrežni okvir · masti",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/filteri-za-masti-sa-pletenim-mreznim-okvirom.webp",
      },
      {
        slug: "kertridzi-aktivni-ugalj",
        name: "Kertridži sa aktivnim ugljem",
        label: "Kertridž",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/Kertridzi-sa-aktivnim-ugljem.webp",
      },
      {
        slug: "kertridzi-aktivni-ugalj-model-b",
        name: "Kertridži sa aktivnim ugljem – model B",
        label: "Kertridž · model B",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/Kertridzi-sa-aktivnim-ugljem-B.webp",
      },
      {
        slug: "metalni-okvir-kuhinjske-nape",
        name: "Metalni okvir kuhinjske nape – YAFI PF",
        label: "Kuhinjska napa · YAFI PF",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/metalni-okvir-kuhinjske-nape.webp",
      },
    ],
  },
  {
    slug: "filteri-za-lakirnice",
    name: "Filteri za lakirnice",
    nameAcc: "filtere za lakirnice",
    class: "Podni, plafonski i paint-stop",
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
        slug: "sinteticka-vlakna-m5",
        name: "Filteri od sintetičkih vlakana – M5 – YAFI FM",
        label: "Sintetička vlakna · M5",
        image: "/yafiproducts/filteri-za-lakirnice/Filter-od-sintetickih-vlakana-M5.webp",
      },
      {
        slug: "staklena-vlakna",
        name: "Filteri od staklenih vlakana – YAFI FM",
        label: "Staklena vlakna",
        image: "/yafiproducts/filteri-za-lakirnice/Filteri-od-staklenih-vlakana.webp",
      },
      {
        slug: "medija-za-lakirnice",
        name: "Filteri za lakirnice",
        label: "Paint stop",
        image: "/yafiproducts/filteri-za-lakirnice/filteri-za-lakirnice.webp",
      },
    ],
  },
  {
    slug: "ramovi-za-filtere",
    name: "Ramovi za filtere",
    nameAcc: "ramove za filtere",
    class: "Nosivi i zatezni sistemi",
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
      },
      {
        slug: "sinteticka-vlakna-m5",
        name: "Synthetic fibre media – M5 – YAFI FM",
        label: "Synthetic fibre · M5",
        image: "/yafiproducts/filter-materijali/Filter-od-sintetickih-vlakana-M5.webp",
      },
      {
        slug: "sinteticka-vlakna",
        name: "Synthetic fibre media – YAFI FM",
        label: "Synthetic fibre",
        image: "/yafiproducts/filter-materijali/Filteri-od-sintetickih-vlakana.webp",
      },
      {
        slug: "staklena-vlakna",
        name: "Glass fibre media – YAFI FM",
        label: "Glass fibre",
        image: "/yafiproducts/filter-materijali/Filteri-od-staklenih-vlakana.webp",
      },
      {
        slug: "medija-za-lakirnice",
        name: "Paint shop media",
        label: "Paint stop",
        image: "/yafiproducts/filter-materijali/filteri-za-lakirnice.webp",
      },
      {
        slug: "periva-pena",
        name: "Washable filter foam – YAFI FM",
        label: "Washable foam",
        image: "/yafiproducts/filter-materijali/Periva-pena-za-filtriranje.webp",
      },
    ],
  },
  {
    slug: "panelni-filteri",
    name: "Panel filters – YAFI PF",
    nameAcc: "panel filters",
    class: "G2 – M5, polyester",
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
      },
      {
        slug: "predfilter-metalni-okvir-ravni",
        name: "Flat-surface pre-filter with metal frame – YAFI PF",
        label: "Metal frame · flat",
        image: "/yafiproducts/panelni-filteri/predfilter-metalnog-okvira-i-ravne-povrsine.webp",
      },
      {
        slug: "predfilter-zicani-okvir",
        name: "Pre-filter with wire frame – YAFI PF",
        label: "Wire frame",
        image: "/yafiproducts/panelni-filteri/predfilter-sa-zicanim-okvirom.webp",
      },
      {
        slug: "ravni-perivi-predfilter-metalni-okvir",
        name: "Flat washable pre-filter with metal frame – YAFI PF",
        label: "Metal frame · washable",
        image: "/yafiproducts/panelni-filteri/ravni-i-perivi-predfilter-sa-metalnim-okvirom.webp",
      },
      {
        slug: "zicani-perivi-predfilter",
        name: "Washable wire-frame pre-filter – YAFI PF",
        label: "Wire frame · washable",
        image: "/yafiproducts/panelni-filteri/zicani-i-perivi-predfilter.webp",
      },
    ],
  },
  {
    slug: "kasetni-filteri",
    name: "Cassette filters",
    nameAcc: "cassette filters",
    title: "Cassette filters – YAFI KF",
    class: "G3 – F9, polyester and mini-pleat",
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
      },
      {
        slug: "kartonski-filter-jednokratni",
        name: "Disposable cardboard-frame filter – YAFI KF",
        label: "Cardboard frame · YAFI KKF",
        image: "/yafiproducts/kasetni-filteri/kartonski-filter-za-jednokratnu-upotrebu.webp",
      },
      {
        slug: "perivi-predfilter-metalni-okvir",
        name: "Washable pre-filter with metal frame – YAFI KF",
        label: "Metal frame · washable",
        image: "/yafiproducts/kasetni-filteri/perivi-predfilteri-sa-metalnim-okvirom.webp",
      },
      {
        slug: "predfilter-kartonski-okvir",
        name: "Pre-filter with cardboard frame – YAFI KF",
        label: "Cardboard frame · YAFI KKF",
        image: "/yafiproducts/kasetni-filteri/predfilter-sa-kartonskim-okvirom.webp",
      },
      {
        slug: "predfilter-metalni-okvir",
        name: "Pre-filter with metal frame – YAFI KF",
        label: "Metal frame · YAFI KF",
        image: "/yafiproducts/kasetni-filteri/predfilter-sa-metalnim-okvirom.webp",
      },
    ],
  },
  {
    slug: "vrecasti-filteri",
    name: "Bag filters",
    nameAcc: "bag filters",
    title: "Bag filters – YAFI VF",
    class: "G3 – F9, polyester and polypropylene",
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
      },
      {
        slug: "vrecasti-filter-fina-prasina-m6",
        name: "Fine-dust bag filter – metal frame M6 – YAFI VF",
        label: "Fine dust · M6",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-za-finu-prasinu-metalni-okvir-M6.webp",
      },
      {
        slug: "vrecasti-filter-fina-prasina-f7",
        name: "Fine-dust bag filter – metal frame F7 – YAFI VF",
        label: "Fine dust · F7",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-za-finu-prasinu-metalni-okvir-F7.webp",
      },
      {
        slug: "vrecasti-filter-fina-prasina-f8",
        name: "Fine-dust bag filter – metal frame F8 – YAFI VF",
        label: "Fine dust · F8",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-za-finu-prasinu-metalni-okvir-F8.webp",
      },
      {
        slug: "vrecasti-filter-fina-prasina-f9",
        name: "Fine-dust bag filter – metal frame F9 – YAFI VF",
        label: "Fine dust · F9",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-za-finu-prasinu-metalni-okvir-F9.webp",
      },
      {
        slug: "vrecasti-filter-staklena-vlakna-m6-f9",
        name: "Glass fibre bag filter, M6 to F9 – YAFI VF",
        label: "Glass fibre · M6 – F9",
        image: "/yafiproducts/vrecasti-filteri/Vrecasti-filter-od-staklenih-vlakana-za-finu-prasinu.webp",
      },
    ],
  },
  {
    slug: "rigidni-v-filteri",
    name: "Rigid V-cell filters – YAFI RF",
    nameAcc: "rigid V-cell filters",
    class: "F6 – F9, glass and cellulose fibre",
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
      },
      {
        slug: "rigidni-panelni-aluminijumski-okvir",
        name: "Rigid panel filter – aluminium frame – YAFI RF",
        label: "Panel · aluminium",
        image:
          "/yafiproducts/rigidni-v-filteri/Rigidni-Panelni-Filter-Metalni-Okvir-sa-zaglavljem.webp",
      },
      {
        slug: "rigidni-panelni-metalni-okvir-zaglavlje",
        name: "Rigid panel filter – metal frame with header – YAFI RF",
        label: "Panel · metal, header",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Panelni-Filter-Metalni-Okvir-sa-zaglavljem.webp",
      },
      {
        slug: "rigidni-panelni-plasticni-okvir",
        name: "Rigid panel filter – plastic frame – YAFI RF",
        label: "Panel · plastic",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Panelni-Filter-Plasticni-Okvir.webp",
      },
      {
        slug: "rigidni-panelni-plasticni-okvir-zaglavlje",
        name: "Rigid panel filter – plastic frame with header – YAFI RF",
        label: "Panel · plastic, header",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Panelni-Filter-Plasticni-Okvir-sa-zaglavljem.webp",
      },
      {
        slug: "rigidni-vrecasti-metalni-okvir-4v",
        name: "Rigid bag filter – metal frame 4V",
        label: "Bag 4V · metal",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Vrecasti-Filter-Metalni-Okvir-4V.webp",
      },
      {
        slug: "rigidni-vrecasti-plasticni-okvir-4v-energy",
        name: "Rigid bag filter – plastic frame 4V | Energy",
        label: "Bag 4V · Energy",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Vrecasti-Filter-Plasticni-Okvir-4V-Energy.webp",
      },
      {
        slug: "rigidni-vrecasti-plasticni-okvir-4v-max-flow",
        name: "Rigid bag filter – plastic frame 4V | Max Flow",
        label: "Bag 4V · Max Flow",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Vrecasti-Filter-Plasticni-Okvir-Max-Flow.webp",
      },
      {
        slug: "rigidni-vrecasti-plasticni-okvir-4v-standard",
        name: "Rigid bag filter – plastic frame 4V | Standard",
        label: "Bag 4V · Standard",
        image: "/yafiproducts/rigidni-v-filteri/Rigidni-Vrecasti-Filter-Plasticni-Okvir-4V-Standard.webp",
      },
    ],
  },
  {
    slug: "hepa-ulpa-filteri",
    name: "Absolute filters – HEPA",
    nameAcc: "absolute HEPA filters",
    title: "Absolute filters – HEPA – YAFI AF",
    class: "EN 1822, E10 – H14",
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
      },
      {
        slug: "filter-cvrste-vrece-aktivni-ugalj",
        name: "Filter with rigid bags and activated carbon",
        label: "Activated carbon · rigid bags",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/Filter-sa-cvrstim-vrecama.webp",
      },
      {
        slug: "filter-produzena-povrsina-aktivni-ugalj",
        name: "Extended-surface activated carbon filter",
        label: "Activated carbon · extended surface",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/Filter-sa-produzenom-povrsinom-od-aktivnog-uglja.webp",
      },
      {
        slug: "filteri-za-masti-mrezni-okvir",
        name: "Grease filters with mesh frame",
        label: "Mesh frame · grease",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/filteri-za-masti-sa-pletenim-mreznim-okvirom.webp",
      },
      {
        slug: "kertridzi-aktivni-ugalj",
        name: "Activated carbon cartridges",
        label: "Cartridge",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/Kertridzi-sa-aktivnim-ugljem.webp",
      },
      {
        slug: "kertridzi-aktivni-ugalj-model-b",
        name: "Activated carbon cartridges – model B",
        label: "Cartridge · model B",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/Kertridzi-sa-aktivnim-ugljem-B.webp",
      },
      {
        slug: "metalni-okvir-kuhinjske-nape",
        name: "Metal frame for kitchen hoods – YAFI PF",
        label: "Kitchen hood · YAFI PF",
        image: "/yafiproducts/filteri-za-uklanjanje-mirisa-i-masnoce/metalni-okvir-kuhinjske-nape.webp",
      },
    ],
  },
  {
    slug: "filteri-za-lakirnice",
    name: "Paint shop filters",
    nameAcc: "paint shop filters",
    class: "Floor, ceiling and paint-stop",
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
        slug: "sinteticka-vlakna-m5",
        name: "Synthetic fibre media – M5 – YAFI FM",
        label: "Synthetic fibre · M5",
        image: "/yafiproducts/filteri-za-lakirnice/Filter-od-sintetickih-vlakana-M5.webp",
      },
      {
        slug: "staklena-vlakna",
        name: "Glass fibre media – YAFI FM",
        label: "Glass fibre",
        image: "/yafiproducts/filteri-za-lakirnice/Filteri-od-staklenih-vlakana.webp",
      },
      {
        slug: "medija-za-lakirnice",
        name: "Paint shop media",
        label: "Paint stop",
        image: "/yafiproducts/filteri-za-lakirnice/filteri-za-lakirnice.webp",
      },
    ],
  },
  {
    slug: "ramovi-za-filtere",
    name: "Filter frames",
    nameAcc: "filter frames",
    class: "Holding and clamping systems",
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

/** Other variants in the same category, for the detail page's siblings row. */
export function getSiblingItems(
  locale: Locale,
  categorySlug: string,
  itemSlug: string
): ProductItem[] {
  const category = getProduct(locale, categorySlug);
  return (category?.items ?? []).filter((item) => item.slug !== itemSlug);
}
