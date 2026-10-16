# my-video — Remotion project for the Claude animation tutorial

## Compositions (`npm run dev` opens Remotion Studio)
- `Tutorial`: the full tutorial, 97 shots. Its length comes from `src/tutorial/timeline.json`.
- `Film-Excerpt-Monday`: the example-film excerpt shown in 19B–19E. Rendered to `public/renders/excerpt-monday.mp4`.
- `Film-01A-CafeWide`, `Film-01B-NotebookClose`, `Film-01C-MemoryReveal`: the opening film shots.

## Scripts
- `npm run timeline`: rebuilds `src/tutorial/timeline.json` (shot frames, captions, SRT) and `peaks.json` (waveforms).
  - Inputs: `narration/segments.json` and `narration/shotplan.json`, plus any real narration in `public/audio/narration/<ID>.mp3`.
  - Run it after you add or replace narration files. A measured file replaces its text estimate automatically.
  - Word timings use `scripts/asr_words.py` (Vosk).
- `npm run render:tutorial`: renders `out/tutorial.mp4` (1920×1080, 30 fps, H.264/AAC).
- `npm run render:excerpt`: renders the example-film excerpt that the tutorial embeds.
- `npm run check:contact`: numeric hand/prop contact and reachability checks.
- `npm run lint`: ESLint + TypeScript.

## Layout
- `src/shared/`: tokens, easing, fonts, the rig (Stickman, IK, WorldArm), props, sets (Cafe, MemoryPanel), and ui (`kit.tsx` components, Sfx/Bed).
- `src/example-film/`: Layer B, the example film. Contains CafeScene, the actions, the opening shots, memories and the excerpt.
- `src/tutorial/`: Layer A, the tutorial. Contains `Tutorial.tsx`, `registry.tsx` (shot ID → component), `sequences/SeqA…SeqE.tsx` and `timeline.ts`.
- `public/`:
  - fonts (OFL)
  - `audio/narration/` (real takes only)
  - `sfx/`: procedural placeholders from `scripts/synth_placeholders.py`
  - `captures/`: real screenshots and terminal recordings
  - `renders/`
- `prompts/`: the prompts shown on screen, and Claude's real outputs.
- `previews/`: reviewed renders.

Related docs:
- Style rules: `../docs/style-context.md`.
- Plan: `../docs/production-plan.md`.
- Status and checks: `../docs/state.md`.
- Voice handoff: `../docs/elevenlabs-handoff.md`.
