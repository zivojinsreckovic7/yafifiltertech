import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import TestimonialSlider from "@/components/TestimonialSlider";
import { getTestimonials, rating } from "@/data/testimonials";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export default function TestimonialsSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const section = dict.testimonialsSection;
  const items = getTestimonials(locale);

  return (
    <section className="relative py-24 md:py-32">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-navy-700/70 bg-navy-900 md:rounded-[2.5rem]">
          <div className="relative px-6 py-14 text-center sm:px-10 md:py-20">
            <Reveal className="flex justify-center">
              <span className="rounded-full border border-navy-700 bg-navy-800/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
                {section.eyebrow}
              </span>
            </Reveal>

            <SplitHeading
              as="h2"
              delay={0.08}
              className="mx-auto mt-6 max-w-3xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink-100 sm:text-4xl md:text-5xl"
            >
              {section.heading}
            </SplitHeading>
            <SplitHeading
              as="p"
              delay={0.14}
              className="mx-auto max-w-3xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink-400 sm:text-4xl md:text-5xl"
            >
              {section.headingMuted}
            </SplitHeading>

            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-ink-400">
                {section.lead}
              </p>
            </Reveal>

            <Reveal
              delay={0.26}
              className="mt-7 flex items-center justify-center gap-3 text-sm text-ink-400"
            >
              <span
                className="tracking-wide text-orange-400"
                aria-hidden="true"
              >
                ★★★★★
              </span>
              <span>
                <strong className="font-display font-bold text-ink-100">
                  {rating.score}/{rating.outOf}
                </strong>{" "}
                {section.ratingLabel}
              </span>
            </Reveal>
          </div>

          {/* The quotes themselves, on their own ground inside the panel. */}
          <Reveal
            delay={0.1}
            className="border-t border-navy-700/70 bg-navy-950/40 px-6 py-12 sm:px-12 md:px-16 md:py-14"
          >
            <TestimonialSlider
              items={items}
              labels={{
                previous: section.previous,
                next: section.next,
                goTo: items.map((_, i) => section.goTo(String(i + 1))),
              }}
              quoteMarks={dict.quoteMarks}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
