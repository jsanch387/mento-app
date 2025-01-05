"use client";

import { useState, useEffect } from "react";
import useAuthStore from "@/app/features/auth/store/authStore";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Button from "./Button";
import AuthInitializer from "@/app/features/auth/AuthInitializer";
import { handleScrollToSection } from "@/app/lib/utils/helpers/helperFunctions";

interface HamburgerMenuProps {
  onClose: () => void;
}

export default function HamburgerMenu({ onClose }: HamburgerMenuProps) {
  const { authenticated } = useAuthStore();
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    // Show menu on mount
    setMenuVisible(true);
    return () => setMenuVisible(false); // Cleanup
  }, []);

  const handleMenuClick = (sectionId: string) => {
    handleScrollToSection(sectionId);
    setMenuVisible(false); // Trigger exit animation
    setTimeout(onClose, 300); // Wait for animation to finish before closing
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <AuthInitializer />
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-primary text-white shadow-lg p-6 transform transition-transform duration-300 ${
          menuVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setMenuVisible(false); // Trigger exit animation
            setTimeout(onClose, 300); // Wait for animation to finish before closing
          }}
          className="absolute top-4 right-4 focus:outline-none"
          aria-label="Close Menu"
        >
          <XMarkIcon className="h-6 w-6 text-white" />
        </button>

        {/* Menu Items */}
        <nav className="mt-16 space-y-6">
          <button
            onClick={() => handleMenuClick("features")}
            className="block hover:underline"
          >
            Features
          </button>
          <button
            onClick={() => handleMenuClick("pricing")}
            className="block hover:underline"
          >
            Pricing
          </button>
          <button
            onClick={() => handleMenuClick("about")}
            className="block hover:underline"
          >
            About
          </button>
          {authenticated ? (
            <Link
              href="/dashboard"
              onClick={onClose}
              className="block hover:underline"
            >
              <Button
                className="w-full"
                size="small"
                label="Dashboard"
                bgColor="bg-white"
                textColor="text-primary"
                variant="primary"
              />
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                onClick={onClose}
                className="block hover:underline"
              >
                <Button
                  className="w-full"
                  label="Login"
                  variant="primary"
                  textColor="text-primary"
                  bgColor="bg-white"
                  size="small"
                />
              </Link>

              <Link
                href="/signup"
                onClick={onClose}
                className="block hover:underline"
              >
                <Button
                  className="w-full"
                  size="small"
                  label="Sign up"
                  outlineColor="white"
                  variant="secondary"
                />
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
