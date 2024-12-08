import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode; // Accept any type of content
  className?: string; // Allow additional styles if needed
  variant?: "outline" | "solid"; // Two variants: outlined or solid
}

export default function Card({
  children,
  className = "",
  variant = "outline", // Default to outlined variant
}: CardProps) {
  const baseStyles = "rounded-2xl shadow-sm";

  const variantStyles =
    variant === "outline"
      ? "bg-white border border-gray-300"
      : "bg-white border-none";

  return (
    <div className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
    </div>
  );
}
