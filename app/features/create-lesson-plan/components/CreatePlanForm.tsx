"use client";

import React, { useState } from "react";
import { createLessonPlan } from "../api/create-lesson-plan";
import useTokenStore from "../../token-tracker/store/tokenStore";
import LessonPlanForm from "./LessonPlanForm";
import LoadingIndicator from "./LoadingIndicator";
import ErrorMessage from "./ErrorMessage";
import LessonPlan from "./LessonPlan";
import { consumeToken } from "../../settings/components/api/user-api";

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
    if (tokens === null || tokens <= 0) {
      setError("You have no tokens remaining. Please upgrade your plan.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Generate the lesson plan
      const response = await createLessonPlan(requestData);
      setLessonPlan(response.lessonPlan);

      // Consume a token after a successful generation
      await consumeToken();

      // Update local token state
      if (tokens !== null) {
        setTokens(tokens - 1);
      }
    } catch (err: any) {
      setError(err.message || "Failed to create lesson plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!lessonPlan && !loading && !error && (
        <LessonPlanForm onSubmit={handleGenerateLessonPlan} />
      )}
      {loading && <LoadingIndicator />}
      {lessonPlan && <LessonPlan lessonPlan={lessonPlan} />}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default CreatePlanForm;
