import Link from "next/link";
import type { Metadata } from "next";
import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import ProductSearch from "@/components/ProductSearch";
import TrustSignals from "@/components/TrustSignals";
import CTABanner from "@/components/CTABanner";
import { productCategories } from "@/data/products";

export const metadata: Metadata = {
  title: "Program filtera",
  description:
    "Kompletan program industrijskih filtera — panelni, kasetni, džepasti, kompaktni, HEPA/ULPA i filteri sa aktivnim ugljem. Usklađeno sa ISO 16890 i EN 1822.",
};

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default async function ProizvodiPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const raw = params.q;
  const q = normalize(Array.isArray(raw) ? raw[0] ?? "" : raw ?? "");

  const results = q
    ? productCategories.filter((p) => {
        const haystack = normalize(
          [p.name, p.class, p.description, ...p.keywords].join(" ")
        );
        return haystack.includes(q);
      })
    : productCategories;

  return (
    <div className="pt-32">
      <section className="wrap pb-16">
        <span className="eyebrow">Program filtera</span>
        <SplitHeading
          as="h1"
          className="mt-4 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink-100 md:text-5xl"
        >
          Filteri za svaki stepen industrijske filtracije vazduha.
        </SplitHeading>
        <Reveal delay={0.15} className="mt-6 max-w-lg">
          <p className="text-base leading-relaxed text-ink-400">
            Od predfiltracije do HEPA/ULPA klase — kompletan program
            usklađen sa ISO 16890 i EN 1822 standardima, iz Deltrian
            programa i regionalnih proizvodnih partnera.
          </p>
        </Reveal>
        <Reveal delay={0.25} className="mt-8 max-w-xl">
          <ProductSearch />
        </Reveal>
        <Reveal delay={0.35}>
          <TrustSignals className="mt-6" />
        </Reveal>
      </section>

      <section className="wrap pb-28 md:pb-36">
        {q && (
          <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-ink-400">
            <span>
              {results.length > 0
                ? `Rezultati pretrage za "${raw}"`
                : `Nema rezultata za "${raw}"`}
            </span>
            <Link href="/proizvodi" className="text-orange-400 hover:text-orange-300">
              Prikaži ceo program →
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <CTABanner
            title="Niste sigurni koja klasa filtera odgovara vašem sistemu?"
            text="Pošaljite nam protoke i tip ventilacionog sistema — predlažemo klasu i tip filtera bez obaveze, u roku od 24 časa."
            action="Zatražite besplatnu preporuku →"
          />
        </div>
      </section>
    </div>
  );
}
