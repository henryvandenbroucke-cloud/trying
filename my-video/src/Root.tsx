import React from "react";
import { Composition, useCurrentFrame } from "remotion";
import "./shared/fonts";
import { VIDEO } from "./shared/tokens";
import { Shot01A_CafeWide } from "./example-film/shots/Shot01A_CafeWide";
import { Shot01B_NotebookClose } from "./example-film/shots/Shot01B_NotebookClose";
import { Shot01C_MemoryReveal } from "./example-film/shots/Shot01C_MemoryReveal";
import { ExcerptMonday, EXCERPT_DURATION } from "./example-film/ExcerptMonday";
import { Tutorial } from "./tutorial/Tutorial";
import { TL } from "./tutorial/timeline";

const withFrame = (C: React.FC<{ f: number }>) => {
  const Wrapped: React.FC = () => <C f={useCurrentFrame()} />;
  return Wrapped;
};
const Film01A = withFrame(Shot01A_CafeWide);
const Film01B = withFrame(Shot01B_NotebookClose);
const Film01C = withFrame(Shot01C_MemoryReveal);

export const RemotionRoot: React.FC = () => {
  const common = { fps: VIDEO.fps, width: VIDEO.width, height: VIDEO.height };
  return (
    <>
      <Composition id="Tutorial" component={Tutorial} durationInFrames={TL.durationInFrames} {...common} defaultProps={{ captions: true }} />
      <Composition id="Film-Excerpt-Monday" component={ExcerptMonday} durationInFrames={EXCERPT_DURATION} {...common} />
      <Composition id="Film-01A-CafeWide" component={Film01A} durationInFrames={90} {...common} />
      <Composition id="Film-01B-NotebookClose" component={Film01B} durationInFrames={90} {...common} />
      <Composition id="Film-01C-MemoryReveal" component={Film01C} durationInFrames={130} {...common} />
    </>
  );
};
