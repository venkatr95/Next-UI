"use client";

import * as React from "react";
import { cn, type BaseComponentProps } from "@next-ui/utils";
import { Avatar } from "@next-ui/avatar";

export interface AvatarPropsConfig {
  src?: string | null;
  alt?: string;
  fallback?: string;
}

export interface UserProps extends BaseComponentProps<HTMLDivElement> {
  name?: React.ReactNode;
  description?: React.ReactNode;
  avatarProps?: AvatarPropsConfig;
  className?: string;
}

export const User = React.forwardRef<HTMLDivElement, UserProps>(
  ({ name, description, avatarProps, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-3",
          className
        )}
        {...props}
      >
        <Avatar
          src={avatarProps?.src}
          alt={avatarProps?.alt ?? (typeof name === "string" ? name : "")}
          fallback={avatarProps?.fallback ?? (typeof name === "string" ? name : undefined)}
          size="md"
        />
        <div className="flex flex-col min-w-0">
          {name && (
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {name}
            </span>
          )}
          {description && (
            <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {description}
            </span>
          )}
        </div>
      </div>
    );
  }
);

User.displayName = "User";
