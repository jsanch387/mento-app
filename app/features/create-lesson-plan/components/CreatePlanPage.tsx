"use client";

import React, { useState } from "react";
import useTokenStore from "../../token-tracker/store/tokenStore";
import LessonPlanForm from "./LessonPlanForm";
import ErrorMessage from "../../../shared/components/ErrorMessage";
import ProgressLoading from "@/app/shared/components/ProgressLoading";
import { consumeToken } from "../../settings/components/api/user-api";
import { generateLessonPlan } from "../api/create-lesson-plan";
import LessonPlanView from "./LessonPlanView";
import { GenerateLessonPlanRequest } from "../types/types";

type MarkdownLessonPlanType = {
  id: string;
  content: string;
};

const CreatePlanPage = () => {
  const { tokens, setTokens } = useTokenStore();
  const [lessonPlan, setLessonPlan] = useState<MarkdownLessonPlanType | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [progressPaused, setProgressPaused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateLessonPlan = async (
    requestData: GenerateLessonPlanRequest
  ) => {
    if (tokens === undefined) {
      setError("Unable to determine token status. Please try again later.");
      return;
    }

    if (tokens !== null && tokens <= 0) {
      setError("You have no tokens remaining. Please upgrade your plan.");
      return;
    }

    setLoading(true);
    setProgressPaused(false);
    setError(null);

    try {
      // 🔹 Call the API function instead of fetch
      const response = await generateLessonPlan(requestData);
      setLessonPlan(response); // ✅ directly use the full response object now

      // 🔹 Consume token
      if (tokens !== null) {
        await consumeToken();
        setTokens(tokens - 1);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
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
      {!loading && lessonPlan && (
        <LessonPlanView content={lessonPlan.content} />
      )}
    </div>
  );
};

export default CreatePlanPage;
