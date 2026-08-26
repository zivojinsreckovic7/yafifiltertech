import Link from "next/link";
import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/data/products";
import { routes } from "@/data/nav";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export default function ProductsSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const section = dict.productsSection;

  return (
    <section className="relative overflow-x-clip py-28 md:py-36">
      {/* overflow-x-clip on the section: this orb is wider than mobile
          viewports and would otherwise expand the layout viewport */}
      <div
        className="pointer-events-none absolute -top-44 left-1/2 h-[40rem] w-[78rem] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--navy-500) 10%, transparent), color-mix(in srgb, var(--navy-500) 4%, transparent) 55%, transparent)",
        }}
      />
      <div className="wrap">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">{section.eyebrow}</span>
            <SplitHeading
              as="h2"
              className="mt-4 font-display text-3xl font-bold leading-tight text-ink-100 md:text-4xl"
            >
              {section.heading}
            </SplitHeading>
          </div>
          <Reveal delay={0.2}>
            <Link
              href={localePath(locale, routes.products)}
              className="flex items-center gap-2 text-sm font-semibold text-ink-200 transition-colors hover:text-orange-300"
            >
              {section.viewAll}
              <span>→</span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getProducts(locale)
            .slice(0, 6)
            .map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                <ProductCard product={p} index={i} locale={locale} dict={dict} />
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}
