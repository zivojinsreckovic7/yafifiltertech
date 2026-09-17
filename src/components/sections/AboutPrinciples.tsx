import Image from "next/image";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Four working principles beside one tall photo. The photo is Unsplash, free
 * licence (unsplash.com/license): merenje NgfXTAJ92g4.
 */
export default function AboutPrinciples({ dict }: { dict: Dictionary }) {
  const principles = dict.aboutPage.principles;

  return (
    <section className="bg-navy-900/30 py-28 md:py-36">
      <div className="wrap">
        <span className="eyebrow">{principles.eyebrow}</span>
        <SplitHeading
          as="h2"
          className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-ink-100 md:text-4xl"
        >
          {principles.heading}
        </SplitHeading>
        <Reveal delay={0.15} className="mt-6 max-w-lg">
          <p className="text-base leading-relaxed text-ink-400">
            {principles.lead}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.7fr] lg:gap-8">
          {/* `on-dark` keeps the badge on its dark ramp over the photo in both
              themes, the same treatment as the industry cards. */}
          <Reveal className="flex">
            <div className="on-dark group relative isolate min-h-88 w-full overflow-hidden rounded-3xl border border-navy-700/70 transition-colors duration-500 hover:border-orange-500/50 lg:min-h-0">
              <Image
                src="/o-nama/merenje.webp"
                alt={principles.imageAlt}
                fill
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40"
                style={{
                  background:
                    "linear-gradient(to top, rgba(var(--veil-rgb),0.85) 0%, transparent 100%)",
                }}
              />
              <span className="absolute bottom-6 left-6 rounded-full border border-navy-700 bg-navy-900/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
                {principles.badge}
              </span>
            </div>
          </Reveal>

          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {principles.items.map((item, i) => (
              <li key={item.title} className="flex">
                {/* The reveal owns this element's transform, so the hover
                    lives on the card inside it — the ProductCard treatment:
                    lift, warm border, surface tint, grid lines fading in. */}
                <Reveal delay={0.1 + i * 0.08} className="flex w-full">
                  <div className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-navy-700/70 bg-navy-900/50 p-7 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-orange-500/50 hover:bg-navy-800/80">
                    <div className="card-grid-line pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative">
                      <span className="font-display text-sm font-bold text-orange-400 transition-colors duration-500 group-hover:text-orange-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-4 font-display text-xl font-bold leading-snug text-ink-100">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
