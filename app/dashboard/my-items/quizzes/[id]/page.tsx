import QuizViewer from "@/app/features/create-quiz/components/QuizViewer/QuizViewer";
import { createServerApiClient } from "@/app/lib/utils/api/serverApiClient";

type Params = { id: string };

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
  let launchStatus = {
    isLaunched: false,
    deploymentLink: "",
    qrCodeData: "",
  };

  try {
    const apiClient = await createServerApiClient();

    // Fetch the quiz
    const quizResponse = await apiClient.get(`/quizzes/${id}`);
    quiz = quizResponse.data.quiz;
  } catch (error: unknown) {
    console.error("Error loading quiz or launch status:", error);
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
      <QuizViewer quiz={quiz} initialLaunchStatus={launchStatus} />
    </div>
  );
}
