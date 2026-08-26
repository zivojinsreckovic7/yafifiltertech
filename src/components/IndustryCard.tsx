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
    <Link
      href={localePath(locale, industryPath(industry.slug))}
      data-cursor="link"
      className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl border border-navy-700/70 bg-gradient-to-br from-navy-900 to-navy-950 p-8 transition-all duration-500 hover:border-orange-500/50"
    >
      <div
        className="absolute -right-[8.5rem] -top-[8.5rem] h-[22rem] w-[22rem] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--orange-500) 20%, transparent), color-mix(in srgb, var(--orange-500) 8%, transparent) 55%, transparent)",
        }}
      />
      <div className="relative">
        <span className="eyebrow">{industry.eyebrow}</span>
        <h3 className="mt-3 font-display text-2xl font-bold text-ink-100">
          {industry.name}
        </h3>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-400">
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
