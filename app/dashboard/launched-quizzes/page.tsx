import { fetchLaunchedQuizzes } from "@/app/features/launched-quizzes/api/fetchLaunchedQuizzes";
import LaunchedQuizzes from "@/app/features/launched-quizzes/components/LaunchedQuizzes";

export default async function LaunchedQuizzesPage() {
  const launchedQuizzes = await fetchLaunchedQuizzes();

  return <LaunchedQuizzes quizzes={launchedQuizzes} />;
}
