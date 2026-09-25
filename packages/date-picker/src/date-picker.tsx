"use client";

import * as React from "react";
import { cn } from "@next-ui/utils";
import { DateInput } from "@next-ui/date-input";
import { Calendar } from "@next-ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@next-ui/popover";
import { resolveResponsiveValue, useResponsiveContext } from "@next-ui/responsive";
import type { BaseComponentProps, ResponsiveValue } from "@next-ui/utils";

export type DatePickerGranularity = "day" | "month" | "year";
export type DateInputVariant = "flat" | "bordered" | "underlined" | "faded";
export type DateInputSize = "sm" | "md" | "lg";

export interface DatePickerProps extends BaseComponentProps<HTMLDivElement> {
  label?: React.ReactNode;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  isDisabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: React.ReactNode;
  variant?: DateInputVariant;
  size?: ResponsiveValue<DateInputSize>;
  granularity?: DatePickerGranularity;
}

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      label,
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      isDisabled = false,
      isInvalid = false,
      errorMessage,
      variant = "bordered",
      size = "md",
      granularity = "day",
      className,
      ...props
    },
    ref
  ) => {
    const { deviceType } = useResponsiveContext();
    const resolvedSize = resolveResponsiveValue(size, deviceType) ?? "md";
    const [isOpen, setIsOpen] = React.useState(false);

    const handleDateChange = React.useCallback(
      (date: Date | null) => {
        onChange?.(date);
        if (date) setIsOpen(false);
      },
      [onChange]
    );

    return (
      <Popover isOpen={isOpen} onOpenChange={setIsOpen} triggerType="press">
        <div ref={ref} className={cn("inline-block", className)} {...props}>
          <PopoverTrigger asChild>
            <div className="cursor-pointer">
              <DateInput
                label={label}
                value={value}
                defaultValue={defaultValue}
                onChange={handleDateChange}
                granularity={granularity}
                isDisabled={isDisabled}
                isInvalid={isInvalid}
                errorMessage={errorMessage}
                variant={variant}
                size={resolvedSize}
                minValue={minDate}
                maxValue={maxDate}
                readOnly
                className="cursor-pointer"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-0 border-0 shadow-xl">
            <Calendar
              value={value ?? defaultValue ?? null}
              onChange={(d) => handleDateChange(d)}
              minDate={minDate}
              maxDate={maxDate}
              isDisabled={isDisabled}
            />
          </PopoverContent>
        </div>
      </Popover>
    );
  }
);

DatePicker.displayName = "DatePicker";
