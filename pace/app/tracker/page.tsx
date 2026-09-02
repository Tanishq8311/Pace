import Link from "next/link";
import { redirect } from "next/navigation";
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
    { label: "Training logged (or rest)", done: todayLog?.training_completed === true },
    { label: "3-4 L water", done: (todayLog?.water_l ?? 0) >= 3 },
    { label: "Creatine taken", done: todayLog?.creatine_taken === true },
  ];

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tracker</h1>
        <Link href="/plan" className="text-sm underline">
          Back to plan
        </Link>
      </div>

      {error && (
        <p className="rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <form action={saveDailyLog} className="flex flex-col gap-4">
        <input type="hidden" name="logDate" value={today} />
        <h2 className="text-lg font-semibold">Today ({today})</h2>
        <fieldset className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-sm">
            Weight (kg)
            <input
              name="weightKg"
              type="number"
              step="0.01"
              defaultValue={todayLog?.weight_kg ?? ""}
              className="rounded border px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Waist (cm)
            <input
              name="waistCm"
              type="number"
              step="0.1"
              defaultValue={todayLog?.waist_cm ?? ""}
              className="rounded border px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Steps
            <input
              name="steps"
              type="number"
              defaultValue={todayLog?.steps ?? ""}
              className="rounded border px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Water (L)
            <input
              name="waterL"
              type="number"
              step="0.1"
              defaultValue={todayLog?.water_l ?? ""}
              className="rounded border px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Sleep (hours)
            <input
              name="sleepHours"
              type="number"
              step="0.1"
              defaultValue={todayLog?.sleep_hours ?? ""}
              className="rounded border px-3 py-2"
            />
          </label>
        </fieldset>
        <label className="flex items-center gap-2 text-sm">
          <input
            name="trainingCompleted"
            type="checkbox"
            defaultChecked={todayLog?.training_completed ?? false}
          />
          Training session done (or scheduled rest)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            name="creatineTaken"
            type="checkbox"
            defaultChecked={todayLog?.creatine_taken ?? false}
          />
          Creatine taken
        </label>
        <button type="submit" className="rounded bg-black px-4 py-2 text-white">
          Save today&apos;s log
        </button>
      </form>

      <div>
        <h2 className="text-lg font-semibold">Daily Checklist</h2>
        <ul className="text-sm">
          {checklist.map((item) => (
            <li key={item.label} className="flex items-center gap-2 py-1">
              <span>{item.done ? "✅" : "⬜"}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Weekly Average</h2>
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr className="border-b">
              <td className="py-2 pr-4 font-medium text-gray-600">
                Previous week avg
              </td>
              <td className="py-2">
                {previousAvg !== null ? `${previousAvg.toFixed(1)} kg` : "-"}
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4 font-medium text-gray-600">
                Latest week avg
              </td>
              <td className="py-2">
                {latestAvg !== null ? `${latestAvg.toFixed(1)} kg` : "-"}
              </td>
            </tr>
          </tbody>
        </table>
        {previousAvg !== null && latestAvg !== null && latestAvg >= previousAvg && (
          <p className="mt-2 text-sm text-amber-700">
            No drop in your weekly average - this is expected sometimes, not
            failure. On the aggressive plan, logging today already
            recalculated your maintenance at your current weight and
            restarted the cycle.
          </p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold">Recent Logs</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="py-1 pr-3">Date</th>
              <th className="py-1 pr-3">Weight</th>
              <th className="py-1 pr-3">Steps</th>
              <th className="py-1">Training</th>
            </tr>
          </thead>
          <tbody>
            {(logs ?? []).map((log) => (
              <tr key={log.log_date} className="border-b">
                <td className="py-1 pr-3">{log.log_date}</td>
                <td className="py-1 pr-3">
                  {log.weight_kg !== null ? `${log.weight_kg} kg` : "-"}
                </td>
                <td className="py-1 pr-3">{log.steps ?? "-"}</td>
                <td className="py-1">
                  {log.training_completed === true ? "Done" : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
