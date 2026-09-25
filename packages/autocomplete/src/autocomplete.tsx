"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses } from "@next-ui/theme";
import { useResponsiveContext, resolveResponsiveValue } from "@next-ui/responsive";
import { Input } from "@next-ui/input";
import type { BaseComponentProps, ResponsiveValue } from "@next-ui/utils";
import type { InputVariant, InputSize } from "@next-ui/input";

export interface AutocompleteItemProps {
  key: string;
  label: string;
  value?: string;
  description?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isDisabled?: boolean;
}

interface AutocompleteContextValue {
  selectedKey: string | undefined;
  onSelect: (key: string, item: AutocompleteItemProps) => void;
  inputValue: string;
  highlightedIndex: number;
  setHighlightedIndex: (i: number) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  filteredItems: AutocompleteItemProps[];
  variant: InputVariant;
  size: InputSize;
  isDisabled: boolean;
}

const AutocompleteContext = createContext<AutocompleteContextValue | null>(null);

function useAutocompleteContext() {
  const ctx = useContext(AutocompleteContext);
  if (!ctx) throw new Error("AutocompleteItem must be used within Autocomplete");
  return ctx;
}

const sizeClasses: Record<InputSize, string> = {
  sm: "max-h-48",
  md: "max-h-56",
  lg: "max-h-64",
};

export interface AutocompleteProps
  extends Omit<BaseComponentProps<HTMLDivElement>, "color">,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {
  label?: React.ReactNode;
  placeholder?: string;
  items?: AutocompleteItemProps[];
  inputValue?: string;
  onInputChange?: (value: string) => void;
  selectedKey?: string;
  onSelectionChange?: (key: string | undefined, item: AutocompleteItemProps | undefined) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: React.ReactNode;
  variant?: InputVariant;
  size?: ResponsiveValue<InputSize>;
  allowsCustomValue?: boolean;
  children?: React.ReactNode;
}

function filterItems(items: AutocompleteItemProps[], query: string): AutocompleteItemProps[] {
  if (!query.trim()) return items;
  const q = query.toLowerCase();
  return items.filter(
    (item) =>
      item.label.toLowerCase().includes(q) ||
      (item.value?.toLowerCase().includes(q) ?? false)
  );
}

export const Autocomplete = React.forwardRef<HTMLDivElement, AutocompleteProps>(
  (
    {
      className,
      styleType,
      label,
      placeholder = "Type to search...",
      items = [],
      inputValue: controlledValue,
      onInputChange,
      selectedKey: controlledKey,
      onSelectionChange,
      isDisabled = false,
      isInvalid = false,
      errorMessage,
      variant = "bordered",
      size = "md",
      allowsCustomValue = false,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState("");
    const [internalKey, setInternalKey] = useState<string | undefined>();
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const isControlledValue = controlledValue !== undefined;
    const isControlledKey = controlledKey !== undefined;
    const inputValue = isControlledValue ? controlledValue : internalValue;
    const selectedKey = isControlledKey ? controlledKey : internalKey;

    const { deviceType } = useResponsiveContext();
    const resolvedSize = resolveResponsiveValue(size, deviceType) ?? "md";

    const filteredItems = useMemo(
      () => filterItems(items, inputValue),
      [items, inputValue]
    );

    const selectedItem = useMemo(
      () => items.find((i) => i.key === selectedKey),
      [items, selectedKey]
    );

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        if (!isControlledValue) setInternalValue(v);
        onInputChange?.(v);
        setIsOpen(true);
        setHighlightedIndex(0);
      },
      [isControlledValue, onInputChange]
    );

    const handleSelect = useCallback(
      (key: string, item: AutocompleteItemProps) => {
        if (!isControlledKey) setInternalKey(key);
        if (!isControlledValue) setInternalValue(item.label);
        onSelectionChange?.(key, item);
        setIsOpen(false);
      },
      [isControlledKey, isControlledValue, onSelectionChange]
    );

    const handleBlur = useCallback(() => {
      setTimeout(() => {
        if (!allowsCustomValue && selectedItem) {
          if (!isControlledValue) setInternalValue(selectedItem.label);
        }
        setIsOpen(false);
      }, 150);
    }, [allowsCustomValue, selectedItem, isControlledValue]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (!isOpen) {
          if (e.key === "ArrowDown" || e.key === "Enter") {
            e.preventDefault();
            setIsOpen(true);
            setHighlightedIndex(0);
          }
          return;
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setHighlightedIndex((i) => Math.min(i + 1, filteredItems.length - 1));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setHighlightedIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
          e.preventDefault();
          const item = filteredItems[highlightedIndex];
          if (item && !item.isDisabled) handleSelect(item.key, item);
        } else if (e.key === "Escape") {
          e.preventDefault();
          setIsOpen(false);
        }
      },
      [isOpen, filteredItems, highlightedIndex, handleSelect]
    );

    useEffect(() => {
      if (isOpen && listRef.current) {
        const el = listRef.current.children[highlightedIndex] as HTMLElement;
        el?.scrollIntoView({ block: "nearest" });
      }
    }, [highlightedIndex, isOpen]);

    const value: AutocompleteContextValue = {
      selectedKey,
      onSelect: handleSelect,
      inputValue,
      highlightedIndex,
      setHighlightedIndex,
      isOpen,
      onOpenChange: setIsOpen,
      filteredItems,
      variant,
      size: resolvedSize,
      isDisabled,
    };

    const showList = isOpen && (filteredItems.length > 0 || !allowsCustomValue);

    return (
      <AutocompleteContext.Provider value={value}>
        <div
          ref={ref}
          className={cn("relative w-full", getStyleClasses(styleType), className)}
          {...props}
        >
          <Input
            ref={inputRef}
            label={label}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            variant={variant}
            size={resolvedSize}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            errorMessage={errorMessage}
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls="autocomplete-listbox"
            aria-activedescendant={
              showList && filteredItems[highlightedIndex]
                ? `autocomplete-item-${filteredItems[highlightedIndex].key}`
                : undefined
            }
          />
          {children}
          {showList && (
            <AutocompleteList
              ref={listRef}
              items={filteredItems}
              size={resolvedSize}
            />
          )}
        </div>
      </AutocompleteContext.Provider>
    );
  }
);

Autocomplete.displayName = "Autocomplete";

interface AutocompleteListProps {
  items: AutocompleteItemProps[];
  size: InputSize;
}

const AutocompleteList = React.forwardRef<HTMLDivElement, AutocompleteListProps>(
  ({ items, size }, ref) => {
    const {
      onSelect,
      highlightedIndex,
      setHighlightedIndex,
      onOpenChange,
      size: ctxSize,
    } = useAutocompleteContext();

    return (
      <div
        ref={ref}
        id="autocomplete-listbox"
        role="listbox"
        className={cn(
          "absolute z-50 w-full mt-1 overflow-auto rounded-lg shadow-lg border top-full left-0",
          "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700",
          "animate-in fade-in zoom-in-95 duration-150",
          sizeClasses[ctxSize]
        )}
      >
        {items.map((item, i) => (
          <div
            key={item.key}
            id={`autocomplete-item-${item.key}`}
            role="option"
            aria-selected={highlightedIndex === i}
            className={cn(
              "flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors",
              highlightedIndex === i && "bg-gray-100 dark:bg-gray-800",
              !item.isDisabled && "hover:bg-gray-100 dark:hover:bg-gray-800",
              item.isDisabled && "opacity-50 cursor-not-allowed pointer-events-none"
            )}
            onClick={() => !item.isDisabled && onSelect(item.key, item)}
            onMouseEnter={() => setHighlightedIndex(i)}
          >
            {item.startContent && (
              <span className="shrink-0">{item.startContent}</span>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {item.label}
              </div>
              {item.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {item.description}
                </p>
              )}
            </div>
            {item.endContent && (
              <span className="shrink-0 ml-auto">{item.endContent}</span>
            )}
          </div>
        ))}
      </div>
    );
  }
);

AutocompleteList.displayName = "AutocompleteList";

