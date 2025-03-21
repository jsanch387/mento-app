"use client";

import React from "react";
import classNames from "classnames";

interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  outlineColor?: "black" | "white" | "primary";
  iconLeft?: React.ReactNode;
  bgColor?: string; // ✅ Custom background color
  textColor?: string; // ✅ Custom text color
}

const sizeStyles = {
  small: "px-4 py-2 text-sm",
  medium: "px-6 py-3 text-base",
  large: "px-8 py-4 text-lg",
};

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
  outlineColor = "primary",
  iconLeft,
  bgColor,
  textColor,
}: ButtonProps) {
  const baseStyles =
    "rounded-full font-semibold text-center flex items-center justify-center gap-2 transition-transform duration-200";

  const variantStyles =
    variant === "primary"
      ? `${bgColor ?? "bg-primary"} ${
          textColor ?? "text-white"
        } hover:scale-105`
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
      {iconLeft && <span className="w-5 h-5">{iconLeft}</span>}
      {label}
    </button>
  );
}
