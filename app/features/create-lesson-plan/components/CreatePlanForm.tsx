"use client";

import React, { useState } from "react";
import { createLessonPlan } from "../api/create-lesson-plan";
import useTokenStore from "../../token-tracker/store/tokenStore";
import LessonPlanForm from "./LessonPlanForm";
import ErrorMessage from "../../../shared/components/ErrorMessage";
import LessonPlan from "./LessonPlan";
import { consumeToken } from "../../settings/components/api/user-api";
import LoadingSpinner from "@/app/shared/components/LoadingSpinner";

const CreatePlanForm = () => {
  const { tokens, setTokens } = useTokenStore();
  const [lessonPlan, setLessonPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateLessonPlan = async (requestData: {
    gradeLevel: string;
    subject: string;
    duration: string;
    additionalDetails?: string;
  }) => {
    console.log("Starting lesson plan generation...");
    console.log("Current token count:", tokens);

    if (tokens === undefined) {
      console.error("Tokens state is undefined.");
      setError("Unable to determine token status. Please try again later.");
      return;
    }

    if (tokens !== null && tokens <= 0) {
      console.error("No tokens remaining.");
      setError("You have no tokens remaining. Please upgrade your plan.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Generating lesson plan with data:", requestData);

      const response = await createLessonPlan(requestData);
      console.log("Lesson plan generated successfully:", response.lessonPlan);
      setLessonPlan(response.lessonPlan);

      if (tokens !== null) {
        console.log("Consuming a token...");
        await consumeToken();
        setTokens(tokens - 1);
        console.log("Token consumed. Remaining tokens:", tokens - 1);
      } else {
        console.log("User has unlimited tokens. Skipping token consumption.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error generating lesson plan:", err.message);
        setError(err.message || "Failed to create lesson plan.");
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!lessonPlan && !loading && !error && (
        <LessonPlanForm onSubmit={handleGenerateLessonPlan} />
      )}
      {loading && <LoadingSpinner />}
      {lessonPlan && <LessonPlan lessonPlan={lessonPlan} />}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default CreatePlanForm;
