"use client";

import { useState } from "react";
import { QrCodeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import StatusBadge from "../StatusBadge";
import ViewQRModal from "@/app/features/create-quiz/components/ViewQRModal";
import { closeQuiz } from "../../api/closeQuiz";

interface QuizHeaderProps {
  quiz: {
    id: string;
    title: string;
    className: string;
    launchDate: string;
    launchUrl: string;
    qrCodeData?: string;
    status: string;
  };
  quizStatus: string;
  setQuizStatus: (status: string) => void; // ✅ Update quiz status dynamically
  onQuizClosed: (insights: string) => void;
  setIsLoading: (loading: boolean) => void;
}

export default function QuizHeader({
  quiz,
  quizStatus,
  setQuizStatus,
  onQuizClosed,
  setIsLoading,
}: QuizHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // ✅ Track errors

  // Format date
  const formattedDate = new Date(quiz.launchDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Handle closing the quiz
  const handleCloseQuiz = async () => {
    setLoading(true);
    setIsLoading(true);
    setError(null); // ✅ Clear any previous errors

    try {
      const response = await closeQuiz(quiz.id);
      console.log("✅ Quiz closed successfully:", response);

      if (response?.smartInsights) {
        onQuizClosed(response.smartInsights); // ✅ Set insights after closing
      }

      setQuizStatus("closed"); // ✅ Update status dynamically
    } catch (error) {
      console.error("❌ Error closing quiz:", error);
      setError("Failed to close quiz. Please try again."); // ✅ Show error message
    }

    setLoading(false);
    setIsLoading(false);
  };

  return (
    <div className="border-b pb-6 space-y-2">
      {/* Title & QR Code Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black font-sans text-gray-900 leading-tight">
          {quiz.title}
        </h1>

        {/* Hide QR button when quiz is closed */}
        {quizStatus === "active" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:bg-opacity-90 transition-all"
          >
            <QrCodeIcon className="h-5 w-5" /> Show QR Code
          </button>
        )}
      </div>

      {/* Quiz Meta Info */}
      <div className="flex items-center gap-4 text-gray-500 text-lg mt-1">
        <span>Launched: {formattedDate}</span>
        <StatusBadge status={quizStatus} /> {/* ✅ Dynamically update status */}
      </div>

      {/* Class Name */}
      <p className="text-gray-700 font-medium">{quiz.className}</p>

      {/* Show error message if closing fails */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Close Quiz Button (Only if quiz is active) */}
      {quizStatus === "active" && (
        <button
          onClick={handleCloseQuiz}
          disabled={loading}
          className="mt-4 flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-red-700 transition-all disabled:opacity-50"
        >
          <LockClosedIcon className="h-5 w-5" />
          {loading ? "Closing..." : "Close Quiz"}
        </button>
      )}

      {/* QR Code Modal */}
      <ViewQRModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        qrCodeData={quiz.qrCodeData}
        deploymentLink={quiz.launchUrl}
      />
    </div>
  );
}
