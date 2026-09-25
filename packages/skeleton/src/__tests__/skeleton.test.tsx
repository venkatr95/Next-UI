import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "../../../../test/test-utils";
import { Skeleton } from "../skeleton";

describe("Skeleton", () => {
  it("renders with loading status", () => {
    render(<Skeleton />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has loading aria-label", () => {
    render(<Skeleton />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading");
  });

  it("applies pulse animation", () => {
    render(<Skeleton />);
    expect(screen.getByRole("status")).toHaveClass("animate-pulse");
  });

  it("applies width and height styles", () => {
    render(<Skeleton width={200} height={24} />);
    const el = screen.getByRole("status");
    expect(el.style.width).toBe("200px");
    expect(el.style.height).toBe("24px");
  });

  it("handles string dimensions", () => {
    render(<Skeleton width="100%" height="2rem" />);
    const el = screen.getByRole("status");
    expect(el.style.width).toBe("100%");
    expect(el.style.height).toBe("2rem");
  });

  it("shows children when isLoaded", () => {
    render(
      <Skeleton isLoaded>
        <span>Loaded content</span>
      </Skeleton>
    );
    expect(screen.getByText("Loaded content")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("shows skeleton when not loaded even with children", () => {
    render(
      <Skeleton isLoaded={false}>
        <span>Content</span>
      </Skeleton>
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("applies circular variant", () => {
    render(<Skeleton variant="circular" />);
    expect(screen.getByRole("status")).toHaveClass("rounded-full");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
