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
    const st = p.cue("that", 1, 40);
    const early = id === "15A" ? DRAFT_EARLY : 0;
    items.push(<Sfx key="p" at={st + efnOpen - 4 - early} file={PAPER} volume={0.28} />);
  }
  if (["16B", "16C", "16D", "16E"].includes(id)) room(1.0);
  if (["16C", "16D", "16E"].includes(id)) for (let k = 60; k < p.d; k += 140) items.push(<Sfx key={`p${k}`} at={k} file={PAPER} volume={0.28} />);
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

export const Tutorial: React.FC<{ captions?: boolean }> = ({ captions = true }) => {
  const g = useCurrentFrame();
  const cap = TL.captions.find((c) => g >= c.from && g < c.to);
  const d1 = shotById("01D");
  const cutG = TL.marks["01D.cut"] ?? d1.from + 60;
  const endShot = shotById("19F");
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
      {/* Closing music bed under the last line, fading to silence */}
      <Sequence name="End bed" from={endShot.from} durationInFrames={TL.durationInFrames - endShot.from}>
        <Audio src={staticFile(PAD)} loop volume={(f) => 0.45 * interpolate(f, [0, 30, TL.durationInFrames - endShot.from - 60, TL.durationInFrames - endShot.from], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
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
