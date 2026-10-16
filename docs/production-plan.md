# Production Plan — "How to Create Videos Like Ifverse with Claude Opus 5.5 (Full Workflow)"

**Status:** PLANNING mode. Written package only: no audio generated, no animation code, nothing rendered.
**Prepared:** 16 Oct 2026 from `AI_Channel_Tutorial_Master_Prompt.md`, read in full (1,077 lines).
**Repository files:** this package (`docs/production-plan.md`) and a copy of the master brief (`docs/brief.md`). No code, no media.

---

## 0. Context and what was actually verified

**Why this plan exists:** the creator wants an ~8-minute faceless tutorial that teaches beginners to make an original narrated "What If" animation with Claude (planning + code), Remotion (render) and ElevenLabs (voice). The tutorial has **two separate layers**:

| Layer | What it is | Narration track | Folder (production) |
|---|---|---|---|
| **A — Tutorial** | The 8:00 how-to video, 20 sequences, 97 shots | Tutorial Narration (Voice A) | `src/tutorial/`, `public/audio/tutorial/` |
| **B — Example film** | "What If You Remembered Every Single Day?", the Noah/Mila story built *inside* the tutorial | Example Film Narration (Voice B) | `src/example-film/`, `public/audio/example-film/` |

Layer B appears inside Layer A only as excerpts: 01A–01C, 10C, 14–17 demo clips, 19B–19E. The full 900–1,050-word example script is **not** spoken in the tutorial.

### 0.1 Reference inspection: what I could and could not do

| Check | Result | How |
|---|---|---|
| Identify the primary reference | **Done.** "How to Create Stickman Animation with AI 100% FREE", **Mark Ai Guy** (https://www.youtube.com/@Markaiguy). | YouTube oEmbed |
| Open the YouTube page directly | **Failed.** The page body came back empty (navigation only). | WebFetch |
| View the thumbnail | **Done. I looked at it myself.** | Downloaded image |
| Scene-by-scene visual analysis | **Done, but machine-generated**: vidIQ "video watch" (25 credits). I did not watch the video frame by frame. | vidIQ |
| Transcript | **Done** (5 credits). It is auto-captioned; the tool labelled it "es" but the text is English. | vidIQ |
| Remotion setup commands | **Verified today** against https://www.remotion.dev/docs/ai/coding-agents | WebFetch |

Total vidIQ spend: **30 credits**, as you approved.

### 0.2 REFERENCE_STYLE: observations kept separate from our adaptation

**Observed directly (thumbnail):** a white frame and three panels, each with a hand-inked stickman: round white head, thin black limbs, small face with eyebrows. Soft watercolor savanna washes in ochre, sage and sky blue. A heavy black rounded sans title ("Stickman Animations") with a blue drop shadow. A red rounded badge with white text ("Free Method"). Very readable at small size.

**Reported by the machine analysis (not personally verified):**
1. **Example first.** A fast animated hook, then the finished example plays **before** any steps (01:18–01:49). The finished result plays again at the end (15:24–15:52).
2. **Stick figures** with black outlines on **plain white** backgrounds, plus spot-color clothing and props (red hoodie, green money).
3. **Kinetic keyword captions:** bold all-caps sans, white fill with a heavy black stroke, a single word synced to the voice.
4. **Hand-drawn red marker circles, arrows and boxes** to highlight UI elements and numbers.
5. **Cut rhythm:** 1.5–3 s cuts in the hook (0:00–2:06), then long screen-recording holds of 8–25 s and more. Hard cuts are over 90% of joins. There are occasional snap zooms and one or two iris wipes.
6. **Balance:** about 20% finished animation, about 80% real screen demos (Google Docs → ChatGPT → Google Flow → ElevenLabs → CapCut). Dark-mode UIs are shown full screen, and the cursor clicks real controls.
7. **Overlays:** CRT scanlines and vignette on some sections, meme reaction cutaways, a 3D-tilted capture of a YouTube channel page.
8. **Hook content:** a third-party channel's view and subscriber counts (Day One Films), plus the creator's own revenue/subscriber dashboard. ElevenLabs was shown with an "Eleven v4" model label. **The narration says Claude can be used as the chatbot, but the demo uses ChatGPT.**

**Our adaptation (decision, documented once):**

| Reference trait | Adopt? | How we use it |
|---|---|---|
| Example first, payoff at end | **Yes** | 01A–01D opening; Sequence 19 payoff |
| Stickman characters, mostly white/paper ground, spot color | **Yes (you chose the stickman hybrid)** | Noah and Mila become ink-line stick figures that keep the brief's clothing colors and notebook (§2) |
| Watercolor wash backgrounds (thumbnail) | **Yes, restrained** | Pre-made static wash textures behind ink-line sets in the example film only |
| Bold keyword captions with stroke | **Yes, adapted** | 2–6-word emphasis labels in Nunito 900, charcoal on paper, or white with a 6 px charcoal stroke over animation. **Not** one word per cut. |
| Hand-drawn marker circles/arrows | **Yes, recolored** | Pre-authored SVG "marker ring" and arrow, cobalt (active) or amber (problem), drawn on over 10 f |
| Real screen demos, full screen, real clicks | **Yes** | Real captures in 06, 07, 08, 09, 10, 15, 17, 18. Rounded frame and shadow. Click ring on real clicks only. |
| 1.5–3 s cuts / 8–25 s screen holds | **No, the brief's grid wins** | 97 shots of 3–7 s. Long screen actions become several 4–6 s crops of the same real capture. |
| Hard cuts as default, rare iris wipe | **Yes** | Straight cuts and match cuts. Iris wipe used **only** at 19A→19B (into the film) and 19E→19F (back to the tutorial). The opening uses a pull-back into a player frame instead. |
| CRT scanlines, vignette, 3D tilt | **No** | Hurts readability and conflicts with §5C's clean geometry |
| Meme/actor reaction cutaways | **No** | Licensing risk; not original |
| Views, subscriber counts, revenue screens | **No** | The brief forbids invented or performance claims. Reference cards show names, handles and links only. |
| Vertical 9:16 example in a center frame | **Adapted** | Our example film is 16:9 and is revealed inside a "player frame" (01D, 18C–E) |

**REFERENCE_STYLE (short form, used in every shot prompt):**
> R1 example-first · R2 one idea per shot, readable demo crop · R3 ink-line stickman cast on paper, spot color · R4 bold 2–6-word keyword label · R5 hand-drawn marker ring/arrow on the exact element · R6 straight/match cuts, iris only at film↔tutorial · R7 real UI, real clicks, honest time-lapse.

Each shot below names the R-principle it applies.

---

## 1. Concept and packaging

- **Title:** How to Create Videos Like Ifverse with Claude Opus 5.5 (Full Workflow)
- **Alternatives:** How to Recreate This Animated YouTube Format with AI · How to Build a Faceless Animation Workflow with Claude · Claude Opus 5.5 Animation: From Script to Finished Video
- **Viewer promise:** "Take one original idea all the way to a finished animated video. Script, voice, consistent characters, coded animation, sound, export. Then try one scene yourself."
- **Thumbnail brief** (a design brief, not a generation request): paper #F4F1EB ground. Left: one plain script page with three grey lines and one cobalt-highlighted line. Right: stickman Noah in his terracotta jacket, holding the blue notebook, inside a rounded 16:9 video frame on a soft café wash. A thick cobalt arrow runs left → right. Text "SCRIPT → VIDEO" in Nunito 900 charcoal, about 18% of frame height. A small cobalt rounded badge, "Claude workflow", in white Nunito 800. Check legibility at 168×94 px.

---

## 2. STYLE_CONTEXT: locked palette, type, motion, characters

Paste this block (or reference the file `docs/style-context.md`) with every shot prompt.

```
STYLE_CONTEXT v1 (locked after the prototype)
Canvas 1920x1080, 16:9, 30 fps. Safe margin 100 px. End frames exclusive.
TUTORIAL palette: paper #F4F1EB, charcoal #16202A, cobalt #455CF5 (active step),
  mint #3ECF8E (completed result), amber #F6B344 (needs correction).
  Status is never color-only: always paired with an icon or word (✓ Done, ! Fix, ▶ Now).
EXAMPLE-FILM palette: paper white #FBFAF7, ink #1B1B1F, terracotta jacket #C8643B,
  cream shirt #F3E6CC, trousers #2B2F3A, notebook blue #2E64B8 (deliberately not cobalt),
  Mila sweater muted green #7FA387, café wash ochre #E9C98B @40%, wood #B98A5E,
  wall #EFE6D8, memory tint lilac #B9B3D9 @35% with a 3 px dashed ink border.
TYPE: Nunito (SIL OFL, Google Fonts), two weights: 700 body/labels, 900 titles/keywords.
  Titles 72–88 px, section labels 48–56 px, body 38–44 px. Over animation: white fill + 6 px #16202A stroke.
  Exception: reconstructed code cards (always tagged "Illustration") use JetBrains Mono 500.
CARDS: radius 24 px, 2 px charcoal outline at 12% opacity, shadow 0 12 32 rgba(22,32,42,.12).
  Real captures: radius 20 px frame, same shadow, a 1-line source caption 28 px when relevant.
MARKER RING / ARROW: pre-authored SVG paths (no runtime randomness), 8 px stroke, round caps,
  draw-on via strokeDashoffset over 10 f, ease ENTER. Cobalt = look here, amber = problem.
CURSOR: 48 px high-contrast arrow (white with charcoal outline); click ring 60→110 px over 8 f,
  only on real clicks. Field highlight: cobalt @14% rounded rect behind the active field.
EASING (only these): ENTER = bezier(0.16,1,0.3,1), 8–12 f · EXIT = bezier(0.7,0,0.84,0), 6–8 f ·
  MOVE/CAMERA = bezier(0.65,0,0.35,1) · SETTLE = spring({damping:200}) for characters only (no overshoot).
  Stagger related items by 3 f. Hold short labels ≥ 1.5 s (45 f).
TRANSITIONS: straight cut by default; match cut where a shape carries across; iris wipe 10 f only at
  19A→19B and 19E→19F. Never a whoosh on every cut.
DETERMINISM: everything is driven by useCurrentFrame()/interpolate(); random() only with fixed seeds;
  no wall-clock time, CSS animations or Math.random(). Each shot is a <Sequence> with explicit
  from/durationInFrames taken from shots.ts.
```

### 2.1 Character sheet: stickman hybrid (applies to Layer B and to tutorial illustrations of the cast)

**NOAH** (hero, the "you" of the example film)
- Height unit **H** = full standing height. Head is a white circle, diameter **0.26 H**, with an ink outline.
- Hair: a short dark tuft cap covering the top 30% of the head, three rounded points, ink #1B1B1F.
- Face: two dot eyes (0.018 H) on the head's horizontal center line, two short eyebrow strokes (these carry expression), and a single-stroke mouth. No nose.
- Body: an ink stroke spine. **Terracotta jacket** = a rounded trapezoid over the torso, 0.30 H tall, with a cream shirt V-collar. Arms are 2-segment ink strokes (upper and forearm, 0.17 H each) ending in a round hand dot (0.03 H) that sits outside the sleeve cuff.
- Trousers: legs are 2-segment strokes in #2B2F3A at 1.6× limb width. Feet are small rounded ink ovals.
- Stroke width: limbs and outline = **0.010 H**, constant inside a shot.
- **Blue notebook:** a rounded rectangle 0.10 H × 0.13 H, notebook blue #2E64B8, a cream elastic band at 75% of its width, a 2 px darker spine. It never changes size relative to H.
- Rig groups (SVG `<g>` with fixed pivots): head (neck pivot), torso, L/R upper arm (shoulder), L/R forearm (elbow), hands, L/R thigh (hip), L/R shin (knee). The hand position is computed from the forearm angle, so **it can never detach**.
- Poses library: neutral, sit, notice (head turn 12°), reach-anticipation (lean back 4°), reach, touch, open, react-soft, point, concerned (brows angled 18°, shoulders up 0.01 H), listen (lean toward Mila 6°).

**MILA** (friend)
- Same rig, scaled to **0.96 H**. **Muted green sweater** #7FA387 (a rounded torso shape, slightly longer than Noah's jacket), cream cuffs.
- Hair: a chin-length bob silhouette in ink, a small notebook-blue hair clip on the left (a visual link, not a second notebook).
- Personality in posture: an open, expressive hand. Her signature habit is tapping the table twice when she wants Noah's attention (the planted relationship detail; final wording comes from the approved script).

**Continuity rules:** clothing, H-ratios, stroke width and notebook shape are identical in every shot. Eyelines must point at the actual subject. Feet and seat stay grounded. Contact frames are anchored to the prop's coordinates.

### 2.2 Sets (Layer B)
- **Café** (built from 4 layers, used in 01, 04, 12–17, 19):
  - L0 sky: a pale wash, two or three large cloud shapes drifting ≤ 6 px/s.
  - L1 back wall and two tall windows: ink lines plus wall wash.
  - L2 action plane: round wooden table, two chairs, cups. Characters live here.
  - L3 foreground: a potted plant at the left edge.
  - Parallax ratios for camera moves: L0 0.2, L1 0.5, L2 1.0, L3 1.4.
- **Memory panels:** rounded 16:10 cards with a lilac tint and a dashed ink border, showing past scenes in the same ink style. Shown at least: M1 Mila laughing at the same table (past summer), M2 a rainy bus stop, M3 Noah writing in the notebook.
- **Washes:** pre-rendered static PNG textures (2× resolution) placed under ink layers. No live noise filters.

### 2.3 Tutorial visual system (Layer A)
- **Reusable components:** `TopicCard`, `StoryCard`, `RouteMap` (2 rows × 5), `ProgressStrip` (top-left, 10 dots), `CaptureFrame`, `MarkerRing`, `MarkerArrow`, `KeywordLabel`, `PlayerFrame`, `SceneTable` (Start/End/Spoken beat/Visible action; 3 rows max), `TrackLanes` (Voice/Action/Text and Voice/Ambience/Effects/Music), `Waveform` (built only from real audio data via @remotion/media-utils), `CheckStrip` (Picture/Voice/Timing), `EndScreen`.
- **Composition rotation:** full-screen demo → split screen → diagram interlude. Never more than two consecutive shots of the same layout type.

---

## 3. Model and effort map (per the brief; you select it with `/model` and `/effort`, not with prompt text)

- **Set up first in Opus 5.5 · High:** STYLE_CONTEXT, the Noah/Mila rig, sets, all shared components, and the 15–20 s prototype (§9).
- **Opus 5.5 · High:** sequences 01, 04, 06, 08–19. For a stubborn motion or timing bug, try **xhigh** once, then return to High.
- **Optional Sonnet 5.5 · Medium** (only after the components are locked): 02, 03, 05, 07, 20. **One override: 07E → Opus 5.5 · High**, because it introduces three new consequence thumbnails.
- **Build-order dependency:** `Waveform` is created in Sequence 10 (Opus) before 05B (Sonnet) reuses it.
- **Simplest option:** stay on Opus 5.5 · High for all 97 shots. If a listed model is unavailable, use the Opus model the session actually shows and record the substitution in `docs/state.md`.

---

## 4. Tutorial narration (Layer A): annotated by shot

Voice A, first person, friendly, confident, not salesy. **Budget:** about 1,000 spoken words. Non-narrated time is set aside for example playback (01A–01C ≈ 10 s, 10C ≈ 3 s, 14B/15A/15D/16A/16E listening ≈ 12 s, 19B–19E ≈ 22 s, end hold ≈ 2 s), about 49 s total. That leaves roughly 431 s of narrated time, so 1,000 words is about 139 wpm on average. The brief's 145–160 wpm is the delivery speed inside segments; the pauses absorb the rest. Measure the real recording and retime (§10).
`⟂` marks where a sentence continues across a cut. **[B]** marks Example-Film audio (Voice B), which is not part of the tutorial payload.

**Seq 01 — Show the outcome**
- 01A — *(no tutorial narration; café ambience)*
- 01B — *(no tutorial narration; paper sound on contact)*
- 01C — **[B]** *provisional, to be replaced by the approved script line:* "You can replay any day you've ever lived... in perfect detail."
- 01D — "This little film started as a plain script. ⟂"

**Seq 02 — State the promise**
- 02A — "⟂ In this video, we'll take one original idea ⟂"
- 02B — "⟂ shape it into a story with one clear rule, ⟂"
- 02C — "⟂ turn that story into scenes that actually make sense, ⟂"
- 02D — "⟂ and finish with a real video file. Claude plans and codes it, Remotion renders it, and ElevenLabs gives it a voice."

**Seq 03 — Identify the references**
- 03A — "First, the inspiration: three channels that make short, narrated animated stories."
- 03B — "Ifverse is our main reference. Every video asks: what if your own body or mind worked differently?"
- 03C — "Day One Films tells compact, emotional stories ⟂"
- 03D — "⟂ and so does Last Soul. We can see what they publish, not how they make it, so we borrow the format only."
- 03E — "Our story, our characters, and our visuals are all original."

**Seq 04 — Explain the repeatable format**
- 04A — "This format has four ingredients. One clear question: what if you remembered every single day?"
- 04B — "A consequence you can see: Noah's memories keep pulling him out of the present."
- 04C — "An emotional choice, between the past and the friend in front of him."
- 04D — "And a payoff that calls back to the start: this blue notebook."

**Seq 05 — Show the workflow map**
- 05A — "Here's the whole route. Pick a topic, write the script, and check the facts."
- 05B — "Then record the voice, and plan scenes from it."
- 05C — "Next: characters, motion, and sound."
- 05D — "Finally, review and export. The story and voice are finished before we animate."

**Seq 06 — Set up the real tools**
- 06A — "Three tools, three jobs."
- 06B — "Claude writes the code, Remotion turns it into video, and ElevenLabs makes the voice. Remotion's official guide covers the setup."
- 06C — "These commands create a blank project, add Remotion's skills for coding agents, and start the preview."
- 06D — "In a second terminal, open Claude Code inside the same project folder."
- 06E — "Now Claude edits the files, and you watch every change here."

**Seq 07 — Choose the topic**
- 07A — "Let's start with the idea. I paste the topic prompt into Claude."
- 07B — "Its key rule: change exactly one thing about your body or mind, and push it to an extreme."
- 07C — "Claude sends back titles. Pick one that could carry a whole story."
- 07D — "I chose: what if you remembered every single day?" *(If this exact title is not in Claude's real list, say instead: "Inspired by these, I picked: what if you remembered every single day?")*
- 07E — "It has real consequences, and it can hang on one small relationship detail."

**Seq 08 — Build the example script**
- 08A — "Next, the script prompt. I add the topic and three story anchors: Noah, his friend Mila, and a blue notebook."
- 08B — "Claude writes the full example film; we'll only show pieces here."
- 08C — "First, find the rule. Noah can relive the past, but he can never predict or change it."
- 08D — "Then find the choice: the past, or the friend right in front of him."
- 08E — "Hook, rule, consequences, choice, callback. That's the story's spine."

**Seq 09 — Check the factual claims**
- 09A — "Before recording, check the facts. The power is fiction, so we label it as the story premise."
- 09B — "But the script also makes real claims, like this one about people with unusually detailed memory."
- 09C — "So find a reliable source, ideally the original research ⟂"
- 09D — "⟂ and change the wording until it says only what that source supports."
- 09E — "Claims checked, premise labelled. Now the script is ready for a voice."

**Seq 10 — Make the voiceover with ElevenLabs**
- 10A — "In ElevenLabs, paste only the spoken words. No headings, no notes."
- 10B — "Choose one voice and one model, and keep them for the whole film."
- 10C — "Listen to a short sample first." → **[B]** sample plays (≈3 s), e.g. "Your name is Noah. And you remember... every single day."
- 10D — "When it sounds right, generate the narration and save the real audio file."
- 10E — "Those pauses now set the rhythm. Every cut we plan will follow this recording."

**Seq 11 — Convert speech into scenes**
- 11A — "The script is one long paragraph, but animation needs short beats."
- 11B — "So split it wherever the action or meaning changes. Each beat gets a start, an end, the words, and one visible action."
- 11C — "When the narration moves on, the picture moves on too."
- 11D — "Every beat links one spoken line to one thing we can see."
- 11E — "Line them up over the audio, and you have a timeline. A sentence can run across a cut; the voice stays continuous."

**Seq 12 — Lock the characters**
- 12A — "Now, the characters. This is Noah."
- 12B — "Three things never change: his terracotta jacket, his proportions, and his blue notebook."
- 12C — "Claude builds him from reusable parts, so a new pose is the same Noah doing something new."
- 12D — "His expression can change. His design can't."
- 12E — "Mila follows the same rules, so both stay in scale in every scene."

**Seq 13 — Build the environments**
- 13A — "Next, the place. Every scene is built in layers."
- 13B — "At the back: the windows, the wall, and a slow sky."
- 13C — "In the middle: the action layer, where the characters sit and move."
- 13D — "And in front, the foreground. When the camera moves, near things shift more than far ones. That creates depth."
- 13E — "Put the layers back together, and the same style works inside a memory too."

**Seq 14 — Animate meaningful action**
- 14A — "Now, motion with a purpose. Noah is about to open his notebook."
- 14B — "Watch for five beats: notice, reach, touch, open, react." *(action then plays without narration)*
- 14C — "The hand stays attached and really touches the cover. Nothing floats."
- 14D — "Anticipation before the move, contact in the middle, and a small settle at the end."
- 14E — "And every movement belongs to the line it sits under."

**Seq 15 — Synchronize action and voice**
- 15A — "Here's a timing mistake. Watch the notebook." *(draft plays)*
- 15B — "It opens before the words describing it. Find that phrase in the waveform."
- 15C — "Ask Claude to move the action onto that cue. The audio itself doesn't change."
- 15D — "Now play it again." *(corrected version plays)*
- 15E — "Same voice, same drawing. Only the timing changed, and now it feels right."

**Seq 16 — Add sound with restraint**
- 16A — "Next, sound. Here's the voice on its own." *(voice-only sample plays)*
- 16B — "Add quiet café ambience, and the room feels real."
- 16C — "Then one paper sound, exactly when the cover opens."
- 16D — "And a soft music bed that dips whenever someone speaks."
- 16E — "Here's the full mix. The voice still leads." *(mix plays)*

**Seq 17 — Review and fix one problem**
- 17A — "Now review the draft at normal speed, and look for problems."
- 17B — "Here's one: during the reach, Noah's hand drifts off the notebook." *(Use the actual issue found in production; rewrite this line to match it.)*
- 17C — "Describe the fix precisely: what's wrong, what should happen, and what must stay the same."
- 17D — "Claude edits the component, and we wait for the preview to update."
- 17E — "Same shot, same timing. Now the hand stays on the cover."
- 17F — "Because we fixed the arm itself, every shot that reuses it improves too."

**Seq 18 — Export and inspect the file**
- 18A — "When review passes, check the render settings you actually chose."
- 18B — "Run the render and let it finish. We'll skip ahead."
- 18C — "Then open the actual file."
- 18D — "Check the beginning, the middle, and the end: picture, voice, and timing."
- 18E — "All three pass."

**Seq 19 — Show the finished example**
- 19A — "Here's the finished scene."
- 19B–19E — **[B]** ≈20 s of approved example-film audio, no tutorial narration. *Provisional excerpt, replace with the final script:* "Mila is telling you about her week. But you're somewhere else. A Tuesday, three summers ago... this same table. Same laugh. Then two taps on the table. Noah... are you even here? You look at the notebook. And you close it. For the first time in weeks... you listen."
- 19F — "One script, one voice, and one consistent world."

**Seq 20 — Make the workflow reusable**
- 20A — "That's one finished example."
- 20B — "For your next video, change the topic, rewrite and check the script, record the voice, and retime the scenes."
- 20C — "So which ability would you try next? Tell me in the comments." *(Add "The prompts are linked in the description." only if they really are.)*
- 20D — "Thanks for watching."

---

## 5. ElevenLabs-ready speech (paste-ready; no IDs, headings or directions inside the text)

**Recording brief:**
- **Voice A (tutorial):** one licensed ElevenLabs narrator voice. Clear English, warm, confident, conversational. Pick it by listening; record the voice name and ID from the UI in `docs/narration-manifest.json`.
- **Voice B (example film):** a different licensed voice so the two layers are audibly distinct. Slightly lower and more intimate, cinematic second person.
- **Model:** start with **Eleven Multilingual v2** if the account lists it. Also A/B test one newer model the account offers (the reference's UI showed an "Eleven v4" label; check what your account actually lists). Keep the winner for every segment.
- **Settings:** default speed first; keep stability and similarity identical across all segments. No special pause or emotion markup until the chosen model's supported controls have been checked.
- **Segments:** generate in the chunks below (20–40 s each), at paragraph boundaries. After each, measure the real duration. Regenerate only the segments that fail a listening check.
- **Pronunciation:** "Remotion" = reh-MOH-shun; "ElevenLabs" as one word; "Ifverse" = IF-verse; "Neurocase" only if used. Write any respelling in the manifest, not in the payload.

**Tutorial Narration (Voice A)**

`TUT-01` (seq 01–02)
```
This little film started as a plain script. In this video, we'll take one original idea, shape it into a story with one clear rule, turn that story into scenes that actually make sense, and finish with a real video file. Claude plans and codes it, Remotion renders it, and ElevenLabs gives it a voice.
```
`TUT-02` (seq 03)
```
First, the inspiration: three channels that make short, narrated animated stories. Ifverse is our main reference. Every video asks: what if your own body or mind worked differently? Day One Films tells compact, emotional stories, and so does Last Soul. We can see what they publish, not how they make it, so we borrow the format only. Our story, our characters, and our visuals are all original.
```
`TUT-03` (seq 04–05)
```
This format has four ingredients. One clear question: what if you remembered every single day? A consequence you can see: Noah's memories keep pulling him out of the present. An emotional choice, between the past and the friend in front of him. And a payoff that calls back to the start: this blue notebook. Here's the whole route. Pick a topic, write the script, and check the facts. Then record the voice, and plan scenes from it. Next: characters, motion, and sound. Finally, review and export. The story and voice are finished before we animate.
```
`TUT-04` (seq 06)
```
Three tools, three jobs. Claude writes the code, Remotion turns it into video, and ElevenLabs makes the voice. Remotion's official guide covers the setup. These commands create a blank project, add Remotion's skills for coding agents, and start the preview. In a second terminal, open Claude Code inside the same project folder. Now Claude edits the files, and you watch every change here.
```
`TUT-05` (seq 07)
```
Let's start with the idea. I paste the topic prompt into Claude. Its key rule: change exactly one thing about your body or mind, and push it to an extreme. Claude sends back titles. Pick one that could carry a whole story. I chose: what if you remembered every single day? It has real consequences, and it can hang on one small relationship detail.
```
`TUT-06` (seq 08)
```
Next, the script prompt. I add the topic and three story anchors: Noah, his friend Mila, and a blue notebook. Claude writes the full example film; we'll only show pieces here. First, find the rule. Noah can relive the past, but he can never predict or change it. Then find the choice: the past, or the friend right in front of him. Hook, rule, consequences, choice, callback. That's the story's spine.
```
`TUT-07` (seq 09)
```
Before recording, check the facts. The power is fiction, so we label it as the story premise. But the script also makes real claims, like this one about people with unusually detailed memory. So find a reliable source, ideally the original research, and change the wording until it says only what that source supports. Claims checked, premise labelled. Now the script is ready for a voice.
```
`TUT-08a` (seq 10, before the sample)
```
In ElevenLabs, paste only the spoken words. No headings, no notes. Choose one voice and one model, and keep them for the whole film. Listen to a short sample first.
```
`TUT-08b` (seq 10, after the sample)
```
When it sounds right, generate the narration and save the real audio file. Those pauses now set the rhythm. Every cut we plan will follow this recording.
```
`TUT-09` (seq 11)
```
The script is one long paragraph, but animation needs short beats. So split it wherever the action or meaning changes. Each beat gets a start, an end, the words, and one visible action. When the narration moves on, the picture moves on too. Every beat links one spoken line to one thing we can see. Line them up over the audio, and you have a timeline. A sentence can run across a cut; the voice stays continuous.
```
`TUT-10` (seq 12–13)
```
Now, the characters. This is Noah. Three things never change: his terracotta jacket, his proportions, and his blue notebook. Claude builds him from reusable parts, so a new pose is the same Noah doing something new. His expression can change. His design can't. Mila follows the same rules, so both stay in scale in every scene. Next, the place. Every scene is built in layers. At the back: the windows, the wall, and a slow sky. In the middle: the action layer, where the characters sit and move. And in front, the foreground. When the camera moves, near things shift more than far ones. That creates depth. Put the layers back together, and the same style works inside a memory too.
```
`TUT-11` (seq 14)
```
Now, motion with a purpose. Noah is about to open his notebook. Watch for five beats: notice, reach, touch, open, react. The hand stays attached and really touches the cover. Nothing floats. Anticipation before the move, contact in the middle, and a small settle at the end. And every movement belongs to the line it sits under.
```
`TUT-12` (seq 15, three takes split at the playback gaps; keep them as separate files)
```
Here's a timing mistake. Watch the notebook.
```
```
It opens before the words describing it. Find that phrase in the waveform. Ask Claude to move the action onto that cue. The audio itself doesn't change. Now play it again.
```
```
Same voice, same drawing. Only the timing changed, and now it feels right.
```
`TUT-13` (seq 16)
```
Next, sound. Here's the voice on its own.
```
```
Add quiet café ambience, and the room feels real. Then one paper sound, exactly when the cover opens. And a soft music bed that dips whenever someone speaks. Here's the full mix. The voice still leads.
```
`TUT-14` (seq 17; rewrite the second sentence to match the real defect)
```
Now review the draft at normal speed, and look for problems. Here's one: during the reach, Noah's hand drifts off the notebook. Describe the fix precisely: what's wrong, what should happen, and what must stay the same. Claude edits the component, and we wait for the preview to update. Same shot, same timing. Now the hand stays on the cover. Because we fixed the arm itself, every shot that reuses it improves too.
```
`TUT-15` (seq 18–19A)
```
When review passes, check the render settings you actually chose. Run the render and let it finish. We'll skip ahead. Then open the actual file. Check the beginning, the middle, and the end: picture, voice, and timing. All three pass. Here's the finished scene.
```
`TUT-16` (seq 19F–20)
```
One script, one voice, and one consistent world. That's one finished example. For your next video, change the topic, rewrite and check the script, record the voice, and retime the scenes. So which ability would you try next? Tell me in the comments. Thanks for watching.
```

**Word count (measured on this plan's payload blocks):** ≈1,050 words, the top of the brief's 950–1,050 budget. If the real recording runs long, trim candidates are 03D's second sentence, 11D, and 13D's last sentence.

**Example Film Narration (Voice B):** a separate script and track. The full 900–1,050-word script is produced in production by running the SCRIPT prompt (§7, P2) on screen in Sequence 08, then fact-checked (P3). The provisional excerpt lines in §4 (01C, 10C, 19B–E) are placeholders only; they will be replaced by lines from the approved script and recorded with Voice B, in the same model and settings throughout.

---

## 6. Detailed storyboard: 20 sequences, 97 shots

**Conventions:**
- Frames are at 30 fps; the end frame is exclusive; total **f0–14400** with no gaps or overlaps.
- Narration words per shot are in §4. "Cue" names the word or event an action locks to.
- **Assets:** nothing in this list exists yet unless marked EXISTS. CAP = real screen capture to record during production. ILL = original illustration or component to build. AUD = real audio file.
- All timings are **provisional until the narration is measured** (§10). Retime by moving shot boundaries in `shots.ts` and logging every change in the Timing Log (§10).
- In the storyboard, "Text" means the exact on-screen emphasis text.
- Global time = frame ÷ 30. For example, f450–570 = 00:15.0–00:19.0.

### Seq 01 — Show the outcome (00:00–00:15 · f0–450) · Opus 5.5 High
| Shot | Visible / composition / action (R) | Text | Assets | Sound · Cue | Cut in → out |
|---|---|---|---|---|---|
| **01A** 00:00–00:03 · f0–90 | Café wide, all 4 layers. Mila (left) mid-sentence with an open hand. Noah (right) listening, notebook on the table by his right hand. At f45 Noah's eyeline shifts from Mila to the notebook (head 12°, 6 f MOVE). Static camera. (R1, R3) | Pill "Worked example", top-left, 32 px, enters f15 | ILL café L0–L3, Noah, Mila, notebook | Café ambience fades in f0–15 · cue: eyeline at f45 | Cold open on picture → straight cut on the eyeline |
| **01B** 00:03–00:06 · f90–180 | Close-up of hand and notebook. Anticipation f90–105, reach f105–120, **contact f120**, cover opens 0→35° f126–150 (hinge on the spine). Push 1.00→1.06 across the whole shot (MOVE). (R3) | none | ILL Noah arm/hand close rig, notebook open states | Paper sound **at f120 contact** | ← eyeline match → cut wider |
| **01C** 00:06–00:10 · f180–300 | Medium-wide, Noah 3/4 view. Memory panels M1–M3 enter behind him (layer L1) along a gentle arc at f200/205/210 (5 f = 0.15 s apart), ENTER 10 f. Noah's silhouette stays fully clear of the panels. (R3) | none | ILL memory panels M1–M3 | **[B]** example-film line f210–290; ambience continues | ← cut on cover opening → hold |
| **01D** 00:10–00:15 · f300–450 | f300–330: the film frame scales 1.0→0.62 into a PlayerFrame on paper (MOVE). f360: straight cut to a split. Left: 3 readable lines of the example script. Bottom: a mini scene timeline with 3 thumbnails (01A–01C) linked by a line. f372: "SCRIPT → VIDEO" enters. (R1, R4) | SCRIPT → VIDEO (88 px) | ILL PlayerFrame, script page (real script lines once approved), mini timeline | Ambience out f300–330. Tutorial music bed in f330. TUT-01 starts ≈f318 | ← pull-back → straight cut to 02A |

### Seq 02 — State the promise (00:15–00:35 · f450–1050) · Sonnet 5.5 Medium (optional)
| Shot | Visible / composition / action (R) | Text | Assets | Sound · Cue | Cut in → out |
|---|---|---|---|---|---|
| **02A** f450–570 | TopicCard fills about 70% of the frame: "What If You Remembered Every Single Day?", small IDEA tag. A document silhouette sits at the left edge, matching where 01D's script page was. (R2, R4) | One original idea | ILL TopicCard | Soft tick as the card settles · cue "idea" | ← straight → straight |
| **02B** f570–720 | Story document, 4 lines of the example script at 40 px. Only the rule line gets the cobalt field highlight at the cue. (R2) | A usable story | ILL StoryDoc (real lines once approved) | Soft paper · cue "rule" | ← straight → match (thumbnail) |
| **02C** f720–870 | Split. Left: storyboard thumbnail of Noah reaching. Right: the same framing animated (reuse the 14B reach clip, 1.5 s). The thumbnail match-scales into the right panel. (R3) | Scenes that make sense | ILL thumbnail; reuse of the Noah reach clip | none · cue "scenes" | ← match cut → straight |
| **02D** f870–1050 | Document left, output frame right. Four labeled objects reveal left→right with a 6 f stagger (recap of the named steps). The connector line draws f960–990, then one cobalt dot travels document→video f990–1035. "Full workflow" sits small below. Hold. (R2, R4) | Idea · Story · Scenes · Video / Full workflow | ILL RouteMap-mini, icons | 4 subtle ticks + one settle | ← straight → "Idea" object expands into 03A |

### Seq 03 — Identify the references (00:35–01:00 · f1050–1800) · Sonnet 5.5 Medium (optional)
| Shot | Visible / composition / action (R) | Text | Assets | Sound · Cue | Cut in → out |
|---|---|---|---|---|---|
| **03A** f1050–1170 | Three reference cards in a row (single ENTER, 3 f stagger). Each card: channel name 48 px, handle 38 px, URL 28 px. **No counts or metrics.** If real captures are used, crop to banner, name and handle only, and add "Captured YYYY-MM-DD". (R2) | Reference channels | Card text from the registry: EXISTS. CAP optional | Light UI tick | ← expand from 02D → straight |
| **03B** f1170–1320 | Ifverse card enlarged and centered, the other two shrunk and dimmed. Cobalt MarkerRing draws around "@ifversetales" at the cue. (R5) | Ifverse · @ifversetales | as above | none · cue "Ifverse" | straight |
| **03C** f1320–1470 | Day One Films card centered. Optional: one real credited video title crop (title text only, no views). (R2) | Day One Films · @dayonefilmsofficial | CAP optional (title only) | none · cue "Day One Films" | straight |
| **03D** f1470–1620 | Last Soul card centered, URL legible. (R2) | Last Soul · @lastsoulorigin | as above | none · cue "Last Soul" | straight |
| **03E** f1620–1800 | Reference cards EXIT (7 f). Noah and Mila (neutral poses) plus our TopicCard ENTER from the right. A small "Original" stamp sits in the corner. (R3) | Original story · Original visuals | ILL Noah, Mila, TopicCard | Soft settle | ← straight → straight to 04A |

### Seq 04 — Explain the repeatable format (01:00–01:20 · f1800–2400) · Opus 5.5 High
| Shot | Visible / composition / action (R) | Text | Assets | Sound · Cue | Cut in → out |
|---|---|---|---|---|---|
| **04A** f1800–1920 | Paper ground. Noah standing at the left third. A large ink "?" at the right third draws on over 12 f. Noah's head tilts toward it (8°). (R3, R4) | One clear question | ILL Noah, ink "?" | none · cue "question" | ← straight → straight |
| **04B** f1920–2070 | Café two-shot. Mila talking (mouth cycle). Memory panel M1 appears top-right and Noah's head turns to it (12°). A cobalt MarkerArrow runs panel → Noah's eyes, then the result label. (R3, R5) | A visible consequence | ILL café, M1, arrow | none · cue "consequence" | straight |
| **04C** f2070–2220 | Noah facing Mila, notebook on the table between them. Background washes fade to 40% so the trio reads clearly. Noah's eyes go notebook → Mila (f2160), with no resolution yet. (R3) | An emotional choice | ILL café simplified | none · cue "choice" | straight |
| **04D** f2220–2400 | Close-up of the notebook f2220–2280. Then a **match cut** on the notebook shape → a notebook icon in a 4-card strip (Question, Consequence, Choice, Payoff) with a curved callback arrow Payoff→Question. At f2370 the strip compresses into a "Format" card. (R3, R6) | A payoff / Format | ILL story cards, notebook icon | One understated accent at f2290 | ← straight → Format card docks into 05A |

### Seq 05 — Show the workflow map (01:20–01:40 · f2400–3000) · Sonnet 5.5 Medium (optional; build after Seq 10's Waveform)
| Shot | Visible / composition / action (R) | Text | Assets | Sound · Cue | Cut in → out |
|---|---|---|---|---|---|
| **05A** f2400–2520 | Three large nodes: Topic → Script → Check, each revealed on its spoken word, arrows drawn after each. (R2, R4) | Topic → Script → Check | ILL RouteMap nodes/icons | 3 clicks | ← dock → straight |
| **05B** f2520–2670 | Waveform from **real** audio on the left, three scene cards on the right, connector lines. (R2) | Voice → Scenes | AUD (real ElevenLabs file), ILL scene cards | none · cue "voice" | straight |
| **05C** f2670–2820 | Characters (Noah thumbnail), Motion (arc icon), Sound (lane icon), with small examples under each label. (R3) | Characters → Motion → Sound | ILL thumbnails/icons | 3 clicks | straight |
| **05D** f2820–3000 | Review (magnifier) and Export (MP4 icon). Then pull back to the full 2×5 RouteMap at f2910, with an outputs strip underneath (script · audio · MP4). The active outline travels Topic→Export once (f2925–2980) and fades on Export; it re-enters at Topic in the ProgressStrip in 07A. (R2) | Review → Export | ILL RouteMap full | One quiet completion accent | ← straight → straight to real setup |

### Seq 06 — Set up the real tools (01:40–02:05 · f3000–3750) · Opus 5.5 High
| Shot | Visible / composition / action (R) | Text | Assets | Sound · Cue | Cut in → out |
|---|---|---|---|---|---|
| **06A** f3000–3090 | Three columns with text names (no logos unless their brand guidelines permit): Claude = Plan, Remotion = Animate, ElevenLabs = Narrate. (R2, R4) | Plan / Animate / Narrate | ILL label cards | none | ← straight → straight |
| **06B** f3090–3240 | CaptureFrame showing the real remotion.dev/docs/ai/coding-agents page, cropped to its command block. Cobalt underline on the active line only. URL caption. (R7) | Official setup | CAP docs page (date the capture) | none · cue "official guide" | straight |
| **06C** f3240–3450 **(7 s read hold)** | Real terminal, cropped so text is about 40 px tall. Visibly type and run, in order: `npx create-video --yes --blank my-video`, `cd my-video`, `npx remotion skills add`, `npm run dev`. Waiting time is shown with a "Sped up ×N" tag (real factor) or an honest cut. (R7) | Readable commands; "Sped up ×N" only if accelerated | CAP terminal | Natural keyboard, low | straight |
| **06D** f3450–3600 | A second real terminal: `cd my-video`, then `claude`. The Claude Code start screen is cropped to the project path. Use a clean demo path (for example `~/projects/my-video`); no account email or private paths visible. (R7) | Animation project | CAP terminal 2 | Keyboard, low | straight |
| **06E** f3600–3750 | Real Remotion Studio preview (already started by `npm run dev`) fills about 75% of the frame. A small Claude Code window inset sits bottom-right. Show it only after it really loaded. (R7) | Preview ready | CAP Studio + Claude Code | Natural · no fake success chime | ← straight → straight to 07A |

### Seq 07 — Choose the topic (02:05–02:30 · f3750–4500) · Sonnet 5.5 Medium (optional); **07E → Opus 5.5 High**
| Shot | Visible / composition / action (R) | Text | Assets | Sound · Cue | Cut in → out |
|---|---|---|---|---|---|
| **07A** f3750–3870 | Split. Left: the TOPIC prompt open in an editor (`prompts/topic.md`), cropped to its purpose and input. Right: the real Claude session input. ProgressStrip with Topic active. (R2, R7) | Choose one human ability | CAP editor + Claude session | none · cue "paste" | ← straight → crop in |
| **07B** f3870–4020 | Tighter crop on the rules. Cobalt highlight on "One change only", then "body or mind", then "real consequences", each on its spoken cue. Hold, no fast scroll. (R5) | One change | CAP same | none | crop → straight |
| **07C** f4020–4170 | Real Claude output, about 6 titles at 40 px. A slow scroll (≤ 120 px/s) only if needed. (R7) | Actual output | CAP Claude result | none · cue "titles" | straight |
| **07D** f4170–4320 | The chosen title is copied into a separate working doc `example-film/topic.md` and shown in full. (R7) | What If You Remembered Every Single Day? | CAP editor | Quiet selection click | straight |
| **07E** f4320–4500 | Three new ink thumbnails: (1) Noah distracted at the café by a memory; (2) Noah reliving a rainy bus-stop argument; (3) the notebook open at night. Plus the relationship hook: Mila's two-tap on the table. The selected card then slides into the script workspace. (R3) | Can it carry a story? | ILL 3 consequence thumbnails | none | ← straight → slide into 08A |

### Seq 08 — Build the example script (02:30–02:55 · f4500–5250) · Opus 5.5 High
| Shot | Visible / composition / action (R) | Text | Assets | Sound · Cue | Cut in → out |
|---|---|---|---|---|---|
| **08A** f4500–4620 | Real editor or Claude input: `TOPIC: [INSERT TOPIC HERE]` is replaced by typing the title, then the STORY ANCHORS block is pasted (P2 in §7). Real typing, or a "Sped up" tag. (R7) | Topic entered | CAP editor/Claude | Keyboard, low | ← slide → straight |
| **08B** f4620–4770 | Real output excerpt, 4–5 lines, cropped. A tag shows "Layer B · Example film". (R7) | Example-film script | CAP Claude result | Soft paper | straight |
| **08C** f4770–4920 | Cobalt MarkerRing around the rule sentence. A small icon pair: rewind ✓, fast-forward ✗. (R5) | The limiting rule | CAP + ILL icon pair | none · cue "rule" | straight |
| **08D** f4920–5070 | Split. Left: ink thumbnail of Noah between notebook and Mila. Right: the motivating sentence highlighted. (R3, R5) | The emotional choice | ILL thumbnail; CAP line | none · cue "choice" | straight |
| **08E** f5070–5250 | Five StoryCards: Hook · Rule · Consequences · Choice · Callback. A notebook icon is linked by a curved line to both Hook and Callback. Footnote: "900–1,050 words = full example film only". Hold. (R2, R4) | Hook · Rule · Consequences · Choice · Callback | ILL StoryCards | Paper movement | ← straight → precise cut to 09A |

### Seq 09 — Check the factual claims (02:55–03:20 · f5250–6000) · Opus 5.5 High
| Shot | Visible / composition / action (R) | Text | Assets | Sound · Cue | Cut in → out |
|---|---|---|---|---|---|
| **09A** f5250–5370 | A premise card with an open-book "fiction" icon: "You can replay any day you've lived, perfectly." (R4) | Story premise | ILL premise card | none | ← straight → straight |
| **09B** f5370–5520 | The real script line containing a factual claim, with an amber underline on the claim only. (R5) | Check this claim | CAP script | none · cue "real claims" | straight |
| **09C** f5520–5670 | Real source page, cropped to the relevant passage, cobalt underline, title and link caption. **Candidate source to verify in production:** Parker, Cahill & McGaugh (2006), "A Case of Unusual Autobiographical Remembering", *Neurocase* 12(1). Open it via the publisher or PubMed; if it can't be confirmed, use another verified source or mark the row "Needs verification". (R7) | Source + link | CAP source page | none | straight |
| **09D** f5670–5820 | Before/after: the original wording, then only the changed phrase replaced. Old text gets an amber strikethrough plus "! Revise"; the new text gets mint plus "✓ Supported". The final revision text comes from the real check. (R5) | Supported wording | CAP or ILL text card (tagged if illustrative) | none | straight |
| **09E** f5820–6000 | A Claim · Source · Wording table. Row 1 shows "✓ Verified" only after the check was actually done. Row 2: "Story premise: fiction". Any unresolved row: "Needs verification". The script doc then slides right toward 10A. (R2) | Verified only after checking | ILL table, real content | Soft check sound **after** evidence | ← straight → slide to 10A |

### Seq 10 — Make the voiceover with ElevenLabs (03:20–03:45 · f6000–6750) · Opus 5.5 High
| Shot | Visible / composition / action (R) | Text | Assets | Sound · Cue | Cut in → out |
|---|---|---|---|---|---|
| **10A** f6000–6120 | Real ElevenLabs Text to Speech UI, cropped to the text box holding the clean Voice B excerpt. No API keys or account details visible. (R7) | Spoken words only | CAP ElevenLabs | none | ← slide → crop |
| **10B** f6120–6270 | Close crop on the voice and model selectors, showing the real names as displayed. Cobalt MarkerRing on each. (R5, R7) | One voice · one model | CAP | none · cue "voice", "model" | straight |
| **10C** f6270–6420 | Real play click (click ring). Tutorial narration stops; the **[B]** sample plays for at least 3 s. (R7) | Listen first | CAP + AUD sample | Sample audio only | straight |
| **10D** f6420–6570 | The real saved file in the project, `public/audio/example-film/efn-01.mp3`, with its **measured** duration shown from file metadata. (R7) | Real narration file | CAP file browser/editor | none | straight |
| **10E** f6570–6750 | Script excerpt left, Waveform (real data) right. The phrase highlight follows timestamps from real alignment or transcription. Two pause bars sit at measured silences. (R2) | Voice sets the timing | AUD + alignment JSON | Short sample replay under narration (−18 dB) | ← straight → cut at a natural pause |

### Seq 11 — Convert speech into scenes (03:45–04:10 · f6750–7500) · Opus 5.5 High
| Shot | Visible / composition / action (R) | Text | Assets | Sound · Cue | Cut in → out |
|---|---|---|---|---|---|
| **11A** f6750–6870 | Up to 6 lines of the example paragraph at 40 px. The current spoken group is highlighted cobalt. (R2) | From text to beats | Real script text | none | ← straight → straight |
| **11B** f6870–7020 | SceneTable row 1 (Start · End · Spoken beat · Visible action) with real times, or times tagged "provisional", plus a thumbnail. Example: "Mila is telling you about her week." → Mila talks; Noah's eyes drift. (R2) | One idea per beat | ILL SceneTable, thumbnail | Tick | straight |
| **11C** f7020–7170 | Row 2 and its thumbnail (a memory panel appears), framed on the right half for a new crop. (R2) | A new action | as above | Tick · cue "moves on" | straight |
| **11D** f7170–7320 | Row 3 and its thumbnail (the two taps on the table). Thin connector lines link all three thumbnails. (R2) | Speech → visible action | as above | Tick | straight |
| **11E** f7320–7500 | The rows become timeline blocks over the real waveform, with shot-boundary ticks above. The playhead sweeps once. (R2) | Narration can cross cuts | AUD + ILL timeline | none | ← straight → first thumbnail (Noah) expands into 12A |

### Seq 12 — Lock the characters (04:10–04:35 · f7500–8250) · Opus 5.5 High
| Shot | Visible / composition / action (R) | Text | Assets | Sound · Cue | Cut in → out |
|---|---|---|---|---|---|
| **12A** f7500–7620 | Design sheet on paper. Noah neutral, full body, centered, H = 640 px, with a 1-frame-stable idle (no floating). (R3) | Meet Noah | ILL Noah rig | Soft drawing sound | ← expand → straight |
| **12B** f7620–7770 | Closer framing. Three leader-line callouts: Jacket, Proportions (0.26 H head tick marks), Notebook. (R3, R5) | Keep these consistent | ILL callouts | Quiet emphasis on "notebook" | straight |
| **12C** f7770–7920 | Neutral → point: 6 f anticipation, 18 f move, SETTLE. Rig groups (head, torso, arm) outline once in cobalt at 30% for 20 f. The hand stays joined. (R3) | Same design · New action | ILL rig pose "point" | none · cue "reusable parts" | straight |
| **12D** f7920–8070 | Concerned pose: brows 18°, shoulders up 0.01 H, a 2 s readable hold. Clothing, head size and stroke unchanged. (R3) | Expression changes | ILL pose "concerned" | none | straight |
| **12E** f8070–8250 | Café: Noah and Mila seated, scale bars at the side (H vs 0.96 H) for 1 s, eyelines meet. (R3) | Characters ready | ILL café, both rigs | none | ← straight → **match cut**: the notebook on the table stays in place as the characters cut out (13A) |

### Seq 13 — Build the environments (04:35–05:00 · f8250–9000) · Opus 5.5 High
| Shot | Visible / composition / action (R) | Text | Assets | Sound · Cue | Cut in → out |
|---|---|---|---|---|---|
| **13A** f8250–8370 | The empty café wide, stable perspective, the notebook still on the table. (R3) | Build the place | ILL café | Light room ambience | ← match → straight |
| **13B** f8370–8520 | Crop on L0/L1: windows, wall, 2–3 clouds drifting ≤ 6 px/s. (R3) | Background | ILL L0, L1 | none · cue "back" | straight |
| **13C** f8520–8670 | L2: table and chairs. Noah and Mila appear seated (8 f opacity in, no slide). Feet and chairs grounded. (R3) | Action space | ILL L2 + rigs | none · cue "middle" | straight |
| **13D** f8670–8820 | Plant at the frame edge. The camera trucks right 60 px over 60 f (MOVE). L3 moves 84 px, L0 12 px. Settles. (R3) | Foreground | ILL L3 | none · cue "near things" | straight |
| **13E** f8820–9000 | The full café recombined, plus an inset memory panel M1 in the same style with a lilac tint. (R3) | One consistent world | ILL café + M1 | Ambience | ← straight → straight cut on Noah's head turn |

### Seq 14 — Animate meaningful action (05:00–05:25 · f9000–9750) · Opus 5.5 High
| Shot | Visible / composition / action (R) | Text | Assets | Sound · Cue | Cut in → out |
|---|---|---|---|---|---|
| **14A** f9000–9120 | Café wide: Noah, with the notebook clearly placed on the table at his right. Small beat labels below. (R3) | Notice → Reach → Open | ILL café | Ambience low | ← head turn → straight |
| **14B** f9120–9270 | Split: wide left, close right. **5-second action, exactly 150 f:** 0–30 notice (eyeline), 30–60 anticipation (lean back 4°), 60–90 reach, **90–120 contact + cover opens**, 120–150 react + SETTLE. Beat labels Notice/Reach/Touch/Open/React light up cobalt in sync. Plays once. (R3) | Notice · Reach · Touch · Open · React | ILL rig action clip | Paper sound **at local f90 contact**, not during anticipation | straight |
| **14C** f9270–9420 | Close-up of hand and notebook. Hold the contact frame for 30 f, cobalt MarkerRing on the anchor point, then the action continues. (R5) | Contact matters | ILL close rig | none | straight |
| **14D** f9420–9570 | Three stills side by side (anticipation · contact · settle) with a timing line and frame numbers. No looping. (R2) | Anticipate · Contact · Settle | renders of 14B frames | none | straight |
| **14E** f9570–9750 | Back to the wide. The action plays with the real **[B]** line about opening the notebook (≈2.5 s), then the tutorial sentence. (R3) | Purposeful movement | AUD [B] line | Paper sound at contact | ← straight → beat labels slide onto 15A's Action track |

### Seq 15 — Synchronize action and voice (05:25–05:50 · f9750–10500) · Opus 5.5 High
| Shot | Visible / composition / action (R) | Text | Assets | Sound · Cue | Cut in → out |
|---|---|---|---|---|---|
| **15A** f9750–9870 | Preview on top (tagged "DRAFT · timing demo"), TrackLanes Voice/Action/Text below. The notebook opens about 12 f **before** its spoken phrase. (R2) | Draft timing | ILL TrackLanes, demo clip | Same **[B]** audio | ← slide → straight |
| **15B** f9870–10020 | Zoom on the Voice lane: real waveform, one cue marker at the phrase (from alignment). (R5) | Find the spoken cue | AUD + alignment | none | straight |
| **15C** f10020–10170 | Real capture: Claude Code edits the action's start (for example `openAt` frame X → measured cue frame), and the Remotion Studio timeline updates. (R7) | Move the action | CAP Claude Code + Studio | Soft click on the real edit | straight |
| **15D** f10170–10320 | The same preview tagged "REVISED"; the same audio replays. (R2) | Revised timing | demo clip v2 | Same **[B]** audio | straight |
| **15E** f10320–10500 | Two contact frames side by side at the identical audio time (Draft vs Revised). (R2) | Same audio · Better alignment | stills | One subtle completion accent | ← straight → straight |

### Seq 16 — Add sound with restraint (05:50–06:15 · f10500–11250) · Opus 5.5 High
| Shot | Visible / composition / action (R) | Text | Assets | Sound · Cue | Cut in → out |
|---|---|---|---|---|---|
| **16A** f10500–10620 | Preview plus 4 lanes: Voice · Ambience · Effects · Music. Only Voice is active. (R2) | Voice only | ILL lanes, AUD [B] | [B] voice only | ← straight → straight |
| **16B** f10620–10770 | Ambience lane activates. Meter computed from real audio data. (R2) | Ambience | AUD ambience (licensed/original) | Ambience kept well below the voice (start ≈ 15 dB under speech); tune by ear | straight |
| **16C** f10770–10920 | The notebook opens in the preview; an Effects lane blip at contact. (R2) | One useful effect | AUD paper sfx | Paper sfx at real contact | straight |
| **16D** f10920–11070 | Music lane with a visible volume envelope ducking under voice (the real curve). (R2) | Music under voice | AUD music bed (licensed) | Duck ≈ −10 dB under speech | straight |
| **16E** f11070–11250 | Clean preview, minimal labels, the full mix plays. (R1) | Hear the difference | final mini-mix | Full mix | ← straight → music bed fades into 17A |

### Seq 17 — Review and fix one problem (06:15–06:45 · f11250–12150) · Opus 5.5 High
| Shot | Visible / composition / action (R) | Text | Assets | Sound · Cue | Cut in → out |
|---|---|---|---|---|---|
| **17A** f11250–11370 | The real draft playing in Remotion Studio, tagged "Draft". (R7) | Draft review | CAP Studio (the real draft) | Music ducked | ← fade bed → straight |
| **17B** f11370–11490 | Crop on the **real** defect (planned example: hand drift during the reach). Pause, amber MarkerRing plus "! Fix". (R5) | One specific problem | CAP | none | straight |
| **17C** f11490–11640 | The real correction prompt (P8 in §7), cropped and readable. (R7) | Be specific | CAP Claude input | none | straight |
| **17D** f11640–11790 | Claude Code working for real. Processing shown with a "Sped up ×N" tag or an honest cut; then Studio hot-reloads. (R7) | Revision in progress | CAP | none | straight |
| **17E** f11790–11970 | The revised replay with identical framing, timing and audio, tagged "Revised". (R7) | Revised | CAP | Same audio | straight |
| **17F** f11970–12150 | Before/after contact frame (Draft "! Fix" amber vs Revised "✓ Fixed" mint). (R5) | Clearer result | stills | Quiet result accent | ← straight → straight to 18A |

### Seq 18 — Export and inspect the file (06:45–07:10 · f12150–12900) · Opus 5.5 High
| Shot | Visible / composition / action (R) | Text | Assets | Sound · Cue | Cut in → out |
|---|---|---|---|---|---|
| **18A** f12150–12270 | The real render settings (Studio render panel or composition config), cropped to width/height/fps. (R7) | 1920 × 1080 · 30 fps *(only if true)* | CAP | none | ← straight → straight |
| **18B** f12270–12420 | The real `npx remotion render …` command or Studio Render button. An honest labelled cut across the wait; show render time only if measured. (R7) | Render | CAP | Click | straight |
| **18C** f12420–12570 | The real MP4 opened in a desktop player. (R7) | Open the result | CAP player | File's own audio | straight |
| **18D** f12570–12720 | Three ≈1.5 s samples (start · middle · end). The CheckStrip marks Picture ✓, Voice ✓, Timing ✓, one after each real check. (R2) | Picture · Voice · Timing | CAP + ILL CheckStrip | File audio | straight |
| **18E** f12720–12900 | The checked player view, then the player scales toward full screen (MOVE 24 f). (R1) | Export checked | CAP | none | ← straight → hands off to 19A |

### Seq 19 — Show the finished example (07:10–07:40 · f12900–13800) · Opus 5.5 High
| Shot | Visible / composition / action (R) | Text | Assets | Sound · Cue | Cut in → out |
|---|---|---|---|---|---|
| **19A** f12900–12990 | Player frame on paper with a small label. **Iris-in 10 f (f12980–12990)** into the film. (R1, R6) | The finished example | rendered example film | Tutorial music out | ← scale → **iris** |
| **19B** f12990–13140 | Film: café wide, Noah, Mila, notebook. No tutorial overlays. (R3) | none | Layer B render | [B] audio continuous | iris → story cut |
| **19C** f13140–13320 | Film: memory detail M1 (past summer, same table, Mila laughing). (R3) | none | Layer B render | [B] continuous | story cut |
| **19D** f13320–13470 | Film: close on Noah. Two taps on the table, Noah's eyes return to Mila, notebook visible. (R3) | none | Layer B render | [B] + two soft taps | story cut |
| **19E** f13470–13650 | Film: two-shot. Noah closes the notebook, sets it down, leans in (listen). *Only if the approved script has this beat.* (R3) | none | Layer B render | [B] + soft musical resolution | ← story cut → **iris-out 10 f (f13640–13650)** |
| **19F** f13650–13800 | Back to paper. A small player thumbnail plus a short observation. (R4) | One script · One voice · One world | ILL | Tutorial bed returns softly | ← iris → straight |

### Seq 20 — Make the workflow reusable (07:40–08:00 · f13800–14400) · Sonnet 5.5 Medium (optional)
| Shot | Visible / composition / action (R) | Text | Assets | Sound · Cue | Cut in → out |
|---|---|---|---|---|---|
| **20A** f13800–13920 | The example TopicCard drops onto a "Completed" stack ("✓ Done", mint). (R2) | One finished example | reuse TopicCard | Soft settle | ← straight → straight |
| **20B** f13920–14070 | A blank "Your next topic" card comes forward, with a compact route (Topic · Script · Check · Voice · Scenes). Active outline on Topic. (R2) | Your next topic | reuse RouteMap-mini | none | straight |
| **20C** f14070–14220 | The question in large type. A resource label appears only if the prompts are really published. (R4) | Which idea would you try? | ILL | none | straight |
| **20D** f14220–14400 | End screen: two empty end-screen target areas (left video, right subscribe) at the safe margins, completely still. (R2) | none (target areas only) | ILL EndScreen | Music fades to silence by f14400 | ← straight → end |

**Checks on the grid:**
- 97 shot IDs: 4+4+5+4+4+5+5+5+5+5+5+5+5+5+5+5+6+5+6+4 = **97**.
- The last frame is 14400 (= 480 s).
- The first 15 s has 4 shots.
- One planned 7 s shot (06C). Every other shot is 3–6 s.

---

## 6B. Copyable Claude shot prompts (97)

**How to use:**
- Select the model and effort with the session controls first (`/model`, `/effort`). The model line in each prompt is a reminder, not a switch.
- Always send this preamble once per working session or fresh agent, then the shot block(s):

```
PREAMBLE: Use STYLE_CONTEXT v1 and REFERENCE_STYLE (docs/style-context.md) and the shot table in
src/tutorial/shots.ts. Implement only the named shot as a <Sequence> at its exact frames. Reuse
shared components/rig; don't fork them. Use real assets listed; if an asset is missing, render a
grey placeholder labelled "MISSING: <asset>" and report it — never fake a capture, waveform or result.
After building: preview at 1x, inspect first/middle/last/contact frames, fix, then report against the
"Done when" line plus the standard acceptance list (§8.1).
```

**Seq 01**
```
[01A] Opus 5.5·High | 00:00–00:03 f0–90 | prev — | next 01B | R1 R3
Teach: show the result first. Build: café wide L0–L3; Mila talking (left), Noah listening (right),
notebook by his hand; at f45 Noah's eyeline Mila→notebook (12°, 6f MOVE). Text: pill "Worked example" f15.
Audio: café ambience in f0–15. Cut: straight on eyeline. Done when: eyeline change reads at 1x; static
camera; feet/chairs grounded; pill clear of faces; notebook position matches 01B.
```
```
[01B] Opus 5.5·High | 00:03–00:06 f90–180 | prev 01A | next 01C | R3
Teach: a deliberate action. Build: close hand+notebook; anticipation f90–105, reach f105–120,
contact f120, cover 0→35° f126–150 on spine hinge; push 1.00→1.06 (MOVE). Text: none. Audio: paper sfx at f120.
Done when: hand touches cover with no gap/penetration; hand attached to forearm; sfx frame = contact frame.
```
```
[01C] Opus 5.5·High | 00:06–00:10 f180–300 | prev 01B | next 01D | R3
Teach: the fictional power, as a visual metaphor. Build: medium-wide Noah 3/4; panels M1–M3 behind him (L1),
arc entry at f200/205/210, ENTER 10f, lilac tint + dashed border. Audio: [B] line f210–290 (approved script).
Done when: Noah's silhouette never overlaps a panel edge; memory vs present visually distinct; no tutorial VO.
```
```
[01D] Opus 5.5·High | 00:10–00:15 f300–450 | prev 01C | next 02A | R1 R4
Teach: this came from a script. Build: f300–330 film scales into PlayerFrame (1.0→0.62, MOVE); f360 cut to
split: 3 real script lines left, mini timeline (01A–01C thumbs) bottom; "SCRIPT → VIDEO" 88px at f372.
Audio: ambience out f300–330, music bed in f330, TUT-01 from ≈f318. Done when: no implication the
tutorial itself is rendered; text holds ≥45f; frame edges crisp during scale.
```
**Seq 02**
```
[02A] Sonnet 5.5·Medium (opt.) | 00:15–00:19 f450–570 | prev 01D | next 02B | R2 R4
Teach: we start from one idea. Build: TopicCard ~70% frame "What If You Remembered Every Single Day?",
IDEA tag; document silhouette at left edge where 01D's page was. Text: "One original idea". Audio: tick on settle.
Done when: full title readable at phone size; card settles once, no wobble.
```
```
[02B] Sonnet 5.5·Medium (opt.) | 00:19–00:24 f570–720 | prev 02A | next 02C | R2
Teach: a story needs a rule. Build: StoryDoc, 4 real script lines at 40px; cobalt field highlight on the
rule line only at cue "rule". Text: "A usable story". Audio: soft paper. Done when: only one line emphasised.
```
```
[02C] Sonnet 5.5·Medium (opt.) | 00:24–00:29 f720–870 | prev 02B | next 02D | R3
Teach: a scene = a visible action. Build: split; left storyboard thumb of Noah reaching; match-scale into
right panel playing the 14B reach clip (1.5s). Text: "Scenes that make sense". Done when: thumb framing
equals clip framing at the match frame (no jump).
```
```
[02D] Sonnet 5.5·Medium (opt.) | 00:29–00:35 f870–1050 | prev 02C | next 03A | R2 R4
Teach: the four-step promise. Build: doc left, output frame right; Idea·Story·Scenes·Video reveal 6f
stagger; connector draws f960–990; cobalt dot doc→video once f990–1035; "Full workflow" small. Hold.
Audio: 4 subtle ticks + settle. Cut: "Idea" object expands into 03A. Done when: labels ≥44px; dot moves once only.
```
**Seq 03**
```
[03A] Sonnet 5.5·Medium (opt.) | 00:35–00:39 f1050–1170 | prev 02D | next 03B | R2
Teach: what we're learning from. Build: 3 cards (Ifverse @ifversetales, Day One Films @dayonefilmsofficial,
Last Soul @lastsoulorigin) with URLs; single ENTER, 3f stagger. Text: "Reference channels".
Done when: no views/subs/revenue anywhere; handles spelled exactly; any capture dated.
```
```
[03B] Sonnet 5.5·Medium (opt.) | 00:39–00:44 f1170–1320 | prev 03A | next 03C | R5
Build: Ifverse card centered/enlarged, others dim; cobalt MarkerRing on "@ifversetales" at cue.
Text: "Ifverse · @ifversetales". Done when: ring hugs the handle, draws once, no jitter.
```
```
[03C] Sonnet 5.5·Medium (opt.) | 00:44–00:49 f1320–1470 | prev 03B | next 03D | R2
Build: Day One Films card centered; optional real credited title crop (title only, no counts).
Text: "Day One Films · @dayonefilmsofficial". Done when: no metrics visible; credit line present if capture used.
```
```
[03D] Sonnet 5.5·Medium (opt.) | 00:49–00:54 f1470–1620 | prev 03C | next 03E | R2
Build: Last Soul card centered, URL legible. Text: "Last Soul · @lastsoulorigin". Done when: URL ≥28px, readable.
```
```
[03E] Sonnet 5.5·Medium (opt.) | 00:54–01:00 f1620–1800 | prev 03D | next 04A | R3
Teach: our work is original. Build: reference cards EXIT 7f; Noah + Mila (neutral) + TopicCard ENTER;
"Original" stamp. Text: "Original story · Original visuals". Done when: rig matches §2.1 exactly; no
reference artwork reused.
```
**Seq 04**
```
[04A] Opus 5.5·High | 01:00–01:04 f1800–1920 | prev 03E | next 04B | R3 R4
Teach: ingredient 1, one clear question. Build: Noah standing left third; ink "?" draws on right (12f);
head tilt 8° toward it. Text: "One clear question". Done when: eyeline hits the "?"; stroke weight = rig.
```
```
[04B] Opus 5.5·High | 01:04–01:09 f1920–2070 | prev 04A | next 04C | R3 R5
Teach: ingredient 2, a visible consequence. Build: café two-shot; Mila talking; M1 appears top-right;
Noah turns 12° to it; cobalt arrow panel→Noah's eyes, label on cue "consequence". Text: "A visible consequence".
Done when: cause→effect readable without sound; Mila keeps talking (story logic).
```
```
[04C] Opus 5.5·High | 01:09–01:14 f2070–2220 | prev 04B | next 04D | R3
Teach: ingredient 3, an emotional choice. Build: Noah facing Mila, notebook between; washes fade to 40%;
Noah's eyes notebook→Mila at f2160, unresolved. Text: "An emotional choice". Done when: posture alone
communicates the dilemma; no arbitrary camera move.
```
```
[04D] Opus 5.5·High | 01:14–01:20 f2220–2400 | prev 04C | next 05A | R3 R6
Teach: ingredient 4, a payoff/callback. Build: notebook close f2220–2280; match-cut notebook shape→icon in
4-card strip (Question/Consequence/Choice/Payoff), curved arrow Payoff→Question; compress to "Format" card f2370.
Text: "A payoff" then "Format". Audio: one accent f2290. Done when: match cut has identical shape/position.
```
**Seq 05**
```
[05A] Sonnet 5.5·Medium (opt.) | 01:20–01:24 f2400–2520 | prev 04D | next 05B | R2 R4
Build: 3 large nodes Topic→Script→Check, each on its spoken word; arrows after each. Text: "Topic → Script → Check".
Done when: reveals land on the words (±3f of measured cue).
```
```
[05B] Sonnet 5.5·Medium (opt.) | 01:24–01:29 f2520–2670 | prev 05A | next 05C | R2
Build: Waveform component from a REAL audio file (left), 3 scene cards (right), connector lines.
Text: "Voice → Scenes". Done when: waveform data comes from the file; if no audio yet, placeholder labelled MISSING.
```
```
[05C] Sonnet 5.5·Medium (opt.) | 01:29–01:34 f2670–2820 | prev 05B | next 05D | R3
Build: Characters (Noah thumb), Motion (arc icon), Sound (lane icon) with small examples. Text:
"Characters → Motion → Sound". Done when: restrained highlights only; icons share stroke weight.
```
```
[05D] Sonnet 5.5·Medium (opt.) | 01:34–01:40 f2820–3000 | prev 05C | next 06A | R2
Build: Review + Export nodes; pull back to full 2×5 RouteMap at f2910 with outputs strip (script·audio·MP4);
active outline Topic→Export once f2925–2980 then fades. Text: "Review → Export". Audio: quiet accent.
Done when: all 10 labels ≥38px in the wide; no outline pop/snap.
```
**Seq 06**
```
[06A] Opus 5.5·High | 01:40–01:43 f3000–3090 | prev 05D | next 06B | R2 R4
Teach: three tools, three jobs. Build: three columns "Claude=Plan", "Remotion=Animate", "ElevenLabs=Narrate"
(text names). Text: "Plan / Animate / Narrate". Done when: readable in 3s; no unlicensed logos.
```
```
[06B] Opus 5.5·High | 01:43–01:48 f3090–3240 | prev 06A | next 06C | R7
Build: CaptureFrame with real remotion.dev/docs/ai/coding-agents crop on the command block; cobalt underline
active line; URL caption. Text: "Official setup". Done when: capture is real and dated; commands match docs today.
```
```
[06C] Opus 5.5·High | 01:48–01:55 f3240–3450 (7s hold) | prev 06B | next 06D | R7
Build: real terminal crop (~40px text): run `npx create-video --yes --blank my-video`, `cd my-video`,
`npx remotion skills add`, `npm run dev`; waits shown as "Sped up ×N" (true factor) or honest cut.
Done when: every command readable ≥1.5s; no secrets/paths exposed.
```
```
[06D] Opus 5.5·High | 01:55–02:00 f3450–3600 | prev 06C | next 06E | R7
Build: 2nd real terminal: `cd my-video` then `claude`; crop to Claude Code start screen + project path
(clean demo path). Text: "Animation project". Done when: no email/account/private path visible.
```
```
[06E] Opus 5.5·High | 02:00–02:05 f3600–3750 | prev 06D | next 07A | R7
Build: real Remotion Studio preview (~75% frame) + small Claude Code inset bottom-right.
Text: "Preview ready". Done when: shown only after actual load; no fake success animation/chime.
```
**Seq 07**
```
[07A] Sonnet 5.5·Medium (opt.) | 02:05–02:09 f3750–3870 | prev 06E | next 07B | R2 R7
Build: split: TOPIC prompt in editor (prompts/topic.md) cropped to purpose+input | real Claude input;
ProgressStrip Topic active. Text: "Choose one human ability". Done when: crop readable at 1080p and phone size.
```
```
[07B] Sonnet 5.5·Medium (opt.) | 02:09–02:14 f3870–4020 | prev 07A | next 07C | R5
Build: tight crop of rules; cobalt highlight "One change only", "body or mind", "real consequences" on cues.
Text: "One change". Done when: one highlight at a time; no fast scroll.
```
```
[07C] Sonnet 5.5·Medium (opt.) | 02:14–02:19 f4020–4170 | prev 07B | next 07D | R7
Build: real Claude title output, ~6 titles at 40px; optional slow scroll ≤120px/s. Text: "Actual output".
Done when: output is the genuine session result; not all 35 squeezed in.
```
```
[07D] Sonnet 5.5·Medium (opt.) | 02:19–02:24 f4170–4320 | prev 07C | next 07E | R7
Build: copy chosen title into example-film/topic.md (real). Text: "What If You Remembered Every Single Day?"
Audio: quiet click. Done when: full title readable; VO variant used if the title wasn't in Claude's list.
```
```
[07E] OPUS 5.5·High (override) | 02:24–02:30 f4320–4500 | prev 07D | next 08A | R3
Build: 3 new ink thumbnails (café distraction; rainy bus-stop argument; notebook at night) + Mila's two-tap
hook; selected card slides into script workspace. Text: "Can it carry a story?" Done when: thumbnails use
the locked rig/palette; each reads as a distinct consequence.
```
**Seq 08**
```
[08A] Opus 5.5·High | 02:30–02:34 f4500–4620 | prev 07E | next 08B | R7
Build: real edit: replace [INSERT TOPIC HERE] with the title, paste STORY ANCHORS (P2). Text: "Topic entered".
Done when: typing is real or tagged "Sped up"; text readable.
```
```
[08B] Opus 5.5·High | 02:34–02:39 f4620–4770 | prev 08A | next 08C | R7
Build: real script output excerpt, 4–5 lines; tag "Layer B · Example film". Text: "Example-film script".
Done when: excerpt is genuine output; clearly separate from tutorial VO.
```
```
[08C] Opus 5.5·High | 02:39–02:44 f4770–4920 | prev 08B | next 08D | R5
Build: cobalt MarkerRing on the rule sentence; icon pair rewind ✓ / fast-forward ✗. Text: "The limiting rule".
Done when: ring encloses exactly that sentence; icons carry meaning without color.
```
```
[08D] Opus 5.5·High | 02:44–02:49 f4920–5070 | prev 08C | next 08E | R3 R5
Build: split: ink thumb Noah between notebook and Mila | highlighted motivating sentence. Text: "The emotional choice".
Done when: Noah's eyeline reads as torn between the two.
```
```
[08E] Opus 5.5·High | 02:49–02:55 f5070–5250 | prev 08D | next 09A | R2 R4
Build: 5 StoryCards Hook·Rule·Consequences·Choice·Callback; notebook icon linked to Hook and Callback;
footnote "900–1,050 words = full example film only". Hold. Done when: all labels ≥38px; hold ≥3s.
```
**Seq 09**
```
[09A] Opus 5.5·High | 02:55–02:59 f5250–5370 | prev 08E | next 09B | R4
Build: premise card + fiction icon: "You can replay any day you've lived, perfectly." Text: "Story premise".
Done when: nothing suggests this is a real diagnosis or ability.
```
```
[09B] Opus 5.5·High | 02:59–03:04 f5370–5520 | prev 09A | next 09C | R5
Build: real script line with factual claim; amber underline on the claim only. Text: "Check this claim".
Done when: underline paired with "! Check" icon (not color-only).
```
```
[09C] Opus 5.5·High | 03:04–03:09 f5520–5670 | prev 09B | next 09D | R7
Build: real source page crop (candidate: Parker, Cahill & McGaugh 2006, Neurocase 12(1) — verify first);
cobalt underline on supporting passage; title+link caption. Text: source title. Done when: source actually
opened and supports the wording; else show "Needs verification" and pick another source.
```
```
[09D] Opus 5.5·High | 03:09–03:14 f5670–5820 | prev 09C | next 09E | R5
Build: before→after; only the changed phrase swaps (amber strike "! Revise" → mint "✓ Supported").
Text: "Supported wording". Done when: revision matches what the source says; tagged Illustration if reconstructed.
```
```
[09E] Opus 5.5·High | 03:14–03:20 f5820–6000 | prev 09D | next 10A | R2
Build: Claim·Source·Wording table; row 1 "✓ Verified" (only if checked), row 2 "Story premise — fiction",
unresolved rows "Needs verification"; doc slides right. Audio: soft check after evidence. Done when: table truthful.
```
**Seq 10**
```
[10A] Opus 5.5·High | 03:20–03:24 f6000–6120 | prev 09E | next 10B | R7
Build: real ElevenLabs TTS capture cropped to text box with clean Voice B excerpt. Text: "Spoken words only".
Done when: no API key/account info visible; no stage directions in the text.
```
```
[10B] Opus 5.5·High | 03:24–03:29 f6120–6270 | prev 10A | next 10C | R5 R7
Build: crop on real voice + model selectors; cobalt rings on each. Text: "One voice · one model".
Done when: names shown are exactly what the UI displays; no invented voice ID.
```
```
[10C] Opus 5.5·High | 03:29–03:34 f6270–6420 | prev 10B | next 10D | R7
Build: real play click (click ring); tutorial VO stops; [B] sample plays ≥3s. Text: "Listen first".
Done when: sample audible alone; click ring only on the real click.
```
```
[10D] Opus 5.5·High | 03:34–03:39 f6420–6570 | prev 10C | next 10E | R7
Build: real file public/audio/example-film/efn-01.mp3 with measured duration from metadata.
Text: "Real narration file". Done when: duration shown equals measured value.
```
```
[10E] Opus 5.5·High | 03:39–03:45 f6570–6750 | prev 10D | next 11A | R2
Build: script left, Waveform (real data) right; phrase highlight from real alignment JSON; 2 pause bars at
measured silences. Text: "Voice sets the timing". Done when: highlight within ±2f of audio; cut at a pause.
```
**Seq 11**
```
[11A] Opus 5.5·High | 03:45–03:49 f6750–6870 | prev 10E | next 11B | R2
Build: ≤6 lines of example paragraph at 40px; current spoken group cobalt. Text: "From text to beats".
Done when: no dense full page; highlight matches audio.
```
```
[11B] Opus 5.5·High | 03:49–03:54 f6870–7020 | prev 11A | next 11C | R2
Build: SceneTable row 1 (Start/End/Spoken beat/Visible action) real or "provisional" times + thumb.
Text: "One idea per beat". Done when: all 4 columns ≥38px.
```
```
[11C] Opus 5.5·High | 03:54–03:59 f7020–7170 | prev 11B | next 11D | R2
Build: row 2 + thumb (memory panel appears), framed on right half. Text: "A new action". Done when: new framing.
```
```
[11D] Opus 5.5·High | 03:59–04:04 f7170–7320 | prev 11C | next 11E | R2
Build: row 3 + thumb (two taps); connector lines across 3 thumbs. Text: "Speech → visible action".
Done when: no invented word timing.
```
```
[11E] Opus 5.5·High | 04:04–04:10 f7320–7500 | prev 11D | next 12A | R2
Build: rows → timeline blocks over real waveform; shot ticks above; playhead sweeps once; Noah thumb expands
into 12A. Text: "Narration can cross cuts". Done when: block lengths match measured times.
```
**Seq 12**
```
[12A] Opus 5.5·High | 04:10–04:14 f7500–7620 | prev 11E | next 12B | R3
Build: design sheet; Noah neutral full body centered, H=640px; still (no float). Text: "Meet Noah".
Done when: proportions = §2.1 (head 0.26H, stroke 0.010H).
```
```
[12B] Opus 5.5·High | 04:14–04:19 f7620–7770 | prev 12A | next 12C | R3 R5
Build: closer; callouts Jacket / Proportions (head tick marks) / Notebook. Text: "Keep these consistent".
Done when: leader lines don't cross the figure; callouts ≥38px.
```
```
[12C] Opus 5.5·High | 04:19–04:24 f7770–7920 | prev 12B | next 12D | R3
Build: neutral→point (6f anticipation, 18f move, SETTLE); rig groups outline once cobalt 30% for 20f.
Text: "Same design · New action". Done when: hand joined at every frame; no outline thickness change.
```
```
[12D] Opus 5.5·High | 04:24–04:29 f7920–8070 | prev 12C | next 12E | R3
Build: concerned pose (brows 18°, shoulders +0.01H), 2s hold. Text: "Expression changes".
Done when: clothing/head size/stroke identical to 12A.
```
```
[12E] Opus 5.5·High | 04:29–04:35 f8070–8250 | prev 12D | next 13A | R3
Build: café, Noah + Mila seated; scale bars H vs 0.96H for 1s; eyelines meet. Text: "Characters ready".
Cut: match on notebook (characters cut out → 13A). Done when: notebook pixel-identical across the cut.
```
**Seq 13**
```
[13A] Opus 5.5·High | 04:35–04:39 f8250–8370 | prev 12E | next 13B | R3
Build: empty café wide, stable perspective, notebook on table. Text: "Build the place". Audio: room ambience.
Done when: vanishing lines consistent; frame fully static.
```
```
[13B] Opus 5.5·High | 04:39–04:44 f8370–8520 | prev 13A | next 13C | R3
Build: crop L0/L1 windows+wall; 2–3 clouds ≤6px/s. Text: "Background". Done when: motion subordinate; seeded/static.
```
```
[13C] Opus 5.5·High | 04:44–04:49 f8520–8670 | prev 13B | next 13D | R3
Build: L2 table/chairs; Noah + Mila appear seated (8f opacity). Text: "Action space".
Done when: feet/chair contact exact; correct layer order (chair back vs body).
```
```
[13D] Opus 5.5·High | 04:49–04:54 f8670–8820 | prev 13C | next 13E | R3
Build: plant at edge; truck right 60px/60f (MOVE): L3 84px, L2 60, L1 30, L0 12; settle. Text: "Foreground".
Done when: parallax ratios constant; no layer tearing at edges.
```
```
[13E] Opus 5.5·High | 04:54–05:00 f8820–9000 | prev 13D | next 14A | R3
Build: full café recombined + inset M1 (lilac). Text: "One consistent world". Cut: straight on Noah's head turn.
Done when: inset uses identical line weight/palette rules.
```
**Seq 14**
```
[14A] Opus 5.5·High | 05:00–05:04 f9000–9120 | prev 13E | next 14B | R3
Build: café wide; notebook clearly placed right of Noah; small beat labels. Text: "Notice → Reach → Open".
Done when: notebook location unmistakable before movement.
```
```
[14B] Opus 5.5·High | 05:04–05:09 f9120–9270 | prev 14A | next 14C | R3
Build: split wide|close; 150f action: 0–30 notice, 30–60 anticipation (lean 4°), 60–90 reach, 90–120 contact+open,
120–150 react+SETTLE; beat labels light in sync. Audio: paper sfx at local f90. Done when: plays once; no float.
```
```
[14C] Opus 5.5·High | 05:09–05:14 f9270–9420 | prev 14B | next 14D | R5
Build: close hand/notebook; hold contact 30f; cobalt ring on anchor point; resume. Text: "Contact matters".
Done when: zero gap between hand dot and cover at contact frames.
```
```
[14D] Opus 5.5·High | 05:14–05:19 f9420–9570 | prev 14C | next 14E | R2
Build: 3 stills (anticipation/contact/settle) + timing line with frame numbers. Text: "Anticipate · Contact · Settle".
Done when: stills are actual frames from 14B.
```
```
[14E] Opus 5.5·High | 05:19–05:25 f9570–9750 | prev 14D | next 15A | R3
Build: wide; action with real [B] opening line (~2.5s) then tutorial sentence; beat labels slide to 15A track.
Text: "Purposeful movement". Done when: sfx at contact; [B] and VO don't overlap.
```
**Seq 15**
```
[15A] Opus 5.5·High | 05:25–05:29 f9750–9870 | prev 14E | next 15B | R2
Build: preview tagged "DRAFT · timing demo" + TrackLanes Voice/Action/Text; notebook opens ~12f early.
Text: "Draft timing". Done when: clearly labelled as a teaching example.
```
```
[15B] Opus 5.5·High | 05:29–05:34 f9870–10020 | prev 15A | next 15C | R5
Build: zoom on Voice lane real waveform; single cue marker at phrase (alignment). Text: "Find the spoken cue".
Done when: marker position from data, not guessed.
```
```
[15C] Opus 5.5·High | 05:34–05:39 f10020–10170 | prev 15B | next 15D | R7
Build: real Claude Code edit moving the action start to the measured cue + Studio timeline update.
Text: "Move the action". Done when: capture genuine; audio untouched.
```
```
[15D] Opus 5.5·High | 05:39–05:44 f10170–10320 | prev 15C | next 15E | R2
Build: same preview tagged "REVISED", same audio. Text: "Revised timing". Done when: contact lands on cue ±2f.
```
```
[15E] Opus 5.5·High | 05:44–05:50 f10320–10500 | prev 15D | next 16A | R2
Build: two contact frames at identical audio time (Draft | Revised). Text: "Same audio · Better alignment".
Done when: comparison is fair (same framing, same frame index).
```
**Seq 16**
```
[16A] Opus 5.5·High | 05:50–05:54 f10500–10620 | prev 15E | next 16B | R2
Build: preview + 4 lanes; Voice active only. Text: "Voice only". Done when: no tutorial VO over the sample.
```
```
[16B] Opus 5.5·High | 05:54–05:59 f10620–10770 | prev 16A | next 16C | R2
Build: Ambience lane on; meter from real audio data. Text: "Ambience". Done when: speech stays clear.
```
```
[16C] Opus 5.5·High | 05:59–06:04 f10770–10920 | prev 16B | next 16D | R2
Build: notebook opens; Effects lane blip at contact. Text: "One useful effect". Done when: sfx = contact frame.
```
```
[16D] Opus 5.5·High | 06:04–06:09 f10920–11070 | prev 16C | next 16E | R2
Build: Music lane + real ducking envelope (~−10dB under speech). Text: "Music under voice".
Done when: envelope drawn from actual volume curve.
```
```
[16E] Opus 5.5·High | 06:09–06:15 f11070–11250 | prev 16D | next 17A | R1
Build: clean preview, minimal labels, full mini-mix. Text: "Hear the difference". Done when: no clipping; bed fades.
```
**Seq 17**
```
[17A] Opus 5.5·High | 06:15–06:19 f11250–11370 | prev 16E | next 17B | R7
Build: real draft playing in Studio, tag "Draft". Text: "Draft review". Done when: it is the real production draft.
```
```
[17B] Opus 5.5·High | 06:19–06:23 f11370–11490 | prev 17A | next 17C | R5
Build: crop on the REAL defect; pause; amber ring + "! Fix". Text: "One specific problem".
Done when: defect genuinely occurred; if not hand drift, VO line rewritten to match.
```
```
[17C] Opus 5.5·High | 06:23–06:28 f11490–11640 | prev 17B | next 17D | R7
Build: real correction prompt (P8) cropped readable. Text: "Be specific". Done when: ≥1.5s per line readable.
```
```
[17D] Opus 5.5·High | 06:28–06:33 f11640–11790 | prev 17C | next 17E | R7
Build: real Claude Code working; "Sped up ×N" or honest cut; Studio hot reload. Text: "Revision in progress".
Done when: no fake instant success.
```
```
[17E] Opus 5.5·High | 06:33–06:39 f11790–11970 | prev 17D | next 17F | R7
Build: revised replay, identical framing/timing/audio, tag "Revised". Text: "Revised". Done when: fair comparison.
```
```
[17F] Opus 5.5·High | 06:39–06:45 f11970–12150 | prev 17E | next 18A | R5
Build: before/after contact frame (amber "! Fix" | mint "✓ Fixed"). Text: "Clearer result". Done when: real frames.
```
**Seq 18**
```
[18A] Opus 5.5·High | 06:45–06:49 f12150–12270 | prev 17F | next 18B | R7
Build: real render settings crop (width/height/fps). Text: "1920 × 1080 · 30 fps" only if true.
Done when: values match the actual composition.
```
```
[18B] Opus 5.5·High | 06:49–06:54 f12270–12420 | prev 18A | next 18C | R7
Build: real render command/button; labelled cut across wait; render time only if measured. Text: "Render".
Done when: no fabricated progress meter.
```
```
[18C] Opus 5.5·High | 06:54–06:59 f12420–12570 | prev 18B | next 18D | R7
Build: real MP4 open in a desktop player, file audio. Text: "Open the result". Done when: it's the produced file.
```
```
[18D] Opus 5.5·High | 06:59–07:04 f12570–12720 | prev 18C | next 18E | R2
Build: 3 × ~1.5s samples start/middle/end; CheckStrip ticks Picture/Voice/Timing after each real check.
Text: "Picture · Voice · Timing". Done when: only performed checks ticked.
```
```
[18E] Opus 5.5·High | 07:04–07:10 f12720–12900 | prev 18D | next 19A | R1
Build: checked player view scales toward full screen (24f MOVE). Text: "Export checked". Done when: clean handoff.
```
**Seq 19**
```
[19A] Opus 5.5·High | 07:10–07:13 f12900–12990 | prev 18E | next 19B | R1 R6
Build: player frame + label; iris-in 10f at f12980. Text: "The finished example". Done when: VO ends before iris.
```
```
[19B] Opus 5.5·High | 07:13–07:18 f12990–13140 | prev 19A | next 19C | R3
Build: final film café wide (Layer B render). No overlays. Done when: [B] audio continuous across 19B–19E.
```
```
[19C] Opus 5.5·High | 07:18–07:24 f13140–13320 | prev 19B | next 19D | R3
Build: film memory detail M1 (past summer, same table). Done when: advances the emotional beat; cinematic pace.
```
```
[19D] Opus 5.5·High | 07:24–07:29 f13320–13470 | prev 19C | next 19E | R3
Build: film close on Noah; two taps; eyes return to Mila; notebook visible. Done when: reaction readable, eyeline true.
```
```
[19E] Opus 5.5·High | 07:29–07:35 f13470–13650 | prev 19D | next 19F | R3
Build: film two-shot; Noah closes notebook, sets it down, leans in (if in approved script); iris-out f13640.
Done when: hand-notebook contact exact; musical resolution lands.
```
```
[19F] Opus 5.5·High | 07:35–07:40 f13650–13800 | prev 19E | next 20A | R4
Build: paper; small player thumbnail; "One script · One voice · One world". Done when: tutorial bed back softly.
```
**Seq 20**
```
[20A] Sonnet 5.5·Medium (opt.) | 07:40–07:44 f13800–13920 | prev 19F | next 20B | R2
Build: TopicCard drops onto "Completed" stack ("✓ Done"). Text: "One finished example". Done when: settles once.
```
```
[20B] Sonnet 5.5·Medium (opt.) | 07:44–07:49 f13920–14070 | prev 20A | next 20C | R2
Build: blank "Your next topic" card + compact route; outline on Topic. Text: "Your next topic". Done when: reuses RouteMap.
```
```
[20C] Sonnet 5.5·Medium (opt.) | 07:49–07:54 f14070–14220 | prev 20B | next 20D | R4
Build: big question; resource label ONLY if prompts are actually published. Text: "Which idea would you try?"
Done when: no promise of unpublished downloads.
```
```
[20D] Sonnet 5.5·Medium (opt.) | 07:54–08:00 f14220–14400 | prev 20C | next — | R2
Build: two empty end-screen target areas inside safe margins; completely still. Done when: zero motion; music
fades to silence at f14400.
```

---

## 7. Demonstration prompts used on screen (Layer B work, shown inside the tutorial)

Save each as `prompts/P#-name.md` in production.

**P1 — Topic prompt** (shown in 07A–07C)
- Use the user-supplied **TOPIC** text **verbatim** from brief §11 (from "You are a topic strategist…" through "Titles only: no explanations, no commentary.").
- Append one line:

```
Note: every premise must be supportable by real, checkable science; any facts used later will be verified against sources before recording.
```

**P2 — Example-film script prompt** (08A–08B)
- Use the supplied **SCRIPT** text **verbatim** from brief §11.
- Set `TOPIC: What If You Remembered Every Single Day?` and `SERIES CONTEXT: standalone`.
- Append:

```
STORY ANCHORS (keep exactly): The hero is "you", named Noah. Your best friend is Mila. Planted detail: your small blue notebook, and Mila's habit of tapping the table twice when she wants your attention. The one rule: you can relive any day you've lived in vivid detail, but memory can never predict the future or change what happened. The present-day setting is a café. Climax choice in one line, e.g. "The past... or the friend in front of you." Resolution: you close the notebook and listen; the two taps pay off. Include the "Is any of this real?" section and keep the fictional power clearly separate from real memory science.
After the SCRIPT paragraph, add a separate list titled FACT CLAIMS: every real-world factual statement in the script, one per line, so each can be checked. Never invent researchers, studies, years or numbers; if unsure, write around it.
```

**P3 — Fact-check prompt** (09B–09E)
```
Here is the example-film script and its FACT CLAIMS list. For each claim: (1) say whether it is a real-world claim or part of the fictional premise; (2) for real claims, name the most authoritative primary source you know (paper, journal, year) and the exact statement it supports; (3) rate confidence high/medium/low; (4) propose the narrowest wording the source supports. Do not invent sources. Mark anything you cannot support "Needs verification". I will open and read each source myself before marking it verified. Output a table: Claim | Type | Source | Supported wording | Status.
```

**P4 — ElevenLabs speech-preparation prompt** (10A)
```
Prepare the approved example-film script for ElevenLabs. Output only spoken text, split into segments of roughly 20–40 seconds at sentence boundaries (assume ~150 words per minute). Remove every heading, label, stage direction, shot ID and filename. Keep numbers written out as words. Keep the script's punctuation, but reduce ellipses where they would cause unnatural hesitation; do not add any pause or emotion markup. After the segments, list words that may be mispronounced with a plain-English respelling as separate delivery notes, not inside the text.
```

**P5 — Script-to-scene prompt** (11A–11E)
```
Here is the example-film narration and the measured audio timing (alignment JSON). Split it into beats wherever the visible action or meaning changes. Output a table: Beat | Start (s) | End (s) | Spoken words | One visible action | Framing (wide/medium/close) | Characters/props. Use only the measured times; if a time is not measured, write "provisional". Beats are usually 3–6 seconds; sentences may run across cuts. Keep Noah, Mila, the notebook and the café/memory sets from docs/style-context.md.
```

**P6 — Reusable character prompt** (12A–12E)
```
In this Remotion project, build Noah and Mila as reusable SVG React components following docs/style-context.md §2.1 exactly (stickman hybrid: round white head 0.26H, ink limbs 0.010H, terracotta jacket / muted-green sweater, blue notebook 0.10H×0.13H). Use grouped parts with fixed pivots (head, torso, upper arms, forearms, hands, thighs, shins) so the hand position is computed from the arm and can never detach. Expose a pose prop (neutral, sit, notice, reach-anticipation, reach, touch, open, react-soft, point, concerned, listen) and interpolate between poses with the shared easing. All motion from useCurrentFrame(); no randomness. Add a design-sheet composition showing both characters in three poses so I can review them.
```

**P7 — Animation prompt** (14A–14E)
```
Animate shot 14B: in the café set, Noah notices the notebook (frames 0–30, eyeline only), anticipates (30–60, lean back 4°), reaches (60–90), touches and opens the cover (90–120; hand anchored to the cover's edge coordinates; cover hinges on its spine), then reacts and settles (120–150, spring damping 200). Keep body scale, outline weight and chair contact constant. Put the paper sound exactly at the contact frame. Render frames 0, 45, 90, 105, 149 as stills and check for gaps between hand and cover, detached limbs, or sliding.
```

**P8 — Timing and defect revision prompt** (15C, 17C; fill in the real values)
```
Fix one specific problem in shot <ID>. Problem: <e.g. at frames 72–84 Noah's right hand drifts about 14 px off the notebook cover during the reach>. Required: <the hand stays attached to the forearm and anchored to the cover's edge from contact (frame 90) through the end of the open>. Timing fix (if applicable): move the notebook-open action so contact lands on the measured cue at frame <N> from the alignment data; do not change the audio. Keep unchanged: character design, camera, other shots, timing outside this action. Fix it in the shared rig/component, not with a per-shot hack, then show me before/after stills at the same frames.
```

**P9 — Final review prompt** (before 18A)
```
Review the complete tutorial render and the example-film render. Play at 1x and inspect sampled frames at every shot boundary plus contact frames. Report, per shot ID: jitter, detached limbs, foot/chair sliding, clipping, overlapping or unreadable text (check at phone size), wrong layer order, inconsistent colour/scale, abrupt cuts, audio gaps or clipping, narration/action misalignment, and any on-screen claim without a source. List only checks you actually performed, with the frame numbers inspected. Then propose fixes at the source component, ordered by severity.
```

---

## 8. Resource and asset list

**Existing now (verified this session):**
- The master brief: the uploaded `AI_Channel_Tutorial_Master_Prompt.md`.
- The supplied TOPIC/SCRIPT method (brief §11).
- This plan.
- The reference metadata, the vidIQ analysis, and the transcript (summarised in §0.2).
- Remotion setup commands, verified on remotion.dev today.

**Nothing below exists yet.** All of it is planned.

| Category | Items | Source / licence note |
|---|---|---|
| **Screen captures (CAP)** | 03A–D optional channel crops (no metrics) · 06B Remotion docs · 06C/06D terminals · 06E Studio + Claude Code · 07A–D editor and Claude session · 08A–C Claude script run · 09B–C script line + source page · 10A–D ElevenLabs UI, play action, saved file · 15C Claude Code edit + Studio timeline · 17A–E real draft, prompt, revision · 18A–D render settings, render, MP4 in a player | Record at 1920×1080 or higher, at 100–125% UI zoom, with a clean demo account and path. Date every capture. |
| **Original illustrations (ILL)** | Noah rig · Mila rig · notebook (closed/open) · café L0–L3 · memory panels M1–M3 · 3 consequence thumbnails (07E) · choice thumbnail (08D) · ink "?" · icon set (10 route icons, fiction icon, rewind/ff) | Built as SVG/React in the project; wash textures as static PNGs |
| **UI components** | TopicCard, StoryCard, StoryDoc, RouteMap (+mini), ProgressStrip, CaptureFrame, MarkerRing/Arrow, KeywordLabel, PlayerFrame, SceneTable, TrackLanes, Waveform, CheckStrip, EndScreen, Pill/Tag | `src/shared/ui/` |
| **Voice (AUD)** | Tutorial Narration TUT-01…16 (Voice A) · Example Film Narration EFN-xx (Voice B) · alignment JSON per file | ElevenLabs, licensed voices; the plan's terms are to be confirmed by the user |
| **SFX / music** | Café ambience loop · paper/cover open · chair creak · soft UI ticks/clicks · two table taps · soft music bed (tutorial) · gentle score cue (example film) | Original or properly licensed; keep licence records in `docs/asset-inventory.md` |
| **Fonts** | Nunito 700/900 (SIL OFL) · JetBrains Mono 500 (OFL, Illustration code cards only) | Google Fonts / @remotion/google-fonts |
| **References (links only)** | Primary https://www.youtube.com/watch?v=H8FAaKeCguA (Mark Ai Guy) · Secondary https://www.youtube.com/watch?v=IFstAP91GtY · Ifverse https://www.youtube.com/@ifversetales · Day One Films https://www.youtube.com/@dayonefilmsofficial · Last Soul https://www.youtube.com/@lastsoulorigin · aiTrends community https://www.skool.com/aitrends-creator-academy (optional, not ours; plugin not tested) · Claude https://claude.ai/ · Claude Code https://claude.com/product/claude-code · Opus 5.5 https://www.anthropic.com/claude-opus-5-5 · Sonnet 5.5 https://www.anthropic.com/claude-sonnet-5-5 · Model/effort https://code.claude.com/docs/en/model-config · Remotion https://www.remotion.dev/ · agent setup https://www.remotion.dev/docs/ai/coding-agents · licence https://www.remotion.dev/license · frame animation https://www.remotion.dev/docs/animating-properties · Node.js https://nodejs.org/ · ElevenLabs https://elevenlabs.io/ · TTS docs https://elevenlabs.io/docs/overview/capabilities/text-to-speech · best practices https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices · HyperFrames (alternative, not used) https://hyperframes.heygen.com/ | Verify availability before filming |
| **Fact sources** | Candidate: Parker, Cahill & McGaugh (2006), *Neurocase* 12(1), "A Case of Unusual Autobiographical Remembering". Others come from P3. | **Not yet opened**; verify in production |
| **Licensing to confirm** | The Remotion licence for the creator's situation · ElevenLabs commercial-use terms of the plan in use · music/SFX licences | The user's call |

---

## 8.1 Standard acceptance (applies to every shot)

A shot passes when all of the following are true:
- The action is obvious at 1× speed.
- Text is readable at 1080p and at phone size.
- Every move starts and settles cleanly, with no wobble, drift or anchor pop.
- Character scale, stroke and clothing match §2.1.
- No clipping, jitter, detached limbs or foot/seat sliding.
- The cut to the next shot is intentional and agrees on prop position and eyeline.
- The real audio cue matches the action within ±2 f.
- Only real captures, results and measurements appear, or the item is tagged "Illustration".

A shot is marked **Reviewed** only after its frames have actually been inspected.

## 8.2 Production checks: planned vs performed

| Check | Status now |
|---|---|
| Brief read in full; two layers kept separate | **Performed** |
| Reference identified; thumbnail viewed; machine analysis + transcript read | **Performed** (analysis is machine-generated) |
| Remotion commands checked against official docs | **Performed** (16 Oct 2026) |
| 97 IDs and continuous frames f0–14400 | **Performed** on this plan's tables |
| Tutorial payload word count (≈1,050) | **Performed** (word count of the payload blocks) |
| Readability at 1× and phone size | Planned: prototype and every sequence |
| Character/prop continuity across cuts | Planned: per sequence plus final review (P9) |
| ElevenLabs speech ↔ action alignment from real timing data | Planned: after recording |
| Narration vs playback-time budget (≈431 s narrated + 49 s playback) | Planned: re-measure after recording |
| Factual claims opened and verified at their source | Planned: P3 + manual reading |
| Exported MP4: picture/voice/timing at start/middle/end, no clipping | Planned: Seq 18 + final review |
| Licences (Remotion, ElevenLabs, audio, fonts) | Planned: user confirmation |

---

## 9. Production order (for later; nothing here runs in this planning step)

1. **Project setup** (Opus · High): `npx create-video --yes --blank my-video` → `npx remotion skills add` → `npm run dev`; second terminal `claude`. **Screen-record these steps** for 06B–06E.
2. **Example film writing** (Opus · High): run P1 and P2 in a recorded Claude session (this becomes 07A–08C), then P3 plus manual source reading (09). Approve the script.
3. **Shared style + rig + components** (Opus · High): STYLE_CONTEXT tokens, easing, fonts, Noah/Mila (P6), café/memory sets, UI components, Waveform.
4. **Voices:** a short ElevenLabs sample for Voice A and Voice B, then a listening check, then lock the voices and settings. Generate the EFN segments (record the 10A–10D captures), then TUT-01…16. Measure durations and produce alignment.
5. **Prototype, 15–20 s** (Opus · High): 01D (card/text + player pull-back, 5 s) → 02A–02B (card transition, 9 s) → 14B (character/prop action, 5 s), on real TUT-01 audio, about 19 s. Preview at 1×, inspect start/middle/end/contact frames, fix the shared curves and rig, then lock STYLE_CONTEXT v1.
6. **Example film** (Opus · High): animate the scenes that the tutorial needs (01A–C, 14–17 clips, 19B–E), then the rest of the film as its own composition.
7. **Retime the tutorial grid** to the measured TUT audio (§10).
8. **Build sequences 01→20** in order. Sonnet is optional for 02/03/05/07A–D/20, after step 5. Record the 15C/17 captures during real fixes.
9. **Final review (P9) and export** (Seq 18 captured for real), then fix and re-render.

## 10. Timing, retiming and handoff state

**Retime rule:**
- After recording, set each shot's boundaries in `src/tutorial/shots.ts` so that each segment's measured audio fits its shots.
- Keep the order and the 97 IDs.
- Move small amounts between neighbouring shots, keeping most shots 3–6 s.
- Allow a single hold over 8 s only when a real instruction needs it, and compensate nearby.
- Total stays ≈ 8:00 (14,400 f ± 5%).
- Log every change in `docs/timing-log.md` as: shot · old frames · new frames · reason.

**Handoff files** (kept together so a new chat can continue without reconstructing decisions):

```
docs/brief.md                 latest master brief (copy of the upload)
docs/production-plan.md       this package
docs/style-context.md         STYLE_CONTEXT v1 + REFERENCE_STYLE + character sheet
docs/asset-inventory.md       every asset: planned / captured / created / licence
docs/narration-manifest.json  voices, model, settings, segment order, measured durations, file paths
docs/timing-log.md            retiming changes
docs/state.md                 current step, models actually used, open issues, checks performed
src/shared/  src/tutorial/  src/example-film/  public/audio/{tutorial,example-film}/  public/captures/  public/sfx/  public/music/  prompts/
```

---

## 11. What I will do once you approve this plan

1. Write this package to `docs/production-plan.md`.
2. Copy the uploaded brief to `docs/brief.md` for handoff.
3. Commit both on `claude/great-meitner-qp1t0m`, push, open a **draft PR**, and watch it.
4. No code, audio, images, or rendering.

**Verification after saving:**
- `grep -cE '^\| \*\*[0-9]{2}[A-F]\*\*'` on the doc = **97** storyboard rows.
- `grep -cE '^\[[0-9]{2}[A-F]\]'` = **97** prompts.
- A small awk check confirms each shot's end frame equals the next shot's start frame, from f0 to f14400.
- Re-count the narration payload words.

