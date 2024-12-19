import SettingsPage from "@/app/features/settings/components/SettingsPage";
import { createServerApiClient } from "@/app/lib/utils/api/serverApiClient";

export default async function Settings() {
  let user = { firstName: "", lastName: "", tier: "free" }; // Default user object

  try {
    const apiClient = await createServerApiClient();
    const response = await apiClient.get("/user/profile"); // No need for query params
    user = response.data;
    console.log("user", user);
  } catch (error: any) {
    console.error("Error fetching user profile:", error.message);
  }

  return (
    <div className="min-h-screen">
      <SettingsPage user={user} />
    </div>
  );
}
