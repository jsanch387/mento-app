"use client";

import Button from "@/app/shared/components/Button";
import Link from "next/link";
import TextLogo from "@/app/shared/components/TextLogo";
import useAuthStore from "../../auth/store/authStore";
import AuthInitializer from "../../auth/AuthInitializer";

export default function TopNav() {
  const { authenticated } = useAuthStore(); // Access authentication state

  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="bg-primary text-white h-[60px] w-full">
      <AuthInitializer />
      {/* Centered Content */}
      <div className="container mx-auto h-full flex items-center justify-between px-8">
        {/* Left Side - Logo */}
        <Link href="/">
          <TextLogo color="white" />
        </Link>

        {/* Middle - Links */}
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

        {/* Right Side - Buttons */}
        <div className="space-x-4">
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
                  textColor="text-black"
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
