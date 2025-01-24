"use client";

import Card from "@/app/shared/components/Card";
import { useRouter } from "next/navigation";

interface AnalogyGroupPreview {
  id: string;
  context: string;
  subject?: string;
  gradeLevel?: string;
  createdAt: string;
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

const AnalogyGroupList: React.FC<{ previews: AnalogyGroupPreview[] }> = ({
  previews,
}) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
      {previews.map((preview) => (
        <Card
          key={preview.id}
          variant="outline"
          handleOnClick={() =>
            router.push(`/dashboard/my-items/analogies/${preview.id}`)
          }
          className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200 p-4 flex flex-col min-h-[200px]"
        >
          {/* Context */}
          <div className="h-12 mb-2">
            <h3 className="text-md font-bold line-clamp-2 w-full leading-snug">
              {preview.context || "No Context Provided"}
            </h3>
          </div>

          {/* Subject and Grade */}
          <div className="flex flex-col items-start justify-center flex-grow space-y-2">
            {preview.subject && (
              <p className="text-sm text-gray-700">
                Subject: {preview.subject}
              </p>
            )}
            {preview.gradeLevel && (
              <p className="text-sm text-gray-700">{preview.gradeLevel}</p>
            )}
          </div>

          {/* Date */}
          <div className="mt-5">
            <p className="text-sm text-text-secondary">
              Created: {formatDate(preview.createdAt)}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AnalogyGroupList;
