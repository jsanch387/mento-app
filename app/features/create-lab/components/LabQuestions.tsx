"use client";

import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

interface Question {
  question: string;
  answer: string;
  explanation: string;
}

const LabQuestions = ({ questions }: { questions: Question[] }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      {questions.map((question, index) => (
        <div
          key={index}
          className="mb-4 border border-gray-300 rounded-lg overflow-hidden shadow-sm"
        >
          <button
            className="w-full flex items-start bg-gray-100 px-4 py-3 font-semibold text-gray-900 hover:bg-gray-200"
            onClick={() => toggleExpand(index)}
          >
            <span className="flex-1 text-left">Q: {question.question}</span>
            {expandedIndex === index ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>
          {expandedIndex === index && (
            <div className="p-4 bg-white space-y-2">
              <p className="text-gray-700">
                <strong>Answer:</strong> {question.answer}
              </p>
              <p className="text-gray-700">
                <strong>Explanation:</strong> {question.explanation}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LabQuestions;
