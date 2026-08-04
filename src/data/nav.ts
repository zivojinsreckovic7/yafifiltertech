/**
 * Locale-agnostic route paths. Run every one through `localePath(locale, path)`
 * before using it as an href — labels come from the dictionary.
 */
export const routes = {
  home: "/",
  products: "/proizvodi",
  industries: "/industrije",
  about: "/#o-nama",
  deltrian: "/deltrian",
  contact: "/kontakt",
} as const;

export function industryPath(slug: string) {
  return `${routes.industries}/${slug}`;
}

export function productPath(slug: string) {
  return `${routes.products}/${slug}`;
}

/** Detail page for one variant, nested under the category it belongs to. */
export function productItemPath(categorySlug: string, itemSlug: string) {
  return `${productPath(categorySlug)}/${itemSlug}`;
}
