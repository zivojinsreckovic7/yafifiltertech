import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

export default function Pillars({ dict }: { dict: Dictionary }) {
  const { pillars } = dict;

  return (
    <section id="o-nama" className="relative py-28 md:py-36 scroll-mt-24">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <span className="eyebrow">{pillars.eyebrow}</span>
            <SplitHeading
              as="h2"
              className="mt-4 max-w-lg font-display text-3xl font-bold leading-tight text-ink-100 md:text-4xl"
            >
              {pillars.heading}
            </SplitHeading>
            <Reveal delay={0.15} className="mt-6 max-w-lg">
              <p className="text-base leading-relaxed text-ink-400">
                {pillars.lead}
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-400">
                {pillars.leadSecondary}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Labels the three cards below without competing with the eyebrow. */}
            <Reveal className="flex items-center gap-3 sm:col-span-2">
              <span aria-hidden className="h-px w-8 shrink-0 bg-orange-400/70" />
              <p className="text-sm font-medium text-ink-300">
                {pillars.itemsIntro}
              </p>
            </Reveal>
            {pillars.items.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 0.1}
                className={`rounded-2xl border border-navy-700/70 bg-navy-900/50 p-7 ${
                  i === 2 ? "sm:col-span-2" : ""
                }`}
              >
                <span className="font-display text-sm font-bold text-orange-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-ink-100">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-400">
                  {p.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
