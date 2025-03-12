"use client";

import React, { useState } from "react";
import { XMarkIcon, LinkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Button from "@/app/shared/components/Button";

interface ViewQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeData?: string;
  deploymentLink?: string;
}

const ViewQRModal: React.FC<ViewQRModalProps> = ({
  isOpen,
  onClose,
  qrCodeData,
  deploymentLink,
}) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = () => {
    if (deploymentLink) {
      navigator.clipboard.writeText(deploymentLink);
      setCopySuccess(true);

      // Automatically hide message after 2 seconds
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative p-6 transition-all animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Title */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-black font-sans text-gray-900">
            Quiz QR Code
          </h2>
          <p className="text-gray-600">
            Students can scan the QR code or use the link below to join.
          </p>
        </div>

        {/* QR Code Display */}
        {qrCodeData ? (
          <div className="flex justify-center mt-4">
            <div className="p-3 border-8 border-primary rounded-2xl shadow-lg">
              <Image
                src={qrCodeData}
                alt="Quiz QR Code"
                width={240}
                height={240}
                className="rounded-lg"
              />
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No QR Code Available</p>
        )}

        {/* Deployment Link & Copy Button */}
        {deploymentLink && (
          <div className="space-y-4 text-center mt-6">
            <p className="text-gray-700 font-semibold flex items-center justify-center gap-2">
              <LinkIcon className="w-5 h-5 text-primary" />
              Student Access Link
            </p>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={deploymentLink}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center bg-gray-100 font-medium text-gray-800"
              />
              {/* Copy Button */}
              <Button
                label="Copy Link"
                onClick={handleCopyLink}
                className="w-full mt-2"
                variant="secondary"
                outlineColor="primary"
              />

              {/* ✅ Copy Success Message (Matches `LaunchQRCode.tsx`) */}
              {copySuccess && (
                <p className="text-green-600 font-semibold mt-2">
                  ✅ Link Copied!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewQRModal;
