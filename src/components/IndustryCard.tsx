import Image from "next/image";
import Link from "next/link";
import type { Industry } from "@/data/industries";
import { industryPath } from "@/data/nav";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export default function IndustryCard({
  industry,
  locale,
  dict,
}: {
  industry: Industry;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    /* `on-dark` keeps the copy on its dark-theme ramp over the photo, in both
       site themes — the same treatment the hero panel uses. */
    <Link
      href={localePath(locale, industryPath(industry.slug))}
      data-cursor="link"
      className="on-dark group relative isolate flex min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl border border-navy-700/70 p-8 transition-colors duration-500 hover:border-orange-500/50"
    >
      <Image
        src={industry.image}
        alt=""
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      {/* Heavy under the copy on the left, thinning to the right where the
          photo has room to read. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(105deg, rgba(var(--veil-rgb),0.9) 0%, rgba(var(--veil-rgb),0.76) 40%, rgba(var(--veil-rgb),0.48) 72%, rgba(var(--veil-rgb),0.28) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32"
        style={{
          background:
            "linear-gradient(to top, rgba(var(--veil-rgb),0.72) 0%, transparent 100%)",
        }}
      />

      <div className="relative">
        <span className="eyebrow">{industry.eyebrow}</span>
        <h3 className="mt-3 font-display text-2xl font-bold text-ink-100">
          {industry.name}
        </h3>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-300">
          {industry.teaser}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-2 text-sm font-semibold text-ink-200 transition-colors group-hover:text-orange-300">
        {dict.industryCard.cta}
        <span className="transition-transform duration-500 group-hover:translate-x-1.5">
          →
        </span>
      </div>
    </Link>
  );
}
