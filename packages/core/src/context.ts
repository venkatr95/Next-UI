import { createContext as createCtx, useContext } from "react";
import type { UIStyle, DeviceType } from "@next-ui/utils";
import type { ThemeConfig, ThemeMode } from "@next-ui/theme";

export interface NextUIContextValue {
  theme: ThemeConfig;
  mode: ThemeMode;
  style: UIStyle;
  deviceType: Exclude<DeviceType, "auto">;
  width: number;
}

export const NextUIContext = createCtx<NextUIContextValue | null>(null);

export function useNextUI(): NextUIContextValue {
  const context = useContext(NextUIContext);
  if (!context) {
    throw new Error("useNextUI must be used within a NextUIProvider");
  }
  return context;
}
