"use client";

import React from "react";
import type { QuizQuestion } from "../../types/quiz.types";

interface QuizQuestionProps {
  index: number;
  question: QuizQuestion;
  showAnswers: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  index,
  question,
  showAnswers,
}) => {
  return (
    <div className="mb-6 quiz-question">
      {/* 🔹 Question Text */}
      <p className="font-medium text-lg mb-2">
        {index + 1}. {question.question}
      </p>

      {/* 🔹 Multiple Choice */}
      {question.type === "multiple_choice" && question.options && (
        <ul className="ml-4 space-y-2">
          {question.options.map((option, i) => (
            <li key={i} className="flex items-start space-x-3">
              <span className="w-6 h-6 border-2 border-gray-600 rounded-full mt-1 flex-shrink-0"></span>
              <span className="text-lg">{option}</span>
            </li>
          ))}
        </ul>
      )}

      {/* 🔹 Short Answer */}
      {question.type === "short_answer" && (
        <div className="mt-2 space-y-4">
          <div className="border-b border-gray-500 w-full h-6"></div>
          <div className="border-b border-gray-500 w-full h-6"></div>
          <div className="border-b border-gray-500 w-full h-6"></div>
        </div>
      )}

      {/* 🔹 True/False */}
      {question.type === "true_false" && (
        <div className="flex space-x-4 mt-2">
          <div className="flex items-center space-x-2">
            <input type="radio" id={`true-${index}`} name={`q-${index}`} />
            <label htmlFor={`true-${index}`}>True</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id={`false-${index}`} name={`q-${index}`} />
            <label htmlFor={`false-${index}`}>False</label>
          </div>
        </div>
      )}

      {/* 🔹 Fill in the Blank */}
      {question.type === "fill_in_the_blank" && (
        <div className="mt-2">
          {/* Removed placeholder text */}
          <div className="border-b border-gray-500 w-full h-8"></div>
        </div>
      )}

      {/* 🔹 Hint */}
      {question.hint && !showAnswers && (
        <p className="text-sm text-blue-500 italic mt-2">
          Hint: {question.hint}
        </p>
      )}

      {/* 🔹 Answer & Explanation (When Toggled On) */}
      {showAnswers && (
        <div className="mt-2 p-3 border-l-4 border-blue-500 bg-gray-100">
          <p>
            <strong>Answer:</strong> {question.correct_answer}
          </p>
          <p className="text-sm">
            <strong>Explanation:</strong> {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
