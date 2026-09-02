/* eslint-disable @next/next/no-img-element -- external demo photos, not worth next/image remote-pattern config */
"use client";

import { useState } from "react";
import {
  getExerciseInfo,
  getExerciseVideoUrl,
} from "@/lib/content/exercise-library";
import type { TrainingSession } from "@/lib/rules-engine/split-selector";

const DAY_NAMES = [
  "",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export function WeeklySplit({ sessions }: { sessions: TrainingSession[] }) {
  const sessionByDay = new Map(sessions.map((s) => [s.dayOfWeek, s]));
  const firstTrainingDay = sessions[0]?.dayOfWeek ?? 1;
  const [selected, setSelected] = useState(firstTrainingDay);
  const session = sessionByDay.get(selected);

  return (
    <div className="flex flex-col gap-4">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((dayOfWeek) => {
          const hasSession = sessionByDay.has(dayOfWeek);
          const active = dayOfWeek === selected;
          return (
            <button
              key={dayOfWeek}
              type="button"
              onClick={() => setSelected(dayOfWeek)}
              className={`flex shrink-0 flex-col items-center rounded-xl border-2 border-border px-3.5 py-2 text-xs font-bold transition-all duration-150 active:scale-90 ${
                active
                  ? "bg-yellow text-black shadow-hard"
                  : hasSession
                    ? "bg-surface text-foreground"
                    : "bg-surface text-muted/60"
              }`}
            >
              {DAY_NAMES[dayOfWeek]}
            </button>
          );
        })}
      </div>

      <div key={selected} className="card animate-pop flex flex-col gap-3">
        {session ? (
          <>
            <p className="font-display text-sm font-bold text-foreground">
              {session.label}
            </p>
            <div className="flex flex-col gap-2">
              {session.exercises.map((ex, i) => {
                const info = getExerciseInfo(ex.name);
                return (
                  <details
                    key={i}
                    className="rounded-xl border-2 border-border p-3 text-sm"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between">
                      <span className="font-medium text-foreground">
                        {ex.name}
                      </span>
                      <span className="shrink-0 pl-3 text-xs text-muted">
                        {ex.sets} × {ex.reps}
                      </span>
                    </summary>
                    {info && (
                      <div className="mt-3 flex flex-col gap-2 text-xs text-muted">
                        {info.images ? (
                          <div className="flex gap-2">
                            {info.images.map((src, j) => (
                              <img
                                key={j}
                                src={src}
                                alt={`${ex.name} demo position ${j + 1}`}
                                loading="lazy"
                                className="h-28 w-28 rounded-lg border-2 border-border object-cover"
                              />
                            ))}
                          </div>
                        ) : (
                          <iframe
                            className="aspect-video w-full rounded-lg"
                            src={getExerciseVideoUrl(info)}
                            title={`${ex.name} demo`}
                            loading="lazy"
                            allowFullScreen
                          />
                        )}
                        <ol className="list-decimal space-y-1 pl-4">
                          {info.steps.map((step, j) => (
                            <li key={j}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </details>
                );
              })}
            </div>
          </>
        ) : (
          <p className="py-6 text-center text-sm text-muted">
            Rest day — recovery walk or mobility work.
          </p>
        )}
      </div>
    </div>
  );
}
