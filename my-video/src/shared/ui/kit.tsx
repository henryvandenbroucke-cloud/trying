import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate } from "remotion";
import { FONT, UI } from "../tokens";
import { ENTER, EXIT, MOVE, prog, lerp } from "../easing";
import { jitter, smoothClosed, type Pt } from "../geom";
import { cardStyle, font } from "./ui";

export const MONO = "JetBrains Mono";

/** Opacity is linear; position/scale use ENTER (motion research: ease-out in, ease-in out, exits ≈ 75 % of entrances). */
export const appear = (l: number, at: number, dur = 10, rise = 14): React.CSSProperties => {
  // Content that belongs to the cut frame is present at the cut and only settles (no flash of empty paper).
  if (at <= 10) {
    const t = prog(l, 0, dur, ENTER);
    return { opacity: 1, translate: `0px ${(1 - t) * rise * 0.5}px` };
  }
  const o = interpolate(l, [at, at + dur * 0.8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const t = prog(l, at, at + dur, ENTER);
  return { opacity: o, translate: `0px ${(1 - t) * rise}px` };
};
export const vanish = (l: number, at: number, dur = 7): React.CSSProperties => {
  const t = prog(l, at, at + dur, EXIT);
  return { opacity: 1 - t, translate: `0px ${-t * 10}px` };
};
/** For straight cuts: content exists at the cut frame and settles once. */
export const settleIn = (l: number, dur = 10, amt = 8): React.CSSProperties => {
  const t = prog(l, 0, dur, ENTER);
  return { translate: `0px ${(1 - t) * amt}px` };
};

export const Stage: React.FC<{ children?: React.ReactNode; bg?: string }> = ({ children, bg = UI.paper }) => (
  <AbsoluteFill style={{ backgroundColor: bg, fontFamily: FONT.family }}>{children}</AbsoluteFill>
);

export const Abs: React.FC<{ x: number; y: number; w?: number; h?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({ x, y, w, h, style, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, ...style }}>{children}</div>
);

/** Big emphasis text (2–6 words) with an optional hand-drawn underline. */
/** Emphasis label. Over an illustrated scene pass `plate` (paper card behind the text) and place it in clear space — never over characters or props. */
export const Keyword: React.FC<{ l: number; at: number; text: string; x?: number; y: number; size?: number; underline?: boolean; color?: string; center?: boolean; w?: number; plate?: boolean }> = ({ l, at, text, x = 0, y, size = 56, underline = true, color = UI.charcoal, center = true, w = 1920, plate = false }) => (
  <div style={{ position: "absolute", left: x, top: Math.min(y, 850), width: center ? w : undefined, display: "flex", flexDirection: "column", alignItems: center ? "center" : "flex-start", ...appear(l, at, 12) }}>
    <div style={{ ...font(FONT.title, size, color), letterSpacing: -0.5, whiteSpace: "nowrap", ...(plate ? { background: UI.card, padding: `${size * 0.22}px ${size * 0.5}px`, borderRadius: size * 0.4, boxShadow: "0 8px 24px rgba(22,32,42,0.14)", border: "2px solid rgba(22,32,42,0.12)" } : {}) }}>{text}</div>
    {underline ? <Underline l={l} at={at + 6} width={Math.min(text.length * size * 0.52, 900)} /> : null}
  </div>
);

export const Underline: React.FC<{ l: number; at: number; width: number; color?: string; stroke?: number }> = ({ l, at, width, color = UI.cobalt, stroke = 8 }) => {
  const t = prog(l, at, at + 10, ENTER);
  const d = `M 4 ${stroke} C ${width * 0.3} ${stroke * 0.4}, ${width * 0.65} ${stroke * 1.5}, ${width - 4} ${stroke * 0.7}`;
  const len = width * 1.02;
  return (
    <svg width={width} height={stroke * 2.2} style={{ display: "block", overflow: "visible", marginTop: 4 }}>
      <path d={d} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - t)} />
    </svg>
  );
};

/** Pre-authored hand-drawn ellipse ring around a box, drawn on over 10 f. */
export const MarkerRing: React.FC<{ l: number; at: number; x: number; y: number; w: number; h: number; color?: string; seed?: string; stroke?: number }> = ({ l, at, x, y, w, h, color = UI.cobalt, seed = "ring", stroke = 7 }) => {
  const t = prog(l, at, at + 10, ENTER);
  const cx = x + w / 2, cy = y + h / 2, rx = w / 2 + 22, ry = h / 2 + 18;
  const pts: Pt[] = [];
  for (let i = 0; i <= 15; i++) {
    const a = -Math.PI * 0.62 + (i / 14) * Math.PI * 2.08;
    const k = 1 + jitter(seed, i, 0.025);
    pts.push({ x: cx + Math.cos(a) * rx * k, y: cy + Math.sin(a) * ry * k });
  }
  const d = smoothClosed(pts).replace(/ Z$/, "");
  const len = Math.PI * (rx + ry) * 2.2;
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none" }} width={1} height={1}>
      <path d={d} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - t)} />
    </svg>
  );
};

/** Status/source tag. kind: real | illustration | missing | draft | done | fix */
export const Tag: React.FC<{ kind: "real" | "illustration" | "missing" | "draft" | "done" | "fix" | "info"; children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({ kind, children, size = 24, style }) => {
  const map = {
    real: { bg: UI.card, fg: UI.charcoal, b: "rgba(22,32,42,0.25)", icon: "●" },
    illustration: { bg: UI.card, fg: UI.charcoal, b: "rgba(22,32,42,0.25)", icon: "✎" },
    missing: { bg: "#FFF4DD", fg: "#7A4B00", b: UI.amber, icon: "!" },
    draft: { bg: UI.card, fg: UI.charcoal, b: UI.charcoal, icon: "◐" },
    done: { bg: "#E6F8EF", fg: "#0F5A38", b: UI.mint, icon: "✓" },
    fix: { bg: "#FFF4DD", fg: "#7A4B00", b: UI.amber, icon: "!" },
    info: { bg: UI.cobalt, fg: "#FFFFFF", b: UI.cobalt, icon: "▶" },
  }[kind];
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: size * 0.4, padding: `${size * 0.28}px ${size * 0.6}px`, borderRadius: 999, background: map.bg, color: map.fg, border: `3px solid ${map.b}`, ...font(FONT.title, size, map.fg), whiteSpace: "nowrap", ...style }}>
      <span style={{ fontSize: size * 0.85 }}>{map.icon}</span>
      {children}
    </div>
  );
};

type Crop = { x: number; y: number; w: number; h: number };
/** Real screen capture in a rounded frame; crop animates between `from` and `to` (image pixels). */
export const CaptureFrame: React.FC<{ src: string; imgW: number; imgH: number; box: Crop; from: Crop; to?: Crop; l?: number; t0?: number; t1?: number; caption?: string; children?: React.ReactNode }> = ({ src, imgW, imgH, box, from, to, l = 0, t0 = 0, t1 = 1, caption, children }) => {
  const t = to ? prog(l, t0, t1, MOVE) : 0;
  const c = to ? { x: lerp(from.x, to.x, t), y: lerp(from.y, to.y, t), w: lerp(from.w, to.w, t), h: lerp(from.h, to.h, t) } : from;
  const sc = box.w / c.w;
  return (
    <div style={{ position: "absolute", left: box.x, top: box.y, width: box.w, height: box.h }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 20, boxShadow: "0 18px 44px rgba(22,32,42,0.18)", border: "2px solid rgba(22,32,42,0.12)", background: "#fff" }}>
        <Img src={staticFile(src)} style={{ position: "absolute", left: -c.x * sc, top: -c.y * sc, width: imgW * sc, height: imgH * sc, maxWidth: "none" }} />
        {children}
      </div>
      {caption ? <div style={{ position: "absolute", top: box.h + 14, left: 6, ...font(FONT.body, 26, UI.muted), whiteSpace: "nowrap" }}>{caption}</div> : null}
    </div>
  );
};

/** Maps an image-pixel rect to screen coordinates for a CaptureFrame with a fixed crop. */
export const capRect = (box: Crop, crop: Crop, r: Crop): Crop => {
  const sc = box.w / crop.w;
  return { x: box.x + (r.x - crop.x) * sc, y: box.y + (r.y - crop.y) * sc, w: r.w * sc, h: r.h * sc };
};

export type TermBlock = { cmd: string; out: string[]; elapsed_s?: number };
/**
 * Terminal replay of recorded output. Commands type at ~40 chars/s; output lines appear 2 f apart.
 * `starts` gives the local frame each block starts typing.
 */
export const Terminal: React.FC<{ l: number; blocks: TermBlock[]; starts: number[]; x: number; y: number; w: number; h: number; size?: number; title?: string; speedTag?: { at: number; to: number; text: string } }> = ({ l, blocks, starts, x, y, w, h, size = 34, title = "Terminal", speedTag }) => {
  const lines: { text: string; kind: "cmd" | "out" }[] = [];
  blocks.forEach((b, i) => {
    const s = starts[i];
    if (l < s) return;
    const typed = Math.min(b.cmd.length, Math.floor((l - s) * 1.4));
    lines.push({ text: b.cmd.slice(0, typed) + (typed < b.cmd.length ? "▌" : ""), kind: "cmd" });
    const typedEnd = s + Math.ceil(b.cmd.length / 1.4) + 4;
    b.out.forEach((o, j) => {
      if (l >= typedEnd + j * 2) lines.push({ text: o, kind: "out" });
    });
  });
  const lh = size * 1.45;
  const maxLines = Math.floor((h - 70) / lh);
  const shown = lines.slice(Math.max(0, lines.length - maxLines));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 20, background: "#141A21", boxShadow: "0 18px 44px rgba(22,32,42,0.25)", overflow: "hidden" }}>
      <div style={{ height: 52, background: "#1E2630", display: "flex", alignItems: "center", gap: 12, paddingLeft: 22 }}>
        {["#F26B5B", "#F6B344", "#3ECF8E"].map((c) => (
          <span key={c} style={{ width: 16, height: 16, borderRadius: 99, background: c, display: "inline-block" }} />
        ))}
        <span style={{ ...font(FONT.body, 24, "#9AA6B2"), marginLeft: 14 }}>{title}</span>
      </div>
      <div style={{ padding: "18px 28px" }}>
        {shown.map((ln, i) => (
          <div key={i} style={{ fontFamily: MONO, fontSize: size, lineHeight: `${lh}px`, color: ln.kind === "cmd" ? "#FFFFFF" : "#B9C4CF", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {ln.kind === "cmd" ? <span style={{ color: UI.mint }}>$ </span> : null}
            {ln.text}
          </div>
        ))}
      </div>
      {speedTag && l >= speedTag.at && l < speedTag.to ? (
        <div style={{ position: "absolute", right: 22, top: 70 }}>
          <Tag kind="info" size={24}>{speedTag.text}</Tag>
        </div>
      ) : null}
    </div>
  );
};

export type DocLine = { text: string; hl?: number; hlColor?: string; underline?: number; ulColor?: string; dim?: boolean; strike?: number; appearAt?: number; mono?: boolean; bold?: boolean };
/** Document card: readable crop of a real text file (or labelled illustration). */
export const DocCard: React.FC<{ l: number; x: number; y: number; w: number; h?: number; title?: string; tag?: React.ReactNode; lines: DocLine[]; size?: number; scrollY?: number; settle?: boolean }> = ({ l, x, y, w, h, title, tag, lines, size = 38, scrollY = 0, settle = true }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, boxSizing: "border-box", padding: "36px 46px", overflow: "hidden", ...cardStyle(24), ...(settle ? settleIn(l) : {}) }}>
    {tag ? <div style={{ marginBottom: 20, display: "flex", gap: 12 }}>{tag}</div> : null}
    {title ? <div style={{ ...font(FONT.title, size * 1.12), marginBottom: 22 }}>{title}</div> : null}
    <div style={{ translate: `0px ${-scrollY}px` }}>
      {lines.map((ln, i) => {
        const hlT = ln.hl !== undefined ? prog(l, ln.hl, ln.hl + 8, ENTER) : 0;
        const ulT = ln.underline !== undefined ? prog(l, ln.underline, ln.underline + 10, ENTER) : 0;
        const stT = ln.strike !== undefined ? prog(l, ln.strike, ln.strike + 8, ENTER) : 0;
        const op = ln.appearAt !== undefined ? interpolate(l, [ln.appearAt, ln.appearAt + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
        return (
          <div key={i} style={{ position: "relative", marginBottom: size * 0.32, opacity: (ln.dim ? 0.45 : 1) * op }}>
            <span style={{ position: "relative", display: "inline", ...font(ln.bold ? FONT.title : FONT.body, size), fontFamily: ln.mono ? MONO : FONT.family, lineHeight: 1.4, backgroundImage: hlT > 0 ? `linear-gradient(${ln.hlColor ?? "rgba(69,92,245,0.16)"}, ${ln.hlColor ?? "rgba(69,92,245,0.16)"})` : undefined, backgroundSize: `${hlT * 100}% 100%`, backgroundRepeat: "no-repeat", textDecoration: stT > 0.5 ? `line-through ${UI.amber} 5px` : ulT > 0.5 ? `underline ${ln.ulColor ?? UI.amber} 5px` : undefined, textUnderlineOffset: 8, borderRadius: 6 }}>
              {ln.text || " "}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

/** Route icons (simple, consistent 6 px stroke). */
export const Icon: React.FC<{ name: string; size?: number; color?: string }> = ({ name, size = 72, color = UI.charcoal }) => {
  const s = { fill: "none", stroke: color, strokeWidth: 6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const g: Record<string, React.ReactNode> = {
    topic: <><path d="M36 10 a20 20 0 0 1 12 36 v8 h-24 v-8 a20 20 0 0 1 12 -36 z" {...s} /><line x1={28} y1={62} x2={44} y2={62} {...s} /></>,
    script: <><rect x={16} y={8} width={40} height={56} rx={6} {...s} /><line x1={24} y1={24} x2={48} y2={24} {...s} /><line x1={24} y1={36} x2={48} y2={36} {...s} /><line x1={24} y1={48} x2={40} y2={48} {...s} /></>,
    check: <><circle cx={32} cy={32} r={18} {...s} /><line x1={45} y1={45} x2={60} y2={60} {...s} /><path d="M24 32 l6 6 l10 -12" {...s} /></>,
    voice: <>{[14, 24, 34, 44, 54].map((x, i) => <line key={x} x1={x} y1={36 - [8, 18, 24, 14, 6][i]} x2={x} y2={36 + [8, 18, 24, 14, 6][i]} {...s} />)}</>,
    scenes: <><rect x={8} y={16} width={56} height={40} rx={6} {...s} /><line x1={26} y1={16} x2={26} y2={56} {...s} /><line x1={46} y1={16} x2={46} y2={56} {...s} /></>,
    characters: <><circle cx={36} cy={20} r={11} {...s} /><path d="M36 31 v18 M24 40 h24 M36 49 l-9 15 M36 49 l9 15" {...s} /></>,
    motion: <><path d="M10 56 C 20 14, 50 14, 62 40" {...s} /><path d="M54 40 h8 v-8" {...s} /></>,
    sound: <><path d="M12 28 h10 l14 -12 v40 l-14 -12 h-10 z" {...s} /><path d="M46 24 a12 12 0 0 1 0 24 M52 16 a22 22 0 0 1 0 40" {...s} /></>,
    review: <><path d="M6 36 C 20 14, 52 14, 66 36 C 52 58, 20 58, 6 36 z" {...s} /><circle cx={36} cy={36} r={9} {...s} /></>,
    export: <><rect x={14} y={8} width={44} height={56} rx={6} {...s} /><path d="M36 22 v26 M26 38 l10 10 l10 -10" {...s} /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 72 72">{g[name]}</svg>;
};

export const ROUTE = [
  { k: "topic", label: "Topic" }, { k: "script", label: "Script" }, { k: "check", label: "Check" }, { k: "voice", label: "Voice" }, { k: "scenes", label: "Scenes" },
  { k: "characters", label: "Characters" }, { k: "motion", label: "Motion" }, { k: "sound", label: "Sound" }, { k: "review", label: "Review" }, { k: "export", label: "Export" },
];

export const RouteNode: React.FC<{ k: string; label: string; active?: number; done?: boolean; size?: number; style?: React.CSSProperties }> = ({ k, label, active = 0, done, size = 72, style }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, ...style }}>
    <div style={{ width: size * 1.9, height: size * 1.9, borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center", ...cardStyle(28), border: `${3 + active * 3}px solid ${active > 0.5 ? UI.cobalt : "rgba(22,32,42,0.14)"}`, position: "relative" }}>
      <Icon name={k} size={size} color={active > 0.5 ? UI.cobalt : UI.charcoal} />
      {done ? <span style={{ position: "absolute", right: -10, top: -10, width: 36, height: 36, borderRadius: 99, background: UI.mint, color: "#fff", ...font(FONT.title, 24, "#fff"), display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span> : null}
    </div>
    <div style={{ ...font(FONT.title, Math.round(size * 0.55)), whiteSpace: "nowrap" }}>{label}</div>
  </div>
);

/** Small route strip (top-left) marking the current stage. */
export const ProgressStrip: React.FC<{ active: number; l: number }> = ({ active, l }) => (
  <div style={{ position: "absolute", left: 100, top: 52, display: "flex", gap: 10, alignItems: "center", ...appear(l, 0, 8, 6) }}>
    {ROUTE.map((r, i) => (
      <div key={r.k} style={{ height: 12, width: i === active ? 56 : 22, borderRadius: 99, background: i === active ? UI.cobalt : i < active ? UI.mint : "rgba(22,32,42,0.16)" }} />
    ))}
    <span style={{ ...font(FONT.title, 26, UI.charcoal), marginLeft: 10 }}>{ROUTE[active].label}</span>
  </div>
);

/** Real waveform from peaks (1 value per frame); or a dashed "audio pending" lane with estimated word blocks. */
export const Waveform: React.FC<{ peaks?: number[]; words?: { f: number; fe: number }[]; x: number; y: number; w: number; h: number; frames: number; playhead?: number; color?: string; startFrame?: number; label?: string }> = ({ peaks, words = [], x, y, w, h, frames, playhead, color = UI.cobalt, startFrame = 0, label }) => {
  const px = (f: number) => x + ((f - startFrame) / frames) * w;
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={1} height={1}>
      {peaks ? (
        peaks.map((v, i) => {
          const hh = Math.max(3, v * h * 0.95);
          return <rect key={i} x={x + (i / peaks.length) * w} y={y + h / 2 - hh / 2} width={Math.max(2, (w / peaks.length) * 0.7)} height={hh} rx={2} fill={color} opacity={playhead !== undefined && i / peaks.length * frames + startFrame > playhead ? 0.35 : 0.95} />;
        })
      ) : (
        <>
          <rect x={x} y={y} width={w} height={h} rx={12} fill="none" stroke={UI.amber} strokeWidth={3} strokeDasharray="10 8" />
          {words.map((wd, i) => (
            <rect key={i} x={px(wd.f)} y={y + h * 0.3} width={Math.max(4, px(wd.fe) - px(wd.f) - 3)} height={h * 0.4} rx={5} fill={UI.amber} opacity={0.45} />
          ))}
        </>
      )}
      {playhead !== undefined ? <line x1={px(playhead)} y1={y - 12} x2={px(playhead)} y2={y + h + 12} stroke={UI.charcoal} strokeWidth={4} strokeLinecap="round" /> : null}
      {label ? <text x={x} y={y - 18} style={{ fontFamily: FONT.family, fontWeight: 700, fontSize: 26, fill: UI.muted }}>{label}</text> : null}
    </svg>
  );
};

/** Caption pill (follows narration words). */
export const CaptionPill: React.FC<{ text: string; film?: boolean }> = ({ text, film }) => (
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 52, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
    <div style={{ maxWidth: 1500, padding: "12px 28px", borderRadius: 16, background: film ? "rgba(27,27,31,0.72)" : "rgba(22,32,42,0.82)", ...font(FONT.body, 38, "#FFFFFF"), fontStyle: film ? "italic" : "normal", textAlign: "center", lineHeight: 1.3 }}>{text}</div>
  </div>
);

/** A scaled snapshot/clip of any 1920×1080 scene. */
export const Thumb: React.FC<{ w: number; children: React.ReactNode; radius?: number; style?: React.CSSProperties }> = ({ w, children, radius = 16, style }) => {
  const s = w / 1920;
  return (
    <div style={{ width: w, height: 1080 * s, overflow: "hidden", borderRadius: radius, position: "relative", ...cardStyle(radius), ...style }}>
      <div style={{ width: 1920, height: 1080, scale: String(s), transformOrigin: "0 0", position: "absolute", left: 0, top: 0 }}>{children}</div>
    </div>
  );
};

export const CheckStrip: React.FC<{ items: { label: string; doneAt: number }[]; l: number; x: number; y: number }> = ({ items, l, x, y }) => (
  <div style={{ position: "absolute", left: x, top: y, display: "flex", gap: 22 }}>
    {items.map((it) => (
      <Tag key={it.label} kind={l >= it.doneAt ? "done" : "draft"} size={30}>{it.label}</Tag>
    ))}
  </div>
);

