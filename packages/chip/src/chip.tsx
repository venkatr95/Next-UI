import React, { forwardRef } from "react";
import { cn, type BaseComponentProps } from "@next-ui/utils";
import { getStyleClasses, colors } from "@next-ui/theme";

type ChipVariant = "solid" | "bordered" | "light" | "flat" | "dot";
type ChipSize = "sm" | "md" | "lg";

export interface ChipProps extends BaseComponentProps<HTMLDivElement> {
  variant?: ChipVariant;
  size?: ChipSize;
  onClose?: () => void;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  avatar?: React.ReactNode;
  children?: React.ReactNode;
}

const sizeClasses: Record<ChipSize, string> = {
  sm: "h-6 px-2 text-xs gap-1",
  md: "h-8 px-3 text-sm gap-1.5",
  lg: "h-10 px-4 text-base gap-2",
};

function getVariantClasses(
  variant: ChipVariant,
  color: NonNullable<ChipProps["color"]>
): string {
  const c = colors[color] ?? colors.primary;

  switch (variant) {
    case "solid":
      return cn(c.base, c.hover);
    case "bordered":
      return cn(
        "bg-transparent border-2",
        c.border,
        "text-current hover:bg-gray-100 dark:hover:bg-gray-800"
      );
    case "light": {
      const lightMap: Record<NonNullable<ChipProps["color"]>, string> = {
        default: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
        primary: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
        secondary: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
        success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
        warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
        danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      };
      return cn(lightMap[color], "hover:opacity-90");
    }
    case "flat":
      return cn(
        "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100",
        "hover:bg-gray-200 dark:hover:bg-gray-700"
      );
    case "dot":
      return cn(
        "bg-transparent border border-gray-300 dark:border-gray-600",
        "hover:bg-gray-50 dark:hover:bg-gray-800"
      );
    default:
      return c.base;
  }
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      styleType,
      color = "primary",
      variant = "solid",
      size = "md",
      onClose,
      startContent,
      endContent,
      avatar,
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = getVariantClasses(variant, color);

    const dotColorMap: Record<NonNullable<ChipProps["color"]>, string> = {
      default: "bg-gray-500",
      primary: "bg-indigo-500",
      secondary: "bg-violet-500",
      success: "bg-green-500",
      warning: "bg-amber-500",
      danger: "bg-red-500",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full font-medium transition-colors",
          sizeClasses[size],
          variantClasses,
          getStyleClasses(styleType),
          className
        )}
        {...props}
      >
        {avatar && (
          <span className="flex-shrink-0 overflow-hidden rounded-full">
            {avatar}
          </span>
        )}
        {variant === "dot" && (
          <span
            className={cn(
              "flex-shrink-0 w-2 h-2 rounded-full",
              dotColorMap[color]
            )}
          />
        )}
        {startContent && <span className="flex-shrink-0">{startContent}</span>}
        {children}
        {endContent && <span className="flex-shrink-0">{endContent}</span>}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Remove"
            className="flex-shrink-0 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
          >
            <svg
              className="w-3.5 h-3.5"
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

Chip.displayName = "Chip";
