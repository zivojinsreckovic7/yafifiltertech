import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustBand from "@/components/TrustBand";
import Pillars from "@/components/sections/Pillars";
import ProductsSection from "@/components/sections/ProductsSection";
import DeltrianBanner from "@/components/sections/DeltrianBanner";
import IndustriesSection from "@/components/sections/IndustriesSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import FlowRibbon from "@/components/FlowRibbon";
import { resolveLocale } from "@/i18n/config";
import { alternatesFor, getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  return { alternates: alternatesFor(locale, "/") };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      {/* Opaque and above the pinned hero, so it scrolls up over the panel. */}
      <div className="relative z-10 bg-navy-950">
        <FlowRibbon />
        <div className="relative z-[1]">
          <TrustBand items={dict.trustBand} />
          <Pillars dict={dict} />
          <ProductsSection locale={locale} dict={dict} />
          <DeltrianBanner locale={locale} dict={dict} />
          <IndustriesSection locale={locale} dict={dict} />
          <ProcessSection dict={dict} />
          <TestimonialsSection locale={locale} dict={dict} />
          <CTASection locale={locale} dict={dict} />
        </div>
      </div>
    </>
  );
}
