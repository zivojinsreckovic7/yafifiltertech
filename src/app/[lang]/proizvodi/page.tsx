import Link from "next/link";
import type { Metadata } from "next";
import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import ProductSearch from "@/components/ProductSearch";
import TrustSignals from "@/components/TrustSignals";
import CTABanner from "@/components/CTABanner";
import { getProducts } from "@/data/products";
import { routes } from "@/data/nav";
import { localePath, resolveLocale } from "@/i18n/config";
import { alternatesFor, getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const { meta } = getDictionary(locale);
  return {
    title: meta.products.title,
    description: meta.products.description,
    alternates: alternatesFor(locale, routes.products),
  };
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default async function ProizvodiPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const page = dict.productsPage;

  const query = await searchParams;
  const rawQuery = Array.isArray(query.q) ? query.q[0] ?? "" : query.q ?? "";
  const q = normalize(rawQuery);

  const productCategories = getProducts(locale);
  const results = q
    ? productCategories.filter((p) => {
        const haystack = normalize(
          [p.name, p.class, p.description, ...p.keywords].join(" ")
        );
        return haystack.includes(q);
      })
    : productCategories;

  return (
    <div className="pt-32">
      <section className="wrap pb-16">
        <span className="eyebrow">{page.eyebrow}</span>
        <SplitHeading
          as="h1"
          className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight text-ink-100 md:text-5xl"
        >
          {page.heading}
        </SplitHeading>
        <Reveal delay={0.15} className="mt-6 max-w-lg">
          <p className="text-base leading-relaxed text-ink-400">{page.lead}</p>
        </Reveal>
        <Reveal delay={0.25} className="mt-8 max-w-xl">
          <ProductSearch
            action={localePath(locale, routes.products)}
            placeholder={dict.search.placeholder}
            submitLabel={dict.search.submit}
          />
        </Reveal>
        <Reveal delay={0.35}>
          <TrustSignals dict={dict} className="mt-6" />
        </Reveal>
      </section>

      <section className="wrap pb-28 md:pb-36">
        {q && (
          <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-ink-400">
            <span>
              {results.length > 0
                ? page.resultsFor(rawQuery)
                : page.noResults(rawQuery)}
            </span>
            <Link
              href={localePath(locale, routes.products)}
              className="text-orange-400 hover:text-orange-300"
            >
              {page.showAll}
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <ProductCard product={p} index={i} locale={locale} dict={dict} />
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <CTABanner
            locale={locale}
            dict={dict}
            title={page.ctaTitle}
            text={page.ctaText}
            action={page.ctaAction}
          />
        </div>
      </section>
    </div>
  );
}
