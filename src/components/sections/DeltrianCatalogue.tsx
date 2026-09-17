import Image from "next/image";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";
import type { Dictionary } from "@/i18n/dictionaries";

/** The official Deltrian catalogue, served from `public/`. */
const CATALOGUE_HREF = "/documents/deltrian-ceo-katalog.pdf";

/**
 * The pages in the stack, back to front: two chapter dividers (navy line
 * art, rendered from the PDF) behind the cover. Rest pose per page; the
 * hover fan-out lives in `.book-stack` (globals.css).
 */
const pages = [
  { src: "/deltrian/katalog/page-64.webp", r: "-9deg", x: "-16%", y: "2%" },
  { src: "/deltrian/katalog/page-136.webp", r: "8deg", x: "16%", y: "1%" },
];

/**
 * Download panel for the Deltrian catalogue — copy and actions beside a
 * fanned stack of the real pages.
 */
export default function DeltrianCatalogue({ dict }: { dict: Dictionary }) {
  const c = dict.deltrianPage.catalogue;

  return (
    <section className="py-28 md:py-36">
      <div className="wrap">
        {/* A plain panel: reveals nested inside a `Reveal` never fire (see
            RevealManager), so each block inside reveals on its own. */}
        <div className="relative overflow-hidden rounded-3xl border border-navy-700/70 bg-navy-900 px-8 py-14 sm:px-14 md:py-16 lg:py-20">
          {/* Faint grid and a warm glow behind the stack — gradients only,
                no blur (see the Safari note above .grain). */}
          <div className="card-grid-line pointer-events-none absolute inset-0 opacity-40" />
          <div
            className="pointer-events-none absolute -right-40 top-1/2 h-[44rem] w-[44rem] -translate-y-1/2"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in srgb, var(--orange-500) 16%, transparent), color-mix(in srgb, var(--orange-500) 5%, transparent) 55%, transparent)",
            }}
          />

          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <span className="eyebrow">{c.eyebrow}</span>
              <SplitHeading
                as="h2"
                className="mt-4 max-w-xl font-display text-3xl font-bold leading-tight text-ink-100 md:text-4xl"
              >
                {c.heading}
              </SplitHeading>
              <Reveal delay={0.15} className="mt-6 max-w-lg">
                <p className="text-base leading-relaxed text-ink-400">
                  {c.lead}
                </p>
              </Reveal>

              <Reveal
                delay={0.2}
                className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-ink-400"
              >
                {c.meta.map((m, i) => (
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
                  href={CATALOGUE_HREF}
                  download
                  data-cursor="link"
                  className="btn btn-primary"
                >
                  {c.download}
                  <DownloadIcon />
                </a>
                <a
                  href={CATALOGUE_HREF}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="btn btn-ghost"
                >
                  {c.open}
                  <span aria-hidden="true">↗</span>
                </a>
              </Reveal>

              <Reveal
                delay={0.3}
                className="mt-10 border-t border-navy-700/70 pt-6"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                  {c.contentsLabel}
                </span>
                <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {c.contents.map((item) => (
                    <li
                      key={item.title}
                      className="flex items-baseline justify-between gap-4 text-sm"
                    >
                      <span className="text-ink-200">{item.title}</span>
                      <span className="flex-1 border-b border-dotted border-navy-600/80" />
                      <span className="font-display text-xs font-bold text-orange-400">
                        {c.pageAbbr} {item.page}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* The stack is decorative: the cover carries the alt, the
                  chapter pages behind it are hidden from assistive tech. */}
            <Reveal
              delay={0.2}
              className="mx-auto w-full max-w-md lg:max-w-none"
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
                    src="/deltrian/katalog/cover.webp"
                    alt={c.coverAlt}
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

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 3v10m0 0 4-4m-4 4-4-4M4 17h12" />
    </svg>
  );
}
