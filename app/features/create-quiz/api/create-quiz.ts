import apiClient from "@/app/lib/utils/api/apiClient";
import { Quiz } from "../types/quiz.types";

export interface CreateQuizResponse {
  quiz: Quiz;
}

export const createQuiz = async ({
  topic,
  subject, // ✅ Add subject here
  gradeLevel,
  numberOfQuestions,
  questionTypes,
  customInstructions,
  includeHints,
}: {
  topic: string;
  subject: string; // ✅ Include subject in the type
  gradeLevel: string;
  numberOfQuestions: number;
  questionTypes: string[];
  customInstructions?: string;
  includeHints: boolean;
}): Promise<CreateQuizResponse> => {
  try {
    const response = await apiClient.post<CreateQuizResponse>("/quizzes", {
      topic,
      subject, // ✅ Send subject in the request payload
      gradeLevel,
      numberOfQuestions,
      questionTypes,
      customInstructions,
      includeHints,
    });

    // ✅ Validate the response contains the quiz object
    if (!response.data.quiz) {
      throw new Error("Invalid API response: Missing 'quiz' field.");
    }

    // ✅ Return the quiz from the response
    return {
      quiz: response.data.quiz,
    };
  } catch (error: unknown) {
    if (error instanceof Error && "response" in error) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };

      console.error(
        "Error creating quiz:",
        axiosError.response?.data || error.message
      );
      throw new Error(
        axiosError.response?.data?.message || "Failed to create quiz"
      );
    }

    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred.");
  }
};
