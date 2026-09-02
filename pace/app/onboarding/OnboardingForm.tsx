"use client";

import { useMemo, useState } from "react";
import bodyFatChart from "@/lib/content/bodyfat-chart.json";
import { RulerPicker } from "@/components/RulerPicker";
import { GaugeDial } from "@/components/GaugeDial";
import { SubmitButton } from "@/components/SubmitButton";
import type { Gender } from "@/lib/rules-engine/types";
import { saveOnboarding } from "./actions";

const CHART = bodyFatChart as Record<
  Gender,
  { currentPct: number; targetPct: number }[]
>;

interface FormState {
  gender: Gender;
  age: string;
  heightCm: number;
  weightKg: number;
  activityLevel: string;
  bodyFatChartCategory: number;
  targetBodyFatPct: number;
  hungerTestResult: string;
  trainingExperience: string;
  trainingDaysPerWeek: string;
  dietType: string;
  mealsPerDay: string;
}

const STEPS = ["Basics", "Body", "Composition", "Training", "Diet"] as const;

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border-2 border-border px-4 py-3 text-sm font-bold transition-all duration-150 active:scale-95 ${
        active
          ? "bg-yellow text-black shadow-hard"
          : "bg-surface text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export function OnboardingForm({ error }: { error?: string }) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<FormState>({
    gender: "male",
    age: "",
    heightCm: 170,
    weightKg: 75,
    activityLevel: "moderate",
    bodyFatChartCategory: 35,
    targetBodyFatPct: 25,
    hungerTestResult: "handlesHungerWell",
    trainingExperience: "beginner",
    trainingDaysPerWeek: "4",
    dietType: "vegetarian",
    mealsPerDay: "5",
  });

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  const currentBfOptions = useMemo(
    () =>
      [...new Set(CHART[state.gender].map((r) => r.currentPct))].sort(
        (a, b) => b - a
      ),
    [state.gender]
  );
  const targetBfOptions = useMemo(
    () =>
      CHART[state.gender]
        .filter((r) => r.currentPct === state.bodyFatChartCategory)
        .map((r) => r.targetPct)
        .sort((a, b) => b - a),
    [state.gender, state.bodyFatChartCategory]
  );

  function setGender(gender: Gender) {
    const firstCurrent = CHART[gender][0].currentPct;
    const firstTarget = CHART[gender].find(
      (r) => r.currentPct === firstCurrent
    )!.targetPct;
    setState((s) => ({
      ...s,
      gender,
      bodyFatChartCategory: firstCurrent,
      targetBodyFatPct: firstTarget,
    }));
  }

  function setCurrentBf(pct: number) {
    const firstTarget = CHART[state.gender].find(
      (r) => r.currentPct === pct
    )!.targetPct;
    setState((s) => ({
      ...s,
      bodyFatChartCategory: pct,
      targetBodyFatPct: firstTarget,
    }));
  }

  const canAdvance = step !== 0 || state.age.trim().length > 0;

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
      <input type="hidden" name="gender" value={state.gender} />
      <input type="hidden" name="age" value={state.age} />
      <input type="hidden" name="heightCm" value={state.heightCm} />
      <input type="hidden" name="weightKg" value={state.weightKg} />
      <input type="hidden" name="activityLevel" value={state.activityLevel} />
      <input
        type="hidden"
        name="bodyFatChartCategory"
        value={state.bodyFatChartCategory}
      />
      <input
        type="hidden"
        name="targetBodyFatPct"
        value={state.targetBodyFatPct}
      />
      <input
        type="hidden"
        name="hungerTestResult"
        value={state.hungerTestResult}
      />
      <input
        type="hidden"
        name="trainingExperience"
        value={state.trainingExperience}
      />
      <input
        type="hidden"
        name="trainingDaysPerWeek"
        value={state.trainingDaysPerWeek}
      />
      <input type="hidden" name="dietType" value={state.dietType} />
      <input type="hidden" name="mealsPerDay" value={state.mealsPerDay} />

      {error && <p className="pill w-fit text-danger">{error}</p>}

      {/* progress dots */}
      <div className="flex items-center gap-1.5">
        {STEPS.map((label, i) => (
          <div
            key={label}
            className={`h-2 flex-1 rounded-full border-2 border-border transition-colors duration-300 ${
              i <= step ? "bg-yellow" : "bg-surface-2"
            }`}
          />
        ))}
      </div>
      <p className="-mt-3 text-xs font-bold uppercase tracking-wide text-muted">
        Step {step + 1} of {STEPS.length} · {STEPS[step]}
      </p>

      <div key={step} className="animate-slide-right flex flex-col gap-5">
        {step === 0 && (
          <div className="card flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <Chip active={state.gender === "male"} onClick={() => setGender("male")}>
                Male
              </Chip>
              <Chip
                active={state.gender === "female"}
                onClick={() => setGender("female")}
              >
                Female
              </Chip>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="field-label">Age</span>
              <input
                type="number"
                min={13}
                max={100}
                value={state.age}
                onChange={(e) => set("age", e.target.value)}
                className="field-input"
                placeholder="e.g. 24"
              />
            </label>
          </div>
        )}

        {step === 1 && (
          <div className="card flex flex-col gap-6">
            <div className="grid grid-cols-2 items-start gap-3">
              <RulerPicker
                label="Height"
                orientation="vertical"
                value={state.heightCm}
                onChange={(v) => set("heightCm", v)}
                min={120}
                max={220}
                dragStep={0.5}
                tickInterval={1}
                majorEvery={10}
                unit="cm"
                decimals={1}
              />
              <GaugeDial
                label="Weight"
                value={state.weightKg}
                onChange={(v) => set("weightKg", v)}
                min={30}
                max={200}
                step={0.5}
                tickInterval={5}
                majorEvery={4}
                unit="kg"
                decimals={1}
              />
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="field-label">Activity level</span>
              <select
                value={state.activityLevel}
                onChange={(e) => set("activityLevel", e.target.value)}
                className="field-input"
              >
                <option value="sedentary">Sedentary — little or no exercise</option>
                <option value="light">Light — exercise 1-3x/week</option>
                <option value="moderate">Moderate — exercise 4-5x/week</option>
                <option value="active">Active — daily or intense 3-4x/week</option>
                <option value="veryActive">Very active — intense 6-7x/week</option>
              </select>
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="card flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="field-label">Current body fat</span>
                  <details className="group relative">
                    <summary className="flex h-4 w-4 cursor-pointer list-none items-center justify-center rounded-full border-2 border-border text-[10px] font-bold leading-none text-muted">
                      i
                    </summary>
                    <div className="absolute left-0 top-6 z-10 w-56 rounded-xl border-2 border-border bg-surface-2 p-3 text-xs font-normal normal-case text-muted">
                      Not sure? Estimate by how your stomach looks: visible
                      abs/vascularity ≈10-14%, flat with no visible abs ≈15-19%,
                      slight overhang ≈20-24%, visible belly overhang ≈25-29%,
                      round belly ≈30%+. If unsure, round up — starting
                      conservative is safer.
                    </div>
                  </details>
                </span>
                <select
                  value={state.bodyFatChartCategory}
                  onChange={(e) => setCurrentBf(Number(e.target.value))}
                  className="field-input"
                >
                  {currentBfOptions.map((pct) => (
                    <option key={pct} value={pct}>
                      {pct}%
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="field-label">Target body fat</span>
                <select
                  value={state.targetBodyFatPct}
                  onChange={(e) => set("targetBodyFatPct", Number(e.target.value))}
                  className="field-input"
                >
                  {targetBfOptions.map((pct) => (
                    <option key={pct} value={pct}>
                      {pct}%
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <span className="field-label">Hunger test result</span>
              <Chip
                active={state.hungerTestResult === "handlesHungerWell"}
                onClick={() => set("hungerTestResult", "handlesHungerWell")}
              >
                I stay calm during a 16hr fast (aggressive pace)
              </Chip>
              <Chip
                active={state.hungerTestResult === "sensitiveToHunger"}
                onClick={() => set("hungerTestResult", "sensitiveToHunger")}
              >
                I get irritated when hungry (sustainable pace)
              </Chip>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="field-label">Training experience</span>
              <div className="grid grid-cols-3 gap-2">
                {(["beginner", "intermediate", "advanced"] as const).map(
                  (exp) => (
                    <Chip
                      key={exp}
                      active={state.trainingExperience === exp}
                      onClick={() => set("trainingExperience", exp)}
                    >
                      {exp[0].toUpperCase() + exp.slice(1)}
                    </Chip>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="field-label">Training days/week</span>
              <div className="grid grid-cols-3 gap-2">
                {(["3", "4", "5"] as const).map((d) => (
                  <Chip
                    key={d}
                    active={state.trainingDaysPerWeek === d}
                    onClick={() => set("trainingDaysPerWeek", d)}
                  >
                    {d} days
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="card flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="field-label">Diet preference</span>
              <div className="grid grid-cols-2 gap-2">
                <Chip
                  active={state.dietType === "vegetarian"}
                  onClick={() => set("dietType", "vegetarian")}
                >
                  Vegetarian
                </Chip>
                <Chip
                  active={state.dietType === "nonVegetarian"}
                  onClick={() => set("dietType", "nonVegetarian")}
                >
                  Non-vegetarian
                </Chip>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="field-label">Meals per day</span>
              <div className="grid grid-cols-4 gap-2">
                {(["3", "4", "5", "6"] as const).map((m) => (
                  <Chip
                    key={m}
                    active={state.mealsPerDay === m}
                    onClick={() => set("mealsPerDay", m)}
                  >
                    {m}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="btn-secondary flex-1"
          >
            Back
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            disabled={!canAdvance}
            onClick={() => setStep((s) => s + 1)}
            className="btn-primary flex-1"
          >
            Next
          </button>
        ) : (
          <SubmitButton className="btn-primary flex-1" pendingText="Generating…">
            Generate my plan
          </SubmitButton>
        )}
      </div>
    </form>
  );
}
