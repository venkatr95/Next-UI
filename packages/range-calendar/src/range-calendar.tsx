"use client";

import * as React from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses, getGradientClasses, colors } from "@next-ui/theme";
import type { BaseComponentProps } from "@next-ui/utils";

export interface DateRange {
  start: Date;
  end: Date;
}

export interface RangeCalendarProps extends BaseComponentProps<HTMLDivElement> {
  value?: { start: Date; end: Date } | null;
  defaultValue?: { start: Date; end: Date } | null;
  onChange?: (range: { start: Date; end: Date }) => void;
  minDate?: Date;
  maxDate?: Date;
  isDisabled?: boolean;
  color?: keyof typeof colors;
  locale?: string;
  /** When provided with onViewDateChange, controls which month is displayed */
  viewDate?: Date;
  onViewDateChange?: (date: Date) => void;
  /** Offset month for multi-calendar views (e.g. 1 = show next month) */
  monthOffset?: number;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isInRange(date: Date, start: Date, end: Date): boolean {
  const t = date.getTime();
  const s = start.getTime();
  const e = end.getTime();
  return t >= s && t <= e;
}

function isInRangePartial(date: Date, start?: Date, end?: Date): boolean {
  if (!start || !end) return false;
  return isInRange(date, start, end);
}

function isWithinBounds(date: Date, min?: Date, max?: Date): boolean {
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

export const RangeCalendar = React.forwardRef<HTMLDivElement, RangeCalendarProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      isDisabled = false,
      color = "primary",
      locale = "en-US",
      viewDate: controlledViewDate,
      onViewDateChange,
      monthOffset = 0,
      className,
      styleType,
      gradient,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<{ start: Date; end: Date } | null>(
      defaultValue ?? null
    );
    const isControlled = value !== undefined;
    const range = isControlled ? value : internalValue;

    const [internalViewDate, setInternalViewDate] = React.useState(() => {
      const d = range?.start ?? new Date();
      return new Date(d.getFullYear(), d.getMonth() + monthOffset, 1);
    });
    const isViewControlled = controlledViewDate !== undefined;
    const viewDate = isViewControlled
      ? new Date(controlledViewDate.getFullYear(), controlledViewDate.getMonth() + monthOffset, 1)
      : internalViewDate;

    const setViewDate = React.useCallback(
      (updater: (d: Date) => Date) => {
        const next = updater(viewDate);
        if (!isViewControlled) setInternalViewDate(next);
        onViewDateChange?.(next);
      },
      [viewDate, isViewControlled, onViewDateChange]
    );

    const [selectingEnd, setSelectingEnd] = React.useState(false);

    const handleSelect = React.useCallback(
      (date: Date) => {
        if (isDisabled) return;
        if (!isWithinBounds(date, minDate, maxDate)) return;

        if (!range) {
          const next = { start: date, end: date };
          if (!isControlled) setInternalValue(next);
          onChange?.(next);
          setSelectingEnd(true);
          return;
        }

        if (!selectingEnd) {
          const next = { start: date, end: date };
          if (!isControlled) setInternalValue(next);
          onChange?.(next);
          setSelectingEnd(true);
        } else {
          const [start, end] = date < range.start ? [date, range.start] : [range.start, date];
          const next = { start, end };
          if (!isControlled) setInternalValue(next);
          onChange?.(next);
          setSelectingEnd(false);
        }
      },
      [isDisabled, minDate, maxDate, isControlled, onChange, range, selectingEnd]
    );

    const prevMonth = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    const nextMonth = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

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
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={prevMonth}
            disabled={isDisabled}
            aria-label="Previous month"
            className="h-8 w-8 p-0 min-w-0 inline-flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 text-gray-700 dark:text-gray-300"
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
            className="h-8 w-8 p-0 min-w-0 inline-flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 text-gray-700 dark:text-gray-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

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
            const isStart = range ? isSameDay(date, range.start) : false;
            const isEnd = range ? isSameDay(date, range.end) : false;
            const inRange =
              range && !isStart && !isEnd && isInRangePartial(date, range.start, range.end);
            const disabled = isDisabled || !isWithinBounds(date, minDate, maxDate);

            return (
              <button
                key={i}
                type="button"
                disabled={disabled}
                onClick={() => handleSelect(date)}
                className={cn(
                  "h-8 w-8 rounded-md text-sm font-medium transition-colors relative",
                  "focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-1",
                  "disabled:opacity-40 disabled:cursor-not-allowed",
                  !isCurrentMonth && "text-gray-400 dark:text-gray-500",
                  isCurrentMonth && "text-gray-900 dark:text-gray-100",
                  (isStart || isEnd) &&
                    cn(
                      gradient ? getGradientClasses(gradient) + " text-white" : colorClasses.base,
                      "text-white"
                    ),
                  inRange && "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-100",
                  !isStart && !isEnd && !inRange && isCurrentMonth && "hover:bg-gray-100 dark:hover:bg-gray-800"
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

RangeCalendar.displayName = "RangeCalendar";
