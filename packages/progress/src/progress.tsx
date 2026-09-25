"use client";

import React from "react";
import { cn } from "@next-ui/utils";
import { colors } from "@next-ui/theme";
import type { BaseComponentProps } from "@next-ui/utils";

type ProgressSize = "sm" | "md" | "lg";
type ProgressVariant = "flat" | "bordered";
type ColorKey = keyof typeof colors;

const sizeClasses: Record<ProgressSize, string> = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

export interface ProgressProps
  extends Omit<BaseComponentProps<HTMLDivElement>, "color">,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {
  value?: number;
  minValue?: number;
  maxValue?: number;
  label?: React.ReactNode;
  showValueLabel?: boolean;
  size?: ProgressSize;
  color?: ColorKey;
  variant?: ProgressVariant;
  isIndeterminate?: boolean;
  isStriped?: boolean;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      minValue = 0,
      maxValue = 100,
      label,
      showValueLabel = false,
      size = "md",
      color = "primary",
      variant = "flat",
      isIndeterminate = false,
      isStriped = false,
      className,
      ...props
    },
    ref
  ) => {
    const colorClasses = colors[color] ?? colors.primary;
    const clamped = Math.min(Math.max(value, minValue), maxValue);
    const percent = ((clamped - minValue) / (maxValue - minValue)) * 100;

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {(label || showValueLabel) && (
          <div className="flex justify-between items-center mb-1">
            {label && <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>}
            {showValueLabel && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {Math.round(percent)}%
              </span>
            )}
          </div>
        )}
        <div
          role="progressbar"
          aria-valuenow={isIndeterminate ? undefined : value}
          aria-valuemin={minValue}
          aria-valuemax={maxValue}
          aria-label={typeof label === "string" ? label : undefined}
          className={cn(
            "w-full overflow-hidden rounded-full",
            sizeClasses[size],
            variant === "flat" && "bg-gray-200 dark:bg-gray-700",
            variant === "bordered" && "border-2 border-gray-200 dark:border-gray-700 bg-transparent"
          )}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300 ease-out",
              colorClasses.base,
              isStriped &&
                "bg-[length:1rem_1rem] bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] [animation:progress-stripes_1s_linear_infinite]",
              isIndeterminate && "w-1/3 [animation:progress-indeterminate_1.5s_ease-in-out_infinite]"
            )}
            style={
              isIndeterminate
                ? undefined
                : { width: `${percent}%` }
            }
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";
