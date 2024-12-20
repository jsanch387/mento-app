"use client";

import Button from "@/app/shared/components/Button";
import Card from "@/app/shared/components/Card";
import React from "react";

const UpgradeCard = () => {
  return (
    <Card className="w-full max-w-3xl">
      {/* Crown Icon and Title */}
      <div className="flex items-center mb-4">
        <span className="text-yellow-500 text-4xl mr-4">👑</span>
        <h2 className="text-3xl font-bold text-blue-600">
          Unlock the Full Potential
        </h2>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-lg mb-6">
        Upgrade your plan to Pro or Unlimited and keep creating without limits!
      </p>

      {/* Upgrade Button */}
      <Button label="Upgrade" size="large" />
    </Card>
  );
};

export default UpgradeCard;