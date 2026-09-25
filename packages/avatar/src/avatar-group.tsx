import React from "react";
import { cn } from "@next-ui/utils";
import type { AvatarProps } from "./avatar";

export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: AvatarProps["size"];
  className?: string;
}

const overlapOffset = "-ml-2";

export function AvatarGroup({
  children,
  max,
  size,
  className,
}: AvatarGroupProps) {
  const childArray = React.Children.toArray(children);
  const total = childArray.length;
  const displayCount = max !== undefined ? Math.min(max, total) : total;
  const overflowCount = max !== undefined ? total - max : 0;
  const displayChildren = childArray.slice(0, displayCount);

  return (
    <div
      className={cn(
        "inline-flex items-center",
        overlapOffset,
        className
      )}
    >
      {displayChildren.map((child, index) => (
        <div
          key={index}
          className={cn(
            "ring-2 ring-white dark:ring-gray-900 rounded-full first:ml-0",
            index > 0 && "ml-[-0.5rem]"
          )}
        >
          {React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<AvatarProps>, {
                size: size ?? (child as React.ReactElement<AvatarProps>).props.size,
                bordered: false,
              })
            : child}
        </div>
      ))}
      {overflowCount > 0 && (
        <div
          className={cn(
            "inline-flex items-center justify-center shrink-0 font-medium",
            "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
            "ring-2 ring-white dark:ring-gray-900 rounded-full",
            "ml-[-0.5rem]",
            size === "sm" && "w-8 h-8 text-xs",
            size === "md" && "w-10 h-10 text-sm",
            size === "lg" && "w-12 h-12 text-base",
            size === "xl" && "w-16 h-16 text-lg",
            !size && "w-10 h-10 text-sm"
          )}
        >
          +{overflowCount}
        </div>
      )}
    </div>
  );
}
AvatarGroup.displayName = "AvatarGroup";
