"use server";

import { redirect } from "next/navigation";
import { calculateBMR, calculateTDEE } from "@/lib/rules-engine/bmr";
import { lookupFatLoss } from "@/lib/rules-engine/bodyfat-lookup";
import { getPlanType } from "@/lib/rules-engine/plan-type";
import type {
  ActivityLevel,
  Gender,
  HungerTestResult,
} from "@/lib/rules-engine/types";
import { createClient } from "@/lib/supabase/server";
import type { TrainingExperience } from "@/lib/supabase/database.types";

export async function saveOnboarding(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const gender = String(formData.get("gender")) as Gender;
  const age = Number(formData.get("age"));
  const heightCm = Number(formData.get("heightCm"));
  const weightKg = Number(formData.get("weightKg"));
  const activityLevel = String(formData.get("activityLevel")) as ActivityLevel;
  const bodyFatChartCategory = Number(formData.get("bodyFatChartCategory"));
  const targetBodyFatPct = Number(formData.get("targetBodyFatPct"));
  const hungerTestResult = String(
    formData.get("hungerTestResult")
  ) as HungerTestResult;
  const trainingExperience = String(
    formData.get("trainingExperience")
  ) as TrainingExperience;
  const trainingDaysPerWeek = Number(formData.get("trainingDaysPerWeek"));
  const timezone = String(formData.get("timezone") || "UTC");

  let fatLoss;
  try {
    fatLoss = lookupFatLoss(
      gender,
      bodyFatChartCategory,
      targetBodyFatPct,
      weightKg
    );
  } catch {
    redirect(
      "/onboarding?error=" +
        encodeURIComponent(
          "That current/target body-fat combination isn't on the chart - pick a smaller jump."
        )
    );
  }

  const bmr = calculateBMR({ gender, weightKg, heightCm, age });
  const tdee = calculateTDEE(bmr, activityLevel);
  const planType = getPlanType(hungerTestResult);

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    timezone,
    age,
    gender,
    height_cm: heightCm,
    weight_kg: weightKg,
    activity_level: activityLevel,
    body_fat_chart_category: bodyFatChartCategory,
    target_bodyfat_pct: targetBodyFatPct,
    hunger_test_result: hungerTestResult,
    training_experience: trainingExperience,
    training_days_per_week: trainingDaysPerWeek,
    bmr,
    tdee,
    target_weight_kg: fatLoss!.targetWeightKg,
    plan_type: planType,
  });

  if (error) {
    redirect("/onboarding?error=" + encodeURIComponent(error.message));
  }

  redirect("/plan");
}
