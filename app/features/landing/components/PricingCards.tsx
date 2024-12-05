import Button from "@/app/shared/components/Button";
import Card from "@/app/shared/components/Card";

const pricingTiers = [
  {
    tier: "Basic",
    description: "For individual educators starting out.",
    price: "$8/month",
    credits: "30 credits a month",
  },
  {
    tier: "Pro",
    description: "Extra credits for advanced needs.",
    price: "$14/month",
    credits: "100 credits a month",
    badge: "Most Popular", // Add a badge field for Pro
  },
  {
    tier: "UNLIMITED",
    description: "UNLIMITED credits for power users.",
    price: "$22/month",
    credits: "UNLIMITED credits",
  },
];

export default function PricingCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {pricingTiers.map((plan, index) => (
        <Card key={index} className="relative">
          <div className="flex flex-col items-start space-y-4">
            {/* Badge (Conditionally Rendered) */}
            {plan.badge && (
              <div className="absolute top-0 right-0 bg-primary text-white text-lg font-medium px-3 py-1 rounded-bl-lg">
                {plan.badge}
              </div>
            )}
            {/* Plan Tier */}
            <h3 className="text-3xl font-semibold">{plan.tier}</h3>
            {/* Description */}
            <p>{plan.description}</p>
            {/* Price */}
            <p className="text-2xl font-bold">{plan.price}</p>
            {/* Credits */}
            <p className="text-text-secondary">{plan.credits}</p>
            {/* Button */}
            <Button label="Get Started" />
          </div>
        </Card>
      ))}
    </div>
  );
}
