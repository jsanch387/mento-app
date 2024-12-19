import apiClient from "@/app/lib/utils/api/apiClient";
import { createServerApiClient } from "@/app/lib/utils/api/serverApiClient";

/**
 * Updates the user's profile information.
 *
 * @param data - An object containing the first and last name to update.
 * @returns A Promise resolving with the updated user profile.
 */
export const updateUserInfo = async ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}): Promise<{ firstName: string; lastName: string }> => {
  try {
    const response = await apiClient.patch("/user/profile", {
      firstName,
      lastName,
    });

    return response.data; // Updated user profile from the server
  } catch (error: any) {
    console.error(
      "Error updating user info:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to update user info"
    );
  }
};
