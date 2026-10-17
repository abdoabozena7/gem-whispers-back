import type { Knowledge } from "@/lib/i18n";

/** Only exact object matches with an official GEM collection source qualify. */
export function museumLocation(k: Knowledge, alternate = false) {
  if (k !== "Religion" || !alternate) return null;
  return {
    accession: "GEM 8",
    area: "tutankhamunGalleries" as const,
    source: "https://gem.eg/en/collection/artefacts/the-golden-burial-mask-of-tutankhamun",
    checked: "2026-10-17",
  };
}