import type { Metadata } from "next";
import Link from "next/link";
import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import CTABanner from "@/components/CTABanner";
import CatalogueCard from "@/components/CatalogueCard";
import CatalogueShowcase from "@/components/CatalogueShowcase";
import DeltrianCatalogue from "@/components/sections/DeltrianCatalogue";
import {
  formatFileSize,
  getFullCatalogue,
  getSectionCatalogues,
} from "@/data/catalogues";
import { routes } from "@/data/nav";
import { getProduct } from "@/data/products";
import {
  localeCodes,
  localeNames,
  localePath,
  localeTags,
  locales,
  resolveLocale,
} from "@/i18n/config";
import { alternatesFor, getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const { meta } = getDictionary(locale);
  return {
    title: meta.catalogues.title,
    description: meta.catalogues.description,
    alternates: alternatesFor(locale, routes.catalogues),
  };
}

export default async function KataloziPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const page = dict.cataloguesPage;
  const full = getFullCatalogue(locale);
  const sections = getSectionCatalogues(locale);
  // Each page lists only its own language's editions; the other set is one
  // link away.
  const otherLocale = locales.find((l) => l !== locale) ?? locale;

  return (
    <div className="pt-32">
      <section className="wrap">
        <span className="eyebrow">{page.eyebrow}</span>
        <SplitHeading
          as="h1"
          className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight text-ink-100 md:text-5xl"
        >
          {page.heading}
        </SplitHeading>
        <Reveal delay={0.15} className="mt-6 max-w-xl">
          <p className="text-base leading-relaxed text-ink-400">{page.lead}</p>
        </Reveal>
        <Reveal
          delay={0.2}
          className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-navy-700/80 px-3.5 py-1.5 text-xs font-medium text-ink-300">
            <span className="font-display font-bold text-orange-400">
              {localeCodes[locale]}
            </span>
            {page.languageNote}
          </span>
          <Link
            href={localePath(otherLocale, routes.catalogues)}
            hrefLang={localeTags[otherLocale]}
            lang={localeTags[otherLocale]}
            data-cursor="link"
            className="text-xs font-semibold text-ink-300 underline decoration-navy-500 underline-offset-4 transition-colors hover:text-orange-300 hover:decoration-orange-400"
          >
            {page.otherLanguage} →
          </Link>
        </Reveal>
      </section>

      {/* The complete catalogue first; its contents open the PDF on the
          page each section starts. */}
      <CatalogueShowcase
        id={full.slug}
        href={full.href}
        eyebrow={page.full.eyebrow}
        heading={page.full.heading}
        lead={page.full.lead}
        meta={[
          "PDF",
          formatFileSize(full.bytes, locale),
          page.pages(full.pages),
          localeNames[locale],
        ]}
        download={page.full.download}
        open={page.full.open}
        contentsLabel={page.full.contentsLabel}
        pageAbbr={page.pageAbbr}
        contents={sections.map((s) => ({
          title: s.title,
          page: s.startPage,
          href: full.pageHref(s.startPage),
        }))}
        cover={{ src: full.cover, alt: page.full.coverAlt }}
        pages={[
          { src: full.contentsPage, r: "-9deg", x: "-16%", y: "2%" },
          { src: full.opener, r: "8deg", x: "16%", y: "1%" },
        ]}
      />

      <section
        id="po-kategorijama"
        className="scroll-mt-24 bg-navy-900/30 py-28 md:py-36"
      >
        <div className="wrap">
          <span className="eyebrow">{page.sectionsEyebrow}</span>
          <SplitHeading
            as="h2"
            className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-ink-100 md:text-4xl"
          >
            {page.sectionsHeading}
          </SplitHeading>
          <Reveal delay={0.15} className="mt-6 max-w-lg">
            <p className="text-base leading-relaxed text-ink-400">
              {page.sectionsLead}
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {sections.map((catalogue, i) => (
              <Reveal
                key={catalogue.slug}
                delay={(i % 4) * 0.08}
                className="flex"
              >
                <CatalogueCard
                  catalogue={catalogue}
                  category={getProduct(locale, catalogue.slug)}
                  index={i}
                  locale={locale}
                  dict={dict}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The partner catalogue mirrors the YAFI panel so the two read as a
          pair rather than a repeat. */}
      <DeltrianCatalogue dict={dict} flip />

      <section className="pb-28 md:pb-36">
        <div className="wrap">
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
