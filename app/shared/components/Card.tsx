import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode; // Accept any type of content
  className?: string; // Allow additional styles if needed
  variant?: "frosted" | "solid" | "outline"; // Three variants
  rounded?: string; // Allow custom rounded corners
  handleOnClick?: () => void;
}

export default function Card({
  children,
  className = "",
  rounded,
  variant = "outline", // Default to outline variant
  handleOnClick,
}: CardProps) {
  const baseStyles = rounded ? `${rounded} p-6` : "rounded-xl p-6";

  // Variant styles
  const variantStyles = {
    outline: "bg-white border border-gray-300 shadow-sm",
    solid: "bg-white border-none shadow-md",
    frosted: "backdrop-blur-sm bg-white/70",
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
