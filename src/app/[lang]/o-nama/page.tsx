import type { Metadata } from "next";
import HeroParallax from "@/components/HeroParallax";
import HeroIntro from "@/components/HeroIntro";
import SplitHeading from "@/components/SplitHeading";
import TrustSignals from "@/components/TrustSignals";
import { MagneticLink } from "@/components/Magnetic";
import AboutStory from "@/components/sections/AboutStory";
import AboutPrinciples from "@/components/sections/AboutPrinciples";
import AboutPlaces from "@/components/sections/AboutPlaces";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import { routes } from "@/data/nav";
import { localePath, resolveLocale } from "@/i18n/config";
import { alternatesFor, getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const { meta } = getDictionary(locale);
  return {
    title: meta.about.title,
    description: meta.about.description,
    alternates: alternatesFor(locale, routes.about),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const page = dict.aboutPage;

  return (
    <>
      {/* Same construction as the home hero: `HeroParallax` scrolls the panel
          at roughly half speed and the opaque content below rides up over it. */}
      <section
        id="hero"
        className="relative z-0 flex min-h-[100svh] flex-col pb-10 pt-24 will-change-transform md:pt-28"
      >
        <div className="wrap flex flex-1 flex-col">
          <div className="on-dark relative isolate flex min-h-104 flex-1 flex-col justify-center overflow-hidden rounded-[1.5rem] shadow-[0_50px_120px_-60px_rgba(0,10,22,0.75)] ring-1 ring-white/10 md:rounded-[2rem]">
            {/* The facade's arch sits right of centre; keep it in frame on
                wide screens, and let a narrow frame take the glass itself. */}
            <HeroParallax
              src="/glass-building.webp"
              alt={page.imageAlt}
              className="object-cover object-[62%_50%] md:object-[70%_45%]"
            />

            {/* The sky and glass are bright, so the scrim is heavier than the
                home hero's under the copy, still clearing to the right. */}
            <div
              className="pointer-events-none absolute inset-0 z-0 hidden md:block"
              style={{
                background:
                  "linear-gradient(90deg, rgba(var(--veil-rgb),0.96) 0%, rgba(var(--veil-rgb),0.9) 36%, rgba(var(--veil-rgb),0.62) 64%, rgba(var(--veil-rgb),0.4) 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 z-0 md:hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(var(--veil-rgb),0.92) 0%, rgba(var(--veil-rgb),0.84) 55%, rgba(var(--veil-rgb),0.55) 100%)",
              }}
            />

            <div className="hero-recede relative z-10 px-6 py-14 sm:px-10 md:px-12 md:py-16 lg:px-16">
              <HeroIntro className="max-w-2xl">
                <span data-hero-item className="eyebrow block">
                  {page.eyebrow}
                </span>
                <SplitHeading
                  as="h1"
                  trigger="load"
                  delay={0.08}
                  className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-100 sm:text-5xl lg:text-6xl"
                >
                  {page.heading}
                </SplitHeading>
                <p
                  data-hero-item
                  className="mt-6 max-w-lg text-base leading-relaxed text-ink-200 sm:text-lg"
                >
                  {page.lead}
                </p>
                <div
                  data-hero-item
                  className="mt-9 flex flex-wrap items-center gap-4"
                >
                  <MagneticLink
                    href={localePath(locale, routes.contact)}
                    className="btn-primary"
                  >
                    {page.ctaPrimary}
                  </MagneticLink>
                  <MagneticLink
                    href={localePath(locale, routes.products)}
                    className="btn-ghost"
                  >
                    {page.ctaSecondary}
                  </MagneticLink>
                </div>
                <div data-hero-item>
                  <TrustSignals dict={dict} className="mt-7" />
                </div>
              </HeroIntro>
            </div>
          </div>
        </div>
      </section>

      {/* Opaque and above the pinned hero, so it scrolls up over the panel. */}
      <div className="relative z-10 bg-navy-950">
        <AboutStory dict={dict} />
        <AboutPrinciples dict={dict} />
        <AboutPlaces dict={dict} />
        <TestimonialsSection locale={locale} dict={dict} />
        <CTASection locale={locale} dict={dict} />
      </div>
    </>
  );
}
