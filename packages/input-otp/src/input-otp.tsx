"use client";

import * as React from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses, getGradientClasses } from "@next-ui/theme";
import { resolveResponsiveValue, useResponsiveContext } from "@next-ui/responsive";
import type { BaseComponentProps, ResponsiveValue } from "@next-ui/utils";

export type InputOtpType = "numeric" | "alphanumeric";
export type InputOtpVariant = "flat" | "bordered" | "underlined" | "faded";
export type InputOtpSize = "sm" | "md" | "lg";

const sizeClasses: Record<InputOtpSize, string> = {
  sm: "h-10 w-10 text-lg",
  md: "h-12 w-12 text-xl",
  lg: "h-14 w-14 text-2xl",
};

const variantClasses: Record<InputOtpVariant, string> = {
  flat: "bg-gray-100 dark:bg-gray-800 border-0",
  bordered: "bg-transparent border-2 border-gray-300 dark:border-gray-600",
  underlined: "bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 rounded-none",
  faded: "bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700",
};

export interface InputOtpProps extends Omit<BaseComponentProps<HTMLDivElement>, "variant"> {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  variant?: ResponsiveValue<InputOtpVariant>;
  size?: ResponsiveValue<InputOtpSize>;
  type?: InputOtpType;
}

export const InputOtp = React.forwardRef<HTMLDivElement, InputOtpProps>(
  (
    {
      length = 6,
      value,
      defaultValue = "",
      onChange,
      isDisabled = false,
      isInvalid = false,
      variant = "bordered",
      size = "md",
      type = "numeric",
      className,
      styleType,
      gradient,
      ...props
    },
    ref
  ) => {
    const { deviceType } = useResponsiveContext();
    const resolvedSize = resolveResponsiveValue(size, deviceType) ?? "md";
    const resolvedVariant = resolveResponsiveValue(variant, deviceType) ?? "bordered";

    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = value !== undefined;
    const currentValue = (isControlled ? value : internalValue).slice(0, length);

    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const chars = currentValue.split("");
    while (chars.length < length) chars.push("");

    const isValidChar = (c: string) => {
      if (type === "numeric") return /^\d$/.test(c);
      return /^[a-zA-Z0-9]$/.test(c);
    };

    const handleChange = React.useCallback(
      (index: number, char: string) => {
        if (char && !isValidChar(char)) return;
        const arr = currentValue.split("");
        while (arr.length < length) arr.push("");
        arr[index] = char;
        const joined = arr.join("").slice(0, length);
        if (!isControlled) setInternalValue(joined);
        onChange?.(joined);
      },
      [length, type, isControlled, onChange, currentValue]
    );

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !chars[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        handleChange(index - 1, "");
      } else if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").slice(0, length);
      const filtered = type === "numeric"
        ? pasted.replace(/\D/g, "")
        : pasted.replace(/[^a-zA-Z0-9]/g, "");
      const joined = filtered.slice(0, length);
      if (!isControlled) setInternalValue(joined);
      onChange?.(joined);
      const nextIndex = Math.min(joined.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    };

    const handleInput = (index: number, e: React.FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      const v = target.value;
      if (v.length > 1) {
        const valid = (type === "numeric" ? v.replace(/\D/g, "") : v.replace(/[^a-zA-Z0-9]/g, "")).slice(0, length);
        if (!isControlled) setInternalValue(valid);
        onChange?.(valid);
        const nextIndex = Math.min(valid.length, length - 1);
        inputRefs.current[nextIndex]?.focus();
        return;
      }
      handleChange(index, v);
      if (v && index < length - 1) inputRefs.current[index + 1]?.focus();
    };

    return (
      <div
        ref={ref}
        className={cn("flex gap-2 justify-center", className)}
        {...props}
      >
        {Array.from({ length }, (_, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode={type === "numeric" ? "numeric" : "text"}
            maxLength={1}
            value={chars[i] ?? ""}
            onChange={(e) => handleInput(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            disabled={isDisabled}
            aria-invalid={isInvalid}
            className={cn(
              "rounded-lg text-center font-mono font-semibold outline-none transition-all",
              "focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-0",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              sizeClasses[resolvedSize],
              variantClasses[resolvedVariant],
              isInvalid && "border-red-500 dark:border-red-500 focus:ring-red-500/50",
              getStyleClasses(styleType),
              getGradientClasses(gradient)
            )}
          />
        ))}
      </div>
    );
  }
);

InputOtp.displayName = "InputOtp";
