import React from "react";
import { random } from "remotion";
import { FILM } from "../../shared/tokens";
import { BASE_POSE, Stickman, toLocal, type Placement } from "../../shared/rig/Stickman";
import { Notebook } from "../../shared/props/Notebook";

// Contents of the three memory panels, drawn in a 320 × 200 viewBox.
const ink = FILM.ink;

/** M1 — a past summer at the same café table: Mila laughing. */
export const MemorySummer: React.FC = () => {
  const mila: Placement = { x: 112, y: 142, H: 150, facing: 1 };
  const noah: Placement = { x: 232, y: 142, H: 150, facing: -1 };
  const tableY = 128;
  return (
    <g>
      <rect x={0} y={0} width={320} height={200} fill={FILM.wall} />
      <circle cx={276} cy={38} r={20} fill={FILM.cafeWash} stroke={ink} strokeWidth={1.6} />
      <rect x={0} y={166} width={320} height={34} fill={FILM.floor} />
      <ellipse cx={172} cy={tableY} rx={62} ry={14} fill={FILM.wood} stroke={ink} strokeWidth={1.6} />
      <line x1={172} y1={142} x2={172} y2={168} stroke={ink} strokeWidth={2.4} />
      <Stickman at={mila} outfit="mila" pose={{ ...BASE_POSE, lean: -6, headTilt: -14, smile: 1, mouthOpen: 0.7, blink: 0.9, near: { ik: toLocal({ x: 150, y: tableY - 2 }, mila) }, far: { fk: { shoulder: 20, elbow: 80 } } }} />
      <Stickman at={noah} outfit="noah" pose={{ ...BASE_POSE, smile: 0.8, gazeX: 0.6, near: { ik: toLocal({ x: 196, y: tableY - 2 }, noah) }, far: { fk: { shoulder: 10, elbow: 70 } } }} />
    </g>
  );
};

/** M2 — a rainy bus stop, sharing an umbrella. */
export const MemoryRain: React.FC = () => {
  const drops = Array.from({ length: 26 }, (_, i) => ({
    x: random(`rain-x-${i}`) * 320,
    y: random(`rain-y-${i}`) * 200,
  }));
  return (
    <g>
      <rect x={0} y={0} width={320} height={200} fill="#D9DEE6" />
      <rect x={0} y={168} width={320} height={32} fill="#C9CDD4" />
      {drops.map((d, i) => (
        <line key={i} x1={d.x} y1={d.y} x2={d.x - 4} y2={d.y + 12} stroke={ink} strokeWidth={1.2} opacity={0.35} strokeLinecap="round" />
      ))}
      <line x1={40} y1={60} x2={40} y2={168} stroke={ink} strokeWidth={2.4} />
      <circle cx={40} cy={52} r={13} fill={FILM.paper} stroke={ink} strokeWidth={2} />
      <path d="M 120 82 Q 175 40 230 82 Z" fill={FILM.notebook} stroke={ink} strokeWidth={2} strokeLinejoin="round" />
      <line x1={175} y1={62} x2={175} y2={118} stroke={ink} strokeWidth={2} />
      <Stickman at={{ x: 158, y: 124, H: 100, facing: 1 }} outfit="mila" legs="standing" pose={{ ...BASE_POSE, smile: 0.7, gazeX: 0.5, near: { ik: { x: 0.16, y: -0.2 } }, far: { fk: { shoulder: 4, elbow: 10 } } }} />
      <Stickman at={{ x: 196, y: 124, H: 104, facing: -1 }} outfit="noah" legs="standing" pose={{ ...BASE_POSE, smile: 0.6, gazeX: 0.5, near: { ik: { x: 0.2, y: -0.33 } }, far: { fk: { shoulder: 4, elbow: 10 } } }} />
    </g>
  );
};

/** M3 — Noah writing in the notebook at night. */
export const MemoryWriting: React.FC = () => {
  const noah: Placement = { x: 232, y: 150, H: 160, facing: -1 };
  const nb = { cx: 150, cy: 122 };
  return (
    <g>
      <rect x={0} y={0} width={320} height={200} fill="#CFCBE0" />
      <circle cx={52} cy={40} r={14} fill="#FFF6DA" stroke={ink} strokeWidth={1.6} />
      <rect x={60} y={124} width={180} height={8} rx={3} fill={FILM.wood} stroke={ink} strokeWidth={1.6} />
      <line x1={80} y1={132} x2={80} y2={200} stroke={ink} strokeWidth={2} />
      <line x1={220} y1={132} x2={220} y2={200} stroke={ink} strokeWidth={2} />
      <path d="M 70 124 L 70 80 L 98 66" fill="none" stroke={ink} strokeWidth={2} strokeLinecap="round" />
      <path d="M 88 60 L 112 72 L 100 80 Z" fill={FILM.cafeWash} stroke={ink} strokeWidth={1.6} strokeLinejoin="round" />
      <Notebook cx={nb.cx} cy={nb.cy} H={160} k={0.35} open={175} stroke={1.4} />
      <Stickman at={noah} outfit="noah" pose={{ ...BASE_POSE, lean: 14, headTilt: 18, gazeY: 0.8, smile: 0.2, near: { ik: toLocal({ x: 162, y: 118 }, noah) }, far: { ik: toLocal({ x: 182, y: 121 }, noah) } }} />
    </g>
  );
};
