import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { FONT, UI } from "../tokens";
import { ENTER, prog } from "../easing";

export const font = (weight: number, size: number, color: string = UI.charcoal): React.CSSProperties => ({
  fontFamily: FONT.family,
  fontWeight: weight,
  fontSize: size,
  color,
  lineHeight: 1.18,
});

/** Static, seeded paper grain over the whole frame (never animated). */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.45 }) => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <Img src={staticFile("textures/paper_grain.png")} style={{ width: "100%", height: "100%", opacity }} />
  </AbsoluteFill>
);

/** ENTER helper: opacity + small rise, 10 f. */
export const enterStyle = (frame: number, at: number, rise = 14, dur = 10): React.CSSProperties => {
  const t = prog(frame, at, at + dur, ENTER);
  return { opacity: t, translate: `0px ${(1 - t) * rise}px` };
};

/** Small rounded label used for layer tags ("Worked example"). */
export const Pill: React.FC<{ children: React.ReactNode; tone?: "light" | "dark" | "cobalt" | "outline"; size?: number; style?: React.CSSProperties }> = ({ children, tone = "light", size = 30, style }) => {
  const bg = tone === "dark" ? UI.charcoal : tone === "cobalt" ? UI.cobalt : tone === "outline" ? "transparent" : "rgba(255,253,248,0.92)";
  const fg = tone === "dark" || tone === "cobalt" ? "#FFFFFF" : UI.charcoal;
  return (
    <div
      style={{
        ...font(FONT.title, size, fg),
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.4,
        padding: `${size * 0.32}px ${size * 0.62}px`,
        borderRadius: 999,
        background: bg,
        border: tone === "outline" ? `3px solid ${UI.charcoal}` : "none",
        boxShadow: tone === "light" ? "0 6px 18px rgba(22,32,42,0.14)" : "none",
        letterSpacing: 0.5,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Card surface: radius 24, faint outline, soft shadow. */
export const cardStyle = (radius = 24): React.CSSProperties => ({
  background: UI.card,
  borderRadius: radius,
  border: "2px solid rgba(22,32,42,0.12)",
  boxShadow: "0 12px 32px rgba(22,32,42,0.12)",
});

/** Hand-drawn marker underline (pre-authored path, drawn on over 10 f). */
export const MarkerUnderline: React.FC<{ frame: number; at: number; width: number; color?: string; stroke?: number }> = ({ frame, at, width, color = UI.cobalt, stroke = 8 }) => {
  const t = prog(frame, at, at + 10, ENTER);
  const d = `M 4 ${stroke} C ${width * 0.3} ${stroke * 0.4}, ${width * 0.65} ${stroke * 1.5}, ${width - 4} ${stroke * 0.7}`;
  const len = width * 1.02;
  return (
    <svg width={width} height={stroke * 2.2} style={{ display: "block", overflow: "visible" }}>
      <path d={d} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - t)} />
    </svg>
  );
};

/** Simple page icon (document silhouette). */
export const DocIcon: React.FC<{ w: number; color?: string }> = ({ w, color = UI.charcoal }) => {
  const h = w * 1.3;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x={3} y={3} width={w - 6} height={h - 6} rx={w * 0.1} fill={UI.card} stroke={color} strokeWidth={4} />
      {[0.28, 0.44, 0.6, 0.76].map((f, i) => (
        <line key={i} x1={w * 0.2} y1={h * f} x2={w * (i === 3 ? 0.55 : 0.8)} y2={h * f} stroke={color} strokeWidth={4} strokeLinecap="round" opacity={0.5} />
      ))}
    </svg>
  );
};
