import StudentQuizWrapper from "@/app/features/student-quiz/components/StudentQuizWrapper";
import { createServerApiClient } from "@/app/lib/utils/api/serverApiClient";
import { notFound } from "next/navigation";

// Fetch quiz on the server side
async function fetchQuiz(deploymentId: string) {
  const apiClient = await createServerApiClient();
  const response = await apiClient.get(`/quizzes/launched/${deploymentId}`);
  return response.data.quiz;
}

// ✅ Updated Page component that handles params correctly
export default async function Page({
  params,
}: {
  params: { deploymentId?: string }; // Make deploymentId optional in case it's missing
}) {
  const deploymentId = params?.deploymentId;

  if (!deploymentId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Invalid or Missing Quiz ID</h1>
      </div>
    );
  }

  let quiz = null;

  try {
    quiz = await fetchQuiz(deploymentId);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return notFound(); // Use Next.js's notFound helper
  }

  if (!quiz) {
    return notFound();
  }

  // ✅ Pass `quiz` and `deploymentId` to client wrapper
  return <StudentQuizWrapper deploymentId={deploymentId} quiz={quiz} />;
}
