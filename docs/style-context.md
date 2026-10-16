# STYLE_CONTEXT v1 — locked after the 01A–02A prototype (16 Oct 2026)

Source of truth for code: `my-video/src/shared/tokens.ts`, `easing.ts`, `rig/`, `props/`, `sets/`, `ui/`.
Use this file (plus REFERENCE_STYLE in `production-plan.md` §0.2) with every shot prompt.

## Canvas and timing
1920 × 1080, 30 fps, safe margin 100 px, end frames exclusive. Every shot is a `<Sequence>` whose
frames come from `src/tutorial/shots.ts`. All motion is a pure function of the frame (no CSS
animation, no wall-clock, no `Math.random()`; seeded `random()` only for static shapes).

## Palettes
- **Tutorial (Layer A):** paper `#F4F1EB`, charcoal `#16202A`, cobalt `#455CF5` (active), mint `#3ECF8E` (done), amber `#F6B344` (fix), card `#FFFDF8`, muted text `#5A6470`. Status never colour-only.
- **Example film (Layer B):** ink `#1B1B1F`, terracotta jacket `#C8643B`, cream shirt `#F3E6CC`, trousers `#2B2F3A`, notebook blue `#2E64B8` (deliberately not cobalt), Mila sweater `#7FA387`, wall `#EFE6D8`, floor `#E4D3BA`, wood `#B98A5E`, sky `#DCE7EE`, memory lilac `#B9B3D9` @ 35 % + dashed ink border.

## Type
Nunito (SIL OFL 1.1, latin variable file in `public/fonts/`), weights **700** (body) and **900** (titles). Titles 80–88 px, sections 48–56, body 38–44, tags 24–32. Straight-cut cards are on screen at the cut frame (no fade from empty).

## Easing (only these)
ENTER `bezier(0.16,1,0.3,1)` 8–12 f · EXIT `bezier(0.7,0,0.84,0)` 6–8 f · MOVE `bezier(0.65,0,0.35,1)` · SETTLE `spring({damping:200})` characters only. Stagger 3 f.

## Characters (stickman hybrid) — units of H (standing height)
| Part | Value |
|---|---|
| Head | white circle, diameter 0.26 H, ink outline |
| Spine / neck | 0.30 H; shoulder 0.035 H below neck |
| Arms | upper 0.17 H, forearm 0.17 H, hand dot r 0.016 H; sleeve 0.036 H to 70 % of forearm |
| Legs | thigh 0.22 H, shin 0.22 H; trousers stroke 0.028 H; ink oval feet |
| Line weight | 0.010 H, constant (whole character drawn inside one H-scaled group) |
| Noah | terracotta jacket with cream V-collar; short dark hair with three rounded scallops |
| Mila | 0.96 H; muted-green sweater; chin-length bob; notebook-blue clip |
| Notebook | 0.13 H × 0.10 H × 0.012 H, spine on −u side, cream strap at 72–79 % of width |
| Faces | two dot eyes, brows carry expression, one-stroke mouth; `faceTurn` 0.78 for 3/4 |

**Contact rule:** arms are solved with 2-bone IK; when a target is reachable the hand *is* the target. Grips use `coverGripPoint()`. `npm run check:contact` verifies reachability and zero-gap contact numerically.

**Layering rule:** a character seated behind a table renders `parts="body"` → table/props → `parts="nearArm"`.

## Sets
Café: wall + floor, two arched windows with slow clouds (≤ 6 px/s, no wrap inside a shot), pendant lamp, round table (top ellipse with camera factor k), bentwood chairs, foreground plant, cups. Camera factors used: wide k 0.30, medium k 0.30, close-up k 0.50.

## Deviations from the written plan (documented once)
1. **Trousers 0.028 H** instead of 1.6 × limb width (0.016 H) — thin trousers read as extra limbs.
2. **Notebook strap is sewn onto the cover** (moves with it) instead of an elastic band, so opening it is physically consistent.
3. **01B cover opens 0 → 55°** (plan said 35°): 35° was not readable at 1×.
4. **Washes:** flat fills + a static, seeded paper-grain PNG (opacity 0.2). Watercolour wash textures are not made yet.
5. **Line weight in close-ups** follows the camera (character scale H = 3600 px in 01B), so ink lines are thicker there by design.
6. **No music bed** in the prototype (no licensed track available yet).
