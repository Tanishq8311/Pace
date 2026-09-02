"use client";

import { useState } from "react";
import type { MealTemplate } from "@/lib/rules-engine/meal-matcher";

export interface DayPlan {
  shortLabel: string;
  dateLabel: string;
  phase: "deficit" | "dietBreak";
  calories: number;
  caloriesPerMeal: number;
  meals: MealTemplate[];
}

const PHASE_DOT = { deficit: "bg-yellow", dietBreak: "bg-sage" } as const;
const PHASE_LABEL = { deficit: "Deficit", dietBreak: "Diet Break" } as const;

export function WeeklyMealPlan({ days }: { days: DayPlan[] }) {
  const [selected, setSelected] = useState(0);
  const day = days[selected];

  return (
    <div className="flex flex-col gap-4">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {days.map((d, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelected(i)}
            className={`flex shrink-0 flex-col items-center rounded-xl border-2 border-border px-3.5 py-2 text-xs font-bold transition-all duration-150 active:scale-90 ${
              i === selected
                ? "bg-yellow text-black shadow-hard"
                : "bg-surface text-muted"
            }`}
          >
            {d.shortLabel}
          </button>
        ))}
      </div>

      <div key={selected} className="card animate-pop flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-sm font-bold text-foreground">
              {day.dateLabel}
            </p>
            <p className="text-xs text-muted">
              {day.calories} kcal · ~{day.caloriesPerMeal} kcal/meal
            </p>
          </div>
          <span className="pill">
            <span className={`mr-1.5 h-2 w-2 rounded-full ${PHASE_DOT[day.phase]}`} />
            {PHASE_LABEL[day.phase]}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {day.meals.map((meal, mi) => (
            <div
              key={mi}
              className="rounded-xl border-2 border-border p-3 text-sm"
            >
              <p className="font-bold text-foreground">{meal.name}</p>
              <dl className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-muted">
                <div>
                  <dt className="inline font-medium text-foreground/70">P: </dt>
                  <dd className="inline">{meal.protein}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-foreground/70">C: </dt>
                  <dd className="inline">{meal.carbs}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-foreground/70">F: </dt>
                  <dd className="inline">{meal.fat}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-foreground/70">
                    Fibre:{" "}
                  </dt>
                  <dd className="inline">{meal.fibre}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
