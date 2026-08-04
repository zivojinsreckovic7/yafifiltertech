import type { Metadata } from "next";
import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import QuoteForm from "@/components/QuoteForm";
import ContactRow from "@/components/ContactRow";
import MiniQuote from "@/components/MiniQuote";
import TrustSignals from "@/components/TrustSignals";
import { getTestimonials } from "@/data/testimonials";
import { getProducts } from "@/data/products";
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
    title: meta.contact.title,
    description: meta.contact.description,
    alternates: alternatesFor(locale, routes.contact),
  };
}

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const page = dict.contactPage;
  const rows = dict.contactRows;

  return (
    <div className="pt-32">
      <section className="wrap pb-16">
        <span className="eyebrow">{page.eyebrow}</span>
        <SplitHeading
          as="h1"
          className="mt-4 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink-100 md:text-5xl"
        >
          {page.heading}
        </SplitHeading>
        <Reveal delay={0.15} className="mt-6 max-w-lg">
          <p className="text-base leading-relaxed text-ink-400">{page.lead}</p>
        </Reveal>
        <Reveal delay={0.25}>
          <TrustSignals dict={dict} className="mt-6" />
        </Reveal>
      </section>

      <section className="wrap pb-28 md:pb-36">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <span className="eyebrow">{page.whyEyebrow}</span>
            <SplitHeading
              as="h2"
              className="mt-4 font-display text-2xl font-extrabold text-ink-100 md:text-3xl"
            >
              {page.whyHeading}
            </SplitHeading>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink-400">
                {page.whyText}
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10 flex flex-col gap-6">
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
              <ContactRow label={rows.hours} value={rows.hoursValue} />
              <ContactRow label={rows.region} value={rows.regionValue} />
            </Reveal>
            <Reveal delay={0.3} className="mt-10">
              <MiniQuote
                t={getTestimonials(locale)[1]}
                marks={dict.quoteMarks}
              />
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
    </div>
  );
}
