import Reveal from "@/components/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

export default function ProcessSection({ dict }: { dict: Dictionary }) {
  const { process } = dict;

  return (
    <section className="relative overflow-x-clip">
      <div
        className="wrap flex flex-col justify-center py-24"
      >
        <Reveal className="mb-14 max-w-xl">
          <span className="eyebrow">{process.eyebrow}</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink-100 md:text-4xl">
            {process.heading}
          </h2>
        </Reveal>
        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {process.steps.map((s, index) => (
            <Reveal
              key={s.title}
              delay={index * 0.07}
              className="flex min-h-[320px] flex-col justify-between rounded-2xl border border-navy-700 bg-navy-950/60 p-8"
            >
              <span className="font-display text-5xl font-bold text-navy-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="mt-10">
                <h3 className="font-display text-xl font-bold text-ink-100">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-400">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
