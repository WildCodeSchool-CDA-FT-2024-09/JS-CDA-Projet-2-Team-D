import { describe, it, expect } from "vitest";
import { calculateAmountWithVAT } from "../utils/vatCalculator";

describe("calculateAmountWithVAT", () => {
  // Testing of standard cases
  it("should handle standard VAT calculations correctly", () => {
    const testCases = [
      { price: 100, rate: 20, expected: 120 },
      { price: 100, rate: 5.5, expected: 105.5 },
      { price: 100, rate: 10, expected: 110 },
      { price: 100, rate: 2.1, expected: 102.1 },
    ];

    testCases.forEach(({ price, rate, expected }) => {
      const result = calculateAmountWithVAT(price, rate);
      expect(result).toBeCloseTo(expected, 2);
    });
  });

  // Testing of special cases
  it("should handle edge cases correctly", () => {
    const testCases = [
      { price: 0, rate: 20, expected: 0 }, // zero price
      { price: 100, rate: 0, expected: 100 }, // Zero VAT
      { price: -100, rate: 20, expected: -120 }, // negative price
      { price: 99.99, rate: 20, expected: 119.99 }, // decimal price
    ];

    testCases.forEach(({ price, rate, expected }) => {
      const result = calculateAmountWithVAT(price, rate);
      expect(result).toBeCloseTo(expected, 2);
    });
  });

  // Testing invalid entries
  it("should handle invalid inputs safely", () => {
    const invalidCases = [
      { price: NaN, rate: 20 },
      { price: Infinity, rate: 20 },
      { price: 100, rate: NaN },
      { price: undefined, rate: 20 },
      { price: 100, rate: undefined },
    ];

    invalidCases.forEach(({ price, rate }) => {
      const result = calculateAmountWithVAT(price, rate);
      expect(result).toBe(0);
    });
  });

  // Precision test with large and small numbers
  it("should maintain precision with extreme values", () => {
    const testCases = [
      { price: 0.01, rate: 20, expected: 0.012 }, // very small number
      { price: 1000000, rate: 20, expected: 1200000 }, // large number
    ];

    testCases.forEach(({ price, rate, expected }) => {
      const result = calculateAmountWithVAT(price, rate);
      expect(result).toBeCloseTo(expected, 3);
    });
  });
});
