import * as React from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses } from "@next-ui/theme";
import type { BaseComponentProps } from "@next-ui/utils";

export interface TableRowProps
  extends Omit<BaseComponentProps<HTMLTableRowElement>, "color">,
    Omit<React.HTMLAttributes<HTMLTableRowElement>, keyof BaseComponentProps> {
  isSelected?: boolean;
  isStriped?: boolean;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, styleType, isSelected = false, isStriped = false, children, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          "transition-colors duration-150",
          isSelected && "bg-indigo-50 dark:bg-indigo-900/20",
          isStriped && "even:bg-gray-50/50 dark:even:bg-gray-800/30",
          "hover:bg-gray-50 dark:hover:bg-gray-800/50",
          getStyleClasses(styleType),
          className
        )}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = "TableRow";
