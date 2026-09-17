import Image from "next/image";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * The company narrative beside a three-photo mosaic. Photography is Unsplash,
 * free licence (unsplash.com/license); ids in case one needs replacing:
 * cista-soba 7PTD99F8oUk · projektovanje 4UcHg1EFhl4 · na-terenu VDpYOvZm2Ok.
 */
export default function AboutStory({ dict }: { dict: Dictionary }) {
  const story = dict.aboutPage.story;

  return (
    <section className="py-28 md:py-36">
      <div className="wrap grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <span className="eyebrow">{story.eyebrow}</span>
          <SplitHeading
            as="h2"
            className="mt-4 max-w-xl font-display text-3xl font-bold leading-tight text-ink-100 md:text-4xl"
          >
            {story.heading}
          </SplitHeading>
          <Reveal delay={0.15} className="mt-8 flex max-w-xl flex-col gap-5">
            {story.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`leading-relaxed ${
                  i === 0 ? "text-lg text-ink-200" : "text-base text-ink-400"
                }`}
              >
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal
            delay={0.25}
            className="mt-10 grid grid-cols-3 gap-6 border-t border-navy-700/70 pt-8"
          >
            {story.facts.map((f) => (
              <div key={f.label}>
                <div className="font-display text-3xl font-bold text-ink-100 md:text-4xl">
                  {f.value}
                </div>
                <div className="mt-1 text-xs leading-snug text-ink-400 sm:text-sm">
                  {f.label}
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Tall frame on the left, two landscapes stacked on the right; the
            right column is nudged down so the mosaic does not read as a table. */}
        <div className="grid grid-cols-2 gap-4 md:gap-5">
          <Reveal className="row-span-2">
            <Frame className="aspect-[4/5] h-full">
              <Image
                src="/o-nama/cista-soba.webp"
                alt={story.images.cleanroom}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </Frame>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 md:mt-12">
            <Frame className="aspect-[4/3]">
              <Image
                src="/o-nama/projektovanje.webp"
                alt={story.images.drawing}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </Frame>
          </Reveal>
          <Reveal delay={0.2}>
            <Frame className="aspect-[4/3]">
              <Image
                src="/o-nama/na-terenu.webp"
                alt={story.images.site}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </Frame>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Frame({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-navy-700/70 bg-navy-900 transition-colors duration-500 hover:border-orange-500/50 ${className}`}
    >
      {children}
    </div>
  );
}
