import React from "react";

interface TextAreaProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  helperText?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  helperText,
  rows = 5,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={id} className="block text-md font-semibold text-gray-700">
        {label}
      </label>
      {helperText && (
        <p className="text-sm text-text-secondary">{helperText}</p>
      )}
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
        className={`p-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
};

export default TextArea;
