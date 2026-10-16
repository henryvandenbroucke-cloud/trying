# my-video — Remotion project for the Claude animation tutorial

- `npm run dev` — Remotion Studio (compositions: `Prototype-01A-02A`, `Film-01A-CafeWide`, `Film-01B-NotebookClose`, `Film-01C-MemoryReveal`)
- `npm run render:prototype` — renders `out/prototype.mp4`
- `npm run check:contact` — numeric hand/prop contact and reachability checks
- `npm run lint` — ESLint + TypeScript

Layout: `src/shared/` (tokens, easing, fonts, rig, props, sets, ui) · `src/example-film/` (Layer B shots) · `src/tutorial/` (Layer A shots, `shots.ts` frame table) · `public/` (fonts, audio, sfx, textures) · `previews/` (reviewed renders).
Style rules: `../docs/style-context.md`. Production plan: `../docs/production-plan.md`.
