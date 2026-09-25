"use client";

import React, { useState, useCallback } from "react";
import { cn } from "@next-ui/utils";
import { Skeleton } from "@next-ui/skeleton";
import type { BaseComponentProps } from "@next-ui/utils";

type ImageRadius = "none" | "sm" | "md" | "lg" | "full";
type ImageShadow = "none" | "sm" | "md" | "lg";
type ImageLoading = "lazy" | "eager";

const radiusClasses: Record<ImageRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const shadowClasses: Record<ImageShadow, string> = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "loading" | "color">,
    BaseComponentProps<HTMLImageElement> {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  radius?: ImageRadius;
  shadow?: ImageShadow;
  isBlurred?: boolean;
  isZoomed?: boolean;
  fallbackSrc?: string;
  loading?: ImageLoading;
  disableSkeleton?: boolean;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      radius = "md",
      shadow = "none",
      isBlurred = false,
      isZoomed = false,
      fallbackSrc,
      loading = "lazy",
      disableSkeleton = false,
      className,
      onLoad,
      onError,
      ...props
    },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);

    const handleLoad = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        setIsLoaded(true);
        setHasError(false);
        onLoad?.(e);
      },
      [onLoad]
    );

    const handleError = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (fallbackSrc && currentSrc === src) {
          setCurrentSrc(fallbackSrc);
          setHasError(false);
        } else {
          setHasError(true);
        }
        onError?.(e);
      },
      [fallbackSrc, currentSrc, src, onError]
    );

    const dimensionStyle: React.CSSProperties = {
      ...(width !== undefined && {
        width: typeof width === "number" ? `${width}px` : width,
      }),
      ...(height !== undefined && {
        height: typeof height === "number" ? `${height}px` : height,
      }),
    };

    return (
      <div
        className={cn(
          "relative overflow-hidden inline-block",
          radiusClasses[radius],
          shadowClasses[shadow],
          isBlurred && "bg-gray-200 dark:bg-gray-700",
          isZoomed && "overflow-visible",
          className
        )}
        style={dimensionStyle}
      >
        {!disableSkeleton && !isLoaded && !hasError && (
          <Skeleton
            className={cn(
              "absolute inset-0 w-full h-full",
              radiusClasses[radius]
            )}
            variant="rectangular"
          />
        )}
        {!hasError ? (
          <img
            ref={ref}
            src={currentSrc}
            alt={alt}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              "block w-full h-full object-cover transition-all duration-300",
              radiusClasses[radius],
              isBlurred && "backdrop-blur-sm",
              isZoomed && "hover:scale-110",
              !isLoaded && "opacity-0"
            )}
            style={{ ...dimensionStyle, objectFit: "cover" }}
            {...props}
          />
        ) : (
          <div
            className={cn(
              "flex items-center justify-center w-full h-full min-h-[80px] bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm",
              radiusClasses[radius]
            )}
          >
            Failed to load
          </div>
        )}
      </div>
    );
  }
);

Image.displayName = "Image";
