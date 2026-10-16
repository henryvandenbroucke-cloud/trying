// Tutorial shot table (frames at 30 fps, end exclusive). Mirrors docs/production-plan.md §6.
// Only the prototype range is implemented so far; boundaries are retimed to measured audio.
export type Shot = { id: string; from: number; to: number; model: "Opus 5.5 · High" | "Sonnet 5.5 · Medium" };

export const SHOTS: Shot[] = [
  { id: "01A", from: 0, to: 90, model: "Opus 5.5 · High" },
  { id: "01B", from: 90, to: 180, model: "Opus 5.5 · High" },
  { id: "01C", from: 180, to: 300, model: "Opus 5.5 · High" },
  { id: "01D", from: 300, to: 450, model: "Opus 5.5 · High" },
  { id: "02A", from: 450, to: 570, model: "Sonnet 5.5 · Medium" },
];

export const shot = (id: string) => {
  const s = SHOTS.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown shot ${id}`);
  return { from: s.from, durationInFrames: s.to - s.from };
};

// Measured audio cues (TUT-01 take 1, word times from local ASR, see docs/narration-manifest.json).
export const NARRATION = {
  tut01: { file: "audio/tutorial/TUT-01_take1_norm.wav", start: 363, cutAtSec: 6.33 },
  // word "one" (4.41 s) in "one original idea" → 363 + 132 = f495
  wordOne: 495,
};
