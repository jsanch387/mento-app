import { fetchUserProfile } from "@/app/features/settings/components/api/server-user-api";
import SettingsPage from "@/app/features/settings/components/SettingsPage";
import ErrorMessage from "@/app/shared/components/ErrorMessage";

export default async function Settings() {
  let user = { firstName: "", lastName: "", tier: "free" }; // Default user object
  let errorMessage: string | null = null;

  try {
    user = await fetchUserProfile();
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error("Error fetching user profile:", error.message);
    } else {
      errorMessage =
        "An unexpected error occurred while fetching the user profile.";
      console.error("Error fetching user profile:", error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center ">
      {errorMessage ? (
        <ErrorMessage
          className="mx-4 md:mx-auto max-w-screen-sm"
          error={errorMessage}
        />
      ) : (
        <SettingsPage user={user} />
      )}
    </div>
  );
}
