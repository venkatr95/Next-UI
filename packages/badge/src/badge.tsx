import React, { forwardRef } from "react";
import { cn, type BaseComponentProps, type ResponsiveValue } from "@next-ui/utils";
import { getStyleClasses, getGradientClasses, colors } from "@next-ui/theme";
import { useResponsiveContext, resolveResponsiveValue } from "@next-ui/responsive";

type BadgeSize = "sm" | "md" | "lg";
type BadgeVariant = "solid" | "flat" | "outline" | "dot";

export interface BadgeProps extends BaseComponentProps<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: ResponsiveValue<BadgeSize>;
  content?: React.ReactNode;
  /** When true, renders as a wrapper around children (e.g. Badge on a button) */
  asChild?: boolean;
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      as: Component = "span",
      className,
      styleType,
      color = "primary",
      gradient,
      deviceType: deviceTypeProp,
      variant = "solid",
      size = "md",
      content,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const { deviceType: autoDevice } = useResponsiveContext();
    const currentDevice =
      deviceTypeProp === "auto" || !deviceTypeProp
        ? autoDevice
        : (deviceTypeProp as "mobile" | "tablet" | "desktop");
    const resolvedSize = resolveResponsiveValue(size, currentDevice) ?? "md";

    const colorClasses = colors[color] ?? colors.primary;
    const variantClasses: Record<BadgeVariant, string> = {
      solid: cn(
        gradient ? getGradientClasses(gradient) + " text-white" : colorClasses.base
      ),
      flat: cn(
        gradient ? getGradientClasses(gradient) + " text-white opacity-90" : colorClasses.base,
        "opacity-80"
      ),
      outline: cn(
        "bg-transparent border-2",
        colorClasses.border,
        "text-current"
      ),
      dot: "bg-transparent gap-1.5 text-current",
    };

    const badgeContent = content ?? children;

    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium rounded-md",
          "transition-all duration-200",
          sizeClasses[resolvedSize],
          variantClasses[variant],
          variant === "dot" && "gap-1.5 pl-1",
          getStyleClasses(styleType),
          className
        )}
        {...props}
      >
        {variant === "dot" && (
          <span
            className={cn("size-2 shrink-0 rounded-full", gradient ? getGradientClasses(gradient) : colorClasses.base.split(" ")[0])}
            aria-hidden
          />
        )}
        {badgeContent}
      </Component>
    );
  }
);
Badge.displayName = "Badge";
