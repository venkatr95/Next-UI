import * as React from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses } from "@next-ui/theme";
import type { BaseComponentProps } from "@next-ui/utils";
import type { SortDirection } from "./types";

export interface TableColumnProps
  extends Omit<BaseComponentProps<HTMLTableCellElement>, "color">,
    Omit<React.ThHTMLAttributes<HTMLTableCellElement>, keyof BaseComponentProps> {
  sortable?: boolean;
  sortDirection?: SortDirection;
  onSort?: () => void;
  align?: "left" | "center" | "right";
  width?: string | number;
}

export const TableColumn = React.forwardRef<HTMLTableCellElement, TableColumnProps>(
  (
    {
      className,
      styleType,
      sortable = false,
      sortDirection,
      onSort,
      align = "left",
      width,
      children,
      ...props
    },
    ref
  ) => {
    const alignClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    return (
      <th
        ref={ref}
        className={cn(
          "px-4 py-3 font-semibold text-gray-700 dark:text-gray-200",
          "border-b border-gray-200 dark:border-gray-700",
          alignClasses[align],
          sortable && "cursor-pointer select-none hover:bg-gray-50 dark:hover:bg-gray-800/50",
          getStyleClasses(styleType),
          className
        )}
        style={width !== undefined ? { width: typeof width === "number" ? `${width}px` : width } : undefined}
        onClick={sortable ? onSort : undefined}
        scope="col"
        {...props}
      >
        <div className={cn("inline-flex items-center gap-1", alignClasses[align])}>
          {children}
          {sortable && (
            <span className="inline-flex flex-col text-gray-400" aria-hidden>
              <svg
                className={cn(
                  "w-3 h-3",
                  sortDirection === "ascending" && "text-indigo-500 dark:text-indigo-400"
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5 10l5-5 5 5H5z" />
              </svg>
              <svg
                className={cn(
                  "w-3 h-3 -mt-1",
                  sortDirection === "descending" && "text-indigo-500 dark:text-indigo-400"
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M15 10l-5 5-5-5h10z" />
              </svg>
            </span>
          )}
        </div>
      </th>
    );
  }
);

TableColumn.displayName = "TableColumn";
