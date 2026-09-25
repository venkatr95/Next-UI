import { useState, useEffect, useCallback } from "react";
import { breakpoints } from "./breakpoints";
import type { DeviceType } from "@next-ui/utils";

type ResolvedDeviceType = Exclude<DeviceType, "auto">;

function getDeviceType(width: number): ResolvedDeviceType {
  if (width >= breakpoints.desktop) return "desktop";
  if (width >= breakpoints.tablet) return "tablet";
  return "mobile";
}

export function useDeviceType(): {
  deviceType: ResolvedDeviceType;
  width: number;
} {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") {
      return { deviceType: "desktop" as ResolvedDeviceType, width: 1280 };
    }
    const width = window.innerWidth;
    return { deviceType: getDeviceType(width), width };
  });

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    setState({ deviceType: getDeviceType(width), width });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return state;
}
