import type { MacroTargets } from "./types.js";

// Protein range (1.8-2.4 g/kg) is from the Reset Method; the book uses the
// upper-mid end during an aggressive cut to protect muscle.
export const DEFAULT_PROTEIN_G_PER_KG = 2.2;

// The book does not give a fat formula - only that fat supports hormones/satiety
// and portion control matters since it's 9 kcal/g. 25% of calories is a practical,
// commonly-used floor, not a number sourced from the book.
export const DEFAULT_FAT_PCT_OF_CALORIES = 0.25;

export function calculateMacros(input: {
  weightKg: number;
  calories: number;
  proteinGPerKg?: number;
  fatPctOfCalories?: number;
}): MacroTargets {
  const {
    weightKg,
    calories,
    proteinGPerKg = DEFAULT_PROTEIN_G_PER_KG,
    fatPctOfCalories = DEFAULT_FAT_PCT_OF_CALORIES,
  } = input;

  const proteinG = Math.floor(weightKg * proteinGPerKg);
  const fatG = Math.round((calories * fatPctOfCalories) / 9);
  const remainingCalories = calories - proteinG * 4 - fatG * 9;
  const carbsG = Math.max(0, Math.round(remainingCalories / 4));

  return { proteinG, carbsG, fatG };
}
