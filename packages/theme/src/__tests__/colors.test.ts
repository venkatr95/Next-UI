import { describe, it, expect } from "vitest";
import { colors } from "../colors";

describe("colors", () => {
  const colorKeys = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
  ] as const;

  it.each(colorKeys)("defines %s color with all required properties", (key) => {
    const color = colors[key];
    expect(color).toBeDefined();
    expect(color.base).toBeDefined();
    expect(color.hover).toBeDefined();
    expect(color.active).toBeDefined();
    expect(color.border).toBeDefined();
  });

  it("primary uses indigo classes", () => {
    expect(colors.primary.base).toContain("indigo");
  });

  it("danger uses red classes", () => {
    expect(colors.danger.base).toContain("red");
  });

  it("success uses green classes", () => {
    expect(colors.success.base).toContain("green");
  });
});
