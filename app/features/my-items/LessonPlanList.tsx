"use client";

import Card from "@/app/shared/components/Card";
import { useRouter } from "next/navigation";

interface LessonPlanPreview {
  id: number;
  title: string;
  grade: string;
  subject: string;
  created_at: string;
}

interface LessonPlanListProps {
  previews: LessonPlanPreview[];
}

const LessonPlanList: React.FC<LessonPlanListProps> = ({ previews }) => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-4 px-4">
      {previews.map((plan) => (
        <Card
          key={plan.id}
          variant="outline"
          handleOnClick={() =>
            router.push(`/dashboard/my-items/lesson-plans/${plan.id}`)
          }
          className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200 p-4 flex flex-col min-h-[220px] w-[220px]"
        >
          {/* Title */}
          <div className="h-12 mb-2">
            <h2 className="text-md font-bold line-clamp-2 w-full leading-snug">
              {plan.title}
            </h2>
          </div>

          {/* Grade and Subject */}
          <div className="flex flex-col items-start justify-center flex-grow space-y-1">
            <p className="text-sm text-gray-700">Grade: {plan.grade}</p>
            <p className="text-sm text-gray-700">Subject: {plan.subject}</p>
          </div>

          {/* Date */}
          <div className="mt-auto">
            <p className="text-sm text-text-secondary">
              Created on: {new Date(plan.created_at).toLocaleDateString()}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default LessonPlanList;
