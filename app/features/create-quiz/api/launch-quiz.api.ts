import apiClient from "@/app/lib/utils/api/apiClient";

/**
 * Response type for launching a quiz.
 */
export interface LaunchQuizResponse {
  message: string;
  deploymentLink: string;
  qrCodeData: string;
  accessCode: string; // ✅ New Access Code field
}

/**
 * Launches a quiz by calling the backend API.
 *
 * @param quizId - The ID of the quiz to launch.
 * @param className - The class name to associate with this deployment (e.g., "1st Hour Biology").
 * @param notes - Optional notes provided by the teacher when launching the quiz.
 * @returns A promise resolving to the deployment link, QR code data, and access code.
 */
export const launchQuiz = async ({
  quizId,
  className,
  notes,
}: {
  quizId: string;
  className: string;
  notes?: string;
}): Promise<LaunchQuizResponse> => {
  try {
    const response = await apiClient.post<LaunchQuizResponse>(
      `/quizzes/${quizId}/launch`,
      { className, notes }
    );

    // ✅ Validate API response
    if (
      !response.data.deploymentLink ||
      !response.data.qrCodeData ||
      !response.data.accessCode
    ) {
      throw new Error("Invalid API response: Missing deployment data.");
    }

    return {
      message: response.data.message,
      deploymentLink: response.data.deploymentLink,
      qrCodeData: response.data.qrCodeData,
      accessCode: response.data.accessCode, // ✅ Return access code
    };
  } catch (error: unknown) {
    if (error instanceof Error && "response" in error) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      console.error(
        "Error launching quiz:",
        axiosError.response?.data || error.message
      );
      throw new Error(
        axiosError.response?.data?.message || "Failed to launch quiz."
      );
    }

    console.error("Unexpected error during quiz launch:", error);
    throw new Error("An unexpected error occurred while launching the quiz.");
  }
};
