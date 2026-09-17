import RegionMap from "@/components/RegionMap";
import Reveal from "@/components/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

export default function RegionSection({ dict }: { dict: Dictionary }) {
  const region = dict.regionSection;

  return (
    <section className="py-8 md:py-12">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-3xl border border-navy-700/70 bg-navy-900 px-8 py-14 sm:px-14 md:py-20">
          <RegionMap
            names={region.countries}
            hub={region.hub}
            mapLabel={region.mapLabel}
          >
            <Reveal>
              <span className="eyebrow">{region.eyebrow}</span>
              <h2 className="mt-4 max-w-lg font-display text-3xl font-bold leading-tight text-ink-100 md:text-4xl">
                {region.heading}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-400">
                {region.lead}
              </p>
            </Reveal>
          </RegionMap>
        </div>
      </div>
    </section>
  );
}
