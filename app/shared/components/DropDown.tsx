import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface DropdownProps {
  label: string;
  placeholder: string;
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder,
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="w-full ">
      {/* Label */}
      <label className="block text-md font-semibold text-gray-700 mb-1">
        {label}
      </label>

      {/* Dropdown */}
      <div
        className="relative w-full bg-white border border-gray-300 rounded-xl  shadow-sm cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Selected Option */}
        <div className="flex items-center justify-between px-4 py-2">
          <span
            className={
              selectedOption === placeholder ? "text-gray-400" : "text-gray-900"
            }
          >
            {selectedOption}
          </span>

          {/* Dropdown Arrow */}
          <div className="ml-2">
            <span className="w-6 h-6 inline-block">
              <ChevronDownIcon />
            </span>
          </div>
        </div>

        {/* Options List */}
        {isOpen && (
          <ul className="absolute z-10 left-0 right-0 bg-white border border-gray-300 mt-1 rounded-xl shadow-lg max-h-40 overflow-y-auto ">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
