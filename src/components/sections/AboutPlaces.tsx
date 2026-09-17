import Image from "next/image";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Three photo cards — workshop, site, supply — in the industry-card idiom:
 * copy over a veiled photo. Photography is Unsplash, free licence
 * (unsplash.com/license): radionica lKqGI7IyBCw · ugradnja JuQwQt5K90I ·
 * magacin F2C_mSrb6iM.
 */
const photos = [
  "/o-nama/radionica.webp",
  "/o-nama/ugradnja.webp",
  "/o-nama/magacin.webp",
];

export default function AboutPlaces({ dict }: { dict: Dictionary }) {
  const places = dict.aboutPage.places;

  return (
    <section className="py-28 md:py-36">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">{places.eyebrow}</span>
            <SplitHeading
              as="h2"
              className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-ink-100 md:text-4xl"
            >
              {places.heading}
            </SplitHeading>
          </div>
          <Reveal delay={0.15} className="max-w-sm">
            <p className="text-base leading-relaxed text-ink-400">
              {places.lead}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {places.items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1} className="flex">
              {/* `on-dark` keeps the copy on its dark-theme ramp over the
                  photo in both site themes. */}
              <article className="on-dark group relative isolate flex min-h-104 w-full flex-col justify-end overflow-hidden rounded-2xl border border-navy-700/70 p-7 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-orange-500/50">
                <Image
                  src={photos[i]}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                {/* Heavy at the foot under the copy, clearing towards the top
                    so the photo has room to read. */}
                <div
                  className="pointer-events-none absolute inset-0 -z-10"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(var(--veil-rgb),0.94) 0%, rgba(var(--veil-rgb),0.7) 42%, rgba(var(--veil-rgb),0.22) 75%, rgba(var(--veil-rgb),0.1) 100%)",
                  }}
                />
                <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1">
                  <span className="eyebrow">{item.label}</span>
                  <h3 className="mt-3 font-display text-2xl font-bold text-ink-100">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-300">
                    {item.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
