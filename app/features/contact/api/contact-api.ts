import apiClient from "@/app/lib/utils/api/apiClient";

/**
 * Submits the contact form data to the backend.
 * @param data - An object containing the user's first name, last name, email, and message.
 * @returns A promise resolving to the response from the server.
 */
export const submitContactForm = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.post("/contact", data);
    return response.data; // Return the response from the backend
  } catch (error: any) {
    console.error("Error submitting contact form:", error.message);
    throw new Error(
      error.response?.data?.message || "Failed to submit contact form."
    );
  }
};