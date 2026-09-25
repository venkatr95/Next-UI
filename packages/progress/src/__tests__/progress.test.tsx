import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "../../../../test/test-utils";
import { Progress } from "../progress";

describe("Progress", () => {
  it("renders a progressbar", () => {
    render(<Progress value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("sets aria-valuenow", () => {
    render(<Progress value={75} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "75"
    );
  });

  it("sets aria-valuemin and aria-valuemax", () => {
    render(<Progress value={30} minValue={10} maxValue={90} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuemin", "10");
    expect(bar).toHaveAttribute("aria-valuemax", "90");
  });

  it("renders label", () => {
    render(<Progress value={50} label="Upload" />);
    expect(screen.getByText("Upload")).toBeInTheDocument();
  });

  it("shows value label when showValueLabel is true", () => {
    render(<Progress value={60} showValueLabel />);
    expect(screen.getByText("60%")).toBeInTheDocument();
  });

  it("clamps value to min/max", () => {
    render(<Progress value={150} maxValue={100} showValueLabel />);
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("does not set aria-valuenow for indeterminate", () => {
    render(<Progress isIndeterminate />);
    expect(screen.getByRole("progressbar")).not.toHaveAttribute(
      "aria-valuenow"
    );
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Progress ref={ref} value={50} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
