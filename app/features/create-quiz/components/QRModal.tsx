"use client";

import React from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid"; // Close Icon
import Button from "@/app/shared/components/Button";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeData: string;
  deploymentLink: string;
}

const QRModal: React.FC<QRModalProps> = ({
  isOpen,
  onClose,
  qrCodeData,
  deploymentLink,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative p-8">
        {/* 🔹 Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4">
          <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-gray-800" />
        </button>

        {/* 🔹 Modal Title */}
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Quiz Launched! 🚀
        </h3>

        {/* 🔹 QR Code (Bigger for Whiteboard Display) */}
        {qrCodeData && (
          <div className="flex justify-center">
            <Image
              src={qrCodeData}
              alt="Quiz QR Code"
              width={256} // ⬆ Increased Size
              height={256}
              className="rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* 🔹 Link & Copy Button */}
        {deploymentLink && (
          <div className="mt-6 text-center">
            <p className="text-lg font-medium text-text-secondary mb-2">
              Share this link with students:
            </p>
            <input
              type="text"
              readOnly
              value={deploymentLink}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg text-gray-800 bg-gray-100"
            />
            <Button
              label="Copy Link"
              className="mt-4"
              onClick={() => navigator.clipboard.writeText(deploymentLink)}
              variant="primary"
            />
            {/* <button
              onClick={() => navigator.clipboard.writeText(deploymentLink)}
              className="mt-4 bg-blue-600 text-white text-lg px-5 py-3 rounded-lg hover:bg-blue-700 transition-all"
            >
              Copy Link
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default QRModal;
