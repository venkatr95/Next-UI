import React from "react";
import { cn } from "@next-ui/utils";
import { useResponsiveContext } from "./responsive-provider";
import type { ResponsiveValue } from "@next-ui/utils";

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: ResponsiveValue<number>;
  gap?: ResponsiveValue<string>;
}

const colsMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

export function ResponsiveGrid({
  children,
  className,
  columns = { mobile: 1, tablet: 2, desktop: 4 },
  gap = "gap-4",
}: ResponsiveGridProps) {
  const { deviceType } = useResponsiveContext();

  const resolvedCols = resolveSimple(columns, deviceType) ?? 4;
  const resolvedGap = resolveSimple(gap, deviceType) ?? "gap-4";

  return (
    <div
      className={cn(
        "grid",
        colsMap[resolvedCols] ?? `grid-cols-${resolvedCols}`,
        resolvedGap,
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
