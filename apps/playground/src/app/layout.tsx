"use client";

import React from "react";
import { NextUIProvider } from "@next-ui/core";
import { ToastProvider } from "@next-ui/toast";
import { PlaygroundThemeProvider, usePlaygroundTheme } from "@/contexts/playground-theme";
import { Sidebar } from "@/components/sidebar";
import { Toolbar } from "@/components/toolbar";
import { DeviceFrame } from "@/components/device-frame";
import "./globals.css";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { themeConfig } = usePlaygroundTheme();

  return (
    <NextUIProvider theme={themeConfig}>
      <ToastProvider placement="top-right">
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
          <Toolbar />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-auto">
              <DeviceFrame>
                <div className="min-h-full p-6 md:p-8">{children}</div>
              </DeviceFrame>
            </main>
          </div>
        </div>
      </ToastProvider>
    </NextUIProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <PlaygroundThemeProvider>
          <LayoutContent>{children}</LayoutContent>
        </PlaygroundThemeProvider>
      </body>
    </html>
  );
}
