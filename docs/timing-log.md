# Timing log

| Date | Shot / cue | Old | New | Reason |
|---|---|---|---|---|
| 2026-10-16 | TUT-01 start | f318 | **f363** | Measured take: "…a plain script" now lands while the script page is on screen (f410–434) and "In this video" starts at f454, right after the 02A cut (f450). |
| 2026-10-16 | TUT-01 cut-off in prototype | — | 6.33 s (f553) | Cut inside the measured 6.03–6.50 s pause, before "shape it into a story". 4-frame fade. |
| 2026-10-16 | 02A label "One original idea" | cue "idea" | **f495** (word "one", 4.41 s) | Label appears as the phrase starts; underline draws at f501. |
| 2026-10-16 | Room tone fade-out | f300–330 | **f330–385** | Removes 1.9 s of dead air between the pull-back and the first spoken word. |
| 2026-10-16 | 01C [B] line | f210–290 | — (silent) | Voice B not generated (ElevenLabs blocked). Picture timing unchanged. |

Shot boundaries 01A–02A are unchanged from the plan (f0/90/180/300/360-cut/450/570).

## Full draft (16 Oct 2026)
- All 97 shot boundaries are now **computed**, not hand-set: `my-video/scripts/build_timeline.py` reads `narration/segments.json` + `narration/shotplan.json`; each shot starts 0.2 s before its cue phrase. Output: `src/tutorial/timeline.json`, `narration/captions.srt`.
- Timing source today: **estimated** for every narration segment except `TEST` (measured). Estimate = letters per word + pauses (0.42 s after . ? !, 0.2 s after , ; :, 0.5 s after …), Voice B 12 % slower.
- Result: 15,566 frames = 8:38.9; 71 of 97 shots are 2.8–6.5 s; the longer ones are demonstrations with playback or reading holds (06C commands 8.9 s, 14B action 9.8 s, 14E, 15A, 19C, 19E).
- Reading holds added: 06C +2.2 s, 07C +1.0, 08E +1.2, 09B–09D +0.6–0.8, 14B +5.0 (action plays), 17B–17E +0.6–0.8, 18D +1.2, 18E +1.6, 20D +4.0 (end screen).
- Text edits for timing: TUT-01 dropped "Claude plans and codes it…" (repeated in 06), TUT-06 and TUT-09 shortened.
