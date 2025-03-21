"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Card from "@/app/shared/components/Card";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

interface SmartInsightsProps {
  insights: string | null;
  quizStatus: string;
  isLoading: boolean;
}

export default function SmartInsights({
  insights,
  quizStatus,
  isLoading,
}: SmartInsightsProps) {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Auto-expand when insights are ready
  useEffect(() => {
    if (insights) {
      setIsOpen(true);
    }
  }, [insights]);

  return (
    <div className="relative mt-6">
      {/* ✅ Glow effect applied as an `after` pseudo-element */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isLoading ? { opacity: [0.3, 0.7, 0.3] } : { opacity: 0 }}
        transition={isLoading ? { repeat: Infinity, duration: 1.5 } : {}}
        style={{
          boxShadow: isLoading
            ? "0 0 20px 5px rgba(128, 90, 213, 0.5)"
            : "none",
        }}
      />

      <Card variant="outline" rounded="rounded-3xl" className="relative z-10">
        {/* Collapsible Header */}
        <div
          className="flex justify-between items-center cursor-pointer "
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            {/* ✅ Animated Sparkles Icon ONLY when loading */}
            <motion.div
              animate={
                isLoading ? { scale: [1, 1.2, 1], opacity: [1, 0.6, 1] } : {}
              }
              transition={isLoading ? { repeat: Infinity, duration: 1.2 } : {}}
            >
              <SparklesIcon className="h-6 w-6 text-purple-500" />
            </motion.div>
            <h2 className="text-xl font-semibold text-gray-900">
              Smart Insights
            </h2>
          </div>

          {/* ✅ Toggle dropdown icon */}
          {isOpen ? (
            <ChevronDownIcon className="h-6 w-6 text-gray-600" />
          ) : (
            <ChevronRightIcon className="h-6 w-6 text-gray-600" />
          )}
        </div>

        {/* Collapsible Content */}
        {isOpen && (
          <div className="px-4 py-3 space-y-4 text-gray-800">
            {/* ✅ Show message if quiz isn't closed yet */}
            {quizStatus === "active" && !insights && (
              <p className="text-gray-500">
                📢 Once the quiz is closed, we will provide feedback on how your
                class did.
              </p>
            )}

            {/* ✅ Show loading message in expanded view */}
            {isLoading && (
              <p className="text-blue-600 font-medium">
                ⏳ Generating insights... Please wait.
              </p>
            )}

            {/* ✅ Show insights when ready */}
            {insights && !isLoading && (
              <ReactMarkdown>{insights}</ReactMarkdown>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
