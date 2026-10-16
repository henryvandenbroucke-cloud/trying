import React from "react";
import { AbsoluteFill } from "remotion";
import { FONT, UI } from "../../shared/tokens";
import { ENTER, MOVE, prog, tween, lerp } from "../../shared/easing";
import { Pill, cardStyle, enterStyle, font } from "../../shared/ui/ui";
import { Shot01A_CafeWide } from "../../example-film/shots/Shot01A_CafeWide";
import { Shot01B_NotebookClose } from "../../example-film/shots/Shot01B_NotebookClose";
import { Shot01C_MemoryReveal } from "../../example-film/shots/Shot01C_MemoryReveal";

// Player frame geometry at the end of the 01D pull-back (scale 0.62).
export const PLAYER = { scale: 0.62, x: (1920 - 1920 * 0.62) / 2, y: 150 };

/** "Worked example" tag that labels the film layer. Docks above the player in 01D. */
export const WorkedExampleTag: React.FC<{ g: number }> = ({ g }) => {
  const dock = prog(g, 300, 330, MOVE);
  const x = lerp(100, PLAYER.x, dock);
  const y = lerp(80, PLAYER.y - 72, dock);
  return (
    <div style={{ position: "absolute", left: x, top: y, ...enterStyle(g, 15, 8) }}>
      <Pill tone="light" size={30}>
        <span style={{ width: 12, height: 12, borderRadius: 99, background: UI.cobalt, display: "inline-block" }} />
        Worked example
      </Pill>
    </div>
  );
};

/** Scaled, non-interactive snapshot of a film shot at a given local frame. */
const Thumb: React.FC<{ children: React.ReactNode; w: number }> = ({ children, w }) => {
  const s = w / 1920;
  return (
    <div style={{ width: w, height: 1080 * s, overflow: "hidden", borderRadius: 14, position: "relative", ...cardStyle(14) }}>
      <div style={{ width: 1920, height: 1080, scale: String(s), transformOrigin: "0 0", position: "absolute", left: 0, top: 0 }}>{children}</div>
    </div>
  );
};

/** Straight cut: the card is already on screen at the cut frame and settles once (no fade from empty). */
const cutSettle = (l: number): React.CSSProperties => {
  const t = prog(l, 0, 10, ENTER);
  return { translate: `0px ${(1 - t) * 10}px`, scale: String(0.99 + 0.01 * t) };
};

const SCRIPT_LINES = ["Mila is telling you about her week.", "But you're somewhere else.", "A Tuesday, three summers ago..."];

/**
 * 01D — Reveal the process (global f300–450).
 * f300–330 the film scales into a player frame; f360 straight cut to the
 * script + scene plan; "SCRIPT → VIDEO" at f372.
 */
export const Shot01D_Reveal: React.FC<{ g: number }> = ({ g }) => {
  const pull = prog(g, 300, 330, MOVE);
  const sc = lerp(1, PLAYER.scale, pull);
  const x = lerp(0, PLAYER.x, pull);
  const y = lerp(0, PLAYER.y, pull);
  const chrome = prog(g, 318, 330, ENTER);
  const progress = tween(g, 300, 360, 0.38, 0.45, (t) => t);

  if (g < 360) {
    return (
      <AbsoluteFill style={{ backgroundColor: UI.paper }}>
        <div
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: 1920 * sc,
            height: 1080 * sc,
            borderRadius: 24 * pull,
            overflow: "hidden",
            boxShadow: `0 18px 48px rgba(22,32,42,${0.2 * pull})`,
          }}
        >
          <div style={{ width: 1920, height: 1080, scale: String(sc), transformOrigin: "0 0" }}>
            <Shot01C_MemoryReveal f={120 + (g - 300)} />
          </div>
        </div>
        {/* player controls (illustrative chrome, no real timecode) */}
        <div style={{ position: "absolute", left: PLAYER.x, top: PLAYER.y + 1080 * PLAYER.scale + 28, width: 1920 * PLAYER.scale, display: "flex", alignItems: "center", gap: 24, opacity: chrome }}>
          <svg width={34} height={38} viewBox="0 0 34 38">
            <path d="M 4 3 L 31 19 L 4 35 Z" fill={UI.charcoal} strokeLinejoin="round" stroke={UI.charcoal} strokeWidth={4} />
          </svg>
          <div style={{ flex: 1, height: 10, borderRadius: 99, background: "rgba(22,32,42,0.14)", position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${progress * 100}%`, borderRadius: 99, background: UI.cobalt }} />
          </div>
        </div>
      </AbsoluteFill>
    );
  }

  const l = g - 360; // local frames after the cut
  return (
    <AbsoluteFill style={{ backgroundColor: UI.paper }}>
      {/* Script page */}
      <div style={{ position: "absolute", left: 120, top: 110, width: 860, height: 560, padding: "44px 52px", boxSizing: "border-box", ...cardStyle(24), ...cutSettle(l) }}>
        <div style={{ display: "flex", gap: 14, marginBottom: 26 }}>
          <Pill tone="outline" size={24}>Example-film script</Pill>
          <Pill tone="outline" size={24} style={{ opacity: 0.65 }}>Draft</Pill>
        </div>
        <div style={{ ...font(FONT.title, 44), marginBottom: 30 }}>
          What If You Remembered
          <br />
          Every Single Day?
        </div>
        <div style={{ borderLeft: `6px solid ${UI.cobalt}`, paddingLeft: 26 }}>
          {SCRIPT_LINES.map((line, i) => (
            <div key={i} style={{ ...font(FONT.body, 38), lineHeight: 1.45, whiteSpace: "nowrap", ...enterStyle(l, i === 0 ? -10 : 3 + i * 3, 10) }}>
              {line}
            </div>
          ))}
        </div>
      </div>
      {/* Headline */}
      <div style={{ position: "absolute", left: 1060, top: 270, ...enterStyle(l, 12, 16) }}>
        <div style={{ ...font(FONT.title, 88), letterSpacing: -1 }}>
          SCRIPT <span style={{ color: UI.cobalt }}>→</span> VIDEO
        </div>
        <div style={{ ...font(FONT.body, 38, UI.muted), marginTop: 18, ...enterStyle(l, 18, 10) }}>The scene plan behind the excerpt</div>
      </div>
      {/* Mini scene timeline */}
      <div style={{ position: "absolute", left: 120, top: 735, width: 1680 }}>
        <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
          {[
            { label: "Scene 1 · Notice", el: <Shot01A_CafeWide f={60} /> },
            { label: "Scene 2 · Touch", el: <Shot01B_NotebookClose f={60} /> },
            { label: "Scene 3 · Remember", el: <Shot01C_MemoryReveal f={100} /> },
          ].map((t, i) => (
            <div key={i} style={{ ...enterStyle(l, 24 + i * 3, 12) }}>
              <Thumb w={330}>{t.el}</Thumb>
              <div style={{ ...font(FONT.body, 30, UI.charcoal), marginTop: 14 }}>{t.label}</div>
            </div>
          ))}
          <div style={{ alignSelf: "center", marginLeft: 10, ...enterStyle(l, 36, 12) }}>
            <svg width={300} height={60} viewBox="0 0 300 60">
              <line x1={6} y1={30} x2={250} y2={30} stroke={UI.charcoal} strokeWidth={6} strokeLinecap="round" strokeDasharray="2 18" />
              <path d="M 252 12 L 290 30 L 252 48 Z" fill={UI.cobalt} />
            </svg>
            <div style={{ ...font(FONT.body, 30, UI.muted), marginTop: 6 }}>…the full film</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
