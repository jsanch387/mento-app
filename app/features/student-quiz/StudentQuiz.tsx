"use client";

import React, { useState } from "react";
import { QuizQuestion } from "../create-quiz/types/quiz.types";
import Button from "@/app/shared/components/Button";
import StudentQuizQuestion from "./components/StudentQuizQuestion";
import { submitQuiz } from "./api/submitQuiz.api";
import GradedResultsDisplay from "./components/GradeResults/GradeResultDisplay";
import LoadingQuizGrade from "./components/LoadingQuizGrade"; // Import the new component

interface GradedAnswer {
  question: string;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
}

interface StudentQuizProps {
  quiz: {
    title: string;
    quiz_content: QuizQuestion[];
    deploymentId?: string;
  };
  studentName: string;
}

const StudentQuiz: React.FC<StudentQuizProps> = ({ quiz, studentName }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string | null;
  }>({});
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gradedResults, setGradedResults] = useState<GradedAnswer[] | null>(
    null
  );

  const handleSelectAnswer = (questionIndex: number, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmitQuiz = async () => {
    if (Object.keys(selectedAnswers).length !== quiz.quiz_content.length) {
      setError("⚠️ Please answer all questions before submitting.");
      return;
    }

    setIsLoading(true);
    setError("");

    document.body.style.overflow = "hidden"; // Disable scroll during grading

    try {
      const gradedAnswers = await submitQuiz({
        studentName,
        deploymentId: quiz.deploymentId,
        answers: quiz.quiz_content.map((q, index) => ({
          question: q.question,
          studentAnswer: selectedAnswers[index] || "",
          correctAnswer: q.correct_answer,
          type: q.type,
        })),
      });

      setGradedResults(gradedAnswers);
    } catch (error) {
      console.error("❌ Error submitting quiz:", error);
      setError("⚠️ Unexpected error while grading. Please try again.");
    } finally {
      setIsLoading(false);
      document.body.style.overflow = ""; // Re-enable scroll after grading
    }
  };

  if (gradedResults) {
    return <GradedResultsDisplay gradedResults={gradedResults} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center w-full relative">
      {/* Use the cleaner LoadingQuizGrade component */}
      {isLoading && <LoadingQuizGrade />}

      <h1 className="text-2xl sm:text-3xl font-black font-sans text-center text-gray-800 my-6 sm:my-8">
        {quiz.title}
      </h1>

      <div className="w-full max-w-3xl space-y-6 px-2 sm:px-4 mx-auto">
        {quiz.quiz_content.map((q: QuizQuestion, index: number) => (
          <StudentQuizQuestion
            key={index}
            index={index}
            question={q}
            selectedAnswer={selectedAnswers[index] || ""}
            onSelectAnswer={(answer: string) =>
              handleSelectAnswer(index, answer)
            }
          />
        ))}
      </div>

      {error && (
        <p className="text-red-500 font-semibold text-center mt-4 text-sm sm:text-base">
          {error}
        </p>
      )}

      <div className="mt-8 w-full max-w-3xl mx-auto px-2 sm:px-4">
        <div className="w-full sm:w-auto mb-10">
          <Button
            label="Submit Quiz"
            size="large"
            onClick={handleSubmitQuiz}
            className="w-full sm:w-auto"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentQuiz;
