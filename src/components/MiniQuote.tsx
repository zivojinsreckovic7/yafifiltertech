import type { Testimonial } from "@/data/testimonials";
import type { Dictionary } from "@/i18n/dictionaries";

/** Small single-quote card for pages where a full testimonial band is too loud. */
export default function MiniQuote({
  t,
  marks,
}: {
  t: Testimonial;
  marks: Dictionary["quoteMarks"];
}) {
  return (
    <figure className="rounded-2xl border border-navy-700/60 bg-navy-900/40 p-6">
      <span className="text-xs tracking-wide text-orange-400" aria-hidden="true">
        ★★★★★
      </span>
      <blockquote className="mt-3 text-sm leading-relaxed text-ink-200">
        {marks.open}
        {t.quote}
        {marks.close}
      </blockquote>
      <figcaption className="mt-4 text-xs text-ink-400">
        <span className="font-semibold text-ink-300">{t.name}</span> — {t.role}
      </figcaption>
    </figure>
  );
}
