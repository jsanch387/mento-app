"use client";

import PropTypes from "prop-types";
import Button from "@/app/shared/components/Button";
import Card from "@/app/shared/components/Card";

const pricingTiers = [
  {
    tier: "Basic",
    description: "For individual educators starting out.",
    price: "$8",
    credits: "20 credits a month",
    pricingId: "price_1QbUv4CuDoiqLeJmdmUz8HgV",
  },
  {
    tier: "Pro",
    description: "Do more with extra credits for advanced needs.",
    price: "$15",
    credits: "50 credits a month",
    badge: "Most Popular",
    pricingId: "price_1QbUwKCuDoiqLeJm4RkK6lTu",
  },
  {
    tier: "UNLIMITED",
    description: "UNLIMITED credits for power users.",
    price: "$22",
    credits: "UNLIMITED credits",
    pricingId: "price_1QbUzkCuDoiqLeJmfEpaPWsq",
  },
];

interface PricingCardsProps {
  cardVariant?: "frosted" | "solid" | "outline";
  onButtonClick?: (priceId: string) => void;
}

export default function PricingCards({
  cardVariant,
  onButtonClick,
}: PricingCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {pricingTiers.map((plan, index) => (
        <Card
          variant={cardVariant}
          key={index}
          className="h-full flex flex-col justify-between"
        >
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
            <p className="text-lg min-h-[48px] flex items-center">
              {plan.description}
            </p>
            {/* Price */}
            <p className="flex items-end">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-lg ml-1 font-medium">/month</span>
            </p>
            {/* Credits */}
            <p className="text-text-secondary text-lg">{plan.credits}</p>
          </div>
          {/* Button with Spacing */}
          <div className="mt-14">
            <Button
              label="Get Started"
              variant="primary"
              onClick={() =>
                onButtonClick && plan.pricingId && onButtonClick(plan.pricingId)
              }
            />
          </div>
        </Card>
      ))}
    </div>
  );
}

PricingCards.propTypes = {
  cardVariant: PropTypes.oneOf(["solid", "outline", "frosted"]),
  onButtonClick: PropTypes.func,
};
