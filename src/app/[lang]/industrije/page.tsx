import type { Metadata } from "next";
import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import IndustryCard from "@/components/IndustryCard";
import CTABanner from "@/components/CTABanner";
import { getIndustries } from "@/data/industries";
import { routes } from "@/data/nav";
import { resolveLocale } from "@/i18n/config";
import { alternatesFor, getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const { meta } = getDictionary(locale);
  return {
    title: meta.industries.title,
    description: meta.industries.description,
    alternates: alternatesFor(locale, routes.industries),
  };
}

export default async function IndustrijePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const page = dict.industriesPage;

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
      </section>

      <section className="wrap pb-28 md:pb-36">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {getIndustries(locale).map((ind, i) => (
            <Reveal key={ind.slug} delay={(i % 2) * 0.1}>
              <IndustryCard industry={ind} locale={locale} dict={dict} />
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <CTABanner
            locale={locale}
            dict={dict}
            title={page.ctaTitle}
            text={page.ctaText}
          />
        </div>
      </section>
    </div>
  );
}
