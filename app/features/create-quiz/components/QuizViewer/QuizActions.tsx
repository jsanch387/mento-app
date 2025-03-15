"use client";

import React from "react";
import Button from "@/app/shared/components/Button";

interface QuizActionsProps {
  showAnswers: boolean;
  setShowAnswers: (value: boolean) => void;
  onLaunchQuiz: () => void;
}

const QuizActions: React.FC<QuizActionsProps> = ({
  showAnswers,
  setShowAnswers,
  onLaunchQuiz,
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
        label={"Launch Quiz"} // ✅ Dynamic label
        size="small"
        onClick={onLaunchQuiz}
      />
    </div>
  );
};

export default QuizActions;
