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
      {/* Background Layer with Sticky Effect */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-transparent"></div>
        <div className="relative w-full h-full">
          {/* Blurred Circles */}
          <div className="absolute top-10 left-20 w-72 h-72 bg-primary opacity-40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-40 w-96 h-96 bg-primary opacity-50 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary opacity-30 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-10">
        <TopNav />
      </header>

      {/* Main Section with Frosted Glass Effect */}
      <main className="flex-1">
        <div className="frosted-glass relative p-6 backdrop-blur-md bg-white/20 rounded-lg shadow-md">
          <HeroSection />
          <MessageBanner />
          <FeaturesSection />
          <PricingSection />
          <AboutSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
