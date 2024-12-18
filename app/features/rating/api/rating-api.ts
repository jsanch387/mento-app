// src/app/lib/utils/api/rating.ts
import apiClient from "@/app/lib/utils/api/apiClient";

interface RatingData {
  firstName: string;
  lastName: string;
  email: string;
  rating: number;
  comment?: string;
}

/**
 * Submit user feedback to the backend API.
 * @param data - User rating form data
 * @returns Confirmation message from backend
 */
export const submitUserFeedback = async (data: RatingData) => {
  try {
    const response = await apiClient.post("/rating", data);
    return response.data; // Backend returns success message
  } catch (error: any) {
    console.error("Error submitting feedback:", error.message);
    throw new Error(
      error.response?.data?.error ||
        "Failed to submit feedback. Please try again."
    );
  }
};
