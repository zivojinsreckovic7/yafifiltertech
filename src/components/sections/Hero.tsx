import HeroAirflow from "@/components/HeroAirflow";
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
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-navy-950"
    >
      <HeroAirflow className="absolute inset-0 z-0" />
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(var(--veil-rgb),0.96) 0%, rgba(var(--veil-rgb),0.75) 38%, rgba(var(--veil-rgb),0.15) 65%, transparent 85%)",
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
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40"
        style={{
          background:
            "linear-gradient(to top, var(--navy-950) 0%, transparent 100%)",
        }}
      />

      <div className="wrap relative z-10 flex flex-1 flex-col justify-center pt-28">
        <HeroIntro className="max-w-2xl">
          <span data-hero-item className="eyebrow block">
            {hero.eyebrow}
          </span>

          <SplitHeading
            as="h1"
            trigger="load"
            delay={0.08}
            className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-100 sm:text-5xl lg:text-6xl"
          >
            {hero.heading}
          </SplitHeading>

          <p
            data-hero-item
            className="mt-6 max-w-lg text-base leading-relaxed text-ink-300 sm:text-lg"
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

          <div data-hero-item className="mt-6 flex flex-wrap items-center gap-4">
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

      <div className="pointer-events-none absolute right-10 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-400"
          style={{ writingMode: "vertical-rl" }}
        >
          {hero.scroll}
        </span>
        <span className="scroll-cue" />
      </div>

      <HeroIntro className="wrap relative z-10 mt-16">
        <div
          data-hero-item
          className="grid grid-cols-2 gap-8 border-t border-navy-700/60 py-8 sm:grid-cols-4"
        >
          <StatCounter
            value={15}
            suffix="+"
            label={hero.stats.experience}
            numberLocale={numberLocale}
            delay={2}
          />
          <StatCounter
            value={1200}
            suffix="+"
            label={hero.stats.projects}
            numberLocale={numberLocale}
            delay={2.1}
          />
          <StatCounter
            value={16890}
            label={hero.stats.standard}
            numberLocale={numberLocale}
            delay={2.2}
          />
          <StatCounter
            value={5}
            label={hero.stats.markets}
            numberLocale={numberLocale}
            delay={2.3}
          />
        </div>
      </HeroIntro>
    </section>
  );
}
