-- profiles: one row per user - biometrics + latest computed targets.
-- Targets are overwritten on recalculation (stall rule), not versioned - see
-- the architecture plan's note on this.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  timezone text not null default 'UTC',

  -- biometrics (Onboarding module input)
  age smallint not null,
  gender text not null check (gender in ('male', 'female')),
  height_cm numeric not null,
  weight_kg numeric not null,
  activity_level text not null check (
    activity_level in ('sedentary', 'light', 'moderate', 'active', 'veryActive')
  ),
  body_fat_chart_category smallint not null,
  target_bodyfat_pct smallint not null,
  hunger_test_result text not null check (
    hunger_test_result in ('handlesHungerWell', 'sensitiveToHunger')
  ),

  -- training preference (drives the split-selector, added later)
  training_experience text not null check (
    training_experience in ('beginner', 'intermediate', 'advanced')
  ),
  training_days_per_week smallint not null,

  -- computed by the rules engine on submit/recalculation
  bmr integer not null,
  tdee integer not null,
  target_weight_kg numeric not null,
  plan_type text not null check (plan_type in ('aggressive', 'sustainable')),

  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);
