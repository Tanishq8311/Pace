import { redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { WeeklySplit } from "@/components/WeeklySplit";
import { getTrainingSplit } from "@/lib/rules-engine/split-selector";
import type { TrainingDaysPerWeek } from "@/lib/rules-engine/split-selector";
import { createClient } from "@/lib/supabase/server";

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

  return (
    <AppShell>
      <main className="page-shell">
        <div className="animate-fade-up">
          <h1 className="text-2xl font-extrabold tracking-tight">
            {split.name}
          </h1>
          <p className="mt-1 text-sm text-muted">
            Rest 60-90 sec between sets, stop 1-2 reps before failure.
            ~20-25 min cardio after each session.
          </p>
        </div>

        <WeeklySplit sessions={split.sessions} />

        <div className="card flex flex-col gap-2">
          <h2 className="section-title text-sm">Progression</h2>
          <dl className="flex flex-col gap-2 text-sm">
            {split.progression.map((step, i) => (
              <div key={i} className="flex justify-between gap-3">
                <dt className="shrink-0 font-medium text-muted">
                  {step.week}
                </dt>
                <dd className="text-right text-foreground">{step.focus}</dd>
              </div>
            ))}
          </dl>
        </div>
      </main>
    </AppShell>
  );
}
