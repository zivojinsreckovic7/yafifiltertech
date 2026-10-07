import { contact } from "@/data/contact";
import { getFullCatalogue, getSectionCatalogues } from "@/data/catalogues";
import { getIndustries } from "@/data/industries";
import { industryPath, productItemPath, productPath, routes } from "@/data/nav";
import { getProducts, primaryCategorySlug } from "@/data/products";
import { absoluteUrl } from "@/data/site";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/config";

/**
 * `/llms.txt` (https://llmstxt.org): a plain Markdown map of the site for
 * language models. Written in English with links to the English pages; the
 * Serbian page lives at the same path without `/en`. Built from the same data
 * as the pages, so new products and catalogues show up on their own.
 */

export const dynamic = "force-static";

const locale = "en";

function page(path: string) {
  return absoluteUrl(localePath(locale, path));
}

function link(title: string, url: string, note?: string) {
  return `- [${title}](${url})${note ? `: ${note}` : ""}`;
}

export function GET() {
  const { meta } = getDictionary(locale);
  const products = getProducts(locale);
  const fullCatalogue = getFullCatalogue(locale);

  const lines = [
    "# Yafi Filtertech",
    "",
    `> ${meta.description}`,
    "",
    `Yafi Filtertech is based in ${contact.city}, Serbia, makes air filters to measure and serves ${meta.areaServed.join(", ")}. ` +
      "The site is in Serbian (the primary language, at the root) and English (under `/en`); " +
      "every page exists in both languages at the same path.",
    "",
    `Contact: ${contact.email} · ${contact.phones.map((phone) => phone.label).join(" · ")} · ` +
      `${contact.street}, ${contact.postalCode} ${contact.city}, Serbia.`,
    "",
    "## Pages",
    "",
    link(meta.products.title, page(routes.products), meta.products.description),
    link(meta.catalogues.title, page(routes.catalogues), meta.catalogues.description),
    link(meta.industries.title, page(routes.industries), meta.industries.description),
    link(meta.deltrian.title, page(routes.deltrian), meta.deltrian.description),
    link(meta.about.title, page(routes.about), meta.about.description),
    link(meta.contact.title, page(routes.contact), meta.contact.description),
    "",
    "## Product categories",
    "",
    ...products.map((category) =>
      link(category.title ?? category.name, page(productPath(category.slug)), category.description)
    ),
    "",
    ...products.flatMap((category) =>
      category.items?.length
        ? [
            `## ${category.name}`,
            "",
            ...category.items.map((item) =>
              link(
                item.name,
                page(productItemPath(primaryCategorySlug(item.slug) ?? category.slug, item.slug)),
                item.sku ? `SKU ${item.sku}` : undefined
              )
            ),
            "",
          ]
        : []
    ),
    "## Industries",
    "",
    ...getIndustries(locale).map((industry) =>
      link(industry.name, page(industryPath(industry.slug)), industry.teaser)
    ),
    "",
    "## Catalogues (PDF)",
    "",
    link(fullCatalogue.title, absoluteUrl(fullCatalogue.href), `${fullCatalogue.pages} pages, the whole YAFI range`),
    ...getSectionCatalogues(locale).map((catalogue) =>
      link(catalogue.title, absoluteUrl(catalogue.href), `${catalogue.pages} pages`)
    ),
    link(
      "Deltrian catalogue 2026",
      absoluteUrl("/documents/deltrian-ceo-katalog.pdf"),
      "the official Deltrian “Filtration, solutions and products 2026” catalogue"
    ),
    "",
    "## Optional",
    "",
    link("Serbian homepage", absoluteUrl("/")),
    link("Sitemap", absoluteUrl("/sitemap.xml"), "every page in both languages"),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
