import { describe, it, expect } from "vitest";
import { getStyleClasses } from "../styles";

describe("getStyleClasses", () => {
  it("returns empty string for undefined", () => {
    expect(getStyleClasses(undefined)).toBe("");
  });

  it("returns empty string for minimal", () => {
    expect(getStyleClasses("minimal")).toBe("");
  });

  it("returns glass classes", () => {
    const result = getStyleClasses("glass");
    expect(result).toContain("backdrop-blur");
    expect(result).toContain("bg-white/10");
  });

  it("returns neumorphic classes", () => {
    const result = getStyleClasses("neumorphic");
    expect(result).toContain("shadow-");
  });

  it("returns brutalist classes", () => {
    const result = getStyleClasses("brutalist");
    expect(result).toContain("border-2");
    expect(result).toContain("border-black");
  });

  it("returns bento classes", () => {
    const result = getStyleClasses("bento");
    expect(result).toContain("rounded-2xl");
  });

  it("returns dark classes", () => {
    const result = getStyleClasses("dark");
    expect(result).toContain("bg-gray-900");
  });

  it("returns empty string for adaptive", () => {
    expect(getStyleClasses("adaptive")).toBe("");
  });
});
