"use client";

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid"; // Optional: for close icon

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b px-4 py-3">
          <h3 className="text-lg font-semibold">{title || "Modal"}</h3>
          <button onClick={onClose}>
            <XMarkIcon className="w-5 h-5 text-gray-600 hover:text-gray-800" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">{children}</div>

        {/* Modal Footer */}
        <div className="flex justify-end space-x-2 border-t px-4 py-3">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
