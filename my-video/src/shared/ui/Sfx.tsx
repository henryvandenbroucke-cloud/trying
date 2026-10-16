import React from "react";
import { Sequence, staticFile, interpolate } from "remotion";
import { Audio } from "@remotion/media";

/** One-shot sound effect at a local frame (inside the current Sequence). */
export const Sfx: React.FC<{ at: number; file: string; volume?: number; dur?: number }> = ({ at, file, volume = 1, dur = 30 }) => (
  <Sequence from={Math.max(0, Math.round(at))} durationInFrames={dur} layout="none">
    <Audio src={staticFile(file)} volume={volume} />
  </Sequence>
);

/** Looping bed for a whole shot with 6-frame fades at both ends (no clicks at straight cuts). */
export const Bed: React.FC<{ d: number; file: string; volume: number; trim?: number }> = ({ d, file, volume, trim = 0 }) => (
  <Audio
    src={staticFile(file)}
    trimBefore={trim}
    durationInFrames={d}
    loop
    volume={(f) => volume * interpolate(f, [0, 6, d - 6, d], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
  />
);
