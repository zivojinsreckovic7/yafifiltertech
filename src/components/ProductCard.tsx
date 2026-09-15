import Image from "next/image";
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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy-700/70 bg-navy-900/60 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-orange-500/50 hover:bg-navy-800/80 scroll-mt-32"
    >
      <div className="card-grid-line pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Product shots are square cut-outs on white, so the plate is white and
          the photo is contained rather than cropped — margins differ per shot
          and a fixed crop would clip the taller ones (rolls, bag filters). */}
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-navy-700/60 ${
          product.image ? "bg-white" : "bg-navy-950/50"
        }`}
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1440px) 400px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
            className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <>
            <div className="card-grid-line pointer-events-none absolute inset-0 opacity-60" />
            <div className="flex h-full items-center justify-center">
              <PleatIcon className="h-10 w-10 opacity-25" />
            </div>
          </>
        )}
        {typeof index === "number" && (
          <span className="absolute right-3 top-3 rounded-full border border-navy-700 bg-navy-900 px-2.5 py-1 font-display text-xs leading-none text-ink-300">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      <div className="relative mt-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-orange-400">
          {product.class}
        </span>
        <h3 className="mt-2 font-display text-xl font-bold text-ink-100">
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

      {/* `mt-auto` keeps the call to action on the baseline across the row. */}
      <div className="relative mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-ink-200 transition-colors group-hover:text-orange-300">
        {dict.productCard.cta}
        <span className="transition-transform duration-500 group-hover:translate-x-1.5">
          →
        </span>
      </div>
    </Link>
  );
}
