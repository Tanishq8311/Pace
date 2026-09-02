import { describe, expect, it } from "vitest";
import { averageWeight, splitIntoTrailingWeeks } from "./tracker.js";

describe("averageWeight", () => {
  it("returns null for no entries", () => {
    expect(averageWeight([])).toBeNull();
  });

  it("averages weightKg", () => {
    const avg = averageWeight([
      { date: "2026-01-01", weightKg: 80 },
      { date: "2026-01-02", weightKg: 82 },
    ]);
    expect(avg).toBe(81);
  });
});

describe("splitIntoTrailingWeeks", () => {
  const today = "2026-01-15";

  it("buckets entries into latest week (0-6 days ago) and previous week (7-13 days ago)", () => {
    const entries = [
      { date: "2026-01-15", weightKg: 79 }, // 0 days ago -> latest
      { date: "2026-01-10", weightKg: 80 }, // 5 days ago -> latest
      { date: "2026-01-08", weightKg: 81 }, // 7 days ago -> previous
      { date: "2026-01-02", weightKg: 82 }, // 13 days ago -> previous
      { date: "2025-12-20", weightKg: 84 }, // too old -> neither
    ];
    const { previousWeek, latestWeek } = splitIntoTrailingWeeks(entries, today);
    expect(latestWeek.map((e) => e.weightKg)).toEqual([79, 80]);
    expect(previousWeek.map((e) => e.weightKg)).toEqual([81, 82]);
  });

  it("is empty when there are no logs in range", () => {
    const { previousWeek, latestWeek } = splitIntoTrailingWeeks([], today);
    expect(previousWeek).toEqual([]);
    expect(latestWeek).toEqual([]);
  });
});
