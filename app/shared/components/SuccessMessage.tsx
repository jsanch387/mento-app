"use client";

import React from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

interface SuccessMessageProps {
  message: string;
  className?: string; // Optional custom class names
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  className,
}) => {
  return (
    <div
      className={`mt-4 p-4 border rounded bg-green-100 text-green-800 flex items-center space-x-2 ${
        className || ""
      }`}
    >
      <CheckCircleIcon className="h-6 w-6 text-green-600" />
      <p className="text-md text-center font-semibold">{message}</p>
    </div>
  );
};

export default SuccessMessage;
