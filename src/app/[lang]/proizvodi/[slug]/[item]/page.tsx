import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import ProductMedia from "@/components/ProductMedia";
import TrustSignals from "@/components/TrustSignals";
import CTABanner from "@/components/CTABanner";
import { MagneticLink } from "@/components/Magnetic";
import {
  getProductItem,
  getSiblingItems,
  primaryCategorySlug,
  productItemParams,
} from "@/data/products";
import { productItemPath, productPath, routes } from "@/data/nav";
import { localePath, resolveLocale } from "@/i18n/config";
import { alternatesFor, getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return productItemParams;
}

/**
 * Canonical path for a variant. Variants listed under two categories are
 * reachable at both URLs, so both point at the one the catalogue considers
 * primary — see `primaryCategorySlug`.
 */
function canonicalPath(categorySlug: string, itemSlug: string) {
  return productItemPath(primaryCategorySlug(itemSlug) ?? categorySlug, itemSlug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string; item: string }>;
}): Promise<Metadata> {
  const { lang, slug, item } = await params;
  const locale = resolveLocale(lang);
  const found = getProductItem(locale, slug, item);
  if (!found) return {};
  return {
    title: found.item.name,
    description: found.item.intro ?? found.category.description,
    alternates: alternatesFor(locale, canonicalPath(slug, item)),
  };
}

export default async function ProductItemPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string; item: string }>;
}) {
  const { lang, slug, item: itemSlug } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);
  const page = dict.productItemPage;

  const found = getProductItem(locale, slug, itemSlug);
  if (!found) notFound();
  const { category, item } = found;

  const highlights = item.highlights ?? [];
  const specs = item.specs ?? [];
  const standards = item.standards ?? category.standards ?? [];
  const siblings = getSiblingItems(locale, slug, itemSlug);

  return (
    <div className="pt-32">
      <section className="wrap pb-16 md:pb-20">
        <nav aria-label="breadcrumb" className="text-sm text-ink-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href={localePath(locale, routes.home)}
                className="transition-colors hover:text-orange-300"
              >
                {page.breadcrumbHome}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={localePath(locale, routes.products)}
                className="transition-colors hover:text-orange-300"
              >
                {dict.nav.products}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={localePath(locale, productPath(category.slug))}
                className="transition-colors hover:text-orange-300"
              >
                {category.name}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink-200">
              {item.name}
            </li>
          </ol>
        </nav>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: media. Sticks while the copy column scrolls on desktop. */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <ProductMedia
              src={item.image}
              alt={item.name}
              sizes="(min-width: 1024px) 46vw, 92vw"
              priority
            />
          </Reveal>

          {/* Right: everything else. Blocks render only when the data file
              supplies them, so a bare variant still produces a full page. */}
          <div>
            <span className="eyebrow block">{item.label}</span>
            <SplitHeading
              as="h1"
              className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink-100 md:text-4xl"
            >
              {item.name}
            </SplitHeading>

            <Reveal delay={0.1} className="mt-6">
              <p className="text-base leading-relaxed text-ink-400">
                {item.intro ?? category.intro ?? category.description}
              </p>
            </Reveal>

            {highlights.length > 0 && (
              <Reveal delay={0.15} className="mt-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                  {page.highlightsEyebrow}
                </span>
                <ul className="mt-4 flex flex-col gap-3">
                  {highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-base text-ink-200"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {specs.length > 0 && (
              <Reveal delay={0.2} className="mt-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                  {page.specsEyebrow}
                </span>
                <dl className="mt-4 divide-y divide-navy-800 border-y border-navy-800">
                  {specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex flex-wrap items-baseline justify-between gap-4 py-3"
                    >
                      <dt className="text-sm text-ink-400">{spec.label}</dt>
                      <dd className="text-sm font-medium text-ink-200">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}

            {standards.length > 0 && (
              <Reveal delay={0.25} className="mt-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                  {page.standardsEyebrow}
                </span>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {standards.map((standard) => (
                    <li
                      key={standard}
                      className="rounded-full border border-navy-600 px-4 py-1.5 text-xs font-medium text-ink-300"
                    >
                      {standard}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <Reveal delay={0.3} className="mt-10">
              <div className="flex flex-wrap items-center gap-4">
                <MagneticLink
                  href={localePath(locale, routes.contact)}
                  className="btn-primary"
                >
                  {page.quote}
                </MagneticLink>
                <Link
                  href={localePath(locale, productPath(category.slug))}
                  className="text-sm font-medium text-ink-400 transition-colors hover:text-orange-300"
                >
                  {page.back(category.name)}
                </Link>
              </div>
              <TrustSignals dict={dict} className="mt-6" />
            </Reveal>
          </div>
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="wrap pb-24 md:pb-28">
          <Reveal>
            <span className="eyebrow">{page.siblingsEyebrow}</span>
            <h2 className="mt-4 font-display text-2xl font-extrabold text-ink-100 md:text-3xl">
              {page.siblingsHeading}
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {siblings.map((sibling, i) => (
              <Reveal key={sibling.slug} delay={(i % 4) * 0.07}>
                <Link
                  href={localePath(
                    locale,
                    productItemPath(category.slug, sibling.slug)
                  )}
                  data-cursor="link"
                  className="group flex h-full flex-col rounded-2xl border border-navy-700/70 bg-navy-900/50 p-5 transition-colors hover:border-orange-500/50"
                >
                  <ProductMedia src={sibling.image} alt={sibling.name} />
                  <span className="mt-5 text-xs font-semibold uppercase tracking-widest text-orange-400">
                    {sibling.label}
                  </span>
                  <h3 className="mt-2 font-display text-base font-extrabold leading-snug text-ink-100">
                    {sibling.name}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="wrap pb-28 md:pb-36">
        <CTABanner
          locale={locale}
          dict={dict}
          title={page.ctaTitle(item.name)}
          text={page.ctaText}
        />
      </section>
    </div>
  );
}
