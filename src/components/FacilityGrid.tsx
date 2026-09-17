import Image from "next/image";
import Reveal from "@/components/Reveal";
import { getFacilities } from "@/data/facilities";
import type { Locale } from "@/i18n/config";

/**
 * The building types the filters go into — a dozen photo tiles under the
 * industry cards. Informational rather than navigational: they have no page
 * of their own; the industry cards above carry the detail.
 */
export default function FacilityGrid({
  locale,
  intro,
}: {
  locale: Locale;
  intro: string;
}) {
  return (
    <div>
      {/* Same label treatment as the pillar cards' intro line. */}
      <Reveal className="flex items-center gap-3">
        <span aria-hidden className="h-px w-8 shrink-0 bg-orange-400/70" />
        <p className="text-sm font-medium text-ink-300">{intro}</p>
      </Reveal>

      <ul
        data-reveal-group
        className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        {getFacilities(locale).map((facility) => (
          /* `on-dark` keeps the label on its dark-theme ramp over the photo in
             both site themes, as the industry cards do. */
          <li
            key={facility.slug}
            data-reveal
            className="on-dark group relative isolate aspect-[4/3] overflow-hidden rounded-2xl border border-navy-700/70 transition-colors duration-500 hover:border-orange-500/50"
          >
            <Image
              src={facility.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(to top, rgba(var(--veil-rgb),0.85) 0%, rgba(var(--veil-rgb),0.4) 45%, rgba(var(--veil-rgb),0.1) 100%)",
              }}
            />
            <span className="absolute inset-x-0 bottom-0 p-4 font-display text-base font-bold leading-tight text-ink-100 md:p-5 md:text-lg">
              {facility.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
