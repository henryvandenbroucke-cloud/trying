import type { ShotComp } from "./types";
import { Shot01A_CafeWide } from "../example-film/shots/Shot01A_CafeWide";
import { Shot01B_NotebookClose } from "../example-film/shots/Shot01B_NotebookClose";
import { Shot01C_MemoryReveal } from "../example-film/shots/Shot01C_MemoryReveal";
import * as A from "./sequences/SeqA";
import * as B from "./sequences/SeqB";
import * as C from "./sequences/SeqC";
import * as D from "./sequences/SeqD";
import * as E from "./sequences/SeqE";

const S01A: ShotComp = ({ l }) => <Shot01A_CafeWide f={l} />;
const S01B: ShotComp = ({ l }) => <Shot01B_NotebookClose f={l} />;
const S01C: ShotComp = ({ l }) => <Shot01C_MemoryReveal f={l} />;

export const REGISTRY: Record<string, ShotComp> = {
  "01A": S01A, "01B": S01B, "01C": S01C, "01D": A.S01D,
  "02A": A.S02A, "02B": A.S02B, "02C": A.S02C, "02D": A.S02D,
  "03A": A.S03A, "03B": A.S03B, "03C": A.S03C, "03D": A.S03D, "03E": A.S03E,
  "04A": A.S04A, "04B": A.S04B, "04C": A.S04C, "04D": A.S04D,
  "05A": A.S05A, "05B": A.S05B, "05C": A.S05C, "05D": A.S05D,
  "06A": B.S06A, "06B": B.S06B, "06C": B.S06C, "06D": B.S06D, "06E": B.S06E,
  "07A": B.S07A, "07B": B.S07B, "07C": B.S07C, "07D": B.S07D, "07E": B.S07E,
  "08A": B.S08A, "08B": B.S08B, "08C": B.S08C, "08D": B.S08D, "08E": B.S08E,
  "09A": B.S09A, "09B": B.S09B, "09C": B.S09C, "09D": B.S09D, "09E": B.S09E,
  "10A": B.S10A, "10B": B.S10B, "10C": B.S10C, "10D": B.S10D, "10E": B.S10E,
  "11A": C.S11A, "11B": C.S11B, "11C": C.S11C, "11D": C.S11D, "11E": C.S11E,
  "12A": C.S12A, "12B": C.S12B, "12C": C.S12C, "12D": C.S12D, "12E": C.S12E,
  "13A": C.S13A, "13B": C.S13B, "13C": C.S13C, "13D": C.S13D, "13E": C.S13E,
  "14A": D.S14A, "14B": D.S14B, "14C": D.S14C, "14D": D.S14D, "14E": D.S14E,
  "15A": D.S15A, "15B": D.S15B, "15C": D.S15C, "15D": D.S15D, "15E": D.S15E,
  "16A": D.S16A, "16B": D.S16B, "16C": D.S16C, "16D": D.S16D, "16E": D.S16E,
  "17A": D.S17A, "17B": D.S17B, "17C": D.S17C, "17D": D.S17D, "17E": D.S17E, "17F": D.S17F,
  "18A": E.S18A, "18B": E.S18B, "18C": E.S18C, "18D": E.S18D, "18E": E.S18E,
  "19A": E.S19A, "19B": E.S19B, "19C": E.S19C, "19D": E.S19D, "19E": E.S19E, "19F": E.S19F,
  "20A": E.S20A, "20B": E.S20B, "20C": E.S20C, "20D": E.S20D,
};
