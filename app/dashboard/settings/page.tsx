import UpgradeCard from "@/app/features/settings/components/UpgradeCard";
import UserInfo from "@/app/features/settings/components/UserInfo";

export default function SettingsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start  p-6 space-y-8">
      <h1 className="text-3xl font-bold text-left w-full max-w-3xl">
        Settings
      </h1>

      {/* Upgrade Card */}
      <UpgradeCard />

      {/* User Info Card */}
      <UserInfo />
    </div>
  );
}
