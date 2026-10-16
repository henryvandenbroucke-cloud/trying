// Example film — Monday café excerpt (used in tutorial 19B–19E and rendered as its own file).
import React from "react";
import { AbsoluteFill } from "remotion";
import { FILM } from "../../shared/tokens";
import { ENTER, MOVE, SETTLE, prog, lerp, tween } from "../../shared/easing";
import { toLocal, type Pose } from "../../shared/rig/Stickman";
import { coverGripPoint } from "../../shared/props/Notebook";
import { MemoryPanel } from "../../shared/sets/MemoryPanel";
import { MemorySummer } from "./memories";
import { CAFE, CafeScene, milaDefault, nbGeo, noahDefault, talkMouth } from "../CafeScene";

const OPEN = 55;
const distracted = (): Pose => ({ ...noahDefault(), headTilt: 14, gazeX: 0.2, gazeY: 0.85, smile: 0.15, near: { ik: toLocal(CAFE.noahLapRest, CAFE.noah) } });

/** 19B — wide: Mila talks about her week; Noah is somewhere else (eyes on the open notebook). */
export const ExB: React.FC<{ f: number; d: number }> = ({ f, d }) => (
  <CafeScene f={f} cam={{ s: tween(f, 0, d, 1, 1.05, MOVE), cx: 960, cy: 510 }} noah={distracted()} mila={{ ...milaDefault(), mouthOpen: talkMouth(f), gazeX: 0.6, near: { ik: { x: 0.24 + 0.012 * Math.sin(f * 0.13), y: -0.175 + 0.01 * Math.sin(f * 0.17) } } }} notebookOpen={OPEN} />
);

/** 19C — the memory: the same table, a past summer, framed as recall (lilac, dashed). */
export const ExC: React.FC<{ f: number; d: number }> = ({ f, d }) => {
  const s = tween(f, 0, d, 1, 1.04, MOVE);
  return (
    <AbsoluteFill style={{ backgroundColor: FILM.wall }}>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        <g style={{ transformOrigin: "960px 540px", scale: String(s) }}>
          <MemoryPanel x={110} y={70} w={1700} h={940} id="exc" stroke={7}><MemorySummer /></MemoryPanel>
        </g>
      </svg>
    </AbsoluteFill>
  );
};

/** Frames of Mila's two taps inside 19D (local). */
export const TAPS = [40, 52];
/** 19D — closer: two taps on the table; Noah's eyes come back to Mila, then his head follows. */
export const ExD: React.FC<{ f: number; d: number }> = ({ f }) => {
  const tableY = toLocal({ x: 0, y: CAFE.table.cy }, CAFE.mila).y;
  const tapLift = TAPS.reduce((acc, t) => acc + 0.03 * Math.max(0, 1 - Math.abs(f - (t - 4)) / 4), 0);
  const mila: Pose = { ...milaDefault(), smile: 0.1, brow: 6, gazeX: 0.7, mouthOpen: f > 70 && f < 110 ? talkMouth(f, 0.4) : 0, near: { ik: { x: 0.27, y: tableY - 0.004 - tapLift } } };
  const eyes = prog(f, 58, 63, MOVE);
  const head = prog(f, 61, 74, MOVE);
  const n0 = distracted();
  const noah: Pose = { ...n0, gazeX: lerp(0.2, 0.75, eyes), gazeY: lerp(0.85, 0, eyes), headTilt: lerp(14, 0, head), brow: lerp(0, 5, head), smile: lerp(0.15, 0, head) };
  return <CafeScene f={f} cam={{ s: 1.7, cx: 1000, cy: 560 }} noah={noah} mila={mila} notebookOpen={OPEN} showPlant={false} />;
};

/** 19E — two-shot: Noah reaches, closes the notebook, sets his hand down and leans in to listen. */
export const EX_E = { reach: 30, contact: 50, close: 56, closeEnd: 86, release: 96, listen: 104 };
export const ExE: React.FC<{ f: number; d: number }> = ({ f }) => {
  const B = EX_E;
  const open = tween(f, B.close, B.closeEnd, OPEN, 0, MOVE);
  const gOpen = coverGripPoint({ ...nbGeo, open: OPEN });
  const lap = CAFE.noahLapRest;
  let target = lap;
  if (f >= B.reach && f < B.contact) {
    const t = prog(f, B.reach, B.contact, MOVE);
    target = { x: lerp(lap.x, gOpen.x, t), y: lerp(lap.y, gOpen.y, t) - 16 * Math.sin(Math.PI * t) };
  } else if (f >= B.contact && f < B.release) target = coverGripPoint({ ...nbGeo, open });
  else if (f >= B.release) {
    const g0 = coverGripPoint({ ...nbGeo, open: 0 });
    const t = prog(f, B.release, B.release + 12, SETTLE);
    target = { x: lerp(g0.x, CAFE.noahHandRest.x, t), y: lerp(g0.y, CAFE.noahHandRest.y, t) };
  }
  const listen = prog(f, B.listen, B.listen + 18, SETTLE);
  const look = prog(f, 4, 16, MOVE);
  const noah: Pose = { ...noahDefault(), headTilt: lerp(lerp(6, 12, look), -2, listen), gazeX: lerp(0.4, 0.75, listen), gazeY: lerp(0.5, 0, listen), lean: lerp(3, 9, listen), smile: lerp(0.05, 0.5, listen), near: { ik: toLocal(target, CAFE.noah) } };
  const mila: Pose = { ...milaDefault(), mouthOpen: f > B.listen + 10 ? talkMouth(f, 0.45) : 0, smile: lerp(0.2, 0.6, listen), gazeX: 0.7 };
  return <CafeScene f={f} cam={{ s: 1.3, cx: 990, cy: 560 }} noah={noah} mila={mila} notebookOpen={open} />;
};

export const _ex = { ENTER };
