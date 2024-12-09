import Image from "next/image";
import Link from "next/link";
import MentoLogo from "@/public/mento-text.svg";
import SideNavLinks from "./SideNavLinks";

export default function SideNav() {
  return (
    <div className="w-[260px] h-screen bg-gray-100 shadow-md flex flex-col">
      {/* Logo */}
      <div className="py-6 text-center border-b border-gray-200">
        <Link href="/">
          <Image
            src={MentoLogo}
            alt={`Mento Logo`}
            width={90}
            height={90}
            priority
          />
        </Link>
      </div>

      {/* Navigation Tabs */}
      <SideNavLinks />
    </div>
  );
}
