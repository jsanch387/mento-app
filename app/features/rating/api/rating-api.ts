import apiClient from "@/app/lib/utils/api/apiClient";

interface RatingData {
  firstName: string;
  lastName: string;
  email: string;
  rating: number;
  comment?: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

/**
 * Submit user feedback to the backend API.
 * @param data - User rating form data
 * @returns Confirmation message from backend
 */
export const submitUserFeedback = async (
  data: RatingData
): Promise<{ message: string }> => {
  try {
    const response = await apiClient.post("/rating", data);
    return response.data; // Backend returns success message
  } catch (error) {
    const typedError = error as ApiError; // Use the `ApiError` type
    console.error("Error submitting feedback:", typedError);

    const errorMessage =
      typedError.response?.data?.message ||
      "Failed to submit feedback. Please try again.";

    throw new Error(errorMessage);
  }
};
