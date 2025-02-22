"use client";

import React from "react";
import { PrinterIcon } from "@heroicons/react/24/outline";

interface QuizHeaderProps {
  title: string;
  onPrint: () => void;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({ title, onPrint }) => {
  return (
    <div className="relative">
      <h1 className="text-3xl font-bold text-center mb-14">{title}</h1>
      <button
        onClick={onPrint}
        className="absolute top-0 right-0 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition no-print"
        aria-label="Print Quiz"
      >
        <PrinterIcon className="w-5 h-5 text-black" />
      </button>
    </div>
  );
};

export default QuizHeader;
