"use client";

import React, { useState } from "react";
import RatingForm from "@/app/features/rating/RatingForm";
import { submitUserFeedback } from "@/app/features/rating/api/rating-api";
import ErrorMessage from "@/app/shared/components/ErrorMessage";
import SuccessMessage from "@/app/shared/components/SuccessMessage";

interface SubmissionStatus {
  success: boolean;
  message: string;
}

export default function RatePage() {
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus | null>(null);

  const handleFormSubmit = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    rating: number;
    comment: string;
  }) => {
    try {
      const response = await submitUserFeedback(data);
      setSubmissionStatus({ success: true, message: response.message });
    } catch (error) {
      const typedError = error as Error;
      console.error("Error submitting feedback:", typedError.message);

      setSubmissionStatus({
        success: false,
        message: typedError.message || "An unknown error occurred.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-6">
      {/* Show Success/Error Message */}
      {submissionStatus ? (
        submissionStatus.success ? (
          <SuccessMessage message={submissionStatus.message} />
        ) : (
          <ErrorMessage error={submissionStatus.message} />
        )
      ) : (
        <RatingForm onSubmit={handleFormSubmit} />
      )}
    </div>
  );
}
