import React, {
  createContext,
  useContext,
  useState,
  forwardRef,
  useCallback,
} from "react";
import { cn, type BaseComponentProps, type ResponsiveValue } from "@next-ui/utils";
import { getStyleClasses } from "@next-ui/theme";
import { useResponsiveContext, resolveResponsiveValue } from "@next-ui/responsive";

export type NavbarMaxWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "full";
export type NavbarPosition = "static" | "sticky";
export type NavbarHeight = "sm" | "md" | "lg";

const maxWidthClasses: Record<NavbarMaxWidth, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full",
};

const positionClasses: Record<NavbarPosition, string> = {
  static: "relative",
  sticky: "sticky top-0 z-50",
};

const heightClasses: Record<NavbarHeight, string> = {
  sm: "h-12",
  md: "h-14",
  lg: "h-16",
};

interface NavbarContextValue {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isBordered: boolean;
  isBlurred: boolean;
  maxWidth: NavbarMaxWidth;
  position: NavbarPosition;
  height: NavbarHeight;
  styleType?: BaseComponentProps["styleType"];
}

const NavbarContext = createContext<NavbarContextValue | null>(null);

function useNavbarContext() {
  const ctx = useContext(NavbarContext);
  if (!ctx) throw new Error("Navbar components must be used within Navbar");
  return ctx;
}

export interface NavbarProps
  extends BaseComponentProps<HTMLElement>,
    Omit<React.HTMLAttributes<HTMLElement>, keyof BaseComponentProps> {
  isBordered?: boolean;
  isBlurred?: boolean;
  maxWidth?: ResponsiveValue<NavbarMaxWidth>;
  position?: NavbarPosition;
  height?: ResponsiveValue<NavbarHeight>;
  children?: React.ReactNode;
}

export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  (
    {
      as: Component = "nav",
      className,
      styleType,
      isBordered = false,
      isBlurred = false,
      maxWidth = "xl",
      position = "sticky",
      height = "md",
      children,
      ...props
    },
    ref
  ) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { deviceType } = useResponsiveContext();
    const resolvedMaxWidth = resolveResponsiveValue(maxWidth, deviceType) ?? "xl";
    const resolvedHeight = resolveResponsiveValue(height, deviceType) ?? "md";

    const value: NavbarContextValue = {
      isMenuOpen,
      setIsMenuOpen,
      isBordered,
      isBlurred,
      maxWidth: resolvedMaxWidth,
      position,
      height: resolvedHeight,
      styleType,
    };

    return (
      <NavbarContext.Provider value={value}>
        <Component
          ref={ref as React.Ref<HTMLDivElement>}
          className={cn(
            "w-full flex items-center justify-center",
            positionClasses[position as NavbarPosition],
            isBlurred && "backdrop-blur-md",
            getStyleClasses(styleType),
            !styleType && "bg-white/80 dark:bg-gray-900/80",
            isBordered && "border-b border-gray-200 dark:border-gray-700",
            heightClasses[resolvedHeight as NavbarHeight],
            className
          )}
          {...(props as React.HTMLAttributes<HTMLDivElement>)}
        >
          <div
            className={cn(
              "w-full flex items-center",
              maxWidthClasses[resolvedMaxWidth],
              "mx-auto px-4"
            )}
          >
            {children}
          </div>
        </Component>
      </NavbarContext.Provider>
    );
  }
);
Navbar.displayName = "Navbar";

export interface NavbarBrandProps
  extends BaseComponentProps<HTMLDivElement>,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {}

export const NavbarBrand = forwardRef<HTMLDivElement, NavbarBrandProps>(
  ({ as: Component = "div", className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("flex items-center gap-2 shrink-0", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
NavbarBrand.displayName = "NavbarBrand";

export interface NavbarContentProps
  extends BaseComponentProps<HTMLDivElement>,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {
  justify?: "start" | "center" | "end" | "between";
}

export const NavbarContent = forwardRef<HTMLDivElement, NavbarContentProps>(
  (
    {
      as: Component = "div",
      className,
      justify = "center",
      children,
      ...props
    },
    ref
  ) => {
    const justifyClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    };
    return (
      <Component
        ref={ref}
        className={cn(
          "flex items-center gap-4 flex-1",
          justifyClasses[justify as keyof typeof justifyClasses],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
NavbarContent.displayName = "NavbarContent";

export interface NavbarItemProps
  extends BaseComponentProps<HTMLDivElement>,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {}

export const NavbarItem = forwardRef<HTMLDivElement, NavbarItemProps>(
  ({ as: Component = "div", className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("flex items-center", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
NavbarItem.displayName = "NavbarItem";

export interface NavbarMenuToggleProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof BaseComponentProps
  > {
  className?: string;
  "aria-label"?: string;
}

export const NavbarMenuToggle = forwardRef<
  HTMLButtonElement,
  NavbarMenuToggleProps
>(({ className, "aria-label": ariaLabel = "Toggle menu", ...props }, ref) => {
  const { isMenuOpen, setIsMenuOpen } = useNavbarContext();
  const toggle = useCallback(() => setIsMenuOpen(!isMenuOpen), [isMenuOpen, setIsMenuOpen]);

  return (
    <button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      aria-expanded={isMenuOpen}
      onClick={toggle}
      className={cn(
        "md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
        className
      )}
      {...props}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {isMenuOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
});
NavbarMenuToggle.displayName = "NavbarMenuToggle";

export interface NavbarMenuProps
  extends BaseComponentProps<HTMLDivElement>,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {}

export const NavbarMenu = forwardRef<HTMLDivElement, NavbarMenuProps>(
  ({ as: Component = "div", className, children, ...props }, ref) => {
    const { isMenuOpen } = useNavbarContext();

    return (
      <Component
        ref={ref}
        data-open={isMenuOpen}
        className={cn(
          "md:flex hidden items-center gap-4",
          "md:flex-row md:static md:bg-transparent md:border-0 md:shadow-none",
          "absolute left-0 right-0 top-full mt-0 flex-col bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg",
          "overflow-hidden transition-all duration-200",
          isMenuOpen ? "flex max-h-[80vh] py-4" : "hidden md:flex",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
NavbarMenu.displayName = "NavbarMenu";

export interface NavbarMenuItemProps
  extends BaseComponentProps<HTMLLIElement>,
    Omit<React.HTMLAttributes<HTMLLIElement>, keyof BaseComponentProps> {}

export const NavbarMenuItem = forwardRef<HTMLLIElement, NavbarMenuItemProps>(
  ({ as: Component = "li", className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("list-none", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
NavbarMenuItem.displayName = "NavbarMenuItem";
