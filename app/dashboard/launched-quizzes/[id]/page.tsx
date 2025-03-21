import {
  fetchQuizOverview,
  QuizOverview,
} from "@/app/features/launched-quizzes/api/fetchQuizOverview";
import QuizDetails from "@/app/features/launched-quizzes/components/QuizDetails/QuizDetails";
import ErrorMessage from "@/app/shared/components/ErrorMessage";

interface Props {
  params: { id?: string }; // ✅ Make `id` optional for safety
}

export default async function LaunchedQuizPage({ params }: Props) {
  // ✅ Ensure `params` is properly awaited
  const resolvedParams = await Promise.resolve(params);
  const quizId = resolvedParams?.id;

  if (!quizId) {
    return <ErrorMessage error="Invalid Quiz ID." />;
  }

  let quiz: QuizOverview | null = null;
  let error: string | null = null;

  try {
    quiz = await fetchQuizOverview(quizId);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("❌ Error fetching quiz overview:", err.message);
      error = "Failed to load quiz overview. Please try again later.";
    } else {
      console.error("❌ Unexpected error fetching quiz overview:", err);
      error = "An unexpected error occurred.";
    }
  }

  return (
    <div className="min-h-screen">
      {/* Show error message if API call fails */}
      {error ? (
        <ErrorMessage error={error} />
      ) : quiz ? (
        <QuizDetails quiz={quiz} />
      ) : (
        <p className="text-center text-gray-500 mt-4">No quiz found.</p>
      )}
    </div>
  );
}
