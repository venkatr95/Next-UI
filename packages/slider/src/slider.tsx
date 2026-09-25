"use client";

import * as React from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses, getGradientClasses, colors } from "@next-ui/theme";
import { resolveResponsiveValue, useResponsiveContext } from "@next-ui/responsive";
import type { BaseComponentProps, ResponsiveValue } from "@next-ui/utils";

export type SliderSize = "sm" | "md" | "lg";
export type SliderMark = { value: number; label?: React.ReactNode };

const sizeClasses: Record<SliderSize, { track: string; thumb: string }> = {
  sm: { track: "h-1", thumb: "w-4 h-4" },
  md: { track: "h-2", thumb: "w-5 h-5" },
  lg: { track: "h-3", thumb: "w-6 h-6" },
};

export interface SliderProps extends Omit<BaseComponentProps<HTMLDivElement>, "onChange"> {
  label?: React.ReactNode;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  minValue?: number;
  maxValue?: number;
  step?: number;
  size?: ResponsiveValue<SliderSize>;
  color?: keyof typeof colors;
  showSteps?: boolean;
  showTooltip?: boolean;
  marks?: SliderMark[];
  isDisabled?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      label,
      value,
      defaultValue = 0,
      onChange,
      minValue = 0,
      maxValue = 100,
      step = 1,
      size = "md",
      color = "primary",
      showSteps = false,
      showTooltip = false,
      marks = [],
      isDisabled = false,
      formatOptions,
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

    const [isDragging, setIsDragging] = React.useState(false);
    const trackRef = React.useRef<HTMLDivElement>(null);

    const percent = Math.min(100, Math.max(0, ((currentValue - minValue) / (maxValue - minValue)) * 100));

    const formatValue = (v: number) => {
      if (formatOptions) return new Intl.NumberFormat(undefined, formatOptions).format(v);
      return String(v);
    };

    const updateValue = React.useCallback(
      (clientX: number) => {
        const track = trackRef.current;
        if (!track || isDisabled) return;
        const rect = track.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        let v = minValue + p * (maxValue - minValue);
        if (step > 0) v = Math.round(v / step) * step;
        v = Math.min(maxValue, Math.max(minValue, v));
        if (!isControlled) setInternalValue(v);
        onChange?.(v);
      },
      [minValue, maxValue, step, isDisabled, isControlled, onChange]
    );

    const handlePointerDown = (e: React.PointerEvent) => {
      if (isDisabled) return;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setIsDragging(true);
      updateValue(e.clientX);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (isDragging) updateValue(e.clientX);
    };

    const handlePointerUp = (e: React.PointerEvent) => {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      setIsDragging(false);
    };

    const steps = step > 0 ? Math.ceil((maxValue - minValue) / step) : 0;
    const colorClasses = colors[color] ?? colors.primary;

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {label && (
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
            {showTooltip && (
              <span className="text-sm text-gray-500 dark:text-gray-400">{formatValue(currentValue)}</span>
            )}
          </div>
        )}
        <div className="relative">
          <div
            ref={trackRef}
            role="slider"
            aria-valuemin={minValue}
            aria-valuemax={maxValue}
            aria-valuenow={currentValue}
            aria-disabled={isDisabled}
            tabIndex={isDisabled ? -1 : 0}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onKeyDown={(e) => {
              if (isDisabled) return;
              const delta = e.shiftKey ? step * 10 : step;
              let v = currentValue;
              if (e.key === "ArrowRight" || e.key === "ArrowUp") v += delta;
              else if (e.key === "ArrowLeft" || e.key === "ArrowDown") v -= delta;
              v = Math.min(maxValue, Math.max(minValue, v));
              if (step > 0) v = Math.round(v / step) * step;
              if (!isControlled) setInternalValue(v);
              onChange?.(v);
            }}
            className={cn(
              "relative w-full rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer touch-none",
              "focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              sizeClasses[resolvedSize].track,
              getStyleClasses(styleType)
            )}
          >
            <div
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 rounded-full",
                gradient ? getGradientClasses(gradient) : colorClasses.base,
                sizeClasses[resolvedSize].track
              )}
              style={{ width: `${percent}%` }}
            />
            <div
              className={cn(
                "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white dark:bg-gray-100 shadow-md border-2 border-gray-300 dark:border-gray-600",
                "transition-transform hover:scale-110",
                sizeClasses[resolvedSize].thumb,
                getStyleClasses(styleType)
              )}
              style={{ left: `${percent}%` }}
            />
          </div>
          {showSteps && step > 0 && (
            <div className="flex justify-between mt-1 px-0.5">
              {Array.from({ length: steps + 1 }, (_, i) => (
                <div
                  key={i}
                  className="w-px h-1.5 bg-gray-300 dark:bg-gray-600 rounded"
                  style={{ marginLeft: i === 0 ? 0 : `${(100 / steps) * i - 0.5}%` }}
                />
              ))}
            </div>
          )}
          {marks.length > 0 && (
            <div className="relative mt-2 flex justify-between">
              {marks.map((mark, i) => (
                <div
                  key={i}
                  className="absolute text-xs text-gray-500 dark:text-gray-400 -translate-x-1/2"
                  style={{
                    left: `${((mark.value - minValue) / (maxValue - minValue)) * 100}%`,
                  }}
                >
                  {mark.label ?? mark.value}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";
