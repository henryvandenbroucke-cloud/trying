// Sequences 01D–05: outcome reveal, promise, references, format, workflow map.
import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { FONT, UI, FILM } from "../../shared/tokens";
import { ENTER, MOVE, SETTLE, prog, lerp, tween } from "../../shared/easing";
import { Pill, cardStyle, font, DocIcon } from "../../shared/ui/ui";
import { Abs, Keyword, MarkerRing, Stage, Tag, Thumb, appear, settleIn, Icon, ROUTE, RouteNode, Waveform, vanish } from "../../shared/ui/kit";
import { BASE_POSE, Stickman, mixPose, toLocal, type Pose } from "../../shared/rig/Stickman";
import { MemoryPanel } from "../../shared/sets/MemoryPanel";
import { MemorySummer } from "../../example-film/shots/memories";
import { CAFE, CafeScene, milaDefault, noahDefault, nbGeo, talkMouth } from "../../example-film/CafeScene";
import { beatsFrom, reachState } from "../../example-film/actions";
import { Shot01A_CafeWide } from "../../example-film/shots/Shot01A_CafeWide";
import { Shot01B_NotebookClose } from "../../example-film/shots/Shot01B_NotebookClose";
import { Shot01C_MemoryReveal } from "../../example-film/shots/Shot01C_MemoryReveal";
import { PEAKS, TL } from "../timeline";
import type { ShotComp } from "../types";

export const PLAYER = { scale: 0.62, x: (1920 - 1920 * 0.62) / 2, y: 150 };
const SCRIPT_LINES = ["Your name is Noah.", "And you remember... every single day.", "You can relive any day you have lived.", "You can't change it."];

/** Noah reaching for the notebook in the wide café, at local frame f (reusable clip). */
export const ReachClip: React.FC<{ f: number; cam?: { s: number; cx: number; cy: number }; start?: number; early?: number }> = ({ f, cam, start = 0, early = 0 }) => {
  const b = beatsFrom(start - early);
  const st = reachState(f, b, nbGeo, CAFE.noahLapRest, 55, 18);
  const base = noahDefault();
  const look: Pose = { ...base, headTilt: lerp(-2, 14, st.head), gazeX: lerp(0.6, 0.3, st.look), gazeY: lerp(-0.1, 0.8, st.look), lean: 3 + st.lean, smile: lerp(0.25, 0.55, st.react), near: { ik: toLocal(st.target, CAFE.noah) } };
  return <CafeScene f={f} cam={cam} noah={look} mila={{ ...milaDefault(), mouthOpen: 0, gazeX: 0.6 }} notebookOpen={st.open} />;
};

// ---------- 01D ----------
export const S01D: ShotComp = ({ l, d, shot }) => {
  const cut = Math.max(50, Math.min(d - 40, (TL.marks["01D.cut"] ?? shot.from + 60) - shot.from));
  const pull = prog(l, 0, 30, MOVE);
  const sc = lerp(1, PLAYER.scale, pull);
  if (l < cut) {
    const chrome = prog(l, 18, 30, ENTER);
    return (
      <Stage>
        <div style={{ position: "absolute", left: lerp(0, PLAYER.x, pull), top: lerp(0, PLAYER.y, pull), width: 1920 * sc, height: 1080 * sc, borderRadius: 24 * pull, overflow: "hidden", boxShadow: `0 18px 48px rgba(22,32,42,${0.2 * pull})` }}>
          <div style={{ width: 1920, height: 1080, scale: String(sc), transformOrigin: "0 0" }}>
            <Shot01C_MemoryReveal f={130 + l} />
          </div>
        </div>
        <div style={{ position: "absolute", left: PLAYER.x, top: PLAYER.y + 1080 * PLAYER.scale + 28, width: 1920 * PLAYER.scale, display: "flex", alignItems: "center", gap: 24, opacity: chrome }}>
          <svg width={34} height={38} viewBox="0 0 34 38"><path d="M 4 3 L 31 19 L 4 35 Z" fill={UI.charcoal} stroke={UI.charcoal} strokeWidth={4} strokeLinejoin="round" /></svg>
          <div style={{ flex: 1, height: 10, borderRadius: 99, background: "rgba(22,32,42,0.14)", position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${tween(l, 0, cut, 38, 45, (t) => t)}%`, borderRadius: 99, background: UI.cobalt }} />
          </div>
        </div>
      </Stage>
    );
  }
  const k = l - cut;
  return (
    <Stage>
      <div style={{ position: "absolute", left: 120, top: 110, width: 860, height: 560, padding: "44px 52px", boxSizing: "border-box", ...cardStyle(24), ...settleIn(k) }}>
        <div style={{ display: "flex", gap: 14, marginBottom: 26 }}>
          <Tag kind="real" size={24}>Example-film script · Claude output</Tag>
        </div>
        <div style={{ ...font(FONT.title, 44), marginBottom: 30 }}>What If You Remembered<br />Every Single Day?</div>
        <div style={{ borderLeft: `6px solid ${UI.cobalt}`, paddingLeft: 26 }}>
          {SCRIPT_LINES.map((line, i) => (
            <div key={i} style={{ ...font(FONT.body, 38), lineHeight: 1.45, whiteSpace: "nowrap", ...appear(k, i === 0 ? -10 : 3 + i * 3, 10) }}>{line}</div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", left: 1060, top: 270, ...appear(k, 12, 14) }}>
        <div style={{ ...font(FONT.title, 88), letterSpacing: -1 }}>SCRIPT <span style={{ color: UI.cobalt }}>→</span> VIDEO</div>
        <div style={{ ...font(FONT.body, 38, UI.muted), marginTop: 18, ...appear(k, 18, 10) }}>The scene plan behind the excerpt</div>
      </div>
      <div style={{ position: "absolute", left: 1060, top: 480, display: "flex", gap: 26 }}>
        {[
          { label: "Scene 1 · Notice", el: <Shot01A_CafeWide f={60} /> },
          { label: "Scene 2 · Touch", el: <Shot01B_NotebookClose f={60} /> },
          { label: "Scene 3 · Remember", el: <Shot01C_MemoryReveal f={100} /> },
        ].map((t, i) => (
          <div key={i} style={{ ...appear(k, 24 + i * 3, 12) }}>
            <Thumb w={232}>{t.el}</Thumb>
            <div style={{ ...font(FONT.body, 24), marginTop: 10, whiteSpace: "nowrap" }}>{t.label}</div>
          </div>
        ))}
      </div>
    </Stage>
  );
};

// ---------- 02 ----------
export const S02A: ShotComp = ({ l, cue }) => {
  const t = prog(l, 0, 10, ENTER);
  const at = cue("one", 1, 30);
  return (
    <Stage>
      <Abs x={110} y={420} style={{ opacity: 0.45 }}><DocIcon w={150} /></Abs>
      <div style={{ position: "absolute", left: 300, top: 230, width: 1320, height: 460, boxSizing: "border-box", padding: "64px 80px", ...cardStyle(32), translate: `0px ${(1 - t) * 10}px` }}>
        <Pill tone="cobalt" size={30} style={{ letterSpacing: 3 }}>IDEA</Pill>
        <div style={{ ...font(FONT.title, 80), marginTop: 38, letterSpacing: -1, whiteSpace: "nowrap" }}>What If You Remembered<br />Every Single Day?</div>
      </div>
      <Keyword l={l} at={at} text="One original idea" y={760} size={54} />
    </Stage>
  );
};

export const S02B: ShotComp = ({ l, cue }) => {
  const r = cue("rule", 1, 30);
  return (
    <Stage>
      <div style={{ position: "absolute", left: 360, top: 140, width: 1200, padding: "48px 60px", boxSizing: "border-box", ...cardStyle(24), ...settleIn(l) }}>
        <Tag kind="real" size={24}>Example-film script · excerpt</Tag>
        <div style={{ marginTop: 28 }}>
          {SCRIPT_LINES.map((line, i) => {
            const isRule = i >= 2;
            const h = isRule ? prog(l, r + (i - 2) * 4, r + (i - 2) * 4 + 8, ENTER) : 0;
            return (
              <div key={i} style={{ ...font(FONT.body, 44), lineHeight: 1.5, opacity: isRule ? 1 : lerp(1, 0.45, prog(l, r, r + 8, MOVE)) }}>
                <span style={{ backgroundImage: "linear-gradient(rgba(69,92,245,0.16), rgba(69,92,245,0.16))", backgroundSize: `${h * 100}% 100%`, backgroundRepeat: "no-repeat", borderRadius: 6 }}>{line}</span>
              </div>
            );
          })}
        </div>
      </div>
      <Keyword l={l} at={r + 6} text="A usable story" y={760} size={54} />
    </Stage>
  );
};

export const S02C: ShotComp = ({ l }) => {
  const cam = { s: 2.1, cx: 1150, cy: 560 };
  const loopL = l % 120;
  return (
    <Stage>
      <Abs x={140} y={210}>
        <Tag kind="illustration" size={26}>Storyboard</Tag>
        <div style={{ marginTop: 18, filter: "grayscale(1) contrast(1.15)", opacity: 0.85 }}>
          <Thumb w={760}><ReachClip f={70} cam={cam} /></Thumb>
        </div>
      </Abs>
      <svg style={{ position: "absolute", left: 930, top: 470 }} width={80} height={60}><path d="M6 30 H58 M42 12 L64 30 L42 48" fill="none" stroke={UI.cobalt} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" /></svg>
      <Abs x={1020} y={210}>
        <Tag kind="real" size={26}>Animation</Tag>
        <div style={{ marginTop: 18 }}>
          <Thumb w={760}><ReachClip f={loopL} cam={cam} /></Thumb>
        </div>
      </Abs>
      <Keyword l={l} at={8} text="Scenes that make sense" y={800} size={54} />
    </Stage>
  );
};

export const S02D: ShotComp = ({ l, cue }) => {
  const labels = ["Idea", "Story", "Scenes", "Video"];
  const line = prog(l, 30, 48, MOVE);
  const dot = prog(l, 50, 80, MOVE);
  const stay = cue("stay", 1, 110);
  return (
    <Stage>
      <Abs x={110} y={330}><DocIcon w={170} /></Abs>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <line x1={330} y1={440} x2={330 + 1130 * line} y2={440} stroke={UI.charcoal} strokeWidth={5} strokeLinecap="round" strokeDasharray="2 16" />
        <circle cx={330 + 1130 * dot} cy={440} r={14} fill={UI.cobalt} opacity={dot > 0 && dot < 1 ? 1 : 0} />
      </svg>
      {labels.map((lb, i) => (
        <div key={lb} style={{ position: "absolute", left: 380 + i * 270, top: 360, width: 220, height: 160, display: "flex", alignItems: "center", justifyContent: "center", ...cardStyle(24), ...appear(l, 4 + i * 6, 10) }}>
          <span style={{ ...font(FONT.title, 48) }}>{lb}</span>
        </div>
      ))}
      <Abs x={1490} y={322} style={{ ...appear(l, 28, 10) }}>
        <Thumb w={330}><Shot01C_MemoryReveal f={100} /></Thumb>
      </Abs>
      <Abs x={1490} y={540} style={{ ...appear(l, stay, 10) }}><Tag kind="info" size={26}>Finished scene at the end</Tag></Abs>
      <Keyword l={l} at={34} text="Full workflow" y={640} size={44} underline={false} color={UI.muted} />
    </Stage>
  );
};

// ---------- 03 ----------
const REFS = [
  { name: "Ifverse", handle: "@ifversetales", url: "youtube.com/@ifversetales", role: "Main format reference" },
  { name: "Day One Films", handle: "@dayonefilmsofficial", url: "youtube.com/@dayonefilmsofficial", role: "Compact emotional stories" },
  { name: "Last Soul", handle: "@lastsoulorigin", url: "youtube.com/@lastsoulorigin", role: "Short animated storytelling" },
];
const RefCard: React.FC<{ r: (typeof REFS)[number]; w: number; big?: boolean }> = ({ r, w, big }) => (
  <div style={{ width: w, boxSizing: "border-box", padding: big ? "48px 56px" : "34px 38px", ...cardStyle(26) }}>
    <div style={{ ...font(FONT.title, big ? 72 : 48) }}>{r.name}</div>
    <div style={{ ...font(FONT.body, big ? 46 : 34, UI.cobalt), marginTop: 10 }}>{r.handle}</div>
    <div style={{ ...font(FONT.body, big ? 32 : 26, UI.muted), marginTop: 16 }}>{r.url}</div>
    {big ? <div style={{ marginTop: 30 }}><Tag kind="info" size={28}>{r.role}</Tag></div> : null}
  </div>
);
export const S03A: ShotComp = ({ l }) => (
  <Stage>
    <Keyword l={l} at={0} text="Reference channels" y={150} size={56} underline={false} />
    <div style={{ position: "absolute", left: 130, top: 360, display: "flex", gap: 50 }}>
      {REFS.map((r, i) => (
        <div key={r.name} style={appear(l, 4 + i * 3, 12, 20)}><RefCard r={r} w={520} /></div>
      ))}
    </div>
    <Abs x={0} y={760} w={1920} style={{ display: "flex", justifyContent: "center", ...appear(l, 20, 10) }}>
      <Tag kind="info" size={26}>Names and links only — no stats, no screenshots</Tag>
    </Abs>
  </Stage>
);
const RefFocus: React.FC<{ i: number; l: number; ringAt: number; note?: React.ReactNode }> = ({ i, l, ringAt, note }) => {
  const r = REFS[i];
  return (
    <Stage>
      <div style={{ position: "absolute", left: 460, top: 230, ...settleIn(l) }}><RefCard r={r} w={1000} big /></div>
      <MarkerRing l={l} at={ringAt} x={516} y={378} w={(r.handle.length * 46 * 0.5) | 0} h={46} seed={`ref${i}`} />
      {note ? <Abs x={0} y={800} w={1920} style={{ display: "flex", justifyContent: "center", ...appear(l, ringAt + 20, 10) }}>{note}</Abs> : null}
    </Stage>
  );
};
export const S03B: ShotComp = ({ l, cue }) => <RefFocus i={0} l={l} ringAt={cue("ifverse", 1, 6) + 4} note={<Keyword l={l} at={cue("what", 1, 60)} text="What if your body or mind worked differently?" y={0} size={46} underline={false} />} />;
export const S03C: ShotComp = ({ l }) => <RefFocus i={1} l={l} ringAt={6} />;
export const S03D: ShotComp = ({ l, cue }) => <RefFocus i={2} l={l} ringAt={6} note={<div style={appear(l, cue("we", 1, 40), 10)}><Tag kind="info" size={30}>We can see what they publish — not how they make it</Tag></div>} />;
export const S03E: ShotComp = ({ l }) => {
  const noah: Pose = { ...BASE_POSE, faceTurn: 0.35, smile: 0.5, near: { fk: { shoulder: 10, elbow: 12 } }, far: { fk: { shoulder: 6, elbow: 10 } } };
  return (
    <Stage>
      <svg style={{ position: "absolute", left: 0, top: 0, ...appear(l, 4, 12, 16) }} width={1920} height={1080}>
        <Stickman at={{ x: 330, y: 520, H: 520, facing: 1 }} pose={noah} outfit="noah" legs="standing" />
        <Stickman at={{ x: 600, y: 541, H: 499, facing: -1 }} pose={{ ...noah, gazeX: 0.3 }} outfit="mila" legs="standing" />
      </svg>
      <div style={{ position: "absolute", left: 860, top: 300, width: 900, padding: "48px 56px", boxSizing: "border-box", ...cardStyle(28), ...appear(l, 8, 12, 20) }}>
        <Tag kind="real" size={24}>Our project</Tag>
        <div style={{ ...font(FONT.title, 60), marginTop: 24 }}>What If You Remembered Every Single Day?</div>
      </div>
      <Keyword l={l} at={16} text="Original story · Original visuals" y={800} size={50} />
    </Stage>
  );
};

// ---------- 04 ----------
export const S04A: ShotComp = ({ l }) => {
  const draw = prog(l, 4, 18, ENTER);
  const look = prog(l, 10, 22, SETTLE);
  const pose: Pose = { ...BASE_POSE, faceTurn: 0.7, headTilt: -8 * look, gazeX: 0.6 * look, gazeY: -0.3 * look, brow: 6 * look, smile: 0.1, near: { fk: { shoulder: 8, elbow: 14 } }, far: { fk: { shoulder: 5, elbow: 10 } } };
  const qd = "M 1180 330 C 1180 210, 1420 210, 1420 340 C 1420 430, 1300 440, 1300 540";
  return (
    <Stage>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <Stickman at={{ x: 620, y: 600, H: 560, facing: 1 }} pose={pose} outfit="noah" legs="standing" />
        <path d={qd} fill="none" stroke={UI.charcoal} strokeWidth={34} strokeLinecap="round" strokeDasharray={900} strokeDashoffset={900 * (1 - draw)} />
        <circle cx={1300} cy={640} r={24} fill={UI.charcoal} opacity={prog(l, 16, 20, ENTER)} />
      </svg>
      <Keyword l={l} at={10} text="One clear question" y={790} size={56} />
    </Stage>
  );
};

export const S04B: ShotComp = ({ l, cue }) => {
  const at = cue("consequence", 1, 20);
  const p = prog(l, 8, 20, ENTER);
  const turn = prog(l, 16, 30, MOVE);
  const noah = { ...noahDefault(), headTilt: lerp(-2, -12, turn), gazeX: lerp(0.6, 0.9, turn), gazeY: lerp(-0.1, -0.8, turn) };
  const arrow = prog(l, at, at + 12, ENTER);
  return (
    <AbsoluteFill>
      <CafeScene f={l} noah={noah} mila={{ ...milaDefault(), mouthOpen: talkMouth(l) }} over={
        <g>
          <g opacity={p} style={{ transformOrigin: "1500px 260px", scale: String(0.92 + 0.08 * p) }}>
            <MemoryPanel x={1340} y={150} w={340} h={212} id="c4b" stroke={4}><MemorySummer /></MemoryPanel>
          </g>
          <path d="M 1360 330 C 1320 360, 1300 380, 1290 410" fill="none" stroke={UI.cobalt} strokeWidth={9} strokeLinecap="round" strokeDasharray={140} strokeDashoffset={140 * (1 - arrow)} />
        </g>
      } />
      <Abs x={0} y={0} w={1920} h={1080}><Keyword l={l} at={at + 4} text="A visible consequence" x={100} y={70} center={false} size={44} underline={false} plate /></Abs>
    </AbsoluteFill>
  );
};

export const S04C: ShotComp = ({ l, cue }) => {
  const at = cue("emotional", 1, 20);
  const t = prog(l, Math.max(20, at), Math.max(20, at) + 14, MOVE);
  const noah = { ...noahDefault(), headTilt: lerp(14, 0, t), gazeX: lerp(0.3, 0.7, t), gazeY: lerp(0.8, 0, t), smile: 0.1, brow: lerp(4, 0, t) };
  return (
    <AbsoluteFill>
      <CafeScene f={l} cam={{ s: 1.35, cx: 960, cy: 560 }} wallFade={1} showPlant={false} noah={noah} mila={{ ...milaDefault(), smile: 0.35, gazeX: 0.7 }} />
      <Keyword l={l} at={at + 4} text="An emotional choice" x={100} y={70} center={false} size={44} underline={false} plate />
    </AbsoluteFill>
  );
};

export const S04D: ShotComp = ({ l, d }) => {
  const m = Math.round(d * 0.4);
  if (l < m) return <Shot01B_NotebookClose f={0} />;
  const k = l - m;
  const cards = ["Question", "Consequence", "Choice", "Payoff"];
  const squeeze = prog(k, d - m - 26, d - m - 8, MOVE);
  return (
    <Stage>
      <div style={{ position: "absolute", left: lerp(170, 560, squeeze), top: lerp(330, 380, squeeze), display: "flex", gap: lerp(40, 14, squeeze), scale: String(lerp(1, 0.55, squeeze)), transformOrigin: "0 0" }}>
        {cards.map((c, i) => (
          <div key={c} style={{ width: 360, height: 260, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, ...cardStyle(24), ...appear(k, i * 3, 10) }}>
            {i === 3 ? (
              <svg width={120} height={90} viewBox="0 0 120 90"><rect x={14} y={10} width={92} height={70} rx={8} fill={FILM.notebook} stroke={FILM.ink} strokeWidth={6} /><rect x={74} y={10} width={10} height={70} fill={FILM.shirt} /></svg>
            ) : (
              <Icon name={["topic", "motion", "characters"][i]} size={84} />
            )}
            <span style={{ ...font(FONT.title, 44) }}>{c}</span>
          </div>
        ))}
      </div>
      <svg style={{ position: "absolute", left: 0, top: 0, opacity: 1 - squeeze }} width={1920} height={1080}>
        <path d="M 1490 610 C 1300 760, 500 760, 350 610" fill="none" stroke={UI.cobalt} strokeWidth={7} strokeLinecap="round" strokeDasharray="16 14" opacity={prog(k, 12, 20, ENTER)} />
      </svg>
      <Abs x={0} y={720} w={1920} style={{ display: "flex", justifyContent: "center", opacity: squeeze }}><Tag kind="done" size={34}>Format</Tag></Abs>
      <Keyword l={k} at={10} text="A payoff" y={830} size={50} underline={false} />
    </Stage>
  );
};

// ---------- 05 ----------
export const S05A: ShotComp = ({ l, cue }) => {
  const at = [cue("pick", 1, 10), cue("write", 1, 30), cue("check", 1, 55)];
  return (
    <Stage>
      <div style={{ position: "absolute", left: 300, top: 300, display: "flex", gap: 170 }}>
        {ROUTE.slice(0, 3).map((r, i) => (
          <div key={r.k} style={appear(l, at[i], 10)}><RouteNode k={r.k} label={r.label} size={110} active={i === 2 ? prog(l, at[2], at[2] + 8, ENTER) : 0} /></div>
        ))}
      </div>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        {[0, 1].map((i) => <path key={i} d={`M ${560 + i * 550} 405 h 140 m -26 -20 l 26 20 l -26 20`} fill="none" stroke={UI.charcoal} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" opacity={prog(l, at[i + 1] - 4, at[i + 1] + 4, ENTER)} />)}
      </svg>
      <Keyword l={l} at={at[0]} text="Topic → Script → Check" y={800} size={50} underline={false} />
    </Stage>
  );
};
export const S05B: ShotComp = ({ l, cue }) => {
  const sc = cue("scenes", 1, 40);
  return (
    <Stage>
      <Abs x={140} y={230}><RouteNode k="voice" label="Voice" size={90} active={1} /></Abs>
      <Waveform peaks={PEAKS.TEST} x={420} y={300} w={620} h={150} frames={(PEAKS.TEST ?? []).length || 80} label="Real take · TEST.mp3 (2.7 s)" />
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}><path d="M 1070 375 h 90 m -24 -20 l 24 20 l -24 20" fill="none" stroke={UI.charcoal} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" /></svg>
      <div style={{ position: "absolute", left: 1190, top: 250, display: "flex", gap: 22 }}>
        {[60, 100, 140].map((f, i) => (
          <div key={f} style={appear(l, sc + i * 3, 10)}><Thumb w={190}><Shot01A_CafeWide f={f} /></Thumb></div>
        ))}
      </div>
      <Keyword l={l} at={8} text="Voice → Scenes" y={800} size={50} underline={false} />
    </Stage>
  );
};
export const S05C: ShotComp = ({ l, cue }) => {
  const at = [cue("characters", 1, 6), cue("motion", 1, 26), cue("sound", 1, 46)];
  return (
    <Stage>
      <div style={{ position: "absolute", left: 300, top: 300, display: "flex", gap: 170 }}>
        {ROUTE.slice(5, 8).map((r, i) => (
          <div key={r.k} style={appear(l, at[i], 10)}><RouteNode k={r.k} label={r.label} size={110} /></div>
        ))}
      </div>
      <Keyword l={l} at={at[0]} text="Characters → Motion → Sound" y={800} size={50} underline={false} />
    </Stage>
  );
};
export const S05D: ShotComp = ({ l, d }) => {
  const wide = prog(l, 40, 58, MOVE);
  const walk = prog(l, 62, Math.min(d - 30, 120), MOVE);
  const idx = Math.floor(walk * 9.999);
  return (
    <Stage>
      <div style={{ position: "absolute", left: 960, top: 470, translate: "-50% -50%", scale: String(lerp(1.25, 1, wide)) }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 230px)", rowGap: 46, columnGap: 40 }}>
          {ROUTE.map((r, i) => (
            <div key={r.k} style={{ opacity: i >= 8 ? 1 : wide, display: "flex", justifyContent: "center" }}>
              <RouteNode k={r.k} label={r.label} size={64} active={walk > 0 && walk < 1 && idx === i ? 1 : i >= 8 && wide < 0.5 ? 1 : 0} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 830, display: "flex", justifyContent: "center", gap: 26, opacity: wide }}>
        {["script.md", "narration audio", "video.mp4"].map((o) => <Tag key={o} kind="draft" size={28}>{o}</Tag>)}
      </div>
    </Stage>
  );
};
export const _seqA = { interpolate, vanish, mixPose, talkMouth };
