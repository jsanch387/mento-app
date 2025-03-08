"use client";

import React from "react";
import Input from "@/app/shared/components/Input";
import TextArea from "@/app/shared/components/TextArea";
import Button from "@/app/shared/components/Button";

interface LaunchFormProps {
  className: string;
  setClassName: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  loading: boolean;
}

const LaunchForm: React.FC<LaunchFormProps> = ({
  className,
  setClassName,
  notes,
  setNotes,
  onSubmit,
  onClose,
  loading,
}) => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-black font-sans text-center text-gray-900">
        Launch Quiz for Class
      </h2>

      {/* Class Name */}
      <Input
        id="className"
        name="className"
        type="text"
        label="Class Name"
        placeholder="e.g., 1st Period Biology"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        required
        className="w-full"
      />

      {/* Notes */}
      <TextArea
        id="notes"
        name="notes"
        label="Notes (Optional)"
        placeholder="Any special notes for this class?"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
        className="w-full"
      />

      {/* Buttons - Full Width Split */}
      <div className="flex space-x-2 mt-6">
        <Button
          label="Cancel"
          variant="secondary"
          outlineColor="primary"
          onClick={onClose}
          className="w-1/2  text-gray-800"
          disabled={loading}
        />
        <Button
          label={loading ? "Launching..." : "Launch"}
          onClick={onSubmit}
          className="w-1/2 bg-primary text-white"
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default LaunchForm;
