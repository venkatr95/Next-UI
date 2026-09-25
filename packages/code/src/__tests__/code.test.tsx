import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "../../../../test/test-utils";
import { Code } from "../code";

describe("Code", () => {
  it("renders a code element", () => {
    render(<Code>npm install</Code>);
    const el = screen.getByText("npm install");
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe("CODE");
  });

  it("applies font-mono class", () => {
    render(<Code>code</Code>);
    expect(screen.getByText("code")).toHaveClass("font-mono");
  });

  it("applies size classes", () => {
    const { rerender } = render(<Code size="sm">small</Code>);
    expect(screen.getByText("small")).toHaveClass("text-xs");

    rerender(<Code size="lg">large</Code>);
    expect(screen.getByText("large")).toHaveClass("text-base");
  });

  it("applies color classes", () => {
    render(<Code color="danger">error</Code>);
    const el = screen.getByText("error");
    expect(el.className).toContain("red");
  });

  it("applies custom className", () => {
    render(<Code className="custom">code</Code>);
    expect(screen.getByText("code")).toHaveClass("custom");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Code ref={ref}>ref</Code>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
