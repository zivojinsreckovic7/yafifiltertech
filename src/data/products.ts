export type ProductCategory = {
  slug: string;
  name: string;
  class: string;
  description: string;
  applications: string[];
  keywords: string[];
};

export const productCategories: ProductCategory[] = [
  {
    slug: "panelni-filteri",
    name: "Panelni filteri",
    class: "ISO ePM10 / Coarse",
    description:
      "Prvi stepen zaštite ventilacionih sistema. Zadržavaju krupnije čestice i produžavaju vek trajanja narednih filterskih stepeni.",
    applications: ["Predfiltracija", "Klima komore", "Opšta ventilacija"],
    keywords: ["panelni filter", "coarse filter", "predfilter"],
  },
  {
    slug: "kasetni-filteri",
    name: "Kasetni filteri",
    class: "ISO ePM1 / ePM2.5",
    description:
      "Kompaktna konstrukcija sa velikom filtracionom površinom i niskim padom pritiska — direktan uticaj na potrošnju energije.",
    applications: ["Poslovni objekti", "Hotelijerstvo", "Trgovinski centri"],
    keywords: ["kasetni filter", "cassette filter", "compact filter"],
  },
  {
    slug: "dzepasti-filteri",
    name: "Džepasti filteri",
    class: "ISO ePM1 / ePM2.5 / ePM10",
    description:
      "Multi-džepna konstrukcija za velike protoke vazduha uz dugotrajnu efikasnost, standard u industrijskim sistemima.",
    applications: ["Industrijski pogoni", "Aerodromi", "Bolnice"],
    keywords: ["dzepasti filter", "bag filter", "pocket filter"],
  },
  {
    slug: "kompaktni-filteri",
    name: "Kompaktni filteri",
    class: "ePM1 visoke efikasnosti",
    description:
      "Mini-plisirana medija visoke gustine za maksimalnu filtracionu površinu u ograničenom prostoru ugradnje.",
    applications: ["Čiste zone", "Farmaceutska industrija", "Elektronika"],
    keywords: ["kompaktni filter", "mini-pleat", "compact"],
  },
  {
    slug: "hepa-ulpa-filteri",
    name: "HEPA / ULPA filteri",
    class: "EN 1822, H13 – H14",
    description:
      "Krajnji stepen filtracije za validovane čiste prostore. Zadržavaju česticе submikronskih dimenzija sa visokom pouzdanošću.",
    applications: ["Čiste sobe", "Farmacija", "Medicinski gasovi"],
    keywords: ["hepa filter", "ulpa filter", "cleanroom filter"],
  },
  {
    slug: "filteri-aktivni-ugalj",
    name: "Filteri sa aktivnim ugljem",
    class: "Adsorpcija gasova i mirisa",
    description:
      "Uklanjaju gasovite polutante, isparenja i neprijatne mirise tamo gde mehanička filtracija nije dovoljna.",
    applications: ["Kuhinje i restorani", "Hemijska industrija", "Parking garaže"],
    keywords: ["ugalj filter", "carbon filter", "gas filter"],
  },
  {
    slug: "filteri-bojarske-kabine",
    name: "Filteri za bojarske kabine",
    class: "Podni i plafonski filteri",
    description:
      "Specijalizovana filtraciona rešenja za zadržavanje čestica boje u procesima lakiranja u auto-industriji.",
    applications: ["Lakirnice", "Auto-industrija", "Metalna industrija"],
    keywords: ["bojarski filter", "paint booth filter", "lakirnica"],
  },
];
