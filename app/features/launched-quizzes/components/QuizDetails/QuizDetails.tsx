"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import QuizHeader from "./QuizHeader";
import ClassPerformance from "./ClassPerformance";
import SmartInsights from "./SmartInsights";
import StudentResults from "./StudentResults";
import { QuizOverview } from "../../api/fetchQuizOverview";

interface SmartInsightsData {
  markdown: string;
}

interface QuizDetailsProps {
  quiz: QuizOverview | null;
}

export default function QuizDetails({ quiz }: QuizDetailsProps) {
  // ✅ Ensure smartInsights is stored correctly as a string
  const [smartInsights, setSmartInsights] = useState<string | null>(() => {
    if (!quiz?.smartInsights) return null; // Handle undefined case properly

    return typeof quiz.smartInsights === "object"
      ? (quiz.smartInsights as SmartInsightsData).markdown
      : quiz.smartInsights;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [quizStatus, setQuizStatus] = useState(quiz?.status || "active");

  useEffect(() => {
    if (quiz?.status === "closed" && quiz.smartInsights) {
      console.log("📌 Quiz is closed. Ensuring smart insights are loaded...");
      console.log("🧠 Smart Insights:", quiz.smartInsights);

      setSmartInsights(
        typeof quiz.smartInsights === "object"
          ? (quiz.smartInsights as SmartInsightsData).markdown // ✅ Extract Markdown content
          : quiz.smartInsights ?? null
      );
    }
  }, [quiz]);

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center font-bold justify-center">
        <p className="text-gray-600 text-2xl">Quiz not found.</p>
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
      <QuizHeader
        quiz={quiz}
        quizStatus={quizStatus}
        setQuizStatus={setQuizStatus}
        onQuizClosed={setSmartInsights}
        setIsLoading={setIsLoading}
      />

      {/* Class Performance */}
      <ClassPerformance quiz={quiz} />

      {/* Smart Insights */}
      <SmartInsights
        insights={smartInsights}
        quizStatus={quizStatus}
        isLoading={isLoading}
      />

      {/* Student Results */}
      <StudentResults students={quiz.students} />
    </div>
  );
}
