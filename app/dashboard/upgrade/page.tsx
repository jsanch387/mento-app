"use client"; // Convert Upgrade to a Client Component

import PricingCards from "@/app/features/landing/components/PricingCards";
import { createCheckoutSession } from "@/app/features/stripe/api/create-checkout-session";

export default function Upgrade() {
  const handleUpgrade = async (priceId: string) => {
    try {
      const checkoutUrl = await createCheckoutSession(priceId);
      window.location.href = checkoutUrl; // Redirect to Stripe Checkout page
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error upgrading:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center p-10">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl font-bold text-left ">Choose your plan</h1>
        <PricingCards cardVariant="outline" onButtonClick={handleUpgrade} />
      </div>
    </div>
  );
}
