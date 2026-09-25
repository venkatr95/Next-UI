import React, { createContext, useContext, useMemo } from "react";
import { useDeviceType } from "./use-device-type";
import type { DeviceType } from "@next-ui/utils";

type ResolvedDeviceType = Exclude<DeviceType, "auto">;

interface ResponsiveContextValue {
  deviceType: ResolvedDeviceType;
  width: number;
}

const ResponsiveContext = createContext<ResponsiveContextValue>({
  deviceType: "desktop",
  width: 1280,
});

export function ResponsiveProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { deviceType, width } = useDeviceType();
  const value = useMemo(() => ({ deviceType, width }), [deviceType, width]);

  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  );
}

export function useResponsiveContext() {
  return useContext(ResponsiveContext);
}
