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

export type PopoverPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export type PopoverTriggerType = "press" | "hover";

export interface PopoverContextValue {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  placement: PopoverPlacement;
  offset: number;
  triggerType: PopoverTriggerType;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

export function usePopoverContext() {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error("Popover components must be used within Popover");
  return ctx;
}

export interface PopoverProps extends BaseComponentProps<HTMLDivElement> {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: PopoverPlacement;
  offset?: number;
  triggerType?: PopoverTriggerType;
  children: React.ReactNode;
}

export function Popover({
  isOpen: controlledOpen,
  onOpenChange,
  placement = "bottom",
  offset = 8,
  triggerType = "press",
  className,
  children,
  ...props
}: PopoverProps) {
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
  const contentRef = useRef<HTMLDivElement | null>(null);

  const ctx: PopoverContextValue = {
    isOpen,
    onOpenChange: setOpen,
    triggerRef,
    contentRef,
    placement,
    offset,
    triggerType,
  };

  return (
    <PopoverContext.Provider value={ctx}>
      <div className={cn("relative inline-block", className)} {...props}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

export interface PopoverTriggerProps extends BaseComponentProps<HTMLDivElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

export function PopoverTrigger({
  asChild,
  className,
  children,
  ...props
}: PopoverTriggerProps) {
  const { onOpenChange, isOpen, triggerType, triggerRef } = usePopoverContext();

  const handleClick = useCallback(() => {
    if (triggerType === "press") onOpenChange(!isOpen);
  }, [triggerType, onOpenChange, isOpen]);

  const handleMouseEnter = useCallback(() => {
    if (triggerType === "hover") onOpenChange(true);
  }, [triggerType, onOpenChange]);

  const handleMouseLeave = useCallback(() => {
    if (triggerType === "hover") onOpenChange(false);
  }, [triggerType, onOpenChange]);

  const eventHandlers =
    triggerType === "press"
      ? { onClick: handleClick }
      : { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ ref?: React.Ref<HTMLElement> }>, {
      ref: (el: HTMLElement) => {
        (triggerRef as React.MutableRefObject<HTMLElement | null>).current = el;
        const childRef = (children as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref;
        if (typeof childRef === "function") childRef(el);
        else if (childRef) (childRef as React.MutableRefObject<HTMLElement | null>).current = el;
      },
      ...eventHandlers,
    });
  }

  return (
    <div
      ref={triggerRef as React.RefObject<HTMLDivElement>}
      className={cn("inline-block", className)}
      {...eventHandlers}
      {...props}
    >
      {children}
    </div>
  );
}

export interface PopoverContentProps extends BaseComponentProps<HTMLDivElement> {
  children: React.ReactNode;
}

export function PopoverContent({
  className,
  children,
  ...props
}: PopoverContentProps) {
  const {
    isOpen,
    onOpenChange,
    triggerRef,
    contentRef,
    placement,
    offset,
  } = usePopoverContext();

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        contentRef.current &&
        !contentRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        onOpenChange(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onOpenChange, contentRef, triggerRef]);

  useEffect(() => {
    if (!isOpen || !contentRef.current || !triggerRef.current) return;
    const trigger = triggerRef.current.getBoundingClientRect();
    const content = contentRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    const parts = placement.split("-");
    const pos = parts[0] as "top" | "bottom" | "left" | "right";
    const align = parts[1];
    const alignStart = align === "start";
    const alignEnd = align === "end";

    switch (pos) {
      case "top":
        top = trigger.top - content.height - offset;
        left = alignStart ? trigger.left : alignEnd ? trigger.right - content.width : trigger.left + (trigger.width - content.width) / 2;
        break;
      case "bottom":
        top = trigger.bottom + offset;
        left = alignStart ? trigger.left : alignEnd ? trigger.right - content.width : trigger.left + (trigger.width - content.width) / 2;
        break;
      case "left":
        left = trigger.left - content.width - offset;
        top = alignStart ? trigger.top : alignEnd ? trigger.bottom - content.height : trigger.top + (trigger.height - content.height) / 2;
        break;
      case "right":
        left = trigger.right + offset;
        top = alignStart ? trigger.top : alignEnd ? trigger.bottom - content.height : trigger.top + (trigger.height - content.height) / 2;
        break;
      default:
        top = trigger.bottom + offset;
        left = trigger.left + (trigger.width - content.width) / 2;
    }

    contentRef.current.style.position = "fixed";
    contentRef.current.style.top = `${top}px`;
    contentRef.current.style.left = `${left}px`;
  }, [isOpen, placement, offset, contentRef, triggerRef]);

  if (!isOpen) return null;

  const contentEl = (
    <div
      ref={contentRef}
      role="dialog"
      className={cn(
        "z-50 rounded-lg shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 py-2 min-w-[8rem]",
        "animate-in fade-in zoom-in-95 duration-150",
        className
      )}
      style={{ position: "fixed" as const }}
      {...props}
    >
      {children}
    </div>
  );

  if (typeof document !== "undefined") {
    return createPortal(contentEl, document.body);
  }
  return contentEl;
}
