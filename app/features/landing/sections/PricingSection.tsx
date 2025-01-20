"use client";

import { useRouter } from "next/navigation";
import PricingCards from "../components/PricingCards";

export default function PricingSection() {
  const router = useRouter();

  function handleClick(): void {
    router.push("/signup");
  }

  return (
    <section id="pricing" className="py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-sans font-black text-center mb-4">
          Plans that work for you
        </h2>
        <p className="text-center text-lg text-text-secondary mb-12">
          Generating high-quality content costs money, but we’ve priced our
          plans to be affordable and accessible for everyone.
        </p>
        <PricingCards cardVariant="outline" onButtonClick={handleClick} />
      </div>
    </section>
  );
}
