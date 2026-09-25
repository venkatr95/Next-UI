"use client";

import React from "react";
import { cn } from "@next-ui/utils";
import { colors } from "@next-ui/theme";
import type { BaseComponentProps } from "@next-ui/utils";

type CircularProgressSize = "sm" | "md" | "lg";
type ColorKey = keyof typeof colors;

const sizeMap: Record<CircularProgressSize, { svg: number; stroke: number }> = {
  sm: { svg: 32, stroke: 3 },
  md: { svg: 48, stroke: 4 },
  lg: { svg: 64, stroke: 5 },
};

export interface CircularProgressProps
  extends Omit<BaseComponentProps<HTMLDivElement>, "color">,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {
  value?: number;
  minValue?: number;
  maxValue?: number;
  label?: React.ReactNode;
  showValueLabel?: boolean;
  size?: CircularProgressSize;
  color?: ColorKey;
  isIndeterminate?: boolean;
  strokeWidth?: number;
}

const colorStrokeMap: Record<ColorKey, string> = {
  default: "stroke-gray-500",
  primary: "stroke-indigo-500",
  secondary: "stroke-violet-500",
  success: "stroke-green-500",
  warning: "stroke-amber-500",
  danger: "stroke-red-500",
};

export const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    {
      value = 0,
      minValue = 0,
      maxValue = 100,
      label,
      showValueLabel = false,
      size = "md",
      color = "primary",
      isIndeterminate = false,
      strokeWidth,
      className,
      ...props
    },
    ref
  ) => {
    const colorClasses = colors[color] ?? colors.primary;
    const { svg: svgSize, stroke: defaultStroke } = sizeMap[size];
    const stroke = strokeWidth ?? defaultStroke;
    const radius = (svgSize - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.min(Math.max(value, minValue), maxValue);
    const percent = ((clamped - minValue) / (maxValue - minValue)) * 100;
    const offset = circumference - (percent / 100) * circumference;

    return (
      <div
        ref={ref}
        className={cn("inline-flex flex-col items-center gap-2", className)}
        {...props}
      >
        <div className="relative">
          <svg
            width={svgSize}
            height={svgSize}
            className="transform -rotate-90"
            aria-hidden
          >
            <circle
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={radius}
              fill="none"
              strokeWidth={stroke}
              className="stroke-gray-200 dark:stroke-gray-700"
            />
            <circle
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={radius}
              fill="none"
              strokeWidth={stroke}
              strokeLinecap="round"
              className={cn(
                colorStrokeMap[color] ?? "stroke-indigo-500",
                isIndeterminate && "animate-spin"
              )}
              strokeDasharray={circumference}
              strokeDashoffset={isIndeterminate ? circumference * 0.25 : offset}
              style={{
                transition: isIndeterminate ? "none" : "stroke-dashoffset 0.3s ease-out",
              }}
            />
          </svg>
          {showValueLabel && (
            <div
              className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300"
              aria-hidden
            >
              {isIndeterminate ? "" : `${Math.round(percent)}%`}
            </div>
          )}
        </div>
        {label && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        )}
      </div>
    );
  }
);

CircularProgress.displayName = "CircularProgress";
