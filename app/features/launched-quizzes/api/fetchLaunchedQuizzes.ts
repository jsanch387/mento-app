import { createServerApiClient } from "@/app/lib/utils/api/serverApiClient";
import { LaunchedQuiz } from "../types/launched-quizzes.type";

export async function fetchLaunchedQuizzes(): Promise<LaunchedQuiz[]> {
  try {
    const apiClient = await createServerApiClient();
    const response = await apiClient.get("/quizzes/launched");

    console.log("📥 API Response:", response.data); // ✅ Debugging log

    return response.data.map((quiz: Record<string, unknown>) => ({
      id: quiz.id as string,
      title: quiz.title as string,
      className: quiz.class_name as string, // ✅ Map snake_case to camelCase
      launchDate: new Date(quiz.launch_date as string).toLocaleDateString(), // ✅ Format date
      studentsTaken: (quiz.students_completed as number) ?? 0, // ✅ Default to 0 if null
      averageScore: (quiz.average_score as number) ?? 0, // ✅ Default to 0 if null
      status: quiz.status as string, // ✅ Fetch real status from backend
    }));
  } catch (error) {
    console.error("❌ API Error:", error);
    throw new Error("Failed to fetch launched quizzes. Please try again.");
  }
}
