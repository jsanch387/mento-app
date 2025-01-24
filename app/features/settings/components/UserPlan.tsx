"use client";

import React from "react";
import Card from "@/app/shared/components/Card";
import Link from "next/link";

interface UserPlanProps {
  tier: string;
}

const UserPlan: React.FC<UserPlanProps> = ({ tier }) => {
  return (
    <Card className="w-full max-w-3xl">
      <h2 className="text-3xl font-black font-sans text-blue-600 mb-4">
        Your Plan
      </h2>
      <p className="text-text-secondary text-lg mb-6">
        You are currently on the <strong>{tier}</strong> plan.
      </p>
      <p className="text-sm text-gray-500 mt-4">
        To cancel, please{" "}
        <Link
          href="/dashboard/contact"
          className="text-primary underline hover:text-primary-dark"
        >
          contact us
        </Link>
        .
      </p>
    </Card>
  );
};

export default UserPlan;
