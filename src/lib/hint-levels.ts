export const HINT_LEVELS = [1, 2, 3] as const;
export type HintLevel = (typeof HINT_LEVELS)[number];
export function nextHintLevel(revealed: number): HintLevel | null {
  return HINT_LEVELS[revealed] ?? null;
}