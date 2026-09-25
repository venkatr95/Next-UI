import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "../../../../test/test-utils";
import { User } from "../user";

describe("User", () => {
  it("renders name", () => {
    render(<User name="John Doe" />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<User name="Jane" description="Designer" />);
    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("Designer")).toBeInTheDocument();
  });

  it("renders avatar from props", () => {
    render(
      <User
        name="Alice"
        avatarProps={{ src: "https://example.com/pic.jpg", alt: "Alice" }}
      />
    );
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://example.com/pic.jpg"
    );
  });

  it("renders initials fallback in avatar", () => {
    render(<User name="Bob Smith" />);
    expect(screen.getByText("BS")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<User ref={ref} name="Test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies custom className", () => {
    const { container } = render(
      <User name="Test" className="custom-user" />
    );
    expect(container.firstChild).toHaveClass("custom-user");
  });
});
