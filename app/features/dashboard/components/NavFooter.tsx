"use client";

import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/20/solid";
import TokenTracker from "../../token-tracker/components/TokenTracker";

interface NavFooterProps {
  handleLogout: () => void;
}

export default function NavFooter({ handleLogout }: NavFooterProps) {
  return (
    <div className="p-4">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center  gap-4 px-4 py-2 w-full rounded-md text-text-secondary hover:bg-gray-200"
      >
        <ArrowLeftEndOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
        <span className="font-semibold">Log Out</span>
      </button>

      {/* Token Tracker */}
      <TokenTracker />
    </div>
  );
}
