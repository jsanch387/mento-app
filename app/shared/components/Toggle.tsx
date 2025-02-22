"use client";

import React from "react";

interface ToggleProps {
  label: string;
  options: [string, string];
  value: string;
  onChange: (selected: string, e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Toggle: React.FC<ToggleProps> = ({ label, options, value, onChange }) => {
  const isActive = (option: string) => value === option;

  return (
    <div className="w-full">
      {/* Label */}
      <label className="block text-md font-semibold text-gray-700 mb-1">
        {label}
      </label>

      {/* Toggle Container */}
      <div className="flex rounded-lg border border-gray-300 overflow-hidden w-fit">
        {options.map((option) => (
          <button
            key={option}
            type="button" // Ensure it's not treated as a submit button
            onClick={(e) => onChange(option, e)} // Pass event to handler
            className={`px-4 py-2 text-sm font-medium transition-all ${
              isActive(option)
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toggle;
