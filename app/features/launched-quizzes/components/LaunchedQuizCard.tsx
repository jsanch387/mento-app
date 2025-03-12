import Link from "next/link";
import { UsersIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import Card from "@/app/shared/components/Card";
import StatusBadge from "./StatusBadge";

interface LaunchedQuizCardProps {
  quiz: {
    id: string;
    title: string;
    className: string;
    launchDate: string;
    studentsTaken: number;
    averageScore: number;
    status: string;
  };
}

export default function LaunchedQuizCard({ quiz }: LaunchedQuizCardProps) {
  return (
    <Card variant="outline" rounded="rounded-3xl">
      {/* Quiz Title & Status */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 truncate w-4/5">
          {quiz.title}
        </h2>
        <StatusBadge status={quiz.status} />
      </div>

      {/* Class Name */}
      <p className="text-gray-500 text-sm mt-1">{quiz.className}</p>

      {/* Launch Date */}
      <p className="text-gray-600 text-sm mt-2">Launched: {quiz.launchDate}</p>

      {/* Student & Score Info */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2 text-gray-700 text-sm">
          <UsersIcon className="h-5 w-5 text-blue-500" />
          {quiz.studentsTaken} students
        </div>
        <div className="flex items-center gap-2 text-gray-700 text-sm">
          <ChartBarIcon className="h-5 w-5 text-green-500" />
          {quiz.averageScore}%
        </div>
      </div>

      {/* View Details Button */}
      <Link href={`/dashboard/launched-quizzes/${quiz.id}`}>
        <button className="mt-5 w-full bg-blue-600 text-white py-2 px-4 rounded-3xl text-sm font-medium hover:bg-blue-700 transition duration-300">
          View Details
        </button>
      </Link>
    </Card>
  );
}
