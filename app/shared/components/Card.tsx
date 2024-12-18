import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode; // Accept any type of content
  className?: string; // Allow additional styles if needed
  variant?: "frosted" | "solid" | "outline"; // Three variants
  handleOnClick?: () => any;
}

export default function Card({
  children,
  className = "",
  variant = "outline", // Default to outline variant
  handleOnClick,
}: CardProps) {
  const baseStyles = "rounded-2xl p-6";

  // Variant styles
  const variantStyles = {
    outline: "bg-white border border-gray-300 shadow-sm",
    solid: "bg-white border-none shadow-md",
    frosted: "backdrop-blur-xs bg-white/40 border-white/20 shadow-lg",
  };

  return (
    <div
      onClick={handleOnClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
