import { redirect } from "next/navigation";
import { calculateMacros } from "@/lib/rules-engine/macros";
import { getWeeklyMealPlan } from "@/lib/rules-engine/meal-matcher";
import { createClient } from "@/lib/supabase/server";

const DAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default async function PlanPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/onboarding");
  }

  const macros = calculateMacros({
    weightKg: profile.weight_kg,
    calories: profile.tdee,
  });

  const weeklyMealPlan = getWeeklyMealPlan({
    dietType: profile.diet_type,
    dailyCalories: profile.tdee,
    mealsPerDay: profile.meals_per_day,
  });

  const rows: [string, string][] = [
    ["Age / Gender / Height / Weight", `${profile.age} / ${profile.gender} / ${profile.height_cm}cm / ${profile.weight_kg}kg`],
    ["BMR (Mifflin-St Jeor)", `${profile.bmr} kcal`],
    ["Maintenance (TDEE)", `${profile.tdee} kcal/day`],
    ["Current body fat (chart)", `${profile.body_fat_chart_category}%`],
    ["Target body fat", `${profile.target_bodyfat_pct}%`],
    ["Target weight", `${profile.target_weight_kg} kg`],
    ["Plan type", profile.plan_type],
    ["Protein / Carbs / Fat at maintenance", `${macros.proteinG}g / ${macros.carbsG}g / ${macros.fatG}g`],
  ];

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Your Numbers</h1>
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
        <h2 className="text-xl font-semibold">7-Day Meal Plan</h2>
        <p className="text-sm text-gray-500">
          {macros.proteinG}g protein / {macros.carbsG}g carbs /{" "}
          {macros.fatG}g fat at {profile.tdee} kcal, split across{" "}
          {profile.meals_per_day} meals - the book's own method: divide your
          daily calories by number of meals, pick a template, adjust
          portions to hit the number.
        </p>
      </div>

      {weeklyMealPlan.map((day, i) => (
        <div key={i}>
          <h3 className="font-medium text-green-800">
            {DAY_NAMES[i]}{" "}
            <span className="font-normal text-gray-500">
              (~{day.caloriesPerMeal} kcal/meal)
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
              {day.meals.map((meal, mi) => (
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
        Diet cycle (deficit/diet-break), training split, and daily tracker
        are built next - calories above are your flat maintenance target,
        not yet cycled.
      </p>
    </main>
  );
}
