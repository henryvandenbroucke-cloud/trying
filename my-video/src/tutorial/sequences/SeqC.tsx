// Sequences 11–13: speech → scenes, character lock, environment layers.
import React from "react";
import { FONT, UI, FILM, RIG } from "../../shared/tokens";
import { ENTER, MOVE, SETTLE, prog, lerp } from "../../shared/easing";
import { cardStyle, font } from "../../shared/ui/ui";
import { Abs, DocCard, Keyword, ProgressStrip, Stage, Tag, Thumb, Waveform, appear, settleIn } from "../../shared/ui/kit";
import { BASE_POSE, Stickman, mixPose, type Pose } from "../../shared/rig/Stickman";
import { MemoryPanel } from "../../shared/sets/MemoryPanel";
import { MemorySummer } from "../../example-film/shots/memories";
import { CAFE, CafeScene, milaDefault, noahDefault, talkMouth } from "../../example-film/CafeScene";
import { TL, segWords } from "../timeline";
import type { ShotComp } from "../types";

// ---------- 11 ----------
const EFN5 = ["On Monday, you're back at the café.", "Mila is telling you about her week.", "But you're somewhere else.", "A Tuesday, three summers ago... this same table.", "Same laugh. Then two taps on the table.", "Noah... are you even here?"];
export const S11A: ShotComp = ({ l }) => (
  <Stage>
    <ProgressStrip active={4} l={l} />
    <DocCard l={l} x={260} y={150} w={1400} title="Example film · one long paragraph" tag={<Tag kind="real" size={24}>Script excerpt</Tag>} size={40} lines={EFN5.map((t, i) => ({ text: t, hl: i < 2 ? 14 + i * 6 : undefined, dim: i >= 2 }))} />
    <Keyword l={l} at={30} text="From text to beats" y={830} size={52} underline={false} />
  </Stage>
);

const fmt = (f: number) => (f / 30).toFixed(1);
const efnWords = () => segWords("EFN-05");
const beatRange = (startWord: number, endWord: number) => {
  const w = efnWords();
  return [w[startWord]?.f ?? 0, w[endWord]?.fe ?? 0];
};
// word indices in EFN-05 for the three beats
const BEATS = [
  { r: beatRange(0, 5), spoken: "On Monday, you're back at the café.", action: "Wide: Noah and Mila at the table" },
  { r: beatRange(16, 23), spoken: "A Tuesday, three summers ago… this same table.", action: "Memory panel: the same table, years ago" },
  { r: beatRange(26, 31), spoken: "Then two taps on the table.", action: "Close: Mila taps twice" },
];
const BeatThumb: React.FC<{ i: number }> = ({ i }) => {
  if (i === 0) return <Thumb w={240}><CafeScene f={0} /></Thumb>;
  if (i === 1) return <Thumb w={240}><svg width={1920} height={1080} viewBox="0 0 320 180"><MemorySummer /></svg></Thumb>;
  return <Thumb w={240}><CafeScene f={0} cam={{ s: 3, cx: 800, cy: 620 }} /></Thumb>;
};
const SceneTable: React.FC<{ l: number; rows: number; newAt?: number }> = ({ l, rows, newAt = 0 }) => (
  <div style={{ position: "absolute", left: 110, top: 150, width: 1700, padding: "30px 36px", boxSizing: "border-box", ...cardStyle(24), ...settleIn(l) }}>
    <div style={{ display: "flex", gap: 14, marginBottom: 14 }}><Tag kind="draft" size={22}>Times provisional · example-film audio not recorded yet</Tag></div>
    <div style={{ display: "grid", gridTemplateColumns: "130px 130px 560px 560px 260px", ...font(FONT.title, 30, UI.muted), paddingBottom: 12, borderBottom: "3px solid rgba(22,32,42,0.12)" }}>
      <span>Start</span><span>End</span><span>Spoken beat</span><span>Visible action</span><span />
    </div>
    {BEATS.slice(0, rows).map((b, i) => (
      <div key={i} style={{ display: "grid", gridTemplateColumns: "130px 130px 560px 560px 260px", alignItems: "center", padding: "18px 0", ...font(FONT.body, 32), borderBottom: "2px solid rgba(22,32,42,0.08)", ...(i === rows - 1 ? appear(l, newAt, 10, 16) : {}) }}>
        <span>{fmt(b.r[0])} s</span><span>{fmt(b.r[1])} s</span><span>{b.spoken}</span><span>{b.action}</span><BeatThumb i={i} />
      </div>
    ))}
  </div>
);
export const S11B: ShotComp = ({ l }) => (<Stage><SceneTable l={l} rows={1} newAt={8} /><Keyword l={l} at={40} text="One idea per beat" y={900} size={46} underline={false} /></Stage>);
export const S11C: ShotComp = ({ l }) => (<Stage><SceneTable l={l} rows={2} newAt={6} /><Keyword l={l} at={30} text="A new action" y={900} size={46} underline={false} /></Stage>);
export const S11D: ShotComp = ({ l }) => (<Stage><SceneTable l={l} rows={3} newAt={6} /><Keyword l={l} at={30} text="Speech → visible action" y={900} size={46} underline={false} /></Stage>);
export const S11E: ShotComp = ({ l, d }) => {
  const w = efnWords();
  const total = (w[w.length - 1]?.fe ?? 600) + 10;
  const X = 160, W = 1600;
  const px = (f: number) => X + (f / total) * W;
  const head = lerp(0, total, prog(l, 20, d - 20, (t) => t));
  return (
    <Stage>
      <Waveform words={w} x={X} y={560} w={W} h={110} frames={total} playhead={head} label="Example-film narration lane · audio pending (estimated word timing)" />
      {BEATS.map((b, i) => (
        <div key={i} style={{ position: "absolute", left: px(b.r[0]), top: 330, width: Math.max(160, px(b.r[1]) - px(b.r[0])), height: 150, borderRadius: 16, background: i % 2 ? "#E8EBFF" : "#FFFDF8", border: `3px solid ${UI.cobalt}`, boxSizing: "border-box", padding: 16, ...font(FONT.title, 26), ...appear(l, 4 + i * 4, 10) }}>{b.action}</div>
      ))}
      {[0, ...BEATS.map((b) => b.r[1])].map((f, i) => <div key={i} style={{ position: "absolute", left: px(f) - 2, top: 300, width: 4, height: 400, background: "rgba(22,32,42,0.25)" }} />)}
      <Keyword l={l} at={30} text="Sentences can cross cuts" y={820} size={48} underline={false} />
    </Stage>
  );
};

// ---------- 12 ----------
const SHEET = { x: 960, y: 640, H: 640 };
const stand = (o: Partial<Pose> = {}): Pose => ({ ...BASE_POSE, lean: 0, faceTurn: 0.45, smile: 0.35, near: { fk: { shoulder: 8, elbow: 12 } }, far: { fk: { shoulder: 5, elbow: 10 } }, ...o });
const SheetBg: React.FC = () => (
  <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
    {Array.from({ length: 24 }, (_, i) => <line key={i} x1={i * 80} y1={0} x2={i * 80} y2={1080} stroke="rgba(22,32,42,0.05)" strokeWidth={2} />)}
    {Array.from({ length: 14 }, (_, i) => <line key={`h${i}`} x1={0} y1={i * 80} x2={1920} y2={i * 80} stroke="rgba(22,32,42,0.05)" strokeWidth={2} />)}
    <line x1={500} y1={SHEET.y + 0.44 * SHEET.H + 8} x2={1420} y2={SHEET.y + 0.44 * SHEET.H + 8} stroke="rgba(22,32,42,0.2)" strokeWidth={3} />
  </svg>
);
export const S12A: ShotComp = ({ l }) => (
  <Stage>
    <ProgressStrip active={5} l={l} />
    <SheetBg />
    <svg style={{ position: "absolute", left: 0, top: 0, ...settleIn(l) }} width={1920} height={1080}>
      <Stickman at={{ x: SHEET.x, y: SHEET.y - 120, H: SHEET.H, facing: 1 }} pose={stand()} outfit="noah" legs="standing" />
    </svg>
    <Keyword l={l} at={10} text="Meet Noah" x={1220} y={300} size={56} center={false} />
  </Stage>
);
export const S12B: ShotComp = ({ l, cue }) => {
  const at = [cue("terracotta", 1, 20), cue("proportions", 1, 45), cue("notebook", 1, 70)];
  const Y = SHEET.y - 120, H = SHEET.H;
  const head = { x: SHEET.x, y: Y - (RIG.spine + 0.135) * H };
  const callouts = [
    { label: "Terracotta jacket", tx: SHEET.x + 30, ty: Y - 0.15 * H, lx: 1280, ly: 470 },
    { label: "Head = 0.26 × height", tx: head.x + 70, ty: head.y, lx: 1280, ly: 250 },
    { label: "Blue notebook", tx: SHEET.x - 120, ty: Y - 0.05 * H, lx: 300, ly: 600 },
  ];
  return (
    <Stage>
      <SheetBg />
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <Stickman at={{ x: SHEET.x, y: Y, H, facing: 1 }} pose={stand({ far: { fk: { shoulder: -18, elbow: -60 } } })} outfit="noah" legs="standing" />
        <g transform={`translate(${SHEET.x - 175} ${Y - 0.11 * H})`}>
          <rect width={RIG.notebookW * H} height={RIG.notebookD * H * 0.9} rx={6} fill={FILM.notebook} stroke={FILM.ink} strokeWidth={5} />
          <rect x={RIG.notebookW * H * 0.72} width={RIG.notebookW * H * 0.07} height={RIG.notebookD * H * 0.9} fill={FILM.shirt} />
        </g>
        {callouts.map((c, i) => (
          <g key={i} opacity={prog(l, at[i], at[i] + 8, ENTER)}>
            <line x1={c.tx} y1={c.ty} x2={c.lx + (c.lx > 960 ? -10 : 330)} y2={c.ly + 26} stroke={UI.cobalt} strokeWidth={5} strokeLinecap="round" />
            <circle cx={c.tx} cy={c.ty} r={9} fill={UI.cobalt} />
          </g>
        ))}
      </svg>
      {callouts.map((c, i) => (
        <Abs key={i} x={c.lx} y={c.ly} style={appear(l, at[i], 10)}><Tag kind="info" size={30}>{c.label}</Tag></Abs>
      ))}
      <Keyword l={l} at={at[0]} text="Keep these consistent" y={930} size={46} underline={false} />
    </Stage>
  );
};
export const S12C: ShotComp = ({ l, cue }) => {
  const s = cue("new", 1, 40);
  const ant = prog(l, s - 8, s - 2, ENTER);
  const go = prog(l, s - 2, s + 16, SETTLE);
  const pose = mixPose(stand({ near: { fk: { shoulder: 8 - 6 * ant, elbow: 12 + 10 * ant } } }), stand({ faceTurn: 0.75, smile: 0.5, gazeX: 0.6, near: { fk: { shoulder: 100, elbow: -8 } } }), go);
  const parts = prog(l, 10, 16, ENTER) * (1 - prog(l, 36, 44, MOVE));
  return (
    <Stage>
      <SheetBg />
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <Stickman at={{ x: SHEET.x - 120, y: SHEET.y - 120, H: SHEET.H, facing: 1 }} pose={pose} outfit="noah" legs="standing" />
        <circle cx={SHEET.x - 120} cy={SHEET.y - 120 - 0.435 * SHEET.H} r={0.13 * SHEET.H + 14} fill="none" stroke={UI.cobalt} strokeWidth={4} strokeDasharray="10 8" opacity={parts * 0.7} />
        <rect x={SHEET.x - 120 - 0.08 * SHEET.H} y={SHEET.y - 120 - 0.32 * SHEET.H} width={0.16 * SHEET.H} height={0.36 * SHEET.H} rx={20} fill="none" stroke={UI.cobalt} strokeWidth={4} strokeDasharray="10 8" opacity={parts * 0.7} />
      </svg>
      <Keyword l={l} at={10} text="Same design · New action" x={1180} y={320} size={48} center={false} underline={false} />
    </Stage>
  );
};
export const S12D: ShotComp = ({ l }) => {
  const t = prog(l, 4, 18, SETTLE);
  const pose = mixPose(stand(), stand({ faceTurn: 0.6, brow: 18, smile: -0.45, gazeY: 0.3, lean: -2, headTilt: 6, near: { fk: { shoulder: 4, elbow: 30 } }, far: { fk: { shoulder: 4, elbow: 26 } } }), t);
  return (
    <Stage>
      <SheetBg />
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <Stickman at={{ x: SHEET.x, y: SHEET.y - 120, H: SHEET.H, facing: 1 }} pose={pose} outfit="noah" legs="standing" />
      </svg>
      <Keyword l={l} at={12} text="Expression changes" x={1240} y={320} size={48} center={false} underline={false} />
      <Keyword l={l} at={22} text="Design doesn't" x={1240} y={400} size={48} center={false} underline={false} color={UI.cobalt} />
    </Stage>
  );
};
export const S12E: ShotComp = ({ l }) => {
  const bars = prog(l, 20, 30, ENTER) * (1 - prog(l, 80, 90, MOVE));
  const top = (x: number, H: number) => ({ x, top: CAFE.mila.y - (RIG.spine + 0.135 + RIG.headR) * H });
  const m = top(CAFE.mila.x, CAFE.mila.H), n = top(CAFE.noah.x, CAFE.noah.H);
  return (
    <>
      <CafeScene f={l} noah={{ ...noahDefault(), gazeX: 0.7 }} mila={{ ...milaDefault(), mouthOpen: talkMouth(l, 0.3) }} over={
        <g opacity={bars}>
          {[m, n].map((p, i) => <line key={i} x1={p.x + (i ? 110 : -110)} y1={p.top} x2={p.x + (i ? 110 : -110)} y2={CAFE.mila.y} stroke={UI.cobalt} strokeWidth={5} strokeDasharray="10 8" />)}
          <text x={CAFE.mila.x - 210} y={CAFE.mila.y - 150} style={{ fontFamily: FONT.family, fontWeight: 900, fontSize: 30, fill: UI.cobalt }}>0.96 H</text>
          <text x={CAFE.noah.x + 130} y={CAFE.noah.y - 150} style={{ fontFamily: FONT.family, fontWeight: 900, fontSize: 30, fill: UI.cobalt }}>1 H</text>
        </g>
      } />
      <Keyword l={l} at={40} text="Characters ready" x={100} y={70} center={false} size={40} underline={false} plate />
    </>
  );
};

// ---------- 13 ----------
export const S13A: ShotComp = ({ l }) => (
  <>
    <CafeScene f={l} noah={null} mila={null} />
    <Abs x={100} y={70} style={appear(l, 6, 10)}><Tag kind="info" size={28}>Build the place</Tag></Abs>
  </>
);
export const S13B: ShotComp = ({ l }) => (
  <>
    <CafeScene f={l + 200} cam={{ s: 1.9, cx: 520, cy: 380 }} noah={null} mila={null} />
    <Abs x={100} y={70} style={appear(l, 6, 10)}><Tag kind="info" size={28}>Background · windows, wall, sky</Tag></Abs>
  </>
);
export const S13C: ShotComp = ({ l, cue }) => {
  const c = cue("characters", 1, 40);
  const o = prog(l, c, c + 8, (t) => t);
  return (
    <>
      <CafeScene f={l} cam={{ s: 1.25, cx: 960, cy: 600 }} noah={o > 0 ? noahDefault() : null} mila={o > 0 ? milaDefault() : null} showPlant={false} layerOpacity={[1, 0.5, 1, 1]} />
      <Abs x={100} y={70} style={appear(l, 6, 10)}><Tag kind="info" size={28}>Action layer · table, chairs, characters</Tag></Abs>
    </>
  );
};
export const S13D: ShotComp = ({ l, d, cue }) => {
  const c = cue("camera", 1, 40);
  const tr = lerp(0, 160, prog(l, c, c + 60, MOVE));
  return (
    <>
      <CafeScene f={l} cam={{ s: 1.15, cx: 760, cy: 560, truck: tr }} />
      <Abs x={100} y={70} style={appear(l, 6, 10)}><Tag kind="info" size={28}>Foreground · moves {Math.round(1.4 * 100)}% · background 20%</Tag></Abs>
      <Keyword l={l} at={Math.min(d - 30, c + 66)} text="Near moves more than far" x={100} y={140} center={false} size={40} underline={false} plate />
    </>
  );
};
export const S13E: ShotComp = ({ l }) => {
  const p = prog(l, 20, 32, ENTER);
  return (
    <>
      <CafeScene f={l} over={
        <g opacity={p} style={{ transformOrigin: "1540px 260px", scale: String(0.92 + 0.08 * p) }}>
          <MemoryPanel x={1360} y={150} w={360} h={225} id="c13e" stroke={4}><MemorySummer /></MemoryPanel>
        </g>
      } />
      <Abs x={100} y={70} style={appear(l, 6, 10)}><Tag kind="done" size={28}>One consistent world</Tag></Abs>
    </>
  );
};
export const _seqC = { TL, MOVE, lerp };
