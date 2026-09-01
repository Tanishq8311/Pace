import { describe, expect, it } from "vitest";
import { getPlanType } from "./plan-type.js";

describe("getPlanType", () => {
  it("maps handling hunger well to aggressive", () => {
    expect(getPlanType("handlesHungerWell")).toBe("aggressive");
  });

  it("maps hunger sensitivity to sustainable", () => {
    expect(getPlanType("sensitiveToHunger")).toBe("sustainable");
  });
});
