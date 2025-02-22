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
          Affordable Plans for Teachers
        </h2>
        <PricingCards cardVariant="outline" onButtonClick={handleClick} />
      </div>
    </section>
  );
}
