import { describe, expect, it } from "vitest";
import { civilizationLevel, civilizationStage, storyVoice, artifactText, tr, type Knowledge, type Lang } from "@/lib/i18n";

describe("civilization game progression", () => {
  it("derives bounded levels from restored knowledge", () => {
    expect(Array.from({ length: 9 }, (_, i) => civilizationLevel(i))).toEqual([1, 2, 2, 2, 3, 3, 4, 4, 5]);
  });
  it("localizes every stage, speaker, and honest location message", () => {
    for (const lang of ["en", "ar", "fr"] as Lang[]) {
      for (let count = 0; count <= 8; count++) expect(civilizationStage(count, lang)).toBeTruthy();
      for (const k of Object.keys(artifactText) as Knowledge[]) expect(storyVoice(k, lang)).toBeTruthy();
      expect(tr("locationUnverified", lang)).toBeTruthy();
      expect(tr("childLocation", lang)).toBeTruthy();
    }
    expect(tr("locationUnverified", "en")).toMatch(/not verified/);
  });
});