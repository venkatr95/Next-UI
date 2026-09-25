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
import { cn, type BaseComponentProps, type UIStyle } from "@next-ui/utils";
import { getStyleClasses } from "@next-ui/theme";

export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";
export type ModalPlacement = "auto" | "center" | "top" | "bottom";
export type ModalBackdrop = "transparent" | "opaque" | "blur";
export type ModalScrollBehavior = "inside" | "outside";

export interface ModalContextValue {
  isOpen: boolean;
  onClose: () => void;
  size: ModalSize;
  placement: ModalPlacement;
  styleType?: UIStyle;
  hideCloseButton?: boolean;
  scrollBehavior?: ModalScrollBehavior;
}

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("Modal components must be used within Modal");
  return ctx;
}

export interface ModalProps extends BaseComponentProps<HTMLDivElement> {
  isOpen: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  size?: ModalSize;
  placement?: ModalPlacement;
  backdrop?: ModalBackdrop;
  isDismissable?: boolean;
  hideCloseButton?: boolean;
  scrollBehavior?: ModalScrollBehavior;
  styleType?: UIStyle;
  children: React.ReactNode;
}

const sizeClasses: Record<ModalSize, string> = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full w-full mx-4",
};

const placementClasses: Record<ModalPlacement, string> = {
  auto: "items-center justify-center",
  center: "items-center justify-center",
  top: "items-start justify-center pt-8",
  bottom: "items-end justify-center pb-8",
};

const backdropClasses: Record<ModalBackdrop, string> = {
  transparent: "bg-transparent",
  opaque: "bg-black/50",
  blur: "bg-black/30 backdrop-blur-sm",
};

export function Modal({
  isOpen,
  onClose,
  onOpenChange,
  size = "md",
  placement = "center",
  backdrop = "opaque",
  isDismissable = true,
  hideCloseButton = false,
  scrollBehavior = "inside",
  styleType,
  className,
  children,
  ...props
}: ModalProps) {
  const handleClose = useCallback(() => {
    onClose?.();
    onOpenChange?.(false);
  }, [onClose, onOpenChange]);

  const ctx: ModalContextValue = {
    isOpen,
    onClose: handleClose,
    size,
    placement,
    styleType,
    hideCloseButton,
    scrollBehavior,
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDismissable) handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDismissable, handleClose]);

  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen || !contentRef.current) return;
    const focusable = contentRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0] as HTMLElement | undefined;
    first?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const content = (
    <ModalContext.Provider value={ctx}>
      <div
        role="dialog"
        aria-modal="true"
        className={cn("fixed inset-0 z-50 flex", placementClasses[placement])}
        {...props}
      >
        <div
          className={cn(
            "fixed inset-0 transition-opacity duration-200",
            backdropClasses[backdrop],
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={isDismissable ? handleClose : undefined}
          aria-hidden="true"
        />
        <div
          ref={contentRef}
          className={cn(
            "relative z-10 w-full mx-4 transition-all duration-200 ease-out",
            sizeClasses[size],
            scrollBehavior === "inside" ? "max-h-[90vh] overflow-hidden flex flex-col" : "",
            "opacity-0 scale-95 animate-in fade-in zoom-in-95 duration-200"
          )}
          style={{
            animation: "modalEnter 0.2s ease-out forwards",
          }}
        >
          <style>{`
            @keyframes modalEnter {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
          <div
            className={cn(
              "rounded-xl shadow-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700",
              getStyleClasses(styleType),
              scrollBehavior === "inside" && "flex flex-col max-h-[90vh]",
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </div>
    </ModalContext.Provider>
  );

  if (typeof document !== "undefined") {
    return createPortal(content, document.body);
  }
  return content;
}

export interface ModalContentProps extends BaseComponentProps<HTMLDivElement> {
  children: React.ReactNode;
}

export function ModalContent({ className, children, ...props }: ModalContentProps) {
  return (
    <div
      className={cn("flex flex-col", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface ModalHeaderProps extends BaseComponentProps<HTMLDivElement> {
  children: React.ReactNode;
}

export function ModalHeader({ className, children, ...props }: ModalHeaderProps) {
  const { onClose, hideCloseButton } = useModalContext();
  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700",
        className
      )}
      {...props}
    >
      <div className="flex-1">{children}</div>
      {!hideCloseButton && (
        <button
          type="button"
          onClick={onClose}
          className="ml-4 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export interface ModalBodyProps extends BaseComponentProps<HTMLDivElement> {
  children: React.ReactNode;
}

export function ModalBody({ className, children, ...props }: ModalBodyProps) {
  return (
    <div
      className={cn("px-6 py-4 overflow-y-auto flex-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface ModalFooterProps extends BaseComponentProps<HTMLDivElement> {
  children: React.ReactNode;
}

export function ModalFooter({ className, children, ...props }: ModalFooterProps) {
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
