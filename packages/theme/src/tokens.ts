import type { ThemeTokens } from "./types";

export const lightTheme: ThemeTokens = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  accent: "#f59e0b",
  background: "#ffffff",
  foreground: "#0a0a0a",
  muted: "#f4f4f5",
  mutedForeground: "#71717a",
  border: "#e4e4e7",
  ring: "#6366f1",
  radius: "0.5rem",
  shadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
};

export const darkTheme: ThemeTokens = {
  primary: "#818cf8",
  secondary: "#a78bfa",
  accent: "#fbbf24",
  background: "#09090b",
  foreground: "#fafafa",
  muted: "#27272a",
  mutedForeground: "#a1a1aa",
  border: "#27272a",
  ring: "#818cf8",
  radius: "0.5rem",
  shadow: "0 1px 3px 0 rgb(0 0 0 / 0.3)",
  success: "#4ade80",
  warning: "#fbbf24",
  danger: "#f87171",
};

export const defaultTheme = lightTheme;
