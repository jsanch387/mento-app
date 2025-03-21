import { fetchQuizOverview } from "@/app/features/launched-quizzes/api/fetchQuizOverview";
import QuizDetails from "@/app/features/launched-quizzes/components/QuizDetails/QuizDetails";
import ErrorMessage from "@/app/shared/components/ErrorMessage";

export default async function LaunchedQuizPage({
  params,
}: {
  params: Promise<{ id: string }>; // ✅ Params is a promise in Next.js 15
}) {
  // ✅ Await params before accessing id
  const resolvedParams = await params;
  const quizId = resolvedParams?.id;

  if (!quizId) {
    return <ErrorMessage error="Invalid Quiz ID." />;
  }

  try {
    const quiz = await fetchQuizOverview(quizId);
    return (
      <div className="min-h-screen">
        {quiz ? (
          <QuizDetails quiz={quiz} />
        ) : (
          <p className="text-center text-gray-500 mt-4">No quiz found.</p>
        )}
      </div>
    );
  } catch (err: unknown) {
    console.error("❌ Error fetching quiz overview:", err);
    return (
      <ErrorMessage error="Failed to load quiz overview. Please try again later." />
    );
  }
}
