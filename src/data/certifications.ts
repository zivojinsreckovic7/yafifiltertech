/*
 * The Deltrian certifications shown on the Deltrian page — a selection, not
 * the full list, which lives at deltrian.com/about-us/certifications. Badge
 * artwork is Deltrian's own (pulled from the same page). Titles and
 * descriptions are in the dictionaries under `deltrianPage.certifications`,
 * keyed by slug.
 *
 * PFAS FREE has no dedicated page anywhere on deltrian.com, so it links to
 * the certifications overview where the label is described.
 */

export type CertificationSlug = "eurovent" | "atex" | "iso-16890" | "pfas-free";

export type Certification = {
  slug: CertificationSlug;
  /** Badge under `public/`; intrinsic size sets the aspect ratio. */
  image: { src: string; width: number; height: number };
  /** External "Learn more" target. */
  href: string;
};

/** Overview of every certificate Deltrian holds. */
export const allCertificationsHref =
  "https://www.deltrian.com/about-us/certifications";

export const certifications: Certification[] = [
  {
    slug: "eurovent",
    image: { src: "/deltrian/sertifikati/eurovent.webp", width: 850, height: 292 },
    href: "https://www.eurovent-certification.com/",
  },
  {
    slug: "atex",
    image: { src: "/deltrian/sertifikati/atex.webp", width: 1024, height: 887 },
    href: "https://www.deltrian.com/filtration/products/atex-filters-en",
  },
  {
    slug: "iso-16890",
    image: { src: "/deltrian/sertifikati/iso-16890.webp", width: 174, height: 177 },
    href: "https://www.deltrian.com/news/article/iso-16890",
  },
  {
    slug: "pfas-free",
    image: { src: "/deltrian/sertifikati/pfas-free.svg", width: 739, height: 775 },
    href: allCertificationsHref,
  },
];
