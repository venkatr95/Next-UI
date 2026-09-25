"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { cn, type BaseComponentProps } from "@next-ui/utils";

export type DrawerPlacement = "left" | "right" | "top" | "bottom";
export type DrawerSize = "sm" | "md" | "lg" | "full";

export interface DrawerContextValue {
  isOpen: boolean;
  onClose: () => void;
  placement: DrawerPlacement;
  size: DrawerSize;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

function useDrawerContext() {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("Drawer components must be used within Drawer");
  return ctx;
}

export interface DrawerProps extends BaseComponentProps<HTMLDivElement> {
  isOpen: boolean;
  onClose?: () => void;
  placement?: DrawerPlacement;
  size?: DrawerSize;
  children: React.ReactNode;
}

const sizeClasses: Record<DrawerPlacement, Record<DrawerSize, string>> = {
  left: { sm: "w-64", md: "w-80", lg: "w-96", full: "w-full" },
  right: { sm: "w-64", md: "w-80", lg: "w-96", full: "w-full" },
  top: { sm: "h-64", md: "h-80", lg: "h-96", full: "h-full" },
  bottom: { sm: "h-64", md: "h-80", lg: "h-96", full: "h-full" },
};

const placementClasses: Record<DrawerPlacement, string> = {
  left: "left-0 top-0 h-full translate-x-0",
  right: "right-0 top-0 h-full translate-x-0",
  top: "top-0 left-0 w-full translate-y-0",
  bottom: "bottom-0 left-0 w-full translate-y-0",
};

const slideAnimations: Record<DrawerPlacement, { enter: string; exit: string }> = {
  left: {
    enter: "translate-x-0",
    exit: "-translate-x-full",
  },
  right: {
    enter: "translate-x-0",
    exit: "translate-x-full",
  },
  top: {
    enter: "translate-y-0",
    exit: "-translate-y-full",
  },
  bottom: {
    enter: "translate-y-0",
    exit: "translate-y-full",
  },
};

export function Drawer({
  isOpen,
  onClose,
  placement = "right",
  size = "md",
  className,
  children,
  ...props
}: DrawerProps) {
  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const ctx: DrawerContextValue = {
    isOpen,
    onClose: handleClose,
    placement,
    size,
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const anim = slideAnimations[placement];
  const sizeClass = sizeClasses[placement][size];

  const content = (
    <DrawerContext.Provider value={ctx}>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50"
        {...props}
      >
        <div
          className={cn(
            "fixed inset-0 bg-black/50 transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={handleClose}
          aria-hidden="true"
        />
        <div
          className={cn(
            "fixed z-10 bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700",
            placementClasses[placement],
            sizeClass,
            "transition-transform duration-300 ease-out",
            isOpen ? anim.enter : anim.exit,
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </DrawerContext.Provider>
  );

  if (typeof document !== "undefined") {
    return createPortal(content, document.body);
  }
  return content;
}

export interface DrawerHeaderProps extends BaseComponentProps<HTMLDivElement> {
  children: React.ReactNode;
}

export function DrawerHeader({ className, children, ...props }: DrawerHeaderProps) {
  const { onClose } = useDrawerContext();
  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700",
        className
      )}
      {...props}
    >
      <div className="flex-1">{children}</div>
      <button
        type="button"
        onClick={onClose}
        className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Close"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export interface DrawerBodyProps extends BaseComponentProps<HTMLDivElement> {
  children: React.ReactNode;
}

export function DrawerBody({ className, children, ...props }: DrawerBodyProps) {
  return (
    <div className={cn("px-6 py-4 overflow-y-auto flex-1", className)} {...props}>
      {children}
    </div>
  );
}

export interface DrawerFooterProps extends BaseComponentProps<HTMLDivElement> {
  children: React.ReactNode;
}

export function DrawerFooter({ className, children, ...props }: DrawerFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-200 dark:border-gray-700",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
