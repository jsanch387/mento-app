import { GradedAnswer } from "@/app/features/create-quiz/types/quiz.types";
import React from "react";

interface Props {
  gradedResults: GradedAnswer[];
}

const QuizResultsSummary: React.FC<Props> = ({ gradedResults }) => {
  const totalCorrect = gradedResults.filter((r) => r.isCorrect).length;
  const totalQuestions = gradedResults.length;
  const scorePercentage = Math.round((totalCorrect / totalQuestions) * 100);

  const getFriendlyMessage = () => {
    if (scorePercentage === 100)
      return "🌟 Perfect Score! You're a quiz master!";
    if (scorePercentage >= 80) return "👏 Great Job! Almost perfect!";
    if (scorePercentage >= 60) return "😊 Good work! Keep practicing!";
    return "📚 You're learning — keep going!";
  };

  return (
    <div className="w-full max-w-3xl bg-white shadow-lg rounded-3xl p-6 border border-gray-200">
      <h1 className="text-3xl font-black font-sans text-primary text-center">
        Quiz Results
      </h1>
      <p className="text-center mt-2 text-lg text-gray-700">
        {getFriendlyMessage()}
      </p>

      <div className="mt-4 text-center">
        <p className="text-5xl font-black font-sans text-primary">
          {totalCorrect}/{totalQuestions}
        </p>
        <p className="text-gray-600 mt-1">Correct Answers</p>

        <div className="w-full h-3 bg-gray-200 rounded-full mt-3 overflow-hidden">
          <div
            className="h-3 bg-primary"
            style={{ width: `${scorePercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultsSummary;
