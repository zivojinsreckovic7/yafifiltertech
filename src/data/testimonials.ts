import type { Locale } from "@/i18n/config";

/*
 * Avatars are Unsplash, free licence (unsplash.com/license). Photo ids, in case
 * one needs replacing: milan-d 02650si1HxE · jelena-s 4BG2yKyCaWg ·
 * nikola-p 7YVZYZeITc8 · ivana-m ERbgk96BOGg
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Square portrait under `public/` — shared by both locales. */
  avatar: string;
};

const sr: Testimonial[] = [
  {
    quote:
      "Zamena filtera je prestala da bude tema — isporuke stižu pre roka, klasa je uvek dokumentovana, a potrošnja ventilatora je merljivo niža.",
    name: "Milan D.",
    avatar: "/testimonials/milan-d.webp",
    role: "Rukovodilac održavanja · farmaceutska proizvodnja, Beograd",
  },
  {
    quote:
      "Prvi dobavljač koji je prvo tražio protoke i merenja, pa tek onda poslao ponudu. Predloženo rešenje smanjilo je pad pritiska za trećinu.",
    name: "Jelena S.",
    avatar: "/testimonials/jelena-s.webp",
    role: "Tehnički direktor · hotelska grupa, Crna Gora",
  },
  {
    quote:
      "GMP audit smo prošli bez ijedne primedbe na filtraciju. Dokumentacija za svaki filter stigla je uz isporuku, bez dodatnog traženja.",
    name: "Nikola P.",
    avatar: "/testimonials/nikola-p.webp",
    role: "Menadžer kvaliteta · auto-industrija, Kragujevac",
  },
  {
    quote:
      "Preuzeli su kompletan plan zamena za tri objekta. Od tada nismo imali nijedan zastoj zbog filtera.",
    name: "Ivana M.",
    avatar: "/testimonials/ivana-m.webp",
    role: "Facility menadžer · aerodromski operater",
  },
];

const en: Testimonial[] = [
  {
    quote:
      "Filter replacement has stopped being a topic — deliveries arrive ahead of schedule, the class is always documented, and fan consumption is measurably lower.",
    name: "Milan D.",
    avatar: "/testimonials/milan-d.webp",
    role: "Maintenance manager · pharmaceutical production, Belgrade",
  },
  {
    quote:
      "The first supplier that asked for flow rates and measurements first and only then sent a quote. The proposed solution cut the pressure drop by a third.",
    name: "Jelena S.",
    avatar: "/testimonials/jelena-s.webp",
    role: "Technical director · hotel group, Montenegro",
  },
  {
    quote:
      "We passed the GMP audit without a single remark on filtration. Documentation for every filter arrived with the delivery, without us having to ask.",
    name: "Nikola P.",
    avatar: "/testimonials/nikola-p.webp",
    role: "Quality manager · automotive industry, Kragujevac",
  },
  {
    quote:
      "They took over the complete replacement plan for three facilities. Since then we have not had a single stoppage caused by filters.",
    name: "Ivana M.",
    avatar: "/testimonials/ivana-m.webp",
    role: "Facility manager · airport operator",
  },
];

const byLocale: Record<Locale, Testimonial[]> = { sr, en };

export function getTestimonials(locale: Locale): Testimonial[] {
  return byLocale[locale];
}

/** Aggregate shown in trust rows — keep in sync with testimonials. */
export const rating = { score: "4.9", outOf: "5" };
