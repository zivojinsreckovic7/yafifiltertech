import Reveal from "@/components/Reveal";
import { addressLine, mapDirectionsHref, mapEmbedSrc } from "@/data/contact";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Keyless OpenStreetMap embed of the office. The tiles are a light raster map,
 * left as they are rather than filtered — the site already sets white product
 * panels on the dark ground, so a bright map frame is in keeping.
 */
export default function LocationMap({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["locationMap"];
}) {
  return (
    <div className="wrap mt-24 md:mt-28">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="eyebrow">{dict.eyebrow}</span>
          <h3 className="mt-3 font-display text-2xl font-bold text-ink-100 md:text-3xl">
            {dict.heading}
          </h3>
          <p className="mt-2 text-sm text-ink-400">{addressLine(locale)}</p>
        </div>
        <a
          href={mapDirectionsHref()}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-orange-400 transition-colors hover:text-orange-300"
        >
          {dict.directions}
        </a>
      </div>

      <Reveal
        delay={0.1}
        className="mt-8 overflow-hidden rounded-2xl border border-navy-700/70"
      >
        <iframe
          src={mapEmbedSrc()}
          title={dict.frameTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[320px] w-full border-0 md:h-[420px]"
        />
      </Reveal>
    </div>
  );
}
