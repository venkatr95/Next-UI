import * as React from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses } from "@next-ui/theme";
import { resolveResponsiveValue, useResponsiveContext } from "@next-ui/responsive";
import type { BaseComponentProps, ResponsiveValue } from "@next-ui/utils";

export type SelectVariant = "flat" | "bordered" | "underlined" | "faded";
export type SelectSize = "sm" | "md" | "lg";

const sizeClasses: Record<SelectSize, string> = {
  sm: "h-8 px-2 text-sm min-h-8",
  md: "h-10 px-3 text-base min-h-10",
  lg: "h-12 px-4 text-lg min-h-12",
};

const variantClasses: Record<SelectVariant, string> = {
  flat: "bg-gray-100 dark:bg-gray-800 border-0",
  bordered: "bg-transparent border-2 border-gray-300 dark:border-gray-600",
  underlined:
    "bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 rounded-none",
  faded: "bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700",
};

export interface SelectItemProps {
  itemKey: string;
  value?: string;
  children?: React.ReactNode;
  textValue?: string;
  isDisabled?: boolean;
}

export function SelectItem({ itemKey, children, value, textValue }: SelectItemProps) {
  return (
    <option value={itemKey} data-value={value}>
      {textValue ?? children ?? value ?? itemKey}
    </option>
  );
}

SelectItem.displayName = "SelectItem";

export interface SelectProps
  extends Omit<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      "size" | "onChange" | "value" | "color"
    >,
    BaseComponentProps<HTMLSelectElement> {
  label?: React.ReactNode;
  placeholder?: string;
  items?: Iterable<SelectItemProps>;
  selectedKey?: string | null;
  defaultSelectedKey?: string | null;
  onSelectionChange?: (key: string | null) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: React.ReactNode;
  description?: React.ReactNode;
  variant?: SelectVariant;
  size?: ResponsiveValue<SelectSize>;
  children?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      placeholder,
      items,
      selectedKey,
      defaultSelectedKey = null,
      onSelectionChange,
      isDisabled = false,
      isInvalid = false,
      errorMessage,
      description,
      variant = "bordered",
      size = "md",
      className,
      styleType,
      id: idProp,
      children,
      ...props
    },
    ref
  ) => {
    const { deviceType } = useResponsiveContext();
    const resolvedSize = resolveResponsiveValue(size, deviceType) ?? "md";
    const [uncontrolled, setUncontrolled] = React.useState<string | null>(
      defaultSelectedKey
    );
    const isControlled = selectedKey !== undefined;
    const value = isControlled ? selectedKey : uncontrolled;
    const generatedId = React.useId();
    const id = idProp ?? generatedId;
    const errorId = `${id}-error`;
    const descriptionId = `${id}-description`;

    const itemList = React.useMemo(() => {
      if (items) return Array.from(items);
      return React.Children.toArray(children) as React.ReactElement[];
    }, [items, children]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const raw = e.target.value;
      const key = raw === "" ? null : raw;
      if (!isControlled) setUncontrolled(key);
      onSelectionChange?.(key);
    };

    const selectClasses = cn(
      "w-full rounded-lg outline-none transition-all duration-200 appearance-none cursor-pointer",
      "focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-0 dark:focus:ring-indigo-400/50",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      sizeClasses[resolvedSize],
      variantClasses[variant],
      isInvalid && "border-red-500 dark:border-red-500 focus:ring-red-500/50",
      "pr-8 bg-no-repeat bg-[length:1.25rem] bg-[right_0.5rem_center]",
      "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%236b7280%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')]",
      getStyleClasses(styleType),
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          value={value ?? ""}
          onChange={handleChange}
          disabled={isDisabled}
          aria-invalid={isInvalid}
          aria-describedby={
            [isInvalid && errorMessage && errorId, description && descriptionId]
              .filter(Boolean)
              .join(" ") || undefined
          }
          aria-disabled={isDisabled}
          className={selectClasses}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {itemList.map((item) => {
            if (React.isValidElement(item) && item.type === SelectItem) {
              const { itemKey, value: val, children: ch, textValue } = item.props as SelectItemProps;
              const optValue = val ?? itemKey;
              return (
                <option key={itemKey} value={optValue}>
                  {textValue ?? ch ?? optValue}
                </option>
              );
            }
            if (item && typeof item === "object" && "itemKey" in item) {
              const { itemKey, value: val, children: ch, textValue } = item as SelectItemProps;
              const optValue = val ?? itemKey;
              return (
                <option key={itemKey} value={optValue}>
                  {textValue ?? ch ?? optValue}
                </option>
              );
            }
            return null;
          })}
        </select>
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

Select.displayName = "Select";
