import React from "react";
import { FILM, RIG } from "../tokens";
import { lerp } from "../easing";
import { smoothClosed, type Pt } from "../geom";
import { solveTwoBone, type V } from "./ik";

/** Arm spec: IK target in character-local units, or FK angles in degrees. */
export type ArmSpec =
  | { ik: V }
  | { fk: { shoulder: number; elbow: number } };

export type Pose = {
  lean: number; // deg, + = forward
  headTilt: number; // deg, + = forward/down
  faceTurn: number; // 0 = front, 1 = full profile toward facing
  gazeX: number; // -1..1
  gazeY: number; // -1..1
  brow: number; // deg, + = concerned
  smile: number; // -1..1
  mouthOpen: number; // 0..1
  blink: number; // 0..1
  near: ArmSpec;
  far: ArmSpec;
};

export const BASE_POSE: Pose = {
  lean: 2,
  headTilt: 0,
  faceTurn: 0.78,
  gazeX: 0,
  gazeY: 0,
  brow: 0,
  smile: 0.25,
  mouthOpen: 0,
  blink: 0,
  near: { fk: { shoulder: 10, elbow: 60 } },
  far: { fk: { shoulder: 6, elbow: 55 } },
};

export type Outfit = "noah" | "mila";

export type Placement = { x: number; y: number; H: number; facing: 1 | -1 };

/** World (parent px) → character-local units (facing-right space, hip origin). */
export const toLocal = (p: V, at: Placement): V => ({
  x: ((p.x - at.x) / at.H) * at.facing,
  y: (p.y - at.y) / at.H,
});
export const toWorld = (p: V, at: Placement): V => ({
  x: at.x + p.x * at.H * at.facing,
  y: at.y + p.y * at.H,
});

const rad = (d: number) => (d * Math.PI) / 180;

export const shoulderOf = (pose: Pose, far = false): V => {
  const L = rad(pose.lean);
  const d = RIG.spine - RIG.shoulderDrop;
  const base = { x: d * Math.sin(L), y: -d * Math.cos(L) };
  return far ? { x: base.x - 0.012, y: base.y + 0.004 } : base;
};

export const solveArm = (pose: Pose, far = false) => {
  const s = shoulderOf(pose, far);
  const spec = far ? pose.far : pose.near;
  if ("ik" in spec) {
    const r = solveTwoBone(s, spec.ik, RIG.upperArm, RIG.forearm, true);
    return { s, e: r.elbow, h: r.hand, reachable: r.reachable };
  }
  const a1 = rad(spec.fk.shoulder);
  const a2 = rad(spec.fk.shoulder + spec.fk.elbow);
  const e = { x: s.x + RIG.upperArm * Math.sin(a1), y: s.y + RIG.upperArm * Math.cos(a1) };
  const h = { x: e.x + RIG.forearm * Math.sin(a2), y: e.y + RIG.forearm * Math.cos(a2) };
  return { s, e, h, reachable: true };
};

const mixArm = (a: ArmSpec, b: ArmSpec, t: number): ArmSpec => {
  if ("ik" in a && "ik" in b)
    return { ik: { x: lerp(a.ik.x, b.ik.x, t), y: lerp(a.ik.y, b.ik.y, t) } };
  if ("fk" in a && "fk" in b)
    return {
      fk: {
        shoulder: lerp(a.fk.shoulder, b.fk.shoulder, t),
        elbow: lerp(a.fk.elbow, b.fk.elbow, t),
      },
    };
  return t < 0.5 ? a : b;
};

export const mixPose = (a: Pose, b: Pose, t: number): Pose => ({
  lean: lerp(a.lean, b.lean, t),
  headTilt: lerp(a.headTilt, b.headTilt, t),
  faceTurn: lerp(a.faceTurn, b.faceTurn, t),
  gazeX: lerp(a.gazeX, b.gazeX, t),
  gazeY: lerp(a.gazeY, b.gazeY, t),
  brow: lerp(a.brow, b.brow, t),
  smile: lerp(a.smile, b.smile, t),
  mouthOpen: lerp(a.mouthOpen, b.mouthOpen, t),
  blink: lerp(a.blink, b.blink, t),
  near: mixArm(a.near, b.near, t),
  far: mixArm(a.far, b.far, t),
});

const polar = (aDeg: number, r: number): Pt => ({
  x: Math.cos(rad(aDeg)) * r,
  y: Math.sin(rad(aDeg)) * r,
});

const noahHair = (r: number) => {
  const outer: Pt[] = [];
  // back of head (160°) over the top to the front (-12°); three rounded tufts on top
  // three rounded scallops between -142° and -56° (top of the head)
  for (let a = 160; a <= 348; a += 4) {
    const ang = a - 360;
    const inTuft = ang >= -142 && ang <= -56;
    const bump = inTuft ? Math.sin((Math.PI * (ang + 142)) / 28.67) ** 2 : 0;
    outer.push(polar(a, r * (1.045 + 0.1 * bump)));
  }
  const inner: Pt[] = [
    { x: 0.98 * r, y: -0.3 * r },
    { x: 0.7 * r, y: -0.46 * r },
    { x: 0.25 * r, y: -0.5 * r },
    { x: -0.25 * r, y: -0.42 * r },
    { x: -0.62 * r, y: -0.12 * r },
    { x: -0.86 * r, y: 0.3 * r },
  ];
  return smoothClosed([...outer, ...inner]);
};

const milaHair = (r: number) => {
  const outer: Pt[] = [];
  for (let a = -38; a >= -245; a -= 12) outer.push(polar(a, r * 1.1));
  const rest: Pt[] = [
    { x: -0.62 * r, y: 1.0 * r },
    { x: -0.3 * r, y: 1.04 * r },
    { x: -0.14 * r, y: 0.78 * r },
    { x: -0.2 * r, y: 0.25 * r },
    { x: -0.05 * r, y: -0.3 * r },
    { x: 0.32 * r, y: -0.52 * r },
    { x: 0.72 * r, y: -0.56 * r },
    { x: 0.94 * r, y: -0.44 * r },
  ];
  return smoothClosed([...outer, ...rest]);
};

const Face: React.FC<{ pose: Pose; r: number; ink: string }> = ({ pose, r, ink }) => {
  const t = pose.faceTurn;
  const ey = -0.02 * r + pose.gazeY * 0.07 * r;
  const gx = pose.gazeX * 0.07 * r;
  const eyes = [-0.32 * r + t * 0.45 * r + gx, 0.32 * r + t * 0.24 * r + gx];
  const er = 0.078 * r;
  const browY = -0.27 * r;
  const browLen = 0.17 * r;
  const mx = 0.06 * r + t * 0.3 * r;
  const my = 0.44 * r;
  const mw = 0.26 * r;
  const sw = RIG.stroke * 0.85;
  return (
    <g>
      {eyes.map((ex, i) => {
        const inner = i === 0 ? 1 : -1; // inner end points toward the other eye
        const ang = rad(pose.brow) * inner;
        const bx = ex;
        return (
          <g key={i}>
            {pose.blink > 0.82 ? (
              <path
                d={`M ${ex - er * 1.1} ${ey} Q ${ex} ${ey + er * 0.9} ${ex + er * 1.1} ${ey}`}
                fill="none"
                stroke={ink}
                strokeWidth={sw}
                strokeLinecap="round"
              />
            ) : (
              <ellipse cx={ex} cy={ey} rx={er} ry={er * (1 - pose.blink * 0.85)} fill={ink} />
            )}
            <line
              x1={bx - (browLen / 2) * Math.cos(ang)}
              y1={browY + (browLen / 2) * Math.sin(ang) * inner * -1}
              x2={bx + (browLen / 2) * Math.cos(ang)}
              y2={browY - (browLen / 2) * Math.sin(ang) * inner * -1}
              stroke={ink}
              strokeWidth={sw}
              strokeLinecap="round"
            />
          </g>
        );
      })}
      {pose.mouthOpen > 0.05 ? (
        <ellipse
          cx={mx}
          cy={my}
          rx={mw * 0.32}
          ry={0.02 * r + pose.mouthOpen * 0.08 * r}
          fill={ink}
        />
      ) : (
        <path
          d={`M ${mx - mw / 2} ${my} Q ${mx} ${my + pose.smile * 0.16 * r} ${mx + mw / 2} ${my}`}
          fill="none"
          stroke={ink}
          strokeWidth={sw}
          strokeLinecap="round"
        />
      )}
    </g>
  );
};

type ArmDraw = { s: V; e: V; h: V };

const Arm: React.FC<{ a: ArmDraw; sleeve: string; ink: string }> = ({ a, sleeve, ink }) => {
  const cuff = { x: a.e.x + (a.h.x - a.e.x) * 0.7, y: a.e.y + (a.h.y - a.e.y) * 0.7 };
  const limb = `M ${a.s.x} ${a.s.y} L ${a.e.x} ${a.e.y} L ${a.h.x} ${a.h.y}`;
  const sl = `M ${a.s.x} ${a.s.y} L ${a.e.x} ${a.e.y} L ${cuff.x} ${cuff.y}`;
  return (
    <g>
      <path d={limb} fill="none" stroke={ink} strokeWidth={RIG.stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d={sl} fill="none" stroke={ink} strokeWidth={RIG.sleeve + RIG.stroke * 1.2} strokeLinecap="round" strokeLinejoin="round" />
      <path d={sl} fill="none" stroke={sleeve} strokeWidth={RIG.sleeve} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={a.h.x} cy={a.h.y} r={RIG.handR} fill={ink} />
    </g>
  );
};

const SeatedLeg: React.FC<{ dx: number; dy: number; color: string; ink: string }> = ({ dx, dy, color, ink }) => {
  const hip = { x: dx, y: dy };
  const knee = { x: 0.215 + dx, y: 0.012 + dy };
  const ankle = { x: 0.222 + dx, y: 0.222 + dy };
  return (
    <g>
      <path
        d={`M ${hip.x} ${hip.y} L ${knee.x} ${knee.y} L ${ankle.x} ${ankle.y}`}
        fill="none"
        stroke={color}
        strokeWidth={RIG.trouser}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx={ankle.x + 0.026} cy={ankle.y + 0.012} rx={0.036} ry={0.015} fill={ink} />
    </g>
  );
};

const StandingLeg: React.FC<{ dx: number; dy: number; color: string; ink: string; spread: number }> = ({ dx, dy, color, ink, spread }) => {
  const hip = { x: dx, y: dy };
  const knee = { x: dx + spread * 0.5, y: 0.22 + dy };
  const ankle = { x: dx + spread, y: 0.425 + dy };
  return (
    <g>
      <path d={`M ${hip.x} ${hip.y} L ${knee.x} ${knee.y} L ${ankle.x} ${ankle.y}`} fill="none" stroke={color} strokeWidth={RIG.trouser} strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx={ankle.x + 0.024} cy={ankle.y + 0.012} rx={0.036} ry={0.015} fill={ink} />
    </g>
  );
};

/**
 * Stickman hybrid character (STYLE_CONTEXT v1 §2.1). Seated, side view.
 * Everything is drawn in units of H inside one scaled group, so stroke width
 * is always exactly RIG.stroke × H and proportions cannot drift between shots.
 */
export const Stickman: React.FC<{
  at: Placement;
  pose: Pose;
  outfit: Outfit;
  legs?: "seated" | "standing";
  /** Draw everything, the body without the near arm, or only the near arm (for layering around props). */
  parts?: "all" | "body" | "nearArm";
}> = ({ at, pose, outfit, legs = "seated", parts = "all" }) => {
  const ink = FILM.ink;
  const top = outfit === "noah" ? FILM.jacket : FILM.sweater;
  const topShade = outfit === "noah" ? FILM.jacketShade : FILM.sweaterShade;
  const L = rad(pose.lean);
  const T = rad(pose.lean + pose.headTilt);
  const neck = { x: RIG.spine * Math.sin(L), y: -RIG.spine * Math.cos(L) };
  const hc = { x: neck.x + 0.135 * Math.sin(T), y: neck.y - 0.135 * Math.cos(T) };
  const r = RIG.headR;
  const near = solveArm(pose, false);
  const far = solveArm(pose, true);
  const hem = outfit === "noah" ? 0.03 : 0.045;

  if (parts === "nearArm") {
    return (
      <g transform={`translate(${at.x} ${at.y}) scale(${at.facing * at.H} ${at.H})`}>
        <Arm a={near} sleeve={top} ink={ink} />
      </g>
    );
  }
  return (
    <g transform={`translate(${at.x} ${at.y}) scale(${at.facing * at.H} ${at.H})`}>
      {legs === "seated" ? (
        <SeatedLeg dx={-0.018} dy={-0.006} color={FILM.trousersShade} ink={ink} />
      ) : (
        <StandingLeg dx={-0.012} dy={-0.004} color={FILM.trousersShade} ink={ink} spread={-0.03} />
      )}
      <Arm a={far} sleeve={topShade} ink={ink} />
      {legs === "seated" ? (
        <SeatedLeg dx={0} dy={0} color={FILM.trousers} ink={ink} />
      ) : (
        <StandingLeg dx={0} dy={0} color={FILM.trousers} ink={ink} spread={0.03} />
      )}
      {/* Torso / jacket or sweater */}
      <g transform={`rotate(${pose.lean})`}>
        <rect
          x={-0.064}
          y={-0.312}
          width={0.128}
          height={0.312 + hem}
          rx={0.038}
          fill={top}
          stroke={ink}
          strokeWidth={RIG.stroke}
        />
        {outfit === "noah" ? (
          <path
            d="M 0.012 -0.306 L 0.058 -0.306 L 0.04 -0.25 Z"
            fill={FILM.shirt}
            stroke={ink}
            strokeWidth={RIG.stroke * 0.6}
            strokeLinejoin="round"
          />
        ) : (
          <path
            d={`M -0.05 ${hem - 0.018} L 0.05 ${hem - 0.018}`}
            stroke={ink}
            strokeWidth={RIG.stroke * 0.5}
            strokeLinecap="round"
            opacity={0.5}
          />
        )}
      </g>
      {/* Neck */}
      <line x1={neck.x} y1={neck.y} x2={hc.x - r * Math.sin(T) * 0.9} y2={hc.y + r * Math.cos(T) * 0.9} stroke={ink} strokeWidth={RIG.stroke} strokeLinecap="round" />
      {/* Head */}
      <g transform={`translate(${hc.x} ${hc.y}) rotate(${pose.lean + pose.headTilt})`}>
        <circle r={r} fill="#FFFFFF" stroke={ink} strokeWidth={RIG.stroke} />
        {outfit === "noah" ? <path d={noahHair(r)} fill={FILM.hairInk} /> : null}
        {outfit === "mila" ? (
          <>
            <path d={milaHair(r)} fill={FILM.hairInk} />
            <rect
              x={0.2 * r}
              y={-0.8 * r}
              width={0.28 * r}
              height={0.11 * r}
              rx={0.05 * r}
              fill={FILM.notebook}
              transform={`rotate(-24 ${0.34 * r} ${-0.75 * r})`}
            />
          </>
        ) : null}
        <Face pose={pose} r={r} ink={ink} />
      </g>
      {parts === "all" ? <Arm a={near} sleeve={top} ink={ink} /> : null}
    </g>
  );
};
