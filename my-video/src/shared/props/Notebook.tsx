import React from "react";
import { FILM, RIG } from "../tokens";

/**
 * Noah's blue notebook, drawn on a table plane.
 * Plane coords (u along width, v along depth, z up) project to screen as
 *   x = cx + u,  y = cy + v·k − z·kz
 * The spine is on the −u side; the cover hinges about it.
 * Size is always RIG.notebookW × RIG.notebookD of the character H.
 */
export type NotebookGeo = {
  cx: number;
  cy: number;
  H: number; // character height in px at this camera scale
  k: number; // depth foreshortening (camera elevation)
  kz?: number; // vertical factor
  open: number; // cover angle, degrees (0 = closed)
};

const dims = (g: NotebookGeo) => {
  const W = RIG.notebookW * g.H;
  const D = RIG.notebookD * g.H;
  const T = 0.012 * g.H;
  const kz = g.kz ?? Math.sqrt(1 - g.k * g.k);
  return { W, D, T, kz };
};

const proj = (g: NotebookGeo, u: number, v: number, z: number) => {
  const { kz } = dims(g);
  return { x: g.cx + u, y: g.cy + v * g.k - z * kz };
};

/** Screen position of the middle of the cover's free edge — the grip point. */
export const coverGripPoint = (g: NotebookGeo) => {
  const { W, T } = dims(g);
  const a = (g.open * Math.PI) / 180;
  return proj(g, -W / 2 + W * Math.cos(a), 0, T + W * Math.sin(a));
};

const poly = (pts: { x: number; y: number }[]) =>
  "M " + pts.map((p) => `${p.x} ${p.y}`).join(" L ") + " Z";

export const Notebook: React.FC<NotebookGeo & { stroke?: number }> = (props) => {
  const g = props;
  const { W, D, T } = dims(g);
  const sw = props.stroke ?? RIG.stroke * g.H * 0.8;
  const ink = FILM.ink;
  const a = (g.open * Math.PI) / 180;
  const P = (u: number, v: number, z: number) => proj(g, u, v, z);
  const x0 = -W / 2;
  const x1 = W / 2;
  const y0 = -D / 2;
  const y1 = D / 2;

  // Cover point at fraction s (0 = spine, 1 = free edge) and depth v
  const C = (s: number, v: number) => P(x0 + s * W * Math.cos(a), v, T + s * W * Math.sin(a));

  const pageLines = [0.3, 0.5, 0.7].map((f) => {
    const v = y0 + D * f;
    const p = P(x0 + W * 0.14, v, T);
    const q = P(x1 - W * 0.08, v, T);
    return `M ${p.x} ${p.y} L ${q.x} ${q.y}`;
  });

  const shadow = P(0, y1 * 0.15, 0);

  return (
    <g>
      <ellipse cx={shadow.x + W * 0.03} cy={shadow.y + D * g.k * 0.18} rx={W * 0.6} ry={D * g.k * 0.62} fill={ink} opacity={0.1} />
      {/* Front face of the block: pages + back cover */}
      <path d={poly([P(x0, y1, 0), P(x1, y1, 0), P(x1, y1, T), P(x0, y1, T)])} fill={FILM.pageCream} stroke={ink} strokeWidth={sw} strokeLinejoin="round" />
      <path d={poly([P(x0, y1, 0), P(x1, y1, 0), P(x1, y1, T * 0.28), P(x0, y1, T * 0.28)])} fill={FILM.notebookShade} />
      {/* Top page */}
      <path d={poly([P(x0, y0, T), P(x1, y0, T), P(x1, y1, T), P(x0, y1, T)])} fill={FILM.pageCream} stroke={ink} strokeWidth={sw} strokeLinejoin="round" />
      {pageLines.map((d, i) => (
        <path key={i} d={d} stroke={FILM.memory} strokeWidth={sw * 0.6} strokeLinecap="round" opacity={g.open > 2 ? 0.9 : 0} />
      ))}
      {/* Cover (outer face while < 90°) */}
      <path d={poly([C(0, y0), C(1, y0), C(1, y1), C(0, y1)])} fill={g.open < 90 ? FILM.notebook : FILM.pageCream} stroke={ink} strokeWidth={sw} strokeLinejoin="round" />
      {/* Spine strip */}
      <path d={poly([C(0, y0), C(0.06, y0), C(0.06, y1), C(0, y1)])} fill={FILM.notebookShade} />
      {/* Cream strap at 75% of the width (sewn onto the cover) */}
      <path d={poly([C(0.72, y0), C(0.79, y0), C(0.79, y1), C(0.72, y1)])} fill={FILM.shirt} stroke={ink} strokeWidth={sw * 0.5} strokeLinejoin="round" />
      {/* Re-stroke cover outline on top for a crisp edge */}
      <path d={poly([C(0, y0), C(1, y0), C(1, y1), C(0, y1)])} fill="none" stroke={ink} strokeWidth={sw} strokeLinejoin="round" />
    </g>
  );
};
