import type {
  ActivityLevel,
  Gender,
  HungerTestResult,
  PlanType,
} from "@/lib/rules-engine/types";

export type TrainingExperience = "beginner" | "intermediate" | "advanced";

// `type`, not `interface` - postgrest-js checks `extends Record<string, unknown>`
// on these, and interfaces don't satisfy that structural check the way type
// aliases do (a real TS quirk, not a style preference).
export type ProfileRow = {
  id: string;
  timezone: string;
  age: number;
  gender: Gender;
  height_cm: number;
  weight_kg: number;
  activity_level: ActivityLevel;
  body_fat_chart_category: number;
  target_bodyfat_pct: number;
  hunger_test_result: HungerTestResult;
  training_experience: TrainingExperience;
  training_days_per_week: number;
  bmr: number;
  tdee: number;
  target_weight_kg: number;
  plan_type: PlanType;
  updated_at: string;
};

export type ProfileInsert = Omit<ProfileRow, "updated_at">;

// Hand-written to match supabase/migrations/0001_profiles.sql - this is a single
// table, not worth wiring up `supabase gen types` for yet (see architecture plan).
// Relationships/Views/Functions are required by postgrest-js's GenericSchema shape
// even when empty.
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: ProfileInsert;
        Update: Partial<ProfileInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
