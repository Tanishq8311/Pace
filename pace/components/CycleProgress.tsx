const PHASE_LABEL = { deficit: "Deficit", dietBreak: "Diet Break" } as const;
const PHASE_BAR = { deficit: "bg-yellow", dietBreak: "bg-sage" } as const;
const PHASE_DOT = { deficit: "bg-yellow", dietBreak: "bg-sage" } as const;

export function CycleProgress({
  dayInCycle,
  cycleLength,
  phase,
  dayInPhase,
}: {
  dayInCycle: number;
  cycleLength: number;
  phase: "deficit" | "dietBreak";
  dayInPhase: number;
}) {
  const pct = Math.round((dayInCycle / cycleLength) * 100);

  return (
    <div className="card animate-fade-up flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-bold text-foreground">
          Day {dayInCycle} of {cycleLength}
        </span>
        <span className="pill">
          <span className={`mr-1.5 h-2 w-2 rounded-full ${PHASE_DOT[phase]}`} />
          {PHASE_LABEL[phase]} · day {dayInPhase}
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full border-2 border-border bg-surface-2">
        <div
          className={`h-full rounded-full transition-[width] duration-500 ease-out ${PHASE_BAR[phase]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
