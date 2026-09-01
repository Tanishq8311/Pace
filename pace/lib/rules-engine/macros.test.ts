import { describe, expect, it } from "vitest";
import { calculateMacros } from "./macros.js";

// Fixture from My_Fat_Loss_Plan.html (weight 82.25kg): aggressive day 1,900 kcal ->
// protein 180g, carbs 170g, fat 55g; diet-break day 2,400 kcal -> protein 180g
// (unchanged), carbs 285g, fat ~60g. The book's fat/carb split isn't a stated
// formula (see comment in macros.ts), so we assert protein exactly and the
// reconstructed calorie total closely, rather than exact carb/fat grams.
describe("calculateMacros", () => {
  it("matches the book's protein target on an aggressive day", () => {
    const result = calculateMacros({ weightKg: 82.25, calories: 1900 });
    expect(result.proteinG).toBe(180);
  });

  it("keeps protein unchanged on a diet-break day, per the book", () => {
    const result = calculateMacros({ weightKg: 82.25, calories: 2400 });
    expect(result.proteinG).toBe(180);
  });

  it("reconstructs close to the target calories from its own macros", () => {
    const result = calculateMacros({ weightKg: 82.25, calories: 1900 });
    const totalKcal = result.proteinG * 4 + result.carbsG * 4 + result.fatG * 9;
    expect(totalKcal).toBeCloseTo(1900, -1);
  });
});
