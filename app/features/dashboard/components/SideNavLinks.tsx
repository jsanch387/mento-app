"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Squares2X2Icon,
  DocumentDuplicateIcon,
  StarIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import { RocketLaunchIcon } from "@heroicons/react/16/solid";

interface SideNavLinksProps {
  authenticated: boolean;
  closeSideNav: () => void; // Add this property
}

// Primary links for authenticated users
const primaryLinks = [
  { name: "Dashboard", href: "/dashboard", icon: Squares2X2Icon },
  {
    name: "My Items",
    href: "/dashboard/my-items",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Launched Quizzes",
    href: "/dashboard/launched-quizzes",
    icon: RocketLaunchIcon,
  },
];

// Secondary links for all users
const secondaryLinksAuth = [
  { name: "Rate Us", href: "/dashboard/rate", icon: StarIcon },
  { name: "Settings", href: "/dashboard/settings", icon: Cog6ToothIcon },
  { name: "Contact Us", href: "/dashboard/contact", icon: EnvelopeIcon },
];

const secondaryLinksUnauth = [
  { name: "Rate Us", href: "/dashboard/rate", icon: StarIcon },
  { name: "Contact Us", href: "/dashboard/contact", icon: EnvelopeIcon },
];

export default function SideNavLinks({
  authenticated,
  closeSideNav,
}: SideNavLinksProps) {
  const pathname = usePathname();

  // Determine links to render
  const renderPrimaryLinks = authenticated ? primaryLinks : [];
  const renderSecondaryLinks = authenticated
    ? secondaryLinksAuth
    : secondaryLinksUnauth;

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
            onClick={closeSideNav} // Close side nav on link click
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
      {renderPrimaryLinks.length > 0 && (
        <>
          <ul className="space-y-4">{renderLinks(renderPrimaryLinks)}</ul>
          <div className="my-6 border-t border-gray-300"></div>
        </>
      )}
      <ul className="space-y-4">{renderLinks(renderSecondaryLinks)}</ul>
    </nav>
  );
}
