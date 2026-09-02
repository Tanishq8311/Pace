import Link from "next/link";
import { redirect } from "next/navigation";
import { getCaloriesForPhase } from "@/lib/rules-engine/deficit";
import { calculateMacros } from "@/lib/rules-engine/macros";
import { getDailyMealPlan } from "@/lib/rules-engine/meal-matcher";
import { getCyclePosition } from "@/lib/rules-engine/cycle";
import { createClient } from "@/lib/supabase/server";

const DAY_LABEL = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

const PHASE_LABEL = { deficit: "Deficit", dietBreak: "Diet Break" } as const;

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
  const todayCalories = getCaloriesForPhase(
    profile.tdee,
    profile.plan_type,
    todayPosition.phase
  );
  const todayMacros = calculateMacros({
    weightKg: profile.weight_kg,
    calories: todayCalories,
  });

  const rows: [string, string][] = [
    ["Age / Gender / Height / Weight", `${profile.age} / ${profile.gender} / ${profile.height_cm}cm / ${profile.weight_kg}kg`],
    ["BMR (Mifflin-St Jeor)", `${profile.bmr} kcal`],
    ["Maintenance (TDEE)", `${profile.tdee} kcal/day`],
    ["Current body fat (chart)", `${profile.body_fat_chart_category}%`],
    ["Target body fat", `${profile.target_bodyfat_pct}%`],
    ["Target weight", `${profile.target_weight_kg} kg`],
    ["Plan type", profile.plan_type],
    [
      "Cycle position",
      `Day ${todayPosition.dayInCycle} of 21 (${PHASE_LABEL[todayPosition.phase]}, day ${todayPosition.dayInPhase} of that phase)`,
    ],
    [
      "Today's calories / macros",
      `${todayCalories} kcal - ${todayMacros.proteinG}g protein / ${todayMacros.carbsG}g carbs / ${todayMacros.fatG}g fat`,
    ],
  ];

  const next7Days = Array.from({ length: 7 }, (_, i) => {
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
    return { date, position, calories, mealPlan };
  });

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Numbers</h1>
        <div className="flex gap-4 text-sm">
          <Link href="/training" className="underline">
            Training split
          </Link>
          <Link href="/tracker" className="underline">
            Tracker
          </Link>
        </div>
      </div>
      <table className="w-full border-collapse text-sm">
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label} className="border-b">
              <td className="py-2 pr-4 font-medium text-gray-600">{label}</td>
              <td className="py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2 className="text-xl font-semibold">Next 7 Days</h2>
        <p className="text-sm text-gray-500">
          Calories shift automatically between deficit and diet-break days as
          your cycle progresses - the book&apos;s own method: divide the
          day&apos;s calories by number of meals, pick a template, adjust
          portions to hit the number.
        </p>
      </div>

      {next7Days.map(({ date, position, calories, mealPlan }, i) => (
        <div key={i}>
          <h3 className="font-medium text-green-800">
            {DAY_LABEL.format(date)}{" "}
            <span className="font-normal text-gray-500">
              - {PHASE_LABEL[position.phase]}, {calories} kcal (~
              {mealPlan.caloriesPerMeal} kcal/meal)
            </span>
          </h3>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-1 pr-3">Meal</th>
                <th className="py-1 pr-3">Protein</th>
                <th className="py-1 pr-3">Carbs</th>
                <th className="py-1 pr-3">Fat</th>
                <th className="py-1">Fibre</th>
              </tr>
            </thead>
            <tbody>
              {mealPlan.meals.map((meal, mi) => (
                <tr key={mi} className="border-b">
                  <td className="py-1 pr-3 font-medium">{meal.name}</td>
                  <td className="py-1 pr-3">{meal.protein}</td>
                  <td className="py-1 pr-3">{meal.carbs}</td>
                  <td className="py-1 pr-3">{meal.fat}</td>
                  <td className="py-1">{meal.fibre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <p className="text-sm text-gray-500">
        See your <Link href="/training" className="underline">training split</Link>{" "}
        for exercises. Daily tracker is built next.
      </p>
    </main>
  );
}
