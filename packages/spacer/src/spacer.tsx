import * as React from "react";
import { cn } from "@next-ui/utils";
import { resolveResponsiveValue } from "@next-ui/responsive";
import { useResponsiveContext } from "@next-ui/responsive";
import type { ResponsiveValue } from "@next-ui/utils";

const spacingMap: Record<number, { x: string; y: string }> = {
  1: { x: "w-1", y: "h-1" },
  2: { x: "w-2", y: "h-2" },
  3: { x: "w-3", y: "h-3" },
  4: { x: "w-4", y: "h-4" },
  5: { x: "w-5", y: "h-5" },
  6: { x: "w-6", y: "h-6" },
  7: { x: "w-7", y: "h-7" },
  8: { x: "w-8", y: "h-8" },
  9: { x: "w-9", y: "h-9" },
  10: { x: "w-10", y: "h-10" },
  11: { x: "w-11", y: "h-11" },
  12: { x: "w-12", y: "h-12" },
};

function getSpacingClass(
  value: number | undefined,
  axis: "x" | "y"
): string {
  if (value === undefined || value < 1 || value > 12) return "";
  return spacingMap[value]?.[axis] ?? "";
}

export type SpacerValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  x?: ResponsiveValue<SpacerValue>;
  y?: ResponsiveValue<SpacerValue>;
  className?: string;
}

export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ x, y, className, ...props }, ref) => {
    const { deviceType } = useResponsiveContext();
    const resolvedX = resolveResponsiveValue(x, deviceType);
    const resolvedY = resolveResponsiveValue(y, deviceType);

    const xClass = getSpacingClass(resolvedX as number | undefined, "x");
    const yClass = getSpacingClass(resolvedY as number | undefined, "y");

    const hasSpacing = xClass || yClass;
    const classes = cn(
      "shrink-0",
      xClass && "inline-block",
      yClass && "block",
      xClass,
      yClass,
      className
    );

    if (!hasSpacing) {
      return null;
    }

    return <div ref={ref} className={classes} aria-hidden {...props} />;
  }
);

Spacer.displayName = "Spacer";
