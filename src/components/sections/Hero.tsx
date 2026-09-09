import HeroParallax from "@/components/HeroParallax";
import SplitHeading from "@/components/SplitHeading";
import HeroIntro from "@/components/HeroIntro";
import ProductSearch from "@/components/ProductSearch";
import { MagneticLink } from "@/components/Magnetic";
import StatCounter from "@/components/StatCounter";
import { routes } from "@/data/nav";
import { localePath, localeTags, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export default function Hero({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const { hero } = dict;
  const numberLocale = localeTags[locale];

  return (
    <>
      {/* `HeroParallax` scrolls this panel at roughly half speed, so the
          opaque content below rides up over it. Height stays free — pinning it
          instead would mean clipping the panel on short viewports. */}
      <section
        id="hero"
        className="relative z-0 flex min-h-[100svh] flex-col pb-10 pt-24 will-change-transform md:pt-28"
      >
        <div className="wrap flex flex-1 flex-col">
          <div className="on-dark relative isolate flex min-h-[26rem] flex-1 flex-col justify-center overflow-hidden rounded-[1.5rem] shadow-[0_50px_120px_-60px_rgba(0,10,22,0.75)] ring-1 ring-white/10 md:rounded-[2rem]">
            <HeroParallax alt={hero.imageAlt} />

            {/* Darkening scrim: heavy under the copy, thinning toward the
              portrait on the right so she is not scrubbed out. */}
            <div
              className="pointer-events-none absolute inset-0 z-0 hidden md:block"
              style={{
                background:
                  "linear-gradient(90deg, rgba(var(--veil-rgb),0.94) 0%, rgba(var(--veil-rgb),0.86) 34%, rgba(var(--veil-rgb),0.6) 62%, rgba(var(--veil-rgb),0.42) 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 z-0 md:hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(var(--veil-rgb),0.9) 0%, rgba(var(--veil-rgb),0.82) 52%, rgba(var(--veil-rgb),0.58) 100%)",
              }}
            />

            <div className="hero-recede relative z-10 px-6 py-14 sm:px-10 md:px-12 md:py-16 lg:px-16">
              <HeroIntro className="max-w-2xl">
                <span data-hero-item className="eyebrow block">
                  {hero.eyebrow}
                </span>

                <SplitHeading
                  as="h1"
                  trigger="load"
                  delay={0.08}
                  className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-100 sm:text-5xl lg:text-6xl"
                >
                  {hero.heading}
                </SplitHeading>

                <p
                  data-hero-item
                  className="mt-6 max-w-lg text-base leading-relaxed text-ink-200 sm:text-lg"
                >
                  {hero.lead}
                </p>

                <div data-hero-item className="mt-9 max-w-xl">
                  <ProductSearch
                    action={localePath(locale, routes.products)}
                    placeholder={dict.search.placeholder}
                    submitLabel={dict.search.submit}
                  />
                </div>

                <div
                  data-hero-item
                  className="mt-6 flex flex-wrap items-center gap-4"
                >
                  <MagneticLink
                    href={localePath(locale, routes.contact)}
                    className="btn-primary"
                  >
                    {hero.ctaPrimary}
                  </MagneticLink>
                  <MagneticLink
                    href={localePath(locale, routes.deltrian)}
                    className="btn-ghost"
                  >
                    {hero.ctaSecondary}
                  </MagneticLink>
                </div>
              </HeroIntro>
            </div>

            <div className="hero-recede pointer-events-none absolute bottom-10 right-10 z-10 hidden flex-col items-center gap-4 lg:flex">
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-300"
                style={{ writingMode: "vertical-rl" }}
              >
                {hero.scroll}
              </span>
              <span className="scroll-cue" />
            </div>
          </div>
        </div>
      </section>

      <HeroStats stats={hero.stats} numberLocale={numberLocale} />
    </>
  );
}

/**
 * Rendered as the first band of page content rather than inside the hero: the
 * panel scrolls at half speed, so anything left at its foot is overtaken and
 * covered within a flick of the wheel. Opaque, so it covers the panel cleanly.
 */
function HeroStats({
  stats,
  numberLocale,
}: {
  stats: Dictionary["hero"]["stats"];
  numberLocale: string;
}) {
  return (
    <div className="relative z-10 bg-navy-950">
      <HeroIntro className="wrap">
        <div
          data-hero-item
          className="grid grid-cols-2 gap-8 py-10 sm:grid-cols-4"
        >
          <StatCounter
            value={15}
            suffix="+"
            label={stats.experience}
            numberLocale={numberLocale}
            delay={2}
          />
          <StatCounter
            value={1200}
            suffix="+"
            label={stats.projects}
            numberLocale={numberLocale}
            delay={2.1}
          />
          <StatCounter
            value="ISO 16890"
            label={stats.standard}
            numberLocale={numberLocale}
            delay={2.2}
          />
          <StatCounter
            value={5}
            label={stats.markets}
            numberLocale={numberLocale}
            delay={2.3}
          />
        </div>
      </HeroIntro>
    </div>
  );
}
