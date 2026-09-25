import * as React from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses, getGradientClasses, colors } from "@next-ui/theme";
import { resolveResponsiveValue, useResponsiveContext } from "@next-ui/responsive";
import type { BaseComponentProps, ResponsiveValue } from "@next-ui/utils";

export type SwitchSize = "sm" | "md" | "lg";

const sizeClasses: Record<SwitchSize, { track: string; thumb: string }> = {
  sm: { track: "w-8 h-4", thumb: "w-3 h-3 translate-x-0.5" },
  md: { track: "w-11 h-6", thumb: "w-4 h-4 translate-x-0.5" },
  lg: { track: "w-14 h-7", thumb: "w-5 h-5 translate-x-1" },
};

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "color">,
    BaseComponentProps<HTMLButtonElement> {
  isSelected?: boolean;
  defaultSelected?: boolean;
  onChange?: (isSelected: boolean) => void;
  size?: ResponsiveValue<SwitchSize>;
  color?: keyof typeof colors;
  isDisabled?: boolean;
  thumbIcon?: React.ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      isSelected,
      defaultSelected = false,
      onChange,
      size = "md",
      color = "primary",
      isDisabled = false,
      thumbIcon,
      startContent,
      endContent,
      className,
      styleType,
      gradient,
      children,
      ...props
    },
    ref
  ) => {
    const { deviceType } = useResponsiveContext();
    const resolvedSize = resolveResponsiveValue(size, deviceType) ?? "md";
    const [uncontrolled, setUncontrolled] = React.useState(defaultSelected);
    const isControlled = isSelected !== undefined;
    const selected = isControlled ? isSelected : uncontrolled;

    const colorClasses = colors[color] ?? colors.primary;

    const handleClick = () => {
      if (isDisabled) return;
      const next = !selected;
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    };

    const trackClasses = cn(
      "relative inline-flex shrink-0 rounded-full transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500/50",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      sizeClasses[resolvedSize].track,
      selected
        ? cn(
            gradient ? getGradientClasses(gradient) : colorClasses.base,
            "border-transparent"
          )
        : "bg-gray-200 dark:bg-gray-700",
      getStyleClasses(styleType)
    );

    const thumbClasses = cn(
      "absolute top-0.5 left-0 inline-flex items-center justify-center rounded-full bg-white dark:bg-gray-100 shadow-sm transition-transform duration-200 ease-in-out",
      sizeClasses[resolvedSize].thumb,
      selected && (resolvedSize === "sm" ? "translate-x-4" : resolvedSize === "md" ? "translate-x-5" : "translate-x-7")
    );

    return (
      <label
        className={cn(
          "inline-flex items-center gap-2 cursor-pointer select-none",
          isDisabled && "opacity-50 cursor-not-allowed pointer-events-none"
        )}
      >
        {startContent && (
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {startContent}
          </span>
        )}
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={selected}
          aria-disabled={isDisabled}
          disabled={isDisabled}
          onClick={handleClick}
          className={cn(trackClasses, className)}
          {...props}
        >
          <span className={thumbClasses}>
            {selected && thumbIcon}
          </span>
        </button>
        {(endContent || children) && (
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {endContent ?? children}
          </span>
        )}
      </label>
    );
  }
);

Switch.displayName = "Switch";
