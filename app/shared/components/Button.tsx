import React from "react";
import classNames from "classnames";

interface ButtonProps {
  variant?: "primary" | "secondary"; // Button variants
  bgColor?: string; // Background color for primary button
  textColor?: string; // Text color for primary button
  outlineColor?: "black" | "white"; // Outline color for secondary button
  size?: "small" | "medium" | "large"; // Size variants
  label: string; // Button text
  onClick?: () => void; // Click handler
  className?: string; // Additional custom classes
}

export default function Button({
  variant = "primary", // Default to primary
  bgColor = "bg-primary", // Default background color for primary
  textColor = "text-white", // Default text color for primary
  outlineColor = "black", // Default outline color for secondary
  size = "medium", // Default size
  label,
  onClick,
  className,
}: ButtonProps) {
  // Base styles for the button
  const baseStyles =
    "rounded-full font-semibold text-center transition-transform duration-200"; // Updated font to font-semibold

  // Size-specific styles
  const sizeStyles = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  // Variant-specific styles
  const variantStyles = {
    primary: `${bgColor} ${textColor} hover:scale-105`,
    secondary: `border ${
      outlineColor === "black"
        ? "border-black text-black"
        : "border-white text-white"
    } hover:bg-opacity-10`,
  };

  // Combine styles
  const buttonClasses = classNames(
    baseStyles,
    sizeStyles[size], // Apply size styles
    variantStyles[variant], // Apply variant styles
    className // Allow additional custom classes
  );

  return (
    <button onClick={onClick} className={buttonClasses}>
      {label}
    </button>
  );
}
