import { describe, expect, it } from "vitest";
import { calculateBMR, calculateTDEE } from "./bmr.js";

// Fixture from My_Fat_Loss_Plan.html: 23 / Male / 163.5cm / 82.25kg -> BMR 1,734,
// TDEE ~2,990 at "Active" (x1.725).
describe("calculateBMR", () => {
  it("matches the book's worked example", () => {
    expect(
      calculateBMR({ gender: "male", weightKg: 82.25, heightCm: 163.5, age: 23 })
    ).toBe(1734);
  });
});

describe("calculateTDEE", () => {
  it("matches the book's worked example (book states this as an approximate ~2,990)", () => {
    expect(calculateTDEE(1734, "active")).toBeCloseTo(2990, -1);
  });
});
