import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, interpolate } from "remotion";
import { Audio } from "@remotion/media";
import { REGISTRY } from "./registry";
import { TL, cueIn, anyEstimated, shotById, type TShot } from "./timeline";
import type { ShotProps } from "./types";
import { Grain, Pill } from "../shared/ui/ui";
import { CaptionPill, Tag } from "../shared/ui/kit";
import { Bed, Sfx } from "../shared/ui/Sfx";
import { UI } from "../shared/tokens";
import { MOVE, prog, lerp } from "../shared/easing";
import { actionStart, DRAFT_EARLY } from "./sequences/SeqD";
import { segWords } from "./timeline";
import { PLAYER } from "./sequences/SeqA";

const PAPER = "sfx/paper_cover_placeholder.wav";
const ROOM = "sfx/cafe_roomtone_placeholder.wav";
const PAD = "sfx/music_pad_placeholder.wav";

const propsFor = (shot: TShot, g: number): ShotProps => ({
  l: g - shot.from,
  d: shot.to - shot.from,
  g,
  shot,
  cue: (p, n = 1, fb = 0) => cueIn(shot, p, n, fb),
});

/** Per-shot sound design (local frames), derived from the same beats the picture uses. */
const ShotSound: React.FC<{ p: ShotProps }> = ({ p }) => {
  const id = p.shot.id;
  const efnOpen = segWords("EFN-04").find((w) => w.w.toLowerCase().startsWith("open"))?.f ?? 30;
  const items: React.ReactNode[] = [];
  const room = (v: number) => items.push(<Bed key="room" d={p.d} file={ROOM} volume={v} />);
  if (id === "01B") items.push(<Sfx key="p" at={30} file={PAPER} volume={0.3} />);
  if (id === "02A") items.push(<Sfx key="t" at={10} file="sfx/tick_soft_placeholder.wav" volume={0.7} />);
  if (["13A", "13B", "13C", "13D", "13E", "14A", "14C", "14D"].includes(id)) room(0.7);
  if (id === "14B" || id === "14E") { room(0.7); items.push(<Sfx key="p" at={actionStart(p) + 60} file={PAPER} volume={0.28} />); }
  if (id === "14C") items.push(<Sfx key="p" at={70} file={PAPER} volume={0.28} />);
  if (id === "15A" || id === "15D") {
    room(0.7);
    const st = p.cue("that", 1, 40);
    const early = id === "15A" ? DRAFT_EARLY : 0;
    items.push(<Sfx key="p" at={st + efnOpen - 4 - early} file={PAPER} volume={0.28} />);
  }
  if (["16B", "16C", "16D", "16E"].includes(id)) room(1.0);
  if (["16C", "16D", "16E"].includes(id)) items.push(<Sfx key="p" at={60} file={PAPER} volume={0.28} />);
  if (id === "16D" || id === "16E") items.push(<Bed key="pad" d={p.d} file={PAD} volume={0.5} trim={0} />);
  return <>{items}</>;
};

/** "Worked example" tag over the opening film excerpt; docks above the player in 01D. */
const WorkedExampleTag: React.FC<{ g: number }> = ({ g }) => {
  const d1 = shotById("01D").from;
  const dock = prog(g, d1, d1 + 30, MOVE);
  const t = prog(g, 15, 23, MOVE);
  return (
    <div style={{ position: "absolute", left: lerp(100, PLAYER.x, dock), top: lerp(80, PLAYER.y - 72, dock), opacity: t }}>
      <Pill tone="light" size={30}>
        <span style={{ width: 12, height: 12, borderRadius: 99, background: UI.cobalt, display: "inline-block" }} />
        Worked example
      </Pill>
    </div>
  );
};

const BED_LEVEL = 0.22;
const BED_OFF_SHOTS = ["16B", "16C", "16D", "16E", "19B", "19C", "19D", "19E"];
/** Muted ranges: the Seq 16 sound demo, the film excerpt, and every measured playback clip
 *  (a sample played on screen is heard alone). Missing playback audio leaves the bed on. */
const BED_OFF: [number, number][] = [
  ...BED_OFF_SHOTS.map((id) => [shotById(id).from, shotById(id).to] as [number, number]),
  ...TL.audio.filter((a) => a.play && a.src === "measured").map((a) => [a.from, a.from + Math.round(a.dur * 30)] as [number, number]),
];
/** Global-frame volume of the tutorial bed: 12-frame ramps around each muted range. */
const bedVolume = (g: number) => {
  let v = interpolate(g, [TL.marks["01D.cut"] ?? 0, (TL.marks["01D.cut"] ?? 0) + 30, TL.durationInFrames - 60, TL.durationInFrames], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  for (const [a, b] of BED_OFF) {
    v = Math.min(v, interpolate(g, [a - 12, a, b, b + 12], [1, 0, 0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  }
  return BED_LEVEL * v;
};

export const Tutorial: React.FC<{ captions?: boolean }> = ({ captions = true }) => {
  const g = useCurrentFrame();
  const cap = TL.captions.find((c) => g >= c.from && g < c.to);
  const d1 = shotById("01D");
  const cutG = TL.marks["01D.cut"] ?? d1.from + 60;
  return (
    <AbsoluteFill style={{ backgroundColor: UI.paper }}>
      {TL.shots.map((s) => {
        const C = REGISTRY[s.id];
        if (!C) return null;
        const p = propsFor(s, g);
        return (
          <Sequence key={s.id} name={`${s.id}`} from={s.from} durationInFrames={s.to - s.from}>
            <C {...p} />
            <ShotSound p={p} />
          </Sequence>
        );
      })}
      <Sequence name="Worked example tag" durationInFrames={Math.max(1, cutG)}>
        <WorkedExampleTag g={g} />
      </Sequence>
      <Grain opacity={0.2} />
      {/* Opening room tone: film excerpt → pull-back, fades as the tutorial voice begins */}
      <Audio src={staticFile(ROOM)} durationInFrames={cutG + 20} volume={(f) => interpolate(f, [0, 15, cutG - 20, cutG + 20], [0, 0.9, 0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      {/* Tutorial music bed (placeholder pad): from the pull-back to the end, silent wherever
          example-film audio or the Seq 16 sound demo plays, faded to silence at the end */}
      <Sequence name="Tutorial bed" from={cutG} durationInFrames={TL.durationInFrames - cutG}>
        <Audio src={staticFile(PAD)} loop loopVolumeCurveBehavior="extend" volume={(f) => bedVolume(f + cutG)} />
      </Sequence>
      {/* Measured narration files only (estimated segments have no audio yet) */}
      {TL.audio.filter((a) => a.src === "measured").map((a, i) => (
        <Sequence key={`a${i}`} name={`VO ${a.seg}`} from={a.from} durationInFrames={Math.max(1, Math.round(a.dur * 30))}>
          <Audio src={staticFile(`audio/narration/${a.seg}.mp3`)} trimBefore={Math.round(a.trim * 30)} />
        </Sequence>
      ))}
      {captions && cap ? <CaptionPill text={cap.text} film={cap.seg.startsWith("EFN")} /> : null}
      {anyEstimated ? (
        <div style={{ position: "absolute", right: 40, top: 30, opacity: 0.92 }}>
          <Tag kind="missing" size={20}>Draft · narration audio pending — captions show the script</Tag>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
