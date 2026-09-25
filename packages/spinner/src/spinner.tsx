import React, { forwardRef } from "react";
import { cn } from "@next-ui/utils";
import { colors } from "@next-ui/theme";

type SpinnerSize = "sm" | "md" | "lg";
type SpinnerColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: SpinnerSize;
  color?: SpinnerColor;
  label?: string;
  className?: string;
}

const sizeMap: Record<SpinnerSize, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

const colorMap: Record<SpinnerColor, string> = {
  default: "text-gray-600 dark:text-gray-400",
  primary: "text-indigo-500",
  secondary: "text-violet-500",
  success: "text-green-500",
  warning: "text-amber-500",
  danger: "text-red-500",
};

export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  (
    {
      size = "md",
      color = "primary",
      label = "Loading",
      className,
      ...props
    },
    ref
  ) => {
    const colorClasses = colorMap[color];

    return (
      <svg
        ref={ref}
        role="status"
        aria-label={label}
        viewBox="0 0 24 24"
        fill="none"
        className={cn(
          "animate-spin inline-block",
          sizeMap[size],
          colorClasses,
          className
        )}
        {...props}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );
  }
);

Spinner.displayName = "Spinner";
