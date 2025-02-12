"use client";

import React, { useState } from "react";
import LabForm from "./LabForm";
import ErrorMessage from "../../../shared/components/ErrorMessage";
import ProgressLoading from "@/app/shared/components/ProgressLoading";
import { createLab } from "../api/create-lab";
import LabDisplay from "./LabDisplay";
import { Lab } from "../types/Lab.types";
import { useConsumeToken } from "../../token-tracker/utils/tokenUtils";

const CreateLabPage = () => {
  const { tokens, handleConsumeToken } = useConsumeToken(); // Use token utility
  const [lab, setLab] = useState<Lab | null>(null); // Holds the generated lab
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [progressPaused, setProgressPaused] = useState(false); // Tracks if progress should pause at 90%
  const [error, setError] = useState<string | null>(null); // Error state

  const handleGenerateLab = async (requestData: {
    gradeLevel: string;
    subject: string;
    context: string;
    standards?: string;
    duration: string;
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
    setProgressPaused(false); // Reset progress bar pause state
    setError(null); // Reset error state

    try {
      const response = await createLab(requestData); // Fetch lab from backend

      // Map backend response directly to frontend state
      setLab({
        ...response.lab,
        learning_objectives: response.lab.learning_objectives,
        procedure: response.lab.procedure,
        discussion_questions: response.lab.discussion_questions,
        safety_notes: response.lab.safety_notes,
        standards_alignment: response.lab.standards_alignment,
      });

      // Consume a token only if the user has a limited plan
      handleConsumeToken();

      setLoading(false); // Stop loading when response is ready
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
      setLoading(false); // Ensure loading stops on error
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      {/* Show the form when not loading or displaying results */}
      {!lab && !loading && !error && <LabForm onSubmit={handleGenerateLab} />}

      {/* Show loading indicator with progress pause */}
      {loading && (
        <div className="min-h-screen flex items-center justify-center w-full">
          <ProgressLoading
            className="my-auto w-full"
            duration={30000} // Expected duration
            stopAt90={!progressPaused}
          />
        </div>
      )}

      {/* Show error message if there's an issue */}
      {!loading && error && (
        <ErrorMessage className="max-w-lg mx-auto" error={error} />
      )}

      {/* Display fetched lab details */}
      {!loading && lab && <LabDisplay lab={lab} />}
    </div>
  );
};

export default CreateLabPage;
