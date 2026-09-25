import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  forwardRef,
} from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses, colors } from "@next-ui/theme";
import type { BaseComponentProps, ResponsiveValue } from "@next-ui/utils";
import { useResponsiveContext, resolveResponsiveValue } from "@next-ui/responsive";

type TabVariant = "solid" | "bordered" | "light" | "underlined";
type TabSize = "sm" | "md" | "lg";
type TabRadius = "none" | "sm" | "md" | "lg" | "full";
type TabOrientation = "horizontal" | "vertical";

interface TabsContextValue {
  selectedKey: string | undefined;
  onSelect: (key: string) => void;
  variant: TabVariant;
  size: TabSize;
  color: keyof typeof colors;
  orientation: TabOrientation;
  fullWidth: boolean;
  isDisabled: boolean;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tab must be used within Tabs");
  return ctx;
}

const sizeClasses: Record<TabSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

const radiusClasses: Record<TabRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export interface TabsProps
  extends Omit<BaseComponentProps<HTMLDivElement>, "color">,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {
  variant?: TabVariant;
  color?: keyof typeof colors;
  size?: ResponsiveValue<TabSize>;
  radius?: TabRadius;
  fullWidth?: boolean;
  selectedKey?: string;
  defaultSelectedKey?: string;
  onSelectionChange?: (key: string) => void;
  isDisabled?: boolean;
  orientation?: TabOrientation;
  children: React.ReactNode;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      as: Component = "div",
      className,
      styleType,
      variant = "underlined",
      color = "primary",
      size = "md",
      radius = "md",
      fullWidth = false,
      selectedKey: controlledKey,
      defaultSelectedKey,
      onSelectionChange,
      isDisabled = false,
      orientation = "horizontal",
      children,
      ...props
    },
    ref
  ) => {
    const [internalKey, setInternalKey] = useState<string | undefined>(
      defaultSelectedKey
    );
    const isControlled = controlledKey !== undefined;
    const selectedKey = isControlled ? controlledKey : internalKey;

    const { deviceType } = useResponsiveContext();
    const resolvedSize = resolveResponsiveValue(size, deviceType) ?? "md";

    const handleSelect = useCallback(
      (key: string) => {
        if (isDisabled) return;
        if (!isControlled) setInternalKey(key);
        onSelectionChange?.(key);
      },
      [isControlled, isDisabled, onSelectionChange]
    );

    const value: TabsContextValue = {
      selectedKey,
      onSelect: handleSelect,
      variant,
      size: resolvedSize,
      color,
      orientation,
      fullWidth,
      isDisabled,
    };

    const colorClasses = colors[color] ?? colors.primary;

    const variantWrapperClasses: Record<TabVariant, string> = {
      solid: cn(
        "p-1 gap-0.5",
        radiusClasses[radius],
        "bg-gray-100 dark:bg-gray-800"
      ),
      bordered: cn(
        "gap-0",
        "border-b border-gray-200 dark:border-gray-700"
      ),
      light: cn(
        "p-1 gap-1",
        radiusClasses[radius],
        "bg-gray-100/50 dark:bg-gray-800/50"
      ),
      underlined: cn(
        "gap-0",
        "border-b border-gray-200 dark:border-gray-700"
      ),
    };

    return (
      <TabsContext.Provider value={value}>
        <Component
          ref={ref}
          className={cn(
            "flex",
            orientation === "horizontal"
              ? "flex-row"
              : "flex-col",
            variantWrapperClasses[variant],
            getStyleClasses(styleType),
            fullWidth && "w-full",
            className
          )}
          data-orientation={orientation}
          {...props}
        >
          {children}
        </Component>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = "Tabs";

export interface TabProps
  extends Omit<BaseComponentProps<HTMLButtonElement>, "color">,
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      keyof BaseComponentProps
    > {
  tabKey: string;
  isDisabled?: boolean;
  children: React.ReactNode;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  (
    {
      as: Component = "button",
      className,
      tabKey,
      children,
      isDisabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const {
      selectedKey,
      onSelect,
      variant,
      size,
      color,
      orientation,
      fullWidth,
      isDisabled: tabsDisabled,
    } = useTabsContext();

    const isSelected = selectedKey === tabKey;
    const colorClasses = colors[color] ?? colors.primary;

    const variantTabClasses: Record<TabVariant, string> = {
      solid: cn(
        isSelected && cn(colorClasses.base, "text-white"),
        !isSelected && "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
      ),
      bordered: cn(
        "border-b-2 -mb-px transition-colors",
        isSelected
          ? cn(colorClasses.border, "border-current text-current font-medium")
          : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
      ),
      light: cn(
        isSelected && cn(colorClasses.base, "text-white"),
        !isSelected && "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
      ),
      underlined: cn(
        "border-b-2 -mb-px transition-colors",
        isSelected
          ? cn(colorClasses.border, "border-current text-current font-medium")
          : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
      ),
    };

    return (
      <Component
        ref={ref}
        role="tab"
        aria-selected={isSelected}
        aria-disabled={isDisabled}
        data-selected={isSelected}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-current",
          "disabled:opacity-50 disabled:pointer-events-none",
          sizeClasses[size],
          variantTabClasses[variant],
          fullWidth && "flex-1",
          className
        )}
        onClick={(e: React.MouseEvent) => {
          onClick?.(e as React.MouseEvent<HTMLButtonElement>);
          onSelect(tabKey);
        }}
        disabled={isDisabled ?? tabsDisabled}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Tab.displayName = "Tab";
