import Image from "next/image";
import Link from "next/link";
import { DownloadIcon } from "@/components/DownloadIcon";
import { formatFileSize, type SectionCatalogue } from "@/data/catalogues";
import { productPath } from "@/data/nav";
import type { ProductCategory } from "@/data/products";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * One category catalogue: its cover and first product sheet stand in front of
 * the section's opener photo, then title, meta and the two file actions. Not
 * a link as a whole — it carries three separate destinations.
 */
export default function CatalogueCard({
  catalogue,
  category,
  index,
  locale,
  dict,
}: {
  catalogue: SectionCatalogue;
  /** The matching product range, for its class line and page link. */
  category?: ProductCategory;
  index: number;
  locale: Locale;
  dict: Dictionary;
}) {
  const page = dict.cataloguesPage;
  const size = formatFileSize(catalogue.bytes, locale);

  return (
    <article
      id={catalogue.slug}
      className="catalogue-card group relative flex h-full w-full scroll-mt-36 md:scroll-mt-40 flex-col overflow-hidden rounded-2xl border border-navy-700/70 bg-navy-900/60 transition-[transform,border-color,background-color] duration-500 hover:-translate-y-1.5 hover:border-orange-500/50 hover:bg-navy-800/80"
    >
      {/* Photo and pages are decorative — the title says what this is. */}
      <div
        aria-hidden="true"
        className="relative aspect-[4/3] overflow-hidden border-b border-navy-700/60 bg-navy-950"
      >
        <Image
          src={catalogue.photo}
          alt=""
          fill
          sizes="(min-width: 1440px) 340px, (min-width: 1280px) 24vw, (min-width: 640px) 46vw, 92vw"
          className="catalogue-card__photo object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(var(--veil-rgb),0.08) 0%, rgba(var(--veil-rgb),0.28) 55%, rgba(var(--veil-rgb),0.7) 100%)",
          }}
        />

        <div className="catalogue-card__stack">
          <div
            className="catalogue-card__page"
            style={{ "--r": "7deg", "--x": "20%" } as React.CSSProperties}
          >
            <Image
              src={catalogue.page}
              alt=""
              fill
              sizes="(min-width: 1280px) 170px, (min-width: 640px) 22vw, 44vw"
              className="object-cover"
            />
          </div>
          <div
            className="catalogue-card__page"
            style={{ "--r": "-3deg", "--x": "-6%" } as React.CSSProperties}
          >
            <Image
              src={catalogue.cover}
              alt=""
              fill
              sizes="(min-width: 1280px) 170px, (min-width: 640px) 22vw, 44vw"
              className="object-cover"
            />
          </div>
        </div>

        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-navy-950/80 px-2.5 py-1 font-display text-xs leading-none text-ink-200">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col p-6">
        {category && (
          <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-orange-400">
            {category.class}
          </span>
        )}
        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-ink-100">
          {catalogue.title}
        </h3>
        <p className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-ink-400">
          <span>PDF</span>
          <span className="h-1 w-1 rounded-full bg-orange-500/60" aria-hidden="true" />
          <span>{page.pages(catalogue.pages)}</span>
          <span className="h-1 w-1 rounded-full bg-orange-500/60" aria-hidden="true" />
          <span>{size}</span>
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          <a
            href={catalogue.href}
            download
            data-cursor="link"
            aria-label={page.card.downloadLabel(catalogue.title, size)}
            className="btn btn-primary btn-sm"
          >
            {page.card.download}
            <DownloadIcon className="h-3.5 w-3.5" />
          </a>
          <a
            href={catalogue.href}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            aria-label={page.card.openLabel(catalogue.title)}
            className="btn btn-ghost btn-sm"
          >
            {page.card.open}
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        {category && (
          <Link
            href={localePath(locale, productPath(category.slug))}
            data-cursor="link"
            className="mt-5 flex items-center justify-between gap-3 border-t border-navy-700/70 pt-4 text-xs font-semibold text-ink-300 transition-colors hover:text-orange-300"
          >
            {page.card.products}
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  );
}
