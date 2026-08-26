import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
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

  return (
    <section className="relative py-28 md:py-36">
      <div className="wrap">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">{section.eyebrow}</span>
            <SplitHeading
              as="h2"
              className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-ink-100 md:text-4xl"
            >
              {section.heading}
            </SplitHeading>
          </div>
          <Reveal className="flex items-center gap-3 text-sm text-ink-400">
            <span className="tracking-wide text-orange-400" aria-hidden="true">
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

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {getTestimonials(locale)
            .slice(0, 3)
            .map((t, i) => (
              <Reveal
                key={t.name}
                delay={i * 0.1}
                className="flex flex-col justify-between rounded-2xl border border-navy-700/70 bg-navy-900/50 p-8"
              >
                <blockquote className="text-sm leading-relaxed text-ink-200">
                  {dict.quoteMarks.open}
                  {t.quote}
                  {dict.quoteMarks.close}
                </blockquote>
                <figcaption className="mt-6 border-t border-navy-700/60 pt-5 text-xs text-ink-400">
                  <span className="font-semibold text-ink-200">{t.name}</span>
                  <span className="mt-1 block">{t.role}</span>
                </figcaption>
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}
