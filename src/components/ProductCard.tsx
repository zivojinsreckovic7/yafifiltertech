import Link from "next/link";
import PleatIcon from "./PleatIcon";
import type { ProductCategory } from "@/data/products";
import { productPath } from "@/data/nav";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export default function ProductCard({
  product,
  index,
  locale,
  dict,
}: {
  product: ProductCategory;
  index?: number;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <Link
      href={localePath(locale, productPath(product.slug))}
      id={product.slug}
      data-cursor="link"
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-navy-700/70 bg-navy-900/60 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-orange-500/50 hover:bg-navy-800/80 scroll-mt-32"
    >
      <div className="card-grid-line pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between">
        <PleatIcon className="h-10 w-10 shrink-0 transition-transform duration-500 group-hover:scale-110" />
        {typeof index === "number" && (
          <span className="font-display text-xs text-ink-400">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      <div className="relative mt-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-orange-400">
          {product.class}
        </span>
        <h3 className="mt-2 font-display text-xl font-extrabold text-ink-100">
          {product.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-400">
          {product.description}
        </p>
        {/* Capped so cards stay level — the category page lists them all. */}
        <ul className="mt-5 flex flex-wrap gap-2">
          {product.applications.slice(0, 3).map((a) => (
            <li
              key={a}
              className="rounded-full border border-navy-600 px-3 py-1 text-xs text-ink-300"
            >
              {a}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-6 flex items-center gap-2 text-sm font-semibold text-ink-200 transition-colors group-hover:text-orange-300">
        {dict.productCard.cta}
        <span className="transition-transform duration-500 group-hover:translate-x-1.5">
          →
        </span>
      </div>
    </Link>
  );
}
