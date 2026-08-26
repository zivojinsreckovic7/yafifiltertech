import type { Metadata } from "next";
import Link from "next/link";
import HeroAirflow from "@/components/HeroAirflow";
import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import PleatIcon from "@/components/PleatIcon";
import { MagneticLink } from "@/components/Magnetic";
import TrustSignals from "@/components/TrustSignals";
import CTABanner from "@/components/CTABanner";
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
    title: meta.deltrian.title,
    description: meta.deltrian.description,
    alternates: alternatesFor(locale, routes.deltrian),
  };
}

export default async function DeltrianPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const page = dict.deltrianPage;

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
              {page.eyebrow}
            </span>
            <SplitHeading
              as="h1"
              className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-100 sm:text-5xl lg:text-6xl"
            >
              {page.heading}
            </SplitHeading>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-300 sm:text-lg">
                {page.lead}
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-9 flex flex-wrap items-center gap-4">
              <MagneticLink
                href={localePath(locale, routes.contact)}
                className="btn-primary"
              >
                {page.ctaPrimary}
              </MagneticLink>
              <MagneticLink href="#program" className="btn-ghost">
                {page.ctaSecondary}
              </MagneticLink>
            </Reveal>
            <Reveal delay={0.4}>
              <TrustSignals dict={dict} className="mt-7" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36">
        <div className="wrap">
          <span className="eyebrow">{page.whyEyebrow}</span>
          <SplitHeading
            as="h2"
            className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-ink-100 md:text-4xl"
          >
            {page.whyHeading}
          </SplitHeading>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {page.pillars.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 0.1}
                className="rounded-2xl border border-navy-700/70 bg-navy-900/50 p-8"
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
      </section>

      <section id="program" className="scroll-mt-24 py-28 md:py-36 bg-navy-900/30">
        <div className="wrap">
          <span className="eyebrow">{page.rangeEyebrow}</span>
          <SplitHeading
            as="h2"
            className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-ink-100 md:text-4xl"
          >
            {page.rangeHeading}
          </SplitHeading>
          <Reveal delay={0.15} className="mt-6 max-w-lg">
            <p className="text-base leading-relaxed text-ink-400">
              {page.rangeLead}
            </p>
          </Reveal>

          {/*
            Placeholder cards for the Deltrian groups. This grid used to render
            `getProducts(locale)` — the YAFI catalogue — which belongs to Yafi
            Filtertech itself and lives on `/proizvodi`, not here. Cards are
            inert until the real groups arrive; turn them back into `<Link>`s
            once each group has a page of its own.
          */}
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.rangeGroups.map((group, i) => (
              <Reveal key={group.class} delay={(i % 4) * 0.06}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-navy-700/70 bg-navy-950/30 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <PleatIcon className="h-8 w-8 opacity-40" />
                    <span className="rounded-full border border-navy-700/70 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-ink-400">
                      {page.rangeGroupBadge}
                    </span>
                  </div>
                  <div className="mt-6">
                    <span className="text-xs font-semibold uppercase tracking-widest text-orange-400/60">
                      {group.class}
                    </span>
                    <h3 className="mt-2 font-display text-base font-bold text-ink-400">
                      {group.name}
                    </h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-10 max-w-xl">
            <p className="text-sm leading-relaxed text-ink-400">
              {page.rangeGroupsNote}{" "}
              <Link
                href={localePath(locale, routes.products)}
                data-cursor="link"
                className="font-semibold text-orange-400 transition-colors hover:text-orange-300"
              >
                {page.rangeGroupsLink} →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-28 md:py-36">
        <div className="wrap">
          <CTABanner
            locale={locale}
            dict={dict}
            title={page.ctaTitle}
            text={page.ctaText}
          />
        </div>
      </section>
    </div>
  );
}
