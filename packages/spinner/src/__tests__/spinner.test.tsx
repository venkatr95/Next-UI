import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "../../../../test/test-utils";
import { Spinner } from "../spinner";

describe("Spinner", () => {
  it("renders with status role", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has default Loading label", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading");
  });

  it("accepts custom label", () => {
    render(<Spinner label="Processing" />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Processing"
    );
  });

  it("renders as svg with animate-spin", () => {
    render(<Spinner />);
    const svg = screen.getByRole("status");
    expect(svg.tagName).toBe("svg");
    expect(svg).toHaveClass("animate-spin");
  });

  it("applies size classes", () => {
    const { rerender } = render(<Spinner size="sm" />);
    expect(screen.getByRole("status")).toHaveClass("h-4", "w-4");

    rerender(<Spinner size="lg" />);
    expect(screen.getByRole("status")).toHaveClass("h-8", "w-8");
  });

  it("applies custom className", () => {
    render(<Spinner className="my-spinner" />);
    expect(screen.getByRole("status")).toHaveClass("my-spinner");
  });

  it("forwards ref", () => {
    const ref = React.createRef<SVGSVGElement>();
    render(<Spinner ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGElement);
  });
});
