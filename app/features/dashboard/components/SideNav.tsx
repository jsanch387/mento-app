"use client";

import Link from "next/link";
import SideNavLinks from "./SideNavLinks";
import TextLogo from "@/app/shared/components/TextLogo";
import { logout } from "../../auth/actions";
import useAuthStore from "../../auth/store/authStore";
import NavFooter from "./NavFooter";

export default function SideNav() {
  const { authenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: unknown) {
      if ((error as Error)?.message !== "NEXT_REDIRECT") {
        console.error("Logout failed:", (error as Error).message);
      }
    }
  };

  console.log("authenticated", authenticated);

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
        <SideNavLinks authenticated={authenticated} />
      </div>

      {/* Footer Section */}
      {/* Footer Section */}
      {authenticated && <NavFooter handleLogout={handleLogout} />}
    </div>
  );
}
