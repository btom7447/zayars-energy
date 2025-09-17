import AboutSection from "@/components/AboutSection";
import BrandSection from "@/components/BrandSection";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import MarketSection from "@/components/MarketSection";
import MetricsSection from "@/components/MetricsSection";
import ProcessSection from "@/components/ProcessSection";
import ServicesSection from "@/components/ServicesSection";
import WhyZayars from "@/components/WhyZayars";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <MetricsSection />
      <ProcessSection />
      <MarketSection />
      <WhyZayars />
      <BrandSection />
      <ContactSection />
    </>
  );
}
