import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { FONT } from "./tokens";

// Nunito (SIL OFL 1.1) variable font, latin subset — weights 700 and 900 used.
export const fontsReady = Promise.all([
  loadFont({ family: FONT.family, url: staticFile("fonts/Nunito-latin-var.woff2"), weight: "200 1000", display: "block" }),
  // JetBrains Mono (SIL OFL 1.1) — terminal replays and code cards only.
  loadFont({ family: "JetBrains Mono", url: staticFile("fonts/JetBrainsMono-latin-500.woff2"), weight: "500", display: "block" }),
]);
