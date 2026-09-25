import React from "react";
import { cn } from "@next-ui/utils";
import { useResponsiveContext } from "./responsive-provider";
import type { ResponsiveValue } from "@next-ui/utils";

interface ResponsiveBoxProps {
  children: React.ReactNode;
  className?: string;
  padding?: ResponsiveValue<string>;
  display?: ResponsiveValue<"block" | "flex" | "grid" | "none">;
  hide?: ResponsiveValue<boolean>;
}

export function ResponsiveBox({
  children,
  className,
  padding,
  display,
  hide,
}: ResponsiveBoxProps) {
  const { deviceType } = useResponsiveContext();

  const resolvedHide = resolveSimple(hide, deviceType);
  if (resolvedHide) return null;

  const resolvedPadding = resolveSimple(padding, deviceType);
  const resolvedDisplay = resolveSimple(display, deviceType);

  return (
    <div
      className={cn(
        resolvedPadding,
        resolvedDisplay && `${resolvedDisplay}`,
        className
      )}
    >
      {children}
    </div>
  );
}

function resolveSimple<T>(
  value: ResponsiveValue<T> | undefined,
  deviceType: "mobile" | "tablet" | "desktop"
): T | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "object" || value === null) return value as T;
  const resp = value as { mobile?: T; tablet?: T; desktop?: T };
  return resp[deviceType] ?? resp.desktop ?? resp.tablet ?? resp.mobile;
}
