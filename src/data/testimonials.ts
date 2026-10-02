import type { Locale } from "@/i18n/config";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const sr: Testimonial[] = [
  {
    quote:
      "Zamena filtera je prestala da bude tema — isporuke stižu pre roka, klasa je uvek dokumentovana, a potrošnja ventilatora je merljivo niža.",
    name: "Milan D.",
    role: "Rukovodilac održavanja · farmaceutska proizvodnja, Beograd",
  },
  {
    quote:
      "Prvi dobavljač koji je prvo tražio protoke i merenja, pa tek onda poslao ponudu. Predloženo rešenje smanjilo je pad pritiska za trećinu.",
    name: "Jelena S.",
    role: "Tehnički direktor · hotelska grupa, Crna Gora",
  },
  {
    quote:
      "GMP audit smo prošli bez ijedne primedbe na filtraciju. Dokumentacija za svaki filter stigla je uz isporuku, bez dodatnog traženja.",
    name: "Nikola P.",
    role: "Menadžer kvaliteta · auto-industrija, Kragujevac",
  },
  {
    quote:
      "Preuzeli su kompletan plan zamena za tri objekta. Od tada nismo imali nijedan zastoj zbog filtera.",
    name: "Ivana M.",
    role: "Facility menadžer · aerodromski operater",
  },
];

const en: Testimonial[] = [
  {
    quote:
      "Filter replacement has stopped being a topic — deliveries arrive ahead of schedule, the class is always documented, and fan consumption is measurably lower.",
    name: "Milan D.",
    role: "Maintenance manager · pharmaceutical production, Belgrade",
  },
  {
    quote:
      "The first supplier that asked for flow rates and measurements first and only then sent a quote. The proposed solution cut the pressure drop by a third.",
    name: "Jelena S.",
    role: "Technical director · hotel group, Montenegro",
  },
  {
    quote:
      "We passed the GMP audit without a single remark on filtration. Documentation for every filter arrived with the delivery, without us having to ask.",
    name: "Nikola P.",
    role: "Quality manager · automotive industry, Kragujevac",
  },
  {
    quote:
      "They took over the complete replacement plan for three facilities. Since then we have not had a single stoppage caused by filters.",
    name: "Ivana M.",
    role: "Facility manager · airport operator",
  },
];

const byLocale: Record<Locale, Testimonial[]> = { sr, en };

export function getTestimonials(locale: Locale): Testimonial[] {
  return byLocale[locale];
}

/** Aggregate shown in trust rows — keep in sync with testimonials. */
export const rating = { score: "4.9", outOf: "5" };
