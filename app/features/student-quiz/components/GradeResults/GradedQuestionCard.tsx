import { GradedAnswer } from "@/app/features/create-quiz/types/quiz.types";
import React from "react";

interface Props {
  index: number;
  result: GradedAnswer;
}

const primaryColor = "#007BFF";

const GradedQuestionCard: React.FC<Props> = ({ index, result }) => {
  return (
    <div className="relative p-6 rounded-3xl shadow-md bg-white border border-gray-200 transition-all hover:shadow-xl">
      {/* Header - Number + Full Question + Correct/Incorrect Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div className="flex items-start gap-2 flex-1">
          <span className="font-black font-sans text-2xl text-primary">
            {index + 1}.
          </span>
          <p className="text-gray-900 text-base sm:text-lg font-semibold">
            {result.question}
          </p>
        </div>

        <div
          className={`flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full self-start sm:self-center ${
            result.isCorrect
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {result.isCorrect ? "✅ Correct" : "❌ Incorrect"}
        </div>
      </div>

      {/* Answers Section */}
      <div className="space-y-2">
        <div className="p-3 rounded-lg bg-gray-50 border">
          <p className="text-sm font-medium">Your Answer:</p>
          <p className="text-gray-900">
            {result.studentAnswer || "No Answer Provided"}
          </p>
        </div>

        <div className="p-3 rounded-lg bg-blue-50 border border-blue-300">
          <p className="text-sm font-medium">Correct Answer:</p>
          <p className="font-bold text-blue-700">{result.correctAnswer}</p>
        </div>
      </div>

      {/* Explanation Section */}
      <div
        className="mt-4 p-4 rounded-lg bg-gray-50 border-l-4 text-sm text-gray-700"
        style={{ borderColor: primaryColor }}
      >
        <p className="font-medium flex items-start gap-2">
          <span>{result.isCorrect ? "🌟" : "💡"}</span>
          <span>
            <strong>Explanation:</strong> {result.explanation}
          </span>
        </p>
      </div>
    </div>
  );
};

export default GradedQuestionCard;
