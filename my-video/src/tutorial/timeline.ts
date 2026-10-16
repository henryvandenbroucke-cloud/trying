import data from "./timeline.json";
import peaksData from "./peaks.json";

export type TShot = { id: string; from: number; to: number };
export type TWord = { seg: string; w: string; f: number; fe: number };
export type TAudio = { seg: string; from: number; trim: number; dur: number; src: "measured" | "estimated"; voice: string; play?: boolean };
export type TCaption = { text: string; from: number; to: number; seg: string };

export const TL = data as unknown as {
  fps: number;
  durationInFrames: number;
  shots: TShot[];
  audio: TAudio[];
  words: TWord[];
  marks: Record<string, number>;
  captions: TCaption[];
  timingSources: Record<string, "measured" | "estimated">;
};
export const PEAKS = peaksData as Record<string, number[]>;

export const shotById = (id: string) => {
  const s = TL.shots.find((x) => x.id === id);
  if (!s) throw new Error(`no shot ${id}`);
  return s;
};

const norm = (w: string) => w.toLowerCase().replace(/[^\w'’]/g, "");

/** Local frame (inside `shot`) of the nth word starting with `prefix` (spoken during the shot); fallback when absent. */
export const cueIn = (shot: TShot, prefix: string, n = 1, fallback = 0) => {
  const p = norm(prefix);
  let k = 0;
  for (const w of TL.words) {
    if (w.f < shot.from - 3 || w.f >= shot.to) continue;
    if (norm(w.w).startsWith(p) && ++k === n) return Math.max(0, w.f - shot.from);
  }
  return fallback;
};

/** Words of one segment as {f, fe} relative to that segment's first word (for estimated lanes). */
export const segWords = (seg: string) => {
  const ws = TL.words.filter((w) => w.seg === seg);
  const f0 = ws.length ? ws[0].f : 0;
  return ws.map((w) => ({ w: w.w, f: w.f - f0, fe: w.fe - f0 }));
};

export const anyEstimated = Object.values(TL.timingSources).some((v) => v === "estimated");
