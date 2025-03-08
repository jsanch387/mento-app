"use client";

import React from "react";
import Button from "@/app/shared/components/Button";

interface QuizActionsProps {
  showAnswers: boolean;
  setShowAnswers: (value: boolean) => void;
  onLaunchQuiz: () => void;
  isLaunched?: boolean; // ✅ Add prop to toggle button label
}

const QuizActions: React.FC<QuizActionsProps> = ({
  showAnswers,
  setShowAnswers,
  onLaunchQuiz,
  isLaunched,
}) => {
  return (
    <div className="flex space-x-4 mb-6 no-print">
      <Button
        size="small"
        variant="secondary"
        label={showAnswers ? "View Quiz" : "View Answer Key"}
        onClick={() => setShowAnswers(!showAnswers)}
      />

      <Button
        variant="secondary"
        label={isLaunched ? "View QR Code" : "Launch Quiz"} // ✅ Dynamic label
        size="small"
        bgColor="bg-green-600"
        textColor="text-green-600"
        onClick={onLaunchQuiz}
      />
    </div>
  );
};

export default QuizActions;
