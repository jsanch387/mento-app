import LessonPlan from "@/app/features/create-lesson-plan/components/LessonPlan";
import { createServerApiClient } from "@/app/lib/utils/api/serverApiClient";

type Params = Promise<{ id: string }>;

interface LessonPlanPageProps {
  params: Params;
}

// Utility function to handle camel case
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertToCamelCase(lessonPlan: any) {
  return {
    ...lessonPlan,
    materials: lessonPlan.materials || [],
    learningObjectives: lessonPlan.learning_objectives || [],
    lessonPlanStructure: lessonPlan.lesson_plan_structure || {},
  };
}

export default async function LessonPlanPage({ params }: LessonPlanPageProps) {
  const { id } = await params;

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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching lesson plan:", error.message);
    } else {
      console.error("Error fetching lesson plan:", error);
    }
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
