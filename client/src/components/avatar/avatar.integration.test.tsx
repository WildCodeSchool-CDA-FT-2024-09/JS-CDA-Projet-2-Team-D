import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Avatar from "./Avatar";

describe("Avatar Integration Test", () => {
  it("should render avatar with correct properties", () => {
    const color = "#FF0000";
    const { container } = render(<Avatar color={color} />);

    const svg = container.querySelector("svg") as SVGSVGElement;
    const path = container.querySelector("path");

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    expect(path).toBeInTheDocument();

    expect(svg).toHaveStyle({ width: "100%", height: "100%", color });
  });

  it("should handle color changes correctly", () => {
    const { container, rerender } = render(<Avatar color="#FF0000" />);
    const svg = container.firstChild as SVGSVGElement;
    expect(svg).toHaveStyle({ color: "#FF0000" });

    rerender(<Avatar color="#0000FF" />);
    expect(svg).toHaveStyle({ color: "#0000FF" });
  });
});
