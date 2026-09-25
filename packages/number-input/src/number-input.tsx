import * as React from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses } from "@next-ui/theme";
import { resolveResponsiveValue, useResponsiveContext } from "@next-ui/responsive";
import type { BaseComponentProps, ResponsiveValue } from "@next-ui/utils";

export type NumberInputSize = "sm" | "md" | "lg";
export type NumberInputVariant = "flat" | "bordered" | "underlined" | "faded";

const sizeClasses: Record<NumberInputSize, string> = {
  sm: "h-8 text-sm",
  md: "h-10 text-base",
  lg: "h-12 text-lg",
};

const variantClasses: Record<NumberInputVariant, string> = {
  flat: "bg-gray-100 dark:bg-gray-800 border-0",
  bordered: "bg-transparent border-2 border-gray-300 dark:border-gray-600",
  underlined:
    "bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 rounded-none",
  faded: "bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700",
};

export interface FormatOptions {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
}

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange" | "color">,
    BaseComponentProps<HTMLInputElement> {
  label?: React.ReactNode;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  formatOptions?: FormatOptions;
  isDisabled?: boolean;
  size?: ResponsiveValue<NumberInputSize>;
  variant?: NumberInputVariant;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      label,
      value,
      defaultValue,
      onChange,
      min,
      max,
      step = 1,
      formatOptions,
      isDisabled = false,
      size = "md",
      variant = "bordered",
      className,
      styleType,
      id: idProp,
      ...props
    },
    ref
  ) => {
    const { deviceType } = useResponsiveContext();
    const resolvedSize = resolveResponsiveValue(size, deviceType) ?? "md";
    const [uncontrolled, setUncontrolled] = React.useState<number | undefined>(defaultValue);
    const isControlled = value !== undefined;
    const numValue = isControlled ? value : uncontrolled;
    const generatedId = React.useId();
    const id = idProp ?? generatedId;

    const clamp = (n: number) => {
      let v = n;
      if (min !== undefined) v = Math.max(min, v);
      if (max !== undefined) v = Math.min(max, v);
      return v;
    };

    const updateValue = (next: number) => {
      const clamped = clamp(next);
      if (!isControlled) setUncontrolled(clamped);
      onChange?.(clamped);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      if (raw === "" || raw === "-") {
        if (!isControlled) setUncontrolled(undefined as unknown as number);
        onChange?.(min ?? 0);
        return;
      }
      const parsed = parseFloat(raw);
      if (!Number.isNaN(parsed)) updateValue(parsed);
    };

    const handleIncrement = () => {
      const current = numValue ?? min ?? 0;
      updateValue(current + step);
    };

    const handleDecrement = () => {
      const current = numValue ?? max ?? 0;
      updateValue(current - step);
    };

    const displayValue =
      numValue !== undefined && numValue !== null ? String(numValue) : "";

    const inputClasses = cn(
      "w-full rounded-lg outline-none transition-all duration-200 text-center tabular-nums",
      "focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-0 dark:focus:ring-indigo-400/50",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      sizeClasses[resolvedSize],
      variantClasses[variant],
      getStyleClasses(styleType),
      className
    );

    const buttonClasses = cn(
      "flex items-center justify-center shrink-0 transition-colors duration-200",
      "hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
      resolvedSize === "sm" && "w-8",
      resolvedSize === "md" && "w-10",
      resolvedSize === "lg" && "w-12"
    );

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
          </label>
        )}
        <div className="inline-flex items-stretch rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600 bg-transparent focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500">
          <button
            type="button"
            aria-label="Decrement"
            disabled={isDisabled || (min !== undefined && (numValue ?? min) <= min)}
            onClick={handleDecrement}
            className={cn(buttonClasses, "rounded-l-md border-r border-gray-300 dark:border-gray-600")}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <input
            ref={ref}
            id={id}
            type="text"
            inputMode="decimal"
            role="spinbutton"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={numValue}
            aria-valuetext={displayValue}
            disabled={isDisabled}
            value={displayValue}
            onChange={handleChange}
            className={inputClasses}
            {...props}
          />
          <button
            type="button"
            aria-label="Increment"
            disabled={isDisabled || (max !== undefined && (numValue ?? max) >= max)}
            onClick={handleIncrement}
            className={cn(buttonClasses, "rounded-r-md border-l border-gray-300 dark:border-gray-600")}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";
