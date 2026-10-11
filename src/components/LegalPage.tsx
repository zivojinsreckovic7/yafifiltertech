import Link from "next/link";
import SplitHeading from "./SplitHeading";
import type { LegalDocument } from "@/data/legal";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/** Dates read as "12. oktobar 2026." — `sr-RS` alone would spell it in Cyrillic. */
const dateTags: Record<Locale, string> = { sr: "sr-Latn-RS", en: "en-GB" };

const linkPattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const linkClass = "font-medium text-orange-400 underline underline-offset-2 hover:text-orange-300";

/** Text with `[label](href)` links turned into anchors. */
function Rich({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let rest = 0;
  for (const match of text.matchAll(linkPattern)) {
    const [whole, label, href] = match;
    parts.push(text.slice(rest, match.index));
    parts.push(
      href.startsWith("/") ? (
        <Link key={match.index} href={href} className={linkClass}>
          {label}
        </Link>
      ) : href.startsWith("http") ? (
        <a key={match.index} href={href} target="_blank" rel="noopener" className={linkClass}>
          {label}
        </a>
      ) : (
        <a key={match.index} href={href} className={linkClass}>
          {label}
        </a>
      ),
    );
    rest = match.index + whole.length;
  }
  parts.push(text.slice(rest));
  return parts;
}

/**
 * The privacy policy and the terms of use: a heading block, a numbered table
 * of contents (sticky beside the text on wide screens) and the sections.
 */
export default function LegalPage({
  locale,
  title,
  labels,
  document,
}: {
  locale: Locale;
  title: string;
  labels: Dictionary["legalPage"];
  document: LegalDocument;
}) {
  const updated = new Intl.DateTimeFormat(dateTags[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(document.updated));

  return (
    <div className="pt-36 md:pt-40">
      <header className="wrap">
        <span className="eyebrow">{labels.eyebrow}</span>
        <SplitHeading
          as="h1"
          className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-ink-100 md:text-5xl"
        >
          {title}
        </SplitHeading>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-400">{document.lead}</p>
        <p className="mt-4 text-sm text-ink-400">
          {labels.updated}: <time dateTime={document.updated}>{updated}</time>
        </p>
        {document.note && (
          <p className="mt-6 max-w-2xl rounded-lg border border-navy-700 bg-navy-900/60 px-4 py-3 text-sm leading-relaxed text-ink-300">
            {document.note}
          </p>
        )}
      </header>

      <div className="wrap grid grid-cols-1 gap-12 pb-28 pt-14 md:pb-36 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
        <nav aria-label={labels.contents} className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow mb-4">{labels.contents}</p>
          <ol className="flex flex-col gap-2.5 text-sm text-ink-300">
            {document.sections.map((section, index) => (
              <li key={section.id} className="flex gap-3">
                <span className="w-5 shrink-0 tabular-nums text-ink-400">{index + 1}.</span>
                <a href={`#${section.id}`} className="hover:text-orange-300">
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="max-w-3xl">
          {document.sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 border-t border-navy-700/60 pb-10 pt-8 first:border-t-0 first:pt-0 md:scroll-mt-32"
            >
              <h2 className="flex gap-3 font-display text-xl font-bold leading-snug text-ink-100 md:text-2xl">
                <span className="tabular-nums text-orange-400">{index + 1}.</span>
                {section.heading}
              </h2>
              {section.blocks.map((block, blockIndex) =>
                Array.isArray(block) ? (
                  <ul
                    key={blockIndex}
                    className="mt-4 flex list-disc flex-col gap-2.5 pl-5 text-base leading-relaxed text-ink-300 marker:text-orange-400"
                  >
                    {block.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Rich text={item} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p key={blockIndex} className="mt-4 text-base leading-relaxed text-ink-300">
                    <Rich text={block} />
                  </p>
                ),
              )}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
