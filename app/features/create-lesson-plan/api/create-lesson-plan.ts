import apiClient from "@/app/lib/utils/api/apiClient";

interface CreateLessonPlanResponse {
  // Define the structure of the response here
  id: string;
  gradeLevel: string;
  subject: string;
  duration: string;
  additionalDetails?: string;
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
