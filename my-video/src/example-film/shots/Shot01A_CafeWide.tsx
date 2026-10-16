import React from "react";
import { AbsoluteFill } from "remotion";
import { MOVE, prog } from "../../shared/easing";
import { mixPose, toLocal, type Pose } from "../../shared/rig/Stickman";
import { CAFE, CafeScene, milaDefault, noahDefault, talkMouth } from "../CafeScene";

export const CAFE_WIDE = CAFE;

export const milaTalkingPose = (f: number): Pose => {
  const base = milaDefault();
  const tableY = toLocal({ x: 0, y: CAFE.table.cy }, CAFE.mila).y;
  return {
    ...base,
    mouthOpen: talkMouth(f),
    near: { ik: { x: 0.235 + 0.012 * Math.sin(f * 0.13), y: tableY - 0.045 + 0.01 * Math.sin(f * 0.17 + 1) } },
  };
};

/** 01A — Outcome wide: Mila talks; at f45 Noah's eyes lead, head follows, down to the notebook. */
export const Shot01A_CafeWide: React.FC<{ f: number }> = ({ f }) => {
  const listen = noahDefault();
  const notice: Pose = { ...listen, headTilt: 15, gazeX: 0.35, gazeY: 0.75, smile: 0.15, brow: -4 };
  const eyes = prog(f, 45, 50, MOVE);
  const head = prog(f, 47, 57, MOVE);
  const noah = { ...mixPose(listen, notice, head), gazeX: listen.gazeX + (notice.gazeX - listen.gazeX) * eyes, gazeY: listen.gazeY + (notice.gazeY - listen.gazeY) * eyes };
  return (
    <AbsoluteFill>
      <CafeScene f={f} noah={noah} mila={milaTalkingPose(f)} />
    </AbsoluteFill>
  );
};
