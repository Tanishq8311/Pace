import { redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { CheckCircleIcon, CircleIcon } from "@/components/icons";
import { StatTile } from "@/components/StatTile";
import { SubmitButton } from "@/components/SubmitButton";
import {
  averageWeight,
  getLocalDateString,
  splitIntoTrailingWeeks,
} from "@/lib/rules-engine/tracker";
import { createClient } from "@/lib/supabase/server";
import { saveDailyLog } from "./actions";

export default async function TrackerPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
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

  const today = getLocalDateString(profile.timezone);
  const fourteenDaysAgo = getLocalDateString(
    profile.timezone,
    new Date(Date.now() - 13 * 24 * 60 * 60 * 1000)
  );

  const { data: logs } = await supabase
    .from("daily_logs")
    .select("*")
    .eq("user_id", user.id)
    .gte("log_date", fourteenDaysAgo)
    .lte("log_date", today)
    .order("log_date", { ascending: false });

  const todayLog = logs?.find((l) => l.log_date === today) ?? null;

  const weightEntries = (logs ?? [])
    .filter((l) => l.weight_kg !== null)
    .map((l) => ({ date: l.log_date, weightKg: l.weight_kg as number }));
  const { previousWeek, latestWeek } = splitIntoTrailingWeeks(
    weightEntries,
    today
  );
  const previousAvg = averageWeight(previousWeek);
  const latestAvg = averageWeight(latestWeek);

  const checklist = [
    { label: "7-9 hr sleep", done: (todayLog?.sleep_hours ?? 0) >= 7 },
    { label: "8,000-10,000 steps", done: (todayLog?.steps ?? 0) >= 8000 },
    {
      label: "Training logged (or rest)",
      done: todayLog?.training_completed === true,
    },
    { label: "3-4 L water", done: (todayLog?.water_l ?? 0) >= 3 },
    { label: "Creatine taken", done: todayLog?.creatine_taken === true },
  ];

  return (
    <AppShell>
      <main className="page-shell">
        <div className="animate-fade-up">
          <h1 className="font-display text-2xl font-extrabold tracking-tight">
            Tracker
          </h1>
          <p className="mt-1 text-sm text-muted">Today — {today}</p>
        </div>

        {error && <p className="pill w-fit text-danger">{error}</p>}

        <div className="grid grid-cols-2 gap-3">
          <StatTile
            label="Previous week avg"
            value={previousAvg !== null ? `${previousAvg.toFixed(1)}kg` : "—"}
          />
          <StatTile
            label="Latest week avg"
            value={latestAvg !== null ? `${latestAvg.toFixed(1)}kg` : "—"}
          />
        </div>
        {previousAvg !== null &&
          latestAvg !== null &&
          latestAvg >= previousAvg && (
            <p className="rounded-xl border-2 border-border bg-sage/30 p-3 text-xs font-medium text-foreground">
              No drop in your weekly average — expected sometimes, not
              failure. On the aggressive plan, logging today already
              recalculated your maintenance at your current weight and
              restarted the cycle.
            </p>
          )}

        <div className="card flex flex-col gap-1">
          <h2 className="section-title mb-1 text-sm">Daily Checklist</h2>
          {checklist.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 py-1.5">
              {item.done ? (
                <CheckCircleIcon className="h-5 w-5 text-foreground" />
              ) : (
                <CircleIcon className="h-5 w-5 text-border" />
              )}
              <span
                className={`text-sm ${item.done ? "text-foreground" : "text-muted"}`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <form action={saveDailyLog} className="card flex flex-col gap-4">
          <input type="hidden" name="logDate" value={today} />
          <h2 className="section-title text-sm">Log today</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="field-label">Weight (kg)</span>
              <input
                name="weightKg"
                type="number"
                step="0.01"
                defaultValue={todayLog?.weight_kg ?? ""}
                className="field-input"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="field-label">Waist (cm)</span>
              <input
                name="waistCm"
                type="number"
                step="0.1"
                defaultValue={todayLog?.waist_cm ?? ""}
                className="field-input"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="field-label">Steps</span>
              <input
                name="steps"
                type="number"
                defaultValue={todayLog?.steps ?? ""}
                className="field-input"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="field-label">Water (L)</span>
              <input
                name="waterL"
                type="number"
                step="0.1"
                defaultValue={todayLog?.water_l ?? ""}
                className="field-input"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="field-label">Sleep (hours)</span>
              <input
                name="sleepHours"
                type="number"
                step="0.1"
                defaultValue={todayLog?.sleep_hours ?? ""}
                className="field-input"
              />
            </label>
          </div>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              name="trainingCompleted"
              type="checkbox"
              defaultChecked={todayLog?.training_completed ?? false}
              className="h-4 w-4 accent-[var(--yellow)]"
            />
            Training session done (or scheduled rest)
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              name="creatineTaken"
              type="checkbox"
              defaultChecked={todayLog?.creatine_taken ?? false}
              className="h-4 w-4 accent-[var(--yellow)]"
            />
            Creatine taken
          </label>
          <SubmitButton className="btn-primary" pendingText="Saving…">
            Save today&apos;s log
          </SubmitButton>
        </form>

        <div className="card flex flex-col gap-1">
          <h2 className="section-title mb-1 text-sm">Recent Logs</h2>
          {(logs ?? []).length === 0 && (
            <p className="text-sm text-muted">No logs yet.</p>
          )}
          {(logs ?? []).map((log) => (
            <div
              key={log.log_date}
              className="flex items-center justify-between border-b border-border py-2 text-sm last:border-0"
            >
              <span className="text-muted">{log.log_date}</span>
              <span className="font-medium">
                {log.weight_kg !== null ? `${log.weight_kg}kg` : "—"}
              </span>
              <span className="text-muted">
                {log.steps !== null ? `${log.steps} steps` : "—"}
              </span>
              <span
                className={
                  log.training_completed === true
                    ? "text-foreground font-bold"
                    : "text-muted"
                }
              >
                {log.training_completed === true ? "Trained" : "—"}
              </span>
            </div>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
