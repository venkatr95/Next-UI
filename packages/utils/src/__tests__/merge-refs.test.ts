import { describe, it, expect, vi } from "vitest";
import { mergeRefs } from "../merge-refs";

describe("mergeRefs", () => {
  it("calls all callback refs with the value", () => {
    const ref1 = vi.fn();
    const ref2 = vi.fn();
    const merged = mergeRefs(ref1, ref2);

    const node = document.createElement("div");
    merged(node);

    expect(ref1).toHaveBeenCalledWith(node);
    expect(ref2).toHaveBeenCalledWith(node);
  });

  it("sets object refs", () => {
    const ref1 = { current: null };
    const ref2 = { current: null };
    const merged = mergeRefs(ref1, ref2);

    const node = document.createElement("div");
    merged(node);

    expect(ref1.current).toBe(node);
    expect(ref2.current).toBe(node);
  });

  it("handles mixed callback and object refs", () => {
    const callbackRef = vi.fn();
    const objectRef = { current: null };
    const merged = mergeRefs(callbackRef, objectRef);

    const node = document.createElement("div");
    merged(node);

    expect(callbackRef).toHaveBeenCalledWith(node);
    expect(objectRef.current).toBe(node);
  });

  it("skips undefined refs", () => {
    const ref1 = vi.fn();
    const merged = mergeRefs(undefined, ref1, undefined);

    const node = document.createElement("div");
    merged(node);

    expect(ref1).toHaveBeenCalledWith(node);
  });
});
