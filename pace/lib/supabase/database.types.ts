import type {
  ActivityLevel,
  DietType,
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
  diet_type: DietType;
  meals_per_day: number;
  bmr: number;
  tdee: number;
  target_weight_kg: number;
  plan_type: PlanType;
  updated_at: string;
};

export type ProfileInsert = Omit<ProfileRow, "updated_at">;

export type CycleStateRow = {
  user_id: string;
  cycle_started_at: string;
  last_recalculated_at: string | null;
  recalculated_at_weight_kg: number | null;
};

export type CycleStateInsert = Partial<
  Omit<CycleStateRow, "user_id" | "cycle_started_at">
> &
  Pick<CycleStateRow, "user_id"> &
  Partial<Pick<CycleStateRow, "cycle_started_at">>;

export type DailyLogRow = {
  user_id: string;
  log_date: string;
  weight_kg: number | null;
  waist_cm: number | null;
  steps: number | null;
  water_l: number | null;
  sleep_hours: number | null;
  training_completed: boolean | null;
  creatine_taken: boolean | null;
};

export type DailyLogInsert = Partial<
  Omit<DailyLogRow, "user_id" | "log_date">
> &
  Pick<DailyLogRow, "user_id" | "log_date">;

// Hand-written to match supabase/migrations/*.sql - a handful of small tables,
// not worth wiring up `supabase gen types` for yet (see architecture plan).
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
      cycle_state: {
        Row: CycleStateRow;
        Insert: CycleStateInsert;
        Update: Partial<CycleStateInsert>;
        Relationships: [];
      };
      daily_logs: {
        Row: DailyLogRow;
        Insert: DailyLogInsert;
        Update: Partial<DailyLogInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
