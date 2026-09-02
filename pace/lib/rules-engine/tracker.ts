const MS_PER_DAY = 24 * 60 * 60 * 1000;

// The user's local calendar date (profiles.timezone), formatted YYYY-MM-DD -
// en-CA locale is the standard trick for ISO-shaped output from Intl without
// manual padding.
export function getLocalDateString(
  timezone: string,
  referenceDate: Date = new Date()
): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: timezone }).format(
    referenceDate
  );
}

export interface WeightLogEntry {
  date: string; // YYYY-MM-DD
  weightKg: number;
}

export function averageWeight(entries: WeightLogEntry[]): number | null {
  if (entries.length === 0) return null;
  const sum = entries.reduce((total, e) => total + e.weightKg, 0);
  return sum / entries.length;
}

// Book's tracking method: "weigh yourself daily, use the weekly average (not
// single-day swings) to judge progress" + the stall rule compares the trailing
// two weekly averages. Splits into [7 days ago .. 13 days ago] and
// [today .. 6 days ago] relative to `todayDate`.
//
// Both dates are plain YYYY-MM-DD strings (the user's local calendar date, per
// daily_logs.log_date - see the architecture plan's note on timezone handling),
// parsed as UTC consistently so day-difference math isn't thrown off by mixing
// local- and UTC-interpreted Dates.
export function splitIntoTrailingWeeks(
  entries: WeightLogEntry[],
  todayDate: string
): { previousWeek: WeightLogEntry[]; latestWeek: WeightLogEntry[] } {
  const todayMs = Date.parse(`${todayDate}T00:00:00Z`);

  const previousWeek: WeightLogEntry[] = [];
  const latestWeek: WeightLogEntry[] = [];

  for (const entry of entries) {
    const entryMs = Date.parse(`${entry.date}T00:00:00Z`);
    const daysAgo = Math.floor((todayMs - entryMs) / MS_PER_DAY);
    if (daysAgo >= 0 && daysAgo <= 6) {
      latestWeek.push(entry);
    } else if (daysAgo >= 7 && daysAgo <= 13) {
      previousWeek.push(entry);
    }
  }

  return { previousWeek, latestWeek };
}
