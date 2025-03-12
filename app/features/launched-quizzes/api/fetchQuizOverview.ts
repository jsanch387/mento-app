import { createServerApiClient } from "@/app/lib/utils/api/serverApiClient";

export interface Student {
  id: string;
  name: string;
  score: number;
  correct: number;
  incorrect: number;
  status: string;
}

export interface AiInsights {
  struggles?: { concept: string; reason: string }[];
  reinforcement?: string[];
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
  qrCodeData?: string; // ✅ Include QR Code
  totalQuestions: number;
  aiInsights: AiInsights;
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

    console.log("📥 API Response:", response.data); // ✅ Debugging log

    return {
      id: response.data.quiz.id,
      title: response.data.quiz.title,
      className: response.data.quiz.className,
      launchDate: new Date(response.data.quiz.launchDate).toLocaleDateString(),
      studentsTaken: response.data.quiz.studentsTaken ?? 0,
      averageScore: response.data.quiz.averageScore ?? 0,
      status: response.data.quiz.status,
      launchUrl: response.data.quiz.launchUrl,
      qrCodeData: response.data.quiz.qrCodeData, // ✅ Fetch QR Code
      totalQuestions: response.data.quiz.totalQuestions,
      aiInsights: response.data.quiz.aiInsights ?? {},
      students: response.data.quiz.students ?? [],
    };
  } catch (error) {
    console.error("❌ Error fetching quiz overview:", error);
    return null;
  }
}
