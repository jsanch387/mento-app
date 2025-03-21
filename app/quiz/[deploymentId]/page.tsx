import StudentQuizWrapper from "@/app/features/student-quiz/components/StudentQuizWrapper";
import { createServerApiClient } from "@/app/lib/utils/api/serverApiClient";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ deploymentId: string }>;
}) {
  // ✅ Await params properly (Next.js 15 requirement)
  const { deploymentId } = await params;

  if (!deploymentId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Invalid or Missing Quiz ID</h1>
      </div>
    );
  }

  let quiz = null;
  try {
    const apiClient = await createServerApiClient(false);
    const response = await apiClient.get(`/quizzes/launched/${deploymentId}`);
    quiz = response.data.quiz;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return notFound();
  }

  if (!quiz) {
    return notFound();
  }

  return <StudentQuizWrapper deploymentId={deploymentId} quiz={quiz} />;
}
