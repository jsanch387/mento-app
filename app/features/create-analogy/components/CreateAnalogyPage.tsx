"use client";

import React, { useState } from "react";
import AnalogyForm from "./AnalogyForm";
import ErrorMessage from "../../../shared/components/ErrorMessage";
import ProgressLoading from "@/app/shared/components/ProgressLoading";
import Analogies from "./Analogies";
import { createAnalogy } from "../api/create-analogy";
import { useConsumeToken } from "../../token-tracker/utils/tokenUtils";

interface Analogy {
  title: string;
  analogy: string;
  subject?: string;
  gradeLevel?: string;
}

const CreateAnalogyPage = () => {
  const { tokens, handleConsumeToken } = useConsumeToken(); // Use the utility function
  const [analogies, setAnalogies] = useState<Analogy[] | null>(null); // Holds fetched analogies
  const [loading, setLoading] = useState(false); // Tracks if loading
  const [progressPaused, setProgressPaused] = useState(false); // Tracks if progress should pause at 90%
  const [error, setError] = useState<string | null>(null); // Error state

  const handleGenerateAnalogy = async (requestData: {
    gradeLevel: string;
    subject: string;
    context: string;
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
      const response = await createAnalogy(requestData); // Fetch analogies from backend
      setAnalogies([response.analogies.analogy1, response.analogies.analogy2]); // Store analogies

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
      {!analogies && !loading && !error && (
        <AnalogyForm onSubmit={handleGenerateAnalogy} />
      )}

      {/* Show loading indicator with progress pause */}
      {loading && (
        <div className="min-h-screen flex items-center justify-center w-full">
          <ProgressLoading
            className="my-auto w-full"
            duration={20000} // Expected duration
            stopAt90={!progressPaused}
          />
        </div>
      )}

      {/* Show error message if there's an issue */}
      {!loading && error && (
        <ErrorMessage className="max-w-lg mx-auto" error={error} />
      )}

      {/* Display fetched analogies */}
      {!loading && analogies && <Analogies analogies={analogies} />}
    </div>
  );
};

export default CreateAnalogyPage;
