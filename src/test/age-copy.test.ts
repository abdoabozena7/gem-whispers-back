import { describe, expect, it } from "vitest";
import { artifactDetailForAge, artifactText, hintsForAge, identityForAge, problemForAge, reactionForAge, tr, type Age, type Knowledge, type Lang } from "@/lib/i18n";

describe("age-matched museum copy", () => {
  const ages: Age[] = ["child", "teen", "adult"];
  const langs: Lang[] = ["en", "ar", "fr"];
  const areas = Object.keys(artifactText) as Knowledge[];
  it("provides localized stories and exactly three clues for every audience", () => {
    for (const age of ages) for (const lang of langs) for (const k of areas) {
      expect(problemForAge(k, lang, age).length).toBeGreaterThan(10);
      expect(hintsForAge(k, lang, age)).toHaveLength(3);
      expect(artifactDetailForAge(k, lang, age)).toBeTruthy();
      expect(artifactDetailForAge(k, lang, age, true)).toBeTruthy();
      expect(reactionForAge(k, lang, age)).toBeTruthy();
    }
  });
  it("uses different problems for each age, without changing the matching answer", () => {
    for (const lang of langs) for (const k of areas) {
      expect(new Set(ages.map((age) => problemForAge(k, lang, age))).size).toBe(3);
      expect(new Set(ages.map((age) => hintsForAge(k, lang, age)[2])).size).toBe(1);
    }
  });
  it("keeps child copy concrete and brief, not frightening", () => {
    for (const k of areas) {
      expect(problemForAge(k, "en", "child").split(/\s+/).length).toBeLessThanOrEqual(22);
      expect(problemForAge(k, "en", "child")).not.toMatch(/hunger|death|fever|stranger|vanish|eternity/i);
    }
    expect(tr("whatSolves", "en", "child")).toBe("Which object could help?");
    expect(tr("scan", "en", "child")).toBe(tr("scan", "en"));
  });
  it("localizes civilization identity", () => {
    expect(identityForAge(["Writing", "Architecture"], "ar", "adult")).toBe("مملكة البنّائين");
    expect(identityForAge([], "en", "child")).toBe("Your sleeping town");
  });
});