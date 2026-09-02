import type { CyclePhase, PlanType } from "./types.js";

// From My_Fat_Loss_Plan.html / the Fuel System's hunger-test deficit guidance:
// aggressive pace ~1kg/week -> ~1,100 kcal/day deficit; sustainable pace
// 0.5-0.8kg/week -> ~400-800 kcal/day deficit (using the range's midpoint).
// Diet-break days add back ~500 kcal of clean carbs, same protein.
export const AGGRESSIVE_DAILY_DEFICIT_KCAL = 1100;
export const SUSTAINABLE_DAILY_DEFICIT_KCAL = 600;
export const DIET_BREAK_KCAL_INCREASE = 500;

export function getDeficitCalories(tdee: number, planType: PlanType): number {
  const deficit =
    planType === "aggressive"
      ? AGGRESSIVE_DAILY_DEFICIT_KCAL
      : SUSTAINABLE_DAILY_DEFICIT_KCAL;
  return tdee - deficit;
}

export function getCaloriesForPhase(
  tdee: number,
  planType: PlanType,
  phase: CyclePhase
): number {
  const deficitCalories = getDeficitCalories(tdee, planType);
  return phase === "deficit"
    ? deficitCalories
    : deficitCalories + DIET_BREAK_KCAL_INCREASE;
}
