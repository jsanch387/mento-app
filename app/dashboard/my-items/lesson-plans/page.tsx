import LessonPlanList from "@/app/features/my-items/LessonPlanList";
import { createServerApiClient } from "@/app/lib/utils/api/serverApiClient";

export default async function LessonPlansPage() {
  let previews = [];

  try {
    // Fetch the lesson plan previews server-side
    const apiClient = await createServerApiClient();
    const response = await apiClient.get("/items/preview/lesson-plans");
    previews = response.data.previews; // Extract the array of previews
  } catch (error: any) {
    console.error("Error fetching lesson plan previews:", error.message);
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Lesson Plans</h1>
      <LessonPlanList previews={previews} />
    </div>
  );
}
