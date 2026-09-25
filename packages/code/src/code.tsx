import React, { forwardRef } from "react";
import { cn } from "@next-ui/utils";
import { colors } from "@next-ui/theme";

type CodeSize = "sm" | "md" | "lg";
type CodeColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  color?: CodeColor;
  size?: CodeSize;
  className?: string;
  children?: React.ReactNode;
}

const sizeClasses: Record<CodeSize, string> = {
  sm: "text-xs px-1.5 py-0.5",
  md: "text-sm px-2 py-1",
  lg: "text-base px-2.5 py-1.5",
};

const colorClasses: Record<CodeColor, string> = {
  default:
    "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700",
  primary:
    "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
  secondary:
    "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800",
  success:
    "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
  warning:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  danger:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
};

export const Code = forwardRef<HTMLElement, CodeProps>(
  (
    {
      color = "default",
      size = "md",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <code
        ref={ref as React.Ref<HTMLSpanElement>}
        className={cn(
          "font-mono rounded border",
          sizeClasses[size],
          colorClasses[color],
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  }
);

Code.displayName = "Code";
