import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "../../../../test/test-utils";
import { Avatar } from "../avatar";
import { AvatarGroup } from "../avatar-group";

describe("Avatar", () => {
  it("renders with image", () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://example.com/avatar.jpg");
    expect(img).toHaveAttribute("alt", "User");
  });

  it("shows initials as fallback", () => {
    render(<Avatar fallback="John Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("shows single initial for single name", () => {
    render(<Avatar fallback="Alice" />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("falls back to initials on image error", () => {
    render(
      <Avatar src="bad-url.jpg" alt="User" fallback="Jane Smith" />
    );
    const img = screen.getByRole("img");
    fireEvent.error(img);
    expect(screen.getByText("JS")).toBeInTheDocument();
  });

  it("renders children when no src or fallback", () => {
    render(<Avatar>👤</Avatar>);
    expect(screen.getByText("👤")).toBeInTheDocument();
  });

  it("applies bordered ring", () => {
    const { container } = render(<Avatar bordered fallback="AB" />);
    expect(container.firstChild).toHaveClass("ring-2");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Avatar ref={ref} fallback="T" />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});

describe("AvatarGroup", () => {
  it("renders all avatars", () => {
    render(
      <AvatarGroup>
        <Avatar fallback="A" />
        <Avatar fallback="B" />
        <Avatar fallback="C" />
      </AvatarGroup>
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
  });

  it("respects max prop and shows overflow count", () => {
    render(
      <AvatarGroup max={2}>
        <Avatar fallback="A" />
        <Avatar fallback="B" />
        <Avatar fallback="C" />
        <Avatar fallback="D" />
      </AvatarGroup>
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("+2")).toBeInTheDocument();
    expect(screen.queryByText("C")).not.toBeInTheDocument();
  });
});
