import { describe, expect, it } from "vitest";
import { artifactText, type Knowledge } from "@/lib/i18n";
import { museumLocation } from "@/lib/museum-locations";

describe("museum location evidence", () => {
  it("matches the golden mask only to GEM 8 in the Tutankhamun Galleries", () => {
    expect(museumLocation("Religion", true)).toEqual({ accession: "GEM 8", area: "tutankhamunGalleries", source: "https://gem.eg/en/collection/artefacts/the-golden-burial-mask-of-tutankhamun", checked: "2026-10-17" });
  });
  it("never assigns physical locations to unresolved demo objects", () => {
    for (const k of Object.keys(artifactText) as Knowledge[]) {
      expect(museumLocation(k)).toBeNull();
      if (k !== "Religion") expect(museumLocation(k, true)).toBeNull();
    }
  });
});