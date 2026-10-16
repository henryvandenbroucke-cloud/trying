import React from "react";
import { FILM } from "../tokens";
import { wobblyEllipse, smoothClosed, smoothOpen, jitter, type Pt } from "../geom";

const ink = FILM.ink;

/** L0 — sky inside a window, with slow, seeded clouds (≤ 6 px/s). */
export const Clouds: React.FC<{ frame: number; w: number; h: number; seed: string }> = ({ frame, w, h, seed }) => {
  const drift = frame * 0.18; // px per frame
  const clouds = [
    { x: 0.22, y: 0.24, s: 1 },
    { x: 0.62, y: 0.47, s: 0.75 },
  ];
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} fill={FILM.sky} />
      {clouds.map((c, i) => {
        const cx = c.x * w + drift * (0.7 + i * 0.3); // no wrap within a shot: max drift ≈ 80 px
        const cy = c.y * h;
        const r = 0.3 * w * c.s;
        return (
          <g key={i} opacity={0.95}>
            <path d={wobblyEllipse(cx, cy, r, r * 0.42, `${seed}-c${i}a`, 0.05)} fill="#FFFFFF" />
            <path d={wobblyEllipse(cx + r * 0.45, cy - r * 0.18, r * 0.55, r * 0.38, `${seed}-c${i}b`, 0.05)} fill="#FFFFFF" />
          </g>
        );
      })}
    </g>
  );
};

/** L1 — tall café window with rounded top; sky clipped inside. */
export const CafeWindow: React.FC<{ x: number; y: number; w: number; h: number; frame: number; seed: string; stroke: number }> = ({ x, y, w, h, frame, seed, stroke }) => {
  const r = w / 2;
  const d = `M ${x} ${y + h} L ${x} ${y + r} A ${r} ${r} 0 0 1 ${x + w} ${y + r} L ${x + w} ${y + h} Z`;
  const id = `win-${seed}`;
  return (
    <g>
      <defs>
        <clipPath id={id}>
          <path d={d} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <g transform={`translate(${x} ${y})`}>
          <Clouds frame={frame} w={w} h={h} seed={seed} />
        </g>
      </g>
      <path d={d} fill="none" stroke={ink} strokeWidth={stroke} strokeLinejoin="round" />
      <line x1={x + w / 2} y1={y + 6} x2={x + w / 2} y2={y + h} stroke={ink} strokeWidth={stroke * 0.7} />
      <line x1={x} y1={y + h * 0.55} x2={x + w} y2={y + h * 0.55} stroke={ink} strokeWidth={stroke * 0.7} />
      <rect x={x - w * 0.06} y={y + h} width={w * 1.12} height={stroke * 2.2} rx={stroke} fill={FILM.wood} stroke={ink} strokeWidth={stroke * 0.7} />
    </g>
  );
};

/** Wall + floor background for the café (L1 + floor), full frame. */
export const CafeRoom: React.FC<{ width: number; height: number; floorY: number; stroke: number }> = ({ width, height, floorY, stroke }) => (
  <g>
    <rect x={-800} y={-200} width={width + 1600} height={height + 400} fill={FILM.wall} />
    <rect x={-800} y={floorY} width={width + 1600} height={height - floorY + 200} fill={FILM.floor} />
    <line x1={-800} y1={floorY} x2={width + 800} y2={floorY} stroke={ink} strokeWidth={stroke * 0.8} />
    <line x1={-800} y1={floorY - stroke * 4} x2={width + 800} y2={floorY - stroke * 4} stroke={ink} strokeWidth={stroke * 0.4} opacity={0.35} />
  </g>
);

/** Round café table, side-ish view. Top is an ellipse with foreshortening k. */
export const CafeTable: React.FC<{ cx: number; cy: number; rx: number; k: number; floorY: number; stroke: number; seed: string }> = ({ cx, cy, rx, k, floorY, stroke, seed }) => {
  const ry = rx * k;
  const th = rx * 0.06;
  return (
    <g>
      {/* pedestal */}
      <rect x={cx - rx * 0.035} y={cy + ry * 0.5} width={rx * 0.07} height={floorY - cy - ry * 0.5 - th * 0.6} fill={FILM.woodShade} stroke={ink} strokeWidth={stroke} />
      <path d={wobblyEllipse(cx, floorY - th * 0.4, rx * 0.32, rx * 0.32 * k * 0.6, `${seed}-base`, 0.01)} fill={FILM.woodShade} stroke={ink} strokeWidth={stroke} />
      {/* thickness band */}
      <path d={`M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy} L ${cx + rx} ${cy + th} A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy + th} Z`} fill={FILM.woodShade} stroke={ink} strokeWidth={stroke} strokeLinejoin="round" />
      {/* top */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={FILM.wood} stroke={ink} strokeWidth={stroke} />
      <ellipse cx={cx - rx * 0.12} cy={cy - ry * 0.18} rx={rx * 0.62} ry={ry * 0.5} fill="#FFFFFF" opacity={0.08} />
    </g>
  );
};

/** Bentwood café chair, side view; seat at (x, seatY), back on the `backSide`. */
export const CafeChair: React.FC<{ x: number; seatY: number; floorY: number; H: number; backSide: 1 | -1; stroke: number }> = ({ x, seatY, floorY, H, backSide, stroke }) => {
  const seatW = 0.24 * H;
  const backX = x + backSide * seatW * 0.42;
  const frontX = x - backSide * seatW * 0.42;
  const backTop = seatY - 0.36 * H;
  return (
    <g stroke={ink} strokeWidth={stroke} strokeLinecap="round" fill="none">
      <line x1={backX} y1={seatY} x2={backX + backSide * 0.03 * H} y2={floorY} />
      <line x1={frontX} y1={seatY} x2={frontX - backSide * 0.02 * H} y2={floorY} />
      <path d={`M ${backX} ${seatY} C ${backX + backSide * 0.03 * H} ${seatY - 0.15 * H}, ${backX + backSide * 0.02 * H} ${backTop + 0.05 * H}, ${backX - backSide * 0.03 * H} ${backTop}`} />
      <path d={`M ${backX - backSide * 0.03 * H} ${backTop} C ${backX - backSide * 0.09 * H} ${backTop + 0.02 * H}, ${backX - backSide * 0.1 * H} ${backTop + 0.1 * H}, ${backX - backSide * 0.02 * H} ${backTop + 0.16 * H}`} />
      <rect x={Math.min(frontX, backX) - 0.01 * H} y={seatY - 0.012 * H} width={Math.abs(backX - frontX) + 0.02 * H} height={0.026 * H} rx={0.012 * H} fill={FILM.wood} />
    </g>
  );
};

/** L3 — foreground potted plant. */
export const Plant: React.FC<{ x: number; floorY: number; s: number; stroke: number; seed: string }> = ({ x, floorY, s, stroke, seed }) => {
  const potW = 120 * s;
  const potH = 110 * s;
  const leaves: Pt[][] = [];
  const base = { x: x, y: floorY - potH };
  const angles = [-70, -35, -100, -10, -130, -55, -88];
  angles.forEach((a, i) => {
    const len = (150 + jitter(seed, i, 40)) * s;
    const r = (a * Math.PI) / 180;
    const tip = { x: base.x + Math.cos(r) * len, y: base.y + Math.sin(r) * len };
    const mid = { x: base.x + Math.cos(r) * len * 0.5, y: base.y + Math.sin(r) * len * 0.5 };
    const nx = -Math.sin(r) * 26 * s;
    const ny = Math.cos(r) * 26 * s;
    leaves.push([base, { x: mid.x + nx, y: mid.y + ny }, tip, { x: mid.x - nx, y: mid.y - ny }]);
  });
  return (
    <g>
      {leaves.map((l, i) => (
        <g key={i}>
          <path d={smoothClosed(l)} fill={i % 2 ? FILM.plantShade : FILM.plant} stroke={ink} strokeWidth={stroke} strokeLinejoin="round" />
          <path d={smoothOpen([l[0], l[2]])} stroke={ink} strokeWidth={stroke * 0.5} opacity={0.5} />
        </g>
      ))}
      <path d={`M ${x - potW / 2} ${floorY - potH} L ${x + potW / 2} ${floorY - potH} L ${x + potW * 0.38} ${floorY} L ${x - potW * 0.38} ${floorY} Z`} fill={FILM.pot} stroke={ink} strokeWidth={stroke} strokeLinejoin="round" />
      <rect x={x - potW * 0.56} y={floorY - potH - 8 * s} width={potW * 1.12} height={22 * s} rx={8 * s} fill={FILM.pot} stroke={ink} strokeWidth={stroke} />
    </g>
  );
};

/** Pendant lamp hanging from the top edge. */
export const PendantLamp: React.FC<{ x: number; y: number; s: number; stroke: number }> = ({ x, y, s, stroke }) => (
  <g>
    <line x1={x} y1={-200} x2={x} y2={y} stroke={ink} strokeWidth={stroke * 0.7} />
    <path d={`M ${x - 70 * s} ${y + 60 * s} Q ${x} ${y - 30 * s} ${x + 70 * s} ${y + 60 * s} Z`} fill={FILM.cafeWash} stroke={ink} strokeWidth={stroke} strokeLinejoin="round" />
    <ellipse cx={x} cy={y + 62 * s} rx={16 * s} ry={8 * s} fill="#FFF6DA" stroke={ink} strokeWidth={stroke * 0.6} />
  </g>
);

/** A coffee cup on the table plane. */
export const Cup: React.FC<{ x: number; y: number; s: number; k: number; stroke: number }> = ({ x, y, s, k, stroke }) => {
  const rx = 26 * s;
  const ry = rx * k * 1.4;
  const h = 34 * s;
  return (
    <g stroke={ink} strokeWidth={stroke} strokeLinejoin="round">
      <ellipse cx={x + 4 * s} cy={y + 2 * s} rx={rx * 1.5} ry={ry * 1.1} fill={ink} opacity={0.08} stroke="none" />
      <path d={`M ${x + rx} ${y - h * 0.65} q ${16 * s} ${4 * s} ${2 * s} ${h * 0.5}`} fill="none" />
      <path d={`M ${x - rx} ${y - h} L ${x - rx * 0.86} ${y - 2 * s} Q ${x} ${y + ry} ${x + rx * 0.86} ${y - 2 * s} L ${x + rx} ${y - h} Z`} fill="#FFFFFF" />
      <ellipse cx={x} cy={y - h} rx={rx} ry={ry} fill={FILM.woodShade} />
    </g>
  );
};
