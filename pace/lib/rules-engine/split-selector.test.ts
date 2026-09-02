import { describe, expect, it } from "vitest";
import { getTrainingSplit } from "./split-selector.js";

describe("getTrainingSplit", () => {
  it("returns an exact match when the book has one", () => {
    const split = getTrainingSplit("male", "beginner", 3);
    expect(split.name).toBe("3-Day Split (Beginner)");
    expect(split.sessions).toHaveLength(3);
  });

  it("falls back to the nearest available tier when the exact one is missing (men have no advanced 3-day)", () => {
    const split = getTrainingSplit("male", "advanced", 3);
    expect(split.name).toBe("3-Day Split (Intermediate)");
  });

  it("falls back to the nearest available tier for women (no beginner 5-day)", () => {
    const split = getTrainingSplit("female", "beginner", 5);
    expect(split.name).toBe("5-Day Split (Intermediate)");
  });

  it("returns the only available tier when there's just one option (women's 3-day is Beginner-only)", () => {
    const split = getTrainingSplit("female", "advanced", 3);
    expect(split.name).toBe("3-Day Split (Beginner)");
  });

  it("every session's exercises have positive sets and a non-empty reps string", () => {
    const split = getTrainingSplit("male", "advanced", 5);
    for (const session of split.sessions) {
      for (const exercise of session.exercises) {
        expect(exercise.sets).toBeGreaterThan(0);
        expect(exercise.reps.length).toBeGreaterThan(0);
      }
    }
  });
});
