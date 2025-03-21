"use client";

import React from "react";

interface LaunchQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  className: string;
  setClassName: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

const LaunchQuizModal: React.FC<LaunchQuizModalProps> = ({
  isOpen,
  onClose,
  className,
  setClassName,
  notes,
  setNotes,
  onSubmit,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Launch Quiz for Class</h2>

        <div className="space-y-4">
          <div>
            <label className="block font-medium">Class Name</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? "Launching..." : "Launch"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaunchQuizModal;
