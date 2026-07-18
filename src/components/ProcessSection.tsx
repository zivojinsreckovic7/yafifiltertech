import Reveal from "@/components/Reveal";

const steps = [
  {
    n: "01",
    title: "Upit i analiza",
    desc: "Analiziramo postojeći sistem ventilacije, protok vazduha i zahteve procesa pre predloga rešenja.",
  },
  {
    n: "02",
    title: "Predlog i ponuda",
    desc: "Predlažemo tip i klasu filtera usklađenu sa ISO 16890 standardom, energetskom efikasnošću i budžetom.",
  },
  {
    n: "03",
    title: "Isporuka i ugradnja",
    desc: "Isporučujemo filtere iz Deltrian programa uz tehničku podršku prilikom ugradnje na objektu.",
  },
  {
    n: "04",
    title: "Redovno održavanje",
    desc: "Pratimo interval zamene filtera i predlažemo plan servisa koji obezbeđuje neprekidan rad sistema.",
  },
];

export default function ProcessSection() {
  return (
    <section className="relative overflow-x-clip">
      <div
        className="wrap flex flex-col justify-center py-24"
      >
        <Reveal className="mb-14 max-w-xl">
          <span className="eyebrow">Proces saradnje</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink-100 md:text-4xl">
            Od upita do dugoročnog partnerstva
          </h2>
        </Reveal>
        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {steps.map((s, index) => (
            <Reveal
              key={s.n}
              delay={index * 0.07}
              className="flex min-h-[320px] flex-col justify-between rounded-2xl border border-navy-700 bg-navy-950/60 p-8"
            >
              <span className="font-display text-5xl font-extrabold text-navy-600">
                {s.n}
              </span>
              <div className="mt-10">
                <h3 className="font-display text-xl font-extrabold text-ink-100">
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
