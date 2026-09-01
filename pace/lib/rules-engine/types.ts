export type Gender = "male" | "female";

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "veryActive";

export type HungerTestResult = "handlesHungerWell" | "sensitiveToHunger";

export type PlanType = "aggressive" | "sustainable";

export interface Biometrics {
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  bodyFatPct: number;
  targetBodyFatPct: number;
}

export interface FatLossTargets {
  pctToLose: number;
  kgToLoseMin: number;
  kgToLoseMax: number;
  kgToLoseMid: number;
  targetWeightKg: number;
}

export interface MacroTargets {
  proteinG: number;
  carbsG: number;
  fatG: number;
}

export type CyclePhase = "deficit" | "dietBreak";
