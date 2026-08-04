import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import PleatIcon from "@/components/PleatIcon";
import ProductMedia from "@/components/ProductMedia";
import ProductGroupTabs from "@/components/ProductGroupTabs";
import TrustSignals from "@/components/TrustSignals";
import CTABanner from "@/components/CTABanner";
import {
  getProduct,
  getProducts,
  productSlugs,
  type ProductItem,
} from "@/data/products";
import { productItemPath, productPath, routes } from "@/data/nav";
import { localePath, resolveLocale, type Locale } from "@/i18n/config";
import { alternatesFor, getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

/**
 * Splits variants into their families, preserving the order each family first
 * appears in. Categories whose items carry no `group` come back as one
 * unlabelled block, so short ranges still render as a plain grid.
 */
function ItemGrid({
  items,
  locale,
  categorySlug,
}: {
  items: ProductItem[];
  locale: Locale;
  categorySlug: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <Reveal key={item.slug} delay={(i % 4) * 0.07}>
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
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

function groupItems(items: ProductItem[]) {
  const blocks: { group: string; items: ProductItem[] }[] = [];
  for (const item of items) {
    const group = item.group ?? "";
    const current = blocks.find((block) => block.group === group);
    if (current) current.items.push(item);
    else blocks.push({ group, items: [item] });
  }
  return blocks;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const category = getProduct(locale, slug);
  if (!category) return {};
  return {
    title: category.title ?? category.name,
    description: category.intro ?? category.description,
    alternates: alternatesFor(locale, productPath(slug)),
  };
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);
  const page = dict.productPage;

  const category = getProduct(locale, slug);
  if (!category) notFound();

  const items = category.items ?? [];
  const blocks = groupItems(items);
  const grouped = blocks.some((block) => block.group !== "");
  const standards = category.standards ?? [];
  const related = getProducts(locale).filter((c) => c.slug !== slug);

  return (
    <div className="pt-32">
      <section className="wrap pb-16">
        <Link
          href={localePath(locale, routes.products)}
          className="text-sm font-medium text-ink-400 transition-colors hover:text-orange-300"
        >
          {page.back}
        </Link>
        <span className="eyebrow mt-6 block">{category.class}</span>
        <SplitHeading
          as="h1"
          className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight text-ink-100 md:text-5xl"
        >
          {category.title ?? category.name}
        </SplitHeading>
        <Reveal delay={0.15} className="mt-6 max-w-2xl">
          <p className="text-base leading-relaxed text-ink-400">
            {category.intro ?? category.description}
          </p>
        </Reveal>

        {standards.length > 0 && (
          <Reveal delay={0.2} className="mt-8">
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

        <Reveal delay={0.3}>
          <TrustSignals dict={dict} className="mt-8" />
        </Reveal>
      </section>

      {items.length > 0 && (
        <section className="wrap pb-24 md:pb-28">
          <Reveal>
            <span className="eyebrow">{page.rangeEyebrow}</span>
            <h2 className="mt-4 font-display text-2xl font-extrabold text-ink-100 md:text-3xl">
              {page.rangeHeading}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-400">
              {page.rangeLead}
            </p>
          </Reveal>

          {grouped ? (
            <ProductGroupTabs
              label={page.groupsLabel}
              tabs={blocks.map((block) => ({
                label: block.group,
                count: block.items.length,
              }))}
              panels={blocks.map((block) => (
                <ItemGrid
                  key={block.group}
                  items={block.items}
                  locale={locale}
                  categorySlug={slug}
                />
              ))}
            />
          ) : (
            <div className="mt-12">
              <ItemGrid
                items={blocks[0].items}
                locale={locale}
                categorySlug={slug}
              />
            </div>
          )}
        </section>
      )}

      <section className="wrap pb-24 md:pb-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <span className="eyebrow">{page.applicationsEyebrow}</span>
            <h2 className="mt-4 font-display text-2xl font-extrabold text-ink-100 md:text-3xl">
              {page.applicationsHeading}
            </h2>
            <Reveal delay={0.1}>
              <ul className="mt-7 flex flex-col gap-4">
                {category.applications.map((application) => (
                  <li
                    key={application}
                    className="flex items-center gap-3 border-b border-navy-800 pb-4 text-base text-ink-200"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                    {application}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal
            delay={0.15}
            className="self-start rounded-2xl border border-navy-700/70 bg-navy-900/50 p-8"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-400">
              {category.class}
            </span>
            <p className="mt-4 text-base leading-relaxed text-ink-200">
              {category.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="wrap pb-24 md:pb-28">
        <Reveal>
          <span className="eyebrow">{page.relatedEyebrow}</span>
          <h2 className="mt-4 font-display text-2xl font-extrabold text-ink-100 md:text-3xl">
            {page.relatedHeading}
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 4) * 0.05}>
              <Link
                href={localePath(locale, productPath(c.slug))}
                data-cursor="link"
                className="group flex h-full flex-col justify-between rounded-2xl border border-navy-700/70 bg-navy-950/50 p-6 transition-colors hover:border-orange-500/50"
              >
                <PleatIcon className="h-8 w-8 transition-transform duration-500 group-hover:scale-110" />
                <div className="mt-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-orange-400">
                    {c.class}
                  </span>
                  <h3 className="mt-2 font-display text-base font-extrabold leading-snug text-ink-100">
                    {c.name}
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap pb-28 md:pb-36">
        <CTABanner
          locale={locale}
          dict={dict}
          title={page.ctaTitle(category.nameAcc)}
          text={page.ctaText}
        />
      </section>
    </div>
  );
}
