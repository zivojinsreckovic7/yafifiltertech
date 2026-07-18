import type { Metadata } from "next";
import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import QuoteForm from "@/components/QuoteForm";
import ContactRow from "@/components/ContactRow";
import MiniQuote from "@/components/MiniQuote";
import TrustSignals from "@/components/TrustSignals";
import { testimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Zatražite ponudu za industrijsku filtraciju vazduha. Recite nam više o objektu i sistemu ventilacije — vraćamo se sa predlogom rešenja.",
};

export default function KontaktPage() {
  return (
    <div className="pt-32">
      <section className="wrap pb-16">
        <span className="eyebrow">Kontakt</span>
        <SplitHeading
          as="h1"
          className="mt-4 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink-100 md:text-5xl"
        >
          Razgovarajmo o vašem sistemu ventilacije.
        </SplitHeading>
        <Reveal delay={0.15} className="mt-6 max-w-lg">
          <p className="text-base leading-relaxed text-ink-400">
            Pošaljite nam osnovne podatke o objektu i tipu ventilacionog
            sistema — vraćamo se sa predlogom rešenja i ponudom usklađenom
            sa vašim procesom, bilo da je u pitanju Deltrian program ili
            druga kategorija filtera.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <TrustSignals className="mt-6" />
        </Reveal>
      </section>

      <section className="wrap pb-28 md:pb-36">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <span className="eyebrow">Zašto nam pisati</span>
            <SplitHeading
              as="h2"
              className="mt-4 font-display text-2xl font-extrabold text-ink-100 md:text-3xl"
            >
              Odgovor sa konkretnim predlogom, ne generičkim katalogom.
            </SplitHeading>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink-400">
                Svaki upit prolazi kroz kratku analizu objekta i procesa
                pre nego što predložimo klasu i tip filtera — tako da
                ponuda koju dobijete odgovara stvarnim uslovima, ne samo
                cenovniku.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10 flex flex-col gap-6">
              <ContactRow
                label="Email"
                value="info@yafi.co.rs"
                href="mailto:info@yafi.co.rs"
              />
              <ContactRow
                label="Telefon"
                value="+381 00 000 0000"
                href="tel:+381000000000"
              />
              <ContactRow label="Radno vreme" value="Pon–Pet, 08–16h" />
              <ContactRow label="Region" value="Srbija · Ex-Yu tržište" />
            </Reveal>
            <Reveal delay={0.3} className="mt-10">
              <MiniQuote t={testimonials[1]} />
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <QuoteForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
