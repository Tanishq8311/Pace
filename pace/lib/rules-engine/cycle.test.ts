import { describe, expect, it } from "vitest";
import { getCyclePosition, hasStalled } from "./cycle.js";

describe("getCyclePosition", () => {
  const start = new Date("2026-01-01T00:00:00Z");

  it("is deficit phase on day 1", () => {
    expect(getCyclePosition(start, start)).toEqual({
      dayInCycle: 1,
      dayInPhase: 1,
      phase: "deficit",
    });
  });

  it("is still deficit phase on day 14", () => {
    const today = new Date("2026-01-14T00:00:00Z");
    expect(getCyclePosition(start, today)).toEqual({
      dayInCycle: 14,
      dayInPhase: 14,
      phase: "deficit",
    });
  });

  it("switches to diet break on day 15", () => {
    const today = new Date("2026-01-15T00:00:00Z");
    expect(getCyclePosition(start, today)).toEqual({
      dayInCycle: 15,
      dayInPhase: 1,
      phase: "dietBreak",
    });
  });

  it("restarts the cycle at deficit on day 22", () => {
    const today = new Date("2026-01-22T00:00:00Z");
    expect(getCyclePosition(start, today)).toEqual({
      dayInCycle: 1,
      dayInPhase: 1,
      phase: "deficit",
    });
  });
});

describe("hasStalled", () => {
  it("is false with fewer than two weekly averages", () => {
    expect(hasStalled([80])).toBe(false);
  });

  it("is false when the latest average is lower than the previous", () => {
    expect(hasStalled([80, 79.4])).toBe(false);
  });

  it("is true when the latest average has not dropped", () => {
    expect(hasStalled([79.4, 79.4])).toBe(true);
    expect(hasStalled([79.4, 79.6])).toBe(true);
  });
});
