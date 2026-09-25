import React from "react";
import { cn } from "@next-ui/utils";
import { useResponsiveContext } from "./responsive-provider";
import type { ResponsiveValue } from "@next-ui/utils";

interface ResponsiveStackProps {
  children: React.ReactNode;
  className?: string;
  direction?: ResponsiveValue<"row" | "column">;
  gap?: ResponsiveValue<string>;
  align?: ResponsiveValue<string>;
  justify?: ResponsiveValue<string>;
}

export function ResponsiveStack({
  children,
  className,
  direction = { mobile: "column", desktop: "row" },
  gap = "gap-4",
  align,
  justify,
}: ResponsiveStackProps) {
  const { deviceType } = useResponsiveContext();

  const resolvedDir = resolveSimple(direction, deviceType) ?? "column";
  const resolvedGap = resolveSimple(gap, deviceType) ?? "gap-4";
  const resolvedAlign = resolveSimple(align, deviceType);
  const resolvedJustify = resolveSimple(justify, deviceType);

  return (
    <div
      className={cn(
        "flex",
        resolvedDir === "row" ? "flex-row" : "flex-col",
        resolvedGap,
        resolvedAlign && `items-${resolvedAlign}`,
        resolvedJustify && `justify-${resolvedJustify}`,
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
