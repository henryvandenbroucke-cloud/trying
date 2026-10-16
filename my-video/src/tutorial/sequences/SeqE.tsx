// Sequences 18–20: export & inspect, finished example, reusable workflow.
import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile, interpolate } from "remotion";
import { FONT, UI } from "../../shared/tokens";
import { ENTER, EXIT, MOVE, prog, lerp } from "../../shared/easing";
import { Pill, cardStyle, font } from "../../shared/ui/ui";
import { Abs, CaptureFrame, CheckStrip, Keyword, MarkerRing, ProgressStrip, ROUTE, RouteNode, Stage, Tag, Terminal, Thumb, appear, capRect, settleIn } from "../../shared/ui/kit";
import { Bed, Sfx } from "../../shared/ui/Sfx";
import { ExB, ExC, ExD, ExE, EX_E, TAPS } from "../../example-film/shots/Excerpt";
import render from "../../../public/captures/terminal/render.json";
import fileInfo from "../../../public/renders/excerpt-monday.info.json";
import type { ShotComp } from "../types";

const VID = "renders/excerpt-monday.mp4";
const IMG = { w: 2400, h: 1500 };
const Player: React.FC<{ x: number; y: number; w: number; startFrom?: number; volume?: number }> = ({ x, y, w, startFrom = 0, volume = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: (w * 9) / 16, borderRadius: 18, overflow: "hidden", boxShadow: "0 18px 44px rgba(22,32,42,0.2)" }}>
    <OffthreadVideo src={staticFile(VID)} trimBefore={startFrom} volume={volume} style={{ width: "100%", height: "100%" }} />
  </div>
);

// ---------- 18 ----------
const STUDIO_BOX = { x: 160, y: 110, w: 1600, h: 800 };
const STUDIO_TO = { x: 1200, y: 40, w: 1200, h: 600 };
export const S18A: ShotComp = ({ l }) => {
  const r = capRect(STUDIO_BOX, STUDIO_TO, { x: 1880, y: 280, w: 500, h: 110 });
  return (
    <Stage>
      <ProgressStrip active={9} l={l} />
      <CaptureFrame src="captures/studio-excerpt_2026-10-16.png" imgW={IMG.w} imgH={IMG.h} box={STUDIO_BOX} from={{ x: 0, y: 0, w: 2400, h: 1200 }} to={STUDIO_TO} l={l} t0={6} t1={30} caption="Remotion Studio · this project · composition Film-Excerpt-Monday · real capture" />
      <MarkerRing l={l} at={40} x={r.x} y={r.y} w={r.w} h={r.h} seed="dims" />
      <Abs x={160} y={960} style={appear(l, 46, 10)}><Tag kind="done" size={28}>{fileInfo.width} × {fileInfo.height} · {fileInfo.fps} fps — the settings actually used</Tag></Abs>
    </Stage>
  );
};
export const S18B: ShotComp = ({ l }) => (
  <Stage>
    <Terminal l={l} blocks={render.blocks} starts={[4]} x={160} y={140} w={1600} h={680} size={30} title="Terminal · real render of the excerpt" speedTag={{ at: 50, to: 120, text: `Sped up · render took ${render.blocks[0].elapsed_s} s` }} />
  </Stage>
);
export const S18C: ShotComp = ({ l }) => (
  <Stage>
    <Player x={300} y={110} w={1320} volume={0.6} />
    <div style={{ position: "absolute", left: 300, top: 880, display: "flex", gap: 18, ...appear(l, 8, 10) }}>
      <Tag kind="real" size={26}>{fileInfo.file}</Tag>
      <Tag kind="real" size={26}>{fileInfo.duration_s.toFixed(2)} s</Tag>
      <Tag kind="real" size={26}>{fileInfo.codec} · {fileInfo.audio}</Tag>
    </div>
  </Stage>
);
export const S18D: ShotComp = ({ l, d }) => {
  const total = Math.round(fileInfo.duration_s * 30);
  const pts = [{ t: "Beginning", f: 15 }, { t: "Middle", f: Math.round(total / 2) }, { t: "End", f: total - 45 }];
  return (
    <Stage>
      <div style={{ position: "absolute", left: 110, top: 200, display: "flex", gap: 40 }}>
        {pts.map((p, i) => (
          <div key={i} style={appear(l, 4 + i * 6, 10)}>
            <Player x={0} y={0} w={540} startFrom={p.f} />
            <div style={{ width: 540, height: 304 }} />
            <div style={{ ...font(FONT.title, 36), marginTop: 16 }}>{p.t}</div>
          </div>
        ))}
      </div>
      <CheckStrip l={l} x={110} y={640} items={[{ label: "Picture", doneAt: Math.round(d * 0.35) }, { label: "Voice", doneAt: 99999 }, { label: "Timing", doneAt: Math.round(d * 0.65) }]} />
      <Abs x={110} y={740} style={appear(l, Math.round(d * 0.5), 10)}><Tag kind="missing" size={26}>Voice check pending — the excerpt narration hasn't been recorded</Tag></Abs>
    </Stage>
  );
};
export const S18E: ShotComp = ({ l, d }) => {
  const t = prog(l, d - 26, d - 2, MOVE);
  return (
    <Stage>
      <div style={{ position: "absolute", left: lerp(300, 0, t), top: lerp(110, 0, t), width: lerp(1320, 1920, t), height: lerp(742, 1080, t), borderRadius: lerp(18, 0, t), overflow: "hidden" }}>
        <OffthreadVideo src={staticFile(VID)} volume={0} style={{ width: "100%", height: "100%" }} />
      </div>
      <Abs x={300} y={880} style={{ opacity: 1 - t }}><Tag kind="done" size={28}>Export checked · picture and timing</Tag></Abs>
    </Stage>
  );
};

// ---------- 19 ----------
const Iris: React.FC<{ r: number; children: React.ReactNode }> = ({ r, children }) => (
  <AbsoluteFill style={{ backgroundColor: UI.paper }}>
    <AbsoluteFill style={{ clipPath: `circle(${r}% at 50% 50%)` }}>{children}</AbsoluteFill>
  </AbsoluteFill>
);
export const S19A: ShotComp = ({ l }) => (
  <Stage>
    <Player x={300} y={170} w={1320} />
    <Abs x={300} y={90} style={appear(l, 2, 8)}><Pill tone="light" size={30}>The finished example</Pill></Abs>
  </Stage>
);
const FILM_BED = "sfx/cafe_roomtone_placeholder.wav";
export const S19B: ShotComp = ({ l, d }) => (
  <Iris r={interpolate(l, [0, 10], [0, 75], { easing: ENTER, extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
    <ExB f={l} d={d} />
    <Bed d={d} file={FILM_BED} volume={0.9} />
  </Iris>
);
export const S19C: ShotComp = ({ l, d }) => (<><ExC f={l} d={d} /><Bed d={d} file={FILM_BED} volume={0.6} /></>);
export const S19D: ShotComp = ({ l, d }) => (
  <>
    <ExD f={l} d={d} />
    <Bed d={d} file={FILM_BED} volume={0.9} />
    <Sfx at={TAPS[0] - 1} file="sfx/table_taps_placeholder.wav" volume={0.5} />
  </>
);
export const S19E: ShotComp = ({ l, d }) => (
  <Iris r={interpolate(l, [d - 10, d], [75, 0], { easing: EXIT, extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
    <ExE f={l} d={d} />
    <Bed d={d} file={FILM_BED} volume={0.9} />
    <Sfx at={EX_E.closeEnd - 4} file="sfx/paper_cover_placeholder.wav" volume={0.22} />
  </Iris>
);
export const S19F: ShotComp = ({ l }) => (
  <Stage>
    <Abs x={160} y={300} style={settleIn(l)}><Thumb w={640}><ExE f={140} d={200} /></Thumb></Abs>
    <div style={{ position: "absolute", left: 900, top: 330 }}>
      {["One script", "One voice", "One consistent world"].map((t, i) => <div key={t} style={{ ...font(FONT.title, 64), marginBottom: 18, ...appear(l, 6 + i * 6, 10) }}>{t}</div>)}
    </div>
  </Stage>
);

// ---------- 20 ----------
const TopicCard: React.FC<{ title: string; blank?: boolean; w?: number }> = ({ title, blank, w = 640 }) => (
  <div style={{ width: w, height: 300, boxSizing: "border-box", padding: "40px 46px", ...cardStyle(28), border: blank ? `4px dashed ${UI.cobalt}` : undefined }}>
    <Pill tone={blank ? "outline" : "cobalt"} size={24}>{blank ? "NEXT" : "IDEA"}</Pill>
    <div style={{ ...font(FONT.title, 48, blank ? UI.muted : UI.charcoal), marginTop: 26 }}>{title}</div>
  </div>
);
export const S20A: ShotComp = ({ l }) => {
  const drop = prog(l, 6, 22, MOVE);
  return (
    <Stage>
      <div style={{ position: "absolute", left: 640, top: 380 }}>
        {[24, 12].map((o) => <div key={o} style={{ position: "absolute", left: o, top: o, width: 640, height: 300, ...cardStyle(28), opacity: 0.6 }} />)}
      </div>
      <div style={{ position: "absolute", left: 640, top: lerp(120, 380, drop) }}><TopicCard title="What If You Remembered Every Single Day?" /></div>
      <Abs x={0} y={760} w={1920} style={{ display: "flex", justifyContent: "center", ...appear(l, 24, 10) }}><Tag kind="done" size={34}>One finished example</Tag></Abs>
    </Stage>
  );
};
export const S20B: ShotComp = ({ l, cue }) => {
  const at = [cue("change", 1, 20), cue("rewrite", 1, 40), cue("check", 1, 60), cue("record", 1, 80), cue("retime", 1, 100)];
  return (
    <Stage>
      <Abs x={160} y={130} style={settleIn(l)}><TopicCard title="Your next topic…" blank /></Abs>
      <div style={{ position: "absolute", left: 160, top: 540, display: "flex", gap: 60 }}>
        {ROUTE.slice(0, 5).map((r, i) => <div key={r.k} style={appear(l, at[i], 10)}><RouteNode k={r.k} label={r.label} size={70} active={i === 0 ? 1 : 0} /></div>)}
      </div>
    </Stage>
  );
};
export const S20C: ShotComp = ({ l }) => (
  <Stage>
    <Keyword l={l} at={4} text="Which idea would you try?" y={380} size={84} />
    <Abs x={0} y={600} w={1920} style={{ display: "flex", justifyContent: "center", ...appear(l, 20, 10) }}><Tag kind="info" size={30}>Tell me in the comments</Tag></Abs>
  </Stage>
);
export const S20D: ShotComp = ({ l }) => (
  <Stage>
    {[{ x: 240, t: "Next video" }, { x: 1060, t: "Subscribe" }].map((b) => (
      <div key={b.t} style={{ position: "absolute", left: b.x, top: 300, width: 620, height: 350, borderRadius: 24, border: "4px dashed rgba(22,32,42,0.25)", display: "flex", alignItems: "center", justifyContent: "center", ...font(FONT.title, 40, UI.muted), ...appear(l, 2, 10) }}>{b.t}</div>
    ))}
    <Abs x={0} y={760} w={1920} style={{ display: "flex", justifyContent: "center", ...appear(l, 8, 10) }}><span style={{ ...font(FONT.title, 40) }}>Thanks for watching</span></Abs>
  </Stage>
);
export const _seqE = { EXIT, ENTER };
