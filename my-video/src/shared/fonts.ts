import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { FONT } from "./tokens";

// Nunito (SIL OFL 1.1) variable font, latin subset — weights 700 and 900 used.
export const fontsReady = loadFont({
  family: FONT.family,
  url: staticFile("fonts/Nunito-latin-var.woff2"),
  weight: "200 1000",
  display: "block",
});
