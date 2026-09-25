import React, { forwardRef } from "react";
import { cn, type BaseComponentProps, type ResponsiveValue } from "@next-ui/utils";
import { colors } from "@next-ui/theme";
import { useResponsiveContext, resolveResponsiveValue } from "@next-ui/responsive";

export type BreadcrumbSize = "sm" | "md" | "lg";
export type BreadcrumbVariant = "solid" | "bordered" | "light";

type ColorKey = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

const sizeClasses: Record<BreadcrumbSize, string> = {
  sm: "text-xs gap-1",
  md: "text-sm gap-1.5",
  lg: "text-base gap-2",
};

const variantClasses: Record<BreadcrumbVariant, string> = {
  solid: "bg-gray-100 dark:bg-gray-800 rounded-md px-3 py-1.5",
  bordered: "border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5",
  light: "bg-transparent",
};

export interface BreadcrumbsProps
  extends BaseComponentProps<HTMLElement>,
    Omit<React.HTMLAttributes<HTMLElement>, keyof BaseComponentProps> {
  separator?: React.ReactNode;
  size?: ResponsiveValue<BreadcrumbSize>;
  color?: ColorKey;
  variant?: BreadcrumbVariant;
  isDisabled?: boolean;
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
  children?: React.ReactNode;
}

function getCollapsedItems(
  children: React.ReactNode,
  maxItems: number,
  itemsBeforeCollapse: number,
  itemsAfterCollapse: number
): React.ReactNode[] {
  const items = React.Children.toArray(children).filter(
    (child): child is React.ReactElement =>
      React.isValidElement(child) && (child.type as { displayName?: string })?.displayName === "BreadcrumbItem"
  );

  if (items.length <= maxItems) return items;

  const before = items.slice(0, itemsBeforeCollapse);
  const after = items.slice(-itemsAfterCollapse);
  const ellipsis = (
    <span key="ellipsis" className="text-gray-500 dark:text-gray-400" aria-hidden>
      …
    </span>
  );

  return [...before, ellipsis, ...after];
}

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      as: Component = "nav",
      className,
      separator = "/",
      size = "md",
      color = "default",
      variant = "light",
      isDisabled = false,
      maxItems,
      itemsBeforeCollapse = 1,
      itemsAfterCollapse = 1,
      children,
      ...props
    },
    ref
  ) => {
    const { deviceType } = useResponsiveContext();
    const resolvedSize = resolveResponsiveValue(size, deviceType) ?? "md";

    const colorClasses = colors[color as ColorKey] ?? colors.default;
    const contentClasses = variant !== "light" ? colorClasses.base : "";

    const items = maxItems
      ? getCollapsedItems(children, maxItems, itemsBeforeCollapse, itemsAfterCollapse)
      : React.Children.toArray(children);

    const flattenedItems: React.ReactNode[] = [];
    items.forEach((child, index) => {
      if (index > 0) {
        flattenedItems.push(
          <span
            key={`sep-${index}`}
            className="text-gray-400 dark:text-gray-500 select-none shrink-0"
            aria-hidden
          >
            {separator}
          </span>
        );
      }
      flattenedItems.push(
        <React.Fragment key={index}>{child}</React.Fragment>
      );
    });

    return (
      <Component
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(
          "inline-flex items-center flex-wrap",
          sizeClasses[resolvedSize],
          variantClasses[variant],
          contentClasses,
          isDisabled && "opacity-50 pointer-events-none",
          className
        )}
        {...props}
      >
        {flattenedItems}
      </Component>
    );
  }
);
Breadcrumbs.displayName = "Breadcrumbs";

export interface BreadcrumbItemProps
  extends BaseComponentProps<HTMLSpanElement>,
    Omit<React.HTMLAttributes<HTMLSpanElement>, keyof BaseComponentProps> {
  isCurrent?: boolean;
  isLast?: boolean;
  children?: React.ReactNode;
}

export const BreadcrumbItem = forwardRef<HTMLSpanElement, BreadcrumbItemProps>(
  (
    {
      as: Component = "span",
      className,
      isCurrent = false,
      isLast = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        aria-current={isCurrent ? "page" : undefined}
        className={cn(
          "inline-flex items-center",
          isCurrent && "font-semibold text-gray-900 dark:text-white",
          !isCurrent && !isLast && "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors",
          isLast && !isCurrent && "text-gray-500 dark:text-gray-500",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";
