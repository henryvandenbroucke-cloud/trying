import { Easing, interpolate } from "remotion";

// The only easing curves used in the project (STYLE_CONTEXT v1).
export const ENTER = Easing.bezier(0.16, 1, 0.3, 1); // 8–12 f entrances
export const EXIT = Easing.bezier(0.7, 0, 0.84, 0); // 6–8 f exits
export const MOVE = Easing.bezier(0.65, 0, 0.35, 1); // camera / position moves
export const SETTLE = Easing.spring({ damping: 200 }); // characters only, no overshoot

/** Clamped tween from `from` to `to` over frames [a, b]. */
export const tween = (
  frame: number,
  a: number,
  b: number,
  from: number,
  to: number,
  easing: (t: number) => number = MOVE,
) =>
  interpolate(frame, [a, b], [from, to], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** 0→1 progress over [a, b]. */
export const prog = (frame: number, a: number, b: number, easing = MOVE) =>
  tween(frame, a, b, 0, 1, easing);

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
