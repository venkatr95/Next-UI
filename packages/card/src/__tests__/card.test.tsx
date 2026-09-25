import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "../../../../test/test-utils";
import { Card, CardHeader, CardBody, CardFooter } from "../card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies pressable styles", () => {
    const { container } = render(<Card isPressable>Press me</Card>);
    expect(container.firstChild).toHaveClass("cursor-pointer");
  });

  it("applies fullWidth", () => {
    const { container } = render(<Card fullWidth>Full</Card>);
    expect(container.firstChild).toHaveClass("w-full");
  });

  it("applies custom className", () => {
    const { container } = render(<Card className="my-card">C</Card>);
    expect(container.firstChild).toHaveClass("my-card");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref}>Ref</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe("CardHeader", () => {
  it("renders header content", () => {
    render(<CardHeader>Title</CardHeader>);
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardHeader ref={ref}>H</CardHeader>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe("CardBody", () => {
  it("renders body content", () => {
    render(<CardBody>Body text</CardBody>);
    expect(screen.getByText("Body text")).toBeInTheDocument();
  });
});

describe("CardFooter", () => {
  it("renders footer content", () => {
    render(<CardFooter>Footer</CardFooter>);
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});

describe("Card composition", () => {
  it("renders full card with header, body, footer", () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
