"use client";

import React from "react";

interface ErrorMessageProps {
  error: string;
  className?: string; // Optional custom class names
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, className }) => {
  return (
    <div
      className={`mt-4 p-4 border rounded bg-red-100 text-red-800 ${
        className || ""
      }`}
    >
      <p className="text-md text-center font-semibold">Error: {error}</p>
    </div>
  );
};

export default ErrorMessage;
