import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "../../../../test/test-utils";
import { Accordion, AccordionItem } from "../accordion";

describe("Accordion", () => {
  it("renders accordion items", () => {
    render(
      <Accordion>
        <AccordionItem itemKey="1" title="Item 1">
          Content 1
        </AccordionItem>
        <AccordionItem itemKey="2" title="Item 2">
          Content 2
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("expands item on click", async () => {
    const { user } = render(
      <Accordion>
        <AccordionItem itemKey="1" title="First">
          Hidden content
        </AccordionItem>
      </Accordion>
    );
    const trigger = screen.getByText("First").closest("button")!;
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("single mode closes other items", async () => {
    const { user } = render(
      <Accordion selectionMode="single">
        <AccordionItem itemKey="1" title="First">
          C1
        </AccordionItem>
        <AccordionItem itemKey="2" title="Second">
          C2
        </AccordionItem>
      </Accordion>
    );
    const first = screen.getByText("First").closest("button")!;
    const second = screen.getByText("Second").closest("button")!;

    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");

    await user.click(second);
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-expanded", "false");
  });

  it("multiple mode keeps items open", async () => {
    const { user } = render(
      <Accordion selectionMode="multiple">
        <AccordionItem itemKey="1" title="First">
          C1
        </AccordionItem>
        <AccordionItem itemKey="2" title="Second">
          C2
        </AccordionItem>
      </Accordion>
    );
    const first = screen.getByText("First").closest("button")!;
    const second = screen.getByText("Second").closest("button")!;

    await user.click(first);
    await user.click(second);
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(second).toHaveAttribute("aria-expanded", "true");
  });

  it("supports defaultSelectedKeys", () => {
    render(
      <Accordion defaultSelectedKeys={["2"]}>
        <AccordionItem itemKey="1" title="First">
          C1
        </AccordionItem>
        <AccordionItem itemKey="2" title="Second">
          C2
        </AccordionItem>
      </Accordion>
    );
    const second = screen.getByText("Second").closest("button")!;
    expect(second).toHaveAttribute("aria-expanded", "true");
  });

  it("fires onSelectionChange", async () => {
    const onSelectionChange = vi.fn();
    const { user } = render(
      <Accordion onSelectionChange={onSelectionChange}>
        <AccordionItem itemKey="1" title="Click me">
          Content
        </AccordionItem>
      </Accordion>
    );
    await user.click(screen.getByText("Click me").closest("button")!);
    expect(onSelectionChange).toHaveBeenCalled();
    const keys = onSelectionChange.mock.calls[0][0];
    expect(keys.has("1")).toBe(true);
  });

  it("disables items when accordion isDisabled", () => {
    render(
      <Accordion isDisabled>
        <AccordionItem itemKey="1" title="Disabled">
          Content
        </AccordionItem>
      </Accordion>
    );
    const btn = screen.getByText("Disabled").closest("button")!;
    expect(btn).toBeDisabled();
  });

  it("renders subtitle", () => {
    render(
      <Accordion>
        <AccordionItem itemKey="1" title="Title" subtitle="Subtitle">
          Content
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText("Subtitle")).toBeInTheDocument();
  });

  it("renders startContent", () => {
    render(
      <Accordion>
        <AccordionItem
          itemKey="1"
          title="Title"
          startContent={<span data-testid="start">★</span>}
        >
          Content
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByTestId("start")).toBeInTheDocument();
  });
});
