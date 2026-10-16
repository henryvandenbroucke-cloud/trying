// STYLE_CONTEXT v1 — locked tokens. Source of truth: docs/style-context.md
export const VIDEO = { width: 1920, height: 1080, fps: 30, safe: 100 } as const;

// Tutorial (Layer A) palette
export const UI = {
  paper: "#F4F1EB",
  charcoal: "#16202A",
  cobalt: "#455CF5",
  mint: "#3ECF8E",
  amber: "#F6B344",
  card: "#FFFDF8",
  muted: "#5A6470",
} as const;

// Example film (Layer B) palette
export const FILM = {
  paper: "#FBFAF7",
  ink: "#1B1B1F",
  jacket: "#C8643B",
  jacketShade: "#A9512E",
  shirt: "#F3E6CC",
  trousers: "#2B2F3A",
  trousersShade: "#3A3F4C",
  notebook: "#2E64B8",
  notebookShade: "#1F4C93",
  sweater: "#7FA387",
  sweaterShade: "#6A8D72",
  cafeWash: "#E9C98B",
  wood: "#B98A5E",
  woodShade: "#8E6640",
  wall: "#EFE6D8",
  floor: "#E4D3BA",
  sky: "#DCE7EE",
  memory: "#B9B3D9",
  pageCream: "#F7EFDD",
  hairInk: "#1B1B1F",
  plant: "#7E9F6E",
  plantShade: "#5F7F55",
  pot: "#C98B63",
} as const;

export const FONT = {
  family: "Nunito",
  body: 700,
  title: 900,
  // Sizes at 1080p
  titleSize: 84,
  sectionSize: 52,
  bodySize: 40,
  smallSize: 32,
} as const;

// Character proportions in units of H (standing height). See §2.1.
export const RIG = {
  headR: 0.13, // head diameter 0.26 H
  spine: 0.3,
  shoulderDrop: 0.035,
  upperArm: 0.17,
  forearm: 0.17,
  thigh: 0.22,
  shin: 0.22,
  stroke: 0.01, // limb + outline stroke
  handR: 0.016,
  sleeve: 0.036,
  trouser: 0.028,
  notebookW: 0.13,
  notebookD: 0.1,
} as const;
