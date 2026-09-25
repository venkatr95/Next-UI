import React, { forwardRef, useState } from "react";
import { cn, type BaseComponentProps, type ResponsiveValue } from "@next-ui/utils";
import { getStyleClasses, colors } from "@next-ui/theme";
import { useResponsiveContext, resolveResponsiveValue } from "@next-ui/responsive";

type AvatarSize = "sm" | "md" | "lg" | "xl";
type AvatarRadius = "full" | "lg" | "md" | "sm" | "none";

export interface AvatarProps extends BaseComponentProps<HTMLSpanElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: ResponsiveValue<AvatarSize>;
  bordered?: boolean;
  radius?: AvatarRadius;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
};

const radiusClasses: Record<AvatarRadius, string> = {
  full: "rounded-full",
  lg: "rounded-xl",
  md: "rounded-lg",
  sm: "rounded-md",
  none: "rounded-none",
};

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      as: Component = "span",
      className,
      styleType,
      color = "default",
      deviceType: deviceTypeProp,
      src,
      alt = "",
      fallback,
      size = "md",
      bordered = false,
      radius = "full",
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

    const [imgError, setImgError] = useState(false);
    const showImage = src && !imgError;
    const colorClasses = colors[color] ?? colors.default;
    const initials = fallback ? getInitials(fallback) : null;

    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center overflow-hidden shrink-0 font-medium",
          "bg-gray-200 dark:bg-gray-700",
          sizeClasses[resolvedSize],
          radiusClasses[radius],
          bordered && "ring-2 ring-white dark:ring-gray-800 ring-offset-2 dark:ring-offset-gray-900",
          getStyleClasses(styleType),
          className
        )}
        {...props}
      >
        {showImage ? (
          <img
            src={src!}
            alt={alt}
            className={cn("w-full h-full object-cover", radiusClasses[radius])}
            onError={() => setImgError(true)}
          />
        ) : initials ? (
          <span className={cn("font-semibold", colorClasses.base)}>{initials}</span>
        ) : (
          children
        )}
      </Component>
    );
  }
);
Avatar.displayName = "Avatar";
