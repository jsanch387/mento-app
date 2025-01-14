"use client";

import React from "react";
import UpgradeCard from "./UpgradeCard";
import UserInfo from "./UserInfo";
import UserPlan from "./UserPlan";

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
      {user.tier === "free" ? <UpgradeCard /> : <UserPlan tier={user.tier} />}

      {/* User Info Card */}
      <UserInfo firstName={user.firstName} lastName={user.lastName} />
    </div>
  );
}
