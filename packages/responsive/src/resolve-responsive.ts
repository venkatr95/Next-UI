import type { ResponsiveValue, DeviceType } from "@next-ui/utils";

type ResolvedDeviceType = Exclude<DeviceType, "auto">;

export function resolveResponsiveValue<T>(
  value: ResponsiveValue<T> | undefined,
  deviceType: ResolvedDeviceType
): T | undefined {
  if (value === undefined) return undefined;

  if (typeof value !== "object" || value === null || !("mobile" in value || "tablet" in value || "desktop" in value)) {
    return value as T;
  }

  const responsive = value as { mobile?: T; tablet?: T; desktop?: T };
  return responsive[deviceType] ?? responsive.desktop ?? responsive.tablet ?? responsive.mobile;
}
