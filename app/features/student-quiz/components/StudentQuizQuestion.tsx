import React from "react";
import { QuizQuestion } from "../../create-quiz/types/quiz.types";
import TextArea from "@/app/shared/components/TextArea";
import Card from "@/app/shared/components/Card";

interface StudentQuizQuestionProps {
  index: number;
  question: QuizQuestion;
  selectedAnswer: string;
  onSelectAnswer: (answer: string) => void;
}

const StudentQuizQuestion: React.FC<StudentQuizQuestionProps> = ({
  index,
  question,
  selectedAnswer,
  onSelectAnswer,
}) => {
  return (
    <Card rounded="rounded-3xl" className="p-5 rounded-3xl transition-all">
      {/* Question Text */}
      <p className="text-lg sm:text-xl font-semibold text-text-p mb-4">
        {index + 1}. {question.question}
      </p>

      {/* Multiple Choice Options */}
      {question.type === "multiple_choice" && (
        <ul className="space-y-2">
          {question.options?.map((option, i) => (
            <li
              key={i}
              className={`p-3 sm:p-4 rounded-lg cursor-pointer text-gray-700 font-semibold text-base sm:text-lg transition-all
                ${
                  selectedAnswer === option
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              onClick={() => onSelectAnswer(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      {/* True/False Options */}
      {question.type === "true_false" && (
        <div className="flex space-x-4">
          {["True", "False"].map((option) => (
            <button
              key={option}
              className={`font-sem flex-1 p-3 sm:p-4 rounded-lg text-base sm:text-lg font-semibold transition-all
                ${
                  selectedAnswer === option
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              onClick={() => onSelectAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Short Answer Input */}
      {question.type === "short_answer" && (
        <TextArea
          id={`short-answer-${index}`}
          name={`short-answer-${index}`}
          label=""
          placeholder="Type your answer here..."
          value={selectedAnswer}
          onChange={(e) => onSelectAnswer(e.target.value)}
          rows={3} // You can tweak the rows to fit
          className="mt-2"
        />
      )}

      {/* Fill in the Blank Input - Same handling as short_answer */}
      {question.type === "fill_in_the_blank" && (
        <input
          type="text"
          placeholder="Fill in the blank..."
          value={selectedAnswer}
          className="mt-2 p-3 w-full rounded-lg text-gray-800 border border-gray-300 focus:ring-2 "
          onChange={(e) => onSelectAnswer(e.target.value)}
        />
      )}
    </Card>
  );
};

export default StudentQuizQuestion;
