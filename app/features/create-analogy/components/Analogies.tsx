"use client";

import React from "react";
import Card from "@/app/shared/components/Card";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline"; // Import Hero Icon

interface Analogy {
  id?: number;
  title: string;
  analogy: string;
}

const Analogies = ({
  analogies,
  showHeader = true, // Default to showing header
}: {
  analogies: Analogy[];
  showHeader?: boolean;
}) => {
  const handleCopy = (title: string, analogy: string) => {
    const textToCopy = `${title}\n\n${analogy}`;
    navigator.clipboard.writeText(textToCopy);
    alert("Copied to clipboard!"); // Optional feedback, replace with toast if available
  };

  return (
    <div className="w-full max-w-3xl mt-8 px-4">
      {showHeader && (
        <h2 className="text-2xl font-bold mb-4">Generated Analogies</h2>
      )}
      <div className="space-y-6">
        {analogies.map((analogy) => (
          <Card
            key={analogy.id || analogy.title}
            variant="outline"
            className="p-6 flex flex-col gap-4"
          >
            {/* Title and Copy Button */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{analogy.title}</h3>
              <button
                onClick={() => handleCopy(analogy.title, analogy.analogy)}
                className="relative w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
                aria-label="Copy analogy"
              >
                <ClipboardDocumentIcon className="w-5 h-5 text-gray-600 hover:text-gray-800" />
              </button>
            </div>

            {/* Analogy Content */}
            <p className="text-gray-800">{analogy.analogy}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Analogies;
