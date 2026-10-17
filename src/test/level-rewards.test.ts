import { describe, expect, it } from "vitest";
import { chapterForAge, earnedChapters, type Knowledge } from "@/lib/i18n";

const order: Knowledge[] = ["Agriculture", "Religion", "Architecture", "Writing", "Government", "Trade", "Medicine", "Military"];
describe("earned civilization rewards", () => {
  it("awards a story at every level, only when that level is reached", () => {
    expect(Array.from({ length: 9 }, (_, count) => earnedChapters(order.slice(0, count)).map((chapter) => chapter.level))).toEqual([[1], [1, 2], [1, 2], [1, 2], [1, 2, 3], [1, 2, 3], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4, 5]]);
  });
  it("does not earn extra rewards by rescanning the same knowledge", () => {
    expect(earnedChapters(Array(8).fill("Agriculture")).map((chapter) => chapter.level)).toEqual([1, 2]);
  });
  it("selects age-matched stories without altering earned progress", () => {
    const chapter = earnedChapters(order)[4];
    if (!chapter) throw new Error("Missing final level reward");
    expect(chapterForAge(chapter, "ar", "child")).toBe(chapter.child.ar);
    expect(chapterForAge(chapter, "fr", "adult")).toBe(chapter.story.fr);
  });
});