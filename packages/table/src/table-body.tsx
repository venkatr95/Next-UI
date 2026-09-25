import * as React from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses } from "@next-ui/theme";
import type { BaseComponentProps } from "@next-ui/utils";

export interface TableBodyProps
  extends Omit<BaseComponentProps<HTMLTableSectionElement>, "color">,
    Omit<React.HTMLAttributes<HTMLTableSectionElement>, keyof BaseComponentProps> {}

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, styleType, children, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn(getStyleClasses(styleType), className)}
        {...props}
      >
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = "TableBody";
