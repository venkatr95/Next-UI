"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@next-ui/utils";
import type { BaseComponentProps } from "@next-ui/utils";

export type ScrollShadowOrientation = "horizontal" | "vertical";

export interface ScrollShadowProps
  extends Omit<BaseComponentProps<HTMLDivElement>, "color">,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {
  /** Orientation of scroll and shadow */
  orientation?: ScrollShadowOrientation;
  /** Shadow size in pixels */
  size?: number;
  /** Hide the scrollbar */
  hideScrollBar?: boolean;
  /** Offset from edges in pixels */
  offset?: number;
  /** Enable/disable shadow indicators */
  isEnabled?: boolean;
  children: React.ReactNode;
}

export const ScrollShadow = React.forwardRef<HTMLDivElement, ScrollShadowProps>(
  (
    {
      orientation = "vertical",
      size = 24,
      hideScrollBar = false,
      offset = 0,
      isEnabled = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [showStartShadow, setShowStartShadow] = useState(false);
    const [showEndShadow, setShowEndShadow] = useState(false);

    const setScrollRef = (node: HTMLDivElement | null) => {
      (scrollContainerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    const updateShadows = () => {
      const el = scrollContainerRef.current;
      if (!el || !isEnabled) {
        setShowStartShadow(false);
        setShowEndShadow(false);
        return;
      }

      const isVertical = orientation === "vertical";
      const scrollSize = isVertical ? el.scrollHeight : el.scrollWidth;
      const clientSize = isVertical ? el.clientHeight : el.clientWidth;
      const scrollPos = isVertical ? el.scrollTop : el.scrollLeft;

      const hasOverflow = scrollSize > clientSize;
      const atStart = scrollPos <= offset;
      const atEnd =
        scrollPos >= scrollSize - clientSize - offset;

      setShowStartShadow(hasOverflow && !atStart);
      setShowEndShadow(hasOverflow && !atEnd);
    };

    useEffect(() => {
      const el = scrollContainerRef.current;
      if (!el) return;
      updateShadows();

      const resizeObserver = new ResizeObserver(updateShadows);
      resizeObserver.observe(el);

      el.addEventListener("scroll", updateShadows, { passive: true });
      return () => {
        resizeObserver.disconnect();
        el.removeEventListener("scroll", updateShadows);
      };
    }, [orientation, isEnabled, children]);

    const isVertical = orientation === "vertical";

    const scrollbarClass = hideScrollBar
      ? "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      : "";

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        {isEnabled && showStartShadow && (
          <div
            className={cn(
              "pointer-events-none absolute z-10 bg-gradient-to-b from-gray-200 via-gray-200/80 to-transparent dark:from-gray-800 dark:via-gray-800/80",
              isVertical
                ? "inset-x-0 top-0 h-[var(--scroll-shadow-size,24px)]"
                : "inset-y-0 left-0 w-[var(--scroll-shadow-size,24px)] bg-gradient-to-r from-gray-200 via-gray-200/80 to-transparent dark:from-gray-800 dark:via-gray-800/80"
            )}
            style={
              {
                "--scroll-shadow-size": `${size}px`,
                ...(isVertical
                  ? { height: size }
                  : {
                      width: size,
                      background:
                        "linear-gradient(to right, rgb(229 231 235), rgba(229,231,235,0.8), transparent)",
                    }),
              } as unknown as React.CSSProperties
            }
            aria-hidden
          />
        )}
        {isEnabled && showEndShadow && (
          <div
            className={cn(
              "pointer-events-none absolute z-10",
              isVertical
                ? "inset-x-0 bottom-0 bg-gradient-to-t from-gray-200 via-gray-200/80 to-transparent dark:from-gray-800 dark:via-gray-800/80"
                : "inset-y-0 right-0 bg-gradient-to-l from-gray-200 via-gray-200/80 to-transparent dark:from-gray-800 dark:via-gray-800/80"
            )}
            style={
              isVertical
                ? { height: size }
                : {
                    width: size,
                    background:
                      "linear-gradient(to left, rgb(229 231 235), rgba(229,231,235,0.8), transparent)",
                  }
            }
            aria-hidden
          />
        )}
        <div
          ref={setScrollRef}
          className={cn(
            "overflow-auto overscroll-contain",
            scrollbarClass
          )}
          style={{
            maxHeight: isVertical ? "100%" : undefined,
            maxWidth: !isVertical ? "100%" : undefined,
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

ScrollShadow.displayName = "ScrollShadow";
