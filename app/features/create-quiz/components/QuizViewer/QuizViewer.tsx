"use client";

import React, { useState } from "react";
import QuizActions from "./QuizActions";
import QuizHeader from "./QuizHeader";
import QuizStudentInfo from "./QuizStudentInfo";
import QuizQuestion from "./QuizQuestion";
import { Quiz } from "../../types/quiz.types";

interface QuizViewerProps {
  quiz?: Quiz;
}

const QuizViewer: React.FC<QuizViewerProps> = ({ quiz }) => {
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white print-section">
      {/* 🔹 Actions (Toggle Answers, Deploy Quiz) */}
      <QuizActions showAnswers={showAnswers} setShowAnswers={setShowAnswers} />

      {/* 🔹 Quiz Content */}
      <div className="max-w-5xl mx-auto p-8 space-y-10 bg-white rounded-2xl shadow-lg relative print:border-0 print:shadow-none print:p-0">
        {/* 🔹 Quiz Header (Title + Print Button) */}
        <QuizHeader title={quiz?.title || "Quiz"} onPrint={handlePrint} />

        {/* 🔹 Student Info (Name + Date) */}
        {/* <QuizStudentInfo /> */}

        {/* 🔹 Quiz Questions */}
        {quiz &&
          quiz.quiz_content.map((q, index) => (
            <QuizQuestion
              key={index}
              index={index}
              question={q}
              showAnswers={showAnswers} // Controls visibility of answers/explanations
            />
          ))}

        {/* 🔹 Teaching Insights */}
        {showAnswers && quiz && (
          <div className="mt-6 text-gray-600 text-sm border-t pt-4">
            <strong>Teaching Insight:</strong> {quiz.teaching_insights}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizViewer;
