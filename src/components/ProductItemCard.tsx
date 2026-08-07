import Link from "next/link";
import ProductMedia from "@/components/ProductMedia";
import type { ProductItem } from "@/data/products";
import { productItemPath } from "@/data/nav";
import { localePath, type Locale } from "@/i18n/config";

/**
 * One variant in a range grid — used both by the category page and by the
 * siblings row on a variant page, so the two stay in step.
 */
export default function ProductItemCard({
  item,
  categorySlug,
  locale,
  /** Shown when the variant carries no lead of its own. */
  fallback,
  cta,
}: {
  item: ProductItem;
  categorySlug: string;
  locale: Locale;
  fallback: string;
  cta: string;
}) {
  return (
    <Link
      href={localePath(locale, productItemPath(categorySlug, item.slug))}
      data-cursor="link"
      className="group flex h-full flex-col rounded-2xl border border-navy-700/70 bg-navy-900/50 p-5 transition-colors hover:border-orange-500/50"
    >
      <ProductMedia src={item.image} alt={item.name} />
      <span className="mt-5 text-xs font-semibold uppercase tracking-widest text-orange-400">
        {item.label}
      </span>
      <h3 className="mt-2 font-display text-base font-extrabold leading-snug text-ink-100">
        {item.name}
      </h3>
      {/* Catalogue leads run to a paragraph; the card shows the opening of it. */}
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-400">
        {item.intro ?? fallback}
      </p>
      {/* `mt-auto` keeps the call to action on the baseline across the row. */}
      <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-ink-200 transition-colors group-hover:text-orange-300">
        {cta}
        <span className="transition-transform duration-500 group-hover:translate-x-1.5">
          →
        </span>
      </span>
    </Link>
  );
}
