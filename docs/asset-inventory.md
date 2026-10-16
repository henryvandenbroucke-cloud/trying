# Asset inventory (16 Oct 2026, full draft)

| Asset | Status | Path | Licence / source |
|---|---|---|---|
| Nunito variable font (latin) | in project | `my-video/public/fonts/Nunito-latin-var.woff2` | SIL OFL 1.1 |
| JetBrains Mono 500 (latin) — terminal/code only | in project | `my-video/public/fonts/JetBrainsMono-latin-500.woff2` | SIL OFL 1.1 |
| Paper grain | created (seeded) | `my-video/public/textures/paper_grain.png` | original |
| Remotion docs page | **real capture** 16 Oct 2026 | `my-video/public/captures/remotion-docs_2026-10-16.png` | remotion.dev (screenshot for tutorial demonstration) |
| Remotion Studio, blank project | **real capture** | `…/captures/studio-blank-project_2026-10-16.png` | — |
| Remotion Studio, this project (excerpt composition) | **real capture** | `…/captures/studio-excerpt_2026-10-16.png` | — |
| UvA-DARE page, Elsey et al. 2018 | **real capture** | `…/captures/uva-reconsolidation-review_2026-10-16.png` | dare.uva.nl |
| UC Irvine News page (2012) | **real capture** (used as a source, not shown) | `…/captures/uci-news-hsam_2026-10-16.png` | news.uci.edu |
| Terminal sessions: create-video, skills add, npm run dev, claude -p, render | **real recordings** (`*.raw`, curated `*.json`) | `…/captures/terminal/` | recorded with `script` |
| Example-film excerpt render | **real render** (811 f, 27.05 s) | `my-video/public/renders/excerpt-monday.mp4` (+ `.info.json`) | this project |
| Topic prompt, script prompt (verbatim method + anchors) | in project | `my-video/prompts/P1-topic.md`, `P2-script.md` | user-supplied method |
| Topic titles, example-film script (911 words), fact claims | **Claude output** (this session) | `my-video/prompts/outputs/` | original |
| Male test take (Sami) | **ElevenLabs, real** (2.69 s) | `my-video/public/audio/narration/TEST.mp3` | ElevenLabs — check your plan's terms |
| Female TUT-01 prototype take | ElevenLabs, real — **not used** (voice changed to male) | `my-video/public/audio/tutorial/TUT-01_take1*` | — |
| **Tutorial narration TUT-01…16 (male, Voice A)** | **MISSING** — ElevenLabs refused generation | — | see `elevenlabs-handoff.md` |
| **Example-film narration EFN-01…05 (male, Voice B)** | **MISSING** — same | — | see `elevenlabs-handoff.md` |
| Café room tone, paper, tick, table taps | **placeholders** (procedural, original) | `my-video/public/sfx/*_placeholder.wav` | replace with real/licensed SFX |
| Music bed | **placeholder** (procedural pad, original) | `my-video/public/sfx/music_pad_placeholder.wav` | replace with licensed music |
| ElevenLabs screen recording (Seq 10) | **MISSING** — account blocked; Seq 10 shows the real request values instead | — | record on your account |
| Claude app / Claude Code interactive window recording | **MISSING** — shown via real `claude -p` terminal run and saved files | — | optional: record on your machine |
| Full example film (~7 min animated) | **not built** — only the excerpts the tutorial needs | — | next phase |
