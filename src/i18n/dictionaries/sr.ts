/**
 * Serbian copy — the source of truth for the site's content and for the
 * `Dictionary` shape every other locale has to satisfy.
 */
export const sr = {
  meta: {
    siteTitle: "Yafi Filtertech | Industrijska filtracija vazduha",
    titleTemplate: "%s | Yafi Filtertech",
    description:
      "Yafi Filtertech projektuje i isporučuje industrijske sisteme filtracije vazduha za Ex-Yu tržište — HEPA, kasetni i vrećasti filteri, usklađeni sa ISO 16890. Regionalni distributer Deltrian programa.",
    keywords: [
      "industrijski filteri",
      "hepa filteri",
      "kasetni filteri za ventilaciju",
      "dzepasti filteri",
      "filtracija vazduha",
      "Deltrian",
      "ISO 16890",
    ],
    ogLocale: "sr_RS",
    ogDescription:
      "Regionalni distributer Deltrian programa filtera za Ex-Yu tržište. Rešenja za farmaciju i bolnice, auto-industriju, hotelijerstvo i tešku industriju.",
    jsonLdDescription:
      "Industrijska filtracija vazduha i regionalni distributer Deltrian programa filtera za Ex-Yu tržište.",
    areaServed: [
      "Srbija",
      "Bosna i Hercegovina",
      "Hrvatska",
      "Crna Gora",
      "Severna Makedonija",
    ],
    products: {
      title: "Program filtera",
      description:
        "Kompletan program industrijskih filtera — filter materijali, panelni, kasetni i vrećasti filteri, rigidni V filteri, apsolutni HEPA filteri, filteri za mirise i lakirnice, i ramovi. Usklađeno sa ISO 16890 i EN 1822.",
    },
    industries: {
      title: "Industrije",
      description:
        "Namenska rešenja filtracije vazduha za farmaceutsku industriju i bolnice, auto-industriju i lakirnice, hotelijerstvo i poslovne objekte, tešku industriju i energetiku.",
    },
    contact: {
      title: "Kontakt",
      description:
        "Zatražite ponudu za industrijsku filtraciju vazduha. Recite nam više o objektu i sistemu ventilacije — vraćamo se sa predlogom rešenja.",
    },
    deltrian: {
      title: "Deltrian program filtera",
      description:
        "Yafi Filtertech je regionalni distributer Deltrian programa filtera za Ex-Yu tržište — kompletna paleta industrijske filtracije vazduha.",
    },
    about: {
      title: "O nama",
      description:
        "Beogradski proizvođač filtera za vazduh po meri i regionalni distributer Deltrian programa. Kako radimo, gde nas srećete i šta kažu klijenti.",
    },
    catalogues: {
      title: "Katalozi",
      description:
        "Preuzmite Deltrian katalog „Filtration, solutions and products 2026“ i tehničku dokumentaciju programa filtera Yafi Filtertech.",
    },
  },

  nav: {
    home: "Naslovna",
    products: "Proizvodi",
    productCategories: "Kategorije filtera",
    allProducts: "Ceo program filtera →",
    catalogues: "Katalozi",
    industries: "Industrije",
    about: "O nama",
    deltrian: "Deltrian program",
    contact: "Kontakt",
    quote: "Zatražite ponudu",
    openMenu: "Otvori meni",
    closeMenu: "Zatvori meni",
    language: "Jezik",
    selectLanguage: "Izaberite jezik",
  },

  theme: {
    toDark: "Tamni režim",
    toLight: "Svetli režim",
  },

  loader: {
    aria: "Učitavanje sajta",
    label: "Učitavanje",
  },

  search: {
    placeholder: "Pretražite filtere (HEPA, kasetni, vrećasti...)",
    submit: "Pretraži",
  },

  /** Serbian uses low-high quotation marks. */
  quoteMarks: { open: "„", close: "“" },

  trustSignals: {
    rating: (score: string, outOf: string) =>
      `${score}/${outOf} prosečna ocena saradnje`,
    response: "Odgovor u roku od 24h",
    projects: "1.200+ realizovanih projekata",
  },

  contactRows: {
    address: "Adresa",
    email: "Email",
    phone: "Telefon",
    hours: "Radno vreme",
    hoursValue: "Pon–Pet, 08–16h",
    region: "Region",
    regionValue: "Srbija · Ex-Yu tržište",
  },

  hero: {
    eyebrow: "Regionalni distributer — Deltrian program",
    heading: "Svako ima pravo na čist vazduh.",
    imageAlt:
      "Žena zatvorenih očiju udiše čist vazduh pored otvorenog prozora, u majici sa logotipom Yafi Filtertech.",
    lead: "Spajamo sopstvenu proizvodnju filtera po meri i ponudu sertifikovanih Deltrian sistema. Kompletan spektar filtracije vazduha za komore u farmaciji, auto-industriji i teškoj industriji širom Ex-Yu regiona.",
    ctaPrimary: "Zatražite ponudu",
    ctaSecondary: "Istražite Deltrian program",
    scroll: "Skrolujte",
    stats: {
      experience: "godina iskustva",
      projects: "realizovanih projekata",
      standard: "standard kvaliteta vazduha",
      markets: "tržišta u Ex-Yu regionu",
    },
  },

  trustBand: [
    "ISO 16890",
    "EN 1822 · H13–H14",
    "GMP / ISO 14644",
    "Deltrian Partner Program",
    "Farmaceutska industrija",
    "Auto-industrija i lakirnice",
    "Hotelijerstvo",
    "Teška industrija i energetika",
  ],

  pillars: {
    eyebrow: "O nama",
    heading:
      "Inženjerska preciznost i više od 25 godina iskustva u filtraciji vazduha.",
    lead: "Sa više od dve i po decenije prisustva na tržištu, Yafi Filtertech je razvio proizvodne i distributivne kapacitete koji odgovaraju najstrožim evropskim standardima čistog vazduha. Kao domaći proizvođač i regionalni distributer Deltrian programa filtera za Ex-Yu tržište, pružamo kompletna rešenja za filtraciju — uz Eurovent sertifikat i energetsku efikasnost Deltrian filtera — i tako zaokružujemo sistem vazduha na jednom mestu.",
    leadSecondary:
      "Radimo sa proizvodnim pogonima, zdravstvenim ustanovama, hotelima i infrastrukturnim objektima kojima je čist vazduh deo poslovnog standarda — a ne dodatna stavka u budžetu.",
    itemsIntro: "Naš pristup se zasniva na tri ključne vrednosti.",
    items: [
      {
        title: "Sopstvena proizvodnja i kvalitetna rešenja",
        desc: "Izrađujemo predfiltere i fine filtere (klase G2 do F9 / ISO 16890) u standardnim i nestandardnim dimenzijama — potpuno prilagođene dimenzijama i zahtevima vaših HVAC sistema.",
      },
      {
        title: "Globalni kvalitet uz lokalnu podršku",
        desc: "Kroz partnerstvo sa američko-belgijskom kompanijom Deltrian donosimo na lokalno tržište vrhunsku evropsku tehnologiju filtracije za HVAC sisteme — EUROVENT sertifikat i energetsku efikasnost sa velikom uštedom energije, uz brzu isporuku, stabilne rokove i direktnu fabričku i tehničku podršku.",
      },
      {
        title: "Stručna optimizacija sistema",
        desc: "Ne postoje „univerzalni filteri“. Za svaki objekat procenjujemo protok vazduha i pad pritiska kako bismo pronašli idealan balans između maksimalne efikasnosti filtracije i minimalne potrošnje energije. Zato je pre dve godine i pokrenuta saradnja sa kompanijom Deltrian, koja je omogućila najviši nivo filtracije.",
      },
    ],
  },

  productsSection: {
    eyebrow: "Program filtera",
    heading: "Filteri za svaki stepen zaštite vazduha.",
    viewAll: "Pogledajte ceo program",
  },

  productCard: {
    cta: "Pogledaj specifikacije",
  },

  deltrianBanner: {
    eyebrow: "Ekskluzivno partnerstvo",
    heading: "Deltrian program filtera — za ceo Ex-Yu region.",
    lead: "Yafi Filtertech je regionalni distributer Deltrian programa filtera. Kompletna paleta industrijske filtracije, razvijena u skladu sa evropskim standardima kvaliteta vazduha, dostupna direktno kroz naš tim.",
    bullets: [
      "Regionalni distributer",
      "Kompletan program filtera",
      "Tehnička podrška na terenu",
    ],
    cta: "Otvorite Deltrian program →",
  },

  regionSection: {
    eyebrow: "Ex-Yu region",
    heading: "Jedan partner za ceo region.",
    lead: "Iz Beograda snabdevamo i tehnički pratimo klijente u šest država Ex-Yu regiona — sopstvenom proizvodnjom filtera po meri i Deltrian programom.",
    hub: "Sedište — Beograd",
    mapLabel:
      "Mapa Ex-Yu regiona sa označenim tržištima: Srbija, Crna Gora, Bosna i Hercegovina, Slovenija, Hrvatska i Severna Makedonija.",
    countries: {
      rs: "Srbija",
      me: "Crna Gora",
      ba: "Bosna i Hercegovina",
      si: "Slovenija",
      hr: "Hrvatska",
      mk: "Severna Makedonija",
    },
  },

  industriesSection: {
    eyebrow: "Rešenja po industrijama",
    heading: "Namenska rešenja za niše kojima čist vazduh nije opcija.",
    facilitiesIntro: "Tipovi objekata koje opremamo",
  },

  industryCard: {
    cta: "Rešenje za ovu industriju",
  },

  process: {
    eyebrow: "Proces saradnje",
    heading: "Od upita do dugoročnog partnerstva",
    steps: [
      {
        title: "Upit i analiza",
        desc: "Analiziramo postojeći sistem ventilacije, protok vazduha i zahteve procesa pre predloga rešenja.",
      },
      {
        title: "Predlog i ponuda",
        desc: "Predlažemo tip i klasu filtera usklađenu sa ISO 16890 standardom, energetskom efikasnošću i budžetom.",
      },
      {
        title: "Isporuka i ugradnja",
        desc: "Isporučujemo filtere iz Deltrian programa uz tehničku podršku prilikom ugradnje na objektu.",
      },
      {
        title: "Redovno održavanje",
        desc: "Pratimo interval zamene filtera i predlažemo plan servisa koji obezbeđuje neprekidan rad sistema.",
      },
    ],
  },

  testimonialsSection: {
    eyebrow: "Šta kažu klijenti",
    /** Rendered as two lines: the second one drops to the muted ink. */
    heading: "Poverenje se gradi isporukom,",
    headingMuted: "ne obećanjima.",
    lead: "Proizvodni pogoni, bolnice, hotelske grupe i lakirnice širom Ex-Yu regiona drže svoje sisteme na našim filterima.",
    ratingLabel: "prosečna ocena saradnje",
    previous: "Prethodna izjava",
    next: "Sledeća izjava",
    goTo: (n: string) => `Prikaži izjavu ${n}`,
  },

  locationMap: {
    eyebrow: "Gde se nalazimo",
    heading: "Peščarska 10, Novi Beograd",
    directions: "Otvorite u mapama →",
    frameTitle: "Mapa lokacije Yafi Filtertech",
  },

  ctaSection: {
    eyebrow: "Zatražite ponudu",
    heading: "Spremni da unapredite kvalitet vazduha?",
    lead: "Pošaljite nam osnovne podatke o objektu i tipu ventilacionog sistema — vraćamo se sa predlogom rešenja i ponudom usklađenom sa vašim procesom.",
  },

  ctaBanner: {
    action: "Zatražite ponudu →",
  },

  quoteForm: {
    sentTitle: "Upit je poslat",
    sentText:
      "Hvala na interesovanju. Naš tim će vam odgovoriti sa predlogom rešenja u najkraćem roku.",
    name: "Ime i prezime",
    company: "Kompanija",
    email: "Email",
    phone: "Telefon",
    filterType: "Tip filtera",
    selectCategory: "Izaberite kategoriju",
    deltrianOption: "Deltrian program",
    otherOption: "Nisam siguran / drugo",
    message: "Poruka",
    messagePlaceholder:
      "Opišite objekat, protok vazduha ili trenutni sistem ventilacije...",
    sending: "Slanje...",
    submit: "Pošaljite upit",
    note: "Odgovaramo u roku od 24 časa radnim danima. Slanjem upita saglasni ste da vas kontaktiramo radi pripreme ponude.",
  },

  footer: {
    description:
      "Projektujemo i isporučujemo industrijske sisteme filtracije vazduha za Ex-Yu tržište. Regionalni distributer Deltrian programa filtera.",
    navHeading: "Navigacija",
    industriesHeading: "Industrije",
    contactHeading: "Kontakt",
    regionValue: "Srbija · Ex-Yu region",
    rights: (year: number) => `© ${year} Yafi Filtertech. Sva prava zadržana.`,
    tagline: "Industrijska filtracija vazduha · ISO 16890",
  },

  productsPage: {
    eyebrow: "Program filtera",
    heading: "Filteri za svaki stepen industrijske filtracije vazduha.",
    lead: "Od predfiltracije do HEPA/ULPA klase — kompletan program usklađen sa ISO 16890 i EN 1822 standardima, iz Deltrian programa i regionalnih proizvodnih partnera.",
    resultsFor: (query: string) => `Rezultati pretrage za "${query}"`,
    noResults: (query: string) => `Nema rezultata za "${query}"`,
    showAll: "Prikaži ceo program →",
    ctaTitle: "Niste sigurni koja klasa filtera odgovara vašem sistemu?",
    ctaText:
      "Pošaljite nam protoke i tip ventilacionog sistema — predlažemo klasu i tip filtera bez obaveze, u roku od 24 časa.",
    ctaAction: "Zatražite besplatnu preporuku →",
  },

  productPage: {
    back: "← Ceo program filtera",
    standardsEyebrow: "Standardi i sertifikati",
    rangeEyebrow: "U programu",
    rangeHeading: "Dostupne varijante",
    rangeLead:
      "Svaka varijanta je dostupna u standardnim i namenskim dimenzijama — dimenzije i klasu filtracije usklađujemo sa vašim sistemom.",
    groupsLabel: "Grupe proizvoda",
    applicationsEyebrow: "Primena",
    applicationsHeading: "Gde se najčešće koristi",
    relatedEyebrow: "Ostale kategorije",
    relatedHeading: "Pogledajte i ostatak programa",
    ctaTitle: (category: string) => `Zatražite ponudu za ${category}`,
    ctaText:
      "Pošaljite nam dimenzije, klasu filtracije i količine — pripremamo ponudu u roku od 24 časa.",
  },

  productItemPage: {
    breadcrumbHome: "Početna",
    back: (category: string) => `← ${category}`,
    highlightsEyebrow: "Karakteristike",
    specsEyebrow: "Posebne osobine",
    standardsEyebrow: "Standardi i sertifikati",
    skuLabel: "Šifra proizvoda",
    categoryLabel: "Kategorija",
    categoriesLabel: "Kategorije",
    descriptionEyebrow: "Opis proizvoda",
    quote: "Zatražite ponudu",
    siblingsEyebrow: "Iz iste kategorije",
    siblingsHeading: "Ostale varijante",
    ctaTitle: (product: string) => `Zatražite ponudu za: ${product}`,
    ctaText:
      "Pošaljite nam dimenzije, klasu filtracije i količine — pripremamo ponudu u roku od 24 časa.",
  },

  industriesPage: {
    eyebrow: "Industrije",
    heading: "Rešenja namenjena specifičnim zahtevima svake industrije.",
    lead: "Svaka industrija ima drugačiji standard čistoće vazduha, protoke i budžetska ograničenja. Predlažemo rešenja polazeći od procesa, ne od kataloga.",
    ctaTitle: "Vaša industrija nije na listi?",
    ctaText:
      "Radimo i van navedenih niša — pošaljite nam zahteve procesa i standard čistoće koji morate da ispunite, a mi predlažemo rešenje.",
  },

  industryPage: {
    back: "← Sve industrije",
    challenge: "Izazov",
    solution: "Rešenje",
    filtersEyebrow: "Preporučeni filteri",
    filtersHeading: (industry: string) => `Rešenja koja koristimo za ${industry}`,
    ctaTitle: (industry: string) => `Zatražite ponudu za ${industry}`,
    ctaText: (industry: string) =>
      `Recite nam više o objektu i procesu — pripremamo predlog rešenja prilagođen ${industry}, u roku od 24 časa.`,
  },

  cataloguesPage: {
    eyebrow: "Katalozi",
    heading: "Katalozi i tehnička dokumentacija.",
    lead: "Na jednom mestu: zvanični Deltrian katalog, dostupan odmah, i katalozi koje pripremamo — YAFI program i tehnički listovi po kategorijama filtera.",
    placeholdersEyebrow: "U pripremi",
    placeholdersHeading: "Katalozi koji uskoro stižu.",
    placeholdersLead:
      "Dokumentacija se objavljuje kako bude spremna. Do tada, za bilo koji tip filtera šaljemo tehničke listove na zahtev.",
    placeholderBadge: "Uskoro",
    /**
     * PLACEHOLDER — čekaju se pravi katalozi. Kada stignu, zameniti unose
     * ispod i u `katalozi/page.tsx` kartice pretvoriti u prave kartice za
     * preuzimanje (po uzoru na `DeltrianCatalogue`).
     */
    placeholders: [
      { label: "Katalog 02", name: "Naziv kataloga" },
      { label: "Katalog 03", name: "Naziv kataloga" },
      { label: "Katalog 04", name: "Naziv kataloga" },
      { label: "Katalog 05", name: "Naziv kataloga" },
      { label: "Katalog 06", name: "Naziv kataloga" },
      { label: "Katalog 07", name: "Naziv kataloga" },
    ],
    ctaTitle: "Treba vam dokumentacija koja još nije objavljena?",
    ctaText:
      "Pošaljite nam tip filtera ili kategoriju koja vas zanima — tehničke listove i specifikacije dostavljamo na zahtev, u roku od 24 časa.",
    ctaAction: "Zatražite dokumentaciju →",
  },

  contactPage: {
    eyebrow: "Kontakt",
    heading: "Razgovarajmo o vašem sistemu ventilacije.",
    lead: "Pošaljite nam osnovne podatke o objektu i tipu ventilacionog sistema — vraćamo se sa predlogom rešenja i ponudom usklađenom sa vašim procesom, bilo da je u pitanju Deltrian program ili druga kategorija filtera.",
    whyEyebrow: "Zašto nam pisati",
    whyHeading: "Odgovor sa konkretnim predlogom, ne generičkim katalogom.",
    whyText:
      "Svaki upit prolazi kroz kratku analizu objekta i procesa pre nego što predložimo klasu i tip filtera — tako da ponuda koju dobijete odgovara stvarnim uslovima, ne samo cenovniku.",
  },

  aboutPage: {
    eyebrow: "O nama",
    heading: "Vazduh koji ne primećujete je naš posao.",
    imageAlt:
      "Staklena fasada poslovne zgrade snimljena odozdo, sa odrazom neba i oblaka.",
    lead: "Yafi Filtertech je beogradski proizvođač filtera za vazduh i regionalni distributer Deltrian programa. Radimo za pogone, bolnice, hotele i objekte u kojima kvalitet vazduha odlučuje o procesu, proizvodu i ljudima.",
    ctaPrimary: "Zatražite ponudu",
    ctaSecondary: "Pogledajte program filtera",
    story: {
      eyebrow: "Naša priča",
      heading: "Od radionice za filtere po meri do partnera za ceo region.",
      paragraphs: [
        "Počeli smo tamo gde katalozi staju — sa filterima koje su HVAC sistemi tražili u dimenzijama koje niko nije imao. Sopstvena proizvodnja predfiltera i finih filtera po meri i danas je osnova svega što radimo.",
        "Sa brojem objekata rasla je i potreba za višim klasama filtracije i dokumentovanim performansama. Partnerstvo sa kompanijom Deltrian donelo je Eurovent sertifikovan program, od predfiltera do HEPA klase, i mogućnost da ceo sistem vazduha zaokružimo na jednom mestu.",
        "Danas radimo sa klijentima u šest država regiona, a svaki upit i dalje počinje istim pitanjem: šta sistemu zaista treba — a ne šta je na lageru.",
      ],
      facts: [
        { value: "6", label: "država u kojima radimo" },
        { value: "G2–F9", label: "klase iz sopstvene proizvodnje" },
        { value: "H14", label: "najviša HEPA klasa u programu" },
      ],
      images: {
        cleanroom: "Radnik u zaštitnom odelu u čistoj sobi farmaceutskog pogona.",
        drawing: "Ruke crtaju po tehničkom crtežu pored laptopa.",
        site: "Inženjeri sa šlemovima ispred industrijskog postrojenja.",
      },
    },
    principles: {
      eyebrow: "Kako radimo",
      heading: "Četiri pravila koja ne menjamo.",
      lead: "Ista pravila važe za upit od deset filtera i za projekat cele fabrike.",
      items: [
        {
          title: "Merimo, ne procenjujemo.",
          desc: "Protok, pad pritiska i klasa filtracije određuju se prema sistemu, ne od oka. Zato ponuda koju dobijete odgovara stvarnim uslovima na objektu.",
        },
        {
          title: "Dimenzija po meri je standard, ne izuzetak.",
          desc: "Nestandardni otvor nije razlog za kompromis u klasi filtracije. Filter se pravi prema sistemu — nikad obrnuto.",
        },
        {
          title: "Energija je deo računa.",
          desc: "Niži pad pritiska znači manje rada ventilatora. Kada biramo tip i klasu filtera, računamo i kilovate, ne samo mikrone.",
        },
        {
          title: "Filter je deo sistema, ne potrošni artikal.",
          desc: "Interval zamene, dokumentacija i plan servisa idu uz svaku isporuku — jer je vazduh čist samo dok je filter u roku.",
        },
      ],
      imageAlt:
        "Ruke radnika u plavom radnom odelu mere metalni deo pomičnim merilom.",
      badge: "Proizvodnja po meri",
    },
    places: {
      eyebrow: "Gde nas srećete",
      heading: "U radionici, na objektu i u lancu isporuke.",
      lead: "Tri mesta na kojima se rešava kvalitet vazduha — i na kojima je naš tim prisutan.",
      items: [
        {
          label: "Radionica",
          title: "Filteri po meri, iz Beograda",
          desc: "Predfilteri i fini filteri klase G2–F9 (ISO 16890), u standardnim i nestandardnim dimenzijama, za svaki HVAC sistem.",
          imageAlt: "Radnik sa rukavicama pridržava rolnu filter materijala.",
        },
        {
          label: "Objekat",
          title: "Merenje, ugradnja, puštanje u rad",
          desc: "Obilazak sistema, merenje protoka i pada pritiska i tehnička podrška pri ugradnji — na licu mesta, ne telefonom.",
          imageAlt:
            "Radnik u reflektujućem prsluku na platformi ispod instalacija na plafonu.",
        },
        {
          label: "Isporuka",
          title: "Kontinuitet za ceo region",
          desc: "Standardne dimenzije i Deltrian program stižu bez prekida u lancu snabdevanja, u svih šest država u kojima radimo.",
          imageAlt: "Viljuškar prolazi kroz magacin sa paletnim regalima.",
        },
      ],
    },
  },

  deltrianPage: {
    eyebrow: "Regionalni distributer · Ex-Yu tržište",
    heading: "Deltrian program filtera.",
    lead: "Yafi Filtertech ekskluzivno zastupa Deltrian program industrijskih filtera na Ex-Yu tržištu — od predfiltracije do HEPA klase, uz punu tehničku podršku lokalnog tima.",
    ctaPrimary: "Zatražite Deltrian ponudu",
    ctaSecondary: "Pogledajte program filtera",
    whyEyebrow: "Zašto Deltrian program",
    whyHeading: "Partnerstvo koje nosi odgovornost za ceo region.",
    pillars: [
      {
        title: "Kontinuitet isporuke u regionu",
        desc: "Kao regionalni distributer obezbeđujemo dostupnost programa filtera na celom Ex-Yu tržištu, bez prekida lanca snabdevanja.",
      },
      {
        title: "Tehnička podrška Yafi tima",
        desc: "Od izbora klase filtracije do ugradnje — naš tim vodi projekat lokalno, sa poznavanjem propisa i specifičnosti tržišta.",
      },
      {
        title: "Usklađenost sa standardima",
        desc: "Program je razvijen u skladu sa aktuelnim evropskim standardima kvaliteta vazduha, uključujući ISO 16890 klasifikaciju.",
      },
    ],
    /** Fotografije su Deltrian-ove (deltrian.com); vidi `data/deltrianFilters.ts`. */
    gallery: {
      eyebrow: "Iz Deltrian programa",
      heading: "Filteri koje isporučujemo iz Deltrian programa.",
      lead: "Nekoliko tipova filtera iz proizvodnog programa — od predfiltracije u rolni do apsolutnih HEPA filtera i ATEX izvedbi.",
      credit: "Fotografije: deltrian.com",
      items: {
        vrecasti: "Vrećasti (džepasti) filteri",
        kompaktni: "Kompaktni V-filteri",
        hepa: "Apsolutni HEPA filteri",
        panelni: "Panelni filteri i filter ćelije",
        patronski: "Patronski filteri",
        molekularni: "Molekularni filteri (aktivni ugalj)",
        atex: "ATEX filteri",
        rolne: "Filter materijali u rolni",
      },
    },
    /**
     * Izbor sertifikata — tekstove je dao klijent. Redosled i linkovi su u
     * `data/certifications.ts`; ovde stoje samo naslov i opis po slug-u.
     */
    certifications: {
      eyebrow: "Sertifikati i standardi",
      heading: "Kvalitet potvrđen nezavisnim sertifikatima.",
      lead: "Deltrian filteri se testiraju i sertifikuju po evropskim i međunarodnim standardima — performanse koje deklarišemo su izmerene, ne procenjene.",
      learnMore: "Saznajte više",
      note: "Ovo su samo neki od mnogobrojnih sertifikata koje Deltrian poseduje.",
      allLink: "Pogledajte sve Deltrian sertifikate",
      items: {
        eurovent: {
          title: "Eurovent Certified Performance",
          desc: "Nezavisna verifikacija koja garantuje da deklarisane performanse filtera (efikasnost filtracije, pad pritiska, energetska klasa) odgovaraju izmerenim vrednostima, testiranim po standardizovanim EN/ISO metodama.",
        },
        atex: {
          title: "ATEX sertifikacija",
          desc: "Sertifikacija za proizvode namenjene radu u atmosferama sa rizikom od eksplozije (prisustvo gasova ili prašine u kombinaciji sa vazduhom, električnim pražnjenjem ili toplotom). Garantuje bezbedan rad filtera u takvim uslovima, posebno u farmaceutskoj i prehrambenoj industriji.",
        },
        "iso-16890": {
          title: "ISO 16890 sertifikacija",
          desc: "Međunarodni standard za ocenu efikasnosti filtera vazduha, uveden 2018. godine kao zamena za stari EN 779 standard. Klasifikuje filtere prema sposobnosti zadržavanja čestica različitih veličina (ePM1, ePM2.5, ePM10, Coarse), povezujući filtraciju direktno sa kvalitetom vazduha i zdravljem.",
        },
        "pfas-free": {
          title: "PFAS FREE",
          desc: "Oznaka koja potvrđuje da proizvod ne sadrži PFAS jedinjenja (tzv. „večne hemikalije“), postojane fluorovane supstance koje se dovode u vezu sa negativnim uticajem na zdravlje i životnu sredinu.",
        },
      },
    },
    /** Zvanični Deltrian katalog — `public/documents/deltrian-ceo-katalog.pdf`. */
    catalogue: {
      eyebrow: "Katalog 2026",
      heading: "Ceo Deltrian program, u jednom dokumentu.",
      lead: "Zvanični Deltrian katalog „Filtration, solutions and products 2026“ — 218 strana proizvoda, sektora i standarda, od ISO Coarse predfiltracije do apsolutne i molekularne filtracije.",
      meta: ["PDF", "7,4 MB", "218 strana", "Engleski"],
      download: "Preuzmite katalog",
      open: "Otvorite u pregledaču",
      contentsLabel: "Iz sadržaja",
      pageAbbr: "str.",
      contents: [
        { title: "ISO Coarse predfilteri", page: 64 },
        { title: "Fina filtracija", page: 91 },
        { title: "Apsolutna filtracija", page: 136 },
        { title: "Molekularna filtracija", page: 167 },
        { title: "Kutije i montažni sistemi", page: 184 },
        { title: "ATEX filteri", page: 191 },
      ],
      coverAlt: "Naslovna strana Deltrian kataloga „Filtration, solutions and products 2026“.",
    },
    ctaTitle: "Zatražite ponudu za Deltrian program filtera.",
    ctaText:
      "Recite nam koji objekat i sistem ventilacije treba pokriti — pripremamo predlog rešenja iz Deltrian programa u roku od 24 časa.",
  },
};

export type Dictionary = typeof sr;
