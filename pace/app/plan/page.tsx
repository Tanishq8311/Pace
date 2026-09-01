import { redirect } from "next/navigation";
import { calculateMacros } from "@/lib/rules-engine/macros";
import { createClient } from "@/lib/supabase/server";

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
      <p className="text-sm text-gray-500">
        Diet cycle, training split, and daily tracker are built next - this
        page proves onboarding -&gt; rules engine -&gt; database is wired up
        correctly.
      </p>
    </main>
  );
}
