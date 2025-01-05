"use client";

import React, { useState } from "react";
import RatingForm from "@/app/features/rating/RatingForm";
import { submitUserFeedback } from "@/app/features/rating/api/rating-api";

export default function RatePage() {
  const [submissionStatus, setSubmissionStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

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
    } catch (error: unknown) {
      setSubmissionStatus({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to submit feedback.",
      });
    }
  };

  return (
    <div className="min-h-screen flex  justify-center px-6">
      {/* Show Success/Error Message */}
      {submissionStatus ? (
        <div
          className={`text-center text-4xl font-semibold ${
            submissionStatus.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {submissionStatus.message}
        </div>
      ) : (
        <RatingForm onSubmit={handleFormSubmit} />
      )}
    </div>
  );
}
