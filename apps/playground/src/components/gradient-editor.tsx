"use client";

import React, { useState } from "react";
import { gradients } from "@next-ui/theme";
import type { GradientType } from "@next-ui/utils";
import { cn } from "@next-ui/utils";

const GRADIENT_OPTIONS: Exclude<GradientType, "none">[] = [
  "sunset",
  "aurora",
  "ocean",
  "purple-glow",
];

const GRADIENT_LABELS: Record<Exclude<GradientType, "none">, string> = {
  sunset: "Sunset",
  aurora: "Aurora",
  ocean: "Ocean",
  "purple-glow": "Purple Glow",
};

export interface GradientEditorProps {
  value?: string;
  onChange?: (gradient: Exclude<GradientType, "none">) => void;
  className?: string;
}

export function GradientEditor({ value, onChange, className }: GradientEditorProps) {
  const [selected, setSelected] = useState<Exclude<GradientType, "none">>(
    (value as Exclude<GradientType, "none">) ?? "ocean"
  );
  const [isOpen, setIsOpen] = useState(false);

  const current = value ?? selected;

  const handleSelect = (g: Exclude<GradientType, "none">) => {
    setSelected(g);
    onChange?.(g);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-lg border",
          "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600",
          "hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        )}
      >
        <span
          className={cn(
            "w-6 h-4 rounded",
            gradients[current as Exclude<GradientType, "none">] ?? gradients.ocean
          )}
        />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {GRADIENT_LABELS[current as Exclude<GradientType, "none">]}
        </span>
        <svg
          className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            className={cn(
              "absolute top-full right-0 mt-2 z-50 w-48 py-2 rounded-lg shadow-xl",
              "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600"
            )}
          >
            {GRADIENT_OPTIONS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => handleSelect(g)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-left",
                  "hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                  current === g && "bg-gray-100 dark:bg-gray-700"
                )}
              >
                <span className={cn("w-8 h-5 rounded flex-shrink-0", gradients[g])} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {GRADIENT_LABELS[g]}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
