import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode; // Accept any type of content
  className?: string; // Allow additional styles if needed
  variant?: "outline" | "solid"; // Two variants: outlined or solid
  handleOnClick?: () => any;
}

export default function Card({
  children,
  className = "",
  variant = "outline", // Default to outlined variant
  handleOnClick,
}: CardProps) {
  const baseStyles = "rounded-2xl shadow-sm p-6";

  const variantStyles =
    variant === "outline"
      ? "bg-white border border-gray-300"
      : "bg-white border-none";

  return (
    <div
      onClick={handleOnClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </div>
  );
}
