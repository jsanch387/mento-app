"use client";

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import LaunchForm from "./LaunchForm";
import LaunchQRCode from "./LaunchQRCode";
import LoadingSpinner from "@/app/shared/components/LoadingSpinner";

interface LaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "form" | "qr";
  className: string;
  setClassName: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  qrCodeData?: string;
  deploymentLink?: string;
  accessCode?: string; // ✅ New Access Code field
}

const LaunchModal: React.FC<LaunchModalProps> = ({
  isOpen,
  onClose,
  mode,
  className,
  setClassName,
  notes,
  setNotes,
  onSubmit,
  loading,
  qrCodeData,
  deploymentLink,
  accessCode, // ✅ Added Access Code prop
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative p-6 transition-all animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Show Loading Spinner while waiting for QR Code */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <LoadingSpinner size="large" />
            <p className="text-gray-600 mt-4">Generating QR Code...</p>
          </div>
        ) : mode === "form" ? (
          <LaunchForm
            className={className}
            setClassName={setClassName}
            notes={notes}
            setNotes={setNotes}
            onSubmit={onSubmit}
            onClose={onClose}
            loading={loading}
          />
        ) : (
          <LaunchQRCode
            qrCodeData={qrCodeData}
            deploymentLink={deploymentLink}
            accessCode={accessCode} // ✅ Pass Access Code to QR Component
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default LaunchModal;
