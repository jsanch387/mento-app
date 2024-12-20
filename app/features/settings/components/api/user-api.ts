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

/**
 * Fetches the user's current token balance.
 *
 * @returns The number of tokens the user has.
 */
export const getUserTokens = async (): Promise<number> => {
  try {
    const response = await apiClient.get("/user/tokens");
    return response.data.tokens;
  } catch (error: any) {
    console.error("Error fetching user tokens:", error.message);
    throw new Error("Failed to fetch user tokens.");
  }
};

/**
 * Consume a user token.
 * @returns {Promise<void>} Resolves if successful; otherwise throws an error.
 */
export const consumeToken = async (): Promise<void> => {
  try {
    const response = await apiClient.post("/user/tokens/consume");
    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to consume token.");
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Token consumption failed.");
  }
};
