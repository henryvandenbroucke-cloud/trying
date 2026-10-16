import React from "react";
import { AbsoluteFill } from "remotion";
import { FILM } from "../../shared/tokens";
import { MOVE, prog } from "../../shared/easing";
import { BASE_POSE, Stickman, mixPose, toLocal, type Placement, type Pose } from "../../shared/rig/Stickman";
import { Notebook } from "../../shared/props/Notebook";
import { CafeChair, CafeRoom, CafeTable, CafeWindow, Cup, PendantLamp, Plant } from "../../shared/sets/Cafe";

// Shared café layout (wide). Exported so other shots/thumbnails stay consistent.
export const CAFE_WIDE = {
  floorY: 850,
  table: { cx: 960, cy: 640, rx: 270, k: 0.3 },
  H: 560,
  mila: { x: 630, y: 711, H: 560, facing: 1 } as Placement,
  noah: { x: 1290, y: 711, H: 560, facing: -1 } as Placement,
  notebook: { cx: 1105, cy: 650 },
  noahHandRest: { x: 1163, y: 655 },
  stroke: 5.6, // = 0.010 × H
};

const talk = (f: number) => {
  const env = Math.sin(f * 0.19) > -0.35 ? 1 : 0;
  return env * 0.55 * (0.5 + 0.5 * Math.sin(f * 1.05));
};

export const milaTalkingPose = (f: number): Pose => {
  const L = CAFE_WIDE.mila;
  const tableY = toLocal({ x: 0, y: CAFE_WIDE.table.cy }, L).y;
  return {
    ...BASE_POSE,
    lean: 4,
    faceTurn: 0.8,
    gazeX: 0.55,
    smile: 0.5,
    mouthOpen: talk(f),
    near: { ik: { x: 0.235 + 0.012 * Math.sin(f * 0.13), y: tableY - 0.045 + 0.01 * Math.sin(f * 0.17 + 1) } },
    far: { ik: { x: 0.2, y: tableY + 0.003 } },
  };
};

export const Shot01A_CafeWide: React.FC<{ f: number }> = ({ f }) => {
  const W = CAFE_WIDE;
  const restLocal = toLocal(W.noahHandRest, W.noah);
  const thighRest = { x: 0.12, y: -0.02 };
  const noahListen: Pose = {
    ...BASE_POSE,
    lean: 3,
    headTilt: -2,
    faceTurn: 0.78,
    gazeX: 0.6,
    gazeY: -0.1,
    smile: 0.3,
    near: { ik: restLocal },
    far: { ik: thighRest },
  };
  const noahNotice: Pose = {
    ...noahListen,
    headTilt: 15,
    gazeX: 0.35,
    gazeY: 0.75,
    smile: 0.15,
    brow: -4,
  };
  // Eyeline change at f45 over 6 f (MOVE)
  const t = prog(f, 45, 51, MOVE);
  const noah = mixPose(noahListen, noahNotice, t);
  const mila = milaTalkingPose(f);
  const s = W.stroke;
  return (
    <AbsoluteFill style={{ backgroundColor: FILM.paper }}>
      <svg width={1920} height={1080} viewBox="0 -40 1920 1080">
        <CafeRoom width={1920} height={1100} floorY={W.floorY} stroke={s} />
        <CafeWindow x={300} y={150} w={240} h={500} frame={f} seed="w1" stroke={s} />
        <CafeWindow x={1380} y={150} w={240} h={500} frame={f + 40} seed="w2" stroke={s} />
        <PendantLamp x={960} y={120} s={1} stroke={s} />
        <CafeChair x={W.mila.x - 0.03 * W.H} seatY={W.mila.y + 0.02 * W.H} floorY={W.floorY} H={W.H} backSide={-1} stroke={s} />
        <CafeChair x={W.noah.x + 0.03 * W.H} seatY={W.noah.y + 0.02 * W.H} floorY={W.floorY} H={W.H} backSide={1} stroke={s} />
        <CafeTable {...W.table} floorY={W.floorY} stroke={s} seed="t1" />
        <Cup x={845} y={636} s={1} k={W.table.k} stroke={s * 0.8} />
        <Notebook cx={W.notebook.cx} cy={W.notebook.cy} H={W.H} k={W.table.k} open={0} />
        <Stickman at={W.mila} pose={mila} outfit="mila" />
        <Stickman at={W.noah} pose={noah} outfit="noah" />
        <Plant x={150} floorY={W.floorY + 4} s={1.15} stroke={s} seed="p1" />
      </svg>
    </AbsoluteFill>
  );
};
