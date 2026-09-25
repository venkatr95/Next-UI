import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "../../../../test/test-utils";
import { Image } from "../image";

describe("Image", () => {
  it("renders an img element", () => {
    render(<Image src="test.jpg" alt="Test image" />);
    expect(screen.getByAltText("Test image")).toBeInTheDocument();
  });

  it("applies lazy loading by default", () => {
    render(<Image src="test.jpg" alt="Lazy" />);
    expect(screen.getByAltText("Lazy")).toHaveAttribute("loading", "lazy");
  });

  it("applies eager loading", () => {
    render(<Image src="test.jpg" alt="Eager" loading="eager" />);
    expect(screen.getByAltText("Eager")).toHaveAttribute("loading", "eager");
  });

  it("shows skeleton while loading by default", () => {
    const { container } = render(<Image src="test.jpg" alt="Loading" />);
    expect(container.querySelector('[aria-label="Loading"]')).toBeInTheDocument();
  });

  it("hides skeleton when disableSkeleton", () => {
    const { container } = render(
      <Image src="test.jpg" alt="No skeleton" disableSkeleton />
    );
    expect(container.querySelector('[aria-label="Loading"]')).not.toBeInTheDocument();
  });

  it("becomes visible after load", () => {
    render(<Image src="test.jpg" alt="Loaded" />);
    const img = screen.getByAltText("Loaded");
    expect(img).toHaveClass("opacity-0");
    fireEvent.load(img);
    expect(img).not.toHaveClass("opacity-0");
  });

  it("shows error fallback on load failure", () => {
    render(<Image src="bad.jpg" alt="Error" />);
    fireEvent.error(screen.getByAltText("Error"));
    expect(screen.getByText("Failed to load")).toBeInTheDocument();
  });

  it("tries fallbackSrc before showing error", () => {
    render(
      <Image src="bad.jpg" alt="Fallback" fallbackSrc="fallback.jpg" />
    );
    const img = screen.getByAltText("Fallback");
    fireEvent.error(img);
    expect(img).toHaveAttribute("src", "fallback.jpg");
  });

  it("applies width and height styles", () => {
    const { container } = render(
      <Image src="test.jpg" alt="Sized" width={300} height={200} />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.width).toBe("300px");
    expect(wrapper.style.height).toBe("200px");
  });

  it("calls onLoad callback", () => {
    const onLoad = vi.fn();
    render(<Image src="test.jpg" alt="Callback" onLoad={onLoad} />);
    fireEvent.load(screen.getByAltText("Callback"));
    expect(onLoad).toHaveBeenCalledTimes(1);
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLImageElement>();
    render(<Image ref={ref} src="test.jpg" alt="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLImageElement);
  });
});
