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

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }); // Ex: January 4, 2025
};

const LessonPlanList: React.FC<LessonPlanListProps> = ({ previews }) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 ">
      {previews.map((plan) => (
        <Card
          key={plan.id}
          rounded="rounded-3xl"
          variant="outline"
          handleOnClick={() =>
            router.push(`/dashboard/my-items/lesson-plans/${plan.id}`)
          }
          className="cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-5   bg-white flex flex-col min-h-[200px]"
        >
          {/* Title */}
          <div className="mb-3">
            <h2 className="text-lg font-black text-gray-900 leading-snug line-clamp-2">
              {plan.title}
            </h2>
          </div>

          {/* Grade & Subject */}
          <div className="flex flex-col flex-grow text-sm text-gray-700 space-y-1">
            <p>
              <span className="font-semibold text-gray-600">Grade:</span>{" "}
              {plan.grade}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Subject:</span>{" "}
              {plan.subject}
            </p>
          </div>

          {/* Date */}
          <div className="pt-4 mt-auto text-sm text-text-secondary border-t border-gray-100">
            {formatDate(plan.created_at)}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default LessonPlanList;
