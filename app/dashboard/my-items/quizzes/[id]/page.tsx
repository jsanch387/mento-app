/* eslint-disable @typescript-eslint/no-explicit-any */
import QuizViewer from "@/app/features/create-quiz/components/QuizViewer/QuizViewer";
import { createServerApiClient } from "@/app/lib/utils/api/serverApiClient";

type Params = Promise<{ id: string }>;

interface QuizPageProps {
  params: Params;
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { id } = await params;

  if (!id) {
    console.error("Missing ID in params");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-600">
          Invalid or Missing Quiz ID
        </h1>
      </div>
    );
  }

  let quiz = null;

  try {
    const apiClient = await createServerApiClient();
    const response = await apiClient.get(`/quizzes/${id}`);
    quiz = response.data.quiz;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching quiz:", error.message);
    } else {
      console.error("Error fetching quiz:", error);
    }
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-600">
          No Quiz Found with This ID
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <QuizViewer quiz={quiz} />
    </div>
  );
}
