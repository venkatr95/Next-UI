"use client";

import * as React from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses, getGradientClasses } from "@next-ui/theme";
import { resolveResponsiveValue, useResponsiveContext } from "@next-ui/responsive";
import { Input } from "@next-ui/input";
import type { BaseComponentProps, ResponsiveValue } from "@next-ui/utils";

export type DateInputGranularity = "day" | "month" | "year";
export type DateInputVariant = "flat" | "bordered" | "underlined" | "faded";
export type DateInputSize = "sm" | "md" | "lg";

function formatDateForInput(date: Date | null | undefined, granularity: DateInputGranularity): string {
  if (!date) return "";
  if (granularity === "year") return String(date.getFullYear());
  if (granularity === "month") {
    const m = String(date.getMonth() + 1).padStart(2, "0");
    return `${date.getFullYear()}-${m}`;
  }
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDateFromInput(value: string, granularity: DateInputGranularity): Date | null {
  if (!value.trim()) return null;
  if (granularity === "year") {
    const y = parseInt(value, 10);
    if (isNaN(y)) return null;
    return new Date(y, 0, 1);
  }
  if (granularity === "month") {
    const match = value.match(/^(\d{4})-(\d{2})$/);
    if (!match) return null;
    const y = parseInt(match[1], 10);
    const m = parseInt(match[2], 10) - 1;
    if (m < 0 || m > 11) return null;
    return new Date(y, m, 1);
  }
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const y = parseInt(match[1], 10);
  const m = parseInt(match[2], 10) - 1;
  const d = parseInt(match[3], 10);
  const date = new Date(y, m, d);
  if (date.getFullYear() !== y || date.getMonth() !== m || date.getDate() !== d) return null;
  return date;
}

function getInputType(granularity: DateInputGranularity): string {
  if (granularity === "year") return "number";
  if (granularity === "month") return "month";
  return "date";
}

function getPlaceholder(granularity: DateInputGranularity): string {
  if (granularity === "year") return "YYYY";
  if (granularity === "month") return "YYYY-MM";
  return "YYYY-MM-DD";
}

export interface DateInputProps extends Omit<BaseComponentProps<HTMLInputElement>, "value" | "onChange"> {
  label?: React.ReactNode;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  granularity?: DateInputGranularity;
  isDisabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: React.ReactNode;
  variant?: DateInputVariant;
  size?: ResponsiveValue<DateInputSize>;
  minValue?: Date;
  maxValue?: Date;
  readOnly?: boolean;
}

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      label,
      value,
      defaultValue,
      onChange,
      granularity = "day",
      isDisabled = false,
      isInvalid = false,
      errorMessage,
      variant = "bordered",
      size = "md",
      minValue,
      maxValue,
      className,
      styleType,
      gradient,
      ...props
    },
    ref
  ) => {
    const { deviceType } = useResponsiveContext();
    const resolvedSize = resolveResponsiveValue(size, deviceType) ?? "md";

    const [internalValue, setInternalValue] = React.useState<Date | null>(defaultValue ?? null);
    const isControlled = value !== undefined;
    const selected = isControlled ? value : internalValue;

    const displayValue = formatDateForInput(selected, granularity);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const date = parseDateFromInput(raw, granularity);
        if (!isControlled) setInternalValue(date);
        onChange?.(date);
      },
      [granularity, isControlled, onChange]
    );

    const minStr = minValue ? formatDateForInput(minValue, granularity) : undefined;
    const maxStr = maxValue ? formatDateForInput(maxValue, granularity) : undefined;

    return (
      <Input
        ref={ref}
        label={label}
        type={getInputType(granularity)}
        value={displayValue}
        onChange={handleChange}
        placeholder={getPlaceholder(granularity)}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        variant={variant}
        size={resolvedSize}
        min={minStr}
        max={maxStr}
        className={cn(getStyleClasses(styleType), getGradientClasses(gradient), className)}
        {...props}
      />
    );
  }
);

DateInput.displayName = "DateInput";
