import { describe, it, expect, vi } from "vitest";
import { callAllHandlers } from "../call-all-handlers";

describe("callAllHandlers", () => {
  it("calls all provided handlers", () => {
    const h1 = vi.fn();
    const h2 = vi.fn();
    const combined = callAllHandlers(h1, h2);

    combined("arg1");

    expect(h1).toHaveBeenCalledWith("arg1");
    expect(h2).toHaveBeenCalledWith("arg1");
  });

  it("skips undefined handlers", () => {
    const h1 = vi.fn();
    const combined = callAllHandlers(undefined, h1, undefined);

    combined("arg");

    expect(h1).toHaveBeenCalledWith("arg");
  });

  it("passes multiple arguments", () => {
    const handler = vi.fn();
    const combined = callAllHandlers(handler);

    combined("a", "b");

    expect(handler).toHaveBeenCalledWith("a", "b");
  });

  it("returns undefined", () => {
    const combined = callAllHandlers(vi.fn());
    expect(combined("x")).toBeUndefined();
  });
});
