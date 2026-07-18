export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
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

/** Aggregate shown in trust rows — keep in sync with testimonials. */
export const rating = { score: "4.9", outOf: "5" };
