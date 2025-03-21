import apiClient from "@/app/lib/utils/api/apiClient";

export const closeQuiz = async (
  quizId: string
): Promise<{ status: string; smartInsights?: string }> => {
  try {
    const response = await apiClient.post(`/quizzes/${quizId}/status`, {
      status: "closed",
    });

    // console.log("✅ API Response:", response.data);

    return {
      status: response.data.status,
      smartInsights: response.data.smartInsights ?? null, // ✅ Ensure smart insights are returned
    };
  } catch (error) {
    console.error("❌ Error closing quiz:", error);
    throw new Error("Failed to close quiz. Please try again.");
  }
};
