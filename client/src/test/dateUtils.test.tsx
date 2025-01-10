import { describe, it, expect } from "vitest";
import { formatDate } from "../utils/dateUtils";

describe("formatDate", () => {
  it("should correctly format a valid date", () => {
    const dateString = "2024-01-10";
    const result = formatDate(dateString);
    expect(result).toBe("10/01/2024");
  });

  it("should return an empty string if the date is undefined", () => {
    const result = formatDate("");
    expect(result).toBe("");
  });

  it("should properly handle single-digit numbers for days and months", () => {
    const dateString = "2024-02-05";
    const result = formatDate(dateString);
    expect(result).toBe("05/02/2024");
  });

  it("should handle the change of month correctly", () => {
    const dateString = "2024-12-31";
    const result = formatDate(dateString);
    expect(result).toBe("31/12/2024");
  });
});
