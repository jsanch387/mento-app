"use client";

import React from "react";

interface MultiSelectProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  selectedOptions,
  onChange,
}) => {
  const handleOptionClick = (option: string) => {
    if (selectedOptions.includes(option)) {
      onChange(selectedOptions.filter((item) => item !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <div className="w-full">
      {/* Label */}
      <label className="block text-md font-semibold text-gray-700 mb-3">
        {label}
      </label>

      {/* Options as Buttons */}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleOptionClick(option)}
            className={`px-4 py-2 text-sm rounded-md border font-semibold ${
              selectedOptions.includes(option)
                ? "bg-primary text-white border-blue-500"
                : "bg-gray-100 text-gray-800 border-gray-300"
            } hover:shadow-md transition-all`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
