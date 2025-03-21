import { createServerApiClient } from "@/app/lib/utils/api/serverApiClient";

export interface Student {
  id: string;
  name: string;
  score: number;
  correct: number;
  incorrect: number;
  status: string;
}

export interface SmartInsights {
  markdown?: string; // Store AI-generated insights as Markdown
}

export interface QuizOverview {
  id: string;
  title: string;
  className: string;
  launchDate: string;
  studentsTaken: number;
  averageScore: number;
  status: string;
  launchUrl: string;
  qrCodeData?: string;
  accessCode: string; // ✅ Include Access Code
  totalQuestions: number;
  smartInsights?: SmartInsights | null; // ✅ Updated to match backend
  students: Student[];
}

export async function fetchQuizOverview(
  quizId: string
): Promise<QuizOverview | null> {
  try {
    const apiClient = await createServerApiClient();
    const response = await apiClient.get(
      `/quizzes/launched/${quizId}/overview`
    );

    // console.log("📥 API Response:", response.data);

    if (!response.data || Object.keys(response.data).length === 0) {
      return null;
    }

    return {
      id: response.data.quiz.id,
      title: response.data.quiz.title,
      className: response.data.quiz.className,
      launchDate: new Date(response.data.quiz.launchDate).toLocaleDateString(),
      studentsTaken: response.data.quiz.studentsTaken ?? 0,
      averageScore: response.data.quiz.averageScore ?? 0,
      status: response.data.quiz.status,
      launchUrl: response.data.quiz.launchUrl,
      qrCodeData: response.data.quiz.qrCodeData,
      accessCode: response.data.quiz.accessCode, // ✅ Store Access Code
      totalQuestions: response.data.quiz.totalQuestions,
      smartInsights: response.data.quiz.smartInsights
        ? { markdown: response.data.quiz.smartInsights } // ✅ Store AI-generated insights
        : null,
      students: response.data.quiz.students ?? [],
    };
  } catch (error) {
    console.error("❌ Error fetching quiz overview:", error);
    throw new Error("Failed to fetch quiz overview. Please try again.");
  }
}
