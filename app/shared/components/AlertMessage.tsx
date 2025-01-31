import React from "react";

interface AlertMessageProps {
  message: string; // The message to display
  type: "success" | "error"; // Message type for styling
  className?: string; // Optional additional styles
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  type,
  className = "",
}) => {
  const baseStyles =
    "mt-4 p-4 rounded-md text-center font-semibold text-md border";
  const typeStyles =
    type === "success"
      ? "bg-green-100 text-green-700 border-green-300"
      : "bg-red-100 text-red-700 border-red-300";

  return (
    <div className={`${baseStyles} ${typeStyles} ${className}`}>{message}</div>
  );
};

export default AlertMessage;
