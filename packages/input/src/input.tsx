import * as React from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses, getGradientClasses } from "@next-ui/theme";
import { resolveResponsiveValue } from "@next-ui/responsive";
import { useResponsiveContext } from "@next-ui/responsive";
import type {
  BaseComponentProps,
  ResponsiveValue,
} from "@next-ui/utils";

export type InputVariant = "flat" | "bordered" | "underlined" | "faded";
export type InputSize = "sm" | "md" | "lg";

const sizeClasses: Record<InputSize, string> = {
  sm: "h-8 px-2 text-sm",
  md: "h-10 px-3 text-base",
  lg: "h-12 px-4 text-lg",
};

const variantClasses: Record<InputVariant, string> = {
  flat: "bg-gray-100 dark:bg-gray-800 border-0",
  bordered: "bg-transparent border-2 border-gray-300 dark:border-gray-600",
  underlined: "bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 rounded-none",
  faded: "bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700",
};

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color">,
    BaseComponentProps<HTMLInputElement> {
  label?: React.ReactNode;
  placeholder?: string;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  variant?: InputVariant;
  size?: ResponsiveValue<InputSize>;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      description,
      errorMessage,
      startContent,
      endContent,
      variant = "bordered",
      size = "md",
      isDisabled = false,
      isReadOnly = false,
      isRequired = false,
      isInvalid = false,
      className,
      styleType,
      gradient,
      id: idProp,
      ...props
    },
    ref
  ) => {
    const { deviceType } = useResponsiveContext();
    const resolvedSize = resolveResponsiveValue(size, deviceType) ?? "md";
    const generatedId = React.useId();
    const id = idProp ?? generatedId;
    const errorId = `${id}-error`;
    const descriptionId = `${id}-description`;

    const inputClasses = cn(
      "w-full rounded-lg outline-none transition-all duration-200",
      "focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-0 dark:focus:ring-indigo-400/50",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "read-only:cursor-default read-only:opacity-90",
      sizeClasses[resolvedSize],
      variantClasses[variant],
      isInvalid && "border-red-500 dark:border-red-500 focus:ring-red-500/50",
      getStyleClasses(styleType),
      getGradientClasses(gradient),
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
              isRequired && "after:content-['*'] after:ml-0.5 after:text-red-500"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {startContent && (
            <div className="absolute left-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
              {startContent}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            type="text"
            placeholder={placeholder}
            disabled={isDisabled}
            readOnly={isReadOnly}
            required={isRequired}
            aria-required={isRequired}
            aria-invalid={isInvalid}
            aria-describedby={
              [isInvalid && errorMessage && errorId, description && descriptionId]
                .filter(Boolean)
                .join(" ") || undefined
            }
            aria-disabled={isDisabled}
            aria-readonly={isReadOnly}
            className={cn(
              inputClasses,
              startContent && "pl-10",
              endContent && "pr-10"
            )}
            {...props}
          />
          {endContent && (
            <div className="absolute right-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
              {endContent}
            </div>
          )}
        </div>
        {description && !isInvalid && (
          <p
            id={descriptionId}
            className="mt-1 text-sm text-gray-500 dark:text-gray-400"
          >
            {description}
          </p>
        )}
        {errorMessage && isInvalid && (
          <p
            id={errorId}
            className="mt-1 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
