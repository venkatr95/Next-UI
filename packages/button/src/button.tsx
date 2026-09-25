import React, { forwardRef } from "react";
import { cn, type BaseComponentProps, type ResponsiveValue } from "@next-ui/utils";
import { getStyleClasses, getGradientClasses, colors } from "@next-ui/theme";
import { useResponsiveContext, resolveResponsiveValue } from "@next-ui/responsive";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "solid" | "outline" | "ghost";

export interface ButtonProps extends BaseComponentProps<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ResponsiveValue<ButtonSize>;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      as: Component = "button",
      className,
      styleType,
      variant = "solid",
      color = "primary",
      gradient,
      deviceType: deviceTypeProp,
      size = "md",
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    const { deviceType: autoDevice } = useResponsiveContext();
    const currentDevice = deviceTypeProp === "auto" || !deviceTypeProp ? autoDevice : deviceTypeProp as "mobile" | "tablet" | "desktop";
    const resolvedSize = resolveResponsiveValue(size, currentDevice) ?? "md";

    const colorClasses = colors[color] ?? colors.primary;
    const variantClasses = {
      solid: cn(gradient ? getGradientClasses(gradient) + " text-white" : colorClasses.base, colorClasses.hover, colorClasses.active),
      outline: cn("bg-transparent border-2", colorClasses.border, `text-current`, colorClasses.hover, "hover:text-white"),
      ghost: cn("bg-transparent", `text-current`, "hover:bg-gray-100 dark:hover:bg-gray-800"),
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          sizeClasses[resolvedSize],
          variantClasses[variant],
          getStyleClasses(styleType),
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {!loading && leftIcon}
        {children}
        {!loading && rightIcon}
      </Component>
    );
  }
);
Button.displayName = "Button";
