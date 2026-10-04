import CatalogueShowcase, { type StackPage } from "@/components/CatalogueShowcase";
import type { Dictionary } from "@/i18n/dictionaries";

/** The official Deltrian catalogue, served from `public/`. */
const CATALOGUE_HREF = "/documents/deltrian-ceo-katalog.pdf";

/**
 * The pages in the stack, back to front: two chapter dividers (navy line
 * art, rendered from the PDF) behind the cover. Rest pose per page; the
 * hover fan-out lives in `.book-stack` (globals.css).
 */
const pages: StackPage[] = [
  { src: "/deltrian/katalog/page-64.webp", r: "-9deg", x: "-16%", y: "2%" },
  { src: "/deltrian/katalog/page-136.webp", r: "8deg", x: "16%", y: "1%" },
];

/** Download panel for the Deltrian catalogue. */
export default function DeltrianCatalogue({
  dict,
  flip,
}: {
  dict: Dictionary;
  flip?: boolean;
}) {
  const c = dict.deltrianPage.catalogue;

  return (
    <CatalogueShowcase
      href={CATALOGUE_HREF}
      eyebrow={c.eyebrow}
      heading={c.heading}
      lead={c.lead}
      meta={c.meta}
      download={c.download}
      open={c.open}
      contentsLabel={c.contentsLabel}
      pageAbbr={c.pageAbbr}
      contents={c.contents}
      cover={{ src: "/deltrian/katalog/cover.webp", alt: c.coverAlt }}
      pages={pages}
      flip={flip}
    />
  );
}
