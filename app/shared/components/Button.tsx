"use client";

import React from "react";
import classNames from "classnames";

interface ButtonProps {
  variant?: "primary" | "secondary"; // Primary is solid, secondary is outlined
  size?: "small" | "medium" | "large"; // Different sizes
  label: string; // Button text
  onClick?: () => void; // Click handler
  className?: string; // Additional classes
  disabled?: boolean; // Disabled state
  outlineColor?: "black" | "white" | "primary"; // Outline color for secondary buttons
  iconLeft?: React.ReactNode; // ✅ Optional left icon
}

const sizeStyles = {
  small: "px-4 py-2 text-sm",
  medium: "px-6 py-3 text-base",
  large: "px-8 py-4 text-lg",
};

// Outline colors map
const outlineStyles = {
  black: "border-black text-black",
  white: "border-white text-white",
  primary: "border-primary text-primary",
};

export default function Button({
  variant = "primary",
  size = "medium",
  label,
  onClick,
  className,
  disabled = false,
  outlineColor = "primary", // Default outline color if secondary
  iconLeft, // ✅ New optional left icon
}: ButtonProps) {
  const baseStyles =
    "rounded-full font-semibold text-center flex items-center justify-center gap-2 transition-transform duration-200";

  const variantStyles =
    variant === "primary"
      ? "bg-primary text-white hover:scale-105"
      : `border ${outlineStyles[outlineColor]} hover:bg-opacity-10`;

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  const buttonClasses = classNames(
    baseStyles,
    sizeStyles[size],
    variantStyles,
    disabledStyles,
    className
  );

  return (
    <button onClick={onClick} className={buttonClasses} disabled={disabled}>
      {iconLeft && <span className="w-5 h-5">{iconLeft}</span>}{" "}
      {/* ✅ Left Icon */}
      {label}
    </button>
  );
}
