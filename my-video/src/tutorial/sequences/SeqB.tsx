// Sequences 06–10: real setup, topic prompt, script prompt, fact check, voice.
import React from "react";
import { FONT, UI, FILM } from "../../shared/tokens";
import { ENTER, MOVE, prog, lerp } from "../../shared/easing";
import { cardStyle, font } from "../../shared/ui/ui";
import { Abs, CaptureFrame, DocCard, Keyword, MarkerRing, ProgressStrip, Stage, Tag, Terminal, Thumb, Waveform, appear, capRect, settleIn, Icon } from "../../shared/ui/kit";
import { CafeScene, milaDefault, noahDefault } from "../../example-film/CafeScene";
import { MemorySummer, MemoryWriting } from "../../example-film/shots/memories";
import { MemoryPanel } from "../../shared/sets/MemoryPanel";
import { PEAKS, TL } from "../timeline";
import setup from "../../../public/captures/terminal/setup.json";
import claude from "../../../public/captures/terminal/claude.json";
import testWords from "../../../public/audio/narration/TEST.words.json";
import type { ShotComp } from "../types";

const IMG = { w: 2400, h: 1500 };

// ---------- 06 ----------
export const S06A: ShotComp = ({ l, cue }) => {
  const cols = [
    { name: "Claude", job: "Plan + write code", at: cue("claude", 1, 30), icon: "script" },
    { name: "Remotion", job: "Animate + render", at: cue("remotion", 1, 60), icon: "scenes" },
    { name: "ElevenLabs", job: "Narrate", at: cue("elevenlabs", 1, 90), icon: "voice" },
  ];
  return (
    <Stage>
      <Keyword l={l} at={0} text="Three tools, three jobs" y={150} size={58} underline={false} />
      <div style={{ position: "absolute", left: 180, top: 340, display: "flex", gap: 60 }}>
        {cols.map((c) => (
          <div key={c.name} style={{ width: 480, height: 380, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, ...cardStyle(28), ...appear(l, c.at, 10, 20) }}>
            <Icon name={c.icon} size={110} color={UI.cobalt} />
            <div style={{ ...font(FONT.title, 58) }}>{c.name}</div>
            <div style={{ ...font(FONT.body, 38, UI.muted) }}>{c.job}</div>
          </div>
        ))}
      </div>
    </Stage>
  );
};

const DOCS_BOX = { x: 160, y: 120, w: 1600, h: 800 };
const DOCS_TO = { x: 430, y: 760, w: 1400, h: 700 };
export const S06B: ShotComp = ({ l }) => {
  const cmd = capRect(DOCS_BOX, DOCS_TO, { x: 474, y: 1104, w: 1414, h: 84 });
  const u = prog(l, 30, 40, ENTER);
  return (
    <Stage>
      <CaptureFrame src="captures/remotion-docs_2026-10-16.png" imgW={IMG.w} imgH={IMG.h} box={DOCS_BOX} from={{ x: 420, y: 140, w: 1800, h: 900 }} to={DOCS_TO} l={l} t0={4} t1={26} caption="remotion.dev/docs/ai/coding-agents · real capture, 16 Oct 2026">
        <div style={{ position: "absolute", left: cmd.x - DOCS_BOX.x + 20, top: cmd.y - DOCS_BOX.y + cmd.h + 6, width: (cmd.w - 40) * u, height: 8, borderRadius: 4, background: UI.cobalt }} />
      </CaptureFrame>
      <Abs x={1440} y={880}><Tag kind="real" size={26}>Official setup</Tag></Abs>
    </Stage>
  );
};

export const S06C: ShotComp = ({ l, d }) => {
  const b = setup.blocks;
  const starts = [4, Math.round(d * 0.36), Math.round(d * 0.46), Math.round(d * 0.7)];
  return (
    <Stage>
      <Terminal l={l} blocks={b} starts={starts} x={160} y={130} w={1600} h={760} size={36} title="Terminal · real run, recorded 16 Oct 2026" speedTag={{ at: 30, to: starts[1], text: "Sped up · install took 29 s" }} />
    </Stage>
  );
};

export const S06D: ShotComp = ({ l }) => (
  <Stage>
    <Terminal l={l} blocks={claude.blocks} starts={[4, 22]} x={160} y={130} w={1600} h={640} size={34} title="Second terminal · Claude Code in the project folder (real run)" speedTag={{ at: 70, to: 100, text: "Answer took 9 s" }} />
    <Abs x={160} y={820} style={appear(l, 110, 10)}><Tag kind="real" size={26}>Claude read the project and named the file to edit</Tag></Abs>
  </Stage>
);

export const S06E: ShotComp = ({ l }) => (
  <Stage>
    <CaptureFrame src="captures/studio-blank-project_2026-10-16.png" imgW={IMG.w} imgH={IMG.h} box={{ x: 100, y: 90, w: 1300, h: 812 }} from={{ x: 0, y: 0, w: 2400, h: 1500 }} caption="Remotion Studio · blank project after setup · real capture" />
    <Terminal l={l + 200} blocks={claude.blocks.slice(1)} starts={[0]} x={1170} y={560} w={680} h={360} size={21} title="Claude Code" />
    <Abs x={1440} y={150} style={appear(l, 8, 10)}><Tag kind="done" size={28}>Preview ready</Tag></Abs>
  </Stage>
);

// ---------- 07 ----------
const P1_LINES = [
  "You are a topic strategist for a faceless, narrated YouTube channel built around one question:",
  "what if your own body or mind worked differently?",
  "",
  "Generate 35 new video titles for this channel.",
];
export const S07A: ShotComp = ({ l }) => (
  <Stage>
    <ProgressStrip active={0} l={l} />
    <DocCard l={l} x={120} y={140} w={980} h={700} title="prompts/P1-topic.md" tag={<Tag kind="real" size={24}>Your topic prompt</Tag>} lines={P1_LINES.map((t) => ({ text: t }))} size={36} />
    <div style={{ position: "absolute", left: 1160, top: 140, width: 640, height: 700, padding: 44, boxSizing: "border-box", ...cardStyle(24), ...appear(l, 10, 12) }}>
      <div style={{ ...font(FONT.title, 46) }}>Claude</div>
      <div style={{ ...font(FONT.body, 32, UI.muted), marginTop: 12 }}>Same project session</div>
      <div style={{ marginTop: 40, height: 260, borderRadius: 18, border: `3px solid ${UI.cobalt}`, padding: 24, boxSizing: "border-box", ...font(FONT.body, 30) }}>Paste the whole prompt → send</div>
      <div style={{ marginTop: 30 }}><Tag kind="info" size={22}>Shown from the saved prompt and output files</Tag></div>
    </div>
  </Stage>
);
export const S07B: ShotComp = ({ l, cue }) => (
  <Stage>
    <DocCard l={l} x={260} y={130} w={1400} title="The rules that matter most" tag={<Tag kind="real" size={24}>prompts/P1-topic.md</Tag>} size={40} lines={[
      { text: "1. One change only. Each title alters exactly one human ability.", hl: cue("one", 1, 12) },
      { text: "2. Keep it about the viewer's body or mind.", hl: cue("body", 1, 40) },
      { text: "4. Make the number land: 10x, 100x, forever, zero.", hl: cue("extreme", 1, 70) },
      { text: "6. It must carry a whole video: real consequences.", hl: cue("extreme", 1, 70) + 14 },
    ]} />
    <Keyword l={l} at={cue("one", 1, 12) + 4} text="One change" y={800} size={54} />
  </Stage>
);
const TITLES = ["1. What If Your Memory Was 100x Sharper?", "2. What If You Had Zero Sense of Pain?", "3. What If One Minute Felt Like a Year?", "4. What If Your Eyesight Was 10x Sharper?", "5. What If Your Sense of Smell Was 1,000x Stronger?", "6. What If You Had 300 Hours of Energy?", "7. What If One Night Felt Like a Week?", "8. What If Your Heart Rate Was 10x Slower?", "9. What If You Had Zero Need for Sleep?"];
export const S07C: ShotComp = ({ l, d }) => (
  <Stage>
    <DocCard l={l} x={360} y={110} w={1200} h={800} title="Claude's titles (9 of 35)" tag={<Tag kind="real" size={24}>Claude output · prompts/outputs/topic-titles.md</Tag>} size={38} lines={TITLES.map((t, i) => ({ text: t, hl: i === 0 ? d - 40 : undefined }))} />
  </Stage>
);
export const S07D: ShotComp = ({ l, cue }) => (
  <Stage>
    <DocCard l={l} x={260} y={180} w={1400} title="example-film/topic.md" tag={<Tag kind="real" size={24}>Working document</Tag>} size={40} lines={[
      { text: "What If You Remembered Every Single Day?", bold: true, hl: cue("what", 1, 30) },
      { text: "" },
      { text: "Inspired by #1, “What If Your Memory Was 100x Sharper?” —", dim: true },
      { text: "reworded so the one change is: memory of your own days.", dim: true },
    ]} />
  </Stage>
);
const MemoryKeys: React.FC = () => (
  <g>
    <rect x={0} y={0} width={320} height={200} fill={FILM.wall} />
    <rect x={110} y={20} width={110} height={170} rx={10} fill="#FFFFFF" stroke={FILM.ink} strokeWidth={3} />
    <line x1={110} y1={80} x2={220} y2={80} stroke={FILM.ink} strokeWidth={3} />
    <rect x={130} y={110} width={46} height={26} rx={6} fill={FILM.cafeWash} stroke={FILM.ink} strokeWidth={2} />
    <circle cx={196} cy={124} r={9} fill="none" stroke={FILM.ink} strokeWidth={3} />
    <path d="M 205 124 h 14 v 6 M 214 124 v 5" stroke={FILM.ink} strokeWidth={3} fill="none" />
  </g>
);
export const S07E: ShotComp = ({ l }) => {
  const items = [
    { el: <MemoryWriting />, t: "Exams? Easy." },
    { el: <MemoryKeys />, t: "Lost keys? Never." },
    { el: <MemorySummer />, t: "Are you even here?" },
  ];
  return (
    <Stage>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        {items.map((it, i) => (
          <g key={i} opacity={prog(l, 6 + i * 4, 16 + i * 4, ENTER)}>
            <MemoryPanel x={140 + i * 570} y={250} w={500} h={312} id={`cq${i}`} stroke={4}>{it.el}</MemoryPanel>
          </g>
        ))}
      </svg>
      {items.map((it, i) => (
        <Abs key={i} x={140 + i * 570} y={590} w={500} style={{ textAlign: "center", ...font(FONT.title, 40), ...appear(l, 12 + i * 4, 10) }}>{it.t}</Abs>
      ))}
      <Keyword l={l} at={30} text="Can it carry a story?" y={790} size={54} />
    </Stage>
  );
};

// ---------- 08 ----------
export const S08A: ShotComp = ({ l, cue }) => {
  const title = "What If You Remembered Every Single Day?";
  const typed = Math.max(0, Math.min(title.length, Math.floor((l - 12) * 1.6)));
  const anchors = cue("anchors", 1, 80);
  return (
    <Stage>
      <ProgressStrip active={1} l={l} />
      <DocCard l={l} x={160} y={130} w={1600} title="prompts/P2-script.md" tag={<Tag kind="real" size={24}>Your script prompt</Tag>} size={36} lines={[
        { text: `TOPIC: ${title.slice(0, typed)}${typed < title.length ? "▌" : ""}`, bold: true, hl: 10 },
        { text: "SERIES CONTEXT: standalone" },
        { text: "" },
        { text: "STORY ANCHORS: The hero is “you”, named Noah. Your best friend is Mila.", appearAt: anchors, hl: anchors + 4 },
        { text: "Planted detail: your small blue notebook, and Mila's two taps on the table.", appearAt: anchors + 6, hl: anchors + 10 },
        { text: "Rule: relive any day — never predict or change it.", appearAt: anchors + 12 },
      ]} />
    </Stage>
  );
};
const SCRIPT_OPEN = ["Tuesday, the ninth of July, three summers ago.", "Four seventeen in the afternoon.", "You close your eyes... and you are there.", "The café smells of cinnamon. Rain ticks on the window.", "Mila laughs so hard she spills her tea."];
export const S08B: ShotComp = ({ l }) => (
  <Stage>
    <DocCard l={l} x={260} y={120} w={1400} title="Example film · script (excerpt)" tag={<><Tag kind="real" size={24}>Claude output · 911 words</Tag><Tag kind="info" size={24}>Layer B · not the tutorial voice-over</Tag></>} size={40} lines={SCRIPT_OPEN.map((t, i) => ({ text: t, appearAt: 4 + i * 4 }))} />
  </Stage>
);
export const S08C: ShotComp = ({ l, cue }) => {
  const r = cue("rule", 1, 20);
  return (
    <Stage>
      <DocCard l={l} x={260} y={150} w={1400} title="The limiting rule" tag={<Tag kind="real" size={24}>Example film · script</Tag>} size={44} lines={[
        { text: "You can relive any day you have lived.", hl: r },
        { text: "You can't change it.", hl: r + 8 },
        { text: "And you can't see one second of the future.", hl: r + 16 },
      ]} />
      <div style={{ position: "absolute", left: 560, top: 640, display: "flex", gap: 120, ...appear(l, r + 24, 10) }}>
        <Tag kind="done" size={40}>⏪ the past</Tag>
        <Tag kind="fix" size={40}>⏩ the future</Tag>
      </div>
    </Stage>
  );
};
export const S08D: ShotComp = ({ l, cue }) => {
  const c = cue("choice", 1, 20);
  return (
    <Stage>
      <Abs x={110} y={200}><Thumb w={820}><CafeScene f={l} cam={{ s: 1.6, cx: 960, cy: 560 }} wallFade={1} noah={{ ...noahDefault(), headTilt: 10, gazeY: 0.5, gazeX: 0.3, brow: 6, smile: 0 }} mila={{ ...milaDefault(), gazeX: 0.7 }} notebookOpen={30} /></Thumb></Abs>
      <DocCard l={l} x={1000} y={240} w={820} title="The choice" tag={<Tag kind="real" size={24}>Example film · script</Tag>} size={42} lines={[
        { text: "The past... or the present.", bold: true, hl: c },
        { text: "The past will always be there.", hl: c + 12 },
        { text: "Sam might not.", hl: c + 18 },
      ]} />
      <Abs x={1000} y={712} style={appear(l, 10, 10)}><Tag kind="info" size={26}>Context: Mila's little brother Sam is lost at the market</Tag></Abs>
      <Keyword l={l} at={c + 6} text="The emotional choice" y={830} size={52} underline={false} />
    </Stage>
  );
};
export const S08E: ShotComp = ({ l }) => {
  const cards = ["Hook", "Rule", "Consequences", "Choice", "Callback"];
  return (
    <Stage>
      <div style={{ position: "absolute", left: 130, top: 340, display: "flex", gap: 30 }}>
        {cards.map((c, i) => (
          <div key={c} style={{ width: 306, height: 230, display: "flex", alignItems: "center", justifyContent: "center", ...cardStyle(24), border: i === 0 || i === 4 ? `4px solid ${FILM.notebook}` : undefined, ...appear(l, 4 + i * 3, 10) }}>
            <span style={{ ...font(FONT.title, 44) }}>{c}</span>
          </div>
        ))}
      </div>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <path d="M 283 330 C 300 180, 1620 180, 1637 330" fill="none" stroke={FILM.notebook} strokeWidth={7} strokeDasharray="14 12" strokeLinecap="round" opacity={prog(l, 26, 34, ENTER)} />
        <g opacity={prog(l, 30, 38, ENTER)}><rect x={918} y={170} width={84} height={64} rx={8} fill={FILM.notebook} stroke={FILM.ink} strokeWidth={5} /><rect x={970} y={170} width={9} height={64} fill={FILM.shirt} /></g>
      </svg>
      <Abs x={0} y={680} w={1920} style={{ display: "flex", justifyContent: "center", ...appear(l, 40, 10) }}><Tag kind="info" size={28}>900–1,050 words = the full example film only</Tag></Abs>
    </Stage>
  );
};

// ---------- 09 ----------
export const S09A: ShotComp = ({ l }) => (
  <Stage>
    <ProgressStrip active={2} l={l} />
    <div style={{ position: "absolute", left: 460, top: 240, width: 1000, padding: "56px 64px", boxSizing: "border-box", ...cardStyle(28), border: `4px dashed ${FILM.memory}`, ...settleIn(l) }}>
      <Tag kind="illustration" size={28}>Story premise · fiction</Tag>
      <div style={{ ...font(FONT.title, 58), marginTop: 30 }}>You can replay any day you've lived, perfectly.</div>
    </div>
    <Keyword l={l} at={20} text="Story premise" y={800} size={54} />
  </Stage>
);
export const S09B: ShotComp = ({ l, cue }) => {
  const u = cue("overstated", 1, 50);
  return (
    <Stage>
      <DocCard l={l} x={260} y={220} w={1400} title="Real claim in my first draft" tag={<Tag kind="real" size={24}>Example film · first draft</Tag>} size={50} lines={[
        { text: "Each time you remember something, your brain rebuilds it.", underline: u, ulColor: UI.amber },
      ]} />
      <Abs x={260} y={620} style={appear(l, u + 6, 10)}><Tag kind="fix" size={34}>Check this claim</Tag></Abs>
    </Stage>
  );
};
const UVA_BOX = { x: 160, y: 120, w: 1600, h: 800 };
const UVA_TO = { x: 560, y: 860, w: 1300, h: 650 };
export const S09C: ShotComp = ({ l }) => {
  const r = capRect(UVA_BOX, UVA_TO, { x: 630, y: 918, w: 1180, h: 38 });
  const u = prog(l, 34, 46, ENTER);
  return (
    <Stage>
      <CaptureFrame src="captures/uva-reconsolidation-review_2026-10-16.png" imgW={IMG.w} imgH={IMG.h} box={UVA_BOX} from={{ x: 200, y: 300, w: 1900, h: 950 }} to={UVA_TO} l={l} t0={6} t1={30} caption="Elsey, van Ast & Kindt (2018), Psychological Bulletin 144(8) · UvA-DARE · real capture, 16 Oct 2026">
        <div style={{ position: "absolute", left: r.x - UVA_BOX.x, top: r.y - UVA_BOX.y, width: r.w * u, height: r.h, background: "rgba(69,92,245,0.2)", borderRadius: 6 }} />
      </CaptureFrame>
    </Stage>
  );
};
export const S09D: ShotComp = ({ l, cue }) => {
  const c = cue("change", 1, 20);
  return (
    <Stage>
      <DocCard l={l} x={200} y={170} w={1520} title="Change only the wording the source can't support" size={44} lines={[
        { text: "Each time you remember something, your brain rebuilds it.", strike: c, dim: l > c + 10 },
        { text: "" },
        { text: "Animal research suggests that recalling a memory can briefly make it open to change.", appearAt: c + 10, hl: c + 16, hlColor: "rgba(62,207,142,0.25)" },
      ]} />
      <div style={{ position: "absolute", left: 200, top: 760, display: "flex", gap: 24 }}>
        <div style={appear(l, c + 4, 10)}><Tag kind="fix" size={30}>Overstated</Tag></div>
        <div style={appear(l, c + 22, 10)}><Tag kind="done" size={30}>Supported</Tag></div>
      </div>
    </Stage>
  );
};
export const S09E: ShotComp = ({ l }) => {
  const rows = [
    { c: "Recall can make a memory changeable", s: "Elsey et al. 2018 (review)", w: "“Animal research suggests…”", k: "done" as const, t: "Revised" },
    { c: "HSAM people don't beat lab memory tests", s: "UC Irvine News, 30 Jul 2012", w: "as in the script", k: "done" as const, t: "Verified" },
    { c: "Perfect recall of every day", s: "—", w: "story premise", k: "illustration" as const, t: "Fiction" },
  ];
  return (
    <Stage>
      <div style={{ position: "absolute", left: 130, top: 170, width: 1660, ...cardStyle(24), padding: "30px 40px", boxSizing: "border-box", ...settleIn(l) }}>
        <div style={{ display: "grid", gridTemplateColumns: "560px 470px 360px 200px", ...font(FONT.title, 32, UI.muted), paddingBottom: 16, borderBottom: "3px solid rgba(22,32,42,0.12)" }}>
          <span>Claim</span><span>Source</span><span>Wording</span><span>Status</span>
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "560px 470px 360px 200px", alignItems: "center", ...font(FONT.body, 32), padding: "26px 0", borderBottom: i < 2 ? "2px solid rgba(22,32,42,0.08)" : undefined, ...appear(l, 6 + i * 8, 10) }}>
            <span>{r.c}</span><span style={{ color: UI.muted }}>{r.s}</span><span>{r.w}</span><span><Tag kind={r.k} size={24}>{r.t}</Tag></span>
          </div>
        ))}
      </div>
      <Abs x={130} y={760} style={appear(l, 36, 10)}><Tag kind="info" size={26}>All 7 real claims are listed in prompts/outputs/fact-claims.md</Tag></Abs>
    </Stage>
  );
};

// ---------- 10 ----------
const ReqField: React.FC<{ label: string; value: string; w: number }> = ({ label, value, w }) => (
  <div style={{ width: w }}>
    <div style={{ ...font(FONT.body, 28, UI.muted), marginBottom: 10 }}>{label}</div>
    <div style={{ padding: "20px 26px", borderRadius: 16, border: "3px solid rgba(22,32,42,0.18)", background: "#fff", ...font(FONT.body, 36) }}>{value}</div>
  </div>
);
const ElRequest: React.FC<{ l: number; ring?: [number, number] }> = ({ l, ring }) => (
  <>
    <div style={{ position: "absolute", left: 200, top: 130, width: 1520, height: 690, padding: "40px 52px", boxSizing: "border-box", ...cardStyle(24), ...settleIn(l) }}>
      <div style={{ display: "flex", gap: 14 }}><Tag kind="real" size={24}>Real request · this project's ElevenLabs log</Tag><Tag kind="missing" size={24}>ElevenLabs screen recording missing</Tag></div>
      <div style={{ marginTop: 34 }}><ReqField label="Text (spoken words only)" value="This little film started as a plain script." w={1400} /></div>
      <div style={{ marginTop: 34, display: "flex", gap: 40 }}>
        <ReqField label="Voice" value="Sami – Warm American Voice" w={680} />
        <ReqField label="Model" value="Eleven Multilingual v2" w={680} />
      </div>
    </div>
    {ring ? (
      <>
        <MarkerRing l={l} at={ring[0]} x={252} y={468} w={680} h={72} seed="v" />
        <MarkerRing l={l} at={ring[1]} x={972} y={468} w={680} h={72} seed="m" />
      </>
    ) : null}
  </>
);
export const S10A: ShotComp = ({ l }) => (
  <Stage>
    <ProgressStrip active={3} l={l} />
    <ElRequest l={l} />
    <Keyword l={l} at={30} text="Spoken words only" y={870} size={50} underline={false} />
  </Stage>
);
export const S10B: ShotComp = ({ l, cue }) => (
  <Stage>
    <ElRequest l={l} ring={[cue("voice", 1, 10), cue("model", 1, 30)]} />
    <Keyword l={l} at={cue("keep", 1, 50)} text="One voice · one model" y={870} size={50} underline={false} />
  </Stage>
);
const playStart = (shotFrom: number, shotTo: number) => {
  const a = TL.audio.find((x) => x.seg === "TEST" && x.play && x.from >= shotFrom && x.from < shotTo);
  return a ? a.from - shotFrom : null;
};
export const S10C: ShotComp = ({ l, shot }) => {
  const p = playStart(shot.from, shot.to) ?? 60;
  const ring = prog(l, p - 8, p, ENTER);
  const head = Math.max(0, l - p);
  return (
    <Stage>
      <div style={{ position: "absolute", left: 200, top: 210, width: 1520, height: 420, padding: 50, boxSizing: "border-box", ...cardStyle(24), ...settleIn(l) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <div style={{ width: 130, height: 130, borderRadius: 99, background: UI.cobalt, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <svg width={56} height={60} viewBox="0 0 56 60"><path d="M10 6 L50 30 L10 54 Z" fill="#fff" /></svg>
            <div style={{ position: "absolute", inset: -20 - 30 * ring, borderRadius: 999, border: `5px solid ${UI.cobalt}`, opacity: l >= p - 8 && l < p + 6 ? 1 - ring * 0.8 : 0 }} />
          </div>
          <div>
            <div style={{ ...font(FONT.title, 48) }}>Sample take</div>
            <div style={{ ...font(FONT.body, 32, UI.muted) }}>Sami – Warm American Voice · 2.69 s</div>
          </div>
        </div>
      </div>
      <Waveform peaks={PEAKS.TEST} x={250} y={430} w={1420} h={140} frames={(PEAKS.TEST ?? []).length || 80} playhead={Math.min(head, (PEAKS.TEST ?? []).length)} />
      <Keyword l={l} at={10} text="Listen first" y={760} size={54} />
    </Stage>
  );
};
export const S10D: ShotComp = ({ l }) => (
  <Stage>
    <div style={{ position: "absolute", left: 360, top: 220, width: 1200, padding: "50px 60px", boxSizing: "border-box", ...cardStyle(24), ...settleIn(l) }}>
      <Tag kind="real" size={24}>Measured with ffprobe</Tag>
      <div style={{ fontFamily: "JetBrains Mono", fontSize: 40, marginTop: 30, color: UI.charcoal }}>public/audio/narration/TEST.mp3</div>
      <div style={{ display: "flex", gap: 24, marginTop: 34 }}>
        {["2.69 s", "44.1 kHz · mono", "MP3 · 59 KB"].map((t, i) => <div key={t} style={appear(l, 10 + i * 5, 10)}><Tag kind="done" size={32}>{t}</Tag></div>)}
      </div>
    </div>
    <Keyword l={l} at={20} text="A real narration file" y={720} size={54} />
  </Stage>
);
export const S10E: ShotComp = ({ l }) => {
  const words = testWords as { w: string; s: number; e: number }[];
  const t0 = 20;
  const display = ["This", "little", "film", "started", "as", "a", "plain", "script."];
  const nowS = (l - t0) / 30;
  return (
    <Stage>
      <Waveform peaks={PEAKS.TEST} x={200} y={250} w={1520} h={170} frames={(PEAKS.TEST ?? []).length || 80} playhead={Math.max(0, l - t0)} label="TEST.mp3 · word times measured from the file (local speech recognition)" />
      <div style={{ position: "absolute", left: 200, top: 520, width: 1520, display: "flex", flexWrap: "wrap", gap: 18 }}>
        {display.map((w, i) => {
          const on = words[i] && nowS >= words[i].s;
          return <span key={i} style={{ ...font(FONT.title, 62, on ? UI.charcoal : "rgba(22,32,42,0.28)"), padding: "4px 10px", borderRadius: 10, background: on && nowS < words[i].e ? "rgba(69,92,245,0.16)" : "transparent" }}>{w}</span>;
        })}
      </div>
      <Keyword l={l} at={8} text="Voice sets the timing" y={800} size={52} underline={false} />
    </Stage>
  );
};
export const _seqB = { lerp, MOVE };
