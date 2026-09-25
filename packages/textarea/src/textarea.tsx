import * as React from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses } from "@next-ui/theme";
import { resolveResponsiveValue, useResponsiveContext } from "@next-ui/responsive";
import type { BaseComponentProps, ResponsiveValue } from "@next-ui/utils";

export type TextareaVariant = "flat" | "bordered" | "underlined" | "faded";
export type TextareaSize = "sm" | "md" | "lg";

const sizeClasses: Record<TextareaSize, string> = {
  sm: "px-2 py-1.5 text-sm min-h-[4rem]",
  md: "px-3 py-2 text-base min-h-[5rem]",
  lg: "px-4 py-3 text-lg min-h-[6rem]",
};

const variantClasses: Record<TextareaVariant, string> = {
  flat: "bg-gray-100 dark:bg-gray-800 border-0",
  bordered: "bg-transparent border-2 border-gray-300 dark:border-gray-600",
  underlined:
    "bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 rounded-none",
  faded: "bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700",
};

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size" | "color">,
    BaseComponentProps<HTMLTextAreaElement> {
  label?: React.ReactNode;
  placeholder?: string;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  variant?: TextareaVariant;
  size?: ResponsiveValue<TextareaSize>;
  minRows?: number;
  maxRows?: number;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      placeholder,
      description,
      errorMessage,
      variant = "bordered",
      size = "md",
      minRows = 3,
      maxRows = 10,
      isDisabled = false,
      isReadOnly = false,
      isRequired = false,
      isInvalid = false,
      className,
      styleType,
      id: idProp,
      value,
      onChange,
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
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    const adjustHeight = React.useCallback(() => {
      const el = (ref as React.RefObject<HTMLTextAreaElement>)?.current ?? textareaRef.current;
      if (!el || !maxRows) return;
      el.style.height = "auto";
      const lineHeight = parseInt(getComputedStyle(el).lineHeight, 10) || 20;
      const maxHeight = lineHeight * maxRows;
      el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    }, [maxRows, ref]);

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      },
      [ref]
    );

    React.useEffect(() => {
      adjustHeight();
    }, [value, adjustHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
      adjustHeight();
    };

    const textareaClasses = cn(
      "w-full rounded-lg outline-none transition-all duration-200 resize-y",
      "focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-0 dark:focus:ring-indigo-400/50",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "read-only:cursor-default read-only:opacity-90",
      sizeClasses[resolvedSize],
      variantClasses[variant],
      isInvalid && "border-red-500 dark:border-red-500 focus:ring-red-500/50",
      getStyleClasses(styleType),
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
        <textarea
          ref={setRefs}
          id={id}
          placeholder={placeholder}
          rows={minRows}
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
          value={value}
          onChange={handleChange}
          className={textareaClasses}
          {...props}
        />
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

Textarea.displayName = "Textarea";
