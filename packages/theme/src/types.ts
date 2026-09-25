import type { UIStyle } from "@next-ui/utils";

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeTokens {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  ring: string;
  radius: string;
  shadow: string;
  success: string;
  warning: string;
  danger: string;
}

export interface ThemeConfig {
  mode?: ThemeMode;
  style?: UIStyle;
  primary?: string;
  tokens?: Partial<ThemeTokens>;
}
