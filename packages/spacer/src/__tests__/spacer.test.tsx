import { describe, it, expect } from "vitest";
import React from "react";
import { render } from "../../../../test/test-utils";
import { Spacer } from "../spacer";

describe("Spacer", () => {
  it("renders with y spacing", () => {
    const { container } = render(<Spacer y={4} />);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("aria-hidden");
    expect(el.className).toContain("h-4");
  });

  it("renders with x spacing", () => {
    const { container } = render(<Spacer x={2} />);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(el.className).toContain("w-2");
  });

  it("renders nothing when no spacing", () => {
    const { container } = render(<Spacer />);
    expect(container.firstChild).toBeNull();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Spacer ref={ref} y={1} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
