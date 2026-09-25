import type { ReactNode, ElementType } from "react";

export type UIStyle =
  | "minimal"
  | "glass"
  | "neumorphic"
  | "brutalist"
  | "bento"
  | "skeuomorphic"
  | "dark"
  | "adaptive";

export type DeviceType = "auto" | "mobile" | "tablet" | "desktop";

export type ResponsiveValue<T> = T | {
  mobile?: T;
  tablet?: T;
  desktop?: T;
};

export type GradientType =
  | "sunset"
  | "aurora"
  | "ocean"
  | "purple-glow"
  | "none";

export interface BaseComponentProps<T extends HTMLElement = HTMLElement> {
  as?: ElementType;
  className?: string;
  styleType?: UIStyle;
  variant?: string;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  gradient?: GradientType;
  deviceType?: DeviceType;
  children?: ReactNode;
}
