import React, { useMemo, useEffect, useState } from "react";
import { NextUIContext, type NextUIContextValue } from "./context";
import { ResponsiveProvider, useDeviceType } from "@next-ui/responsive";
import { lightTheme, darkTheme } from "@next-ui/theme";
import type { ThemeConfig, ThemeMode } from "@next-ui/theme";
import type { UIStyle } from "@next-ui/utils";

export interface NextUIProviderProps {
  children: React.ReactNode;
  theme?: ThemeConfig;
}

function InnerProvider({
  children,
  theme = {},
}: NextUIProviderProps) {
  const { deviceType, width } = useDeviceType();

  const resolvedMode = useResolvedMode(theme.mode ?? "system");
  const style: UIStyle = theme.style ?? "minimal";
  const tokens = resolvedMode === "dark" ? darkTheme : lightTheme;

  const contextValue = useMemo<NextUIContextValue>(
    () => ({
      theme: { ...theme, tokens },
      mode: resolvedMode,
      style,
      deviceType,
      width,
    }),
    [theme, resolvedMode, style, deviceType, width, tokens]
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", resolvedMode === "dark");

    const finalTokens = { ...tokens, ...theme.tokens };
    Object.entries(finalTokens).forEach(([key, value]) => {
      const cssVar = `--nextui-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });

    if (theme.primary) {
      root.style.setProperty("--nextui-primary", theme.primary);
    }
  }, [resolvedMode, tokens, theme]);

  return (
    <NextUIContext.Provider value={contextValue}>
      {children}
    </NextUIContext.Provider>
  );
}

export function NextUIProvider(props: NextUIProviderProps) {
  return (
    <ResponsiveProvider>
      <InnerProvider {...props} />
    </ResponsiveProvider>
  );
}

function useResolvedMode(mode: ThemeMode): "light" | "dark" {
  const [resolved, setResolved] = useState<"light" | "dark">(() => {
    if (mode !== "system") return mode;
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    if (mode !== "system") {
      setResolved(mode);
      return;
    }
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) =>
      setResolved(e.matches ? "dark" : "light");
    mql.addEventListener("change", handler);
    setResolved(mql.matches ? "dark" : "light");
    return () => mql.removeEventListener("change", handler);
  }, [mode]);

  return resolved;
}
