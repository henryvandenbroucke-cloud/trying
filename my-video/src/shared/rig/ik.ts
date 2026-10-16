export type V = { x: number; y: number };

/**
 * Two-bone IK. Returns elbow + hand. When the target is reachable the hand is
 * exactly the target, so hand-to-object contact is guaranteed by construction.
 */
export const solveTwoBone = (
  s: V,
  t: V,
  l1: number,
  l2: number,
  elbowDown = true,
) => {
  const dx = t.x - s.x;
  const dy = t.y - s.y;
  const d = Math.hypot(dx, dy);
  const max = l1 + l2 - 1e-6;
  const min = Math.abs(l1 - l2) + 1e-6;
  const reachable = d <= max && d >= min;
  const dc = Math.min(max, Math.max(min, d));
  const phi = Math.atan2(dy, dx);
  const cosA = (l1 * l1 + dc * dc - l2 * l2) / (2 * l1 * dc);
  const a = Math.acos(Math.max(-1, Math.min(1, cosA)));
  const e1 = { x: s.x + l1 * Math.cos(phi + a), y: s.y + l1 * Math.sin(phi + a) };
  const e2 = { x: s.x + l1 * Math.cos(phi - a), y: s.y + l1 * Math.sin(phi - a) };
  const elbow = elbowDown ? (e1.y >= e2.y ? e1 : e2) : e1.y < e2.y ? e1 : e2;
  const hand = reachable
    ? t
    : { x: s.x + dc * Math.cos(phi), y: s.y + dc * Math.sin(phi) };
  return { elbow, hand, reachable };
};
