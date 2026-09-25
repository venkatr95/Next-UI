"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { cn, type BaseComponentProps } from "@next-ui/utils";
import { colors } from "@next-ui/theme";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";
export type TooltipColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

export interface TooltipProps extends BaseComponentProps<HTMLDivElement> {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  color?: TooltipColor;
  showArrow?: boolean;
  children: React.ReactNode;
}

const placementClasses: Record<TooltipPlacement, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowClasses: Record<TooltipPlacement, string> = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-gray-900 dark:border-t-gray-100 border-x-transparent border-b-transparent",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 dark:border-b-gray-100 border-x-transparent border-t-transparent",
  left: "left-full top-1/2 -translate-y-1/2 border-l-gray-900 dark:border-l-gray-100 border-y-transparent border-r-transparent",
  right: "right-full top-1/2 -translate-y-1/2 border-r-gray-900 dark:border-r-gray-100 border-y-transparent border-l-transparent",
};

const colorClasses: Record<TooltipColor, string> = {
  default: "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900",
  primary: "bg-indigo-600 text-white",
  secondary: "bg-violet-600 text-white",
  success: "bg-green-600 text-white",
  warning: "bg-amber-600 text-white",
  danger: "bg-red-600 text-white",
};

export function Tooltip({
  content,
  placement = "top",
  delay = 200,
  color = "default",
  showArrow = true,
  className,
  children,
  ...props
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className={cn("relative inline-block", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      {...props}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-50 px-3 py-2 text-sm rounded-md shadow-lg whitespace-nowrap",
            "animate-in fade-in zoom-in-95 duration-150",
            placementClasses[placement],
            colorClasses[color]
          )}
        >
          {content}
          {showArrow && (
            <div
              className={cn(
                "absolute w-0 h-0 border-4",
                arrowClasses[placement]
              )}
            />
          )}
        </div>
      )}
    </div>
  );
}
