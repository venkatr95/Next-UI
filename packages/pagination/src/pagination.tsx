import React, { useMemo, useCallback } from "react";
import { cn } from "@next-ui/utils";
import { colors } from "@next-ui/theme";
import type { BaseComponentProps } from "@next-ui/utils";

type PaginationVariant = "flat" | "bordered" | "light" | "faded";
type PaginationSize = "sm" | "md" | "lg";

const sizeClasses: Record<PaginationSize, string> = {
  sm: "min-w-8 h-8 text-sm",
  md: "min-w-10 h-10 text-sm",
  lg: "min-w-12 h-12 text-base",
};

const variantClasses: Record<PaginationVariant, string> = {
  flat: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
  bordered:
    "bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800",
  light: "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
  faded:
    "bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800",
};

export interface PaginationProps
  extends Omit<BaseComponentProps<HTMLDivElement>, "color">,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps | "onChange"> {
  total: number;
  page?: number;
  initialPage?: number;
  onChange?: (page: number) => void;
  siblings?: number;
  boundaries?: number;
  showControls?: boolean;
  isCompact?: boolean;
  isDisabled?: boolean;
  color?: keyof typeof colors;
  variant?: PaginationVariant;
  size?: PaginationSize;
  loop?: boolean;
}

function range(start: number, end: number): number[] {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

export function Pagination({
  as: Component = "div",
  className,
  total,
  page: controlledPage,
  initialPage = 1,
  onChange,
  siblings = 1,
  boundaries = 1,
  showControls = true,
  isCompact = false,
  isDisabled = false,
  color = "primary",
  variant = "flat",
  size = "md",
  loop = false,
  ...props
}: PaginationProps) {
  const [internalPage, setInternalPage] = React.useState(initialPage);
  const isControlled = controlledPage !== undefined;
  const page = isControlled ? controlledPage : internalPage;

  const setPage = useCallback(
    (p: number) => {
      if (!isControlled) setInternalPage(p);
      onChange?.(p);
    },
    [isControlled, onChange]
  );

  const { items, dotsBefore, dotsAfter } = useMemo(() => {
    const totalPages = Math.max(1, total);
    const currentPage = Math.min(Math.max(1, page), totalPages);

    const leftSiblingIndex = Math.max(currentPage - siblings, 1);
    const rightSiblingIndex = Math.min(currentPage + siblings, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > boundaries + 1;
    const shouldShowRightDots = rightSiblingIndex < totalPages - boundaries;

    const dotsBefore = shouldShowLeftDots;
    const dotsAfter = shouldShowRightDots;

    let leftRange = range(1, Math.min(boundaries, leftSiblingIndex - 1));
    let middleRange = range(leftSiblingIndex, rightSiblingIndex);
    let rightRange = range(
      Math.max(rightSiblingIndex + 1, totalPages - boundaries + 1),
      totalPages
    );

    if (dotsBefore && !dotsAfter) {
      const extraLeft = totalPages - boundaries - siblings - boundaries - 1;
      leftRange = range(1, leftSiblingIndex);
      middleRange = range(
        Math.max(leftSiblingIndex, totalPages - boundaries - siblings * 2 - 1),
        totalPages - boundaries
      );
      rightRange = range(totalPages - boundaries + 1, totalPages);
    } else if (!dotsBefore && dotsAfter) {
      leftRange = range(1, boundaries);
      middleRange = range(
        boundaries + 1,
        Math.min(boundaries + siblings * 2 + 1, rightSiblingIndex)
      );
      rightRange = range(rightSiblingIndex + 1, totalPages);
    } else if (dotsBefore && dotsAfter) {
      leftRange = range(1, boundaries);
      middleRange = range(leftSiblingIndex, rightSiblingIndex);
      rightRange = range(totalPages - boundaries + 1, totalPages);
    }

    const allItems = [...new Set([...leftRange, ...middleRange, ...rightRange])].sort(
      (a, b) => a - b
    );

    const items: (number | "dots")[] = [];
    let prev = 0;
    for (const item of allItems) {
      if (prev !== 0 && item - prev > 1) {
        items.push("dots");
      }
      items.push(item);
      prev = item;
    }

    return { items, dotsBefore, dotsAfter };
  }, [total, page, siblings, boundaries]);

  const totalPages = Math.max(1, total);
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const colorClasses = colors[color] ?? colors.primary;

  const goToPrev = () => {
    if (currentPage <= 1) {
      if (loop) setPage(totalPages);
    } else {
      setPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage >= totalPages) {
      if (loop) setPage(1);
    } else {
      setPage(currentPage + 1);
    }
  };

  const baseButtonClasses = cn(
    "inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-current",
    "disabled:opacity-50 disabled:pointer-events-none",
    sizeClasses[size],
    variantClasses[variant]
  );

  const activeButtonClasses = cn(
    baseButtonClasses,
    colorClasses.base,
    "text-white"
  );

  return (
    <Component
      className={cn(
        "flex items-center gap-1",
        isCompact && "gap-0.5",
        className
      )}
      role="navigation"
      aria-label="pagination"
      {...props}
    >
      {showControls && (
        <>
          <button
            type="button"
            aria-label="Previous page"
            disabled={isDisabled || (!loop && currentPage <= 1)}
            onClick={goToPrev}
            className={cn(baseButtonClasses, "px-2")}
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {!isCompact && <span className="w-1" />}
        </>
      )}

      <div className="flex items-center gap-1">
        {items.map((item, idx) =>
          item === "dots" ? (
            <span
              key={`dots-${idx}`}
              className={cn(
                "inline-flex items-center justify-center text-gray-400",
                sizeClasses[size]
              )}
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-label={`Page ${item}`}
              aria-current={item === currentPage}
              disabled={isDisabled}
              onClick={() => setPage(item)}
              className={cn(
                item === currentPage ? activeButtonClasses : baseButtonClasses
              )}
            >
              {item}
            </button>
          )
        )}
      </div>

      {showControls && (
        <>
          {!isCompact && <span className="w-1" />}
          <button
            type="button"
            aria-label="Next page"
            disabled={isDisabled || (!loop && currentPage >= totalPages)}
            onClick={goToNext}
            className={cn(baseButtonClasses, "px-2")}
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}
    </Component>
  );
}
