import { describe, it, expect } from "vitest";
import { resolveResponsiveValue } from "../resolve-responsive";

describe("resolveResponsiveValue", () => {
  it("returns plain value as-is", () => {
    expect(resolveResponsiveValue("md", "desktop")).toBe("md");
  });

  it("returns undefined for undefined input", () => {
    expect(resolveResponsiveValue(undefined, "desktop")).toBeUndefined();
  });

  it("resolves responsive object by device type", () => {
    const value = { mobile: "sm", tablet: "md", desktop: "lg" };
    expect(resolveResponsiveValue(value, "mobile")).toBe("sm");
    expect(resolveResponsiveValue(value, "tablet")).toBe("md");
    expect(resolveResponsiveValue(value, "desktop")).toBe("lg");
  });

  it("falls back to desktop when device key is missing", () => {
    const value = { desktop: "lg" };
    expect(resolveResponsiveValue(value, "mobile")).toBe("lg");
  });

  it("falls back through tablet then mobile", () => {
    const value = { mobile: "sm" };
    expect(resolveResponsiveValue(value, "tablet")).toBe("sm");
  });

  it("handles numeric responsive values", () => {
    const value = { mobile: 4, tablet: 8, desktop: 12 };
    expect(resolveResponsiveValue(value, "mobile")).toBe(4);
  });

  it("handles boolean responsive values", () => {
    const value = { mobile: true, desktop: false };
    expect(resolveResponsiveValue(value, "mobile")).toBe(true);
    expect(resolveResponsiveValue(value, "desktop")).toBe(false);
  });
});
