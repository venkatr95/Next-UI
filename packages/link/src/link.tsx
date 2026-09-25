import React, { forwardRef } from "react";
import { cn } from "@next-ui/utils";
import type { BaseComponentProps } from "@next-ui/utils";

type LinkSize = "sm" | "md" | "lg";
type LinkUnderline = "none" | "hover" | "always" | "active" | "focus";

const sizeClasses: Record<LinkSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const linkColorClasses: Record<
  "default" | "primary" | "secondary" | "success" | "warning" | "danger",
  string
> = {
  default:
    "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100",
  primary: "text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300",
  secondary: "text-violet-500 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300",
  success: "text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300",
  warning: "text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300",
  danger: "text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300",
};

const underlineClasses: Record<LinkUnderline, string> = {
  none: "no-underline",
  hover: "no-underline hover:underline",
  always: "underline",
  active: "no-underline active:underline",
  focus: "no-underline focus-visible:underline",
};

export interface LinkProps
  extends BaseComponentProps<HTMLAnchorElement>,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseComponentProps> {
  href?: string;
  isExternal?: boolean;
  size?: LinkSize;
  underline?: LinkUnderline;
  isBlock?: boolean;
  isDisabled?: boolean;
  showAnchorIcon?: boolean;
}

const ExternalIcon = () => (
  <svg
    className="inline-block w-3.5 h-3.5 ml-0.5 align-middle"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      as: Component = "a",
      className,
      href,
      isExternal = false,
      color = "primary",
      size = "md",
      underline = "hover",
      isBlock = false,
      isDisabled = false,
      showAnchorIcon = false,
      children,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const colorClasses = linkColorClasses[color ?? "primary"];
    const showIcon = isExternal || showAnchorIcon;

    const resolvedTarget = target ?? (isExternal ? "_blank" : undefined);
    const resolvedRel = rel ?? (isExternal ? "noopener noreferrer" : undefined);

    return (
      <Component
        ref={ref}
        href={isDisabled ? undefined : href}
        target={resolvedTarget}
        rel={resolvedRel}
        aria-disabled={isDisabled}
        className={cn(
          "inline-flex items-center font-medium transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-current",
          colorClasses,
          "cursor-pointer",
          sizeClasses[size],
          underlineClasses[underline],
          isBlock && "block",
          isDisabled && "opacity-50 pointer-events-none cursor-not-allowed",
          className
        )}
        {...(isDisabled && { onClick: (e: React.MouseEvent) => e.preventDefault() })}
        {...props}
      >
        {children}
        {showIcon && <ExternalIcon />}
      </Component>
    );
  }
);

Link.displayName = "Link";
