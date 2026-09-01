import type { HungerTestResult, PlanType } from "./types.js";

// From the Fuel System's hunger test (Section 2): handles hunger well -> aggressive
// pace (1kg/week), sensitive to hunger -> sustainable pace (0.5-0.8kg/week).
export function getPlanType(hungerTestResult: HungerTestResult): PlanType {
  return hungerTestResult === "handlesHungerWell" ? "aggressive" : "sustainable";
}
