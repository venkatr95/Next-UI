"use client";

import * as React from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses, getGradientClasses } from "@next-ui/theme";
import { resolveResponsiveValue, useResponsiveContext } from "@next-ui/responsive";
import { Input } from "@next-ui/input";
import type { BaseComponentProps, ResponsiveValue } from "@next-ui/utils";

export type TimeInputGranularity = "hour" | "minute" | "second";
export type TimeInputVariant = "flat" | "bordered" | "underlined" | "faded";
export type TimeInputSize = "sm" | "md" | "lg";

function formatTime(value: string, hourCycle: 12 | 24): string {
  if (!value) return "";
  const [h, m, s] = value.split(":").map(Number);
  const hours = h ?? 0;
  const minutes = m ?? 0;
  const seconds = s ?? 0;
  if (hourCycle === 12) {
    const period = hours >= 12 ? "PM" : "AM";
    const h12 = hours % 12 || 12;
    return `${String(h12).padStart(2, "0")}:${String(minutes).padStart(2, "0")}${seconds !== undefined ? `:${String(seconds).padStart(2, "0")}` : ""} ${period}`;
  }
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}${seconds !== undefined ? `:${String(seconds).padStart(2, "0")}` : ""}`;
}

function parseTimeToHHmm(value: string, hourCycle: 12 | 24): string {
  if (!value.trim()) return "";
  if (hourCycle === 24) {
    const match = value.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
    if (!match) return "";
    const h = Math.min(23, Math.max(0, parseInt(match[1], 10)));
    const m = Math.min(59, Math.max(0, parseInt(match[2], 10)));
    const s = match[3] ? Math.min(59, Math.max(0, parseInt(match[3], 10))) : 0;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  const match = value.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/i);
  if (!match) return "";
  let h = parseInt(match[1], 10);
  const m = Math.min(59, Math.max(0, parseInt(match[2], 10)));
  const s = match[3] ? Math.min(59, Math.max(0, parseInt(match[3], 10))) : 0;
  const period = (match[4] || "").toUpperCase();
  if (period === "PM" && h < 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  h = Math.min(23, Math.max(0, h));
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function getPlaceholder(granularity: TimeInputGranularity, hourCycle: 12 | 24): string {
  if (hourCycle === 12) {
    if (granularity === "second") return "HH:MM:SS AM/PM";
    if (granularity === "minute") return "HH:MM AM/PM";
    return "HH AM/PM";
  }
  if (granularity === "second") return "HH:mm:ss";
  if (granularity === "minute") return "HH:mm";
  return "HH:mm";
}

export interface TimeInputProps extends Omit<BaseComponentProps<HTMLInputElement>, "value" | "onChange"> {
  label?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  hourCycle?: 12 | 24;
  granularity?: TimeInputGranularity;
  isDisabled?: boolean;
  variant?: TimeInputVariant;
  size?: ResponsiveValue<TimeInputSize>;
}

export const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(
  (
    {
      label,
      value,
      defaultValue = "",
      onChange,
      hourCycle = 24,
      granularity = "minute",
      isDisabled = false,
      variant = "bordered",
      size = "md",
      className,
      styleType,
      gradient,
      ...props
    },
    ref
  ) => {
    const { deviceType } = useResponsiveContext();
    const resolvedSize = resolveResponsiveValue(size, deviceType) ?? "md";

    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const displayValue = formatTime(currentValue, hourCycle) || currentValue;

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const parsed = parseTimeToHHmm(raw, hourCycle);
        if (!isControlled) setInternalValue(parsed || raw);
        onChange?.(parsed || raw);
      },
      [hourCycle, isControlled, onChange]
    );

    return (
      <Input
        ref={ref}
        label={label}
        type="time"
        value={currentValue}
        onChange={handleChange}
        placeholder={getPlaceholder(granularity, hourCycle)}
        isDisabled={isDisabled}
        variant={variant}
        size={resolvedSize}
        step={granularity === "second" ? 1 : granularity === "minute" ? 60 : 3600}
        className={cn(getStyleClasses(styleType), getGradientClasses(gradient), className)}
        {...props}
      />
    );
  }
);

TimeInput.displayName = "TimeInput";
