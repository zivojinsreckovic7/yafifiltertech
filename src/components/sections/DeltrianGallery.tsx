import Image from "next/image";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";
import {
  deltrianFilters,
  deltrianProductsHref,
  type DeltrianFilter,
} from "@/data/deltrianFilters";
import type { Dictionary } from "@/i18n/dictionaries";

/** Resting tilt per tile, so the rows read as pinned prints, not a grid. */
const TILTS = [-2.5, 1.5, -1, 2.2, -1.8, 2.5, -2, 1.2];
/** Vertical scatter, in px, paired with the tilt. */
const LIFTS = [6, -8, 4, -5, 8, -4, 5, -7];

/**
 * Decorative band of Deltrian's own product shots: two full-bleed rows
 * drifting in opposite directions, faded at the edges, paused on hover.
 * It is `#program`, the target of the hero's "see the range" button.
 */
export default function DeltrianGallery({ dict }: { dict: Dictionary }) {
  const gallery = dict.deltrianPage.gallery;
  // The second row starts half-way round so the two never line up.
  const half = Math.ceil(deltrianFilters.length / 2);
  const rowB = [...deltrianFilters.slice(half), ...deltrianFilters.slice(0, half)];

  return (
    <section
      id="program"
      className="relative scroll-mt-24 overflow-hidden bg-navy-900/30 py-24 md:py-32"
    >
      {/* Warm ground glow behind the band — a radial gradient, not a blur. */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[70rem] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--orange-500) 9%, transparent), color-mix(in srgb, var(--orange-500) 3%, transparent) 55%, transparent)",
        }}
      />

      <div className="wrap relative">
        <span className="eyebrow">{gallery.eyebrow}</span>
        <SplitHeading
          as="h2"
          className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-ink-100 md:text-4xl"
        >
          {gallery.heading}
        </SplitHeading>
        <Reveal delay={0.15} className="mt-6 max-w-lg">
          <p className="text-base leading-relaxed text-ink-400">{gallery.lead}</p>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="photo-marquee marquee-mask relative mt-14 flex flex-col gap-6 py-3 md:gap-8">
        <Row items={deltrianFilters} captions={gallery.items} duration={72} />
        <Row
          items={rowB}
          captions={gallery.items}
          duration={88}
          reverse
          decorative
        />
      </Reveal>

      <Reveal delay={0.25} className="wrap relative mt-10">
        <p className="text-xs text-ink-400">
          <a
            href={deltrianProductsHref}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            className="transition-colors hover:text-orange-300"
          >
            {gallery.credit} ↗
          </a>
        </p>
      </Reveal>
    </section>
  );
}

function Row({
  items,
  captions,
  duration,
  reverse = false,
  decorative = false,
}: {
  items: DeltrianFilter[];
  captions: Dictionary["deltrianPage"]["gallery"]["items"];
  /** Seconds per loop — the two rows differ so they never sync up. */
  duration: number;
  reverse?: boolean;
  /** A repeat of tiles already on the page: hidden from assistive tech. */
  decorative?: boolean;
}) {
  // Two copies back to back; the keyframe travels exactly one copy's width.
  const copies = [items, items];
  return (
    <div
      aria-hidden={decorative || undefined}
      className={`flex w-max items-center gap-5 md:gap-6 ${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      }`}
      style={{ animationDuration: `${duration}s` }}
    >
      {copies.map((copy, c) => (
        <div
          key={c}
          aria-hidden={c === 1 || undefined}
          className="flex shrink-0 items-center gap-5 md:gap-6"
        >
          {copy.map((filter, i) => (
            <figure
              key={filter.slug}
              className="photo-marquee__tile relative w-52 shrink-0 overflow-hidden rounded-2xl border border-navy-700/70 bg-[#f6f7fb] sm:w-60 md:w-72"
              style={
                {
                  "--tilt": `${TILTS[i % TILTS.length]}deg`,
                  "--lift": `${LIFTS[i % LIFTS.length]}px`,
                } as React.CSSProperties
              }
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={filter.image}
                  alt={decorative || c === 1 ? "" : captions[filter.slug]}
                  fill
                  sizes="(min-width: 768px) 288px, 240px"
                  /* Off-screen tiles drift in within seconds, and the eight
                     files are tiny — eager beats popping in mid-glide. */
                  loading="eager"
                  className="object-cover"
                />
              </div>
              {/* `on-dark` pins the chip to the dark ramp in both themes so it
                  always sits dark on the light plate. */}
              <figcaption className="on-dark absolute bottom-3 left-3 rounded-full border border-navy-700/70 bg-navy-950/85 px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-ink-100">
                {captions[filter.slug]}
              </figcaption>
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}
