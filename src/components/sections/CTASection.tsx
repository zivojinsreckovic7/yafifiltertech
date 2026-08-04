import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import QuoteForm from "@/components/QuoteForm";
import ContactRow from "@/components/ContactRow";
import TrustSignals from "@/components/TrustSignals";
import { getProducts } from "@/data/products";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export default function CTASection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const section = dict.ctaSection;
  const rows = dict.contactRows;

  return (
    <section id="kontakt" className="relative overflow-hidden py-28 md:py-36 scroll-mt-24">
      <div
        className="pointer-events-none absolute -right-80 top-1/4 -mt-48 h-[44rem] w-[44rem]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--orange-500) 10%, transparent), color-mix(in srgb, var(--orange-500) 4%, transparent) 55%, transparent)",
        }}
      />
      <div className="wrap grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <span className="eyebrow">{section.eyebrow}</span>
          <SplitHeading
            as="h2"
            className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink-100 md:text-4xl"
          >
            {section.heading}
          </SplitHeading>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-400">
              {section.lead}
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 flex flex-col gap-6">
            <ContactRow
              label={rows.email}
              value="info@yafi.co.rs"
              href="mailto:info@yafi.co.rs"
            />
            <ContactRow
              label={rows.phone}
              value="+381 00 000 0000"
              href="tel:+381000000000"
            />
            <ContactRow label={rows.region} value={rows.regionValue} />
          </Reveal>
          <Reveal delay={0.3}>
            <TrustSignals dict={dict} className="mt-10" />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <QuoteForm
            dict={dict.quoteForm}
            productNames={getProducts(locale).map((p) => p.name)}
          />
        </Reveal>
      </div>
    </section>
  );
}
