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
    ogDescription:
      "Regional distributor of the Deltrian filter range for the Ex-Yu market. Solutions for pharmaceutical production, hospitality, automotive plants and airports.",
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
        "Dedicated air filtration solutions for pharmaceutical manufacturing, hospitality, the automotive industry and airports.",
    },
    contact: {
      title: "Contact",
      description:
        "Request a quote for industrial air filtration. Tell us about your facility and ventilation system — we come back with a proposed solution.",
    },
    deltrian: {
      title: "Deltrian filter range",
      description:
        "Yafi Filtertech is the official regional distributor of the Deltrian filter range for the Ex-Yu market — a complete industrial air filtration portfolio.",
    },
  },

  nav: {
    products: "Products",
    productCategories: "Filter categories",
    allProducts: "The full filter range →",
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
    email: "Email",
    phone: "Phone",
    hours: "Office hours",
    hoursValue: "Mon–Fri, 08:00–16:00",
    region: "Region",
    regionValue: "Serbia · Ex-Yu market",
  },

  hero: {
    eyebrow: "Regional distributor — Deltrian range",
    heading: "Air filtration that protects the process, not just the room.",
    lead: "We design and supply industrial air filtration systems compliant with ISO 16890 — for pharmaceutical production, hospitality, automotive plants and airports across the Ex-Yu region.",
    ctaPrimary: "Request a quote",
    ctaSecondary: "Explore the Deltrian range",
    scroll: "Scroll",
    stats: {
      experience: "years of experience",
      projects: "completed projects",
      standard: "ISO air quality standard",
      markets: "markets across the Ex-Yu region",
    },
  },

  trustBand: [
    "ISO 16890",
    "EN 1822 · H13–H14",
    "GMP / ISO 14644",
    "Deltrian Partner Program",
    "Pharmaceutical industry",
    "Hospitality",
    "Automotive industry",
    "Airports",
  ],

  pillars: {
    eyebrow: "About us",
    heading: "An industrial partner, not just a filter supplier.",
    lead: "Yafi Filtertech is the regional distributor of the Deltrian filter range for the Ex-Yu market. We work with production plants, healthcare institutions, hotels and infrastructure facilities where clean air is part of the operating standard — not an extra line in the budget.",
    items: [
      {
        title: "Energy savings",
        desc: "A lower pressure drop across the filter media means less load on the fans and measurably lower HVAC energy consumption.",
      },
      {
        title: "ISO 16890 air quality",
        desc: "Every recommendation follows the current standard that classifies filters by their real particulate capture efficiency.",
      },
      {
        title: "Process safety",
        desc: "In pharmaceuticals, food production and cleanrooms, filtration is not a detail — it is a precondition for a safe, validated production process.",
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
    heading: "The Deltrian filter range — officially, for the entire Ex-Yu region.",
    lead: "Yafi Filtertech is the official regional distributor of the Deltrian filter range. A complete industrial filtration portfolio, developed in line with European air quality standards, available directly through our team.",
    bullets: [
      "Official regional distributor",
      "Complete filter range",
      "On-site technical support",
    ],
    cta: "Open the Deltrian range →",
  },

  industriesSection: {
    eyebrow: "Solutions by industry",
    heading: "Dedicated solutions for sectors where clean air is not optional.",
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
    heading: "Trust is built on delivery, not promises.",
    ratingLabel: "average client rating",
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

  contactPage: {
    eyebrow: "Contact",
    heading: "Let's talk about your ventilation system.",
    lead: "Send us the basics about your facility and ventilation system — we come back with a proposed solution and a quote matched to your process, whether it comes from the Deltrian range or another filter category.",
    whyEyebrow: "Why write to us",
    whyHeading: "A reply with a concrete proposal, not a generic catalogue.",
    whyText:
      "Every enquiry goes through a short review of the facility and the process before we recommend a filter class and type — so the quote you receive reflects real conditions, not just a price list.",
  },

  deltrianPage: {
    eyebrow: "Official regional distributor · Ex-Yu market",
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
    rangeEyebrow: "Filter range",
    rangeHeading: "What the Deltrian range covers.",
    rangeLead:
      "A complete filter portfolio for industrial and commercial ventilation, available through Yafi Filtertech as the regional distributor.",
    ctaTitle: "Request a quote for the Deltrian filter range.",
    ctaText:
      "Tell us which facility and ventilation system needs covering — we prepare a proposal from the Deltrian range within 24 hours.",
  },
};
