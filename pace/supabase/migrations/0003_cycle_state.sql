-- cycle_state: one row per user, tracks where they are in the 14-day-deficit /
-- 7-day-diet-break cycle. Current day/phase is derived (getCyclePosition in the
-- rules engine) from cycle_started_at, not stored - see the architecture plan's
-- note on why (avoids drift/timezone bugs from a manually incremented counter).

create table public.cycle_state (
  user_id uuid primary key references auth.users (id) on delete cascade,
  cycle_started_at timestamptz not null default now(),

  -- audit trail for the stall rule: "why did my calories change"
  last_recalculated_at timestamptz,
  recalculated_at_weight_kg numeric
);

alter table public.cycle_state enable row level security;

create policy "Users can view their own cycle state"
  on public.cycle_state for select
  using (auth.uid() = user_id);

create policy "Users can insert their own cycle state"
  on public.cycle_state for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own cycle state"
  on public.cycle_state for update
  using (auth.uid() = user_id);
