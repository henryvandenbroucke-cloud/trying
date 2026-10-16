import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { FILM } from "../../shared/tokens";
import { ENTER, MOVE, SETTLE, prog } from "../../shared/easing";
import { BASE_POSE, Stickman, mixPose, toLocal, type Placement, type Pose } from "../../shared/rig/Stickman";
import { Notebook, coverGripPoint } from "../../shared/props/Notebook";
import { CafeChair, CafeTable } from "../../shared/sets/Cafe";
import { MemoryPanel } from "../../shared/sets/MemoryPanel";
import { MemoryRain, MemorySummer, MemoryWriting } from "./memories";

export const MEDIUM = {
  H: 1150,
  noah: { x: 1450, y: 1010, H: 1150, facing: -1 } as Placement,
  table: { cx: 760, cy: 930, rx: 560, k: 0.3 },
  nb: { cx: 1150, cy: 915, k: 0.3, open: 55 },
  stroke: 7,
  // Panels enter at local 20 / 25 / 30 (global 200 / 205 / 210), 0.15 s apart, ENTER 10 f.
  panels: [
    { x: 150, y: 250, w: 320, h: 200, at: 20 },
    { x: 540, y: 120, w: 320, h: 200, at: 25 },
    { x: 885, y: 215, w: 320, h: 200, at: 30 },
  ],
  headAnchor: { x: 1330, y: 470 },
};

export const noahRecallPose = (f: number): Pose => {
  const M = MEDIUM;
  const grip = coverGripPoint({ ...M.nb, H: M.H });
  const look: Pose = {
    ...BASE_POSE,
    lean: 7,
    headTilt: 17,
    faceTurn: 0.8,
    gazeX: 0.2,
    gazeY: 0.8,
    smile: 0.15,
    near: { ik: toLocal(grip, M.noah) },
    far: { ik: { x: 0.12, y: -0.02 } },
  };
  const eyesClosed = { ...look, blink: 1 };
  const remember: Pose = { ...look, headTilt: 6, gazeY: 0.1, gazeX: 0.45, smile: 0.5, blink: 0 };
  if (f < 70) return mixPose(look, eyesClosed, prog(f, 16, 24, MOVE));
  return mixPose(eyesClosed, remember, prog(f, 70, 96, SETTLE));
};

/** legacyLayering reproduces the prototype draft draw order (legs in front of the table) for the Seq 17 review demo. */
export const Shot01C_MemoryReveal: React.FC<{ f: number; legacyLayering?: boolean }> = ({ f, legacyLayering }) => {
  const M = MEDIUM;
  const s = M.stroke;
  const contents = [<MemorySummer key="m1" />, <MemoryRain key="m2" />, <MemoryWriting key="m3" />];
  return (
    <AbsoluteFill style={{ backgroundColor: FILM.wall }}>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        <rect x={0} y={0} width={1920} height={1080} fill={FILM.wall} />
        <line x1={0} y1={690} x2={1920} y2={690} stroke={FILM.ink} strokeWidth={s * 0.5} opacity={0.3} />
        {M.panels.map((p, i) => {
          const t = prog(f, p.at, p.at + 10, ENTER);
          const cx = p.x + p.w / 2;
          const cy = p.y + p.h / 2;
          const dx = (M.headAnchor.x - cx) * 0.18 * (1 - t);
          const dy = (M.headAnchor.y - cy) * 0.18 * (1 - t);
          const sc = interpolate(t, [0, 1], [0.9, 1]);
          return (
            <g key={i} opacity={t} style={{ transformOrigin: `${cx}px ${cy}px`, translate: `${dx}px ${dy}px`, scale: String(sc) }}>
              <MemoryPanel x={p.x} y={p.y} w={p.w} h={p.h} id={`m${i}`} stroke={4}>
                {contents[i]}
              </MemoryPanel>
            </g>
          );
        })}
        <CafeChair x={M.noah.x + 0.03 * M.H} seatY={M.noah.y + 0.02 * M.H} floorY={1500} H={M.H} backSide={1} stroke={s} />
        {legacyLayering ? (
          <>
            <CafeTable {...M.table} floorY={1500} stroke={s} seed="t2" />
            <Notebook cx={M.nb.cx} cy={M.nb.cy} H={M.H} k={M.nb.k} open={M.nb.open} stroke={s} />
            <Stickman at={M.noah} pose={noahRecallPose(f)} outfit="noah" />
          </>
        ) : (
          <>
            {/* Layering: body behind the table, near arm in front of it */}
            <Stickman at={M.noah} pose={noahRecallPose(f)} outfit="noah" parts="body" />
            <CafeTable {...M.table} floorY={1500} stroke={s} seed="t2" />
            <Notebook cx={M.nb.cx} cy={M.nb.cy} H={M.H} k={M.nb.k} open={M.nb.open} stroke={s} />
            <Stickman at={M.noah} pose={noahRecallPose(f)} outfit="noah" parts="nearArm" />
          </>
        )}
      </svg>
    </AbsoluteFill>
  );
};
