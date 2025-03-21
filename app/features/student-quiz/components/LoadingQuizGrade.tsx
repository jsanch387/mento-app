"use client";

import React from "react";

const LoadingQuizGrade: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      {/* Header with plain English */}
      <h2 className="text-2xl sm:text-3xl font-black font-sans text-primary tracking-wide uppercase mb-6">
        Grading Your Quiz
      </h2>

      {/* Animated Bouncing Dots - Friendly motion */}
      <div className="flex items-end space-x-2 h-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="w-3 h-3 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: `${index * 0.2}s` }}
          />
        ))}
      </div>

      {/* Horizontal Scan Progress Bar */}
      <div className="relative w-64 h-1 bg-gray-200 rounded-full overflow-hidden mt-6">
        <div className="absolute inset-0 bg-primary animate-scanBar"></div>
      </div>

      {/* Simple & Friendly Message */}
      <p className="mt-4 text-gray-600 text-sm tracking-wide">
        Please wait while we review your answers...
      </p>

      {/* Keyframes for Scan Bar */}
      <style jsx>{`
        @keyframes scanBar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-scanBar {
          animation: scanBar 2.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default LoadingQuizGrade;
