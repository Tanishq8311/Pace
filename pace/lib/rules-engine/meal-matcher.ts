import mealTemplates from "../content/meal-templates.json" with { type: "json" };
import type { DietType } from "./types.js";

export interface MealTemplate {
  id: number;
  name: string;
  protein: string;
  carbs: string;
  fat: string;
  fibre: string;
}

export interface DayMealPlan {
  caloriesPerMeal: number;
  meals: MealTemplate[];
}

const TEMPLATES: Record<DietType, MealTemplate[]> = mealTemplates as Record<
  DietType,
  MealTemplate[]
>;

// The Fat Loss Recipe book doesn't tag templates by calorie/macro band - its own
// instructions are: divide your daily calories by number of meals, pick any
// template, adjust portions in a tracking app to hit that per-meal number. There's
// no calorie-based filtering to do; this just applies that division and rotates
// which templates are picked so a 7-day plan doesn't repeat the same combo daily.
export function getDailyMealPlan(input: {
  dietType: DietType;
  dailyCalories: number;
  mealsPerDay: number;
  dayIndex: number;
}): DayMealPlan {
  const { dietType, dailyCalories, mealsPerDay, dayIndex } = input;
  const templates = TEMPLATES[dietType];
  const caloriesPerMeal = Math.round(dailyCalories / mealsPerDay);

  const offset = (dayIndex * mealsPerDay) % templates.length;
  const meals = Array.from(
    { length: mealsPerDay },
    (_, i) => templates[(offset + i) % templates.length]
  );

  return { caloriesPerMeal, meals };
}

export function getWeeklyMealPlan(input: {
  dietType: DietType;
  dailyCalories: number;
  mealsPerDay: number;
}): DayMealPlan[] {
  return Array.from({ length: 7 }, (_, dayIndex) =>
    getDailyMealPlan({ ...input, dayIndex })
  );
}
