"use client";

import * as React from "react";
import { cn } from "@next-ui/utils";
import { RangeCalendar } from "@next-ui/range-calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@next-ui/popover";
import { Input } from "@next-ui/input";
import type { BaseComponentProps } from "@next-ui/utils";

export interface DateRangeValue {
  start: Date;
  end: Date;
}

function formatRange(start: Date, end: Date): string {
  const s = start.toLocaleDateString();
  const e = end.toLocaleDateString();
  return `${s} – ${e}`;
}

export interface DateRangePickerProps extends BaseComponentProps<HTMLDivElement> {
  label?: React.ReactNode;
  startDate?: Date | null;
  endDate?: Date | null;
  value?: DateRangeValue | null;
  onChange?: (range: DateRangeValue) => void;
  minDate?: Date;
  maxDate?: Date;
  isDisabled?: boolean;
  twoMonths?: boolean;
}

export const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      label,
      startDate,
      endDate,
      value,
      onChange,
      minDate,
      maxDate,
      isDisabled = false,
      twoMonths = false,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [viewDate, setViewDate] = React.useState(() => new Date());

    const rangeFromValue = value ?? (startDate && endDate ? { start: startDate, end: endDate } : null);
    const [internalRange, setInternalRange] = React.useState<DateRangeValue | null>(rangeFromValue);
    const isControlled = value !== undefined || (startDate !== undefined && endDate !== undefined);
    const range = isControlled
      ? (value ?? (startDate && endDate ? { start: startDate, end: endDate } : null))
      : internalRange;

    const displayText = range ? formatRange(range.start, range.end) : "";

    const handleChange = React.useCallback(
      (r: { start: Date; end: Date }) => {
        if (!isControlled) setInternalRange(r);
        onChange?.(r);
      },
      [isControlled, onChange]
    );

    return (
      <Popover isOpen={isOpen} onOpenChange={setIsOpen} triggerType="press">
        <div ref={ref} className={cn("inline-block", className)} {...props}>
          <PopoverTrigger asChild>
            <div className="cursor-pointer w-full">
              <Input
                label={label}
                value={displayText}
                readOnly
                isDisabled={isDisabled}
                placeholder="Select date range"
                className="cursor-pointer"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-0 border-0 shadow-xl max-w-max">
            <div className={cn("flex", twoMonths && "gap-4")}>
              {twoMonths ? (
                <>
                  <RangeCalendar
                    value={range}
                    onChange={handleChange}
                    minDate={minDate}
                    maxDate={maxDate}
                    isDisabled={isDisabled}
                    viewDate={viewDate}
                    onViewDateChange={setViewDate}
                  />
                  <RangeCalendar
                    value={range}
                    onChange={handleChange}
                    minDate={minDate}
                    maxDate={maxDate}
                    isDisabled={isDisabled}
                    viewDate={viewDate}
                    onViewDateChange={setViewDate}
                    monthOffset={1}
                  />
                </>
              ) : (
                <RangeCalendar
                  value={range}
                  onChange={handleChange}
                  minDate={minDate}
                  maxDate={maxDate}
                  isDisabled={isDisabled}
                />
              )}
            </div>
          </PopoverContent>
        </div>
      </Popover>
    );
  }
);

DateRangePicker.displayName = "DateRangePicker";
