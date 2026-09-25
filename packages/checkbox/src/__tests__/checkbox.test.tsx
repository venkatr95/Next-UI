import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "../../../../test/test-utils";
import { Checkbox } from "../checkbox";

describe("Checkbox", () => {
  it("renders a checkbox", () => {
    render(<Checkbox>Accept terms</Checkbox>);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    render(<Checkbox>Check</Checkbox>);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("supports defaultSelected", () => {
    render(<Checkbox defaultSelected>Check</Checkbox>);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("toggles on click (uncontrolled)", async () => {
    const onChange = vi.fn();
    const { user } = render(
      <Checkbox onChange={onChange}>Toggle</Checkbox>
    );
    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(true);
    expect(checkbox).toBeChecked();
  });

  it("works as controlled component", () => {
    const { rerender } = render(
      <Checkbox isSelected={false}>Controlled</Checkbox>
    );
    expect(screen.getByRole("checkbox")).not.toBeChecked();

    rerender(<Checkbox isSelected={true}>Controlled</Checkbox>);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("disables the checkbox", () => {
    render(<Checkbox isDisabled>Disabled</Checkbox>);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("sets aria-invalid", () => {
    render(<Checkbox isInvalid>Invalid</Checkbox>);
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("applies line-through when checked with lineThrough", () => {
    render(
      <Checkbox isSelected lineThrough>
        Done
      </Checkbox>
    );
    const label = screen.getByText("Done");
    expect(label.className).toContain("line-through");
  });

  it("renders custom icon when checked", () => {
    render(
      <Checkbox isSelected icon={<span data-testid="custom-icon">✓</span>}>
        Custom
      </Checkbox>
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox ref={ref}>Ref</Checkbox>);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
