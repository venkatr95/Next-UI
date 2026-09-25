import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "../../../../test/test-utils";
import { Link } from "../link";

describe("Link", () => {
  it("renders an anchor element", () => {
    render(<Link href="/home">Home</Link>);
    const link = screen.getByRole("link", { name: "Home" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/home");
  });

  it("adds external attributes for isExternal", () => {
    render(
      <Link href="https://example.com" isExternal>
        External
      </Link>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("shows anchor icon for external links", () => {
    const { container } = render(
      <Link href="https://x.com" isExternal>
        Link
      </Link>
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("shows anchor icon when showAnchorIcon is true", () => {
    const { container } = render(
      <Link href="/page" showAnchorIcon>
        Page
      </Link>
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("applies disabled state", () => {
    render(
      <Link href="/page" isDisabled>
        Disabled
      </Link>
    );
    const link = screen.getByText("Disabled");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).not.toHaveAttribute("href");
  });

  it("applies block class when isBlock", () => {
    render(
      <Link href="/" isBlock>
        Block
      </Link>
    );
    expect(screen.getByRole("link")).toHaveClass("block");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <Link ref={ref} href="/">
        Ref
      </Link>
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });
});
