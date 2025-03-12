import { fetchQuizOverview } from "@/app/features/launched-quizzes/api/fetchQuizOverview";
import QuizDetails from "@/app/features/launched-quizzes/components/QuizDetails/QuizDetails";

interface Props {
  params: { id: string };
}

export default async function LaunchedQuizPage({ params }: Props) {
  if (!params?.id) {
    return <div className="text-center text-gray-600">Invalid Quiz ID</div>;
  }

  try {
    // ✅ Fetch quiz overview data from the API
    const quiz = await fetchQuizOverview(params.id);

    // ✅ Pass data as a prop (only serializable values)
    return <QuizDetails quiz={quiz} />;
  } catch (error) {
    console.error("❌ Error fetching quiz overview:", error);
    return (
      <div className="text-center text-gray-600">
        Failed to load quiz overview. Please try again later.
      </div>
    );
  }
}
