"use client";

import React, { useState } from "react";

import { createLessonPlan } from "../api/create-lesson-plan";
import LessonPlanForm from "./LessonPlanForm";
import LoadingIndicator from "./LoadingIndicator";
import ErrorMessage from "./ErrorMessage";
import LessonPlan from "./LessonPlan";

const CreatePlanForm = () => {
  const [lessonPlan, setLessonPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateLessonPlan = async (requestData: {
    gradeLevel: string;
    subject: string;
    duration: string;
    additionalDetails?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createLessonPlan(requestData);
      setLessonPlan(response.lessonPlan);
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
