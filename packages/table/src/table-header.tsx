import * as React from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses } from "@next-ui/theme";
import type { BaseComponentProps } from "@next-ui/utils";

export interface TableHeaderProps
  extends Omit<BaseComponentProps<HTMLTableSectionElement>, "color">,
    Omit<React.HTMLAttributes<HTMLTableSectionElement>, keyof BaseComponentProps> {
  isSticky?: boolean;
}

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, styleType, isSticky = false, children, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn(
          "bg-gray-50 dark:bg-gray-800/80",
          isSticky && "sticky top-0 z-10 shadow-sm",
          getStyleClasses(styleType),
          className
        )}
        {...props}
      >
        {children}
      </thead>
    );
  }
);

TableHeader.displayName = "TableHeader";
