"use client";

import React from "react";
import { cn } from "@next-ui/utils";
import { usePlaygroundTheme } from "@/contexts/playground-theme";

const DEVICE_SIZES = {
  mobile: { width: 375, height: 667, label: "Mobile" },
  tablet: { width: 768, height: 1024, label: "Tablet" },
  desktop: { width: "100%", height: "100%", label: "Desktop" },
} as const;

export function DeviceFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  const { deviceSize } = usePlaygroundTheme();
  const config = DEVICE_SIZES[deviceSize];

  const isDesktop = deviceSize === "desktop";

  return (
    <div
      className={cn(
        "flex items-start justify-center overflow-auto bg-gray-100 dark:bg-gray-900/50 rounded-xl transition-all duration-300",
        !isDesktop && "p-8 min-h-[400px]",
        className
      )}
    >
      {isDesktop ? (
        <div className="w-full min-h-full">{children}</div>
      ) : (
        <div
          className="relative bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl border-8 border-gray-800 dark:border-gray-700 overflow-hidden"
          style={{
            width: typeof config.width === "number" ? config.width : config.width,
            minHeight: typeof config.height === "number" ? config.height : 400,
          }}
        >
          {/* Device notch for mobile */}
          {deviceSize === "mobile" && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-800 dark:bg-gray-700 rounded-b-xl z-10" />
          )}
          <div className="overflow-auto h-full" style={{ minHeight: typeof config.height === "number" ? config.height - 16 : 384 }}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
