import { describe, expect, it } from "vitest";
import { HINT_LEVELS, nextHintLevel } from "@/lib/hint-levels";

describe("progressive museum hints", () => {
  it("provides exactly three levels", () => expect(HINT_LEVELS).toEqual([1, 2, 3]));
  it("starts at level 1", () => expect(nextHintLevel(0)).toBe(1));
  it("offers level 2 after one hint", () => expect(nextHintLevel(1)).toBe(2));
  it("offers level 3 after two hints", () => expect(nextHintLevel(2)).toBe(3));
  it("never offers a fourth hint", () => expect(nextHintLevel(3)).toBeNull());
});