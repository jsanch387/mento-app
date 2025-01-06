"use client";

import { useState } from "react";
import AuthInitializer from "../features/auth/AuthInitializer";
import SideNav from "../features/dashboard/components/SideNav";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => setIsSideNavOpen((prev) => !prev);

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <AuthInitializer />
      {/* Hamburger Icon for Mobile */}
      <div className="bg-primary text-white h-[60px] w-full flex items-center p-4 md:hidden">
        <button
          onClick={toggleSideNav}
          className="focus:outline-none"
          aria-label="Toggle Navigation"
        >
          <Bars3Icon className="h-8 w-8" />
        </button>
      </div>

      {/* Side Navigation */}
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-white shadow-md transform transition-transform duration-300 md:relative md:translate-x-0 md:w-64 ${
          isSideNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 md:hidden">
          <button
            onClick={toggleSideNav}
            className="focus:outline-none"
            aria-label="Close Navigation"
          >
            <XMarkIcon className="h-8 w-8 text-black" />
          </button>
        </div>
        <SideNav />
      </div>

      {/* Main Content */}
      <div className="flex-grow md:overflow-y-auto md:p-12">{children}</div>

      {/* Overlay for Mobile when SideNav is open */}
      {isSideNavOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSideNav}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}
