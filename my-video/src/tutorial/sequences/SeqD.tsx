// Sequences 14–17: meaningful action, sync, sound, review & fix.
import React from "react";
import { FONT, UI, FILM } from "../../shared/tokens";
import { ENTER, MOVE, prog, lerp } from "../../shared/easing";
import { font } from "../../shared/ui/ui";
import { Abs, DocCard, Keyword, MarkerRing, MONO, ProgressStrip, Stage, Tag, Thumb, Waveform, appear, settleIn } from "../../shared/ui/kit";
import { coverGripPoint } from "../../shared/props/Notebook";
import { CAFE, nbGeo } from "../../example-film/CafeScene";
import { beatsFrom } from "../../example-film/actions";
import { Shot01C_MemoryReveal } from "../../example-film/shots/Shot01C_MemoryReveal";
import { ReachClip } from "./SeqA";
import { PEAKS, segWords } from "../timeline";
import type { ShotComp, ShotProps } from "../types";

const CLOSE_CAM = { s: 3.0, cx: 1120, cy: 625 };
const BEAT_NAMES = ["Notice", "Reach", "Touch", "Open", "React"];

/** Action start frame for a shot: after the spoken list in 14B, or a fixed lead elsewhere. */
export const actionStart = (p: ShotProps) => {
  if (p.shot.id === "14B") return p.cue("react", 1, 60) + 18;
  if (p.shot.id === "14E") return Math.max(4, p.cue("open", 1, 40) - 64); // contact+open lands on the word "open"
  return 6;
};

const BeatRow: React.FC<{ l: number; start: number; y?: number }> = ({ l, start, y = 900 }) => {
  const b = beatsFrom(start);
  const marks = [b.notice, b.reach, b.contact, b.open, b.react];
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex", justifyContent: "center", gap: 18 }}>
      {BEAT_NAMES.map((n, i) => {
        const on = l >= marks[i] && (i === 4 || l < marks[i + 1]);
        return <div key={n} style={{ padding: "12px 26px", borderRadius: 999, ...font(FONT.title, 32, on ? "#fff" : UI.charcoal), background: on ? UI.cobalt : UI.card, border: `3px solid ${on ? UI.cobalt : "rgba(22,32,42,0.15)"}` }}>{n}</div>;
      })}
    </div>
  );
};

// ---------- 14 ----------
export const S14A: ShotComp = ({ l }) => (
  <Stage bg={FILM.wall}>
    <ReachClip f={0} cam={{ s: 1.25, cx: 1060, cy: 560 }} start={9999} />
    <ProgressStrip active={6} l={l} />
    <Keyword l={l} at={10} text="Notice → Reach → Open" y={920} size={46} underline={false} />
  </Stage>
);
export const S14B: ShotComp = (p) => {
  const st = actionStart(p);
  return (
    <Stage>
      <Abs x={70} y={150}><Thumb w={880}><ReachClip f={p.l} start={st} cam={{ s: 1.25, cx: 1060, cy: 560 }} /></Thumb></Abs>
      <Abs x={970} y={150}><Thumb w={880}><ReachClip f={p.l} start={st} cam={CLOSE_CAM} /></Thumb></Abs>
      <Abs x={70} y={665}><Tag kind="info" size={24}>Wide</Tag></Abs>
      <Abs x={970} y={665}><Tag kind="info" size={24}>Close · same frames</Tag></Abs>
      <BeatRow l={p.l} start={st} y={780} />
    </Stage>
  );
};
export const S14C: ShotComp = ({ l }) => {
  // replay up to contact, hold 30 f with a ring on the anchor, then continue
  const contact = 60;
  const f = l < 40 ? l + 20 : l < 70 ? contact : l - 10;
  const g = coverGripPoint({ ...nbGeo, open: 0 });
  const sx = 960 + (g.x - CLOSE_CAM.cx) * CLOSE_CAM.s, sy = 540 + (g.y - CLOSE_CAM.cy) * CLOSE_CAM.s;
  return (
    <Stage bg={FILM.wall}>
      <ReachClip f={f} start={0} cam={CLOSE_CAM} />
      {l >= 40 ? <MarkerRing l={l} at={40} x={sx - 50} y={sy - 50} w={100} h={100} seed="contact" /> : null}
      <Keyword l={l} at={44} text="Contact matters" y={920} size={50} underline={false} />
    </Stage>
  );
};
export const S14D: ShotComp = ({ l }) => {
  const b = beatsFrom(0);
  const stills = [
    { f: b.anticipate + 10, t: "Anticipate" },
    { f: b.contact, t: "Contact" },
    { f: b.react + 12, t: "Settle" },
  ];
  return (
    <Stage>
      <div style={{ position: "absolute", left: 110, top: 220, display: "flex", gap: 40 }}>
        {stills.map((s, i) => (
          <div key={i} style={appear(l, 4 + i * 4, 10)}>
            <Thumb w={540}><ReachClip f={s.f} start={0} cam={{ s: 2.2, cx: 1150, cy: 580 }} /></Thumb>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
              <span style={{ ...font(FONT.title, 40) }}>{s.t}</span>
              <span style={{ fontFamily: MONO, fontSize: 30, color: UI.muted }}>frame {s.f}</span>
            </div>
          </div>
        ))}
      </div>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <line x1={110} y1={680} x2={1810} y2={680} stroke="rgba(22,32,42,0.2)" strokeWidth={6} strokeLinecap="round" />
        {stills.map((s, i) => <circle key={i} cx={110 + (s.f / 130) * 1700} cy={680} r={14} fill={UI.cobalt} opacity={prog(l, 10 + i * 4, 16 + i * 4, ENTER)} />)}
      </svg>
      <Keyword l={l} at={20} text="Anticipate · Contact · Settle" y={800} size={50} underline={false} />
    </Stage>
  );
};
export const S14E: ShotComp = (p) => (
  <Stage bg={FILM.wall}>
    <ReachClip f={p.l} start={actionStart(p)} cam={{ s: 1.25, cx: 1060, cy: 560 }} />
    <Abs x={100} y={70}><Tag kind="info" size={26}>Example film · “That night, you open the notebook…”</Tag></Abs>
  </Stage>
);

// ---------- 15 ----------
const EFN4 = () => segWords("EFN-04");
const efn4Open = () => EFN4().find((w) => w.w.toLowerCase().startsWith("open"))?.f ?? 30;
/** Teaching demo: draft opens EARLY frames before its spoken cue; revised lands on it. */
export const DRAFT_EARLY = 26;
const playAt = (p: ShotProps) => p.cue("that", 1, 40);
const Lanes: React.FC<{ l: number; start: number; early: number; zoom?: boolean }> = ({ l, start, early, zoom }) => {
  const w = EFN4();
  const total = (w[w.length - 1]?.fe ?? 80) + 30;
  const X = 260, W = 1400;
  const px = (f: number) => X + (f / total) * W;
  const openF = efn4Open();
  const actionAt = openF - 64 - early; // contact+open frame relative to the line
  const head = l - start;
  return (
    <>
      {["Voice", "Action", "Text"].map((n, i) => <Abs key={n} x={110} y={690 + i * 90} style={{ ...font(FONT.title, 30) }}>{n}</Abs>)}
      <Waveform words={w} x={X} y={680} w={W} h={66} frames={total} playhead={Math.max(0, Math.min(total, head))} />
      <div style={{ position: "absolute", left: px(actionAt + 60), top: 778, width: px(actionAt + 96) - px(actionAt + 60), height: 56, borderRadius: 12, background: early ? UI.amber : UI.mint, ...font(FONT.title, 24), display: "flex", alignItems: "center", justifyContent: "center" }}>open</div>
      <div style={{ position: "absolute", left: px(0), top: 868, width: W * 0.9, height: 50, borderRadius: 12, background: "#E8EBFF", ...font(FONT.body, 24), paddingLeft: 16, display: "flex", alignItems: "center" }}>That night, you open the notebook one last time.</div>
      <div style={{ position: "absolute", left: px(openF) - 3, top: zoom ? 650 : 670, width: 6, height: zoom ? 290 : 260, background: UI.cobalt, borderRadius: 3 }} />
      <Abs x={px(openF) - 40} y={zoom ? 610 : 630}><Tag kind="info" size={20}>cue</Tag></Abs>
      <Abs x={1700} y={690}><Tag kind="missing" size={18}>voice audio pending</Tag></Abs>
    </>
  );
};
const Preview: React.FC<{ l: number; start: number; early: number; label: React.ReactNode }> = ({ l, start, early, label }) => (
  <>
    <Abs x={460} y={70}><Thumb w={1000}><ReachClip f={l - start} start={efn4Open() - 64 - early} cam={{ s: 1.4, cx: 1080, cy: 580 }} /></Thumb></Abs>
    <Abs x={480} y={92}>{label}</Abs>
  </>
);
export const S15A: ShotComp = (p) => {
  const st = playAt(p);
  return (<Stage><Preview l={p.l} start={st} early={DRAFT_EARLY} label={<Tag kind="fix" size={24}>DRAFT · timing demo</Tag>} /><Lanes l={p.l} start={st} early={DRAFT_EARLY} /></Stage>);
};
export const S15B: ShotComp = ({ l }) => (
  <Stage>
    <div style={{ position: "absolute", left: 0, top: -500, width: 1920, height: 1580, scale: "1.35", transformOrigin: "960px 1300px" }}>
      <Lanes l={l} start={-9999} early={DRAFT_EARLY} zoom />
    </div>
    <Keyword l={l} at={10} text="Find the spoken cue" y={160} size={56} />
  </Stage>
);
export const S15C: ShotComp = ({ l }) => (
  <Stage>
    <div style={{ position: "absolute", left: 200, top: 170, width: 1520, padding: "40px 48px", boxSizing: "border-box", background: "#141A21", borderRadius: 20, ...settleIn(l) }}>
      <div style={{ ...font(FONT.body, 26, "#9AA6B2"), marginBottom: 20 }}>src/tutorial/sequences/SeqD.tsx · the real edit</div>
      <div style={{ fontFamily: MONO, fontSize: 38, lineHeight: 1.7 }}>
        <div style={{ color: "#F7A4A4", background: "rgba(242,107,91,0.14)", padding: "0 14px", opacity: lerp(1, 0.5, prog(l, 30, 40, MOVE)) }}>- &lt;ReachClip start=&#123;cue - 64 - {DRAFT_EARLY}&#125; /&gt;</div>
        <div style={{ color: "#9EF0C6", background: "rgba(62,207,142,0.14)", padding: "0 14px", ...appear(l, 24, 10) }}>+ &lt;ReachClip start=&#123;cue - 64&#125; /&gt;</div>
      </div>
    </div>
    <Abs x={200} y={560} style={appear(l, 40, 10)}><Tag kind="done" size={30}>Contact now lands on the word “open” · audio unchanged</Tag></Abs>
    <Keyword l={l} at={10} text="Move the action" y={800} size={54} />
  </Stage>
);
export const S15D: ShotComp = (p) => {
  const st = playAt(p);
  return (<Stage><Preview l={p.l} start={st} early={0} label={<Tag kind="done" size={24}>REVISED</Tag>} /><Lanes l={p.l} start={st} early={0} /></Stage>);
};
export const S15E: ShotComp = ({ l }) => {
  const at = 64; // same frame of the line for both
  return (
    <Stage>
      {[{ e: DRAFT_EARLY, t: "Draft", k: "fix" as const }, { e: 0, t: "Revised", k: "done" as const }].map((v, i) => (
        <Abs key={i} x={110 + i * 870} y={200} style={appear(l, 4 + i * 4, 10)}>
          <Thumb w={830}><ReachClip f={at} start={-v.e} cam={{ s: 2.4, cx: 1130, cy: 590 }} /></Thumb>
          <div style={{ marginTop: 18 }}><Tag kind={v.k} size={32}>{v.t} · same audio frame</Tag></div>
        </Abs>
      ))}
      <Keyword l={l} at={20} text="Same audio · better alignment" y={820} size={52} underline={false} />
    </Stage>
  );
};

// ---------- 16 ----------
const LANES = ["Voice", "Ambience", "Effects", "Music"];
const Mixer: React.FC<{ l: number; active: number[]; duck?: boolean; playAtL?: number }> = ({ l, active, duck, playAtL }) => (
  <>
    <Abs x={560} y={60}><Thumb w={800}><ReachClip f={((l % 140) + 140) % 140} start={0} cam={{ s: 1.3, cx: 1060, cy: 570 }} /></Thumb></Abs>
    {LANES.map((n, i) => {
      const on = active.includes(i);
      return (
        <div key={n} style={{ position: "absolute", left: 160, top: 540 + i * 108, width: 1600, height: 86, borderRadius: 16, background: on ? "#FFFDF8" : "rgba(255,253,248,0.5)", border: `3px solid ${on ? UI.cobalt : "rgba(22,32,42,0.12)"}`, display: "flex", alignItems: "center", gap: 24, paddingLeft: 24, boxSizing: "border-box" }}>
          <span style={{ ...font(FONT.title, 32, on ? UI.charcoal : UI.muted), width: 200 }}>{n}</span>
          {i === 0 ? <div style={{ position: "relative", width: 1300, height: 60 }}><Waveform peaks={PEAKS.TEST} x={0} y={0} w={420} h={60} frames={(PEAKS.TEST ?? []).length || 80} playhead={playAtL !== undefined ? Math.max(0, l - playAtL) : undefined} color={on ? UI.cobalt : "#A9B0BA"} /></div> : null}
          {i === 1 ? <span style={{ ...font(FONT.body, 26, UI.muted) }}>café room tone · placeholder (procedural)</span> : null}
          {i === 2 ? <span style={{ ...font(FONT.body, 26, UI.muted) }}>paper · at the contact frame · placeholder</span> : null}
          {i === 3 ? (
            <svg width={1300} height={60}><path d={duck ? "M0 14 H300 L330 44 H760 L790 14 H1300" : "M0 30 H1300"} fill="none" stroke={on ? UI.cobalt : "#A9B0BA"} strokeWidth={6} strokeLinejoin="round" /><text x={820} y={54} style={{ fontFamily: FONT.family, fontSize: 22, fontWeight: 700, fill: UI.muted }}>{duck ? "dips under speech" : "procedural placeholder"}</text></svg>
          ) : null}
        </div>
      );
    })}
  </>
);
const testPlay = (p: ShotProps) => p.cue("this", 1, 9999);
export const S16A: ShotComp = (p) => (<Stage><ProgressStrip active={7} l={p.l} /><Mixer l={p.l} active={[0]} playAtL={testPlay(p)} /></Stage>);
export const S16B: ShotComp = ({ l }) => (<Stage><Mixer l={l} active={[0, 1]} /></Stage>);
export const S16C: ShotComp = ({ l }) => (<Stage><Mixer l={l} active={[0, 1, 2]} /></Stage>);
export const S16D: ShotComp = ({ l }) => (<Stage><Mixer l={l} active={[0, 1, 2, 3]} duck /></Stage>);
export const S16E: ShotComp = (p) => (<Stage><Mixer l={p.l} active={[0, 1, 2, 3]} duck playAtL={testPlay(p)} /><Abs x={160} y={980}><Tag kind="info" size={22}>Voice stays loudest · checked with a loudness meter on the export</Tag></Abs></Stage>);

// ---------- 17 ----------
const DraftFrame: React.FC<{ legacy: boolean; w: number; crop?: boolean }> = ({ legacy, w, crop }) => (
  <Thumb w={w}>
    <div style={{ width: 1920, height: 1080, ...(crop ? { scale: "2.2", transformOrigin: "1260px 1000px" } : {}) }}>
      <Shot01C_MemoryReveal f={100} legacyLayering={legacy} />
    </div>
  </Thumb>
);
export const S17A: ShotComp = ({ l }) => (
  <Stage>
    <ProgressStrip active={8} l={l} />
    <Abs x={260} y={130}><DraftFrame legacy w={1400} /></Abs>
    <Abs x={280} y={150}><Tag kind="draft" size={26}>Draft · shot 01C, frame 100</Tag></Abs>
    <Abs x={260} y={940}><Tag kind="info" size={24}>Reproduced from the prototype's original draw order</Tag></Abs>
  </Stage>
);
export const S17B: ShotComp = ({ l, cue }) => {
  const at = cue("legs", 1, 30);
  return (
    <Stage>
      <Abs x={260} y={130}><DraftFrame legacy crop w={1400} /></Abs>
      <MarkerRing l={l} at={at} x={560} y={560} w={800} h={260} color={UI.amber} seed="legs" />
      <Abs x={260} y={940} style={appear(l, at + 8, 10)}><Tag kind="fix" size={30}>Legs drawn in front of the table edge</Tag></Abs>
    </Stage>
  );
};
export const S17C: ShotComp = ({ l }) => (
  <Stage>
    <DocCard l={l} x={200} y={150} w={1520} title="The correction prompt" tag={<Tag kind="real" size={24}>The instruction used in this project</Tag>} size={38} lines={[
      { text: "Problem: in 01C Noah's legs are drawn in front of the table, not under it.", hl: 12 },
      { text: "Should: body behind the table; the arm holding the notebook stays in front.", hl: 30 },
      { text: "Keep: design, pose, camera, timing and every other shot unchanged.", hl: 48 },
      { text: "Fix it in the shared character component, not as a one-shot patch.", hl: 66 },
    ]} />
  </Stage>
);
export const S17D: ShotComp = ({ l }) => (
  <Stage>
    <div style={{ position: "absolute", left: 160, top: 140, width: 1600, padding: "34px 44px", boxSizing: "border-box", background: "#141A21", borderRadius: 20, ...settleIn(l) }}>
      <div style={{ ...font(FONT.body, 26, "#9AA6B2"), marginBottom: 16 }}>Stickman gets a “parts” option · 01C draws it in two layers</div>
      <div style={{ fontFamily: MONO, fontSize: 32, lineHeight: 1.6 }}>
        <div style={{ color: "#F7A4A4" }}>- &lt;CafeTable /&gt; &lt;Notebook /&gt; &lt;Stickman /&gt;</div>
        <div style={{ color: "#9EF0C6", ...appear(l, 14, 8) }}>+ &lt;Stickman parts="body" /&gt;</div>
        <div style={{ color: "#9EF0C6", ...appear(l, 20, 8) }}>+ &lt;CafeTable /&gt; &lt;Notebook /&gt;</div>
        <div style={{ color: "#9EF0C6", ...appear(l, 26, 8) }}>+ &lt;Stickman parts="nearArm" /&gt;</div>
      </div>
    </div>
    <Abs x={160} y={600} style={appear(l, 36, 10)}><Tag kind="info" size={28}>Re-render of the shot · cut across the wait</Tag></Abs>
  </Stage>
);
export const S17E: ShotComp = ({ l }) => (
  <Stage>
    <Abs x={260} y={130}><DraftFrame legacy={false} w={1400} /></Abs>
    <Abs x={280} y={150}><Tag kind="done" size={26}>Revised · shot 01C, frame 100</Tag></Abs>
    <Keyword l={l} at={30} text="Same shot · same timing" y={950} size={46} underline={false} />
  </Stage>
);
export const S17F: ShotComp = ({ l }) => (
  <Stage>
    {[true, false].map((lg, i) => (
      <Abs key={i} x={110 + i * 870} y={200} style={appear(l, 4 + i * 4, 10)}>
        <DraftFrame legacy={lg} crop w={830} />
        <div style={{ marginTop: 18 }}><Tag kind={lg ? "fix" : "done"} size={30}>{lg ? "Draft" : "Fixed"}</Tag></div>
      </Abs>
    ))}
    <Keyword l={l} at={20} text="Fix the component, every shot improves" y={820} size={48} underline={false} />
  </Stage>
);
export const _seqD = { CAFE, DocCard, ENTER };
