import * as React from "react";
import { cn } from "@next-ui/utils";

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: DividerOrientation;
  className?: string;
}

const horizontalClasses = "w-full border-t border-gray-200 dark:border-gray-700 my-2";
const verticalClasses = "h-full w-px border-l border-gray-200 dark:border-gray-700 mx-2 self-stretch";

export const Divider = React.forwardRef<HTMLElement, DividerProps>(
  ({ orientation = "horizontal", className, ...props }, ref) => {
    const baseClasses =
      orientation === "horizontal" ? horizontalClasses : verticalClasses;

    if (orientation === "vertical") {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          role="separator"
          aria-orientation="vertical"
          className={cn(baseClasses, className)}
          {...(props as React.HTMLAttributes<HTMLDivElement>)}
        />
      );
    }

    return (
      <hr
        ref={ref as React.Ref<HTMLHRElement>}
        role="separator"
        aria-orientation="horizontal"
        className={cn(baseClasses, "border-0", className)}
        {...(props as React.HTMLAttributes<HTMLHRElement>)}
      />
    );
  }
);

Divider.displayName = "Divider";
