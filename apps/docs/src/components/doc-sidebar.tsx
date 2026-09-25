"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@next-ui/utils";

const sections = [
  {
    title: "Getting Started",
    items: [
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/theme", label: "Theme" },
      { href: "/docs/responsive", label: "Responsive" },
    ],
  },
  {
    title: "Components",
    items: [
      { href: "/docs/components/button", label: "Button" },
      { href: "/docs/components/card", label: "Card" },
      { href: "/docs/components/input", label: "Input" },
    ],
  },
];

export function DocSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 overflow-y-auto py-6 px-4">
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
