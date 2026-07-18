import type { Metadata } from "next";
import Link from "next/link";
import HeroAirflow from "@/components/HeroAirflow";
import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import PleatIcon from "@/components/PleatIcon";
import { MagneticLink } from "@/components/Magnetic";
import TrustSignals from "@/components/TrustSignals";
import CTABanner from "@/components/CTABanner";
import { productCategories } from "@/data/products";

export const metadata: Metadata = {
  title: "Deltrian program filtera",
  description:
    "Yafi Filtertech je zvanični regionalni distributer Deltrian programa filtera za Ex-Yu tržište — kompletna paleta industrijske filtracije vazduha.",
};

const pillars = [
  {
    title: "Kontinuitet isporuke u regionu",
    desc: "Kao regionalni distributer obezbeđujemo dostupnost programa filtera na celom Ex-Yu tržištu, bez prekida lanca snabdevanja.",
  },
  {
    title: "Tehnička podrška Yafi tima",
    desc: "Od izbora klase filtracije do ugradnje — naš tim vodi projekat lokalno, sa poznavanjem propisa i specifičnosti tržišta.",
  },
  {
    title: "Usklađenost sa standardima",
    desc: "Program je razvijen u skladu sa aktuelnim evropskim standardima kvaliteta vazduha, uključujući ISO 16890 klasifikaciju.",
  },
];

export default function DeltrianPage() {
  return (
    <div>
      <section className="relative flex min-h-[85svh] flex-col overflow-hidden bg-navy-950">
        <HeroAirflow className="absolute inset-0 z-0" density={0.85} />
        <div
          className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(var(--veil-rgb),0.96) 0%, rgba(var(--veil-rgb),0.78) 40%, rgba(var(--veil-rgb),0.2) 68%, transparent 88%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(var(--veil-rgb),0.92) 0%, rgba(var(--veil-rgb),0.82) 55%, rgba(var(--veil-rgb),0.35) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32"
          style={{
            background: "linear-gradient(to top, var(--navy-950) 0%, transparent 100%)",
          }}
        />

        <div className="wrap relative z-10 flex flex-1 flex-col justify-center pt-28">
          <div className="max-w-2xl">
            <span className="eyebrow flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              Zvanični regionalni distributer · Ex-Yu tržište
            </span>
            <SplitHeading
              as="h1"
              className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-100 sm:text-5xl lg:text-6xl"
            >
              Deltrian program filtera.
            </SplitHeading>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-300 sm:text-lg">
                Yafi Filtertech ekskluzivno zastupa Deltrian program
                industrijskih filtera na Ex-Yu tržištu — od predfiltracije
                do HEPA klase, uz punu tehničku podršku lokalnog tima.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-9 flex flex-wrap items-center gap-4">
              <MagneticLink href="/kontakt" className="btn-primary">
                Zatražite Deltrian ponudu
              </MagneticLink>
              <MagneticLink href="#program" className="btn-ghost">
                Pogledajte program filtera
              </MagneticLink>
            </Reveal>
            <Reveal delay={0.4}>
              <TrustSignals className="mt-7" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36">
        <div className="wrap">
          <span className="eyebrow">Zašto Deltrian program</span>
          <SplitHeading
            as="h2"
            className="mt-4 max-w-2xl font-display text-3xl font-extrabold leading-tight text-ink-100 md:text-4xl"
          >
            Partnerstvo koje nosi odgovornost za ceo region.
          </SplitHeading>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 0.1}
                className="rounded-2xl border border-navy-700/70 bg-navy-900/50 p-8"
              >
                <span className="font-display text-sm font-extrabold text-orange-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-extrabold text-ink-100">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-400">
                  {p.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="program" className="scroll-mt-24 py-28 md:py-36 bg-navy-900/30">
        <div className="wrap">
          <span className="eyebrow">Program filtera</span>
          <SplitHeading
            as="h2"
            className="mt-4 max-w-2xl font-display text-3xl font-extrabold leading-tight text-ink-100 md:text-4xl"
          >
            Šta obuhvata Deltrian program.
          </SplitHeading>
          <Reveal delay={0.15} className="mt-6 max-w-lg">
            <p className="text-base leading-relaxed text-ink-400">
              Kompletna paleta filtera za industrijsku i komercijalnu
              ventilaciju, dostupna kroz Yafi Filtertech kao regionalnog
              distributera.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 0.06}>
                <Link
                  href={`/proizvodi#${p.slug}`}
                  data-cursor="link"
                  className="group flex h-full flex-col justify-between rounded-2xl border border-navy-700/70 bg-navy-950/50 p-6 transition-colors hover:border-orange-500/50"
                >
                  <PleatIcon className="h-8 w-8 transition-transform duration-500 group-hover:scale-110" />
                  <div className="mt-6">
                    <span className="text-xs font-semibold uppercase tracking-widest text-orange-400">
                      {p.class}
                    </span>
                    <h3 className="mt-2 font-display text-base font-extrabold text-ink-100">
                      {p.name}
                    </h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36">
        <div className="wrap">
          <CTABanner
            title="Zatražite ponudu za Deltrian program filtera."
            text="Recite nam koji objekat i sistem ventilacije treba pokriti — pripremamo predlog rešenja iz Deltrian programa u roku od 24 časa."
          />
        </div>
      </section>
    </div>
  );
}
