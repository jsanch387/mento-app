"use client";

import FeatureCards from "../features/dashboard/components/FeatureCards";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-start px-4 sm:px-8">
      {/* Left-aligned with padding */}
      <div className="mt-10 w-full">
        {/* Full width for consistent layout */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-left">
          {/* Left-aligned text */}
          What would you like to create?
        </h1>
        <div className="w-full">
          <FeatureCards />
        </div>
      </div>
    </div>
  );
}
