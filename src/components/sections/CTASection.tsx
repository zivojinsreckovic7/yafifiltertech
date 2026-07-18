import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import QuoteForm from "@/components/QuoteForm";
import ContactRow from "@/components/ContactRow";
import TrustSignals from "@/components/TrustSignals";

export default function CTASection() {
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
          <span className="eyebrow">Zatražite ponudu</span>
          <SplitHeading
            as="h2"
            className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink-100 md:text-4xl"
          >
            Spremni da unapredite kvalitet vazduha?
          </SplitHeading>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-400">
              Pošaljite nam osnovne podatke o objektu i tipu ventilacionog
              sistema — vraćamo se sa predlogom rešenja i ponudom
              usklađenom sa vašim procesom.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 flex flex-col gap-6">
            <ContactRow label="Email" value="info@yafi.co.rs" href="mailto:info@yafi.co.rs" />
            <ContactRow label="Telefon" value="+381 00 000 0000" href="tel:+381000000000" />
            <ContactRow label="Region" value="Srbija · Ex-Yu tržište" />
          </Reveal>
          <Reveal delay={0.3}>
            <TrustSignals className="mt-10" />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <QuoteForm />
        </Reveal>
      </div>
    </section>
  );
}
