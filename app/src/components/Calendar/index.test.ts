import { describe, expect, it } from "vitest";
import { getSequenceDays } from ".";

describe("getSequenceDays", () => {
  it("should start from Monday", () => {
    expect(getSequenceDays()).toEqual(["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]);
  });

  it("should start from Sunday", () => {
    expect(getSequenceDays(7)).toEqual(["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]);
  });
});
