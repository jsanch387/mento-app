"use client";

import FeatureCards from "../features/dashboard/components/FeatureCards";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center ">
      <div className="mt-10 ">
        <h1 className="text-4xl font-bold mb-10 text-center">
          What would you like to create?
        </h1>
        <FeatureCards />
      </div>
    </div>
  );
}
