import { createServerApiClient } from "@/app/lib/utils/api/serverApiClient";

/**
 * Fetches the user's profile data using the server-side API client.
 *
 * @returns A Promise resolving with the user profile.
 */
export const fetchUserProfile = async (): Promise<{
  firstName: string;
  lastName: string;
  tier: string;
}> => {
  try {
    const apiClient = await createServerApiClient();
    const response = await apiClient.get("/user/profile");
    return response.data; // Profile data from the server
  } catch (error: any) {
    console.error(
      "Error fetching user profile:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch user profile"
    );
  }
};
