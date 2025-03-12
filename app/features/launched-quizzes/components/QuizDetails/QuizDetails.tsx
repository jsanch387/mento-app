"use client"; // ✅ Mark as a client component

import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import QuizHeader from "./QuizHeader";
import ClassPerformance from "./ClassPerformance";
import SmartInsights from "./SmartInsights";
import StudentResults from "./StudentResults";
import { QuizOverview } from "../../api/fetchQuizOverview";

interface QuizDetailsProps {
  quiz: QuizOverview | null;
}

export default function QuizDetails({ quiz }: QuizDetailsProps) {
  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Quiz not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-8 py-6">
      {/* Back Button */}
      <Link
        href="/dashboard/launched-quizzes"
        className="group flex items-center"
      >
        <ArrowLeftIcon className="h-10 w-10 mb-5 text-primary hover:text-blue-800 transition-transform group-hover:-translate-x-1" />
      </Link>

      {/* Quiz Header */}
      <QuizHeader quiz={quiz} />

      {/* Class Performance - Stat Row */}
      <ClassPerformance quiz={quiz} />

      {/* Smart Insights - Full Width Expandable */}
      <SmartInsights insights={quiz.aiInsights} />

      {/* Student Results (Collapsible) */}
      <StudentResults students={quiz.students} />
    </div>
  );
}
