import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { ExB, ExC, ExD, ExE, EX_E, TAPS } from "./shots/Excerpt";
import { Bed, Sfx } from "../shared/ui/Sfx";
import { shotById } from "../tutorial/timeline";

/** The Monday café excerpt as its own film composition (same shots and durations as tutorial 19B–19E). */
export const EXCERPT_SHOTS = ["19B", "19C", "19D", "19E"].map((id) => shotById(id));
export const EXCERPT_DURATION = EXCERPT_SHOTS.reduce((a, s) => a + (s.to - s.from), 0);

export const ExcerptMonday: React.FC = () => {
  const g = useCurrentFrame();
  let at = 0;
  const comps = [ExB, ExC, ExD, ExE];
  return (
    <AbsoluteFill>
      {EXCERPT_SHOTS.map((s, i) => {
        const d = s.to - s.from;
        const from = at;
        at += d;
        const C = comps[i];
        return (
          <Sequence key={s.id} from={from} durationInFrames={d} name={`Excerpt ${s.id}`}>
            <C f={g - from} d={d} />
            <Bed d={d} file="sfx/cafe_roomtone_placeholder.wav" volume={i === 1 ? 0.6 : 0.9} />
            {i === 2 ? <Sfx at={TAPS[0] - 1} file="sfx/table_taps_placeholder.wav" volume={0.5} /> : null}
            {i === 3 ? <Sfx at={EX_E.closeEnd - 4} file="sfx/paper_cover_placeholder.wav" volume={0.22} /> : null}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
