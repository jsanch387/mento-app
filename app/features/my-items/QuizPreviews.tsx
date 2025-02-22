"use client";

import Card from "@/app/shared/components/Card";
import { useRouter } from "next/navigation";

interface QuizPreview {
  id: string;
  title: string;
  subject: string;
  grade_level: string;
  created_at: string;
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? "Invalid Date"
    : date.toLocaleDateString("en-US", options);
};

const QuizPreviews = ({ previews }: { previews: QuizPreview[] }) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
      {previews.map((quiz) => (
        <Card
          key={quiz.id}
          variant="outline"
          handleOnClick={() =>
            router.push(`/dashboard/my-items/quizzes/${quiz.id}`)
          }
          className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200 p-4 flex flex-col min-h-[200px]"
        >
          {/* Title */}
          <div className="h-12 mb-2">
            <h3 className="text-md font-bold line-clamp-2 w-full leading-snug">
              {quiz.title || "No Title Provided"}
            </h3>
          </div>

          {/* Subject and Grade */}
          <div className="flex flex-col items-start justify-center flex-grow space-y-2">
            <p className="text-sm text-gray-700">Subject: {quiz.subject}</p>
            <p className="text-sm text-gray-700">Grade: {quiz.grade_level}</p>
          </div>

          {/* Date */}
          <div className="mt-5">
            <p className="text-sm text-text-secondary">
              Created: {formatDate(quiz.created_at)}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default QuizPreviews;
