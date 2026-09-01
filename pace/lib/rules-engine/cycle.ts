import type { CyclePhase } from "./types.js";

// From My_Fat_Loss_Plan.html: Days 1-14 deficit, Days 15-21 diet break, then repeat
// (Days 22-35 = deficit again). One full cycle is 21 days.
export const DEFICIT_PHASE_DAYS = 14;
export const DIET_BREAK_PHASE_DAYS = 7;
export const CYCLE_LENGTH_DAYS = DEFICIT_PHASE_DAYS + DIET_BREAK_PHASE_DAYS;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function daysBetween(start: Date, end: Date): number {
  return Math.floor((end.getTime() - start.getTime()) / MS_PER_DAY);
}

export interface CyclePosition {
  /** 1-indexed day within the current 21-day cycle. */
  dayInCycle: number;
  /** 1-indexed day within the current phase (e.g. day 3 of the diet break). */
  dayInPhase: number;
  phase: CyclePhase;
}

// Derived from cycleStartedAt rather than stored, so it can never drift out of
// sync with reality (forgotten increments, timezone edge cases, etc.) - see the
// architecture plan's note on this.
export function getCyclePosition(cycleStartedAt: Date, today: Date): CyclePosition {
  const elapsedDays = daysBetween(cycleStartedAt, today);
  if (elapsedDays < 0) {
    throw new Error("today is before cycleStartedAt");
  }
  const dayInCycle = (elapsedDays % CYCLE_LENGTH_DAYS) + 1;
  if (dayInCycle <= DEFICIT_PHASE_DAYS) {
    return { dayInCycle, dayInPhase: dayInCycle, phase: "deficit" };
  }
  return {
    dayInCycle,
    dayInPhase: dayInCycle - DEFICIT_PHASE_DAYS,
    phase: "dietBreak",
  };
}

// Stall rule: no loss for 2 full weeks on the aggressive (deficit) plan -> recalculate
// maintenance at the new bodyweight and restart the cycle. weeklyAverages must be in
// chronological order (oldest first); only the trailing two are compared.
export function hasStalled(weeklyAverageWeightsKg: number[]): boolean {
  if (weeklyAverageWeightsKg.length < 2) return false;
  const [previous, latest] = weeklyAverageWeightsKg.slice(-2);
  return latest >= previous;
}
