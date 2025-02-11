"use client";

import React, { useState } from "react";
import useTokenStore from "../../token-tracker/store/tokenStore";
import LabForm from "./LabForm";
import ErrorMessage from "../../../shared/components/ErrorMessage";
import ProgressLoading from "@/app/shared/components/ProgressLoading";
import { createLab } from "../api/create-lab";
import LabDisplay from "./LabDisplay";

interface Lab {
  title: string;
  duration: string;
  overview: string;
  materials: string[];
  learning_objectives: string[];
  procedure: string[];
  discussion_questions: {
    question: string;
    answer: string;
    explanation: string;
  }[];
  extensions: string[];
  safety_notes: string[];
  standards_alignment: string;
  context: string;
}

const CreateLabPage = () => {
  const { tokens, setTokens } = useTokenStore(); // Token management hook
  const [lab, setLab] = useState<Lab | null>(null); // Holds the generated lab
  const [loading, setLoading] = useState(false); // Tracks if loading
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

    setLoading(true); // Start loading
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
      {!lab && !loading && !error && <LabForm onSubmit={handleGenerateLab} />}

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

      {/* Display fetched lab details */}
      {!loading && lab && <LabDisplay lab={lab} />}
    </div>
  );
};

export default CreateLabPage;
