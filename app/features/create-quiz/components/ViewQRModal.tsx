"use client";

import React, { useState } from "react";
import {
  XMarkIcon,
  LinkIcon,
  KeyIcon,
  QrCodeIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Button from "@/app/shared/components/Button";

interface ViewQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeData?: string;
  deploymentLink?: string;
  accessCode?: string;
}

const ViewQRModal: React.FC<ViewQRModalProps> = ({
  isOpen,
  onClose,
  qrCodeData,
  deploymentLink,
  accessCode,
}) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [showQR, setShowQR] = useState(true); // ✅ Toggle between QR Code & Access Code

  const handleCopyAccessCode = () => {
    if (accessCode) {
      navigator.clipboard.writeText(accessCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl relative p-8 transition-all animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Title */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black font-sans text-gray-900">
            Quiz Access & QR Code
          </h2>
          <p className="text-gray-600 text-lg">
            Students can {showQR ? "scan the QR code" : "enter the access code"}{" "}
            below.
          </p>
        </div>

        {/* ✅ Toggle Buttons for QR Code & Access Code */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setShowQR(true)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all ${
              showQR
                ? "bg-primary text-white shadow-md"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <QrCodeIcon className="w-6 h-6" />
            QR Code
          </button>

          <button
            onClick={() => setShowQR(false)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all ${
              !showQR
                ? "bg-primary text-white shadow-md"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <KeyIcon className="w-6 h-6" />
            Access Code
          </button>
        </div>

        {/* ✅ QR Code Display (Shown when `showQR` is true) */}
        {showQR && qrCodeData ? (
          <div className="flex justify-center mt-6">
            <div className="p-4 border-8 border-primary rounded-2xl shadow-lg">
              <Image
                src={qrCodeData}
                alt="Quiz QR Code"
                width={280}
                height={280}
                className="rounded-lg"
              />
            </div>
          </div>
        ) : (
          showQR && (
            <p className="text-center text-gray-500 mt-6">
              No QR Code Available
            </p>
          )
        )}

        {/* ✅ Access Code Display (Shown when `showQR` is false) */}
        {!showQR && accessCode && (
          <div className="text-center mt-8">
            <p className="text-gray-700 font-semibold flex items-center justify-center gap-2 text-xl">
              <KeyIcon className="w-6 h-6 text-primary" />
              Access Code:
            </p>

            {/* ✅ Large Code Display (Clickable to Copy) */}
            <div
              onClick={handleCopyAccessCode}
              className="mt-4 bg-gray-100 border-4 border-primary rounded-xl px-6 py-4 text-6xl font-extrabold text-gray-900 tracking-widest shadow-md inline-block cursor-pointer transition-all hover:scale-105"
            >
              {accessCode}
            </div>

            {/* ✅ Copy Success Message (or "Tap to Copy" Text) */}
            <p className="text-md text-gray-500 mt-2">
              {copySuccess ? "✅ Copied!" : "Tap to Copy"}
            </p>
          </div>
        )}

        {/* ✅ Deployment Link & Copy Button */}
        {deploymentLink && (
          <div className="space-y-4 text-center mt-8">
            <p className="text-gray-700 font-semibold flex items-center justify-center gap-2 text-lg">
              <LinkIcon className="w-5 h-5 text-primary" />
              Student Access Link
            </p>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={deploymentLink}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center bg-gray-100 font-medium text-gray-800 text-lg"
              />
              {/* Copy Link Button */}
              <Button
                label="Copy Link"
                onClick={() => {
                  navigator.clipboard.writeText(deploymentLink);
                  setCopySuccess(true);
                  setTimeout(() => setCopySuccess(false), 2000);
                }}
                className="w-full mt-3"
                variant="secondary"
                outlineColor="primary"
              />

              {/* ✅ Copy Success Message */}
              {copySuccess && (
                <p className="text-green-600 font-semibold mt-2 text-lg">
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
