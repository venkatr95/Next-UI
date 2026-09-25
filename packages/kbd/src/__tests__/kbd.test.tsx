import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "../../../../test/test-utils";
import { Kbd } from "../kbd";

describe("Kbd", () => {
  it("renders keyboard keys", () => {
    render(<Kbd keys={["ctrl", "shift"]}>K</Kbd>);
    expect(screen.getByText("⌃")).toBeInTheDocument();
    expect(screen.getByText("⇧")).toBeInTheDocument();
    expect(screen.getByText("K")).toBeInTheDocument();
  });

  it("maps command to ⌘", () => {
    render(<Kbd keys={["command"]} />);
    expect(screen.getByText("⌘")).toBeInTheDocument();
  });

  it("maps alt/option to ⌥", () => {
    render(<Kbd keys={["alt"]} />);
    expect(screen.getByText("⌥")).toBeInTheDocument();
  });

  it("maps enter to ↵", () => {
    render(<Kbd keys={["enter"]} />);
    expect(screen.getByText("↵")).toBeInTheDocument();
  });

  it("renders unknown keys as-is", () => {
    render(<Kbd keys={["F1"]} />);
    expect(screen.getByText("F1")).toBeInTheDocument();
  });

  it("renders children without keys", () => {
    render(<Kbd>A</Kbd>);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("shows separator between keys and children", () => {
    render(<Kbd keys={["cmd"]}>K</Kbd>);
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Kbd ref={ref} keys={["a"]} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
