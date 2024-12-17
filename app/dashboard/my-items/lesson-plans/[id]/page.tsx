import LessonPlan from "@/app/features/create-lesson-plan/components/LessonPlan";
import { createServerApiClient } from "@/app/lib/utils/api/serverApiClient";

function convertToCamelCase(lessonPlan: any) {
  return {
    ...lessonPlan,
    materials: lessonPlan.materials || [], // Ensure array fallback
    learningObjectives: lessonPlan.learning_objectives || [], // Ensure array fallback
    lessonPlanStructure: lessonPlan.lesson_plan_structure || {}, // Ensure object fallback
  };
}

export default async function LessonPlanPage(props: {
  params: { id: string };
}) {
  const params = await Promise.resolve(props.params); // Ensures params is awaited properly
  const id = params?.id;

  if (!id) {
    console.error("Missing ID in params");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-600">
          Invalid or Missing Lesson Plan ID
        </h1>
      </div>
    );
  }

  let lessonPlan = null;

  try {
    const apiClient = await createServerApiClient();
    const response = await apiClient.get(`/lesson-plans/${id}`);

    lessonPlan = convertToCamelCase(response.data);
  } catch (error: any) {
    console.error("Error fetching lesson plan:", error.message);
  }

  if (!lessonPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-600">
          Lesson Plan Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex justify-center">
      <LessonPlan lessonPlan={lessonPlan} />
    </div>
  );
}
