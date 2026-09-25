import React, { forwardRef } from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses, getGradientClasses } from "@next-ui/theme";
import type { BaseComponentProps, ResponsiveValue } from "@next-ui/utils";
import { useResponsiveContext, resolveResponsiveValue } from "@next-ui/responsive";

export type CardShadow = "sm" | "md" | "lg" | "none";
export type CardRadius = "sm" | "md" | "lg" | "none";

const shadowMap: Record<CardShadow, string> = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  none: "",
};

const radiusMap: Record<CardRadius, string> = {
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  none: "rounded-none",
};

export interface CardProps
  extends BaseComponentProps<HTMLDivElement>,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {
  isPressable?: boolean;
  isHoverable?: boolean;
  shadow?: ResponsiveValue<CardShadow>;
  radius?: ResponsiveValue<CardRadius>;
  fullWidth?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      as: Component = "div",
      className,
      styleType,
      gradient,
      isPressable = false,
      isHoverable = true,
      shadow = "md",
      radius = "lg",
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    const { deviceType } = useResponsiveContext();
    const resolvedShadow = resolveResponsiveValue(shadow, deviceType) ?? "md";
    const resolvedRadius = resolveResponsiveValue(radius, deviceType) ?? "lg";

    const baseClasses = cn(
      "overflow-hidden transition-all duration-300 ease-out",
      shadowMap[resolvedShadow],
      radiusMap[resolvedRadius],
      fullWidth && "w-full",
      isHoverable && "hover:shadow-lg hover:-translate-y-0.5",
      isPressable && "cursor-pointer active:scale-[0.98]"
    );

    const resolvedClasses = cn(
      baseClasses,
      getStyleClasses(styleType),
      getGradientClasses(gradient),
      !styleType && !gradient && "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
      className
    );

    return (
      <Component ref={ref} className={resolvedClasses} {...props}>
        {children}
      </Component>
    );
  }
);

Card.displayName = "Card";

export interface CardHeaderProps
  extends BaseComponentProps<HTMLDivElement>,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ as: Component = "div", className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("px-6 py-4 border-b border-gray-200 dark:border-gray-700", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardHeader.displayName = "CardHeader";

export interface CardBodyProps
  extends BaseComponentProps<HTMLDivElement>,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ as: Component = "div", className, children, ...props }, ref) => {
    return (
      <Component ref={ref} className={cn("px-6 py-5", className)} {...props}>
        {children}
      </Component>
    );
  }
);

CardBody.displayName = "CardBody";

export interface CardFooterProps
  extends BaseComponentProps<HTMLDivElement>,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ as: Component = "div", className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("px-6 py-4 border-t border-gray-200 dark:border-gray-700", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardFooter.displayName = "CardFooter";
