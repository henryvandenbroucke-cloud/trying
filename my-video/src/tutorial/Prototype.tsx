import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, interpolate } from "remotion";
import { Audio } from "@remotion/media";
import { NARRATION, shot } from "./shots";
import { Grain } from "../shared/ui/ui";
import { Shot01A_CafeWide } from "../example-film/shots/Shot01A_CafeWide";
import { Shot01B_NotebookClose } from "../example-film/shots/Shot01B_NotebookClose";
import { Shot01C_MemoryReveal } from "../example-film/shots/Shot01C_MemoryReveal";
import { Shot01D_Reveal, WorkedExampleTag } from "./sequences/Seq01";
import { Shot02A_Idea } from "./sequences/Seq02";

/** Prototype: tutorial shots 01A–02A (f0–570, 19 s). */
export const Prototype: React.FC = () => {
  const g = useCurrentFrame();
  const n = NARRATION.tut01;
  const narrFrames = Math.round(n.cutAtSec * 30);
  return (
    <AbsoluteFill>
      {/* Picture — straight cuts at the shot boundaries in shots.ts */}
      <Sequence name="01A Outcome wide" {...shot("01A")}>
        <Shot01A_CafeWide f={g - 0} />
      </Sequence>
      <Sequence name="01B Notebook detail" {...shot("01B")}>
        <Shot01B_NotebookClose f={g - 90} />
      </Sequence>
      <Sequence name="01C Memory reveal" {...shot("01C")}>
        <Shot01C_MemoryReveal f={g - 180} />
      </Sequence>
      <Sequence name="01D Reveal the process" {...shot("01D")}>
        <Shot01D_Reveal g={g} />
      </Sequence>
      <Sequence name="02A Idea card" {...shot("02A")}>
        <Shot02A_Idea g={g} />
      </Sequence>
      {/* Tutorial-layer tag over the film excerpt */}
      <Sequence name="Worked example tag" durationInFrames={360}>
        <WorkedExampleTag g={g} />
      </Sequence>
      <Grain opacity={0.2} />

      {/* Sound */}
      <Audio
        name="Café room tone (placeholder)"
        src={staticFile("sfx/cafe_roomtone_placeholder.wav")}
        durationInFrames={385}
        volume={(f) => interpolate(f, [0, 15, 330, 385], [0, 0.9, 0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
      <Sequence name="Paper — contact" from={120} durationInFrames={20}>
        <Audio src={staticFile("sfx/paper_cover_placeholder.wav")} volume={0.32} />
      </Sequence>
      <Sequence name="TUT-01 narration" from={n.start} durationInFrames={narrFrames}>
        <Audio
          src={staticFile(n.file)}
          volume={(f) => interpolate(f, [0, narrFrames - 4, narrFrames], [1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />
      </Sequence>
      <Sequence name="Tick — idea card" from={460} durationInFrames={10}>
        <Audio src={staticFile("sfx/tick_soft_placeholder.wav")} volume={0.7} />
      </Sequence>
    </AbsoluteFill>
  );
};
