import type { Dictionary } from "./sr";

/** English copy. Must stay structurally identical to the Serbian dictionary. */
export const en: Dictionary = {
  meta: {
    siteTitle: "Yafi Filtertech | Industrial air filtration",
    titleTemplate: "%s | Yafi Filtertech",
    description:
      "Yafi Filtertech designs and supplies industrial air filtration systems for the Ex-Yu market — HEPA, cassette and bag filters compliant with ISO 16890. Regional distributor of the Deltrian filter range.",
    keywords: [
      "industrial air filters",
      "hepa filters",
      "cassette filters for ventilation",
      "bag filters",
      "air filtration",
      "Deltrian",
      "ISO 16890",
    ],
    ogLocale: "en_GB",
    ogImageTagline: "Industrial air filtration",
    ogDescription:
      "Regional distributor of the Deltrian filter range for the Ex-Yu market. Solutions for pharmaceutical production and hospitals, automotive plants, hospitality and heavy industry.",
    jsonLdDescription:
      "Industrial air filtration and regional distributor of the Deltrian filter range for the Ex-Yu market.",
    areaServed: [
      "Serbia",
      "Bosnia and Herzegovina",
      "Croatia",
      "Montenegro",
      "North Macedonia",
    ],
    products: {
      title: "Filter range",
      description:
        "The complete range of industrial filters — filter media, panel, cassette and bag filters, rigid V-cell filters, absolute HEPA filters, odour and paint shop filters, and frames. Compliant with ISO 16890 and EN 1822.",
    },
    industries: {
      title: "Industries",
      description:
        "Dedicated air filtration solutions for pharmaceutical manufacturing and hospitals, the automotive industry and paint shops, hospitality and commercial buildings, heavy industry and energy.",
    },
    contact: {
      title: "Contact",
      description:
        "Request a quote for industrial air filtration. Tell us about your facility and ventilation system — we come back with a proposed solution.",
    },
    deltrian: {
      title: "Deltrian filter range",
      description:
        "Yafi Filtertech is the regional distributor of the Deltrian filter range for the Ex-Yu market — a complete industrial air filtration portfolio.",
    },
    about: {
      title: "About us",
      description:
        "Belgrade-based manufacturer of made-to-measure air filters and regional distributor of the Deltrian range. How we work, where you'll find us and what clients say.",
    },
    catalogues: {
      title: "Catalogues",
      description:
        "Download the Deltrian catalogue “Filtration, solutions and products 2026” and the technical documentation for the Yafi Filtertech filter range.",
    },
  },

  nav: {
    home: "Home",
    products: "Products",
    productCategories: "Filter categories",
    allProducts: "The full filter range →",
    catalogues: "Catalogues",
    industries: "Industries",
    about: "About us",
    deltrian: "Deltrian range",
    contact: "Contact",
    quote: "Request a quote",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    selectLanguage: "Select language",
  },

  theme: {
    toDark: "Dark mode",
    toLight: "Light mode",
  },

  loader: {
    aria: "Loading the site",
    label: "Loading",
  },

  search: {
    placeholder: "Search filters (HEPA, cassette, bag...)",
    submit: "Search",
  },

  quoteMarks: { open: "“", close: "”" },

  trustSignals: {
    rating: (score: string, outOf: string) =>
      `${score}/${outOf} average client rating`,
    response: "Response within 24h",
    projects: "1,200+ completed projects",
  },

  contactRows: {
    address: "Address",
    email: "Email",
    phone: "Phone",
    hours: "Office hours",
    hoursValue: "Mon–Fri, 08:00–16:00",
    region: "Region",
    regionValue: "Serbia · Ex-Yu market",
  },

  hero: {
    eyebrow: "Regional distributor — Deltrian range",
    heading: "Everyone has a right to clean air.",
    imageAlt:
      "A woman with her eyes closed breathing clean air by an open window, wearing a Yafi Filtertech shirt.",
    lead: "We combine our own made-to-measure filter manufacturing with a range of certified Deltrian systems. The full spectrum of air filtration for chambers in pharmaceutical, automotive and heavy industry across the Ex-Yu region.",
    ctaPrimary: "Request a quote",
    ctaSecondary: "Explore the Deltrian range",
    scroll: "Scroll",
    stats: {
      experience: "years of experience",
      projects: "completed projects",
      standard: "air quality standard",
      markets: "markets across the Ex-Yu region",
    },
  },

  trustBand: [
    "ISO 16890",
    "EN 1822 · H13–H14",
    "GMP / ISO 14644",
    "Deltrian Partner Program",
    "Pharmaceutical industry",
    "Automotive and paint shops",
    "Hospitality",
    "Heavy industry and energy",
  ],

  pillars: {
    eyebrow: "About us",
    heading: "Engineering precision and more than 25 years in air filtration.",
    lead: "With more than two and a half decades on the market, Yafi Filtertech has built manufacturing and distribution capacity that meets the strictest European clean air standards. As a domestic manufacturer and the regional distributor of the Deltrian filter range for the Ex-Yu market, we deliver complete filtration solutions — with Eurovent certification and the energy efficiency of Deltrian filters — bringing the whole air system together in one place.",
    leadSecondary:
      "We work with production plants, healthcare institutions, hotels and infrastructure facilities where clean air is part of the operating standard — not an extra line in the budget.",
    itemsIntro: "Our approach rests on three core values.",
    items: [
      {
        title: "In-house manufacturing, engineered solutions",
        desc: "We build pre-filters and fine filters (classes G2 to F9 / ISO 16890) in both standard and non-standard sizes — matched exactly to the dimensions and demands of your HVAC systems.",
      },
      {
        title: "Global quality with local support",
        desc: "Through our partnership with the American-Belgian company Deltrian we bring top European HVAC filtration technology to the local market — EUROVENT certification and energy efficiency with substantial savings, backed by fast delivery, dependable lead times and direct factory and technical support.",
      },
      {
        title: "Expert system optimization",
        desc: "There is no such thing as a \u201cuniversal filter\u201d. For every facility we assess the air flow and the pressure drop to find the ideal balance between maximum filtration efficiency and minimum energy consumption. That is exactly why we began working with Deltrian two years ago — the partnership that unlocked the highest level of filtration available.",
      },
    ],
  },

  productsSection: {
    eyebrow: "Filter range",
    heading: "Filters for every stage of air protection.",
    viewAll: "See the full range",
  },

  productCard: {
    cta: "View specifications",
  },

  deltrianBanner: {
    eyebrow: "Exclusive partnership",
    heading: "The Deltrian filter range — for the entire Ex-Yu region.",
    lead: "Yafi Filtertech is the regional distributor of the Deltrian filter range. A complete industrial filtration portfolio, developed in line with European air quality standards, available directly through our team.",
    bullets: [
      "Regional distributor",
      "Complete filter range",
      "On-site technical support",
    ],
    cta: "Open the Deltrian range →",
  },

  regionSection: {
    eyebrow: "Ex-Yu region",
    heading: "One partner for the whole region.",
    lead: "From Belgrade we supply and support customers in six countries across the Ex-Yu region — with our own made-to-measure filters and the Deltrian range.",
    hub: "Headquarters — Belgrade",
    mapLabel:
      "Map of the Ex-Yu region with the markets we serve highlighted: Serbia, Montenegro, Bosnia and Herzegovina, Slovenia, Croatia and North Macedonia.",
    countries: {
      rs: "Serbia",
      me: "Montenegro",
      ba: "Bosnia and Herzegovina",
      si: "Slovenia",
      hr: "Croatia",
      mk: "North Macedonia",
    },
  },

  industriesSection: {
    eyebrow: "Solutions by industry",
    heading: "Dedicated solutions for sectors where clean air is not optional.",
    facilitiesIntro: "The types of facility we equip",
  },

  industryCard: {
    cta: "Solution for this industry",
  },

  process: {
    eyebrow: "How we work",
    heading: "From first enquiry to a long-term partnership",
    steps: [
      {
        title: "Enquiry and analysis",
        desc: "We review the existing ventilation system, air flow and process requirements before proposing a solution.",
      },
      {
        title: "Proposal and quote",
        desc: "We propose the filter type and class aligned with ISO 16890, energy efficiency and your budget.",
      },
      {
        title: "Delivery and installation",
        desc: "We deliver filters from the Deltrian range with technical support during on-site installation.",
      },
      {
        title: "Ongoing maintenance",
        desc: "We track filter replacement intervals and propose a service plan that keeps the system running without interruption.",
      },
    ],
  },

  testimonialsSection: {
    eyebrow: "What clients say",
    /** Rendered as two lines: the second one drops to the muted ink. */
    heading: "Trust is built on delivery,",
    headingMuted: "not on promises.",
    lead: "Production plants, hospitals, hotel groups and paint shops across the Ex-Yu region keep their systems running on our filters.",
    ratingLabel: "average client rating",
    previous: "Previous testimonial",
    next: "Next testimonial",
    goTo: (n: string) => `Show testimonial ${n}`,
  },

  locationMap: {
    eyebrow: "Where to find us",
    heading: "Peščarska 10, Novi Beograd",
    directions: "Open in maps →",
    frameTitle: "Map of the Yafi Filtertech location",
  },

  ctaSection: {
    eyebrow: "Request a quote",
    heading: "Ready to improve your air quality?",
    lead: "Send us the basics about your facility and ventilation system — we come back with a proposed solution and a quote matched to your process.",
  },

  ctaBanner: {
    action: "Request a quote →",
  },

  quoteForm: {
    sentTitle: "Enquiry sent",
    sentText:
      "Thank you for your interest. Our team will get back to you with a proposed solution shortly.",
    name: "Full name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    filterType: "Filter type",
    selectCategory: "Select a category",
    deltrianOption: "Deltrian range",
    otherOption: "Not sure / other",
    message: "Message",
    messagePlaceholder:
      "Describe the facility, air flow or your current ventilation system...",
    sending: "Sending...",
    submit: "Send enquiry",
    note: "We reply within 24 hours on business days. By sending this enquiry you agree that we may contact you to prepare a quote.",
  },

  footer: {
    description:
      "We design and supply industrial air filtration systems for the Ex-Yu market. Regional distributor of the Deltrian filter range.",
    navHeading: "Navigation",
    industriesHeading: "Industries",
    contactHeading: "Contact",
    regionValue: "Serbia · Ex-Yu region",
    rights: (year: number) => `© ${year} Yafi Filtertech. All rights reserved.`,
    tagline: "Industrial air filtration · ISO 16890",
  },

  productsPage: {
    eyebrow: "Filter range",
    heading: "Filters for every stage of industrial air filtration.",
    lead: "From pre-filtration to HEPA/ULPA classes — a complete range compliant with ISO 16890 and EN 1822, from the Deltrian portfolio and regional manufacturing partners.",
    resultsFor: (query: string) => `Search results for "${query}"`,
    noResults: (query: string) => `No results for "${query}"`,
    showAll: "Show the full range →",
    ctaTitle: "Not sure which filter class suits your system?",
    ctaText:
      "Send us your air flow rates and ventilation system type — we recommend the filter class and type with no obligation, within 24 hours.",
    ctaAction: "Get a free recommendation →",
  },

  productPage: {
    back: "← The full filter range",
    standardsEyebrow: "Standards and certificates",
    rangeEyebrow: "In the range",
    rangeHeading: "Available variants",
    rangeLead:
      "Every variant is available in standard and made-to-measure sizes — we match the dimensions and filtration class to your system.",
    groupsLabel: "Product groups",
    applicationsEyebrow: "Applications",
    applicationsHeading: "Where it is used most",
    relatedEyebrow: "Other categories",
    relatedHeading: "Explore the rest of the range",
    ctaTitle: (category: string) => `Request a quote for ${category}`,
    ctaText:
      "Send us the dimensions, filtration class and quantities — we prepare a quote within 24 hours.",
  },

  productItemPage: {
    breadcrumbHome: "Home",
    back: (category: string) => `← ${category}`,
    highlightsEyebrow: "Highlights",
    specsEyebrow: "Key features",
    standardsEyebrow: "Standards and certificates",
    skuLabel: "Product code",
    categoryLabel: "Category",
    categoriesLabel: "Categories",
    descriptionEyebrow: "Product description",
    quote: "Request a quote",
    siblingsEyebrow: "From the same category",
    siblingsHeading: "Other variants",
    ctaTitle: (product: string) => `Request a quote for: ${product}`,
    ctaText:
      "Send us the dimensions, filtration class and quantities — we prepare a quote within 24 hours.",
  },

  industriesPage: {
    eyebrow: "Industries",
    heading: "Solutions built around the specific demands of each industry.",
    lead: "Every industry has different air cleanliness standards, air flows and budget constraints. We start from your process, not from a catalogue.",
    ctaTitle: "Your industry is not on the list?",
    ctaText:
      "We work beyond the sectors listed here — send us your process requirements and the cleanliness standard you have to meet, and we will propose a solution.",
  },

  industryPage: {
    back: "← All industries",
    challenge: "Challenge",
    solution: "Solution",
    filtersEyebrow: "Recommended filters",
    filtersHeading: (industry: string) => `Solutions we use for ${industry}`,
    ctaTitle: (industry: string) => `Request a quote for ${industry}`,
    ctaText: (industry: string) =>
      `Tell us more about the facility and the process — we prepare a proposal tailored to ${industry} within 24 hours.`,
  },

  cataloguesPage: {
    eyebrow: "Catalogues",
    heading: "Catalogues and technical documentation.",
    lead: "In one place: the official Deltrian catalogue, available now, and the catalogues we are preparing — the YAFI range and technical sheets by filter category.",
    placeholdersEyebrow: "In preparation",
    placeholdersHeading: "Catalogues coming soon.",
    placeholdersLead:
      "Documentation is published as it is ready. Until then, we send technical sheets for any filter type on request.",
    placeholderBadge: "Coming soon",
    /** PLACEHOLDER — see the note on the Serbian dictionary. */
    placeholders: [
      { label: "Catalogue 02", name: "Catalogue name" },
      { label: "Catalogue 03", name: "Catalogue name" },
      { label: "Catalogue 04", name: "Catalogue name" },
      { label: "Catalogue 05", name: "Catalogue name" },
      { label: "Catalogue 06", name: "Catalogue name" },
      { label: "Catalogue 07", name: "Catalogue name" },
    ],
    ctaTitle: "Need documentation that isn't published yet?",
    ctaText:
      "Tell us the filter type or category you are interested in — we send technical sheets and specifications on request, within 24 hours.",
    ctaAction: "Request documentation →",
  },

  contactPage: {
    eyebrow: "Contact",
    heading: "Let's talk about your ventilation system.",
    lead: "Send us the basics about your facility and ventilation system — we come back with a proposed solution and a quote matched to your process, whether it comes from the Deltrian range or another filter category.",
    whyEyebrow: "Why write to us",
    whyHeading: "A reply with a concrete proposal, not a generic catalogue.",
    whyText:
      "Every enquiry goes through a short review of the facility and the process before we recommend a filter class and type — so the quote you receive reflects real conditions, not just a price list.",
  },

  aboutPage: {
    eyebrow: "About us",
    heading: "The air you never notice is our job.",
    imageAlt:
      "Glass facade of an office building seen from below, reflecting sky and clouds.",
    lead: "Yafi Filtertech is a Belgrade-based air filter manufacturer and the regional distributor of the Deltrian range. We work for plants, hospitals, hotels and buildings where air quality decides the process, the product and the people.",
    ctaPrimary: "Request a quote",
    ctaSecondary: "See the filter range",
    story: {
      eyebrow: "Our story",
      heading: "From a workshop for made-to-measure filters to a partner for the whole region.",
      paragraphs: [
        "We started where catalogues stop — with the filters HVAC systems needed in sizes nobody had. In-house production of pre-filters and fine filters to order is still the foundation of everything we do.",
        "As the number of sites grew, so did the need for higher filtration classes and documented performance. The partnership with Deltrian brought a Eurovent-certified range, from pre-filters to HEPA class, and the ability to close the whole air system in one place.",
        "Today we work with clients in six countries across the region, and every enquiry still starts with the same question: what does the system actually need — not what is in stock.",
      ],
      facts: [
        { value: "6", label: "countries we work in" },
        { value: "G2–F9", label: "classes from our own production" },
        { value: "H14", label: "highest HEPA class in the range" },
      ],
      images: {
        cleanroom: "Worker in a protective suit in a pharmaceutical cleanroom.",
        drawing: "Hands drawing on a technical drawing next to a laptop.",
        site: "Engineers in hard hats in front of an industrial plant.",
      },
    },
    principles: {
      eyebrow: "How we work",
      heading: "Four rules we don't bend.",
      lead: "The same rules apply to an order for ten filters and to a project for an entire factory.",
      items: [
        {
          title: "We measure, we don't guess.",
          desc: "Airflow, pressure drop and filtration class are set by the system, not by eye. That is why the quote you receive matches the real conditions on site.",
        },
        {
          title: "Made to measure is the standard, not the exception.",
          desc: "A non-standard opening is no reason to compromise on filtration class. The filter is made to fit the system — never the other way round.",
        },
        {
          title: "Energy is part of the equation.",
          desc: "A lower pressure drop means less fan work. When we choose the type and class of filter, we count kilowatts, not just microns.",
        },
        {
          title: "A filter is part of the system, not a consumable.",
          desc: "Replacement interval, documentation and a service plan come with every delivery — because the air is only clean while the filter is within its term.",
        },
      ],
      imageAlt:
        "A worker's hands in blue overalls measuring a metal part with a caliper.",
      badge: "Made to measure",
    },
    places: {
      eyebrow: "Where you'll find us",
      heading: "In the workshop, on site and along the supply chain.",
      lead: "Three places where air quality is decided — and where our team is present.",
      items: [
        {
          label: "Workshop",
          title: "Made-to-measure filters, from Belgrade",
          desc: "Pre-filters and fine filters in classes G2–F9 (ISO 16890), in standard and non-standard dimensions, for any HVAC system.",
          imageAlt: "Gloved worker steadying a roll of filter media.",
        },
        {
          label: "On site",
          title: "Measuring, installation, commissioning",
          desc: "A walk-through of the system, airflow and pressure-drop measurements and technical support during installation — in person, not over the phone.",
          imageAlt: "Worker in a hi-vis vest on a lift below ceiling services.",
        },
        {
          label: "Supply",
          title: "Continuity for the whole region",
          desc: "Standard sizes and the Deltrian range arrive without breaks in the supply chain, in all six countries we work in.",
          imageAlt: "Forklift moving through a warehouse of pallet racking.",
        },
      ],
    },
  },

  deltrianPage: {
    eyebrow: "Regional distributor · Ex-Yu market",
    heading: "The Deltrian filter range.",
    lead: "Yafi Filtertech is the exclusive representative of the Deltrian industrial filter range on the Ex-Yu market — from pre-filtration to HEPA class, with full technical support from a local team.",
    ctaPrimary: "Request a Deltrian quote",
    ctaSecondary: "See the filter range",
    whyEyebrow: "Why the Deltrian range",
    whyHeading: "A partnership that takes responsibility for the whole region.",
    pillars: [
      {
        title: "Supply continuity across the region",
        desc: "As the regional distributor we keep the filter range available across the entire Ex-Yu market, with no breaks in the supply chain.",
      },
      {
        title: "Technical support from the Yafi team",
        desc: "From choosing the filtration class to installation — our team runs the project locally, with knowledge of local regulations and market specifics.",
      },
      {
        title: "Compliance with standards",
        desc: "The range is developed in line with current European air quality standards, including the ISO 16890 classification.",
      },
    ],
    gallery: {
      eyebrow: "From the Deltrian range",
      heading: "Filters we supply from the Deltrian range.",
      lead: "A few filter types from the range — from roll media for pre-filtration to absolute HEPA filters and ATEX versions.",
      credit: "Photos: deltrian.com",
      items: {
        vrecasti: "Bag (pocket) filters",
        kompaktni: "Compact V-bank filters",
        hepa: "Absolute HEPA filters",
        panelni: "Panel filters and filter cells",
        patronski: "Cartridge filters",
        molekularni: "Molecular filters (activated carbon)",
        atex: "ATEX filters",
        rolne: "Roll filter media",
      },
    },
    certifications: {
      eyebrow: "Certifications & standards",
      heading: "Quality backed by independent certification.",
      lead: "Deltrian filters are tested and certified to European and international standards — the performance we quote is measured, not estimated.",
      learnMore: "Learn more",
      note: "These are just some of the many certificates Deltrian holds.",
      allLink: "See all Deltrian certifications",
      items: {
        eurovent: {
          title: "Eurovent Certified Performance",
          desc: "Independent verification that a filter's declared performance (filtration efficiency, pressure drop, energy class) matches the values measured in tests carried out to standardised EN/ISO methods.",
        },
        atex: {
          title: "ATEX certification",
          desc: "Certification for products intended to operate in potentially explosive atmospheres (gases or dust combined with air, electrical discharge or heat). It guarantees the filter runs safely in those conditions, which matters most in the pharmaceutical and food industries.",
        },
        "iso-16890": {
          title: "ISO 16890 certification",
          desc: "The international standard for rating air filter efficiency, introduced in 2018 to replace the old EN 779. It classifies filters by how well they capture particles of different sizes (ePM1, ePM2.5, ePM10, Coarse), tying filtration directly to air quality and health.",
        },
        "pfas-free": {
          title: "PFAS FREE",
          desc: "A label confirming the product contains no PFAS compounds (the so-called “forever chemicals”), persistent fluorinated substances linked to harmful effects on health and the environment.",
        },
      },
    },
    catalogue: {
      eyebrow: "Catalogue 2026",
      heading: "The whole Deltrian range, in one document.",
      lead: "The official Deltrian catalogue “Filtration, solutions and products 2026” — 218 pages of products, sectors and standards, from ISO Coarse pre-filtration to absolute and molecular filtration.",
      meta: ["PDF", "7.4 MB", "218 pages", "English"],
      download: "Download the catalogue",
      open: "Open in browser",
      contentsLabel: "From the contents",
      pageAbbr: "p.",
      contents: [
        { title: "ISO Coarse pre-filters", page: 64 },
        { title: "Fine filtration", page: 91 },
        { title: "Absolute filtration", page: 136 },
        { title: "Molecular filtration", page: 167 },
        { title: "Boxes and mounting systems", page: 184 },
        { title: "ATEX filters", page: 191 },
      ],
      coverAlt: "Cover of the Deltrian catalogue “Filtration, solutions and products 2026”.",
    },
    ctaTitle: "Request a quote for the Deltrian filter range.",
    ctaText:
      "Tell us which facility and ventilation system needs covering — we prepare a proposal from the Deltrian range within 24 hours.",
  },
};
