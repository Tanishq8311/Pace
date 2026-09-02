import splitsData from "../content/splits.json" with { type: "json" };
import type { Gender } from "./types.js";

export type TrainingExperience = "beginner" | "intermediate" | "advanced";
export type TrainingDaysPerWeek = 3 | 4 | 5;

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
}

export interface TrainingSession {
  dayOfWeek: number; // 1 (Monday) - 7 (Sunday)
  label: string;
  exercises: Exercise[];
}

export interface ProgressionStep {
  week: string;
  focus: string;
}

export interface TrainingSplit {
  name: string;
  progression: ProgressionStep[];
  sessions: TrainingSession[];
}

type SplitsByDays = Record<string, TrainingSplit>;
type SplitsByExperience = Record<TrainingExperience, SplitsByDays>;

const SPLITS: Record<Gender, SplitsByExperience> = splitsData as Record<
  Gender,
  SplitsByExperience
>;

const TIER_ORDER: TrainingExperience[] = ["beginner", "intermediate", "advanced"];

// The book's split matrix is asymmetric (e.g. no 3-day option for women beyond
// Beginner, no 5-day Beginner for women, no Advanced 3/4-day for men) - rather
// than inventing splits the book doesn't have, this picks the nearest available
// experience tier for the requested days/week, preferring a lower (less intense)
// tier over a higher one when two tiers are equally close.
export function getTrainingSplit(
  gender: Gender,
  experience: TrainingExperience,
  daysPerWeek: TrainingDaysPerWeek
): TrainingSplit {
  const byExperience = SPLITS[gender];
  const dayKey = String(daysPerWeek);

  const availableTiers = TIER_ORDER.filter(
    (tier) => byExperience[tier]?.[dayKey]
  );

  if (availableTiers.length === 0) {
    throw new Error(`No ${daysPerWeek}-day split available for ${gender}`);
  }

  if (availableTiers.includes(experience)) {
    return byExperience[experience][dayKey];
  }

  const targetIdx = TIER_ORDER.indexOf(experience);
  const closest = [...availableTiers].sort(
    (a, b) =>
      Math.abs(TIER_ORDER.indexOf(a) - targetIdx) -
      Math.abs(TIER_ORDER.indexOf(b) - targetIdx)
  )[0];

  return byExperience[closest][dayKey];
}
