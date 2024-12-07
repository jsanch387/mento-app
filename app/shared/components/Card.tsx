import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode; // Accept any type of content
  className?: string; // Allow additional styles if needed
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white border border-gray-300 rounded-2xl p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
