import React, { forwardRef } from "react";
import { cn } from "@next-ui/utils";

type SkeletonVariant = "text" | "circular" | "rectangular";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  isLoaded?: boolean;
  variant?: SkeletonVariant;
  className?: string;
  children?: React.ReactNode;
}

const variantClasses: Record<SkeletonVariant, string> = {
  text: "rounded",
  circular: "rounded-full",
  rectangular: "rounded-md",
};

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      width,
      height,
      isLoaded = false,
      variant = "rectangular",
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const dimensionStyle: React.CSSProperties = {
      ...(width !== undefined && {
        width: typeof width === "number" ? `${width}px` : width,
      }),
      ...(height !== undefined && {
        height: typeof height === "number" ? `${height}px` : height,
      }),
      ...style,
    };

    if (isLoaded && children !== undefined) {
      return (
        <div ref={ref} className={cn(className)} {...props}>
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn(
          "animate-pulse bg-gray-200 dark:bg-gray-700",
          variantClasses[variant],
          className
        )}
        style={dimensionStyle}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";
