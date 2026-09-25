import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "../../../../test/test-utils";
import { Chip } from "../chip";

describe("Chip", () => {
  it("renders children", () => {
    render(<Chip>Active</Chip>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders close button when onClose is provided", () => {
    const onClose = vi.fn();
    render(<Chip onClose={onClose}>Removable</Chip>);
    expect(screen.getByRole("button", { name: "Remove" })).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const onClose = vi.fn();
    const { user } = render(<Chip onClose={onClose}>Tag</Chip>);
    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not render close button without onClose", () => {
    render(<Chip>Static</Chip>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders startContent", () => {
    render(
      <Chip startContent={<span data-testid="icon">★</span>}>Star</Chip>
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders endContent", () => {
    render(
      <Chip endContent={<span data-testid="end">!</span>}>Alert</Chip>
    );
    expect(screen.getByTestId("end")).toBeInTheDocument();
  });

  it("renders avatar", () => {
    render(
      <Chip avatar={<img src="a.jpg" alt="avatar" />}>User</Chip>
    );
    expect(screen.getByAltText("avatar")).toBeInTheDocument();
  });

  it("renders dot variant indicator", () => {
    const { container } = render(<Chip variant="dot">Dot</Chip>);
    const dot = container.querySelector(".rounded-full.w-2.h-2");
    expect(dot).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Chip ref={ref}>Ref</Chip>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
