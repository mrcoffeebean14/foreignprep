import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProgramExplorer } from "@/components/sections/ProgramExplorer";
import { EligibilityCalculator } from "@/components/sections/EligibilityCalculator";
import { PlatformFeatures } from "@/components/sections/PlatformFeatures";
import { WhyUs } from "@/components/sections/WhyUs";
import { Pricing } from "@/components/sections/Pricing";
import { SuccessStories } from "@/components/sections/SuccessStories";
import { Faq } from "@/components/sections/Faq";
import { LeadBanner } from "@/components/sections/LeadBanner";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProgramExplorer />
        <EligibilityCalculator />
        <PlatformFeatures />
        <WhyUs />
        <Pricing />
        <SuccessStories />
        <Faq />
        <LeadBanner />
      </main>
      <Footer />
    </div>
  );
}
