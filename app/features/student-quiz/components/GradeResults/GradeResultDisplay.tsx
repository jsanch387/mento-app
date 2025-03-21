"use client";

import React from "react";
import QuizResultsSummary from "./QuizResultsSummary";
import GradedQuestionCard from "./GradedQuestionCard";
import { GradedAnswer } from "@/app/features/create-quiz/types/quiz.types";

interface GradedResultsDisplayProps {
  gradedResults: GradedAnswer[];
}

const GradedResultsDisplay: React.FC<GradedResultsDisplayProps> = ({
  gradedResults,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center w-full bg-blue-50 py-10 px-4 sm:px-6">
      <QuizResultsSummary gradedResults={gradedResults} />

      {/* Graded Questions List */}
      <div className="w-full max-w-3xl space-y-6 mt-8">
        {gradedResults.map((result, index) => (
          <GradedQuestionCard key={index} index={index} result={result} />
        ))}
      </div>

      {/* Encouraging Footer */}
      <div className="mt-12 text-center">
        <p className="text-gray-700 font-medium">
          Every step counts — you&apos;re doing great! 🚀
        </p>
      </div>
    </div>
  );
};

export default GradedResultsDisplay;
