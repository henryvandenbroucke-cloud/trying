# Project state: 16 Oct 2026

**Mode:** PRODUCTION.

**Current step:** the full tutorial draft is assembled, reviewed, fixed and rendered.
- File: `my-video/previews/tutorial-final-draft.mp4`.
- It is a **draft** because the narration audio is missing. ElevenLabs blocked generation, so captions carry the script and the timing is estimated from the text.

## Deliverables
| Item | Path |
|---|---|
| Tutorial render: 1920×1080, 30 fps, H.264 + AAC 48 kHz, 518.869 s (8:38.9), 15,566 frames, 64.4 MB | `my-video/previews/tutorial-final-draft.mp4` |
| Example-film excerpt render (embedded in 18–19) | `my-video/public/renders/excerpt-monday.mp4` |
| Editable project: Remotion 4.0.536 compositions, shared rig/sets/UI kit, timing engine | `my-video/` (see `my-video/README.md`) |
| Narration source + ElevenLabs paste-ready text | `my-video/narration/segments.json`, `docs/elevenlabs-handoff.md` |
| Style, assets, timing, voices | `docs/style-context.md`, `docs/asset-inventory.md`, `docs/timing-log.md`, `docs/narration-manifest.json` |

## Checks performed on the final render (and how)
| Check | Result |
|---|---|
| File properties (`ffprobe`) | 1920×1080, 30/1 fps, 15,566 video frames, AAC 48 kHz stereo, 518.869 s |
| Beginning / middle / end | Frames sampled from the final MP4 at 0.5, 2, 4.5, 8, 12.5, 259.4, 300, 450, 505, 512 and 518.5 s: correct shots, captions readable, the last frame is the still end screen |
| Every shot's first, middle and last frame | Contact sheets made from the MP4 for all 20 sequences (291 frames) on the first final render. After the fixes, re-sampled from the new render for Seq 01, 04, 08, 10, 12, 13, 14, 17, 18, 19 and 20 |
| Character contact (`npm run check:contact`) | 6/6 pass. 01B contact frame on the cover edge (0.000 px gap); hand stays on the grip after contact; 01C hand on the grip f0–179; all arms reachable |
| Typecheck + ESLint (`npm run lint`) | pass |
| Loudness (`ebur128`) | −32.0 LUFS integrated, LRA 5.6 LU, true peak −2.9 dBFS. No clipping. Quiet because no narration exists yet |
| Dead air (`silencedetect` −50 dB, ≥ 0.7 s) | none |
| Bed ramps | RMS measured in 0.25 s windows around 10C, 16A, 16E, 19B and 19E. The bed ramps out, the sample plays alone, the bed returns. The last 1.5 s fade to −54 dB |
| Shot lengths | 97 shots; 71 are 2.8–6.5 s; min 2.77 s, max 9.83 s (14B action demo) |

### Defects found in the final review and fixed at the shared component
1. **Labels covering the scene.**
   - `Keyword` clamps y to 850, so the labels in 04B, 04C, 12E, 13D, 14A and 14C landed on the table, legs and floor line. 17E's label sat over its capture.
   - Fix: added a `plate` variant (paper card) and moved those labels into clear space. 17E became a tag beside "Revised".
2. **18A:** the settings tag overlapped the capture's source caption. Moved into the dark area of the capture.
3. **08D:** "Sam might not." with no context. Sam is Mila's brother in the script. Added a context tag.
4. **Silent stretches of 210 s and 62 s.**
   - The planned tutorial music bed only played at the end.
   - Fix: added the continuous ducked bed.
   - Fixed `loop` volume curves (`loopVolumeCurveBehavior="extend"`). Before this, the curve restarted every 32 s loop.
   - Made the placeholder pad loop seamlessly (it had 2 s fades at each end).
5. **Dead air before samples and under missing playback** (10C, 15A, 15D, 16A). The bed now mutes only around measured clips, and 15A/15D get room tone.

Earlier draft-review fixes are listed in the commit history.

## Not performed / limitations
- **Nobody has listened to the audio.** I can't hear it. Every audio statement above comes from measurements.
- Playback at 1× was judged from sampled frames and contact sheets, not by watching in real time.
- Phone-size readability was judged from 480–640 px-wide sheets only.
- The re-sampling after the fixes covered the sequences listed above, not all 20.

## Missing inputs (not fabricated)
1. **Male narration.** None of the tutorial (TUT-01…16, Voice A Sami) or example-film (EFN-01…05, Voice B Chris) audio exists yet.
   - ElevenLabs refused with "Free Tier access has been disabled". The calls were not retried.
   - Only the 2.69 s TEST take exists.
   - To finish: drop files into `my-video/public/audio/narration/<ID>.mp3`, then `npm run timeline`, then `npm run render:tutorial`. The picture retimes automatically. See `docs/elevenlabs-handoff.md`.
2. **ElevenLabs UI screen recording for Seq 10.** Seq 10 shows the real request values from the log instead.
3. **Licensed or recorded café ambience, paper SFX and music.** Procedural placeholders are used now.
4. **Full ~7-minute example film.** Only the excerpts the tutorial needs are built.

## Models
This session's configured model is `claude-opus-5-5`; it did all the work. No Sonnet route was used.
