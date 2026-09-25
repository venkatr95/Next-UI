import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "../../../../test/test-utils";
import { createContext } from "../create-context";

describe("createContext", () => {
  it("provides and consumes context value", () => {
    const [Provider, useCtx] = createContext<{ value: string }>("Test");

    function Consumer() {
      const ctx = useCtx();
      return <span>{ctx.value}</span>;
    }

    render(
      <Provider value={{ value: "hello" }}>
        <Consumer />
      </Provider>
    );

    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("throws when used outside provider", () => {
    const [, useCtx] = createContext<{ value: string }>("MyContext");

    function Consumer() {
      useCtx();
      return null;
    }

    expect(() => render(<Consumer />)).toThrow(
      "useMyContext must be used within a MyContextProvider"
    );
  });
});
