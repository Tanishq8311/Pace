export function Loader({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div className="loader-bar flex h-9 w-9 items-center justify-center rounded-lg border-2 border-border bg-yellow">
        <span className="font-display text-base font-extrabold text-charcoal">P</span>
      </div>
      {label ? <p className="text-xs font-bold uppercase tracking-wide text-muted">{label}</p> : null}
    </div>
  );
}

export function LoaderOverlay({ label }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Loader label={label} />
    </div>
  );
}

export function RunningLoader({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-6">
      <div className="relative flex h-14 w-16 items-center justify-center">
        <span className="speed-line speed-line-1 absolute left-0 top-3 h-0.5 w-3 rounded-full bg-muted" />
        <span className="speed-line speed-line-2 absolute left-0 top-6 h-0.5 w-2.5 rounded-full bg-muted" />
        <span className="speed-line speed-line-3 absolute left-0 top-9 h-0.5 w-3.5 rounded-full bg-muted" />
        <svg
          viewBox="0 0 32 32"
          className="runner-bob h-14 w-14"
          fill="none"
          stroke="var(--foreground)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="16" cy="8" r="4.5" fill="var(--yellow)" stroke="var(--foreground)" strokeWidth="2.4" />
          <line x1="16" y1="12.5" x2="15.5" y2="20" />
          <path className="runner-arm-back" d="M16 13 L14 17 L16 20" style={{ transformOrigin: "16px 13px" }} />
          <path className="runner-arm-front" d="M16 13 L18 17 L16 20" style={{ transformOrigin: "16px 13px" }} />
          <path className="runner-leg-back" d="M15.5 20 L13 25 L15 30" style={{ transformOrigin: "15.5px 20px" }} />
          <path className="runner-leg-front" d="M15.5 20 L18 25 L16 30" style={{ transformOrigin: "15.5px 20px" }} />
        </svg>
      </div>
      {label ? <p className="text-xs font-bold uppercase tracking-wide text-muted">{label}</p> : null}
    </div>
  );
}
