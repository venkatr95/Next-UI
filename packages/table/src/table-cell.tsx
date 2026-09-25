import * as React from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses } from "@next-ui/theme";
import type { BaseComponentProps } from "@next-ui/utils";

export interface TableCellProps
  extends Omit<BaseComponentProps<HTMLTableCellElement>, "color">,
    Omit<React.TdHTMLAttributes<HTMLTableCellElement>, keyof BaseComponentProps> {
  align?: "left" | "center" | "right";
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, styleType, align = "left", children, ...props }, ref) => {
    const alignClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    return (
      <td
        ref={ref}
        className={cn(
          "px-4 py-2 text-gray-900 dark:text-gray-100",
          "border-b border-gray-100 dark:border-gray-800",
          alignClasses[align],
          getStyleClasses(styleType),
          className
        )}
        {...props}
      >
        {children}
      </td>
    );
  }
);

TableCell.displayName = "TableCell";
