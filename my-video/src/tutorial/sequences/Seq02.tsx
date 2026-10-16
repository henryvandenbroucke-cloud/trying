import React from "react";
import { AbsoluteFill } from "remotion";
import { FONT, UI } from "../../shared/tokens";
import { ENTER, prog } from "../../shared/easing";
import { DocIcon, MarkerUnderline, Pill, cardStyle, enterStyle, font } from "../../shared/ui/ui";
import { NARRATION } from "../shots";

/** 02A — Idea card (global f450–570). Label lands on the spoken word "one". */
export const Shot02A_Idea: React.FC<{ g: number }> = ({ g }) => {
  const l = g - 450;
  // Straight cut: the card is on screen from the first frame and settles once (no fade from empty).
  const t = prog(l, 0, 10, ENTER);
  const labelAt = NARRATION.wordOne - 450;
  return (
    <AbsoluteFill style={{ backgroundColor: UI.paper }}>
      {/* document silhouette continues from the 01D script page */}
      <div style={{ position: "absolute", left: 110, top: 420, opacity: 0.45 }}>
        <DocIcon w={150} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 300,
          top: 230,
          width: 1320,
          height: 460,
          boxSizing: "border-box",
          padding: "64px 80px",
          ...cardStyle(32),
          translate: `0px ${(1 - t) * 10}px`,
          scale: String(0.985 + 0.015 * t),
        }}
      >
        <Pill tone="cobalt" size={30} style={{ letterSpacing: 3 }}>IDEA</Pill>
        <div style={{ ...font(FONT.title, 80), marginTop: 38, whiteSpace: "nowrap", letterSpacing: -1 }}>
          What If You Remembered
          <br />
          Every Single Day?
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 760, display: "flex", flexDirection: "column", alignItems: "center", ...enterStyle(l, labelAt, 12) }}>
        <div style={{ ...font(FONT.title, 54) }}>One original idea</div>
        <div style={{ marginTop: 6 }}>
          <MarkerUnderline frame={l} at={labelAt + 6} width={430} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
