import * as React from "react";
import { createContext } from "@next-ui/utils";
import { cn } from "@next-ui/utils";
import { Checkbox } from "@next-ui/checkbox";
import type { BaseComponentProps } from "@next-ui/utils";

export type CheckboxGroupOrientation = "horizontal" | "vertical";

interface CheckboxGroupContextValue {
  value: string[];
  onChange: (value: string[]) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
}

const [CheckboxGroupProvider, useCheckboxGroup] = createContext<CheckboxGroupContextValue>("CheckboxGroupContext");

export interface CheckboxGroupProps extends BaseComponentProps<HTMLDivElement> {
  label?: React.ReactNode;
  orientation?: CheckboxGroupOrientation;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: React.ReactNode;
  description?: React.ReactNode;
  id?: string;
  children?: React.ReactNode;
}

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      label,
      orientation = "vertical",
      value,
      defaultValue = [],
      onChange,
      isDisabled = false,
      isInvalid = false,
      errorMessage,
      description,
      className,
      id: idProp,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState<string[]>(defaultValue);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : uncontrolled;
    const generatedId = React.useId();
    const id = idProp ?? generatedId;
    const groupId = `${id}-group`;
    const errorId = `${id}-error`;
    const descriptionId = `${id}-description`;

    const handleChange = React.useCallback(
      (key: string, checked: boolean) => {
        const next = checked
          ? [...currentValue, key]
          : currentValue.filter((v) => v !== key);
        if (!isControlled) setUncontrolled(next);
        onChange?.(next);
      },
      [currentValue, isControlled, onChange]
    );

    const contextValue: CheckboxGroupContextValue = {
      value: currentValue,
      onChange: (next) => {
        if (!isControlled) setUncontrolled(next);
        onChange?.(next);
      },
      isDisabled,
      isInvalid,
    };

    return (
      <CheckboxGroupProvider value={contextValue}>
        <div
          ref={ref}
          role="group"
          aria-labelledby={label ? groupId : undefined}
          aria-describedby={
            [isInvalid && errorMessage && errorId, description && descriptionId]
              .filter(Boolean)
              .join(" ") || undefined
          }
          aria-invalid={isInvalid}
          aria-disabled={isDisabled}
          className={cn("flex flex-col gap-1", className)}
          {...props}
        >
          {label && (
            <span
              id={groupId}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {label}
            </span>
          )}
          <div
            className={cn(
              "flex gap-3",
              orientation === "vertical" && "flex-col",
              orientation === "horizontal" && "flex-row flex-wrap"
            )}
          >
            {children}
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
      </CheckboxGroupProvider>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";

export interface CheckboxGroupItemProps {
  value: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

export function CheckboxGroupItem({ value, children, ...checkboxProps }: CheckboxGroupItemProps) {
  const { value: groupValue, onChange, isDisabled, isInvalid } = useCheckboxGroup();
  const checked = groupValue.includes(value);

  const handleChange = (next: boolean) => {
    const nextValue = next
      ? [...groupValue, value]
      : groupValue.filter((v) => v !== value);
    onChange(nextValue);
  };

  return (
    <Checkbox
      isSelected={checked}
      onChange={handleChange}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      {...checkboxProps}
    >
      {children}
    </Checkbox>
  );
}

CheckboxGroupItem.displayName = "CheckboxGroupItem";
