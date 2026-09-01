import { describe, expect, it } from "vitest";
import { lookupFatLoss } from "./bodyfat-lookup.js";

// Fixture from My_Fat_Loss_Plan.html: current ~35%+, target ~25%, weight 82.25kg
// -> book states "8-10 kg -> target weight approx 73 kg".
describe("lookupFatLoss", () => {
  it("matches the book's worked example", () => {
    const result = lookupFatLoss("male", 35, 25, 82.25);
    expect(result.pctToLose).toBe(10);
    expect(result.kgToLoseMin).toBe(8);
    expect(result.kgToLoseMax).toBe(10);
    expect(result.targetWeightKg).toBe(73);
  });

  it("throws for a combination not on the book's chart", () => {
    expect(() => lookupFatLoss("male", 8, 45, 70)).toThrow();
  });
});
