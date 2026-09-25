"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses, colors } from "@next-ui/theme";
import type { BaseComponentProps } from "@next-ui/utils";

type SelectionMode = "none" | "single" | "multiple";
type ListboxVariant = "flat" | "bordered" | "light" | "faded";
type ColorKey = keyof typeof colors;

interface ListboxContextValue {
  selectionMode: SelectionMode;
  selectedKeys: Set<string>;
  onSelectionChange: (keys: Set<string>) => void;
  variant: ListboxVariant;
  color: ColorKey;
  isDisabled: boolean;
  focusedKey: string | null;
  setFocusedKey: (key: string | null) => void;
  listRef: React.RefObject<HTMLUListElement | null>;
}

const ListboxContext = createContext<ListboxContextValue | null>(null);

function useListboxContext() {
  const ctx = useContext(ListboxContext);
  if (!ctx) throw new Error("ListboxItem/ListboxSection must be used within Listbox");
  return ctx;
}

const variantClasses: Record<ListboxVariant, string> = {
  flat: "bg-transparent",
  bordered: "border-2 border-gray-200 dark:border-gray-700 rounded-lg",
  light: "bg-gray-100 dark:bg-gray-800 rounded-lg",
  faded: "bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg",
};

export interface ListboxProps
  extends Omit<BaseComponentProps<HTMLUListElement>, "color">,
    Omit<React.HTMLAttributes<HTMLUListElement>, keyof BaseComponentProps> {
  selectionMode?: SelectionMode;
  selectedKeys?: Iterable<string>;
  defaultSelectedKeys?: Iterable<string>;
  onSelectionChange?: (keys: Set<string>) => void;
  variant?: ListboxVariant;
  color?: ColorKey;
  isDisabled?: boolean;
  children: React.ReactNode;
}

export const Listbox = React.forwardRef<HTMLUListElement, ListboxProps>(
  (
    {
      as: Component = "ul",
      className,
      styleType,
      selectionMode = "single",
      selectedKeys: controlledKeys,
      defaultSelectedKeys,
      onSelectionChange,
      variant = "flat",
      color = "default",
      isDisabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const [internalKeys, setInternalKeys] = useState<Set<string>>(() =>
      new Set(defaultSelectedKeys ?? [])
    );
    const isControlled = controlledKeys !== undefined;
    const selectedKeys = isControlled ? new Set(controlledKeys) : internalKeys;
    const listRef = useRef<HTMLUListElement | null>(null);

    const handleSelectionChange = useCallback(
      (keys: Set<string>) => {
        if (!isControlled) setInternalKeys(keys);
        onSelectionChange?.(keys);
      },
      [isControlled, onSelectionChange]
    );

    const [focusedKey, setFocusedKey] = useState<string | null>(null);

    const value: ListboxContextValue = useMemo(
      () => ({
        selectionMode,
        selectedKeys,
        onSelectionChange: handleSelectionChange,
        variant,
        color,
        isDisabled,
        focusedKey,
        setFocusedKey,
        listRef,
      }),
      [
        selectionMode,
        selectedKeys,
        handleSelectionChange,
        variant,
        color,
        isDisabled,
        focusedKey,
      ]
    );

    return (
      <ListboxContext.Provider value={value}>
        <Component
          ref={(el: HTMLUListElement | null) => {
            (listRef as React.MutableRefObject<HTMLUListElement | null>).current = el;
            if (typeof ref === "function") ref(el);
            else if (ref) (ref as React.MutableRefObject<HTMLUListElement | null>).current = el;
          }}
          role="listbox"
          aria-multiselectable={selectionMode === "multiple"}
          aria-disabled={isDisabled}
          tabIndex={0}
          className={cn(
            "py-1 outline-none",
            variantClasses[variant],
            getStyleClasses(styleType),
            className
          )}
          {...props}
        >
          {children}
        </Component>
      </ListboxContext.Provider>
    );
  }
);

Listbox.displayName = "Listbox";

export interface ListboxItemProps
  extends Omit<BaseComponentProps<HTMLLIElement>, "color">,
    Omit<React.HTMLAttributes<HTMLLIElement>, keyof BaseComponentProps> {
  itemKey: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  description?: React.ReactNode;
  isDisabled?: boolean;
  children?: React.ReactNode;
}

export const ListboxItem = React.forwardRef<HTMLLIElement, ListboxItemProps>(
  (
    {
      itemKey,
      startContent,
      endContent,
      description,
      isDisabled = false,
      className,
      children,
      onClick,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const {
      selectionMode,
      selectedKeys,
      onSelectionChange,
      variant,
      color,
      isDisabled: listDisabled,
      focusedKey,
      setFocusedKey,
      listRef,
    } = useListboxContext();

    const isSelected = selectedKeys.has(itemKey);
    const isFocused = focusedKey === itemKey;
    const disabled = isDisabled ?? listDisabled;
    const colorClasses = colors[color] ?? colors.default;

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLLIElement>) => {
        if (disabled) return;
        onClick?.(e);
        if (selectionMode === "none") return;
        const next = new Set(selectedKeys);
        if (selectionMode === "single") {
          next.clear();
          next.add(itemKey);
        } else {
          if (next.has(itemKey)) next.delete(itemKey);
          else next.add(itemKey);
        }
        onSelectionChange(next);
      },
      [disabled, onClick, selectionMode, selectedKeys, itemKey, onSelectionChange]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLLIElement>) => {
        onKeyDown?.(e);
        if (disabled) return;
        const items = Array.from(
          listRef.current?.querySelectorAll('[role="option"]:not([aria-disabled="true"])') ?? []
        ) as HTMLElement[];
        const idx = items.findIndex((el) => el.getAttribute("data-key") === itemKey);
        if (e.key === "ArrowDown" && idx < items.length - 1) {
          e.preventDefault();
          items[idx + 1]?.focus();
          setFocusedKey(items[idx + 1]?.getAttribute("data-key") ?? null);
        } else if (e.key === "ArrowUp" && idx > 0) {
          e.preventDefault();
          items[idx - 1]?.focus();
          setFocusedKey(items[idx - 1]?.getAttribute("data-key") ?? null);
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent<HTMLLIElement>);
        }
      },
      [disabled, onKeyDown, itemKey, listRef, setFocusedKey, handleClick]
    );

    const handleFocus = useCallback(() => setFocusedKey(itemKey), [itemKey, setFocusedKey]);
    const handleBlur = useCallback(() => setFocusedKey(null), [setFocusedKey]);

    return (
      <li
        ref={ref}
        role="option"
        aria-selected={selectionMode !== "none" ? isSelected : undefined}
        aria-disabled={disabled}
        data-key={itemKey}
        tabIndex={disabled ? -1 : isFocused ? 0 : -1}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer outline-none transition-colors",
          "focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-current",
          variant === "flat" && "rounded-md",
          variant !== "flat" && "mx-1 rounded-md",
          isSelected && selectionMode !== "none" && cn(colorClasses.base, "text-white"),
          !isSelected &&
            "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        {...props}
      >
        {startContent && <span className="shrink-0">{startContent}</span>}
        <div className="flex-1 min-w-0">
          {children}
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
          )}
        </div>
        {endContent && <span className="shrink-0 ml-auto">{endContent}</span>}
      </li>
    );
  }
);

ListboxItem.displayName = "ListboxItem";

export interface ListboxSectionProps
  extends Omit<BaseComponentProps<HTMLDivElement>, "color">,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps | "title"> {
  title?: React.ReactNode;
  children: React.ReactNode;
}

export function ListboxSection({
  title,
  className,
  children,
  ...props
}: ListboxSectionProps) {
  return (
    <div className={cn("py-1", className)} role="group" {...props}>
      {title && (
        <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {title}
        </div>
      )}
      {children}
    </div>
  );
}
