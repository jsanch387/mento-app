import { fetchUserProfile } from "@/app/features/settings/components/api/server-user-api";
import SettingsPage from "@/app/features/settings/components/SettingsPage";

export default async function Settings() {
  let user = { firstName: "", lastName: "", tier: "free" }; // Default user object

  try {
    user = await fetchUserProfile();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching user profile:", error.message);
    } else {
      console.error("Error fetching user profile:", error);
    }
  }

  return (
    <div className="min-h-screen">
      <SettingsPage user={user} />
    </div>
  );
}
