import Button from "@/app/shared/components/Button";
import Link from "next/link";
import TextLogo from "@/app/shared/components/TextLogo";

export default function TopNav() {
  return (
    <nav className="bg-primary text-white h-[60px] w-full">
      {/* Centered Content */}
      <div className="container mx-auto h-full flex items-center justify-between px-8">
        {/* Left Side - Logo */}
        <Link href="/">
          <TextLogo color="white" />
        </Link>

        {/* Middle - Links */}
        <div className="hidden md:flex space-x-10">
          <a href="#features" className="hover:underline">
            Features
          </a>
          <a href="#pricing" className="hover:underline">
            Pricing
          </a>
          <a href="#contact" className="hover:underline">
            About
          </a>
        </div>

        {/* Right Side - Buttons */}
        <div className="space-x-4">
          {/* Wrap Button with Link for navigation */}
          <Link href="/login">
            <Button
              label={"Login"}
              variant="secondary"
              outlineColor="white"
              size="small"
            />
          </Link>
          <Link href="/signup">
            <Button
              label={"Sign Up"}
              variant="primary"
              bgColor="bg-white"
              textColor="text-black"
              size="small"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
