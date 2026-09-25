"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  forwardRef,
} from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses } from "@next-ui/theme";
import type { BaseComponentProps, ResponsiveValue } from "@next-ui/utils";
import { useResponsiveContext, resolveResponsiveValue } from "@next-ui/responsive";

type SelectionMode = "single" | "multiple";
type AccordionVariant = "light" | "bordered" | "shadow" | "splitted";

interface AccordionContextValue {
  selectedKeys: Set<string>;
  onToggle: (key: string) => void;
  selectionMode: SelectionMode;
  variant: AccordionVariant;
  isCompact: boolean;
  isDisabled: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be used within Accordion");
  return ctx;
}

const variantClasses: Record<AccordionVariant, string> = {
  light: "bg-gray-50 dark:bg-gray-800/50 rounded-lg",
  bordered: "border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden",
  shadow: "shadow-md rounded-lg overflow-hidden bg-white dark:bg-gray-900",
  splitted: "gap-2",
};

export interface AccordionProps
  extends Omit<BaseComponentProps<HTMLDivElement>, "color">,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {
  selectionMode?: SelectionMode;
  variant?: AccordionVariant;
  selectedKeys?: Iterable<string>;
  defaultSelectedKeys?: Iterable<string>;
  onSelectionChange?: (keys: Set<string>) => void;
  isCompact?: boolean;
  isDisabled?: boolean;
  children: React.ReactNode;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      as: Component = "div",
      className,
      styleType,
      selectionMode = "single",
      variant = "bordered",
      selectedKeys: controlledKeys,
      defaultSelectedKeys,
      onSelectionChange,
      isCompact = false,
      isDisabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const [internalKeys, setInternalKeys] = useState<Set<string>>(() => {
      const def = defaultSelectedKeys
        ? new Set(
            typeof defaultSelectedKeys === "string"
              ? [defaultSelectedKeys]
              : Array.from(defaultSelectedKeys)
          )
        : new Set<string>();
      return def;
    });
    const isControlled = controlledKeys !== undefined;
    const selectedKeys = isControlled
      ? new Set(
          typeof controlledKeys === "string"
            ? [controlledKeys]
            : Array.from(controlledKeys)
        )
      : internalKeys;

    const onToggle = useCallback(
      (key: string) => {
        if (isDisabled) return;
        const next = new Set(selectedKeys);
        if (next.has(key)) {
          next.delete(key);
        } else {
          if (selectionMode === "single") next.clear();
          next.add(key);
        }
        if (!isControlled) setInternalKeys(next);
        onSelectionChange?.(next);
      },
      [isControlled, isDisabled, selectionMode, selectedKeys, onSelectionChange]
    );

    const value: AccordionContextValue = {
      selectedKeys,
      onToggle,
      selectionMode,
      variant,
      isCompact,
      isDisabled,
    };

    return (
      <AccordionContext.Provider value={value}>
        <Component
          ref={ref}
          className={cn(
            "flex flex-col",
            variant !== "splitted" && variantClasses[variant],
            getStyleClasses(styleType),
            className
          )}
          data-accordion
          {...props}
        >
          {children}
        </Component>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = "Accordion";

export interface AccordionItemProps
  extends Omit<BaseComponentProps<HTMLDivElement>, "color">,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps | "title"> {
  itemKey: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  startContent?: React.ReactNode;
  indicator?: React.ReactNode;
  isDisabled?: boolean;
  children?: React.ReactNode;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (
    {
      itemKey,
      title,
      subtitle,
      startContent,
      indicator,
      isDisabled = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const {
      selectedKeys,
      onToggle,
      variant,
      isCompact,
      isDisabled: accordionDisabled,
    } = useAccordionContext();

    const isExpanded = selectedKeys.has(itemKey);
    const disabled = isDisabled ?? accordionDisabled;

    const itemVariantClasses: Record<AccordionVariant, string> = {
      light: "border-b border-gray-200 dark:border-gray-700 last:border-b-0",
      bordered: "border-b border-gray-200 dark:border-gray-700 last:border-b-0",
      shadow: "border-b border-gray-200 dark:border-gray-700 last:border-b-0",
      splitted: cn(
        "rounded-lg overflow-hidden",
        "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
      ),
    };

    return (
      <div
        ref={ref}
        className={cn(variant === "splitted" && itemVariantClasses.splitted, className)}
        data-accordion-item
        {...props}
      >
        <button
          type="button"
          onClick={() => onToggle(itemKey)}
          disabled={disabled}
          aria-expanded={isExpanded}
          aria-disabled={disabled}
          className={cn(
            "w-full flex items-center gap-3 text-left transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            variant !== "splitted" && itemVariantClasses[variant],
            isCompact ? "px-3 py-2" : "px-4 py-3"
          )}
        >
          {startContent && (
            <span className="shrink-0 text-gray-500 dark:text-gray-400">
              {startContent}
            </span>
          )}
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {title}
            </div>
            {subtitle && (
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {subtitle}
              </div>
            )}
          </div>
          <span
            className={cn(
              "shrink-0 transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          >
            {indicator ?? (
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </span>
        </button>
        <div
          className={cn(
            "overflow-hidden transition-all duration-200 ease-in-out",
            isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          )}
          style={{ maxHeight: isExpanded ? "2000px" : "0" }}
        >
          <div
            className={cn(
              "border-t border-gray-200 dark:border-gray-700",
              isCompact ? "px-3 py-2" : "px-4 py-3",
              "text-gray-600 dark:text-gray-300 text-sm"
            )}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);

AccordionItem.displayName = "AccordionItem";
