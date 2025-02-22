"use client";

import React from "react";
import Button from "@/app/shared/components/Button";

interface QuizActionsProps {
  showAnswers: boolean;
  setShowAnswers: (value: boolean) => void;
}

const QuizActions: React.FC<QuizActionsProps> = ({
  showAnswers,
  setShowAnswers,
}) => {
  return (
    <div className="flex space-x-4 mb-6 no-print">
      <Button
        size="small"
        variant="secondary"
        label={showAnswers ? "View Quiz" : "View Answer Key"}
        onClick={() => setShowAnswers(!showAnswers)}
      />
      {/* <Button
        variant="secondary"
        label="Deploy Quiz"
        size="small"
        bgColor="bg-green-600"
        textColor="text-green-600"
      /> */}
    </div>
  );
};

export default QuizActions;
