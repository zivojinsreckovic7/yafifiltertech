import Image from "next/image";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";
import { allCertificationsHref, certifications } from "@/data/certifications";
import type { Dictionary } from "@/i18n/dictionaries";

/** The box every badge is fitted into, in CSS px at 1x. */
const BADGE_BOX = { width: 220, height: 96 };

/**
 * A selection of Deltrian's certifications, in the card format of
 * deltrian.com/about-us/certifications: badge, title, a few sentences, and a
 * "Learn more" button out to the certifier or Deltrian's own page.
 */
export default function CertificationsSection({ dict }: { dict: Dictionary }) {
  const copy = dict.deltrianPage.certifications;

  return (
    <section className="py-28 md:py-36">
      <div className="wrap">
        <span className="eyebrow">{copy.eyebrow}</span>
        <SplitHeading
          as="h2"
          className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-ink-100 md:text-4xl"
        >
          {copy.heading}
        </SplitHeading>
        <Reveal delay={0.15} className="mt-6 max-w-lg">
          <p className="text-base leading-relaxed text-ink-400">{copy.lead}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, i) => {
            const item = copy.items[cert.slug];
            // Fit the badge inside BADGE_BOX, keeping its aspect ratio. The
            // result sizes the 1x/2x srcset; the browser renders at it and
            // preflight's `max-width: 100%` shrinks it in narrower cards.
            const scale = Math.min(
              BADGE_BOX.width / cert.image.width,
              BADGE_BOX.height / cert.image.height,
            );
            const width = Math.round(cert.image.width * scale);
            const height = Math.round(cert.image.height * scale);

            return (
              <Reveal key={cert.slug} delay={(i % 4) * 0.08} className="flex">
                {/* Same hover as ProductCard: lift, warm border, surface
                    tint, grid lines fading in. The content sits `relative`
                    so it stacks above the absolutely-positioned grid. */}
                <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-navy-700/70 bg-navy-900/50 p-6 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-orange-500/50 hover:bg-navy-800/80">
                  <div className="card-grid-line pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex flex-1 flex-col">
                    {/* White in both themes: the marks are the certifiers' own
                        colours and are only guaranteed to read on white. The
                        hairline separates the plate from a light-theme card. */}
                    <div className="flex h-36 items-center justify-center rounded-xl border border-black/6 bg-white px-6 py-5">
                      <Image
                        src={cert.image.src}
                        alt={item.title}
                        width={width}
                        height={height}
                        loading="lazy"
                        className="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                    </div>
                    <h3 className="mt-6 font-display text-lg font-bold text-ink-100">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-400">
                      {item.desc}
                    </p>
                    {/* The card's one action, so it warms with the card and
                        not only under the pointer. */}
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="link"
                      className="btn btn-ghost btn-sm mt-6 self-start group-hover:border-orange-400 group-hover:text-orange-300"
                    >
                      {copy.learnMore}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      >
                        ↗
                      </span>
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-10 max-w-xl">
          <p className="text-sm leading-relaxed text-ink-400">
            {copy.note}{" "}
            <a
              href={allCertificationsHref}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="font-semibold text-orange-400 transition-colors hover:text-orange-300"
            >
              {copy.allLink} →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
