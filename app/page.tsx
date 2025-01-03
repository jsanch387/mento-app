import HeroSection from "./features/landing/sections/HeroSection";
import MessageBanner from "./features/landing/components/MessageBanner";
import TopNav from "./features/landing/components/TopNav";
import FeaturesSection from "./features/landing/sections/FeaturesSection";
import PricingSection from "./features/landing/sections/PricingSection";
import AboutSection from "./features/landing/sections/AboutSection";
import Footer from "./features/landing/sections/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="relative z-10">
        <TopNav />
      </header>

      {/* Main Section with Frosted Glass Effect */}
      <main className="flex-1 bg-background">
        {/* <div className="frosted-glass relative p-6 backdrop-blur-md bg-white/20 rounded-lg shadow-md"> */}
        <HeroSection />
        <MessageBanner />
        <FeaturesSection />
        <PricingSection />
        <AboutSection />
        {/* </div> */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
