"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Squares2X2Icon,
  DocumentDuplicateIcon,
  StarIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/solid";

// Primary and secondary links
const primaryLinks = [
  { name: "Dashboard", href: "/dashboard", icon: Squares2X2Icon },
  {
    name: "My Items",
    href: "/dashboard/my-items",
    icon: DocumentDuplicateIcon,
  },
];

const secondaryLinks = [
  { name: "Rate Us", href: "/dashboard/rate", icon: StarIcon },
  { name: "Settings", href: "/dashboard/settings", icon: Cog6ToothIcon },
  { name: "Contact Us", href: "/contact", icon: EnvelopeIcon },
];

export default function SideNavLinks() {
  const pathname = usePathname();

  // Render links
  const renderLinks = (links: typeof primaryLinks) =>
    links.map((link) => {
      const isActive = pathname === link.href;

      return (
        <li
          key={link.name}
          className={`mx-2 rounded-md ${
            isActive ? "bg-[rgba(29,78,216,0.2)]" : ""
          }`}
        >
          <Link
            href={link.href}
            className={`flex items-center gap-4 px-4 py-2 rounded-md ${
              isActive
                ? "text-primary"
                : "hover:bg-gray-200 hover:text-gray-900"
            }`}
          >
            <link.icon
              className={`h-5 w-5 ${
                isActive ? "text-primary" : "text-text-secondary"
              }`}
              aria-hidden="true"
            />
            <span
              className={`font-semibold ${
                isActive ? "text-primary" : "text-text-secondary"
              }`}
            >
              {link.name}
            </span>
          </Link>
        </li>
      );
    });

  return (
    <nav className="mt-3 mx-4">
      <ul className="space-y-4">{renderLinks(primaryLinks)}</ul>
      {/* Divider */}
      <div className="my-6 border-t border-gray-300"></div>
      <ul className="space-y-4">{renderLinks(secondaryLinks)}</ul>
    </nav>
  );
}
