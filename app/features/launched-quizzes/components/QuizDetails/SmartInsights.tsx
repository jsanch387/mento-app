"use client";

import { useState } from "react";
import Card from "@/app/shared/components/Card";
import {
  SparklesIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

interface AIInsights {
  struggles?: { concept: string; reason: string }[];
  reinforcement?: string[];
}

interface SmartInsightsProps {
  insights: AIInsights;
}

export default function SmartInsights({ insights }: SmartInsightsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card variant="outline" rounded="rounded-3xl" className="mt-6">
      {/* Collapsible Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <SparklesIcon className="h-6 w-6 text-purple-500" /> Smart Insights
        </h2>
        {isOpen ? (
          <ChevronDownIcon className="h-6 w-6 text-gray-600" />
        ) : (
          <ChevronRightIcon className="h-6 w-6 text-gray-600" />
        )}
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="mt-4 space-y-4">
          {/* Student Struggles */}
          {insights.struggles?.length ? (
            <div>
              <h3 className="text-md font-semibold text-gray-900">
                Areas of Struggle
              </h3>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                {insights.struggles.map((struggle, index) => (
                  <li key={index}>
                    <strong>{struggle.concept}:</strong> {struggle.reason}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500">No struggles detected.</p>
          )}

          {/* Reinforcement Tips */}
          {insights.reinforcement?.length ? (
            <div>
              <h3 className="text-md font-semibold text-gray-900">
                Reinforcement Strategies
              </h3>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                {insights.reinforcement.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500">
              No reinforcement strategies provided.
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
