import Card from "@/app/shared/components/Card";
import { UsersIcon, ChartBarIcon } from "@heroicons/react/24/solid";

interface ClassPerformanceProps {
  quiz: {
    studentsTaken: number;
    averageScore: number;
  };
}

export default function ClassPerformance({ quiz }: ClassPerformanceProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
      {/* Students Taken */}
      <Card
        variant="outline"
        rounded="rounded-3xl"
        className="p-5 flex flex-col items-center"
      >
        <UsersIcon className="h-10 w-10 text-blue-500" />
        <h2 className="text-3xl font-bold mt-2">{quiz.studentsTaken}</h2>
        <p className="text-gray-600 text-sm">Students took this quiz</p>
      </Card>

      {/* Average Score */}
      <Card
        variant="outline"
        rounded="rounded-3xl"
        className="p-5 flex flex-col items-center"
      >
        <ChartBarIcon className="h-10 w-10 text-green-500" />
        <h2 className="text-3xl font-bold mt-2">{quiz.averageScore}%</h2>
        <p className="text-gray-600 text-sm">Average Score</p>
      </Card>
    </div>
  );
}
