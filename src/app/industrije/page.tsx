import type { Metadata } from "next";
import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import IndustryCard from "@/components/IndustryCard";
import CTABanner from "@/components/CTABanner";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industrije",
  description:
    "Namenska rešenja filtracije vazduha za farmaceutsku industriju, hotelijerstvo, auto-industriju i aerodrome.",
};

export default function IndustrijePage() {
  return (
    <div className="pt-32">
      <section className="wrap pb-16">
        <span className="eyebrow">Industrije</span>
        <SplitHeading
          as="h1"
          className="mt-4 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink-100 md:text-5xl"
        >
          Rešenja namenjena specifičnim zahtevima svake industrije.
        </SplitHeading>
        <Reveal delay={0.15} className="mt-6 max-w-lg">
          <p className="text-base leading-relaxed text-ink-400">
            Svaka industrija ima drugačiji standard čistoće vazduha,
            protoke i budžetska ograničenja. Predlažemo rešenja polazeći
            od procesa, ne od kataloga.
          </p>
        </Reveal>
      </section>

      <section className="wrap pb-28 md:pb-36">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={(i % 2) * 0.1}>
              <IndustryCard industry={ind} />
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <CTABanner
            title="Vaša industrija nije na listi?"
            text="Radimo i van navedenih niša — pošaljite nam zahteve procesa i standard čistoće koji morate da ispunite, a mi predlažemo rešenje."
          />
        </div>
      </section>
    </div>
  );
}
