"use client";

import Link from "next/link";
import SideNavLinks from "./SideNavLinks";
import TextLogo from "@/app/shared/components/TextLogo";
import { useRouter } from "next/navigation";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/20/solid";
import { logout } from "../../auth/actions";

export default function SideNav() {
  const creditsRemaining = 42; // Replace this with dynamic value if available

  const handleLogout = async () => {
    try {
      await logout(); // This will trigger server-side redirect to "/"
    } catch (error: any) {
      // Ignore NEXT_REDIRECT error as it's expected for redirects
      if (error?.message !== "NEXT_REDIRECT") {
        console.error("Logout failed:", error.message);
      }
    }
  };

  return (
    <div className="w-[260px] h-screen bg-gray-100 shadow-md flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="py-6 text-center">
          <Link href="/">
            <TextLogo />
          </Link>
        </div>

        {/* Navigation Tabs */}
        <SideNavLinks />
      </div>

      {/* Footer Section */}
      <div className="p-4 ">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center mb-4 gap-4 px-4 py-2 w-full rounded-md text-text-secondary hover:bg-gray-200 "
        >
          <ArrowLeftEndOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
          <span className="font-semibold">Log Out</span>
        </button>

        {/* Credits Display */}
        <div className="flex items-center px-4 mb-4 justify-between text-text-secondary ">
          <span className="font-medium">Credits Remaining:</span>
          <span className="font-bold text-primary">{creditsRemaining}</span>
        </div>
      </div>
    </div>
  );
}
