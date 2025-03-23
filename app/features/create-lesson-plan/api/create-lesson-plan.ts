import apiClient from "@/app/lib/utils/api/apiClient";
import { AxiosError } from "axios";
import { GenerateLessonPlanRequest, LessonPlanResponse } from "../types/types";

// 🔹 API Call
export const generateLessonPlan = async (
  payload: GenerateLessonPlanRequest
): Promise<LessonPlanResponse> => {
  try {
    const response = await apiClient.post<LessonPlanResponse>(
      "/lesson-plans/generate",
      payload
    );

    if (!response.data?.content) {
      throw new Error("Invalid API response: Missing 'content' field.");
    }

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create lesson plan.";
      console.error("Axios error:", message);
      throw new Error(message);
    }

    console.error("Unknown error:", error);
    throw new Error("An unexpected error occurred. Please try again.");
  }
};
