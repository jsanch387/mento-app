"use client";

import React, { useState } from "react";
import useTokenStore from "../../token-tracker/store/tokenStore";
import AnalogyForm from "./AnalogyForm";
import ErrorMessage from "../../../shared/components/ErrorMessage";
import ProgressLoading from "@/app/shared/components/ProgressLoading";
import Analogies from "./Analogies";
import { createAnalogy } from "../api/create-analogy";

interface Analogy {
  title: string;
  analogy: string;
  subject?: string;
  gradeLevel?: string;
}

const CreateAnalogyPage = () => {
  const { tokens, setTokens } = useTokenStore(); // Token management hook
  const [analogies, setAnalogies] = useState<Analogy[] | null>(null); // Holds fetched analogies
  const [loading, setLoading] = useState(false); // Tracks if loading
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

    setLoading(true); // Start loading
    setError(null); // Reset error state

    try {
      const response = await createAnalogy(requestData); // Fetch analogies from backend
      setAnalogies([response.analogies.analogy1, response.analogies.analogy2]); // Store analogies

      // Consume a token
      if (tokens !== null) {
        setTokens(tokens - 1);
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false); // Stop loading immediately when content is ready
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      {/* Show the form when not loading or displaying results */}
      {!analogies && !loading && !error && (
        <AnalogyForm onSubmit={handleGenerateAnalogy} />
      )}

      {/* Show loading indicator */}
      {loading && (
        <div className="min-h-screen flex items-center justify-center w-full">
          <ProgressLoading
            className="my-auto w-full"
            duration={20000} // Expected duration
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
