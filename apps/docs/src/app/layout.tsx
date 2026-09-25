"use client";

import "./globals.css";
import React, { useState } from "react";
import Link from "next/link";
import { NextUIProvider } from "@next-ui/core";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@next-ui/navbar";
import { Button } from "@next-ui/button";
import { DocSidebar } from "@/components/doc-sidebar";

function ThemeToggle({
  mode,
  onToggle,
}: {
  mode: "light" | "dark";
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {mode === "dark" ? (
        <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setThemeMode((m) => (m === "light" ? "dark" : "light"));
  };

  return (
    <html lang="en" className={themeMode === "dark" ? "dark" : ""}>
      <body className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
        <NextUIProvider theme={{ mode: themeMode }}>
          <div className="flex min-h-screen">
            {/* Sidebar - hidden on mobile, shown on desktop */}
            <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-16 border-r border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
              <DocSidebar />
            </aside>

            <div className="flex flex-col flex-1 lg:pl-64">
              <Navbar
                isBordered
                maxWidth="full"
                className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-md"
              >
                <NavbarContent justify="start">
                  <NavbarMenuToggle
                    className="lg:hidden"
                    aria-label="Toggle menu"
                  />
                  <NavbarBrand className="font-bold text-xl text-indigo-600 dark:text-indigo-400">
                    <Link href="/">Next-UI</Link>
                  </NavbarBrand>
                </NavbarContent>
                <NavbarContent justify="center" className="hidden sm:flex gap-6">
                  <NavbarItem>
                    <Link
                      href="/"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      Docs
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link
                      href="/docs/components/button"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      Components
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      GitHub
                    </a>
                  </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                  <NavbarItem>
                    <ThemeToggle mode={themeMode} onToggle={toggleTheme} />
                  </NavbarItem>
                </NavbarContent>
                <NavbarMenu className="lg:hidden pt-4">
                  <NavbarMenuItem>
                    <Link href="/" className="block py-2">
                      Docs
                    </Link>
                  </NavbarMenuItem>
                  <NavbarMenuItem>
                    <Link href="/docs/components/button" className="block py-2">
                      Components
                    </Link>
                  </NavbarMenuItem>
                  <NavbarMenuItem>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2"
                    >
                      GitHub
                    </a>
                  </NavbarMenuItem>
                </NavbarMenu>
              </Navbar>

              <main className="flex-1 p-6 md:p-8 lg:p-10">{children}</main>
            </div>
          </div>
        </NextUIProvider>
      </body>
    </html>
  );
}
