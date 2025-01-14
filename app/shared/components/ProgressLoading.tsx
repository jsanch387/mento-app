"use client";

import React, { useState, useEffect } from "react";

interface ProgressLoadingProps {
  isComplete?: boolean; // Indicates when the operation is done
  duration?: number; // Total time in milliseconds for progress bar animation
}

export default function ProgressLoading({
  isComplete = false,
  duration = 10000, // Default to 10 seconds
}: ProgressLoadingProps) {
  const [progress, setProgress] = useState(0); // Progress state
  const [currentMessage, setCurrentMessage] = useState(""); // Current message
  const messages = [
    "Sharpening pencils...",
    "Organizing lesson plans...",
    "Adding a splash of creativity...",
    "Double-checking everything...",
    "Almost there...",
  ];

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let messageInterval: NodeJS.Timeout;
    let messageIndex = 0;

    setCurrentMessage(messages[messageIndex]); // Set initial message

    if (!isComplete) {
      // Increment progress gradually over the specified duration
      const increment = 90 / (duration / 100); // Fill up to 90% in steps
      progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + increment, 90));
      }, 100);

      // Rotate messages every 2 seconds
      messageInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        setCurrentMessage(messages[messageIndex]);
      }, 2000);
    } else {
      // When complete, smoothly transition to 100%
      setProgress(100);
      setTimeout(() => clearInterval(progressInterval), 500);
    }

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [isComplete, duration]);

  return (
    <div className="w-full max-w-lg mx-auto p-6 text-center bg-white rounded-lg shadow-md space-y-6">
      {/* Progress Bar */}
      <div className="relative w-full max-w-md mx-auto bg-gray-200 rounded-full h-4">
        <div
          className="absolute top-0 left-0 bg-primary h-4 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Fixed Width Message */}
      <div className="flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-700 text-center min-w-[300px]">
          {currentMessage}
        </p>
      </div>
    </div>
  );
}
