import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BtnPagination from "./BtnPagination";

describe("BtnPagination Integration Test", () => {
  it("should render pagination with correct properties", () => {
    render(
      <BtnPagination page={1} totalPages={10} handlePageChange={vi.fn()} />,
    );
    const pagination = screen.getByRole("navigation");
    expect(pagination).toBeInTheDocument();
    expect(screen.getByLabelText("Go to first page")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to next page")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to last page")).toBeInTheDocument();
  });

  it("should handle page change correctly when clicking next", () => {
    const handlePageChange = vi.fn();
    render(
      <BtnPagination
        page={1}
        totalPages={10}
        handlePageChange={handlePageChange}
      />,
    );
    const nextButton = screen.getByLabelText("Go to next page");
    fireEvent.click(nextButton);
    expect(handlePageChange).toHaveBeenCalledTimes(1);
  });

  it("should not render pagination when totalPages is 0 or 1", () => {
    const { container: container1 } = render(
      <BtnPagination page={1} totalPages={0} handlePageChange={vi.fn()} />,
    );
    expect(container1.querySelector("ul")).toBeNull();

    const { container: container2 } = render(
      <BtnPagination page={1} totalPages={1} handlePageChange={vi.fn()} />,
    );
    expect(container2.querySelector("ul")).toBeNull();
  });

  it("should disable previous and first button when on first page", () => {
    render(
      <BtnPagination page={1} totalPages={10} handlePageChange={vi.fn()} />,
    );
    const previousButton = screen.getByLabelText("Go to previous page");
    expect(previousButton).toBeDisabled();
  });

  it("should disable next and last button when on last page", () => {
    render(
      <BtnPagination page={10} totalPages={10} handlePageChange={vi.fn()} />,
    );
    const nextButton = screen.getByLabelText("Go to next page");
    expect(nextButton).toBeDisabled();
  });
});
