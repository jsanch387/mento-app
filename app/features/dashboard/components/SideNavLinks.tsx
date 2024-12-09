"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Squares2X2Icon,
  DocumentDuplicateIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: Squares2X2Icon },
  {
    name: "My Items",
    href: "/dashboard/my-items",
    icon: DocumentDuplicateIcon,
  },
  { name: "Rate Us", href: "/rate", icon: StarIcon },
];

export default function SideNavLinks() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="space-y-4">
        {links.map((link) => {
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
                  className={`h-6 w-6 ${
                    isActive ? "primary" : "text-inactive"
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`font-semibold ${
                    isActive ? "text-primary" : "text-inactive"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
