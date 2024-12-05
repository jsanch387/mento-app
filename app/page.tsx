import HeroSection from "./features/landing/sections/HeroSection";
import MessageBanner from "./features/landing/components/MessageBanner";
import TopNav from "./features/landing/components/TopNav";
import FeaturesSection from "./features/landing/sections/FeaturesSection";
import PricingSection from "./features/landing/sections/PricingSection";
import AboutSection from "./features/landing/sections/AboutSection";
import Footer from "./features/landing/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header>
        <TopNav />
      </header>

      {/* Content Section */}
      <main className="flex-1 bg-background">
        <HeroSection />
        <MessageBanner />
        <FeaturesSection />
        <PricingSection />
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
