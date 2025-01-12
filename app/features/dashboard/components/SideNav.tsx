"use client";

import Link from "next/link";
import SideNavLinks from "./SideNavLinks";
import TextLogo from "@/app/shared/components/TextLogo";
import { logout } from "../../auth/actions";
import useAuthStore from "../../auth/store/authStore";
import NavFooter from "./NavFooter";

interface SideNavProps {
  closeSideNav: () => void;
}

export default function SideNav({ closeSideNav }: SideNavProps) {
  const { authenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      closeSideNav(); // Close the side nav after logging out
    } catch (error: unknown) {
      if ((error as Error)?.message !== "NEXT_REDIRECT") {
        console.error("Logout failed:", (error as Error).message);
      }
    }
  };

  return (
    <div className="w-[260px] h-screen bg-gray-100 shadow-md flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="py-6 text-center">
          <Link href="/" onClick={closeSideNav}>
            <TextLogo />
          </Link>
        </div>

        {/* Navigation Tabs */}
        <SideNavLinks
          authenticated={authenticated}
          closeSideNav={closeSideNav}
        />
      </div>

      {/* Footer Section */}
      {authenticated && <NavFooter handleLogout={handleLogout} />}
    </div>
  );
}
