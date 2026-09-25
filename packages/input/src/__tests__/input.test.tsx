import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "../../../../test/test-utils";
import { Input } from "../input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("renders with placeholder", () => {
    render(<Input placeholder="Enter text..." />);
    expect(screen.getByPlaceholderText("Enter text...")).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(<Input description="Helper text" />);
    expect(screen.getByText("Helper text")).toBeInTheDocument();
  });

  it("renders error message when invalid", () => {
    render(<Input isInvalid errorMessage="Required field" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required field");
  });

  it("hides description when invalid with error message", () => {
    render(
      <Input isInvalid errorMessage="Error" description="Helper" />
    );
    expect(screen.queryByText("Helper")).not.toBeInTheDocument();
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("sets aria-invalid when isInvalid", () => {
    render(<Input isInvalid />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("disables the input", () => {
    render(<Input isDisabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("sets readOnly", () => {
    render(<Input isReadOnly />);
    expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
  });

  it("marks as required", () => {
    render(<Input isRequired label="Name" />);
    expect(screen.getByRole("textbox")).toBeRequired();
  });

  it("handles user typing", async () => {
    const onChange = vi.fn();
    const { user } = render(<Input onChange={onChange} />);
    await user.type(screen.getByRole("textbox"), "hello");
    expect(onChange).toHaveBeenCalled();
  });

  it("renders startContent", () => {
    render(<Input startContent={<span data-testid="start">@</span>} />);
    expect(screen.getByTestId("start")).toBeInTheDocument();
  });

  it("renders endContent", () => {
    render(<Input endContent={<span data-testid="end">!</span>} />);
    expect(screen.getByTestId("end")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("sets aria-describedby for error", () => {
    render(<Input id="email" isInvalid errorMessage="Bad input" />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      "email-error"
    );
  });
});
