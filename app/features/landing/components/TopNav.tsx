"use client";

import { useState } from "react";
import Link from "next/link";
import TextLogo from "@/app/shared/components/TextLogo";
import Button from "@/app/shared/components/Button";
import useAuthStore from "../../auth/store/authStore";
import HamburgerMenu from "@/app/shared/components/HamburgerMenu";
import { handleScrollToSection } from "@/app/lib/utils/helpers/helperFunctions";
import AuthInitializer from "../../auth/AuthInitializer";

export default function TopNav() {
  const { authenticated } = useAuthStore(); // Access authentication state
  const [menuOpen, setMenuOpen] = useState(false); // Manage menu visibility

  // Smooth scrolling to a section by ID

  return (
    <nav className="bg-primary text-white h-[60px] w-full sticky top-0 z-50">
      <AuthInitializer />
      {/* Centered Content */}
      <div className="container mx-auto h-full flex items-center justify-between px-8">
        {/* Left Side - Logo */}
        <Link href="/">
          <TextLogo color="white" />
        </Link>

        {/* Right Side - Hamburger Menu (visible on small screens) */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6h18M3 12h18M3 18h18"
              />
            </svg>
          </button>
          {menuOpen && <HamburgerMenu onClose={() => setMenuOpen(false)} />}
        </div>

        {/* Middle Links (hidden on small screens) */}
        <div className="hidden md:flex space-x-10 font-semibold">
          <button
            onClick={() => handleScrollToSection("features")}
            className="hover:underline"
          >
            Features
          </button>
          <button
            onClick={() => handleScrollToSection("pricing")}
            className="hover:underline"
          >
            Pricing
          </button>
          <button
            onClick={() => handleScrollToSection("about")}
            className="hover:underline"
          >
            About
          </button>
        </div>

        {/* Right Side - Buttons (hidden on small screens) */}
        <div className="hidden md:flex space-x-4">
          {authenticated ? (
            <Link href="/dashboard">
              <Button
                label="Dashboard"
                variant="primary"
                bgColor="bg-white"
                textColor="text-black"
                size="small"
              />
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button
                  label="Login"
                  variant="secondary"
                  outlineColor="white"
                  size="small"
                />
              </Link>
              <Link href="/signup">
                <Button
                  label="Sign Up"
                  variant="primary"
                  bgColor="bg-white"
                  textColor="text-primary"
                  size="small"
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
