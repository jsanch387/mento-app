"use client";

import React, { useState, useEffect } from "react";

interface ProgressLoadingProps {
  duration?: number; // Total time in milliseconds for progress bar animation
  stopAt90?: boolean; // Stop progress at 90% if true
  className?: string; // Custom classes for the container
}

export default function ProgressLoading({
  duration = 10000, // Default to 10 seconds
  stopAt90 = false, // Default behavior is to fill fully
  className = "",
}: ProgressLoadingProps) {
  const [progress, setProgress] = useState(0); // Progress state
  const [currentMessage, setCurrentMessage] = useState(""); // Current message
  const [fade, setFade] = useState(false); // Controls fade animation
  const messages = [
    "Sharpening pencils...",
    "Organizing lesson plans...",
    "Adding a splash of creativity...",
    "Double-checking everything...",
    "Almost there...",
  ];

  useEffect(() => {
    let messageIndex = 0;

    setCurrentMessage(messages[messageIndex]); // Set initial message

    const increment = (stopAt90 ? 90 : 100) / (duration / 100); // Stop at 90% if requested

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + increment, stopAt90 ? 90 : 100));
    }, 100);

    const messageInterval = setInterval(() => {
      setFade(true); // Trigger fade-out
      setTimeout(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        setCurrentMessage(messages[messageIndex]); // Update message
        setFade(false); // Trigger fade-in
      }, 500); // Match fade-out duration
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, stopAt90]);

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-6 ${className}`}
    >
      <h1 className="text-primary font-sans font-black text-4xl mb-4">
        Creating Content
      </h1>

      {/* Progress Bar */}
      <div className="relative w-full max-w-md mx-auto bg-gray-200 rounded-full h-4">
        <div
          className="absolute top-0 left-0 bg-primary h-4 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Animated Message */}
      <p
        className={`text-lg font-semibold text-gray-700 text-center min-w-[300px] transition-opacity duration-500 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      >
        {currentMessage}
      </p>
    </div>
  );
}
