import Button from "@/app/shared/components/Button";
import Card from "@/app/shared/components/Card";

const pricingTiers = [
  {
    tier: "Basic",
    description: "For individual educators starting out.",
    price: "$8",
    credits: "30 credits a month",
  },
  {
    tier: "Pro",
    description: "Extra credits for advanced needs.",
    price: "$14",
    credits: "100 credits a month",
    badge: "Most Popular", // Add a badge field for Pro
  },
  {
    tier: "UNLIMITED",
    description: "UNLIMITED credits for power users.",
    price: "$22",
    credits: "UNLIMITED credits",
  },
];

export default function PricingCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {pricingTiers.map((plan, index) => (
        <Card variant="frosted" key={index}>
          <div className="flex flex-col items-start space-y-4">
            {/* Plan Tier and Badge */}
            <div className="flex items-center justify-between w-full">
              <h3 className="text-3xl font-semibold">{plan.tier}</h3>
              {plan.badge && (
                <span className="bg-primary text-white text-md font-semibold px-3 py-1 rounded-lg">
                  {plan.badge}
                </span>
              )}
            </div>
            {/* Description */}
            <p className="text-lg pb-10">{plan.description}</p>
            {/* Price */}
            <p className="flex items-end">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-lg ml-1 font-medium">/month</span>
            </p>
            {/* Credits */}
            <p className="text-text-secondary  text-lg pb-5 ">{plan.credits}</p>
            {/* Button */}
            <Button label="Get Started" variant="primary" />
          </div>
        </Card>
      ))}
    </div>
  );
}
