import { fetchUserProfile } from "@/app/features/settings/components/api/server-user-api";
import SettingsPage from "@/app/features/settings/components/SettingsPage";

export default async function Settings() {
  let user = { firstName: "", lastName: "", tier: "free" }; // Default user object

  try {
    // Fetch user profile using the server-side utility
    user = await fetchUserProfile();
    console.log("Fetched user profile:", user);
  } catch (error: any) {
    console.error("Error fetching user profile:", error.message);
  }

  return (
    <div className="min-h-screen">
      <SettingsPage user={user} />
    </div>
  );
}
