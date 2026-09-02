import { describe, expect, it } from "vitest";
import { getCaloriesForPhase, getDeficitCalories } from "./deficit.js";

// Fixture from My_Fat_Loss_Plan.html: TDEE ~2,990, aggressive plan ->
// deficit days ~1,900 kcal, diet-break days ~2,400 kcal.
describe("getDeficitCalories", () => {
  it("matches the book's aggressive-plan deficit day", () => {
    expect(getDeficitCalories(2990, "aggressive")).toBeCloseTo(1890, -1);
  });
});

describe("getCaloriesForPhase", () => {
  it("matches the book's diet-break day (+500 kcal)", () => {
    expect(getCaloriesForPhase(2990, "aggressive", "dietBreak")).toBeCloseTo(
      2390,
      -1
    );
  });

  it("gives a smaller deficit for the sustainable plan", () => {
    const aggressive = getDeficitCalories(2990, "aggressive");
    const sustainable = getDeficitCalories(2990, "sustainable");
    expect(sustainable).toBeGreaterThan(aggressive);
  });
});
