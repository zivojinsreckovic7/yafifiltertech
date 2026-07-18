import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";

const pillars = [
  {
    n: "01",
    title: "Ušteda energije",
    desc: "Niži pad pritiska kroz filtersku mediju znači manje opterećenje ventilatora i merljivo nižu potrošnju energije HVAC sistema.",
  },
  {
    n: "02",
    title: "ISO 16890 kvalitet vazduha",
    desc: "Svaka preporuka je usklađena sa aktuelnim standardom klasifikacije filtera po stvarnoj efikasnosti zadržavanja čestica.",
  },
  {
    n: "03",
    title: "Bezbednost procesa",
    desc: "Za farmaciju, prehranu i čiste prostore filtracija nije detalj — to je uslov za bezbedan i validovan proizvodni proces.",
  },
];

export default function Pillars() {
  return (
    <section id="o-nama" className="relative py-28 md:py-36 scroll-mt-24">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="eyebrow">O nama</span>
            <SplitHeading
              as="h2"
              className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink-100 md:text-4xl"
            >
              Industrijski partner, ne samo dobavljač filtera.
            </SplitHeading>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink-400">
                Yafi Filtertech je regionalni distributer Deltrian programa
                filtera za Ex-Yu tržište. Radimo sa proizvodnim pogonima,
                zdravstvenim ustanovama, hotelima i infrastrukturnim
                objektima kojima je čist vazduh deo poslovnog standarda —
                ne dodatna stavka u budžetu.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal
                key={p.n}
                delay={i * 0.1}
                className={`rounded-2xl border border-navy-700/70 bg-navy-900/50 p-7 ${
                  i === 2 ? "sm:col-span-2" : ""
                }`}
              >
                <span className="font-display text-sm font-extrabold text-orange-400">
                  {p.n}
                </span>
                <h3 className="mt-4 font-display text-xl font-extrabold text-ink-100">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-400">
                  {p.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
