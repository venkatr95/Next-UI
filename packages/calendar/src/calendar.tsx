"use client";

import * as React from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses, getGradientClasses, colors } from "@next-ui/theme";
import type { BaseComponentProps } from "@next-ui/utils";

export type CalendarGranularity = "day" | "month" | "year";

export interface CalendarProps extends BaseComponentProps<HTMLDivElement> {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  isDisabled?: boolean;
  color?: keyof typeof colors;
  showMonthAndYearPickers?: boolean;
  locale?: string;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isToday(date: Date): boolean {
  const today = new Date();
  return isSameDay(date, today);
}

function isInRange(date: Date, min?: Date, max?: Date): boolean {
  if (min && date < min) return false;
  if (max && date > max) return false;
  return true;
}

function getDaysInMonth(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days: Date[] = [];
  const startPad = first.getDay();
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const prevLast = new Date(prevYear, prevMonth + 1, 0).getDate();

  for (let i = 0; i < startPad; i++) {
    days.push(new Date(prevYear, prevMonth, prevLast - startPad + i + 1));
  }
  for (let d = 1; d <= last.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push(new Date(year, month + 1, d));
  }
  return days;
}

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      isDisabled = false,
      color = "primary",
      showMonthAndYearPickers = true,
      locale = "en-US",
      className,
      styleType,
      gradient,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<Date | null>(defaultValue ?? null);
    const isControlled = value !== undefined;
    const selected = isControlled ? value : internalValue;

    const [viewDate, setViewDate] = React.useState(() => {
      const d = selected ?? new Date();
      return new Date(d.getFullYear(), d.getMonth(), 1);
    });

    const handleSelect = React.useCallback(
      (date: Date) => {
        if (isDisabled) return;
        if (!isInRange(date, minDate, maxDate)) return;
        if (!isControlled) setInternalValue(date);
        onChange?.(date);
      },
      [isDisabled, minDate, maxDate, isControlled, onChange]
    );

    const prevMonth = () => {
      setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    };

    const nextMonth = () => {
      setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
    };

    const colorClasses = colors[color] ?? colors.primary;
    const days = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
    const monthName = viewDate.toLocaleString(locale, { month: "long" });
    const year = viewDate.getFullYear();

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex flex-col rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3",
          getStyleClasses(styleType),
          getGradientClasses(gradient),
          className
        )}
        {...props}
      >
        {showMonthAndYearPickers && (
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={prevMonth}
              disabled={isDisabled}
              aria-label="Previous month"
              className="h-8 w-8 p-0 min-w-0 inline-flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {monthName} {year}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              disabled={isDisabled}
              aria-label="Next month"
              className="h-8 w-8 p-0 min-w-0 inline-flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        <div className="grid grid-cols-7 gap-1 mb-2">
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1"
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((date, i) => {
            const isCurrentMonth = date.getMonth() === viewDate.getMonth();
            const isSelected = selected ? isSameDay(date, selected) : false;
            const isTodayDate = isToday(date);
            const disabled = isDisabled || !isInRange(date, minDate, maxDate);

            return (
              <button
                key={i}
                type="button"
                disabled={disabled}
                onClick={() => handleSelect(date)}
                className={cn(
                  "h-8 w-8 rounded-md text-sm font-medium transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-1",
                  "disabled:opacity-40 disabled:cursor-not-allowed",
                  !isCurrentMonth && "text-gray-400 dark:text-gray-500",
                  isCurrentMonth && "text-gray-900 dark:text-gray-100",
                  isSelected &&
                    cn(
                      gradient ? getGradientClasses(gradient) + " text-white" : colorClasses.base,
                      "text-white"
                    ),
                  !isSelected && isTodayDate && "ring-2 ring-indigo-500/50 ring-offset-1",
                  !isSelected && !isTodayDate && isCurrentMonth && "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

Calendar.displayName = "Calendar";
