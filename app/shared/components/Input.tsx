"use client";

import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

interface InputProps {
  id: string; // For accessibility
  name: string; // Name for form submission
  type: string; // Input type (text, email, number, etc.)
  placeholder?: string; // Optional placeholder text
  value?: string | number; // Controlled value
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
  label?: string; // Optional label text
  required?: boolean; // Marks the input as required
  className?: string; // Custom class for styling
  error?: string; // Error message to display
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  label,
  required = false,
  className = "",
  error,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-md font-semibold text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`p-3 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && (
        <div className="flex items-center space-x-2 mt-1">
          <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
          <p className="text-sm text-black">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
