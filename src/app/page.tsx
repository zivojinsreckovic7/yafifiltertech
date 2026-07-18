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

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative">
        <FlowRibbon />
        <div className="relative z-[1]">
          <TrustBand />
          <Pillars />
          <ProductsSection />
          <DeltrianBanner />
          <IndustriesSection />
          <ProcessSection />
          <TestimonialsSection />
          <CTASection />
        </div>
      </div>
    </>
  );
}
