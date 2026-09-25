"use client";

import React, { forwardRef } from "react";
import { cn } from "@next-ui/utils";
import { colors } from "@next-ui/theme";
import type { BaseComponentProps } from "@next-ui/utils";

export type AlertColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

export type AlertVariant = "flat" | "bordered" | "faded";

const colorVariantClasses: Record<
  AlertColor,
  Record<AlertVariant, { container: string; icon: string; close: string }>
> = {
  default: {
    flat: {
      container:
        "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-700",
      icon: "text-gray-600 dark:text-gray-400",
      close: "hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400",
    },
    bordered: {
      container:
        "bg-transparent border-2 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600",
      icon: "text-gray-600 dark:text-gray-400",
      close: "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400",
    },
    faded: {
      container:
        "bg-gray-100/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 border-gray-200/50 dark:border-gray-700/50",
      icon: "text-gray-500 dark:text-gray-500",
      close: "hover:bg-gray-300/50 dark:hover:bg-gray-600/50 text-gray-600 dark:text-gray-400",
    },
  },
  primary: {
    flat: {
      container:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200 border-indigo-200 dark:border-indigo-800",
      icon: "text-indigo-600 dark:text-indigo-400",
      close: "hover:bg-indigo-200 dark:hover:bg-indigo-800/60 text-indigo-700 dark:text-indigo-300",
    },
    bordered: {
      container:
        "bg-transparent border-2 text-indigo-800 dark:text-indigo-200 border-indigo-500 dark:border-indigo-500",
      icon: "text-indigo-600 dark:text-indigo-400",
      close: "hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300",
    },
    faded: {
      container:
        "bg-indigo-50/80 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 border-indigo-200/50 dark:border-indigo-800/50",
      icon: "text-indigo-600 dark:text-indigo-400",
      close: "hover:bg-indigo-100/80 dark:hover:bg-indigo-800/40 text-indigo-700 dark:text-indigo-300",
    },
  },
  secondary: {
    flat: {
      container:
        "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200 border-violet-200 dark:border-violet-800",
      icon: "text-violet-600 dark:text-violet-400",
      close: "hover:bg-violet-200 dark:hover:bg-violet-800/60 text-violet-700 dark:text-violet-300",
    },
    bordered: {
      container:
        "bg-transparent border-2 text-violet-800 dark:text-violet-200 border-violet-500 dark:border-violet-500",
      icon: "text-violet-600 dark:text-violet-400",
      close: "hover:bg-violet-100 dark:hover:bg-violet-900/40 text-violet-700 dark:text-violet-300",
    },
    faded: {
      container:
        "bg-violet-50/80 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200 border-violet-200/50 dark:border-violet-800/50",
      icon: "text-violet-600 dark:text-violet-400",
      close: "hover:bg-violet-100/80 dark:hover:bg-violet-800/40 text-violet-700 dark:text-violet-300",
    },
  },
  success: {
    flat: {
      container:
        "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200 border-green-200 dark:border-green-800",
      icon: "text-green-600 dark:text-green-400",
      close: "hover:bg-green-200 dark:hover:bg-green-800/60 text-green-700 dark:text-green-300",
    },
    bordered: {
      container:
        "bg-transparent border-2 text-green-800 dark:text-green-200 border-green-500 dark:border-green-500",
      icon: "text-green-600 dark:text-green-400",
      close: "hover:bg-green-100 dark:hover:bg-green-900/40 text-green-700 dark:text-green-300",
    },
    faded: {
      container:
        "bg-green-50/80 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200/50 dark:border-green-800/50",
      icon: "text-green-600 dark:text-green-400",
      close: "hover:bg-green-100/80 dark:hover:bg-green-800/40 text-green-700 dark:text-green-300",
    },
  },
  warning: {
    flat: {
      container:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200 border-amber-200 dark:border-amber-800",
      icon: "text-amber-600 dark:text-amber-400",
      close: "hover:bg-amber-200 dark:hover:bg-amber-800/60 text-amber-700 dark:text-amber-300",
    },
    bordered: {
      container:
        "bg-transparent border-2 text-amber-800 dark:text-amber-200 border-amber-500 dark:border-amber-500",
      icon: "text-amber-600 dark:text-amber-400",
      close: "hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-700 dark:text-amber-300",
    },
    faded: {
      container:
        "bg-amber-50/80 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 border-amber-200/50 dark:border-amber-800/50",
      icon: "text-amber-600 dark:text-amber-400",
      close: "hover:bg-amber-100/80 dark:hover:bg-amber-800/40 text-amber-700 dark:text-amber-300",
    },
  },
  danger: {
    flat: {
      container:
        "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200 border-red-200 dark:border-red-800",
      icon: "text-red-600 dark:text-red-400",
      close: "hover:bg-red-200 dark:hover:bg-red-800/60 text-red-700 dark:text-red-300",
    },
    bordered: {
      container:
        "bg-transparent border-2 text-red-800 dark:text-red-200 border-red-500 dark:border-red-500",
      icon: "text-red-600 dark:text-red-400",
      close: "hover:bg-red-100 dark:hover:bg-red-900/40 text-red-700 dark:text-red-300",
    },
    faded: {
      container:
        "bg-red-50/80 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200/50 dark:border-red-800/50",
      icon: "text-red-600 dark:text-red-400",
      close: "hover:bg-red-100/80 dark:hover:bg-red-800/40 text-red-700 dark:text-red-300",
    },
  },
};

const defaultIconByColor: Record<AlertColor, React.ReactNode> = {
  default: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  primary: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  secondary: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  danger: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

export interface AlertProps
  extends Omit<BaseComponentProps<HTMLDivElement>, "color">,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps | "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  color?: AlertColor;
  variant?: AlertVariant;
  isClosable?: boolean;
  onClose?: () => void;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  children?: React.ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      title,
      description,
      icon,
      color = "default",
      variant = "flat",
      isClosable = false,
      onClose,
      startContent,
      endContent,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const styles = colorVariantClasses[color][variant];
    const displayIcon = icon ?? defaultIconByColor[color];
    const hasContent = title || description || children || startContent || endContent;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative flex items-start gap-3 rounded-lg border px-4 py-3",
          "transition-colors duration-200",
          styles.container,
          className
        )}
        {...props}
      >
        {(startContent || displayIcon) && (
          <span className={cn("shrink-0 flex items-center", styles.icon)}>
            {startContent ?? displayIcon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-semibold text-sm leading-tight text-inherit">{title}</p>
          )}
          {description && (
            <p
              className={cn(
                "text-sm leading-relaxed text-inherit/90",
                title && "mt-1"
              )}
            >
              {description}
            </p>
          )}
          {children}
        </div>
        {endContent && (
          <span className="shrink-0 flex items-center">{endContent}</span>
        )}
        {isClosable && (
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "shrink-0 p-1 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current",
              styles.close
            )}
            aria-label="Close alert"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";
