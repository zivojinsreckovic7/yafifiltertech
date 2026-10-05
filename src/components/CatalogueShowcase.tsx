import Image from "next/image";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";
import { DownloadIcon } from "@/components/DownloadIcon";

/** A page behind the cover, with its rest pose in the fanned stack. */
export type StackPage = { src: string; r: string; x: string; y: string };

/**
 * Download panel for one whole catalogue — copy, actions and a contents list
 * beside a fanned stack of the real pages. Used for the Deltrian catalogue
 * and the full YAFI catalogue.
 */
export default function CatalogueShowcase({
  href,
  eyebrow,
  heading,
  lead,
  meta,
  download,
  open,
  contentsLabel,
  pageAbbr,
  contents,
  cover,
  pages,
  flip = false,
  id,
}: {
  /** The PDF, under `public/`. */
  href: string;
  eyebrow: string;
  heading: string;
  lead: string;
  meta: string[];
  download: string;
  open: string;
  contentsLabel: string;
  pageAbbr: string;
  /** With an `href` an entry opens the PDF at that page. */
  contents: { title: string; page: number; href?: string }[];
  cover: { src: string; alt: string };
  /** Back to front, behind the cover. Decorative — hidden from assistive tech. */
  pages: StackPage[];
  /** Stack on the left from lg up, for a second panel on the same page. */
  flip?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-28 md:scroll-mt-32 py-28 md:py-36">
      <div className="wrap">
        {/* A plain panel: reveals nested inside a `Reveal` never fire (see
            RevealManager), so each block inside reveals on its own. */}
        <div className="relative overflow-hidden rounded-3xl border border-navy-700/70 bg-navy-900 px-8 py-14 sm:px-14 md:py-16 lg:py-20">
          {/* Faint grid and a warm glow behind the stack — gradients only,
                no blur (see the Safari note above .grain). */}
          <div className="card-grid-line pointer-events-none absolute inset-0 opacity-40" />
          <div
            className={`pointer-events-none absolute top-1/2 h-[44rem] w-[44rem] -translate-y-1/2 ${
              flip ? "-left-40" : "-right-40"
            }`}
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in srgb, var(--orange-500) 16%, transparent), color-mix(in srgb, var(--orange-500) 5%, transparent) 55%, transparent)",
            }}
          />

          <div
            className={`relative grid grid-cols-1 items-center gap-12 lg:gap-16 ${
              flip ? "lg:grid-cols-[1fr_1.1fr]" : "lg:grid-cols-[1.1fr_1fr]"
            }`}
          >
            <div className={flip ? "lg:order-2" : undefined}>
              <span className="eyebrow">{eyebrow}</span>
              <SplitHeading
                as="h2"
                className="mt-4 max-w-xl font-display text-3xl font-bold leading-tight text-ink-100 md:text-4xl"
              >
                {heading}
              </SplitHeading>
              <Reveal delay={0.15} className="mt-6 max-w-lg">
                <p className="text-base leading-relaxed text-ink-400">{lead}</p>
              </Reveal>

              <Reveal
                delay={0.2}
                className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-ink-400"
              >
                {meta.map((m, i) => (
                  <span key={m} className="flex items-center gap-3">
                    {i > 0 && (
                      <span
                        className="h-1 w-1 rounded-full bg-orange-500/60"
                        aria-hidden="true"
                      />
                    )}
                    {m}
                  </span>
                ))}
              </Reveal>

              <Reveal
                delay={0.25}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a
                  href={href}
                  download
                  data-cursor="link"
                  className="btn btn-primary"
                >
                  {download}
                  <DownloadIcon />
                </a>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="btn btn-ghost"
                >
                  {open}
                  <span aria-hidden="true">↗</span>
                </a>
              </Reveal>

              <Reveal
                delay={0.3}
                className="mt-10 border-t border-navy-700/70 pt-6"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                  {contentsLabel}
                </span>
                <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {contents.map((item) => {
                    const row = (
                      <>
                        <span className="text-ink-200 transition-colors group-hover:text-ink-100">
                          {item.title}
                        </span>
                        <span className="flex-1 border-b border-dotted border-navy-600/80" />
                        <span className="font-display text-xs font-bold text-orange-400">
                          {pageAbbr} {item.page}
                        </span>
                      </>
                    );
                    const rowClass =
                      "group flex items-baseline justify-between gap-4 text-sm";
                    return (
                      <li key={item.title}>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor="link"
                            className={rowClass}
                          >
                            {row}
                          </a>
                        ) : (
                          <span className={rowClass}>{row}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            </div>

            {/* The stack is decorative: the cover carries the alt, the
                  pages behind it are hidden from assistive tech. */}
            <Reveal
              delay={0.2}
              className={`mx-auto w-full max-w-md lg:max-w-none ${
                flip ? "lg:order-1" : ""
              }`}
            >
              <div className="book-stack">
                {pages.map((p) => (
                  <div
                    key={p.src}
                    aria-hidden="true"
                    className="book-stack__page ring-1 ring-white/10"
                    style={
                      {
                        "--r": p.r,
                        "--x": p.x,
                        "--y": p.y,
                      } as React.CSSProperties
                    }
                  >
                    <Image
                      src={p.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 22vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="book-stack__page book-stack__page--cover ring-1 ring-white/15">
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
