import { ENTER, MOVE, SETTLE, prog, lerp, tween } from "../shared/easing";
import { coverGripPoint, type NotebookGeo } from "../shared/props/Notebook";
import type { V } from "../shared/rig/ik";

/**
 * Notice → anticipate → reach → touch → open → react, as one reusable beat map.
 * Beats are local frames. The hand target is exactly the cover's grip point from contact on,
 * so contact can't drift. `maxOpen` in degrees.
 */
export type ReachBeats = {
  notice: number; // eyeline change starts
  anticipate: number; // small pull-back starts
  reach: number; // reach starts
  contact: number; // hand on cover edge
  open: number; // cover starts opening
  openEnd: number; // cover fully open
  react: number; // reaction starts
};

export const beatsFrom = (start: number, scale = 1): ReachBeats => ({
  notice: start,
  anticipate: start + 30 * scale,
  reach: start + 45 * scale,
  contact: start + 60 * scale,
  open: start + 66 * scale,
  openEnd: start + 90 * scale,
  react: start + 96 * scale,
});

export const reachState = (f: number, b: ReachBeats, geo: Omit<NotebookGeo, "open">, rest: V, maxOpen = 55, lift = 40) => {
  const open = tween(f, b.open, b.openEnd, 0, maxOpen, MOVE);
  const g0 = coverGripPoint({ ...geo, open: 0 });
  const back = { x: rest.x + (rest.x > g0.x ? 1 : -1) * geo.H * 0.01, y: rest.y + geo.H * 0.006 };
  let target: V;
  if (f < b.anticipate) target = rest;
  else if (f < b.reach) {
    const t = prog(f, b.anticipate, b.reach, ENTER);
    target = { x: lerp(rest.x, back.x, t), y: lerp(rest.y, back.y, t) };
  } else if (f < b.contact) {
    const t = prog(f, b.reach, b.contact, MOVE);
    target = { x: lerp(back.x, g0.x, t), y: lerp(back.y, g0.y, t) - lift * Math.sin(Math.PI * t) };
  } else if (f < b.open) {
    const t = prog(f, b.contact, b.open, SETTLE);
    target = { x: g0.x, y: g0.y + geo.H * 0.002 * Math.sin(Math.PI * t) };
  } else target = coverGripPoint({ ...geo, open });
  // body: anticipation leans back slightly, reach leans in, settle after contact
  const lean = f < b.anticipate ? 0 : f < b.reach ? -2 * prog(f, b.anticipate, b.reach, ENTER) : f < b.contact ? lerp(-2, 4, prog(f, b.reach, b.contact, MOVE)) : lerp(4, 2.5, prog(f, b.contact, b.contact + 12, SETTLE));
  const look = prog(f, b.notice, b.notice + 6, MOVE); // eyes lead
  const head = prog(f, b.notice + 2, b.notice + 12, MOVE); // head follows (overlapping action)
  const react = prog(f, b.react, b.react + 14, SETTLE);
  return { target, open, lean, look, head, react, contact: f >= b.contact };
};
