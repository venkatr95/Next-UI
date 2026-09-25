import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "../../../../test/test-utils";
import { Alert } from "../alert";

describe("Alert", () => {
  it("renders with alert role", () => {
    render(<Alert title="Notice" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders title", () => {
    render(<Alert title="Success!" />);
    expect(screen.getByText("Success!")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<Alert description="Something happened" />);
    expect(screen.getByText("Something happened")).toBeInTheDocument();
  });

  it("renders title and description together", () => {
    render(<Alert title="Warning" description="Check this" />);
    expect(screen.getByText("Warning")).toBeInTheDocument();
    expect(screen.getByText("Check this")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<Alert>Custom content</Alert>);
    expect(screen.getByText("Custom content")).toBeInTheDocument();
  });

  it("renders default icon", () => {
    const { container } = render(<Alert title="Info" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders custom icon", () => {
    render(<Alert icon={<span data-testid="custom-icon">!</span>} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders close button when isClosable", () => {
    render(<Alert title="Close me" isClosable />);
    expect(
      screen.getByRole("button", { name: "Close alert" })
    ).toBeInTheDocument();
  });

  it("calls onClose when close button clicked", async () => {
    const onClose = vi.fn();
    const { user } = render(
      <Alert title="Alert" isClosable onClose={onClose} />
    );
    await user.click(screen.getByRole("button", { name: "Close alert" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not show close button by default", () => {
    render(<Alert title="No close" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders startContent", () => {
    render(
      <Alert startContent={<span data-testid="start">S</span>}>
        Content
      </Alert>
    );
    expect(screen.getByTestId("start")).toBeInTheDocument();
  });

  it("renders endContent", () => {
    render(
      <Alert endContent={<span data-testid="end">E</span>}>
        Content
      </Alert>
    );
    expect(screen.getByTestId("end")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Alert ref={ref} title="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
