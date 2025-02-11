import apiClient from "@/app/lib/utils/api/apiClient";
import { Lab } from "../types/Lab.types";

export interface CreateLabResponse {
  lab: Lab;
}

export const createLab = async ({
  gradeLevel,
  subject,
  context,
  standards,
  duration,
}: {
  gradeLevel: string;
  subject: string;
  context: string;
  standards?: string;
  duration: string;
}): Promise<CreateLabResponse> => {
  try {
    const response = await apiClient.post<CreateLabResponse>("/labs", {
      gradeLevel,
      subject,
      context,
      standards,
      duration,
    });

    // Validate that the response contains the `lab` object
    if (!response.data.lab) {
      throw new Error("Invalid API response: Missing 'lab' field.");
    }

    // Ensure consistent handling of snake case data on the frontend
    return {
      lab: {
        ...response.data.lab,
        learning_objectives: response.data.lab.learning_objectives,
        discussion_questions: response.data.lab.discussion_questions,
        safety_notes: response.data.lab.safety_notes,
        standards_alignment: response.data.lab.standards_alignment,
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error && "response" in error) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };

      console.error(
        "Error creating lab:",
        axiosError.response?.data || error.message
      );
      throw new Error(
        axiosError.response?.data?.message || "Failed to create lab"
      );
    }

    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred.");
  }
};
