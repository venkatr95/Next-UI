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
import { colors } from "@next-ui/theme";

export type ToastType = "success" | "error" | "warning" | "info";
export type ToastPlacement =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

export interface ToastItem {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  type?: ToastType;
  duration?: number;
  isClosable?: boolean;
  createdAt: number;
}

export interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id" | "createdAt">) => string;
  removeToast: (id: string) => void;
  placement: ToastPlacement;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export interface ToastProviderProps extends BaseComponentProps<HTMLDivElement> {
  placement?: ToastPlacement;
  children: React.ReactNode;
}

const placementClasses: Record<ToastPlacement, string> = {
  "top-right": "top-4 right-4 flex-col",
  "top-left": "top-4 left-4 flex-col",
  "bottom-right": "bottom-4 right-4 flex-col-reverse",
  "bottom-left": "bottom-4 left-4 flex-col-reverse",
  "top-center": "top-4 left-1/2 -translate-x-1/2 flex-col",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 flex-col-reverse",
};

const typeClasses: Record<ToastType, string> = {
  success: "bg-green-500 text-white border-green-600",
  error: "bg-red-500 text-white border-red-600",
  warning: "bg-amber-500 text-white border-amber-600",
  info: "bg-blue-500 text-white border-blue-600",
};

export function ToastProvider({
  placement = "top-right",
  className,
  children,
  ...props
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addToast = useCallback(
    (toast: Omit<ToastItem, "id" | "createdAt">) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const item: ToastItem = {
        ...toast,
        id,
        duration: toast.duration ?? 5000,
        isClosable: toast.isClosable ?? true,
        createdAt: Date.now(),
      };
      setToasts((prev) => [...prev, item]);
      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const ctx: ToastContextValue = {
    toasts,
    addToast,
    removeToast,
    placement,
  };

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      {mounted
        ? createPortal(
            <ToastContainer placement={placement} toasts={toasts} removeToast={removeToast} />,
            document.body
          )
        : null}
    </ToastContext.Provider>
  );
}

interface ToastContainerProps {
  placement: ToastPlacement;
  toasts: ToastItem[];
  removeToast: (id: string) => void;
}

function ToastContainer({ placement, toasts, removeToast }: ToastContainerProps) {
  return (
    <div
      className={cn(
        "fixed z-[100] flex gap-2 pointer-events-none",
        placementClasses[placement]
      )}
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

export interface ToastProps extends BaseComponentProps<HTMLDivElement> {
  toast: ToastItem;
  onClose: () => void;
}

export function Toast({ toast, onClose, className, ...props }: ToastProps) {
  const { title, description, type = "info", duration = 5000, isClosable = true } = toast;
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (duration > 0) {
      timerRef.current = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => onClose(), 200);
      }, duration);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [duration, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(), 200);
  };

  return (
    <div
      role="alert"
      className={cn(
        "pointer-events-auto w-full max-w-sm rounded-lg border shadow-lg px-4 py-3",
        "transition-all duration-200 ease-out",
        typeClasses[type],
        isExiting ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          {title && <p className="font-semibold text-sm">{title}</p>}
          {description && (
            <p className={cn("text-sm opacity-90", title && "mt-0.5")}>{description}</p>
          )}
        </div>
        {isClosable && (
          <button
            type="button"
            onClick={handleClose}
            className="p-1 rounded hover:bg-white/20 transition-colors -mr-1 -mt-1"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
