# Project state — 16 Oct 2026

**Mode:** PRODUCTION. **Current step:** prototype (tutorial shots 01A–02A, 19 s) rendered and reviewed; waiting for your approval before extending to the remaining sequences.

## Done
- Remotion project created with the official commands (`npx create-video --yes --blank my-video`, `npx remotion skills add`) in `my-video/`.
- Shared visual system locked as STYLE_CONTEXT v1 (`docs/style-context.md`).
- Reusable components: Stickman rig (seated + standing, IK arms, layering parts), WorldArm (close-ups), Notebook with hinged cover + grip point, café set pieces, memory panel, tutorial UI primitives.
- Example-film shots 01A, 01B, 01C as their own compositions (`Film-01A…`, `Film-01B…`, `Film-01C…`); tutorial prototype `Prototype-01A-02A`.
- Voice sample TUT-01 (1 take) generated, measured, ASR-aligned, normalised.
- Render: `my-video/previews/prototype-01A-02A.mp4` (1920×1080, 30 fps, 19.008 s, AAC 48 kHz).

## Checks performed (and how)
| Check | Result |
|---|---|
| Typecheck + ESLint (`npm run lint`) | pass |
| Numeric contact/reachability (`npm run check:contact`) | 6/6 pass: 01B contact at f120 = cover edge (0.000 px), hand stays on grip after contact, 01C hand on grip f0–179, all arms reachable |
| Determinism: frame 205 rendered twice | identical MD5 |
| Visual inspection of rendered frames | contact sheets at f0, 20, 44–52, 89, 90–150, 116–132, 180–299, 300–395, 400–452, 500, 569; defects found and fixed: heavy grain, top white band, spiky hair, legs in front of table, empty first frame at the f360 and f450 cuts, title/line wrapping |
| Mix loudness (ffmpeg ebur128) | −13.6 LUFS integrated, −1.5 dBFS true peak, no clipping |
| Dead-air check (silencedetect −50 dB, 0.4 s) | only the natural sentence pause (14.47–15.15 s) and the 0.6 s tail |

## Not performed / limitations
- **Nobody has listened to the audio.** I can't hear audio; pronunciation and tone checks are from ASR and measurements only.
- Real-time playback smoothness was judged from sampled frames, not by watching at 1×.
- Phone-size readability: judged from 640-px-wide contact sheets only.
- No music; SFX are procedural placeholders.

## Models
This session's configured model: `claude-opus-5-5` (all prototype work). No Sonnet route used yet.

## Open issues / next steps
1. ElevenLabs Free Tier blocked → you generate TUT-02… (see `elevenlabs-handoff.md`).
2. Licensed café ambience, paper sound and music bed.
3. After approval: build 02B–02D and 03–05 (graphics-only sequences), then capture-based sequences as real recordings become available.
