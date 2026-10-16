import { random } from "remotion";

export type Pt = { x: number; y: number };

/** Deterministic hand-inked jitter: same seed → same shape on every frame and render. */
export const jitter = (seed: string, i: number, amp: number) =>
  (random(`${seed}-${i}`) - 0.5) * 2 * amp;

/** Smooth closed path through points (Catmull-Rom → cubic Bézier). */
export const smoothClosed = (pts: Pt[]) => {
  const n = pts.length;
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${p2.x} ${p2.y}`;
  }
  return d + " Z";
};

/** Smooth open path through points. */
export const smoothOpen = (pts: Pt[]) => {
  const n = pts.length;
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, n - 1)];
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${p2.x} ${p2.y}`;
  }
  return d;
};

/** Hand-drawn ellipse outline/fill with a fixed seeded wobble. */
export const wobblyEllipse = (
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  seed: string,
  amp = 0.012,
  n = 18,
) => {
  const pts: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + jitter(seed, i, amp);
    pts.push({ x: cx + Math.cos(a) * rx * k, y: cy + Math.sin(a) * ry * k });
  }
  return smoothClosed(pts);
};

/** Hand-drawn rectangle with slightly irregular edges (seeded). */
export const wobblyRect = (
  x: number,
  y: number,
  w: number,
  h: number,
  seed: string,
  amp = 2,
) => {
  const pts: Pt[] = [];
  const per = 3;
  const corners: Pt[] = [
    { x, y },
    { x: x + w, y },
    { x: x + w, y: y + h },
    { x, y: y + h },
  ];
  let k = 0;
  for (let c = 0; c < 4; c++) {
    const a = corners[c];
    const b = corners[(c + 1) % 4];
    for (let i = 0; i < per; i++) {
      const t = i / per;
      pts.push({
        x: a.x + (b.x - a.x) * t + jitter(seed, k, amp),
        y: a.y + (b.y - a.y) * t + jitter(seed, k + 100, amp),
      });
      k++;
    }
  }
  return smoothClosed(pts);
};
