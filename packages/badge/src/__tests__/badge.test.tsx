import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "../../../../test/test-utils";
import { Badge } from "../badge";

describe("Badge", () => {
  it("renders content", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders content prop", () => {
    render(<Badge content="5" />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders dot variant with dot element", () => {
    const { container } = render(<Badge variant="dot">Status</Badge>);
    const dot = container.querySelector('[aria-hidden="true"]');
    expect(dot).toBeInTheDocument();
  });

  it("applies outline variant classes", () => {
    render(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText("Outline").className).toContain("border-2");
  });

  it("applies custom className", () => {
    render(<Badge className="custom">Badge</Badge>);
    expect(screen.getByText("Badge")).toHaveClass("custom");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Ref</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
