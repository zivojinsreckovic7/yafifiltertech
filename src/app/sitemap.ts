import type { MetadataRoute } from "next";
import { defaultLocale, localePath, locales, localeTags } from "@/i18n/config";
import { industryPath, productItemPath, productPath, routes } from "@/data/nav";
import { industrySlugs } from "@/data/industries";
import { primaryCategorySlug, productItemParams, productSlugs } from "@/data/products";
import { absoluteUrl } from "@/data/site";

/**
 * Every indexable page, once per locale, with the same hreflang set the page
 * declares in its `<head>` (`alternatesFor`). Variants listed under two
 * categories appear only at their canonical URL.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...Object.values(routes),
    ...industrySlugs.map(industryPath),
    ...productSlugs.map(productPath),
    ...productItemParams
      .filter(({ slug, item }) => primaryCategorySlug(item) === slug)
      .map(({ slug, item }) => productItemPath(slug, item)),
  ];

  return paths.flatMap((path) => {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[localeTags[locale]] = absoluteUrl(localePath(locale, path));
    }
    languages["x-default"] = absoluteUrl(localePath(defaultLocale, path));

    return locales.map((locale) => ({
      url: absoluteUrl(localePath(locale, path)),
      alternates: { languages },
    }));
  });
}
