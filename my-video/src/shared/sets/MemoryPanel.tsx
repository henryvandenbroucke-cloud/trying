import React from "react";
import { FILM } from "../tokens";

/** Memory panel: rounded 16:10 card, lilac tint, dashed ink border (recall ≠ present). */
export const MemoryPanel: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  id: string;
  stroke: number;
  children: React.ReactNode; // content drawn in a 320 × 200 viewBox
}> = ({ x, y, w, h, id, stroke, children }) => {
  const r = Math.min(w, h) * 0.09;
  return (
    <g>
      <defs>
        <clipPath id={`mp-${id}`}>
          <rect x={x} y={y} width={w} height={h} rx={r} />
        </clipPath>
      </defs>
      <rect x={x + 6} y={y + 10} width={w} height={h} rx={r} fill={FILM.ink} opacity={0.08} />
      <g clipPath={`url(#mp-${id})`}>
        <rect x={x} y={y} width={w} height={h} fill={FILM.paper} />
        <svg x={x} y={y} width={w} height={h} viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
          {children}
        </svg>
        <rect x={x} y={y} width={w} height={h} fill={FILM.memory} opacity={0.35} />
      </g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={r}
        fill="none"
        stroke={FILM.ink}
        strokeWidth={stroke}
        strokeDasharray={`${stroke * 4} ${stroke * 2.6}`}
        strokeLinecap="round"
      />
    </g>
  );
};
