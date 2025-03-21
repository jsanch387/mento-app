import { fetchLaunchedQuizzes } from "@/app/features/launched-quizzes/api/fetchLaunchedQuizzes";
import LaunchedQuizzes from "@/app/features/launched-quizzes/components/LaunchedQuizzes";
import NoLaunchedQuizzes from "@/app/features/launched-quizzes/components/NoLaunchedQuizzes";
import { LaunchedQuiz } from "@/app/features/launched-quizzes/types/launched-quizzes.type";
import ErrorMessage from "@/app/shared/components/ErrorMessage";

export default async function LaunchedQuizzesPage() {
  let quizzes: LaunchedQuiz[] = [];
  let error: string | null = null;

  try {
    quizzes = await fetchLaunchedQuizzes();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching quizzes:", err.message);
      error = err.message || "An unknown error occurred.";
    } else {
      console.error("Unexpected error:", err);
      error = "An unexpected error occurred.";
    }
  }

  return (
    <div className="min-h-screen ">
      {/* Show error message if API call fails */}
      {error ? (
        <ErrorMessage error={error} />
      ) : quizzes.length > 0 ? (
        <LaunchedQuizzes quizzes={quizzes} />
      ) : (
        <NoLaunchedQuizzes />
      )}
    </div>
  );
}
