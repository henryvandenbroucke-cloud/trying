import React from "react";
import { FILM } from "../shared/tokens";
import { BASE_POSE, Stickman, toLocal, type Placement, type Pose } from "../shared/rig/Stickman";
import { Notebook } from "../shared/props/Notebook";
import { CafeChair, CafeRoom, CafeTable, CafeWindow, Cup, PendantLamp, Plant } from "../shared/sets/Cafe";

/** Canonical café layout (wide). Every café shot is a camera on this one set. */
export const CAFE = {
  floorY: 850,
  table: { cx: 960, cy: 640, rx: 270, k: 0.3 },
  H: 560,
  mila: { x: 630, y: 711, H: 560, facing: 1 } as Placement,
  noah: { x: 1290, y: 711, H: 560, facing: -1 } as Placement,
  notebook: { cx: 1105, cy: 650 },
  noahHandRest: { x: 1163, y: 655 }, // on the table, right of the notebook
  noahLapRest: { x: 1204, y: 690 }, // on his lap, below the table edge
  stroke: 5.6,
};

export const nbGeo = { cx: CAFE.notebook.cx, cy: CAFE.notebook.cy, H: CAFE.H, k: CAFE.table.k };

export type Camera = { s: number; cx: number; cy: number; truck?: number };
export const WIDE: Camera = { s: 1, cx: 960, cy: 500 };

// Parallax ratios per layer for camera trucks (L0 sky, L1 wall, L2 action, L3 foreground).
const PAR = [0.2, 0.5, 1, 1.4];

export const noahDefault = (): Pose => ({
  ...BASE_POSE,
  lean: 3,
  headTilt: -2,
  faceTurn: 0.78,
  gazeX: 0.6,
  gazeY: -0.1,
  smile: 0.3,
  near: { ik: toLocal(CAFE.noahHandRest, CAFE.noah) },
  far: { ik: { x: 0.12, y: -0.02 } },
});

export const milaDefault = (): Pose => {
  const tableY = toLocal({ x: 0, y: CAFE.table.cy }, CAFE.mila).y;
  return { ...BASE_POSE, lean: 4, faceTurn: 0.8, gazeX: 0.55, smile: 0.5, near: { ik: { x: 0.235, y: tableY - 0.04 } }, far: { ik: { x: 0.2, y: tableY + 0.003 } } };
};

export const talkMouth = (f: number, amt = 0.55) => {
  const env = Math.sin(f * 0.19) > -0.35 ? 1 : 0;
  return env * amt * (0.5 + 0.5 * Math.sin(f * 1.05));
};

export const CafeScene: React.FC<{
  f: number;
  cam?: Camera;
  noah?: Pose | null;
  mila?: Pose | null;
  notebookOpen?: number;
  showTable?: boolean;
  showPlant?: boolean;
  showWindows?: boolean;
  showLamp?: boolean;
  showCup?: boolean;
  showChairs?: boolean;
  wallFade?: number; // 0..1 simplify background
  under?: React.ReactNode; // drawn behind characters (world coords)
  over?: React.ReactNode; // drawn on top (world coords, inside camera)
  layerOpacity?: [number, number, number, number];
}> = ({ f, cam = WIDE, noah = noahDefault(), mila = milaDefault(), notebookOpen = 0, showTable = true, showPlant = true, showWindows = true, showLamp = true, showCup = true, showChairs = true, wallFade = 0, under, over, layerOpacity = [1, 1, 1, 1] }) => {
  const s = CAFE.stroke;
  const tr = cam.truck ?? 0;
  const layer = (i: number) => `translate(${-tr * PAR[i]} 0)`;
  return (
    <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: "absolute", left: 0, top: 0, backgroundColor: FILM.wall }}>
      <g transform={`translate(960 540) scale(${cam.s}) translate(${-cam.cx} ${-cam.cy})`}>
        <g transform={layer(1)} opacity={layerOpacity[1]}>
          <CafeRoom width={1920} height={1100} floorY={CAFE.floorY} stroke={s} />
        </g>
        {showWindows ? (
          <g transform={layer(1)} opacity={layerOpacity[1] * (1 - wallFade * 0.6)}>
            <CafeWindow x={300} y={150} w={240} h={500} frame={f} seed="w1" stroke={s} />
            <CafeWindow x={1380} y={150} w={240} h={500} frame={f + 40} seed="w2" stroke={s} />
          </g>
        ) : null}
        {showLamp ? (
          <g transform={layer(1)} opacity={1 - wallFade * 0.6}>
            <PendantLamp x={960} y={120} s={1} stroke={s} />
          </g>
        ) : null}
        <g transform={layer(2)} opacity={layerOpacity[2]}>
          {showChairs ? (
            <>
              <CafeChair x={CAFE.mila.x - 0.03 * CAFE.H} seatY={CAFE.mila.y + 0.02 * CAFE.H} floorY={CAFE.floorY} H={CAFE.H} backSide={-1} stroke={s} />
              <CafeChair x={CAFE.noah.x + 0.03 * CAFE.H} seatY={CAFE.noah.y + 0.02 * CAFE.H} floorY={CAFE.floorY} H={CAFE.H} backSide={1} stroke={s} />
            </>
          ) : null}
          {under}
          {showTable ? <CafeTable {...CAFE.table} floorY={CAFE.floorY} stroke={s} seed="t1" /> : null}
          {showTable && showCup ? <Cup x={845} y={636} s={1} k={CAFE.table.k} stroke={s * 0.8} /> : null}
          {showTable ? <Notebook {...nbGeo} open={notebookOpen} /> : null}
          {mila ? <Stickman at={CAFE.mila} pose={mila} outfit="mila" /> : null}
          {noah ? <Stickman at={CAFE.noah} pose={noah} outfit="noah" /> : null}
        </g>
        {showPlant ? (
          <g transform={layer(3)} opacity={layerOpacity[3]}>
            <Plant x={150} floorY={CAFE.floorY + 4} s={1.15} stroke={s} seed="p1" />
          </g>
        ) : null}
        {over}
      </g>
    </svg>
  );
};
