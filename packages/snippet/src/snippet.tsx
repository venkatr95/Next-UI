"use client";

import React, { useState, useCallback } from "react";
import { cn } from "@next-ui/utils";
import { colors } from "@next-ui/theme";
import type { BaseComponentProps } from "@next-ui/utils";

type SnippetVariant = "flat" | "bordered" | "shadow";
type SnippetSize = "sm" | "md" | "lg";
type ColorKey = keyof typeof colors;

const variantClasses: Record<SnippetVariant, string> = {
  flat: "bg-gray-100 dark:bg-gray-800",
  bordered: "bg-transparent border-2 border-gray-200 dark:border-gray-700",
  shadow: "bg-white dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-700",
};

const sizeClasses: Record<SnippetSize, string> = {
  sm: "px-2 py-1 text-xs gap-1",
  md: "px-3 py-2 text-sm gap-2",
  lg: "px-4 py-3 text-base gap-3",
};

export interface SnippetProps
  extends Omit<BaseComponentProps<HTMLDivElement>, "color">,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {
  symbol?: string;
  color?: ColorKey;
  variant?: SnippetVariant;
  size?: SnippetSize;
  hideCopyButton?: boolean;
  hideSymbol?: boolean;
  codeString?: string;
  timeout?: number;
  children?: React.ReactNode;
}

export const Snippet = React.forwardRef<HTMLDivElement, SnippetProps>(
  (
    {
      symbol,
      color = "default",
      variant = "flat",
      size = "md",
      hideCopyButton = false,
      hideSymbol = false,
      codeString,
      timeout = 2000,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = useState(false);
    const colorClasses = colors[color] ?? colors.default;

    const text = codeString ?? (typeof children === "string" ? children : String(children ?? ""));

    const handleCopy = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), timeout);
      } catch {
        // ignore
      }
    }, [text, timeout]);

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center font-mono rounded-lg",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {!hideSymbol && symbol && (
          <span className="text-gray-500 dark:text-gray-400 shrink-0">{symbol}</span>
        )}
        <code className="flex-1 min-w-0 truncate text-gray-900 dark:text-gray-100">{text}</code>
        {!hideCopyButton && (
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              "shrink-0 px-2 py-1 rounded text-xs font-medium transition-colors",
              "hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1",
              copied ? cn(colorClasses.base, "text-white") : "text-gray-600 dark:text-gray-400"
            )}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>
    );
  }
);

Snippet.displayName = "Snippet";
