import { redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { CycleProgress } from "@/components/CycleProgress";
import { StatTile } from "@/components/StatTile";
import { WeeklyMealPlan, type DayPlan } from "@/components/WeeklyMealPlan";
import { getCyclePosition, CYCLE_LENGTH_DAYS } from "@/lib/rules-engine/cycle";
import { getCaloriesForPhase } from "@/lib/rules-engine/deficit";
import { calculateMacros } from "@/lib/rules-engine/macros";
import { getDailyMealPlan } from "@/lib/rules-engine/meal-matcher";
import { createClient } from "@/lib/supabase/server";

const SHORT_DAY = new Intl.DateTimeFormat("en-US", { weekday: "short" });
const FULL_DAY = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

export default async function PlanPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: profile }, { data: cycleState }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("cycle_state")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle(),
  ]);

  if (!profile) {
    redirect("/onboarding");
  }

  const cycleStartedAt = cycleState
    ? new Date(cycleState.cycle_started_at)
    : new Date();

  const today = new Date();
  const todayPosition = getCyclePosition(cycleStartedAt, today);

  const days: DayPlan[] = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const position = getCyclePosition(cycleStartedAt, date);
    const calories = getCaloriesForPhase(
      profile.tdee,
      profile.plan_type,
      position.phase
    );
    const mealPlan = getDailyMealPlan({
      dietType: profile.diet_type,
      dailyCalories: calories,
      mealsPerDay: profile.meals_per_day,
      dayIndex: i,
    });
    return {
      shortLabel: i === 0 ? "Today" : SHORT_DAY.format(date),
      dateLabel: FULL_DAY.format(date),
      phase: position.phase,
      calories,
      caloriesPerMeal: mealPlan.caloriesPerMeal,
      meals: mealPlan.meals,
    };
  });

  const todayMacros = calculateMacros({
    weightKg: profile.weight_kg,
    calories: days[0].calories,
  });

  return (
    <AppShell>
      <main className="page-shell">
        <div className="animate-fade-up">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Your Plan
          </h1>
          <p className="mt-1 text-sm text-muted">
            {profile.target_weight_kg}kg target ·{" "}
            {profile.plan_type === "aggressive" ? "Aggressive" : "Sustainable"}{" "}
            pace
          </p>
        </div>

        <CycleProgress
          dayInCycle={todayPosition.dayInCycle}
          cycleLength={CYCLE_LENGTH_DAYS}
          phase={todayPosition.phase}
          dayInPhase={todayPosition.dayInPhase}
        />

        <div className="grid grid-cols-2 gap-3">
          <StatTile label="Today's calories" value={`${days[0].calories}`} sub="kcal" />
          <StatTile label="Protein" value={`${todayMacros.proteinG}g`} />
          <StatTile label="Carbs" value={`${todayMacros.carbsG}g`} />
          <StatTile label="Fat" value={`${todayMacros.fatG}g`} />
        </div>

        <div className="card flex flex-col gap-2">
          <h2 className="section-title text-sm">Your Numbers</h2>
          <dl className="grid grid-cols-2 gap-y-2 text-sm">
            <dt className="text-muted">BMR</dt>
            <dd className="text-right font-medium">{profile.bmr} kcal</dd>
            <dt className="text-muted">Maintenance (TDEE)</dt>
            <dd className="text-right font-medium">{profile.tdee} kcal</dd>
            <dt className="text-muted">Body fat</dt>
            <dd className="text-right font-medium">
              {profile.body_fat_chart_category}% → {profile.target_bodyfat_pct}%
            </dd>
            <dt className="text-muted">Weight</dt>
            <dd className="text-right font-medium">
              {profile.weight_kg}kg → {profile.target_weight_kg}kg
            </dd>
          </dl>
        </div>

        <div>
          <h2 className="section-title mb-1">Meal Plan</h2>
          <p className="mb-3 text-xs text-muted">
            Calories shift automatically between deficit and diet-break days.
            Pick a template, adjust portions in your tracking app to hit the
            number.
          </p>
          <WeeklyMealPlan days={days} />
        </div>
      </main>
    </AppShell>
  );
}
