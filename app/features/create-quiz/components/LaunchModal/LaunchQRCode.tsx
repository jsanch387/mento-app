"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  CheckCircleIcon,
  QrCodeIcon,
  KeyIcon,
  LinkIcon,
} from "@heroicons/react/24/solid";
import Button from "@/app/shared/components/Button";

interface LaunchQRCodeProps {
  qrCodeData?: string;
  deploymentLink?: string;
  accessCode?: string;
  onClose: () => void;
}

const LaunchQRCode: React.FC<LaunchQRCodeProps> = ({
  qrCodeData,
  deploymentLink,
  accessCode,
}) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyCodeSuccess, setCopyCodeSuccess] = useState(false);
  const [showQR, setShowQR] = useState(true); // Toggle QR Code or Access Code

  const handleCopyAccessCode = () => {
    if (accessCode) {
      navigator.clipboard.writeText(accessCode);
      setCopyCodeSuccess(true);
      setTimeout(() => setCopyCodeSuccess(false), 2000);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* ✅ Success Check & Title */}
      <div className="text-center space-y-2">
        <CheckCircleIcon className="w-12 h-12 text-primary mx-auto" />
        <h2 className="text-2xl font-black text-gray-900">
          Quiz Launched Successfully! 🚀
        </h2>
        <p className="text-gray-600 text-sm">
          Share the {showQR ? "QR Code" : "Access Code"} with students.
        </p>
      </div>

      {/* ✅ Toggle Buttons */}
      <div className="flex justify-center gap-4 mt-4">
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

      {/* ✅ QR Code Section (Shown when `showQR` is true) */}
      {showQR && qrCodeData && (
        <div className="flex justify-center mt-6">
          <div className="p-4 border-8 border-primary rounded-2xl shadow-lg">
            <Image
              src={qrCodeData}
              alt="Quiz QR Code"
              width={240}
              height={240}
              className="rounded-lg"
            />
          </div>
        </div>
      )}

      {/* ✅ Access Code Section (Shown when `showQR` is false) */}
      {!showQR && accessCode && (
        <div className="text-center mt-6">
          <p className="text-gray-700 font-semibold flex items-center justify-center gap-2 text-lg">
            <KeyIcon className="w-6 h-6 text-primary" />
            Access Code:
          </p>

          {/* ✅ Large Code Display (Clickable to Copy) */}
          <div
            onClick={handleCopyAccessCode}
            className="mt-2 bg-gray-100 border-4 border-primary rounded-xl px-6 py-4 text-5xl font-extrabold text-gray-900 tracking-widest shadow-md inline-block cursor-pointer transition-all hover:scale-105"
          >
            {accessCode}
          </div>

          {/* ✅ Copy Success Message */}
          <p className="text-md text-gray-500 mt-2">
            {copyCodeSuccess ? "✅ Copied!" : "Tap to Copy"}
          </p>
        </div>
      )}

      {/* ✅ Deployment Link & Copy Button */}
      {deploymentLink && (
        <div className="space-y-4 text-center mt-6">
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
  );
};

export default LaunchQRCode;
