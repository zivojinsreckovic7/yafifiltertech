import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import IndustryCard from "@/components/IndustryCard";
import { industries } from "@/data/industries";

export default function IndustriesSection() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="wrap">
        <span className="eyebrow">Rešenja po industrijama</span>
        <SplitHeading
          as="h2"
          className="mt-4 max-w-2xl font-display text-3xl font-extrabold leading-tight text-ink-100 md:text-4xl"
        >
          Namenska rešenja za niše kojima čist vazduh nije opcija.
        </SplitHeading>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={(i % 2) * 0.1}>
              <IndustryCard industry={ind} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
