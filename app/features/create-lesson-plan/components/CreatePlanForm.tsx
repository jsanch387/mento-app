"use client";

import React, { useState } from "react";
import { createLessonPlan } from "../api/create-lesson-plan";
import useTokenStore from "../../token-tracker/store/tokenStore";
import LessonPlanForm from "./LessonPlanForm";
import ErrorMessage from "../../../shared/components/ErrorMessage";
import LessonPlan from "./LessonPlan";
import { consumeToken } from "../../settings/components/api/user-api";
import ProgressLoading from "@/app/shared/components/ProgressLoading";

const CreatePlanForm = () => {
  const { tokens, setTokens } = useTokenStore();
  const [lessonPlan, setLessonPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateLessonPlan = async (requestData: {
    gradeLevel: string;
    subject: string;
    duration: string;
    additionalDetails?: string;
  }) => {
    console.log("Starting lesson plan generation...");

    if (tokens === undefined) {
      setError("Unable to determine token status. Please try again later.");
      return;
    }

    if (tokens !== null && tokens <= 0) {
      setError("You have no tokens remaining. Please upgrade your plan.");
      return;
    }

    setLoading(true);
    setLoadingComplete(false); // Reset loadingComplete state
    setError(null);

    try {
      const response = await createLessonPlan(requestData); // Simulate async task
      setLessonPlan(response.lessonPlan);

      if (tokens !== null) {
        await consumeToken();
        setTokens(tokens - 1);
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoadingComplete(true); // Mark loading as complete
      setTimeout(() => setLoading(false), 500); // Add slight delay to ensure smooth UX
    }
  };

  return (
    <div>
      {!lessonPlan && !loading && !error && (
        <LessonPlanForm onSubmit={handleGenerateLessonPlan} />
      )}

      {loading && (
        <ProgressLoading
          isComplete={loadingComplete}
          duration={10000} // Match the 10-second generation duration
          onCancel={() => {
            setLoading(false);
            setError("Lesson plan generation canceled.");
          }}
        />
      )}

      {lessonPlan && <LessonPlan lessonPlan={lessonPlan} />}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default CreatePlanForm;
