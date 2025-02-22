"use client";

import React, { useState } from "react";
import useTokenStore from "../../token-tracker/store/tokenStore";
import LessonPlanForm from "./LessonPlanForm";
import ErrorMessage from "../../../shared/components/ErrorMessage";
import ProgressLoading from "@/app/shared/components/ProgressLoading";
import LessonPlan from "./LessonPlan";
import { createLessonPlan } from "../api/create-lesson-plan";
import { consumeToken } from "../../settings/components/api/user-api";
import { CreateLessonPlanResponse } from "../types/types";

const CreatePlanForm = () => {
  const { tokens, setTokens } = useTokenStore(); // Token management hook
  const [lessonPlan, setLessonPlan] = useState<
    CreateLessonPlanResponse["lessonPlan"] | null
  >(null);
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [progressPaused, setProgressPaused] = useState(false); // Tracks if progress stops at 90%
  const [error, setError] = useState<string | null>(null); // Error state

  const handleGenerateLessonPlan = async (requestData: {
    gradeLevel: string;
    subject: string;
    duration: string;
    additionalDetails?: string;
  }) => {
    if (tokens === undefined) {
      setError("Unable to determine token status. Please try again later.");
      return;
    }

    if (tokens !== null && tokens <= 0) {
      setError("You have no tokens remaining. Please upgrade your plan.");
      return;
    }

    setLoading(true);
    setProgressPaused(false); // Reset progress bar state
    setError(null);

    try {
      const response = await createLessonPlan(requestData); // Fetch lesson plan
      setLessonPlan(response.lessonPlan); // Set the lesson plan

      // Consume token
      if (tokens !== null) {
        await consumeToken();
        setTokens(tokens - 1);
      }

      setLoading(false); // Stop loading immediately when response is ready
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
      setLoading(false); // Ensure loading stops on error
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      {!lessonPlan && !loading && !error && (
        <LessonPlanForm onSubmit={handleGenerateLessonPlan} />
      )}
      {loading && (
        <div className="min-h-screen flex items-center justify-center w-full">
          <ProgressLoading
            className="my-auto w-full"
            duration={20000}
            stopAt90={!progressPaused}
          />
        </div>
      )}
      {!loading && error && (
        <ErrorMessage className="max-w-lg mx-auto" error={error} />
      )}
      {!loading && lessonPlan && <LessonPlan lessonPlan={lessonPlan} />}
    </div>
  );
};

export default CreatePlanForm;
