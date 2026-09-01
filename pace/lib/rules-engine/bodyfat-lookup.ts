import bodyFatChart from "../content/bodyfat-chart.json" with { type: "json" };
import type { FatLossTargets, Gender } from "./types.js";

interface ChartRow {
  currentPct: number;
  targetPct: number;
  pctToLose: number;
  kgToLoseMin: number;
  kgToLoseMax: number;
}

const CHART: Record<Gender, ChartRow[]> = bodyFatChart as Record<Gender, ChartRow[]>;

// currentPct/targetPct must be one of the categories from the book's visual body-fat
// chart (the user picks a picture, not a raw percentage) - this table is digitized
// directly from the Fat Loss Fuel System's own current% -> target% -> kg-to-lose chart.
export function lookupFatLoss(
  gender: Gender,
  currentPct: number,
  targetPct: number,
  currentWeightKg: number
): FatLossTargets {
  const row = CHART[gender].find(
    (r) => r.currentPct === currentPct && r.targetPct === targetPct
  );
  if (!row) {
    throw new Error(
      `No body-fat chart entry for ${gender} ${currentPct}% -> ${targetPct}%`
    );
  }
  const kgToLoseMid = (row.kgToLoseMin + row.kgToLoseMax) / 2;
  return {
    pctToLose: row.pctToLose,
    kgToLoseMin: row.kgToLoseMin,
    kgToLoseMax: row.kgToLoseMax,
    kgToLoseMid,
    targetWeightKg: Math.round(currentWeightKg - kgToLoseMid),
  };
}
