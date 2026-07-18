import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import PleatIcon from "@/components/PleatIcon";
import MiniQuote from "@/components/MiniQuote";
import CTABanner from "@/components/CTABanner";
import { industries, getIndustry } from "@/data/industries";
import { productCategories } from "@/data/products";
import { testimonials } from "@/data/testimonials";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return {
    title: industry.name,
    description: industry.teaser,
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const relatedFilters = productCategories.filter((p) =>
    industry.filters.includes(p.slug)
  );

  return (
    <div className="pt-32">
      <section className="wrap pb-16">
        <Link
          href="/industrije"
          className="text-sm font-medium text-ink-400 transition-colors hover:text-orange-300"
        >
          ← Sve industrije
        </Link>
        <span className="eyebrow mt-6 block">{industry.eyebrow}</span>
        <SplitHeading
          as="h1"
          className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight text-ink-100 md:text-5xl"
        >
          {industry.name}
        </SplitHeading>
      </section>

      <section className="wrap pb-20 md:pb-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Reveal className="rounded-2xl border border-navy-700/70 bg-navy-900/50 p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-ink-400">
              Izazov
            </span>
            <p className="mt-4 text-base leading-relaxed text-ink-200">
              {industry.challenge}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-2xl border border-orange-500/30 bg-navy-900/50 p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-400">
              Rešenje
            </span>
            <p className="mt-4 text-base leading-relaxed text-ink-200">
              {industry.solution}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {industry.points.map((point) => (
            <div
              key={point}
              className="rounded-xl border border-navy-700/60 bg-navy-950/40 p-5 text-sm leading-relaxed text-ink-300"
            >
              {point}
            </div>
          ))}
        </Reveal>
      </section>

      {relatedFilters.length > 0 && (
        <section className="wrap pb-28 md:pb-36">
          <Reveal>
            <span className="eyebrow">Preporučeni filteri</span>
            <h2 className="mt-4 font-display text-2xl font-extrabold text-ink-100 md:text-3xl">
              Rešenja koja koristimo za {industry.shortAcc}
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {relatedFilters.map((p, index) => (
              <Reveal key={p.slug} delay={index * 0.07}>
                <Link
                  href={`/proizvodi#${p.slug}`}
                  data-cursor="link"
                  className="group block h-full rounded-2xl border border-navy-700/70 bg-navy-900/50 p-6 transition-colors hover:border-orange-500/50"
                >
                  <PleatIcon className="h-8 w-8" />
                  <h3 className="mt-4 font-display text-lg font-extrabold text-ink-100">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-widest text-orange-400">
                    {p.class}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="wrap pb-28 md:pb-36">
        <Reveal className="max-w-xl">
          <MiniQuote
            t={
              testimonials[
                industries.findIndex((i) => i.slug === slug) %
                  testimonials.length
              ]
            }
          />
        </Reveal>
        <div className="mt-10">
          <CTABanner
            title={`Zatražite ponudu za ${industry.shortAcc}`}
            text={`Recite nam više o objektu i procesu — pripremamo predlog rešenja prilagođen ${industry.shortDat}, u roku od 24 časa.`}
          />
        </div>
      </section>
    </div>
  );
}
