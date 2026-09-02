import { describe, expect, it } from "vitest";
import { getDailyMealPlan, getWeeklyMealPlan } from "./meal-matcher.js";

describe("getDailyMealPlan", () => {
  it("divides daily calories by meals per day, per the book's own instructions", () => {
    const plan = getDailyMealPlan({
      dietType: "vegetarian",
      dailyCalories: 1900,
      mealsPerDay: 5,
      dayIndex: 0,
    });
    expect(plan.caloriesPerMeal).toBe(380);
    expect(plan.meals).toHaveLength(5);
  });

  it("returns distinct templates within a single day when possible", () => {
    const plan = getDailyMealPlan({
      dietType: "nonVegetarian",
      dailyCalories: 2000,
      mealsPerDay: 5,
      dayIndex: 0,
    });
    const ids = plan.meals.map((m) => m.id);
    expect(new Set(ids).size).toBe(5);
  });

  it("rotates the starting template across days", () => {
    const day0 = getDailyMealPlan({
      dietType: "vegetarian",
      dailyCalories: 1900,
      mealsPerDay: 5,
      dayIndex: 0,
    });
    const day1 = getDailyMealPlan({
      dietType: "vegetarian",
      dailyCalories: 1900,
      mealsPerDay: 5,
      dayIndex: 1,
    });
    expect(day0.meals[0].id).not.toBe(day1.meals[0].id);
  });

  it("is deterministic for the same inputs", () => {
    const a = getDailyMealPlan({
      dietType: "vegetarian",
      dailyCalories: 1900,
      mealsPerDay: 5,
      dayIndex: 3,
    });
    const b = getDailyMealPlan({
      dietType: "vegetarian",
      dailyCalories: 1900,
      mealsPerDay: 5,
      dayIndex: 3,
    });
    expect(a).toEqual(b);
  });
});

describe("getWeeklyMealPlan", () => {
  it("returns 7 days", () => {
    const week = getWeeklyMealPlan({
      dietType: "vegetarian",
      dailyCalories: 1900,
      mealsPerDay: 5,
    });
    expect(week).toHaveLength(7);
  });
});
