import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen, act } from "../../../../test/test-utils";
import { Tooltip } from "../tooltip";

describe("Tooltip", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not show tooltip content by default", () => {
    render(
      <Tooltip content="Tip text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows tooltip on mouse enter after delay", async () => {
    render(
      <Tooltip content="Tip text" delay={100}>
        <button>Hover me</button>
      </Tooltip>
    );
    const trigger = screen.getByText("Hover me").parentElement!;

    act(() => {
      trigger.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(screen.getByRole("tooltip")).toHaveTextContent("Tip text");
  });

  it("hides tooltip on mouse leave", () => {
    render(
      <Tooltip content="Tip" delay={0}>
        <button>Hover</button>
      </Tooltip>
    );
    const trigger = screen.getByText("Hover").parentElement!;

    act(() => {
      trigger.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
      vi.advanceTimersByTime(0);
    });

    act(() => {
      trigger.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
    });

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <Tooltip content="Tip">
        <button>Button</button>
      </Tooltip>
    );
    expect(screen.getByText("Button")).toBeInTheDocument();
  });
});
