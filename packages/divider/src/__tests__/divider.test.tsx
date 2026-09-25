import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "../../../../test/test-utils";
import { Divider } from "../divider";

describe("Divider", () => {
  it("renders horizontal separator by default", () => {
    render(<Divider />);
    const sep = screen.getByRole("separator");
    expect(sep).toBeInTheDocument();
    expect(sep).toHaveAttribute("aria-orientation", "horizontal");
    expect(sep.tagName).toBe("HR");
  });

  it("renders vertical separator", () => {
    render(<Divider orientation="vertical" />);
    const sep = screen.getByRole("separator");
    expect(sep).toHaveAttribute("aria-orientation", "vertical");
    expect(sep.tagName).toBe("DIV");
  });

  it("applies custom className", () => {
    render(<Divider className="my-divider" />);
    expect(screen.getByRole("separator")).toHaveClass("my-divider");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Divider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
