import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large"; // Sizes for the spinner
}

const sizeClasses = {
  small: "w-4 h-4 border-2",
  medium: "w-6 h-6 border-4",
  large: "w-10 h-10 border-4",
};

export default function LoadingSpinner({
  size = "medium",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`inline-block ${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin`}
      role="status"
      aria-label="loading"
    ></div>
  );
}
