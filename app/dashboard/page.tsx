"use client";

import FeatureCards from "../features/dashboard/components/FeatureCards";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-start sm:px-8 px-4">
      {/* Header Section */}
      <div className="mt-10 w-full">
        <h1 className="text-3xl sm:text-4xl font-black font-sans mb-10 text-left">
          What would you like to create?
        </h1>
        {/* Feature Cards */}
        <FeatureCards />
      </div>
    </div>
  );
}
