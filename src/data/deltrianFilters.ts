/*
 * A selection of filters from the Deltrian range, shown as a photo gallery
 * on the Deltrian page. The photos are Deltrian's own category shots from
 * deltrian.com/filtration/products (660×470 cut-outs on #F6F7FB, which the
 * gallery plates match). Captions live in the dictionaries under
 * `deltrianPage.gallery.items`, keyed by slug.
 */

export type DeltrianFilterSlug =
  | "vrecasti"
  | "kompaktni"
  | "hepa"
  | "panelni"
  | "patronski"
  | "molekularni"
  | "atex"
  | "rolne";

export type DeltrianFilter = {
  slug: DeltrianFilterSlug;
  image: string;
};

export const deltrianFilters: DeltrianFilter[] = [
  { slug: "vrecasti", image: "/deltrian/filteri/vrecasti.webp" },
  { slug: "kompaktni", image: "/deltrian/filteri/kompaktni.webp" },
  { slug: "hepa", image: "/deltrian/filteri/hepa.webp" },
  { slug: "panelni", image: "/deltrian/filteri/panelni.webp" },
  { slug: "patronski", image: "/deltrian/filteri/patronski.webp" },
  { slug: "molekularni", image: "/deltrian/filteri/molekularni.webp" },
  { slug: "atex", image: "/deltrian/filteri/atex.webp" },
  { slug: "rolne", image: "/deltrian/filteri/rolne.webp" },
];

/** Where the photos come from; credited under the gallery. */
export const deltrianProductsHref =
  "https://www.deltrian.com/filtration/products";
