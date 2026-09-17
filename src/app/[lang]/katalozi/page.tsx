import type { Metadata } from "next";
import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import CTABanner from "@/components/CTABanner";
import DeltrianCatalogue from "@/components/sections/DeltrianCatalogue";
import { routes } from "@/data/nav";
import { resolveLocale } from "@/i18n/config";
import { alternatesFor, getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const { meta } = getDictionary(locale);
  return {
    title: meta.catalogues.title,
    description: meta.catalogues.description,
    alternates: alternatesFor(locale, routes.catalogues),
  };
}

export default async function KataloziPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const page = dict.cataloguesPage;

  return (
    <div className="pt-32">
      <section className="wrap">
        <span className="eyebrow">{page.eyebrow}</span>
        <SplitHeading
          as="h1"
          className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight text-ink-100 md:text-5xl"
        >
          {page.heading}
        </SplitHeading>
        <Reveal delay={0.15} className="mt-6 max-w-lg">
          <p className="text-base leading-relaxed text-ink-400">{page.lead}</p>
        </Reveal>
      </section>

      {/* The one catalogue we have today, in the same panel the Deltrian page
          uses — its own section, so it keeps its vertical rhythm. */}
      <DeltrianCatalogue dict={dict} />

      <section className="bg-navy-900/30 py-28 md:py-36">
        <div className="wrap">
          <span className="eyebrow">{page.placeholdersEyebrow}</span>
          <SplitHeading
            as="h2"
            className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-ink-100 md:text-4xl"
          >
            {page.placeholdersHeading}
          </SplitHeading>
          <Reveal delay={0.15} className="mt-6 max-w-lg">
            <p className="text-base leading-relaxed text-ink-400">
              {page.placeholdersLead}
            </p>
          </Reveal>

          {/*
            Placeholder cards for the catalogues still to come. Inert until a
            real document arrives; then turn the card into a download (cover
            thumbnail, meta row, `download` link — see `DeltrianCatalogue`).
          */}
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.placeholders.map((item, i) => (
              <Reveal key={item.label} delay={(i % 3) * 0.08} className="flex">
                <div className="flex w-full flex-col rounded-2xl border border-dashed border-navy-700/70 bg-navy-950/30 p-6">
                  <div className="flex items-start justify-between gap-3">
                    {/* An empty cover slot, in the catalogue's A4 proportion. */}
                    <div className="flex aspect-[595/842] w-20 items-center justify-center rounded-md border border-dashed border-navy-700/70 bg-navy-900/40">
                      <DocumentIcon className="h-6 w-6 opacity-30" />
                    </div>
                    <span className="rounded-full border border-navy-700/70 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-ink-400">
                      {page.placeholderBadge}
                    </span>
                  </div>
                  <div className="mt-6">
                    <span className="text-xs font-semibold uppercase tracking-widest text-orange-400/60">
                      {item.label}
                    </span>
                    <h3 className="mt-2 font-display text-base font-bold text-ink-400">
                      {item.name}
                    </h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36">
        <div className="wrap">
          <CTABanner
            locale={locale}
            dict={dict}
            title={page.ctaTitle}
            text={page.ctaText}
            action={page.ctaAction}
          />
        </div>
      </section>
    </div>
  );
}

function DocumentIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  );
}
