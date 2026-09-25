"use client";

import React, { forwardRef } from "react";
import { cn } from "@next-ui/utils";
import type { BaseComponentProps } from "@next-ui/utils";

const KEY_SYMBOLS: Record<string, string> = {
  command: "⌘",
  cmd: "⌘",
  meta: "⌘",
  shift: "⇧",
  option: "⌥",
  alt: "⌥",
  ctrl: "⌃",
  control: "⌃",
  enter: "↵",
  return: "↵",
  backspace: "⌫",
  delete: "⌦",
  escape: "⎋",
  esc: "⎋",
  tab: "⇥",
  caps: "⇪",
  capslock: "⇪",
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
  space: "␣",
  spacebar: "␣",
};

export interface KbdProps
  extends BaseComponentProps<HTMLSpanElement>,
    Omit<React.HTMLAttributes<HTMLSpanElement>, keyof BaseComponentProps> {
  keys?: string[];
  children?: React.ReactNode;
}

function getKeyDisplay(key: string): string {
  const normalized = key.toLowerCase().trim();
  return KEY_SYMBOLS[normalized] ?? key;
}

export const Kbd = forwardRef<HTMLSpanElement, KbdProps>(
  ({ keys, children, className, ...props }, ref) => {
    const keyElements = keys?.map((key, i) => (
      <kbd
        key={i}
        className="inline-flex items-center justify-center min-w-[1.5em] h-5 px-1.5 font-mono text-xs font-medium bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm"
      >
        {getKeyDisplay(key)}
      </kbd>
    ));

    return (
      <span
        ref={ref}
        className={cn("inline-flex items-center gap-1", className)}
        {...props}
      >
        {keyElements}
        {children && (
          <>
            {keyElements && keyElements.length > 0 && (
              <span className="text-gray-500 dark:text-gray-400">+</span>
            )}
            {children}
          </>
        )}
      </span>
    );
  }
);

Kbd.displayName = "Kbd";
