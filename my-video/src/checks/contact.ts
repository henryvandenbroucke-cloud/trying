// Numeric continuity/contact checks for the prototype shots.
// Run: npm run check:contact   (bundles with esbuild, runs in Node; no rendering)
import { solveTwoBone } from "../shared/rig/ik";
import { RIG } from "../shared/tokens";
import { solveArm, toWorld } from "../shared/rig/Stickman";
import { coverGripPoint } from "../shared/props/Notebook";
import { CLOSE, handTarget01B, openAngle01B } from "../example-film/shots/Shot01B_NotebookClose";
import { milaTalkingPose } from "../example-film/shots/Shot01A_CafeWide";
import { MEDIUM, noahRecallPose } from "../example-film/shots/Shot01C_MemoryReveal";

type Row = { check: string; frames: string; result: string; ok: boolean };
const rows: Row[] = [];
const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);

// 01B: every frame reachable; from contact (local 30) the hand sits on the cover grip point.
{
  let unreachable = 0;
  let maxGap = 0;
  let maxJump = 0;
  let prev: { x: number; y: number } | null = null;
  for (let f = 0; f < 90; f++) {
    const t = handTarget01B(f);
    const r = solveTwoBone(CLOSE.shoulder, t, RIG.upperArm * CLOSE.H, RIG.forearm * CLOSE.H);
    if (!r.reachable) unreachable++;
    if (f >= CLOSE.settle[1]) {
      const g = coverGripPoint({ ...CLOSE.nb, H: CLOSE.H, open: openAngle01B(f) });
      maxGap = Math.max(maxGap, dist(r.hand, g));
    }
    if (prev) maxJump = Math.max(maxJump, dist(prev, r.hand));
    prev = r.hand;
  }
  rows.push({ check: "01B arm reaches target every frame", frames: "0–89", result: `${unreachable} unreachable`, ok: unreachable === 0 });
  rows.push({ check: "01B hand on cover grip after contact", frames: `${CLOSE.settle[1]}–89`, result: `max gap ${maxGap.toFixed(3)} px`, ok: maxGap < 0.5 });
  rows.push({ check: "01B hand path continuity (max per-frame move)", frames: "0–89", result: `${maxJump.toFixed(1)} px/frame`, ok: maxJump < 60 });
  const contact = handTarget01B(CLOSE.reach[1]);
  const g0 = coverGripPoint({ ...CLOSE.nb, H: CLOSE.H, open: 0 });
  rows.push({ check: "01B contact frame = cover edge", frames: `${CLOSE.reach[1]} (global ${CLOSE.reach[1] + 90})`, result: `gap ${dist(contact, g0).toFixed(3)} px`, ok: dist(contact, g0) < 0.5 });
}

// 01A: Noah's resting hand and Mila's hands are reachable on all frames.
{
  let bad = 0;
  for (let f = 0; f < 90; f++) {
    const m = milaTalkingPose(f);
    if (!solveArm(m, false).reachable || !solveArm(m, true).reachable) bad++;
  }
  rows.push({ check: "01A Mila arms reachable", frames: "0–89", result: `${bad} bad frames`, ok: bad === 0 });
}

// 01C: Noah's hand stays on the open cover's grip point.
{
  let maxGap = 0;
  let bad = 0;
  const g = coverGripPoint({ ...MEDIUM.nb, H: MEDIUM.H });
  for (let f = 0; f < 180; f++) {
    const a = solveArm(noahRecallPose(f), false);
    if (!a.reachable) bad++;
    maxGap = Math.max(maxGap, dist(toWorld(a.h, MEDIUM.noah), g));
  }
  rows.push({ check: "01C hand on cover grip", frames: "0–179", result: `max gap ${maxGap.toFixed(3)} px, ${bad} unreachable`, ok: maxGap < 0.5 && bad === 0 });
}

let allOk = true;
for (const r of rows) {
  allOk &&= r.ok;
  console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.check}  [${r.frames}]  ${r.result}`);
}
process.exit(allOk ? 0 : 1);
