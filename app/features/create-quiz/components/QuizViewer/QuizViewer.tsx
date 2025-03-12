"use client";

import React, { useState } from "react";
import QuizActions from "./QuizActions";
import QuizHeader from "./QuizHeader";
import QuizQuestion from "./QuizQuestion";
import { Quiz } from "../../types/quiz.types";
import { launchQuiz } from "../../api/launch-quiz.api";
import LaunchModal from "../LaunchModal/LaunchModal";

interface InitialLaunchStatus {
  isLaunched: boolean;
  deploymentLink: string;
  qrCodeData: string;
}

interface QuizViewerProps {
  quiz?: Quiz;
  initialLaunchStatus?: InitialLaunchStatus;
}

const QuizViewer: React.FC<QuizViewerProps> = ({
  quiz,
  initialLaunchStatus,
}) => {
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  const [qrCodeData, setQrCodeData] = useState<string>(
    initialLaunchStatus?.qrCodeData || ""
  );
  const [deploymentLink, setDeploymentLink] = useState<string>(
    initialLaunchStatus?.deploymentLink || ""
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState<boolean>(false);

  // Controls whether the modal is showing form or QR code
  const [modalMode, setModalMode] = useState<"form" | "qr">("form");

  const [className, setClassName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  // Handle Print Functionality
  const handlePrint = () => {
    window.print();
  };

  // Open class & notes modal (initial step)
  const handleOpenLaunchModal = () => {
    setClassName("");
    setNotes("");
    setModalMode("form");
    setIsLaunchModalOpen(true);
  };

  // Submit class name & notes, launch process
  const handleSubmitLaunch = async () => {
    if (!quiz?.id) {
      setError("Quiz ID is missing.");
      return;
    }
    if (!className.trim()) {
      setError("Please enter a class name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { deploymentLink, qrCodeData } = await launchQuiz({
        quizId: quiz.id,
        className,
        notes,
      });

      setDeploymentLink(deploymentLink);
      setQrCodeData(qrCodeData);

      // Switch to QR code view after successful launch
      setModalMode("qr");
    } catch (err) {
      console.error("Launch Quiz Error:", err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white print-section">
      {/* Actions */}
      <QuizActions
        showAnswers={showAnswers}
        setShowAnswers={setShowAnswers}
        onLaunchQuiz={handleOpenLaunchModal}
      />

      {/* Quiz Content */}
      <div className="max-w-5xl mx-auto p-8 space-y-10 bg-white rounded-2xl shadow-lg relative print:border-0 print:shadow-none print:p-0">
        <QuizHeader title={quiz?.title || "Quiz"} onPrint={handlePrint} />

        {quiz?.quiz_content.map((q, index) => (
          <QuizQuestion
            key={index}
            index={index}
            question={q}
            showAnswers={showAnswers}
          />
        ))}

        {showAnswers && quiz && (
          <div className="mt-6 text-gray-600 text-sm border-t pt-4">
            <strong>Teaching Insight:</strong> {quiz.teaching_insights}
          </div>
        )}

        {loading && <p className="text-blue-500">Launching quiz...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* Combined Launch Modal (Form & QR Code) */}
      <LaunchModal
        isOpen={isLaunchModalOpen}
        onClose={() => setIsLaunchModalOpen(false)}
        mode={modalMode}
        className={className}
        setClassName={setClassName}
        notes={notes}
        setNotes={setNotes}
        onSubmit={handleSubmitLaunch}
        loading={loading}
        qrCodeData={qrCodeData}
        deploymentLink={deploymentLink}
      />
    </div>
  );
};

export default QuizViewer;
