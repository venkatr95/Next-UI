import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "../../../../test/test-utils";
import { Tabs, Tab } from "../tabs";

describe("Tabs", () => {
  it("renders tab items", () => {
    render(
      <Tabs>
        <Tab tabKey="a">Tab A</Tab>
        <Tab tabKey="b">Tab B</Tab>
      </Tabs>
    );
    expect(screen.getByRole("tab", { name: "Tab A" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tab B" })).toBeInTheDocument();
  });

  it("selects default tab", () => {
    render(
      <Tabs defaultSelectedKey="b">
        <Tab tabKey="a">Tab A</Tab>
        <Tab tabKey="b">Tab B</Tab>
      </Tabs>
    );
    expect(screen.getByRole("tab", { name: "Tab B" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  it("changes selection on click", async () => {
    const onSelectionChange = vi.fn();
    const { user } = render(
      <Tabs onSelectionChange={onSelectionChange} defaultSelectedKey="a">
        <Tab tabKey="a">Tab A</Tab>
        <Tab tabKey="b">Tab B</Tab>
      </Tabs>
    );
    await user.click(screen.getByRole("tab", { name: "Tab B" }));
    expect(onSelectionChange).toHaveBeenCalledWith("b");
  });

  it("supports controlled selection", () => {
    const { rerender } = render(
      <Tabs selectedKey="a">
        <Tab tabKey="a">Tab A</Tab>
        <Tab tabKey="b">Tab B</Tab>
      </Tabs>
    );
    expect(screen.getByRole("tab", { name: "Tab A" })).toHaveAttribute(
      "aria-selected",
      "true"
    );

    rerender(
      <Tabs selectedKey="b">
        <Tab tabKey="a">Tab A</Tab>
        <Tab tabKey="b">Tab B</Tab>
      </Tabs>
    );
    expect(screen.getByRole("tab", { name: "Tab B" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  it("disables all tabs when isDisabled", () => {
    render(
      <Tabs isDisabled>
        <Tab tabKey="a">Tab A</Tab>
        <Tab tabKey="b">Tab B</Tab>
      </Tabs>
    );
    expect(screen.getByRole("tab", { name: "Tab A" })).toBeDisabled();
    expect(screen.getByRole("tab", { name: "Tab B" })).toBeDisabled();
  });

  it("disables individual tab", () => {
    render(
      <Tabs>
        <Tab tabKey="a">Tab A</Tab>
        <Tab tabKey="b" isDisabled>
          Tab B
        </Tab>
      </Tabs>
    );
    expect(screen.getByRole("tab", { name: "Tab A" })).not.toBeDisabled();
    expect(screen.getByRole("tab", { name: "Tab B" })).toBeDisabled();
  });

  it("applies fullWidth", () => {
    const { container } = render(
      <Tabs fullWidth>
        <Tab tabKey="a">Tab A</Tab>
      </Tabs>
    );
    expect(container.firstChild).toHaveClass("w-full");
  });

  it("sets data-orientation", () => {
    const { container } = render(
      <Tabs orientation="vertical">
        <Tab tabKey="a">Tab A</Tab>
      </Tabs>
    );
    expect(container.firstChild).toHaveAttribute(
      "data-orientation",
      "vertical"
    );
  });
});
