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
  accessCode: string; // ✅ Added Access Code
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
  const [accessCode, setAccessCode] = useState<string>(
    initialLaunchStatus?.accessCode || ""
  ); // ✅ Store Access Code

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState<boolean>(false);

  const [modalMode, setModalMode] = useState<"form" | "qr">("form");
  const [className, setClassName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const handlePrint = () => {
    window.print();
  };

  const handleOpenLaunchModal = () => {
    setClassName("");
    setNotes("");
    setModalMode("form");
    setIsLaunchModalOpen(true);
  };

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
      const { deploymentLink, qrCodeData, accessCode } = await launchQuiz({
        quizId: quiz.id,
        className,
        notes,
      });

      setDeploymentLink(deploymentLink);
      setQrCodeData(qrCodeData);
      setAccessCode(accessCode); // ✅ Store Access Code

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
      <QuizActions
        showAnswers={showAnswers}
        setShowAnswers={setShowAnswers}
        onLaunchQuiz={handleOpenLaunchModal}
      />

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

        {loading && <p className="text-blue-500">Launching quiz...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>

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
        accessCode={accessCode} // ✅ Pass Access Code to Modal
      />
    </div>
  );
};

export default QuizViewer;
