import React from "react";
import { FILM, RIG } from "../tokens";
import { solveTwoBone, type V } from "./ik";

/**
 * A single character arm in world pixels (used for close-ups where the body
 * is off-frame). Same proportions and stroke ratios as Stickman, scaled by H.
 */
export const WorldArm: React.FC<{
  shoulder: V;
  target: V;
  H: number;
  sleeve?: string;
  contactShadow?: number; // 0..1 opacity of a soft shadow under the hand
  shadowY?: number;
}> = ({ shoulder, target, H, sleeve = FILM.jacket, contactShadow = 0, shadowY }) => {
  const ink = FILM.ink;
  const { elbow: e, hand: h } = solveTwoBone(shoulder, target, RIG.upperArm * H, RIG.forearm * H, true);
  const cuff = { x: e.x + (h.x - e.x) * 0.7, y: e.y + (h.y - e.y) * 0.7 };
  const limb = `M ${shoulder.x} ${shoulder.y} L ${e.x} ${e.y} L ${h.x} ${h.y}`;
  const sl = `M ${shoulder.x} ${shoulder.y} L ${e.x} ${e.y} L ${cuff.x} ${cuff.y}`;
  return (
    <g>
      {contactShadow > 0 ? (
        <ellipse cx={h.x + RIG.handR * H * 0.3} cy={(shadowY ?? h.y) + RIG.handR * H * 0.7} rx={RIG.handR * H * 1.3} ry={RIG.handR * H * 0.45} fill={ink} opacity={0.12 * contactShadow} />
      ) : null}
      <path d={limb} fill="none" stroke={ink} strokeWidth={RIG.stroke * H} strokeLinecap="round" strokeLinejoin="round" />
      <path d={sl} fill="none" stroke={ink} strokeWidth={(RIG.sleeve + RIG.stroke * 1.2) * H} strokeLinecap="round" strokeLinejoin="round" />
      <path d={sl} fill="none" stroke={sleeve} strokeWidth={RIG.sleeve * H} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={h.x} cy={h.y} r={RIG.handR * H} fill={ink} />
    </g>
  );
};
