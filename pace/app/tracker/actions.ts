"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { calculateBMR, calculateTDEE } from "@/lib/rules-engine/bmr";
import { hasStalled } from "@/lib/rules-engine/cycle";
import {
  averageWeight,
  getLocalDateString,
  splitIntoTrailingWeeks,
} from "@/lib/rules-engine/tracker";
import { createClient } from "@/lib/supabase/server";

function numberOrNull(value: FormDataEntryValue | null): number | null {
  if (!value || value === "") return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
}

export async function saveDailyLog(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const logDate = String(formData.get("logDate"));

  const { error } = await supabase.from("daily_logs").upsert({
    user_id: user.id,
    log_date: logDate,
    weight_kg: numberOrNull(formData.get("weightKg")),
    waist_cm: numberOrNull(formData.get("waistCm")),
    steps: numberOrNull(formData.get("steps")),
    water_l: numberOrNull(formData.get("waterL")),
    sleep_hours: numberOrNull(formData.get("sleepHours")),
    training_completed: formData.get("trainingCompleted") === "on",
    creatine_taken: formData.get("creatineTaken") === "on",
  });

  if (error) {
    redirect("/tracker?error=" + encodeURIComponent(error.message));
  }

  await checkAndRecalculateIfStalled(user.id);

  revalidatePath("/tracker");
  revalidatePath("/plan");
  redirect("/tracker");
}

// Stall rule: no weight loss for 2 full weeks on the aggressive plan ->
// recalculate maintenance at the new (lower) bodyweight and restart the cycle.
// Runs after logging, not on every page view, since it's a mutation.
async function checkAndRecalculateIfStalled(userId: string) {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (!profile) return;

  const today = getLocalDateString(profile.timezone);

  const { data: logs } = await supabase
    .from("daily_logs")
    .select("log_date, weight_kg")
    .eq("user_id", userId)
    .not("weight_kg", "is", null)
    .gte("log_date", getLocalDateString(profile.timezone, new Date(Date.now() - 13 * 24 * 60 * 60 * 1000)))
    .lte("log_date", today);

  const entries = (logs ?? []).map((l) => ({
    date: l.log_date,
    weightKg: l.weight_kg as number,
  }));

  const { previousWeek, latestWeek } = splitIntoTrailingWeeks(entries, today);
  const previousAvg = averageWeight(previousWeek);
  const latestAvg = averageWeight(latestWeek);

  if (previousAvg === null || latestAvg === null) return;
  if (profile.plan_type !== "aggressive") return;
  if (!hasStalled([previousAvg, latestAvg])) return;

  const newWeight = latestAvg;
  const newBmr = calculateBMR({
    gender: profile.gender,
    weightKg: newWeight,
    heightCm: profile.height_cm,
    age: profile.age,
  });
  const newTdee = calculateTDEE(newBmr, profile.activity_level);

  await supabase
    .from("profiles")
    .update({ weight_kg: newWeight, bmr: newBmr, tdee: newTdee })
    .eq("id", userId);

  await supabase
    .from("cycle_state")
    .update({
      cycle_started_at: new Date().toISOString(),
      last_recalculated_at: new Date().toISOString(),
      recalculated_at_weight_kg: newWeight,
    })
    .eq("user_id", userId);
}
