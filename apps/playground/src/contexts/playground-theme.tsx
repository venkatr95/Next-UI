"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import type { ThemeConfig } from "@next-ui/theme";
import type { UIStyle, GradientType } from "@next-ui/utils";

type ThemeMode = "light" | "dark";
type DeviceSize = "mobile" | "tablet" | "desktop";

interface PlaygroundThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  styleType: UIStyle;
  setStyleType: (style: UIStyle) => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  gradient: Exclude<GradientType, "none">;
  setGradient: (g: Exclude<GradientType, "none">) => void;
  deviceSize: DeviceSize;
  setDeviceSize: (size: DeviceSize) => void;
  themeConfig: ThemeConfig;
}

const PlaygroundThemeContext = createContext<PlaygroundThemeContextValue | null>(null);

const STYLE_OPTIONS: UIStyle[] = [
  "minimal",
  "glass",
  "neumorphic",
  "brutalist",
  "bento",
  "skeuomorphic",
  "dark",
  "adaptive",
];

const PRESET_COLORS = [
  "#6366f1", // indigo
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#f43f5e", // rose
  "#f97316", // orange
  "#22c55e", // green
  "#06b6d4", // cyan
  "#3b82f6", // blue
];

export function PlaygroundThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [styleType, setStyleType] = useState<UIStyle>("minimal");
  const [primaryColor, setPrimaryColor] = useState("#6366f1");
  const [gradient, setGradient] = useState<Exclude<GradientType, "none">>("ocean");
  const [deviceSize, setDeviceSize] = useState<DeviceSize>("desktop");

  const themeConfig = useMemo<ThemeConfig>(
    () => ({
      mode,
      style: styleType,
      primary: primaryColor,
    }),
    [mode, styleType, primaryColor]
  );

  const value = useMemo<PlaygroundThemeContextValue>(
    () => ({
      mode,
      setMode,
      styleType,
      setStyleType,
      primaryColor,
      setPrimaryColor,
      gradient,
      setGradient,
      deviceSize,
      setDeviceSize,
      themeConfig,
    }),
    [mode, styleType, primaryColor, gradient, deviceSize, themeConfig]
  );

  return (
    <PlaygroundThemeContext.Provider value={value}>
      {children}
    </PlaygroundThemeContext.Provider>
  );
}

export function usePlaygroundTheme() {
  const ctx = useContext(PlaygroundThemeContext);
  if (!ctx) throw new Error("usePlaygroundTheme must be used within PlaygroundThemeProvider");
  return ctx;
}

export { STYLE_OPTIONS, PRESET_COLORS };
