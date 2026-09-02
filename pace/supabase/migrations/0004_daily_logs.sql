-- daily_logs: one row per user per local day - the tracker. log_date is the
-- user's local calendar date (profiles.timezone), not server UTC, so entries
-- land on the day the user actually experienced - see the architecture plan's
-- note on this.

create table public.daily_logs (
  user_id uuid not null references auth.users (id) on delete cascade,
  log_date date not null,
  weight_kg numeric,
  waist_cm numeric,
  steps integer,
  water_l numeric,
  sleep_hours numeric,
  training_completed boolean,
  creatine_taken boolean,
  primary key (user_id, log_date)
);

alter table public.daily_logs enable row level security;

create policy "Users can view their own logs"
  on public.daily_logs for select
  using (auth.uid() = user_id);

create policy "Users can insert their own logs"
  on public.daily_logs for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own logs"
  on public.daily_logs for update
  using (auth.uid() = user_id);
