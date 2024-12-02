import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("Test Title component", () => {
  it("should render a title", async () => {
    await render(<App />);

    const h1 = screen.getByRole("heading", { level: 1 });

    expect(h1).toHaveTextContent("Vite + React");
  });
});
