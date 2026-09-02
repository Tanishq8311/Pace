import Link from "next/link";
import { redirect } from "next/navigation";
import { getTrainingSplit } from "@/lib/rules-engine/split-selector";
import type { TrainingDaysPerWeek } from "@/lib/rules-engine/split-selector";
import { createClient } from "@/lib/supabase/server";

const DAY_NAMES = [
  "",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default async function TrainingPage() {
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

  const split = getTrainingSplit(
    profile.gender,
    profile.training_experience,
    profile.training_days_per_week as TrainingDaysPerWeek
  );

  const sessionByDay = new Map(split.sessions.map((s) => [s.dayOfWeek, s]));

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{split.name}</h1>
        <Link href="/plan" className="text-sm underline">
          Back to plan
        </Link>
      </div>

      {Array.from({ length: 7 }, (_, i) => i + 1).map((dayOfWeek) => {
        const session = sessionByDay.get(dayOfWeek);
        return (
          <div key={dayOfWeek}>
            <h3 className="font-medium text-green-800">
              {DAY_NAMES[dayOfWeek]}{" "}
              <span className="font-normal text-gray-500">
                {session ? `- ${session.label}` : "- Rest"}
              </span>
            </h3>
            {session && (
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="py-1 pr-3">Exercise</th>
                    <th className="py-1">Sets x Reps</th>
                  </tr>
                </thead>
                <tbody>
                  {session.exercises.map((ex, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-1 pr-3 font-medium">{ex.name}</td>
                      <td className="py-1">
                        {ex.sets} x {ex.reps}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      })}

      <div>
        <h2 className="text-xl font-semibold">Progression</h2>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {split.progression.map((step, i) => (
              <tr key={i} className="border-b">
                <td className="py-2 pr-4 font-medium text-gray-600">
                  {step.week}
                </td>
                <td className="py-2">{step.focus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-500">
        Rest 60-90 sec between sets unless noted, stop 1-2 reps before
        failure. After each session: ~20-25 min moderate cardio.
      </p>
    </main>
  );
}
