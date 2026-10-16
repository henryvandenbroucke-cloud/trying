import type React from "react";
import type { TShot } from "./timeline";

export type ShotProps = {
  l: number; // local frame inside the shot
  d: number; // shot duration in frames
  g: number; // global frame
  shot: TShot;
  cue: (prefix: string, n?: number, fallback?: number) => number;
};
export type ShotComp = React.FC<ShotProps>;
/** Sound effects, in local frames of a shot. */
export type Sfx = { shot: string; at: number | ((d: number, cue: ShotProps["cue"]) => number); file: string; volume: number };
