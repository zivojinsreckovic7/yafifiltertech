import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import IndustryCard from "@/components/IndustryCard";
import { getIndustries } from "@/data/industries";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export default function IndustriesSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const section = dict.industriesSection;

  return (
    <section className="relative py-28 md:py-36">
      <div className="wrap">
        <span className="eyebrow">{section.eyebrow}</span>
        <SplitHeading
          as="h2"
          className="mt-4 max-w-2xl font-display text-3xl font-extrabold leading-tight text-ink-100 md:text-4xl"
        >
          {section.heading}
        </SplitHeading>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {getIndustries(locale).map((ind, i) => (
            <Reveal key={ind.slug} delay={(i % 2) * 0.1}>
              <IndustryCard industry={ind} locale={locale} dict={dict} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
