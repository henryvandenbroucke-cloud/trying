import React from "react";
import { AbsoluteFill } from "remotion";
import { FILM } from "../../shared/tokens";
import { ENTER, MOVE, SETTLE, prog, tween, lerp } from "../../shared/easing";
import { Notebook, coverGripPoint, type NotebookGeo } from "../../shared/props/Notebook";
import { WorldArm } from "../../shared/rig/WorldArm";
import { Cup } from "../../shared/sets/Cafe";

// Close-up camera: the same rig proportions at an effective character height of 3600 px.
export const CLOSE = {
  H: 3600,
  shoulder: { x: 2010, y: 120 },
  rest: { x: 1312, y: 700 },
  nb: { cx: 860, cy: 640, k: 0.5 },
  // Beat frames (local). Global = local + 90.
  anticipate: [0, 15] as const,
  reach: [15, 30] as const, // contact at local 30 (global f120)
  settle: [30, 36] as const,
  open: [36, 60] as const,
  maxOpen: 55,
};

export const openAngle01B = (f: number) => tween(f, CLOSE.open[0], CLOSE.open[1], 0, CLOSE.maxOpen, MOVE);

export const handTarget01B = (f: number) => {
  const C = CLOSE;
  const geo: NotebookGeo = { ...C.nb, H: C.H, open: openAngle01B(f) };
  const back = { x: C.rest.x + 30, y: C.rest.y - 14 };
  const g0 = coverGripPoint({ ...geo, open: 0 });
  if (f < C.reach[0]) {
    const t = prog(f, C.anticipate[0], C.anticipate[1], ENTER);
    return { x: lerp(C.rest.x, back.x, t), y: lerp(C.rest.y, back.y, t) };
  }
  if (f < C.reach[1]) {
    const t = prog(f, C.reach[0], C.reach[1], MOVE);
    return {
      x: lerp(back.x, g0.x, t),
      y: lerp(back.y, g0.y, t) - 70 * Math.sin(Math.PI * t),
    };
  }
  if (f < C.settle[1]) {
    const t = prog(f, C.settle[0], C.settle[1], SETTLE);
    return { x: g0.x, y: g0.y + 5 * Math.sin(Math.PI * t) };
  }
  return coverGripPoint(geo);
};

export const Shot01B_NotebookClose: React.FC<{ f: number }> = ({ f }) => {
  const C = CLOSE;
  const open = openAngle01B(f);
  const target = handTarget01B(f);
  const restShadow = 1 - prog(f, C.anticipate[1], C.anticipate[1] + 6, MOVE);
  const push = tween(f, 0, 90, 1, 1.06, MOVE);
  const s = 0.01 * C.H * 0.6; // set stroke scaled for the close-up framing
  return (
    <AbsoluteFill style={{ backgroundColor: FILM.wall }}>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        <g style={{ transformOrigin: "900px 560px", scale: String(push) }}>
          <rect x={-200} y={-200} width={2400} height={1600} fill={FILM.wall} />
          <line x1={-200} y1={150} x2={2200} y2={150} stroke={FILM.ink} strokeWidth={s * 0.4} opacity={0.3} />
          {/* table top filling the lower frame */}
          <ellipse cx={960} cy={1100} rx={1700} ry={880} fill={FILM.wood} stroke={FILM.ink} strokeWidth={s} />
          <ellipse cx={760} cy={900} rx={900} ry={420} fill="#FFFFFF" opacity={0.06} />
          <Cup x={300} y={470} s={3.4} k={0.5} stroke={s * 0.8} />
          <Notebook cx={C.nb.cx} cy={C.nb.cy} H={C.H} k={C.nb.k} open={open} stroke={s} />
          <WorldArm shoulder={C.shoulder} target={target} H={C.H} contactShadow={restShadow} shadowY={C.rest.y} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
