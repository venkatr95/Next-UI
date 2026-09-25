import * as React from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses, getGradientClasses, colors } from "@next-ui/theme";
import { resolveResponsiveValue, useResponsiveContext } from "@next-ui/responsive";
import type { BaseComponentProps, ResponsiveValue } from "@next-ui/utils";

export type CheckboxSize = "sm" | "md" | "lg";

const sizeClasses: Record<CheckboxSize, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "color">,
    BaseComponentProps<HTMLInputElement> {
  isSelected?: boolean;
  defaultSelected?: boolean;
  onChange?: (isSelected: boolean) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  color?: keyof typeof colors;
  size?: ResponsiveValue<CheckboxSize>;
  lineThrough?: boolean;
  icon?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      isSelected,
      defaultSelected = false,
      onChange,
      isDisabled = false,
      isInvalid = false,
      color = "primary",
      size = "md",
      lineThrough = false,
      icon,
      className,
      styleType,
      gradient,
      children,
      id: idProp,
      ...props
    },
    ref
  ) => {
    const { deviceType } = useResponsiveContext();
    const resolvedSize = resolveResponsiveValue(size, deviceType) ?? "md";
    const [uncontrolled, setUncontrolled] = React.useState(defaultSelected);
    const isControlled = isSelected !== undefined;
    const checked = isControlled ? isSelected : uncontrolled;
    const generatedId = React.useId();
    const id = idProp ?? generatedId;

    const colorClasses = colors[color] ?? colors.primary;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.checked;
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    };

    return (
      <label
        htmlFor={id}
        className={cn(
          "inline-flex items-center gap-2 cursor-pointer select-none",
          isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
      >
        <span className="relative inline-flex shrink-0">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            role="checkbox"
            aria-checked={checked}
            aria-disabled={isDisabled}
            aria-invalid={isInvalid}
            checked={checked}
            disabled={isDisabled}
            onChange={handleChange}
            className="sr-only peer"
            {...props}
          />
          <span
            className={cn(
              "inline-flex items-center justify-center rounded border-2 transition-all duration-200",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-indigo-500/50",
              sizeClasses[resolvedSize],
              checked
                ? cn(
                    gradient ? getGradientClasses(gradient) : colorClasses.base,
                    "border-transparent"
                  )
                : "border-gray-300 dark:border-gray-600 bg-transparent",
              isInvalid && "border-red-500 dark:border-red-500",
              getStyleClasses(styleType)
            )}
          >
            {checked && (
              <span className="flex items-center justify-center text-white">
                {icon ?? (
                  <svg
                    className="w-[70%] h-[70%] animate-in zoom-in-50 duration-150"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
            )}
          </span>
        </span>
        {children && (
          <span
            className={cn(
              "text-sm text-gray-700 dark:text-gray-300",
              lineThrough && checked && "line-through opacity-70"
            )}
          >
            {children}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
