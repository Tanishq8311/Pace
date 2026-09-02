export function StatTile({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="card animate-fade-up flex flex-col gap-1">
      <span className="field-label">{label}</span>
      <span className="text-2xl font-extrabold tracking-tight text-foreground">
        {value}
      </span>
      {sub && <span className="text-xs font-medium text-muted">{sub}</span>}
    </div>
  );
}
