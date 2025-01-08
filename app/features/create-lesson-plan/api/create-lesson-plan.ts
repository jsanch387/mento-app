import apiClient from "@/app/lib/utils/api/apiClient";
import { CreateLessonPlanResponse } from "../types/types";

export const createLessonPlan = async ({
  gradeLevel,
  subject,
  duration,
  additionalDetails,
}: {
  gradeLevel: string;
  subject: string;
  duration: string;
  additionalDetails?: string;
}): Promise<CreateLessonPlanResponse> => {
  try {
    const response = await apiClient.post("/lesson-plans", {
      gradeLevel,
      subject,
      duration,
      additionalDetails,
    });

    // Validate that the response contains the `lessonPlan` object
    if (!response.data.lessonPlan) {
      throw new Error("Invalid API response: Missing 'lessonPlan' field.");
    }

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      "Error creating lesson plan:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to create lesson plan"
    );
  }
};
