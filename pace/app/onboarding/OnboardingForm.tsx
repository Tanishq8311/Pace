"use client";

import { useMemo, useState } from "react";
import bodyFatChart from "@/lib/content/bodyfat-chart.json";
import type { Gender } from "@/lib/rules-engine/types";
import { saveOnboarding } from "./actions";

const CHART = bodyFatChart as Record<
  Gender,
  { currentPct: number; targetPct: number }[]
>;

function useBodyFatOptions(gender: Gender) {
  const currentOptions = useMemo(
    () => [...new Set(CHART[gender].map((r) => r.currentPct))].sort((a, b) => b - a),
    [gender]
  );
  return currentOptions;
}

export function OnboardingForm({ error }: { error?: string }) {
  const [gender, setGender] = useState<Gender>("male");
  const [currentPct, setCurrentPct] = useState<number>(35);

  const currentOptions = useBodyFatOptions(gender);
  const targetOptions = useMemo(
    () =>
      CHART[gender]
        .filter((r) => r.currentPct === currentPct)
        .map((r) => r.targetPct)
        .sort((a, b) => b - a),
    [gender, currentPct]
  );

  return (
    <form action={saveOnboarding} className="flex flex-col gap-5">
      <input
        type="hidden"
        name="timezone"
        value={
          typeof Intl !== "undefined"
            ? Intl.DateTimeFormat().resolvedOptions().timeZone
            : "UTC"
        }
      />

      {error && (
        <p className="rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <fieldset className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Gender
          <select
            name="gender"
            value={gender}
            onChange={(e) => {
              const g = e.target.value as Gender;
              setGender(g);
              setCurrentPct(CHART[g][0].currentPct);
            }}
            className="rounded border px-3 py-2"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Age
          <input
            name="age"
            type="number"
            min={13}
            max={100}
            required
            className="rounded border px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Height (cm)
          <input
            name="heightCm"
            type="number"
            step="0.01"
            min={100}
            max={250}
            required
            className="rounded border px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Weight (kg)
          <input
            name="weightKg"
            type="number"
            step="0.01"
            min={30}
            max={300}
            required
            className="rounded border px-3 py-2"
          />
        </label>
      </fieldset>

      <label className="flex flex-col gap-1 text-sm">
        Activity level
        <select
          name="activityLevel"
          defaultValue="moderate"
          className="rounded border px-3 py-2"
        >
          <option value="sedentary">Sedentary - little or no exercise</option>
          <option value="light">Light - exercise 1-3x/week</option>
          <option value="moderate">Moderate - exercise 4-5x/week</option>
          <option value="active">Active - daily or intense 3-4x/week</option>
          <option value="veryActive">Very active - intense 6-7x/week</option>
        </select>
      </label>

      <fieldset className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Current body fat (from the chart)
          <select
            name="bodyFatChartCategory"
            value={currentPct}
            onChange={(e) => setCurrentPct(Number(e.target.value))}
            className="rounded border px-3 py-2"
          >
            {currentOptions.map((pct) => (
              <option key={pct} value={pct}>
                {pct}%
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Target body fat
          <select
            name="targetBodyFatPct"
            className="rounded border px-3 py-2"
          >
            {targetOptions.map((pct) => (
              <option key={pct} value={pct}>
                {pct}%
              </option>
            ))}
          </select>
        </label>
      </fieldset>

      <label className="flex flex-col gap-1 text-sm">
        Hunger test result
        <select
          name="hungerTestResult"
          defaultValue="handlesHungerWell"
          className="rounded border px-3 py-2"
        >
          <option value="handlesHungerWell">
            I stay calm and focused during a 16hr fast (aggressive pace)
          </option>
          <option value="sensitiveToHunger">
            I get irritated/low-energy when hungry (sustainable pace)
          </option>
        </select>
      </label>

      <fieldset className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Training experience
          <select
            name="trainingExperience"
            defaultValue="beginner"
            className="rounded border px-3 py-2"
          >
            <option value="beginner">Beginner (0-6 months)</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Training days/week
          <input
            name="trainingDaysPerWeek"
            type="number"
            min={2}
            max={6}
            defaultValue={4}
            required
            className="rounded border px-3 py-2"
          />
        </label>
      </fieldset>

      <fieldset className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Diet preference
          <select
            name="dietType"
            defaultValue="vegetarian"
            className="rounded border px-3 py-2"
          >
            <option value="vegetarian">Vegetarian</option>
            <option value="nonVegetarian">Non-vegetarian</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Meals per day
          <input
            name="mealsPerDay"
            type="number"
            min={3}
            max={6}
            defaultValue={5}
            required
            className="rounded border px-3 py-2"
          />
        </label>
      </fieldset>

      <button type="submit" className="rounded bg-black px-4 py-2 text-white">
        Generate my plan
      </button>
    </form>
  );
}
