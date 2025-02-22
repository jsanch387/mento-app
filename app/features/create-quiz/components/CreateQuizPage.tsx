"use client";

import React, { useState } from "react";
import ErrorMessage from "../../../shared/components/ErrorMessage";
import ProgressLoading from "@/app/shared/components/ProgressLoading";
import { useConsumeToken } from "../../token-tracker/utils/tokenUtils";
import QuizForm from "./QuizForm";
import { Quiz } from "../types/quiz.types";
import { createQuiz } from "../api/create-quiz";
import QuizViewer from "./QuizViewer/QuizViewer";
import { mockQuiz } from "../data/mockQuiz";

const CreateQuizPage = () => {
  const { tokens, handleConsumeToken } = useConsumeToken(); // Token utility
  const [quiz, setQuiz] = useState<Quiz | null>(null); // Generated quiz
  const [loading, setLoading] = useState(false); // Loading state
  const [progressPaused, setProgressPaused] = useState(false); // Progress pause
  const [error, setError] = useState<string | null>(null); // Error state

  const handleGenerateQuiz = async (requestData: {
    subject: string;
    topic: string;
    gradeLevel: string;
    numberOfQuestions: number;
    questionTypes: string[];
    includeHints: boolean;
    customInstructions?: string;
  }) => {
    // Token validation
    if (tokens === undefined) {
      setError("Unable to determine token status. Please try again later.");
      return;
    }

    if (tokens !== null && tokens <= 0) {
      setError("You have no tokens remaining. Please upgrade your plan.");
      return;
    }

    // Start loading
    setLoading(true);
    setProgressPaused(false);
    setError(null);

    try {
      const response = await createQuiz(requestData); // API call

      // Directly set quiz without answer_key since answers are in quiz_content
      setQuiz(response.quiz);

      // Consume token if applicable
      handleConsumeToken();

      setLoading(false); // Stop loading
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      {/* 🔹 Quiz Form */}
      {!quiz && !loading && !error && (
        <QuizForm onSubmit={handleGenerateQuiz} />
      )}

      {/* 🔹 Loading State */}
      {loading && (
        <div className="min-h-screen flex items-center justify-center w-full">
          <ProgressLoading
            className="my-auto w-full"
            duration={30000}
            stopAt90={!progressPaused}
          />
        </div>
      )}

      {/* 🔹 Error Message */}
      {!loading && error && (
        <ErrorMessage className="max-w-lg mx-auto" error={error} />
      )}

      {/* 🔹 Quiz Viewer */}
      {!loading && quiz && <QuizViewer quiz={quiz} />}
    </div>
  );
};

export default CreateQuizPage;
