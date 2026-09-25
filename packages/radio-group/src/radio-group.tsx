import * as React from "react";
import { createContext } from "@next-ui/utils";
import { cn } from "@next-ui/utils";
import { colors } from "@next-ui/theme";
import { resolveResponsiveValue, useResponsiveContext } from "@next-ui/responsive";
import type { BaseComponentProps, ResponsiveValue } from "@next-ui/utils";

export type RadioGroupOrientation = "horizontal" | "vertical";

type RadioSize = "sm" | "md" | "lg";
const sizeClasses: Record<RadioSize, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

interface RadioGroupContextValue {
  value: string | undefined;
  onChange: (value: string) => void;
  name: string;
  isDisabled?: boolean;
  size?: ResponsiveValue<RadioSize>;
  color?: keyof typeof colors;
}

const [RadioGroupProvider, useRadioGroup] = createContext<RadioGroupContextValue>("RadioGroupContext");

export interface RadioGroupProps extends BaseComponentProps<HTMLDivElement> {
  label?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: RadioGroupOrientation;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  isDisabled?: boolean;
  id?: string;
  children?: React.ReactNode;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      label,
      value,
      defaultValue,
      onChange,
      orientation = "vertical",
      description,
      errorMessage,
      isDisabled = false,
      className,
      id: idProp,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState<string | undefined>(defaultValue);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : uncontrolled;
    const generatedId = React.useId();
    const id = idProp ?? generatedId;
    const name = `radio-${id}`;
    const groupId = `${id}-group`;
    const errorId = `${id}-error`;
    const descriptionId = `${id}-description`;

    const handleChange = React.useCallback(
      (next: string) => {
        if (!isControlled) setUncontrolled(next);
        onChange?.(next);
      },
      [isControlled, onChange]
    );

    const contextValue: RadioGroupContextValue = {
      value: currentValue,
      onChange: handleChange,
      name,
      isDisabled,
    };

    return (
      <RadioGroupProvider value={contextValue}>
        <div
          ref={ref}
          role="radiogroup"
          aria-labelledby={label ? groupId : undefined}
          aria-describedby={
            [errorMessage && errorId, description && descriptionId].filter(Boolean).join(" ") || undefined
          }
          aria-invalid={!!errorMessage}
          aria-disabled={isDisabled}
          className={cn("flex flex-col gap-1", className)}
          {...props}
        >
          {label && (
            <span
              id={groupId}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {label}
            </span>
          )}
          <div
            className={cn(
              "flex gap-3",
              orientation === "vertical" && "flex-col",
              orientation === "horizontal" && "flex-row flex-wrap"
            )}
          >
            {children}
          </div>
          {description && !errorMessage && (
            <p id={descriptionId} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
          {errorMessage && (
            <p id={errorId} className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errorMessage}
            </p>
          )}
        </div>
      </RadioGroupProvider>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export interface RadioProps extends BaseComponentProps<HTMLInputElement> {
  value: string;
  description?: React.ReactNode;
  isDisabled?: boolean;
  size?: ResponsiveValue<RadioSize>;
  color?: keyof typeof colors;
  id?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      description,
      isDisabled = false,
      size = "md",
      color = "primary",
      className,
      children,
      id: idProp,
      ...props
    },
    ref
  ) => {
    const { value: selectedValue, onChange, name, isDisabled: groupDisabled } = useRadioGroup();
    const { deviceType } = useResponsiveContext();
    const resolvedSize = resolveResponsiveValue(size, deviceType) ?? "md";
    const disabled = isDisabled || groupDisabled;
    const checked = selectedValue === value;
    const generatedId = React.useId();
    const id = idProp ?? `${name}-${value}`;

    const colorClasses = colors[color] ?? colors.primary;

    return (
      <label
        htmlFor={id}
        className={cn(
          "inline-flex items-start gap-2 cursor-pointer select-none",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
      >
        <span className="relative inline-flex shrink-0 mt-0.5">
          <input
            ref={ref}
            id={id}
            type="radio"
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={() => onChange(value)}
            aria-checked={checked}
            aria-disabled={disabled}
            className="sr-only peer"
            {...props}
          />
          <span
            className={cn(
              "inline-flex items-center justify-center rounded-full border-2 transition-all duration-200",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-indigo-500/50",
              sizeClasses[resolvedSize],
              checked
                ? cn(colorClasses.base, "border-transparent")
                : "border-gray-300 dark:border-gray-600 bg-transparent"
            )}
          >
            {checked && (
              <span
                className={cn(
                  "rounded-full bg-current",
                  resolvedSize === "sm" && "w-2 h-2",
                  resolvedSize === "md" && "w-2.5 h-2.5",
                  resolvedSize === "lg" && "w-3 h-3"
                )}
              />
            )}
          </span>
        </span>
        <span className="flex flex-col gap-0.5">
          {children && <span className="text-sm text-gray-700 dark:text-gray-300">{children}</span>}
          {description && (
            <span className="text-xs text-gray-500 dark:text-gray-400">{description}</span>
          )}
        </span>
      </label>
    );
  }
);

Radio.displayName = "Radio";
