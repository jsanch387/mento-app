"use client";

import React from "react";
import Card from "@/app/shared/components/Card";
import UpgradeCard from "./UpgradeCard";
import UserInfo from "./UserInfo";

export default function SettingsPage({
  user,
}: {
  user: { firstName: string; lastName: string; tier: string };
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 space-y-8">
      <h1 className="text-4xl font-bold text-left w-full max-w-3xl">
        Settings
      </h1>

      {/* Conditional Rendering for Upgrade or Current Plan Card */}
      {user.tier === "free" ? (
        <UpgradeCard />
      ) : (
        <Card className="w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Your Plan</h2>
          <p className="text-text-secondary text-lg mb-6">
            You are currently on the <strong>{user.tier}</strong> plan.
          </p>
        </Card>
      )}

      {/* User Info Card */}
      <UserInfo firstName={user.firstName} lastName={user.lastName} />
    </div>
  );
}
