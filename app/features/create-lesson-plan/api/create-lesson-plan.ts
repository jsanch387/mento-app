import apiClient from "@/app/lib/utils/api/apiClient";

interface CreateLessonPlanResponse {
  lessonPlan: any; // Adjust based on your backend response
}

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

    return response.data;
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
