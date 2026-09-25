"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { cn, type BaseComponentProps } from "@next-ui/utils";

export type DropdownItemColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

export interface DropdownContextValue {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("Dropdown components must be used within Dropdown");
  return ctx;
}

export interface DropdownProps extends BaseComponentProps<HTMLDivElement> {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dropdown({
  isOpen: controlledOpen,
  onOpenChange,
  className,
  children,
  ...props
}: DropdownProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (open: boolean) => {
      if (!isControlled) setUncontrolledOpen(open);
      onOpenChange?.(open);
    },
    [isControlled, onOpenChange]
  );

  const triggerRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const ctx: DropdownContextValue = {
    isOpen,
    onOpenChange: setOpen,
    triggerRef,
    menuRef,
  };

  return (
    <DropdownContext.Provider value={ctx}>
      <div className={cn("relative inline-block", className)} {...props}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export interface DropdownTriggerProps extends BaseComponentProps<HTMLDivElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

export function DropdownTrigger({
  asChild,
  className,
  children,
  ...props
}: DropdownTriggerProps) {
  const { onOpenChange, isOpen, triggerRef } = useDropdownContext();

  const handleClick = useCallback(() => {
    onOpenChange(!isOpen);
  }, [onOpenChange, isOpen]);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ ref?: React.Ref<HTMLElement>; onClick?: () => void }>, {
      ref: (el: HTMLElement) => {
        (triggerRef as React.MutableRefObject<HTMLElement | null>).current = el;
        const childRef = (children as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref;
        if (typeof childRef === "function") childRef(el);
        else if (childRef) (childRef as React.MutableRefObject<HTMLElement | null>).current = el;
      },
      onClick: handleClick,
    });
  }

  return (
    <div
      ref={triggerRef as React.RefObject<HTMLDivElement>}
      className={cn("inline-block cursor-pointer", className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
}

export interface DropdownMenuProps extends BaseComponentProps<HTMLDivElement> {
  children: React.ReactNode;
}

export function DropdownMenu({ className, children, ...props }: DropdownMenuProps) {
  const { isOpen, onOpenChange, triggerRef, menuRef } = useDropdownContext();

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        onOpenChange(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onOpenChange, menuRef, triggerRef]);

  useEffect(() => {
    if (!isOpen || !menuRef.current || !triggerRef.current) return;
    const trigger = triggerRef.current.getBoundingClientRect();
    menuRef.current.style.position = "fixed";
    menuRef.current.style.top = `${trigger.bottom + 4}px`;
    menuRef.current.style.left = `${trigger.left}px`;
    menuRef.current.style.minWidth = `${trigger.width}px`;
  }, [isOpen, menuRef, triggerRef]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onOpenChange(false);
        return;
      }
      const menu = menuRef.current;
      if (!menu) return;
      const items = Array.from(
        menu.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])')
      ) as HTMLElement[];
      const currentIndex = items.indexOf(document.activeElement as HTMLElement);

      if (e.key === "ArrowDown" && currentIndex < items.length - 1) {
        e.preventDefault();
        items[currentIndex + 1]?.focus();
      } else if (e.key === "ArrowUp" && currentIndex > 0) {
        e.preventDefault();
        items[currentIndex - 1]?.focus();
      } else if (e.key === "ArrowDown" && currentIndex === -1 && items[0]) {
        e.preventDefault();
        items[0].focus();
      } else if (e.key === "ArrowUp" && currentIndex === -1 && items.length > 0) {
        e.preventDefault();
        items[items.length - 1].focus();
      }
    },
    [isOpen, onOpenChange, menuRef]
  );

  if (!isOpen) return null;

  const menuContent = (
    <div
      ref={menuRef}
      role="menu"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className={cn(
        "absolute z-50 mt-1 min-w-[8rem] rounded-lg py-1 shadow-lg",
        "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700",
        "animate-in fade-in zoom-in-95 duration-150",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );

  if (typeof document !== "undefined") {
    return createPortal(menuContent, document.body);
  }
  return menuContent;
}

export interface DropdownItemProps extends BaseComponentProps<HTMLDivElement> {
  key?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  description?: React.ReactNode;
  isDisabled?: boolean;
  color?: DropdownItemColor;
  onPress?: () => void;
  children?: React.ReactNode;
}

const itemColorClasses: Record<DropdownItemColor, string> = {
  default: "text-gray-700 dark:text-gray-200",
  primary: "text-indigo-600 dark:text-indigo-400",
  secondary: "text-violet-600 dark:text-violet-400",
  success: "text-green-600 dark:text-green-400",
  warning: "text-amber-600 dark:text-amber-400",
  danger: "text-red-600 dark:text-red-400",
};

export function DropdownItem({
  startContent,
  endContent,
  description,
  isDisabled = false,
  color = "default",
  onPress,
  className,
  children,
  ...props
}: DropdownItemProps) {
  const { onOpenChange } = useDropdownContext();

  const handleClick = useCallback(() => {
    if (isDisabled) return;
    onPress?.();
    onOpenChange(false);
  }, [isDisabled, onPress, onOpenChange]);

  return (
    <div
      role="menuitem"
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer outline-none",
        "hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
        isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
        itemColorClasses[color],
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
    </div>
  );
}

export interface DropdownSectionProps extends BaseComponentProps<HTMLDivElement> {
  title?: React.ReactNode;
  children: React.ReactNode;
}

export function DropdownSection({
  title,
  className,
  children,
  ...props
}: DropdownSectionProps) {
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
