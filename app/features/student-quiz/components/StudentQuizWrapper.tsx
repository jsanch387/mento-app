"use client";

import React, { useEffect, useState } from "react";
import StudentQuiz from "../StudentQuiz";
import { QuizQuestion } from "../../create-quiz/types/quiz.types";
import Input from "@/app/shared/components/Input";
import Button from "@/app/shared/components/Button";
import Card from "@/app/shared/components/Card";

interface StudentQuizWrapperProps {
  deploymentId: string;
  quiz: {
    title: string;
    quiz_content: QuizQuestion[];
  };
}

export default function StudentQuizWrapper({
  deploymentId,
  quiz,
}: StudentQuizWrapperProps) {
  const [studentName, setStudentName] = useState<string>("");
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [loadingSession, setLoadingSession] = useState(true);
  const [error, setError] = useState<string>("");

  // Fetch session on load
  useEffect(() => {
    const storedSession = sessionStorage.getItem(
      `studentSession-${deploymentId}`
    );
    if (storedSession) {
      const { studentName } = JSON.parse(storedSession);
      setStudentName(studentName);
      setQuizStarted(true);
    }
    setLoadingSession(false);
  }, [deploymentId]);

  if (loadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading your session...</p>
      </div>
    );
  }

  // Name validation - 2 to 50 characters
  const isNameValid =
    studentName.trim().length >= 2 && studentName.trim().length <= 50;

  const handleStartQuiz = () => {
    if (isNameValid) {
      sessionStorage.setItem(
        `studentSession-${deploymentId}`,
        JSON.stringify({ studentName })
      );
      setQuizStarted(true);
    } else {
      setError("Name must be between 2 and 50 characters.");
    }
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary p-4">
        <Card
          rounded="rounded-3xl"
          className="w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto p-6 sm:p-8 lg:p-10"
        >
          <div className="space-y-6 py-4">
            <h1 className="text-3xl font-black font-sans text-center text-gray-800">
              Welcome to the Quiz
            </h1>
            <p className="text-lg text-center text-text-secondary">
              Please enter your name to begin:
            </p>

            <Input
              type="text"
              id="studentName"
              name="studentName"
              placeholder="Your Name"
              label="Student Name"
              value={studentName}
              onChange={(e) => {
                setStudentName(e.target.value);
                setError(""); // Clear error when typing
              }}
              required
              error={error}
            />

            <Button
              label="Start Quiz"
              className="w-full"
              onClick={handleStartQuiz}
              disabled={!isNameValid}
            />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <StudentQuiz quiz={{ ...quiz, deploymentId }} studentName={studentName} />
  );
}
