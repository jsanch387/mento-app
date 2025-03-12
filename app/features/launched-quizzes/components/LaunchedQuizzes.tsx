"use client";

import LaunchedQuizCard from "@/app/features/launched-quizzes/components/LaunchedQuizCard";
import NoLaunchedQuizzes from "./NoLaunchedQuizzes";

interface LaunchedQuizzesProps {
  quizzes: {
    id: string;
    title: string;
    className: string;
    launchDate: string;
    studentsTaken: number;
    averageScore: number;
    status: string;
  }[];
}

export default function LaunchedQuizzes({ quizzes }: LaunchedQuizzesProps) {
  return (
    <div className="min-h-screen flex flex-col px-8 py-6">
      {/* Page Header */}
      <h1 className="text-3xl font-black font-sans text-gray-900 flex items-center gap-3">
        Launched Quizzes
      </h1>
      <p className="text-gray-600 mt-1">
        View all the quizzes you&apos;ve launched and track student performance.
      </p>

      {/* Quiz List */}
      {quizzes.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <LaunchedQuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      ) : (
        <NoLaunchedQuizzes />
      )}
    </div>
  );
}
