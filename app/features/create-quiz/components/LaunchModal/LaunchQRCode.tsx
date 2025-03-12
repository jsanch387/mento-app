"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircleIcon, LinkIcon } from "@heroicons/react/24/solid";
import Button from "@/app/shared/components/Button";

interface LaunchQRCodeProps {
  qrCodeData?: string;
  deploymentLink?: string;
  onClose: () => void;
}

const LaunchQRCode: React.FC<LaunchQRCodeProps> = ({
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

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      {/* Success Check + Title */}
      <div className="text-center space-y-3">
        <CheckCircleIcon className="w-16 h-16 text-primary mx-auto" />
        <h2 className="text-2xl font-black font-sans text-gray-900">
          Quiz Launched Successfully! 🚀
        </h2>
        <p className="text-gray-600">
          Students can scan the QR code or use the link below to join.
        </p>
      </div>

      {/* QR Code with Wider Primary Border */}
      {qrCodeData && (
        <div className="flex justify-center">
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
      )}

      {/* Deployment Link & Copy Button */}
      {deploymentLink && (
        <div className="space-y-4 text-center">
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

            {/* Copy Success Message */}
            {copySuccess && (
              <p className="text-green-600 font-medium mt-2">✅ Link Copied!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LaunchQRCode;
