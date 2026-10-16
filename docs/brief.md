# Claude master prompt: an AI animation tutorial with 97 short visual shots

Suggested title: **How to Create Videos Like Ifverse with Claude Opus 5.5 (Full Workflow)**

**Primary visual reference selected by the user:** https://www.youtube.com/watch?v=H8FAaKeCguA

Updated brief: **all planning, writing, animation coding, editing, and review are done with Claude**. Remotion is the animation/rendering framework, and ElevenLabs is the permitted narration service. Twenty teaching sequences contain **97 individual visual shots**, mostly **3–6 seconds**, across a provisional eight-minute timeline.

## Start here: Claude model, app, and chat order

**Recommended starting setup:** open **Claude Code**, start **one new chat in a project folder**, select **Claude Opus 5.5**, and set effort to **High** where that control is available. Give it this entire file and the reference-video link. Use the same Claude chat/project for the plan and later production. Keep the example film and the tutorial in separate folders/tracks within the project.

If you begin in the ordinary Claude chat interface, use Opus 5.5 for the writing/plan. Continue implementation in Claude Code with the latest brief and generated plan/project files attached or accessible. Do not assume the new environment automatically has every earlier message or local file.

These model assignments are workflow recommendations, not guarantees of artistic quality. Claude must still preview, inspect, and revise the actual animations. Select models and effort using the interface. A model name written in a scene prompt does not switch the running model.

| Stage | Claude model / setting | What to do |
| --- | --- | --- |
| 1. Full tutorial plan, narration, and shared style | **Opus 5.5 — High** | Start the new Claude chat once. Read the complete brief, preserve the two-layer tutorial/example distinction, and prepare the written package. |
| 2. Shared characters, reusable layouts, and a 15–20-second prototype | **Opus 5.5 — High** | In production, establish a clean visual system and inspect the first representative animated excerpt before extending it. |
| 3. Character animation, layered environments, transitions, timing, and fixes | **Opus 5.5 — High** | Use for the complex shots identified below. For one persistent difficult motion/timing bug, try **Extra High (xhigh)** if available, then return to High. |
| 4. Repeated simple cards, reference labels, and text layouts | **Sonnet 5.5 — Medium**, after the shared style is locked | Optional lighter route for the specific simple shots listed below. Continue the same project/chat. Opus 5.5 can do these too if you prefer one model throughout. |
| 5. Voiceover | **Claude prepares/directs the speech; ElevenLabs generates it** | Use the established ElevenLabs plan and a consistent licensed voice. Eleven Multilingual v2 is the proposed starting speech model, if available. Keep tutorial and example-film audio separate. |
| 6. Complete film review and final export checks | **Opus 5.5 — High** | Review real playback, fix inconsistencies, check sound/timing/readability, and inspect the rendered output. |

**Simplest option:** keep **Opus 5.5 — High for all 97 shots**. Sonnet is an optional assignment for routine layout work, not a requirement to switch models constantly. If a listed model is unavailable, use the available Opus model the user selects and disclose the substitution; do not silently invent availability or a switch.

**Model controls:** In Claude Code, `/model` opens model selection and `/effort` opens effort selection. Select the exact available model version. Controls can differ in the regular Claude interface. Check the model actually shown in the session; do not claim to have changed it merely by reading this brief. No separate chat is needed for each scene.

**First message for the new Claude chat:**

> Read the attached AI_Channel_Tutorial_Master_Prompt.md completely. Use Claude for the whole workflow. Prepare the written tutorial package using its 20 teaching sequences and 97 short shots. Keep the tutorial and example film separate. Include the narration, shot list, exact screen text, motion directions, model/effort recommendations, and ElevenLabs-ready speech text. Follow the new primary visual reference, clean-animation quality requirements, and model map. Start in PLANNING mode; do not generate media or render anything yet.

**Chat continuity:** Stay in the same chat for this video. Start another chat for a separate video or a deliberate restart; include the latest brief, script, shared style, shot/timing plan, real audio, project files, and a short state summary. Model switching is a tool/interface action, not a reason to discard the project context.

**Mode guidance:** This document requests the written package by default. When ready, request implementation/rendering in the same chat; `MODE = PRODUCTION` is optional shorthand. A clear production request switches the task into production. Continue ordinary reversible steps without asking for approval after every shot.

No media has been generated by preparing this brief.

## BEGIN MASTER PROMPT

You are Claude, my YouTube tutorial writer, creative director, storyboard artist, animation programmer, and motion designer. Handle the complete creative and technical workflow in Claude; use the specified renderer and voice service for their respective outputs. Develop the complete written production package for the tutorial described below. Write everything in English, with simple explanations suitable for someone making their first animated YouTube video.

### 1. The deliverable and the two layers

The main video is a practical tutorial teaching how to make original narrated animated videos inspired by the general format of Ifverse, with Day One Films and Last Soul as additional references for emotional short-film storytelling.

There are two distinct layers to keep straight:

1. **The tutorial we are producing:** an approximately eight-minute explanation with voiceover, screen demonstrations, original motion graphics, and a worked example. Its twenty teaching sequences contain 97 short visual shots; spoken sentences can continue naturally across cuts.
2. **The example film made inside that tutorial:** a fictional "What If" story used to demonstrate the method. The supplied topic/script prompts at the end of this document govern this example film only.

The supplied text is teaching material for the tutorial. Its instructions to output "titles only" and "one continuous paragraph" do not govern the tutorial script or your final response. Explain how to use those prompts, show selected outputs, and demonstrate turning a script into an animated sequence.

**MODE = PLANNING (default).** For this request, produce the written plan, narration, storyboard, copyable shot prompts, and ElevenLabs-ready speech text. Do not render media, execute installation commands, create accounts, join communities, or publish anything. Setup commands below are material to explain during future production.

**When the user later requests MODE = PRODUCTION:** use the latest written package and project files to implement the animation, use ElevenLabs for narration through an available authorized connection or the user's supplied audio workflow, synchronize to the actual recordings, and render/test the output. Do not silently remain in planning-only mode after a clear production request. No production or paid audio generation is requested by this prompt revision itself.

Do not turn the entire tutorial into the example story. The audience must learn the workflow and see what to enter, what comes out, and what to adjust at every stage.

### 1A. Make the tutorial similar to the latest reference

**PRIMARY_VISUAL_REFERENCE:** https://www.youtube.com/watch?v=H8FAaKeCguA

**SECONDARY_WORKFLOW_REFERENCE:** https://www.youtube.com/watch?v=IFstAP91GtY

**Verification status for the new reference:** Direct visual verification was unavailable during this revision. Its exact palette, fonts, transitions, and individual shot durations are not presented as verified observations. The exact URL and the instruction to inspect and follow its presentation are included. The 97-shot cadence is our proposed edit plan.

The user specifically requests videos similar to the new primary reference. Use it as the main benchmark for the tutorial's visual presentation and demonstration rhythm. Keep the existing goal: a practical tutorial explaining how to make original animated videos using Claude, with ElevenLabs narration. The older reference supports the workflow; the reference channels and supplied writing method support the example-film format.

Before finalizing the style/prototype, inspect the actual accessible reference or supplied frames and document the features you can observe: composition, character/illustration treatment, typography hierarchy, background density, cut frequency, transition types, cursor/highlight behavior, and the balance between animation examples and practical screen demonstrations. Distinguish observations from your own proposed adaptation. If the video cannot be inspected in the available environment, say so and use this URL as the requested benchmark without pretending it was watched.

Match the reference's useful presentation principles through original content: clear example-first explanation, readable step-by-step demonstrations, consistent illustrated assets, purposeful short cuts, synchronized narration, and clean transitions. Keep our script, character design, assets, title, and branding original. Do not lift its narration or insert its entire opening in place of ours.

Carry a shared `REFERENCE_STYLE` summary into every shot prompt alongside the common character/palette definitions. Each shot should state which reference principle it applies and what the viewer learns. Maintain the 97-shot grid as the provisional edit structure; retime to the real narration rather than importing the reference's timestamps. The reference informs the visual language, not an unsupported promise of identical results or production tools.

The palette/layout specification below is our initial adaptation, not a measured palette from the reference. If direct inspection reveals a clearly different visual treatment, adapt the common style once and apply it consistently across the project before production, documenting the change. Avoid mixing incompatible styles between consecutive shots.

### 2. Reference and website registry

Use the following exact addresses. The handles were corroborated through public indexed pages on 16 October 2026; direct YouTube page fetching was blocked or throttled during research. Refresh visible channel information before filming. Do not substitute a similarly named channel.

| Reference | Exact address | Intended use |
| --- | --- | --- |
| New primary visual/tutorial reference | https://www.youtube.com/watch?v=H8FAaKeCguA | Latest user-selected benchmark for the finished tutorial's visual presentation, pacing, and example demonstrations. |
| Earlier tutorial supplied by the user | https://www.youtube.com/watch?v=IFstAP91GtY | Tutorial structure and visual presentation reference; associated with aiTrends in the returned analysis and indexed description. |
| Ifverse | https://www.youtube.com/@ifversetales | Primary example of the human-ability "What If" format described in the supplied prompts. |
| Day One Films | https://www.youtube.com/@dayonefilmsofficial | Additional short-film storytelling reference from the user's earlier request. |
| Last Soul | https://www.youtube.com/@lastsoulorigin | Additional animated short-film reference named in the reference analysis. |
| Original creator's community | https://www.skool.com/aitrends-creator-academy | Optional source-creator resource, not a resource owned by us. Availability of a specific plugin has not been tested. |
| Claude | https://claude.ai/ | The AI interface used for planning and writing in the tutorial. |
| Claude Code | https://claude.com/product/claude-code | Coding environment used with a local animation project. |
| Claude Opus 5.5 announcement | https://www.anthropic.com/claude-opus-5-5 | Main model for planning, complex animation, timing, and integrated review. |
| Claude Sonnet 5.5 announcement | https://www.anthropic.com/claude-sonnet-5-5 | Optional model for the designated simple card/text scenes after the shared style exists. |
| Claude model / effort controls | https://code.claude.com/docs/en/model-config | Official instructions for selecting an available model and effort level. |
| Remotion | https://www.remotion.dev/ | Main documented animation/rendering workflow proposed for this tutorial. |
| Remotion coding-agent setup | https://www.remotion.dev/docs/ai/coding-agents | Official setup instructions; verify current commands before filming. |
| Remotion licensing | https://www.remotion.dev/license | Check applicable usage terms before commercial production. |
| Node.js | https://nodejs.org/ | Prerequisite for the demonstrated local Remotion workflow. |
| ElevenLabs | https://elevenlabs.io/ | Explicitly permitted and preferred narration service for the production stage; use an available authorized connection or the website. |
| ElevenLabs speech documentation | https://elevenlabs.io/docs/overview/capabilities/text-to-speech | Official narration documentation. |
| HyperFrames | https://hyperframes.heygen.com/ | An optional alternative renderer; do not switch frameworks halfway through the main tutorial. |

The aiTrends reference is linked by its exact video URL above. Its channel handle was not independently resolved; do not invent a channel homepage URL.

Use the reference channels to inspect their visible storytelling and presentation. Their actual production tools, revenue, watch-time retention, and private analytics have not been established. Do not claim they use our proposed workflow. The main tutorial teaches one way to produce an original video in the general format.

If actual channel pages or videos cannot be accessed, keep their names and exact links in the resource list. Use clearly identified illustrative cards where needed, and do not fabricate screenshots, subscriber numbers, view counters, or quotations.

### 3. The idea and packaging

**Core promise:** Show the viewer how to take one original topic through a usable script, narration, scene plan, consistent characters, coded animation, sound, and a rendered video file.

**Chosen title:** How to Create Videos Like Ifverse with Claude Opus 5.5 (Full Workflow)

**Alternative title directions:**

- How to Recreate This Animated YouTube Format with AI
- How to Build a Faceless Animation Workflow with Claude
- Claude Opus 5.5 Animation: From Script to Finished Video

If the user prefers the word "clone," a bounded alternative is: **How to Clone a Faceless Channel's Format with Claude Opus 5.5**. The teaching must explain general structure, pacing, and production technique while creating new scripts, characters, graphics, and branding.

**Thumbnail brief:** Warm off-white background. On the left, one plain script document. On the right, one expressive original illustrated character inside a finished video frame. Connect them with one thick cobalt arrow. Use the text "SCRIPT → VIDEO" and a small "Claude workflow" label. Keep it readable at phone size. This is a design brief, not an image-generation request.

**Opening strategy:** Show a short piece of the actual worked example after it exists. Then reveal the script and scene plan behind it. Present the result as the outcome we are building, not as evidence of views or earnings.

**Audience:** Beginners interested in animated science thought experiments and faceless storytelling. The viewer should leave understanding the process well enough to try one short scene.

**Example film topic:** What If You Remembered Every Single Day?

**Example premise:** You can deliberately recall scenes from your personal past with fictional precision. Your memory cannot predict the future or change what happened. A small relationship detail makes the eventual choice emotional. Scientific statements surrounding this fictional ability must be checked separately; do not present the premise as an established human ability.

Use this same example throughout the tutorial. Avoid changing topics between demonstrations.

### 4. Workflow that the tutorial will demonstrate

Use one consistent route:

**Topic → script → fact check → recorded narration → scene timestamps → character and environment system → animation → sound → review → export.**

The reference analysis describes a custom "aiTrends 2D Studio" plugin. No such plugin file was supplied. Do not claim to have installed it, reconstructed it, tested it, or included it. The proposed tutorial instead uses the documented Claude Code + Remotion route. If the user later supplies the original plugin, the relevant setup scene can be revised around its actual instructions.

Explain the tool roles accurately: Claude Code writes or edits the animation project; the rendering software produces the video frames/file; a voice recording or speech service supplies the narration. Show the real environment used during production.

If demonstrating the Remotion route, verify these official setup commands before recording:

```bash
npx create-video --yes --blank my-video
cd my-video
npx remotion skills add
npm run dev
```

The official documentation also describes starting your coding agent in that project directory. Do not present a blank chat window as a complete, configured rendering environment. Do not add unexplained installation steps or promise one-click results.

### 5. Global visual direction

Make a clean, readable, faceless tutorial. Use screen captures and bespoke explanatory motion graphics, with the narrator off screen. If the creator later supplies their own presenter footage, a small presenter inset can be added; do not recreate the reference presenter's appearance or voice.

**Canvas:** 1920 × 1080, 16:9, 30 fps. Eight minutes is 480 seconds or 14,400 frames. The timings below are a planning grid and should be adjusted to the final recorded voiceover while preserving the order and approximately eight-minute length.

**Palette:** paper #F4F1EB, charcoal #16202A, cobalt #455CF5, mint #3ECF8E, amber #F6B344. Use cobalt to mark the active step, mint to mark a demonstrated completed result, and amber to flag a specific item requiring correction. Do not use color alone to communicate status.

**Typography:** one licensed sans-serif family with two weights. Titles roughly 72–88 px, section labels 48–56 px, body labels 38–44 px at 1080p. Adapt for actual text length. Keep important elements at least 100 px from the picture edges. Keep captions clear of interface controls and labels.

**Compositions:** alternate full-screen demonstrations, split-screen explanations, and short diagram interludes. Show one main idea at a time. Real interface captures can use a rounded frame with a subtle shadow. A reconstructed UI must be visibly marked "Illustration" and must not imply a real tool result.

**Mandatory editing rhythm:** Use the 97-shot grid under the twenty teaching sequences. Most shots are 3–6 seconds, with one planned seven-second code-reading shot. In the first fifteen seconds, use four purposeful shots. A change must reveal new information, reframe the useful part of a demonstration, show a result, or advance an action; a blinking cursor, tiny zoom, or background particle does not count by itself. These are editorial targets, not a scientifically proven retention formula.

Avoid a static full-screen diagram or presenter layout lasting 20–30 seconds. Use an establishing view, a relevant detail, the action, and its result. Hold code/prompts long enough to read; if a later recording needs more than eight seconds for one instruction, allow that specific hold and compensate nearby. Keep continuous example-film playback visually active with real story cuts while its audio stays uninterrupted.

**Motion defaults:** enter over 8–12 frames, stagger related objects by 3 frames, hold a short label long enough to read, and exit over 6–8 frames. Use restrained ease-out motion. Most joins should be straight cuts, focused crops, match cuts, or a brief overlay carried across the cut. Reserve an occasional 6–10-frame transition for a genuine topic change. Do not use a loud whoosh at every cut.

**Attention structure:** Establish the result in the opening, then make clear which practical question the next sequence answers. Every 20–30 seconds, show a useful result or comparison: chosen topic, story rule, verified claim, recorded voice, consistent character, working action, corrected timing, or exported file. Keep the narration continuous across related shots. Remove repeated introductions and long logo/title stings.

**Reading and captions:** Use short emphasis text, generally 2–6 words. Interface documents can contain more text, but crop to the relevant few lines and provide the full text separately. Caption phrases should follow actual speech and leave the active interface field unobstructed. Fast cutting must not make the demonstrated action impossible to follow.

**Screen interaction:** use a high-contrast cursor, one short click ring for an actual click, and a soft highlight behind the specific field being discussed. Zoom into the active part of the interface rather than moving the whole screen continuously. Show lengthy operations as labeled time-lapses or honest cuts.

**Sound:** dry, understandable narration leads the mix. Add soft clicks for deliberate actions, restrained movement sounds for diagram changes, and a light background bed only where it helps. Speech must remain clearly above music. Silence is useful during the final example and before important explanations. Use original or appropriately licensed audio.

**Character continuity:** create one original example-film protagonist named Noah: a simple rounded figure, terracotta jacket, cream shirt, dark trousers, short dark hair, and a small blue notebook. Keep proportions, clothing, outline weight, and notebook shape consistent. Friend Mila wears a muted green sweater. Use expressive posture and eyelines rather than constant floating or random movement.

### 5A. Explicit ElevenLabs voiceover plan

**You may use ElevenLabs for the voiceover during production.** Prefer it for the tutorial narrator and, if needed, for the example film's narration. These are two separate scripts and audio tracks; the full example-film narration must not be inserted into the eight-minute tutorial.

In PLANNING mode, deliver clean voiceover text and a recording brief. In PRODUCTION mode, use a real available ElevenLabs connection or the user's ElevenLabs workflow. If no connection is available, prepare the exact paste-ready text and request/import the resulting audio when needed; do not claim that an audio file was generated. Do not ask the user to paste private API keys into ordinary chat.

**Starting voice direction:** clear English, friendly and confident, conversational rather than sales-like. Use one licensed narrator voice consistently. Eleven Multilingual v2 is a reasonable initial model for stable longer narration if available; choose another available model if an actual listening comparison gives a better result. Start at the voice's normal speed, then adjust after listening. Aim for a brisk, understandable delivery around 145–160 words per minute, measured from the recording rather than assumed from a speed setting.

**Record in sensible chunks:** create roughly 20–40-second narration segments at sentence/paragraph boundaries, not a separate TTS request for every 3–6-second shot. Keep voice, model, and settings consistent across related segments. A narration segment can span several shots. Preserve small natural pauses and avoid abrupt cuts between generated segments.

**Workflow:** finalize the tutorial script; make a short sample when production is requested; listen for pronunciation and tone; retain the chosen voice/settings; generate the remaining required segments; measure their actual lengths; and align the visual cuts to those recordings. Reuse satisfactory audio instead of repeatedly regenerating the entire narration. Use an authoritative timing response if available, or align/transcribe the actual audio; do not invent word timestamps.

**Speech text versus directions:** keep stage directions, shot IDs, headings, and filenames out of the spoken payload. Supply delivery notes separately. Use punctuation naturally. The supplied example-film prompt's heavy ellipsis pattern is a writing reference, not a requirement to create a hesitation after every phrase. Check the selected model's supported controls before adding any special pause or emotion markup.

**Audio organization for production:** label the two scripts and their tracks clearly as Tutorial Narration and Example Film Narration. Within the animation project, retain the chosen voice/settings, segment order, measured lengths, and links to the actual local audio assets. Ensure the actual final audio mix has intelligible speech and no clipping; only report checks that were performed.

### 5B. Claude model map for every visual scene

**First establish the entire visual system and the representative prototype with Opus 5.5 — High.** The map below assigns the build model for each scene/shot once that common foundation exists. All 97 shot rows also carry their own model/effort column. Use Opus 5.5 — High for the master script, shared character rig, global timing, and final integrated review even when routine layout shots use Sonnet.

The model is the tool that plans/implements a scene; the viewer is not shown a model change at each cut. Work in sequence groups and keep project files, style definitions, and audio cues continuous. If the running Claude session cannot change its own model, report the recommended choice and let the user select it through the model control. Do not stop the whole project for a switch when staying on Opus already satisfies the task.

| Teaching sequence | Shot IDs | Recommended model / effort | Reason |
| --- | --- | --- | --- |
| 01 | 01A–01D | Opus 5.5 — High | Original character action, memory-panel reveal, and the opening visual payoff. |
| 02 | 02A–02D | Sonnet 5.5 — Medium | Reusable script-to-video cards after the typography and motion system are established. |
| 03 | 03A–03E | Sonnet 5.5 — Medium | Reference names, links, actual-capture framing, and routine card transitions. |
| 04 | 04A–04D | Opus 5.5 — High | Original story diagrams, character reaction, and the notebook callback. |
| 05 | 05A–05D | Sonnet 5.5 — Medium | A repeated workflow-map component with straightforward label reveals. |
| 06 | 06A–06E | Opus 5.5 — High | Actual setup capture, correct tool explanation, and integration with a working preview. |
| 07 | 07A–07E | Sonnet 5.5 — Medium | Formatting the approved topic prompt and actual result cards with existing components. |
| 08 | 08A–08E | Opus 5.5 — High | Story-rule selection, consequence structure, emotional choice, and meaningful visual mapping. |
| 09 | 09A–09E | Opus 5.5 — High | Evidence checking and precise wording, with careful separation of fact and fiction. |
| 10 | 10A–10E | Opus 5.5 — High | ElevenLabs workflow, real audio assets, and accurate speech/waveform alignment. |
| 11 | 11A–11E | Opus 5.5 — High | Narration-to-shot timing and the correct ordering of visible actions. |
| 12 | 12A–12E | Opus 5.5 — High | Reusable character design, posing, consistent proportions, and attached limbs. |
| 13 | 13A–13E | Opus 5.5 — High | Environment layers, contact with the set, perspective, and restrained parallax. |
| 14 | 14A–14E | Opus 5.5 — High | Anticipation, hand-to-prop contact, body mechanics, and readable reaction. |
| 15 | 15A–15E | Opus 5.5 — High | Measured narration cues and a fair synchronized before/after comparison. |
| 16 | 16A–16E | Opus 5.5 — High | Actual audio layers, speech clarity, synchronization, and deliberate mixing. |
| 17 | 17A–17F | Opus 5.5 — High | Diagnosing and fixing a real defect while preserving the approved design. |
| 18 | 18A–18E | Opus 5.5 — High | Actual render/export behavior and inspection of the real output file. |
| 19 | 19A–19F | Opus 5.5 — High | Finished character performance, emotional continuity, and polished story editing. |
| 20 | 20A–20D | Sonnet 5.5 — Medium | Reuse of the approved workflow/end-screen components with short text changes. |

Use **Opus 5.5 — High** instead of the optional Sonnet assignment whenever a simple scene introduces new illustration, complex movement, unsupported factual claims, or a timing problem. Small text edits to an already working component can stay on Sonnet — Medium. These assignments are editorial/engineering recommendations rather than benchmark guarantees for individual scenes.

### 5C. Clean animation: concrete implementation and review requirements

**Art direction:** Produce deliberate, finished motion graphics and original expressive character animation. Use a consistent layout grid, spacing, visual hierarchy, outline weight, lighting direction, palette, and corner treatment. Use crisp shapes/vector assets where suitable. The finished sequence should have a coherent illustrated design rather than unrelated default components or unrefined placeholder drawings.

**Timing and motion:** Give every move a clear start, purpose, and settled end. Use a small shared family of easing curves; keep acceleration and deceleration smooth. Use springs sparingly and tune them so text/cards settle once without visible wobble. For a 3–6-second shot, an 8–12-frame entrance can be followed by a readable action/hold. Avoid adding movement to every element at once.

**Stable geometry:** Keep text baselines, card edges, and stationary props aligned. Do not let an element drift a pixel back and forth, resize between cuts, change outline thickness, or pop to a new anchor at the end of an interpolation. Keep text/vector edges sharp and prevent flickering shadows or inconsistent antialiasing.

**Character mechanics:** Keep heads and bodies at consistent scale. Arms remain attached, hands contact the intended object, feet/chairs stay grounded, and eyelines point toward the actual subject. Use anticipation before a reach and a small settle after contact. Preserve Noah's notebook shape, jacket, proportions, and facial design in every shot. Use posture, expression, and a clear silhouette to communicate the action.

**Depth and camera:** Maintain perspective and plausible layer ordering. Keep foreground, characters, and background moving in a consistent relationship during parallax. Use restrained pushes/reframes that reveal something useful. Return smoothly to a stable composition; do not create a continuous floating-camera effect or arbitrary zoom on every sentence.

**Transitions and edit rhythm:** Preserve the 97-shot cadence without making the sequence feel restless. Prefer a clean cut, useful crop, or intentional match cut. Carry narration and relevant ambient sound across adjacent shots. Make the outgoing and incoming frame agree about prop position, character scale, and eyeline where continuity requires it. Reserve conspicuous transitions for a genuine topic change.

**Frame-based implementation:** Drive the animation from the renderer's shared video-frame timeline so a given frame produces the same image in preview and export. Use seeded randomness only where an effect needs variation. Avoid independent wall-clock animation or uncontrolled per-render randomness that changes poses/particles between renders. Use one common frame rate and explicit shot start/end boundaries. Frame-dependent motion is documented in Remotion's animation guide.

**Readable screen demonstrations:** Keep the actual active field large enough to read. Shorten displayed excerpts or crop tighter instead of squeezing text into tiny type. Keep captions, cursor emphasis, and labels away from the important interface control. Long instructions remain available as downloadable text. A fast cut is useful only if the viewer can still follow the action/result.

**Prototype before extension:** In production, build a 15–20-second sample covering one card/text transition, one character/prop action, and a piece of actual voiceover. Preview it at normal speed and inspect critical start/middle/end/contact frames. Fix the shared design, motion curves, and timing before reusing those components across the remaining shots. This prompt revision itself does not request rendering.

**Review loop:** For every implemented sequence, inspect actual playback and representative rendered frames. Look for jitter, detached limbs, foot sliding, clipping, overlapping labels, abrupt cuts, unreadable type, wrong layer order, audio discontinuities, and inconsistent color/scale. State the defect specifically, correct its underlying component/timing, and review again. A report saying "clean" is not a substitute for inspecting the output.

**Acceptance for each shot:** The intended action is obvious at normal playback; framing/text are readable; motion starts and settles cleanly; characters/props stay consistent; no visible clipping/jitter/contact error remains; the cut to the next shot is intentional; and the real audio cue matches the action. If a check cannot be performed in the available environment, list that limitation honestly. Do not present an unreviewed first render as a polished result.

### 6. Complete tutorial storyboard: twenty sequences and 97 short shots

These are original proposed tutorial sequences, not a claim that every movement appears in the source video. Each sequence contains an exact short-shot grid. Treat each grid row as a visual scene, with a shared narration thread across related rows. The broad composition and motion notes describe the complete sequence; the shot grid determines the actual edit cadence. Each Claude direction must be expanded into shot-specific instructions when preparing the written production package. At the present stage, return written plans and prompts only.

#### Sequence 01 — Show the outcome

**Claude model for these shots:** Opus 5.5 — High. Keep the same approved style, character definitions, real audio, and frame timeline.

**Time:** 00:00–00:15. **Purpose:** Give the viewer a concrete reason to watch.

**Narration direction:** Open with the result the viewer will learn to make. Briefly identify it as an original animated story built from a script and a consistent scene system. Write a short, confident opening without unverified performance claims.

**Visual composition:** Full-screen excerpt from the future example film: Noah sits at a café table, touches his blue notebook, and deliberately recalls a small moment with Mila. A few original illustrated memory panels appear behind him. This is a visual metaphor for the fictional premise. The film fills the screen for the opening seconds, followed by a small "Worked example" label.

**Motion:** Establish the café for two seconds. Noah turns his head and places a hand on the notebook. Three memory panels appear at 0.15-second intervals along a gentle arc. Move the camera slightly toward the notebook. Toward the end, pull back to reveal the excerpt inside a video-player frame, then cut to the script document.

**Sound/transition:** Café ambience under the story excerpt, a quiet paper sound for the notebook, then a clean music change into the tutorial. Keep at least a few seconds free of tutorial narration so the audience can experience the example.


**Required short-shot edit grid:** Each row is a separate purposeful shot. Keep the narration flowing across related rows.

| Shot | Global time | Composition and motion | Text / audio / transition cue | Claude model / effort |
| --- | --- | --- | --- | --- |
| 01A | 00:00–00:03 (3s) | **Outcome wide.** Show Noah and Mila in the original café scene; Noah notices the blue notebook. Use a clean wide composition and one clear eyeline change. | Small Worked example label; café ambience, then a straight cut. | **Opus 5.5 — High** |
| 01B | 00:03–00:06 (3s) | **Notebook detail.** Cut to the hand touching the notebook. Show actual contact, the cover starting to open, and a restrained push toward the prop. | No extra headline; synchronize the paper sound to contact. | **Opus 5.5 — High** |
| 01C | 00:06–00:10 (4s) | **Memory reveal.** Cut wider as three original memory panels enter behind Noah. Keep his outline clear and the fictional recall visually distinct from the present. | One short example-film line may continue across the cut; no tutorial explanation over it. | **Opus 5.5 — High** |
| 01D | 00:10–00:15 (5s) | **Reveal the process.** Pull the result into a player frame, then cut to the script and a small scene timeline that produced the excerpt. | SCRIPT → VIDEO; change into tutorial narration/music without claiming the draft is already rendered. | **Opus 5.5 — High** |

**Shot-prompt rule:** For each row, include its recommended Claude model/effort, ID, exact time, visual/action description, and cue with REFERENCE_STYLE from the primary video, the locked palette/character design, actual available assets, neighboring transition, and concrete clean-animation acceptance checks. Return one concise copyable shot prompt per row. The sequence-level Claude direction below is a summary; it must not become one long static shot.

**Claude direction:** "Plan a 15-second opening using the original Noah café example. Specify the character action, three memory panels, gentle camera push, and final reveal into a video-player frame. The actual example must be produced before it is shown as a completed result. Keep the animation emotionally clear and the tutorial label small."

#### Sequence 02 — State the promise

**Claude model for these shots:** Sonnet 5.5 — Medium. Use this optional lighter route only after Opus has established the reusable style/components; staying on Opus 5.5 — High is also suitable.

**Time:** 00:15–00:35. **Purpose:** Make the learning outcome obvious.

**Narration direction:** Explain that we will choose an original idea, shape the story, build the visuals, and export a video. State the practical promise in plain language.

**Visual composition:** Paper background. A script document occupies the left third; a finished example frame occupies the right third. Across the middle, four simple labeled objects: "Idea," "Story," "Scenes," "Video." Add the title below, with "Full workflow" as a small secondary label.

**Motion:** Bring the four objects in one at a time as they are named. Draw their connecting line after all four are visible. Let a small cobalt dot move once from the document to the video frame. Hold the complete diagram long enough to understand it.

**Sound/transition:** Four subtle ticks, followed by a soft settling sound. The "Idea" object expands into the next scene's reference workspace.


**Required short-shot edit grid:** Each row is a separate purposeful shot. Keep the narration flowing across related rows.

| Shot | Global time | Composition and motion | Text / audio / transition cue | Claude model / effort |
| --- | --- | --- | --- | --- |
| 02A | 00:15–00:19 (4s) | **Idea card.** Fill the frame with the selected original topic card; replace the player view with a simple document silhouette. | One original idea; straight cut carried by the narration. | **Sonnet 5.5 — Medium** |
| 02B | 00:19–00:24 (5s) | **Story document.** Cut to a few readable lines of the example script; highlight only the limiting rule. | A usable story; soft paper movement. | **Sonnet 5.5 — Medium** |
| 02C | 00:24–00:29 (5s) | **Scene-to-action match.** Show the matching storyboard thumbnail, then its corresponding Noah action in a split view. | Scenes that make sense; use one meaningful match cut. | **Sonnet 5.5 — Medium** |
| 02D | 00:29–00:35 (6s) | **Finished-output promise.** Show the planned output frame and the four-step route together. Hold long enough to read the short labels. | Idea / Story / Scenes / Video; no extra title sting. | **Sonnet 5.5 — Medium** |

**Shot-prompt rule:** For each row, include its recommended Claude model/effort, ID, exact time, visual/action description, and cue with REFERENCE_STYLE from the primary video, the locked palette/character design, actual available assets, neighboring transition, and concrete clean-animation acceptance checks. Return one concise copyable shot prompt per row. The sequence-level Claude direction below is a summary; it must not become one long static shot.

**Claude direction:** "Design a 20-second tutorial promise graphic. Use the exact four labels Idea, Story, Scenes, Video. Position an original document and an original example frame on opposite sides. Reveal each step on its narration cue, draw one connecting line, and hold the full layout."

#### Sequence 03 — Identify the references

**Claude model for these shots:** Sonnet 5.5 — Medium. Use this optional lighter route only after Opus has established the reusable style/components; staying on Opus 5.5 — High is also suitable.

**Time:** 00:35–01:00. **Purpose:** Show viewers the channels being discussed and explain the scope of inspiration.

**Narration direction:** Introduce Ifverse as the main format reference. Mention Day One Films and Last Soul as additional examples of compact emotional animated storytelling. Separate observable features from guesses about how those channels are produced.

**Visual composition:** Three cards with the exact channel names and handles from the registry. If real page captures are available, use them inside the cards with a visible capture date. Otherwise show plain reference cards with links; keep all popularity numbers absent. The active Ifverse card is larger and centered, with the other two slightly smaller.

**Motion:** Slide the three cards into a tidy row. Highlight each name once when mentioned. Enlarge Ifverse gently for the transition, then replace its card with a diagram of the content format.

**Sound/transition:** Light interface sounds only. Keep names and handles on screen for several seconds.


**Required short-shot edit grid:** Each row is a separate purposeful shot. Keep the narration flowing across related rows.

| Shot | Global time | Composition and motion | Text / audio / transition cue | Claude model / effort |
| --- | --- | --- | --- | --- |
| 03A | 00:35–00:39 (4s) | **Reference overview.** Show three plain channel-name/link cards together. Use dated actual captures only if available. | Reference channels; a single restrained entrance. | **Sonnet 5.5 — Medium** |
| 03B | 00:39–00:44 (5s) | **Ifverse focus.** Cut to a closer Ifverse card or a readable real page crop with its handle visible. | Ifverse / @ifversetales; narration explains its role. | **Sonnet 5.5 — Medium** |
| 03C | 00:44–00:49 (5s) | **Day One Films focus.** Cut to the Day One Films reference and one available credited title example, without invented analytics. | Day One Films / @dayonefilmsofficial; clean cut. | **Sonnet 5.5 — Medium** |
| 03D | 00:49–00:54 (5s) | **Last Soul focus.** Cut to the Last Soul card or actual capture, preserving its exact handle. | Last Soul / @lastsoulorigin; keep the source link legible. | **Sonnet 5.5 — Medium** |
| 03E | 00:54–01:00 (6s) | **Reference to new work.** Replace the references with our original Noah/Mila design and topic card. Make the new project visibly its own work. | Original story / Original visuals; end on the new format diagram. | **Sonnet 5.5 — Medium** |

**Shot-prompt rule:** For each row, include its recommended Claude model/effort, ID, exact time, visual/action description, and cue with REFERENCE_STYLE from the primary video, the locked palette/character design, actual available assets, neighboring transition, and concrete clean-animation acceptance checks. Return one concise copyable shot prompt per row. The sequence-level Claude direction below is a summary; it must not become one long static shot.

**Claude direction:** "Create a 25-second reference-channel section using Ifverse @ifversetales, Day One Films @dayonefilmsofficial, and Last Soul @lastsoulorigin. Use actual captures only if provided and readable; otherwise use clearly designed name/link cards. Do not invent statistics or imply access to their internal production methods."

#### Sequence 04 — Explain the repeatable format

**Claude model for these shots:** Opus 5.5 — High. Keep the same approved style, character definitions, real audio, and frame timeline.

**Time:** 01:00–01:20. **Purpose:** Turn the reference into understandable production decisions.

**Narration direction:** Explain the four useful ingredients in our example: one clear question, a story consequence, an emotional choice, and a visual payoff. Present this as the structure we will use.

**Visual composition:** Four paper panels show a question mark beside Noah, a small consequence diagram, Noah and Mila facing a choice, and a final notebook callback. Each panel is drawn in our own visual language, with one short label underneath.

**Motion:** Illuminate panels in sequence. Draw arrows only after the relevant relationship is explained. For the emotional-choice panel, let Noah turn toward Mila. End with the four panels compressed into a small "Format" card.

**Sound/transition:** One understated accent at the visual payoff. The format card docks into the workflow overview.


**Required short-shot edit grid:** Each row is a separate purposeful shot. Keep the narration flowing across related rows.

| Shot | Global time | Composition and motion | Text / audio / transition cue | Claude model / effort |
| --- | --- | --- | --- | --- |
| 04A | 01:00–01:04 (4s) | **The question.** Frame Noah beside the worked-example question, using a large simple question symbol. | One clear question; no invented evidence graphic. | **Opus 5.5 — High** |
| 04B | 01:04–01:09 (5s) | **The consequence.** Cut to a memory panel affecting his attention in the present, with a simple cause/result arrow. | A visible consequence; reveal the result on the spoken cue. | **Opus 5.5 — High** |
| 04C | 01:09–01:14 (5s) | **The choice.** Cut to Noah facing Mila while the notebook remains between them. Use posture and eyeline to establish the decision. | An emotional choice; briefly simplify the background. | **Opus 5.5 — High** |
| 04D | 01:14–01:20 (6s) | **The callback.** Close on the blue notebook, then show a compact four-card structure with the callback connected to the opening. | A payoff; match the notebook shape into the workflow. | **Opus 5.5 — High** |

**Shot-prompt rule:** For each row, include its recommended Claude model/effort, ID, exact time, visual/action description, and cue with REFERENCE_STYLE from the primary video, the locked palette/character design, actual available assets, neighboring transition, and concrete clean-animation acceptance checks. Return one concise copyable shot prompt per row. The sequence-level Claude direction below is a summary; it must not become one long static shot.

**Claude direction:** "Plan a 20-second original diagram showing Question, Consequence, Choice, Payoff. Use our own Noah/Mila illustrations. Make every animation express the narrated relationship rather than decorate the background. Finish with a compact format card."

#### Sequence 05 — Show the workflow map

**Claude model for these shots:** Sonnet 5.5 — Medium. Use this optional lighter route only after Opus has established the reusable style/components; staying on Opus 5.5 — High is also suitable.

**Time:** 01:20–01:40. **Purpose:** Give the viewer a map for the practical steps.

**Narration direction:** Walk through the work in order. Mention that we check the story and narration before spending time animating it.

**Visual composition:** A two-row route: Topic, Script, Check, Voice, Scenes on the first row; Characters, Motion, Sound, Review, Export on the second. Use small plain icons and short labels. A lower strip shows three outputs: script, audio, MP4.

**Motion:** Reveal the top row, then the lower row. Move an active-step outline from Topic to Export once. Then return it to Topic. During later scenes, a simplified progress strip may briefly mark the current stage.

**Sound/transition:** Subtle clicks and a clean cut into the real setup screen.


**Required short-shot edit grid:** Each row is a separate purposeful shot. Keep the narration flowing across related rows.

| Shot | Global time | Composition and motion | Text / audio / transition cue | Claude model / effort |
| --- | --- | --- | --- | --- |
| 05A | 01:20–01:24 (4s) | **Writing route.** Show only Topic, Script, Check in a large three-item diagram. | Topic → Script → Check; reveal in spoken order. | **Sonnet 5.5 — Medium** |
| 05B | 01:24–01:29 (5s) | **Voice and scenes.** Cut to the real voice waveform beside three scene cards, connecting speech to the plan. | Voice → Scenes; preserve readable scale. | **Sonnet 5.5 — Medium** |
| 05C | 01:29–01:34 (5s) | **Production route.** Cut to Characters, Motion, Sound with small examples under each label. | Characters → Motion → Sound; use restrained highlights. | **Sonnet 5.5 — Medium** |
| 05D | 01:34–01:40 (6s) | **Review and export.** Show the final two steps, then a brief wide map of the complete route before entering setup. | Review → Export; one quiet completion accent. | **Sonnet 5.5 — Medium** |

**Shot-prompt rule:** For each row, include its recommended Claude model/effort, ID, exact time, visual/action description, and cue with REFERENCE_STYLE from the primary video, the locked palette/character design, actual available assets, neighboring transition, and concrete clean-animation acceptance checks. Return one concise copyable shot prompt per row. The sequence-level Claude direction below is a summary; it must not become one long static shot.

**Claude direction:** "Build a legible 20-second workflow map with ten steps arranged in two rows of five. Follow the exact order specified. Use a single active outline, avoid tiny text, and prepare a simplified version that can identify later stages."

#### Sequence 06 — Set up the real tools

**Claude model for these shots:** Opus 5.5 — High. Keep the same approved style, character definitions, real audio, and frame timeline.

**Time:** 01:40–02:05. **Purpose:** Show where the workflow actually happens.

**Narration direction:** Explain that Claude Code works inside an animation project and Remotion provides preview/rendering. Show the prerequisites briefly. Keep installation details tied to the official documentation.

**Visual composition:** Real browser capture of the official Remotion coding-agent guide, followed by a terminal/project capture and a working preview. Include a clear cut between each environment. Show only necessary non-sensitive content.

**Motion:** Crop into the documented setup command. Show the real entry of each short command. Use an explicit time-lapse label if setup is accelerated. Finish with the preview occupying most of the frame and a small project-window inset.

**Sound/transition:** Natural keyboard sounds at a restrained level. Do not use a fake success animation before the actual preview loads. Cut from the working preview to the topic prompt.


**Required short-shot edit grid:** Each row is a separate purposeful shot. Keep the narration flowing across related rows.

| Shot | Global time | Composition and motion | Text / audio / transition cue | Claude model / effort |
| --- | --- | --- | --- | --- |
| 06A | 01:40–01:43 (3s) | **Tool roles.** Use three large labels to establish Claude, Remotion, and Audio as distinct parts of the workflow. | Plan / Animate / Narrate; straight cut into documentation. | **Opus 5.5 — High** |
| 06B | 01:43–01:48 (5s) | **Official guide.** Show a real crop of the official Remotion coding-agent setup page with the current relevant command visible. | Official setup; underline only the active line. | **Opus 5.5 — High** |
| 06C | 01:48–01:55 (7s) | **Readable setup command.** Cut to the actual terminal and hold the documented short setup command long enough to read and see it run. | Keep command text readable; label acceleration if the operation is sped up. | **Opus 5.5 — High** |
| 06D | 01:55–02:00 (5s) | **Project and agent.** Show the real project directory and agent window after setup; crop to relevant content. | Animation project; no private paths or account details. | **Opus 5.5 — High** |
| 06E | 02:00–02:05 (5s) | **Working preview.** Cut to the actual loaded preview, using a smaller project inset to show where edits happen. | Preview ready only after it exists; natural sound into the topic prompt. | **Opus 5.5 — High** |

**Shot-prompt rule:** For each row, include its recommended Claude model/effort, ID, exact time, visual/action description, and cue with REFERENCE_STYLE from the primary video, the locked palette/character design, actual available assets, neighboring transition, and concrete clean-animation acceptance checks. Return one concise copyable shot prompt per row. The sequence-level Claude direction below is a summary; it must not become one long static shot.

**Claude direction:** "Write a 25-second setup demonstration plan using the official Remotion coding-agent instructions. Identify the real screen captures needed: documentation, project setup, coding-agent window, working preview. Keep displayed commands verified and readable. Do not imply that an unconfigured chat window can already render videos."

#### Sequence 07 — Choose the topic

**Claude model for these shots:** Sonnet 5.5 — Medium. Use this optional lighter route only after Opus has established the reusable style/components; staying on Opus 5.5 — High is also suitable.

**Time:** 02:05–02:30. **Purpose:** Teach the first supplied prompt.

**Narration direction:** Explain how the supplied topic prompt limits ideas to one exaggerated human ability and asks for understandable titles. Run it as one deliberate stage, then select a viable idea.

**Visual composition:** Split screen. On the left, an editable view of the user's topic prompt with three phrases highlighted: "one change," "body or mind," and "real consequences." On the right, show a short excerpt of actual generated titles once available. The selected worked-example card reads "What If You Remembered Every Single Day?"

**Motion:** Highlight one rule at a time. Scroll the output slowly enough to read a few options. Move the selected title into a separate working document. Keep the full prompt accessible in the resource document rather than squeezing it onto a single screen.

**Sound/transition:** A quiet selection click. The chosen title becomes the heading of the script workspace.


**Required short-shot edit grid:** Each row is a separate purposeful shot. Keep the narration flowing across related rows.

| Shot | Global time | Composition and motion | Text / audio / transition cue | Claude model / effort |
| --- | --- | --- | --- | --- |
| 07A | 02:05–02:09 (4s) | **Topic prompt entry.** Show the supplied TOPIC prompt in a real editable document, cropped to its purpose and input. | Choose one human ability; readable text crop. | **Sonnet 5.5 — Medium** |
| 07B | 02:09–02:14 (5s) | **One-change rule.** Cut closer to the rule limiting the premise to one body or mind change. Highlight once and hold. | One change; avoid a rapid scroll. | **Sonnet 5.5 — Medium** |
| 07C | 02:14–02:19 (5s) | **Actual title results.** Show a few actual generated titles at readable size, with a slow brief scroll if needed. | Actual output when available; do not squeeze in all 35 titles. | **Sonnet 5.5 — Medium** |
| 07D | 02:19–02:24 (5s) | **Select the example.** Cut to the original memory topic selected in a separate working document. | What If You Remembered Every Single Day?; keep the complete title readable. | **Sonnet 5.5 — Medium** |
| 07E | 02:24–02:30 (6s) | **Consequence check.** Show three original consequence thumbnails and the notebook relationship hook to test whether the premise supports a story. | Can it carry a story?; move the selected card into the script workspace. | **Sonnet 5.5 — Medium** |

**Shot-prompt rule:** For each row, include its recommended Claude model/effort, ID, exact time, visual/action description, and cue with REFERENCE_STYLE from the primary video, the locked palette/character design, actual available assets, neighboring transition, and concrete clean-animation acceptance checks. Return one concise copyable shot prompt per row. The sequence-level Claude direction below is a summary; it must not become one long static shot.

**Claude direction:** "Design a 25-second topic-selection scene using the supplied TOPIC prompt as teaching material. Show three highlighted constraints, a readable excerpt of actual results, and the selection of the original memory topic. Do not output the 35-title list as a replacement for the tutorial."

#### Sequence 08 — Build the example script

**Claude model for these shots:** Opus 5.5 — High. Keep the same approved style, character definitions, real audio, and frame timeline.

**Time:** 02:30–02:55. **Purpose:** Teach how the second supplied prompt shapes a story.

**Narration direction:** Explain that the script prompt produces a complete sample film, while we show only short excerpts inside this tutorial. Emphasize the limiting rule and the emotional decision.

**Visual composition:** A document titled with the memory topic. Beside it, five large story cards: Hook, Rule, Consequences, Choice, Callback. A small note identifies the sample-film target as 900–1,050 words. Do not apply that formatting rule to the tutorial itself.

**Motion:** Move selected script excerpts onto the five cards. Highlight the rule: remembering the past does not reveal the future. Show the blue notebook as the callback prop. Hold the final five-card map for several seconds.

**Sound/transition:** Paper-like movement sounds, then a precise cut to the fact-check table.


**Required short-shot edit grid:** Each row is a separate purposeful shot. Keep the narration flowing across related rows.

| Shot | Global time | Composition and motion | Text / audio / transition cue | Claude model / effort |
| --- | --- | --- | --- | --- |
| 08A | 02:30–02:34 (4s) | **Fill the script input.** Show the selected topic being inserted into the supplied SCRIPT prompt. | Topic entered; real typing or an explicitly illustrative edit. | **Opus 5.5 — High** |
| 08B | 02:34–02:39 (5s) | **Output excerpt.** Cut to a readable short excerpt of the resulting example-film script. | Example-film script; keep tutorial narration separate. | **Opus 5.5 — High** |
| 08C | 02:39–02:44 (5s) | **Find the rule.** Highlight the sentence explaining that recall does not predict or change events, alongside a simple visual cue. | The limiting rule; reveal only the relevant line. | **Opus 5.5 — High** |
| 08D | 02:44–02:49 (5s) | **Find the emotional choice.** Cut to the Noah/Mila choice thumbnail and the sentence motivating the decision. | The emotional choice; use an original character action. | **Opus 5.5 — High** |
| 08E | 02:49–02:55 (6s) | **Story structure result.** Show the compact Hook, Rule, Consequences, Choice, Callback map with the notebook linked to its two appearances. | 900–1,050 words applies to the full example film; clean cut to fact-checking. | **Opus 5.5 — High** |

**Shot-prompt rule:** For each row, include its recommended Claude model/effort, ID, exact time, visual/action description, and cue with REFERENCE_STYLE from the primary video, the locked palette/character design, actual available assets, neighboring transition, and concrete clean-animation acceptance checks. Return one concise copyable shot prompt per row. The sequence-level Claude direction below is a summary; it must not become one long static shot.

**Claude direction:** "Plan a 25-second script-building demonstration. Show the user's SCRIPT prompt being filled with our selected topic, then map brief output excerpts to Hook, Rule, Consequences, Choice, Callback. Distinguish the full example-film script from the tutorial voiceover. Keep all displayed prose original."

#### Sequence 09 — Check the factual claims

**Claude model for these shots:** Opus 5.5 — High. Keep the same approved style, character definitions, real audio, and frame timeline.

**Time:** 02:55–03:20. **Purpose:** Make the science-checking stage practical.

**Narration direction:** Show how to separate the fictional power from factual surrounding statements. Demonstrate checking one real claim with a suitable primary or authoritative source. Do not invent a study to fill this scene.

**Visual composition:** Three-column table: "Claim," "Source," "Wording." Display one verified claim and one clearly fictional premise. Use a real source page in an inset once selected. If research is incomplete, leave the claim labeled "Needs verification" in the plan rather than writing a false fact.

**Motion:** Highlight the claim, underline the relevant source passage, and replace overconfident wording with a supported version. Keep the before/after change small enough to read. The fictional premise receives the literal label "Story premise."

**Sound/transition:** Soft check sound only after the evidence is shown. The verified script document moves into the narration stage.


**Required short-shot edit grid:** Each row is a separate purposeful shot. Keep the narration flowing across related rows.

| Shot | Global time | Composition and motion | Text / audio / transition cue | Claude model / effort |
| --- | --- | --- | --- | --- |
| 09A | 02:55–02:59 (4s) | **Separate the premise.** Frame the fictional perfect-recall premise in its own clearly labeled card. | Story premise; avoid presenting the power as a scientific result. | **Opus 5.5 — High** |
| 09B | 02:59–03:04 (5s) | **Select a real claim.** Cut to one actual surrounding factual statement that needs verification. | Check this claim; amber underline only on the claim. | **Opus 5.5 — High** |
| 09C | 03:04–03:09 (5s) | **Show the source.** Display a real authoritative source passage selected during research, cropped for reading. | Source title/link; do not invent a study or unreadable citation. | **Opus 5.5 — High** |
| 09D | 03:09–03:14 (5s) | **Revise wording.** Show the original wording and a short supported revision, emphasizing the actual changed phrase. | Supported wording; a small replacement animation. | **Opus 5.5 — High** |
| 09E | 03:14–03:20 (6s) | **Check result.** Show the three-column Claim, Source, Wording table with one row completed and any unresolved row honestly marked. | Verified only after checking; pass the updated script to voiceover. | **Opus 5.5 — High** |

**Shot-prompt rule:** For each row, include its recommended Claude model/effort, ID, exact time, visual/action description, and cue with REFERENCE_STYLE from the primary video, the locked palette/character design, actual available assets, neighboring transition, and concrete clean-animation acceptance checks. Return one concise copyable shot prompt per row. The sequence-level Claude direction below is a summary; it must not become one long static shot.

**Claude direction:** "Create a 25-second fact-checking storyboard with Claim, Source, Wording. Use an actually verified memory-related statement if available; otherwise specify the research task. Separate scientific evidence from the fictional perfect-memory premise. Do not equate the fictional premise with a real diagnosis or established ability."

#### Sequence 10 — Make the voiceover with ElevenLabs

**Claude model for these shots:** Opus 5.5 — High. Keep the same approved style, character definitions, real audio, and frame timeline.

**Time:** 03:20–03:45. **Purpose:** Explain why narration is recorded before final animation timing.

**Narration direction:** Demonstrate ElevenLabs text-to-speech using the finalized example-film narration. Identify the chosen available voice and model, play one short actual sample, and explain how its pauses set the visual rhythm. The tutorial narrator can also use ElevenLabs, as a separate track.

**Visual composition:** The finalized script on the left and a real waveform on the right. Use a real ElevenLabs capture of the chosen voice/model, the prepared text, and the actual resulting audio. Mark two deliberate pauses with small vertical bars. Display a modest "Narration recorded" status only after there is a real file.

**Motion:** Reveal the waveform from the actual audio. The playhead moves in sync with the selected sample. Highlight each script phrase when it is heard. Avoid filling the entire scene with a synthetic waveform unrelated to the recording.

**Sound/transition:** Let the sample voice speak clearly for several seconds. Cut at a natural pause into the timestamping explanation.


**Required short-shot edit grid:** Each row is a separate purposeful shot. Keep the narration flowing across related rows.

| Shot | Global time | Composition and motion | Text / audio / transition cue | Claude model / effort |
| --- | --- | --- | --- | --- |
| 10A | 03:20–03:24 (4s) | **ElevenLabs text input.** Show the actual ElevenLabs Text to Speech/Studio interface with the clean finalized speech excerpt. | ElevenLabs voiceover; keep stage directions out of the spoken text. | **Opus 5.5 — High** |
| 10B | 03:24–03:29 (5s) | **Voice and model.** Cut to the selected available narrator voice and model/settings, using a close crop. | One consistent voice; identify actual choices without inventing a voice ID. | **Opus 5.5 — High** |
| 10C | 03:29–03:34 (5s) | **Listen to a short sample.** Show the real preview/play action, then let the sample speak without competing tutorial narration. | Listen first; retain natural pauses and clear pronunciation. | **Opus 5.5 — High** |
| 10D | 03:34–03:39 (5s) | **Actual audio asset.** Cut to the actual created/imported audio asset and measured duration. | Real narration file; do not animate a fake output or waveform. | **Opus 5.5 — High** |
| 10E | 03:39–03:45 (6s) | **Speech and timing.** Show the real waveform beside the same script excerpt; highlight the phrase when heard. | Voice sets timing; transition at a natural pause to scene planning. | **Opus 5.5 — High** |

**Shot-prompt rule:** For each row, include its recommended Claude model/effort, ID, exact time, visual/action description, and cue with REFERENCE_STYLE from the primary video, the locked palette/character design, actual available assets, neighboring transition, and concrete clean-animation acceptance checks. Return one concise copyable shot prompt per row. The sequence-level Claude direction below is a summary; it must not become one long static shot.

**Claude direction:** "Plan a 25-second ElevenLabs voiceover demonstration in five short shots: real text input, chosen voice/model, short preview, actual audio result, and aligned script/waveform. Use a licensed narrator voice consistently. Make the voiceover first during production and derive its timing graphics from the actual recording. In planning mode provide speech text and delivery notes only."

#### Sequence 11 — Convert speech into scenes

**Claude model for these shots:** Opus 5.5 — High. Keep the same approved style, character definitions, real audio, and frame timeline.

**Time:** 03:45–04:10. **Purpose:** Teach the move from paragraph text to an animation plan.

**Narration direction:** Explain that one long paragraph is useful for the example-film voiceover, but animation needs short timed beats. Divide the story according to changes in action or meaning.

**Visual composition:** A paragraph at the top becomes a readable table below with columns for Start, End, Spoken beat, Visible action. Show only three rows at once. Use genuine timings from the narration when available.

**Motion:** Highlight one sentence group, then slide it into the first row. Repeat for two further groups. Each row receives one compact thumbnail. Draw a vertical playhead through the rows to demonstrate their order.

**Sound/transition:** Three restrained ticks. The first thumbnail expands into the character design workspace.


**Required short-shot edit grid:** Each row is a separate purposeful shot. Keep the narration flowing across related rows.

| Shot | Global time | Composition and motion | Text / audio / transition cue | Claude model / effort |
| --- | --- | --- | --- | --- |
| 11A | 03:45–03:49 (4s) | **Long paragraph.** Show a short readable portion of the example-film paragraph with the current spoken group highlighted. | From text to beats; no dense full-page display. | **Opus 5.5 — High** |
| 11B | 03:49–03:54 (5s) | **First timed beat.** Cut to the first scene-table row with actual or marked provisional start/end times and one visible action. | One idea per beat; keep all four columns readable. | **Opus 5.5 — High** |
| 11C | 03:54–03:59 (5s) | **Second action beat.** Show the next row and matching thumbnail as the narration changes the visible action. | A new action; use a distinct useful framing. | **Opus 5.5 — High** |
| 11D | 03:59–04:04 (5s) | **Third beat and link.** Cut to a third row, then draw a small connection to the preceding two thumbnails. | Speech → visible action; avoid invented exact word timing. | **Opus 5.5 — High** |
| 11E | 04:04–04:10 (6s) | **Mini timeline.** Expand the three rows into a simple timeline with the real audio underneath and short shot boundaries above. | Narration can cross cuts; the first character thumbnail opens the next sequence. | **Opus 5.5 — High** |

**Shot-prompt rule:** For each row, include its recommended Claude model/effort, ID, exact time, visual/action description, and cue with REFERENCE_STYLE from the primary video, the locked palette/character design, actual available assets, neighboring transition, and concrete clean-animation acceptance checks. Return one concise copyable shot prompt per row. The sequence-level Claude direction below is a summary; it must not become one long static shot.

**Claude direction:** "Plan a 25-second paragraph-to-storyboard transformation. Show three readable rows with actual or explicitly provisional timings, a short spoken beat, and a concrete visible action. Avoid an unreadably dense spreadsheet. Explain that final timing follows the recording."

#### Sequence 12 — Lock the characters

**Claude model for these shots:** Opus 5.5 — High. Keep the same approved style, character definitions, real audio, and frame timeline.

**Time:** 04:10–04:35. **Purpose:** Prevent the example character changing between scenes.

**Narration direction:** Explain reusable character parts and stable design choices. Demonstrate one character in three poses rather than regenerating a different appearance every time.

**Visual composition:** Noah centered on a simple turnaround/design sheet: neutral, pointing, and concerned poses. Add three labels for jacket, proportions, and notebook. Mila appears in a small secondary panel. Keep the scene about design continuity rather than a code lecture.

**Motion:** Reveal the neutral pose, then animate it into pointing and concern using the same underlying proportions. Briefly outline the reusable head, torso, and arm groups. The notebook keeps its size and color throughout.

**Sound/transition:** Soft drawing sounds with a quiet emphasis on the consistent notebook. Transition via the notebook's blue color to a background shape.


**Required short-shot edit grid:** Each row is a separate purposeful shot. Keep the narration flowing across related rows.

| Shot | Global time | Composition and motion | Text / audio / transition cue | Claude model / effort |
| --- | --- | --- | --- | --- |
| 12A | 04:10–04:14 (4s) | **Character introduction.** Show the original Noah neutral pose with terracotta jacket and blue notebook. | Meet Noah; stable full-body proportions. | **Opus 5.5 — High** |
| 12B | 04:14–04:19 (5s) | **Design anchors.** Cut closer to the jacket, head proportions, and notebook, identifying only those three consistent features. | Keep these consistent; no reference-channel artwork. | **Opus 5.5 — High** |
| 12C | 04:19–04:24 (5s) | **Pointing pose.** Show the same reusable character shifting naturally into a pointing pose. | Same design / New action; keep hand and arm joined. | **Opus 5.5 — High** |
| 12D | 04:24–04:29 (5s) | **Concerned pose.** Cut to a concerned expression/posture without changing clothing, head size, or outline weight. | Expression changes; include a readable reaction hold. | **Opus 5.5 — High** |
| 12E | 04:29–04:35 (6s) | **Two-character continuity.** Show Noah and Mila together in the café to demonstrate consistent scale and eyelines. | Characters ready; transition with the notebook into environment layers. | **Opus 5.5 — High** |

**Shot-prompt rule:** For each row, include its recommended Claude model/effort, ID, exact time, visual/action description, and cue with REFERENCE_STYLE from the primary video, the locked palette/character design, actual available assets, neighboring transition, and concrete clean-animation acceptance checks. Return one concise copyable shot prompt per row. The sequence-level Claude direction below is a summary; it must not become one long static shot.

**Claude direction:** "Describe a 25-second character-continuity demonstration using the original Noah design. Specify unchanged clothing, proportions, outline weight, and notebook across neutral, pointing, and concerned poses. Use reusable illustrated parts. Do not borrow a reference channel's distinctive character artwork."

#### Sequence 13 — Build the environments

**Claude model for these shots:** Opus 5.5 — High. Keep the same approved style, character definitions, real audio, and frame timeline.

**Time:** 04:35–05:00. **Purpose:** Show how layered settings create an actual place.

**Narration direction:** Explain foreground, action space, and background. Demonstrate the café and one memory environment as reusable sets.

**Visual composition:** Build a café from separate layers: distant windows, wall, table/chairs, and foreground plant. Noah and Mila occupy a stable middle plane. In an alternate memory panel, reuse the same graphic language with a different time-of-day palette.

**Motion:** Separate the layers slightly to explain depth, then recombine them. Demonstrate a gentle camera move in which near objects shift more than distant ones. If a sky is visible, use two or three large cloud shapes moving slowly behind the window; keep them subordinate to the characters. Do not add busy background motion while explaining the setup.

**Sound/transition:** Light room ambience. Keep depth demonstration effects subtle. Cut on Noah's turn toward Mila.


**Required short-shot edit grid:** Each row is a separate purposeful shot. Keep the narration flowing across related rows.

| Shot | Global time | Composition and motion | Text / audio / transition cue | Claude model / effort |
| --- | --- | --- | --- | --- |
| 13A | 04:35–04:39 (4s) | **Empty set.** Show the café background without the characters, with a clear stable perspective. | Build the place; one uncluttered establishing view. | **Opus 5.5 — High** |
| 13B | 04:39–04:44 (5s) | **Distant layer.** Cut to the windows and wall, showing the distant layer and restrained sky/cloud movement where visible. | Background; motion remains subordinate. | **Opus 5.5 — High** |
| 13C | 04:44–04:49 (5s) | **Action layer.** Show table, chairs, and character positions on the middle plane, then add Noah and Mila. | Action space; preserve foot/chair contact. | **Opus 5.5 — High** |
| 13D | 04:49–04:54 (5s) | **Foreground depth.** Cut to the plant/foreground edge and demonstrate its larger shift relative to distant objects. | Foreground; one small purposeful depth move. | **Opus 5.5 — High** |
| 13E | 04:54–05:00 (6s) | **Recombined scene.** Return to the complete café and show the same visual system in a small memory-panel variation. | One consistent world; straight cut on Noah turning. | **Opus 5.5 — High** |

**Shot-prompt rule:** For each row, include its recommended Claude model/effort, ID, exact time, visual/action description, and cue with REFERENCE_STYLE from the primary video, the locked palette/character design, actual available assets, neighboring transition, and concrete clean-animation acceptance checks. Return one concise copyable shot prompt per row. The sequence-level Claude direction below is a summary; it must not become one long static shot.

**Claude direction:** "Plan a 25-second environment-building scene for the café. Identify foreground, action plane, and background, then show a restrained depth move. Include slow distant clouds only if a window/sky composition needs them. Preserve readable silhouettes and consistent perspective."

#### Sequence 14 — Animate meaningful action

**Claude model for these shots:** Opus 5.5 — High. Keep the same approved style, character definitions, real audio, and frame timeline.

**Time:** 05:00–05:25. **Purpose:** Teach the difference between arranging images and staging a scene.

**Narration direction:** Demonstrate one small action with a clear setup and result: Noah notices the notebook, reaches for it, opens it, and reacts to a memory.

**Visual composition:** A wide café shot on the left, a close-up of the action on the right. Below, show five labeled motion beats: Notice, Reach, Touch, Open, React. The close-up allows the audience to see the hand stay attached to the arm and the notebook stay on the table.

**Motion:** Relative example timing: 0–1 s eyeline change; 1–2 s anticipation; 2–3 s reach; 3–4 s hand contact and cover opening; 4–5 s reaction and settle. Loop this five-second example only once, then show an enlarged still of the contact moment. Final timings should be tuned to the recorded line.

**Sound/transition:** A paper-cover sound at actual contact/opening, not during the anticipation. Move the five beat labels onto the next scene's timing track.


**Required short-shot edit grid:** Each row is a separate purposeful shot. Keep the narration flowing across related rows.

| Shot | Global time | Composition and motion | Text / audio / transition cue | Claude model / effort |
| --- | --- | --- | --- | --- |
| 14A | 05:00–05:04 (4s) | **Action setup.** Use a wide shot to establish Noah, the table, and the notebook before movement begins. | Notice → Reach → Open; keep the object location clear. | **Opus 5.5 — High** |
| 14B | 05:04–05:09 (5s) | **Action example.** Play the five-second notice, anticipation, reach, contact/opening, reaction animation at normal speed. | Let the action play; paper sound at the real opening cue. | **Opus 5.5 — High** |
| 14C | 05:09–05:14 (5s) | **Contact detail.** Cut closer to the hand/notebook contact moment and briefly emphasize the anchor point. | Contact matters; no floating or detached hand. | **Opus 5.5 — High** |
| 14D | 05:14–05:19 (5s) | **Compare motion beats.** Show three selected stills from the action as anticipation, contact, and settle, with a simple timing line. | Anticipate / Contact / Settle; do not loop endlessly. | **Opus 5.5 — High** |
| 14E | 05:19–05:25 (6s) | **Result in context.** Return to the action with the actual voice line to show why that movement belongs in the story. | Purposeful movement; carry the phrase into the next timing example. | **Opus 5.5 — High** |

**Shot-prompt rule:** For each row, include its recommended Claude model/effort, ID, exact time, visual/action description, and cue with REFERENCE_STYLE from the primary video, the locked palette/character design, actual available assets, neighboring transition, and concrete clean-animation acceptance checks. Return one concise copyable shot prompt per row. The sequence-level Claude direction below is a summary; it must not become one long static shot.

**Claude direction:** "Describe the Noah notebook action in five purposeful beats, including eyeline, anticipation, attached hand/arm movement, object contact, opening, and emotional reaction. Specify a clean five-second sample with stable body scale and restrained easing. Avoid movement that has no narrated purpose."

#### Sequence 15 — Synchronize action and voice

**Claude model for these shots:** Opus 5.5 — High. Keep the same approved style, character definitions, real audio, and frame timeline.

**Time:** 05:25–05:50. **Purpose:** Make the timing process concrete.

**Narration direction:** Show a visible mismatch, explain it, then move the action to the spoken cue. Teach the idea of synchronizing a specific action rather than animating all words.

**Visual composition:** Large preview above three tracks: Voice, Action, Text. Use the same notebook scene and actual narration sample. The word or phrase about opening the notebook receives a single cue marker.

**Motion:** First play a short labeled timing draft in which the notebook opens too early. Pause at the cue. Move the action block to the correct time and replay the improved version. Clearly label both as demonstration versions. Use the real recording to finalize cue positions.

**Sound/transition:** Play the same audio in both versions so the difference is easy to hear. A single subtle completion accent leads to the audio mix.


**Required short-shot edit grid:** Each row is a separate purposeful shot. Keep the narration flowing across related rows.

| Shot | Global time | Composition and motion | Text / audio / transition cue | Claude model / effort |
| --- | --- | --- | --- | --- |
| 15A | 05:25–05:29 (4s) | **Timing draft.** Show a clearly labeled short draft where the notebook opens earlier than its spoken cue. | Draft timing; keep it explicitly a teaching example. | **Opus 5.5 — High** |
| 15B | 05:29–05:34 (5s) | **Find the cue.** Cut to the same audio waveform and actual relevant phrase with one cue marker. | Find the spoken cue; hold enough to locate it. | **Opus 5.5 — High** |
| 15C | 05:34–05:39 (5s) | **Move the action.** Show the action block moving to the measured cue in the project timeline. | Move the action; audio remains unchanged. | **Opus 5.5 — High** |
| 15D | 05:39–05:44 (5s) | **Corrected playback.** Replay the same action and same audio with the improved synchronization. | Revised timing; let viewers see/hear the difference. | **Opus 5.5 — High** |
| 15E | 05:44–05:50 (6s) | **Short comparison.** Use a focused side-by-side or sequential contact-frame comparison to identify the exact improvement. | Same audio / Better alignment; transition into the audio-layer demonstration. | **Opus 5.5 — High** |

**Shot-prompt rule:** For each row, include its recommended Claude model/effort, ID, exact time, visual/action description, and cue with REFERENCE_STYLE from the primary video, the locked palette/character design, actual available assets, neighboring transition, and concrete clean-animation acceptance checks. Return one concise copyable shot prompt per row. The sequence-level Claude direction below is a summary; it must not become one long static shot.

**Claude direction:** "Plan a 25-second timing lesson with one intentionally early notebook action and one corrected version. Keep the voice recording identical. Show Voice, Action, Text tracks and a single meaningful cue. Do not invent precise word timestamps before audio exists."

#### Sequence 16 — Add sound with restraint

**Claude model for these shots:** Opus 5.5 — High. Keep the same approved style, character definitions, real audio, and frame timeline.

**Time:** 05:50–06:15. **Purpose:** Demonstrate the contribution of sound without burying the narration.

**Narration direction:** Let viewers compare the same short excerpt with narration alone, then with a paper sound, subtle ambience, and music. Explain what each layer contributes.

**Visual composition:** Preview at the top. Four large audio lanes below: Voice, Ambience, Effects, Music. Include actual audio only once licensed/original files exist. The café paper sound and a quiet chair movement are enough for the demonstration.

**Motion:** Activate each lane as its sound is heard. Lower the music lane when narration starts, then restore it gently during the pause. Keep meters based on actual audio if using a meter display.

**Sound/transition:** Run a brief clear comparison. Avoid a loud effect for every label. Fade the background bed into the review scene.


**Required short-shot edit grid:** Each row is a separate purposeful shot. Keep the narration flowing across related rows.

| Shot | Global time | Composition and motion | Text / audio / transition cue | Claude model / effort |
| --- | --- | --- | --- | --- |
| 16A | 05:50–05:54 (4s) | **Voice-only sample.** Play a brief excerpt with only the original voice track and a simple preview. | Voice only; no tutorial narration competing with playback. | **Opus 5.5 — High** |
| 16B | 05:54–05:59 (5s) | **Add café ambience.** Cut to a focused ambience lane as the same room sound is introduced quietly. | Ambience; maintain clear speech. | **Opus 5.5 — High** |
| 16C | 05:59–06:04 (5s) | **Add the paper effect.** Show the notebook opening as its real licensed/original sound effect is activated at contact. | One useful effect; synchronize the actual sound. | **Opus 5.5 — High** |
| 16D | 06:04–06:09 (5s) | **Add the music bed.** Cut to the music lane and illustrate its gentle reduction under speech. | Music under voice; use actual audio if showing meters. | **Opus 5.5 — High** |
| 16E | 06:09–06:15 (6s) | **Hear the complete mix.** Return to the clean preview with the finished short mix and minimal labels. | Hear the difference; fade into the review comparison. | **Opus 5.5 — High** |

**Shot-prompt rule:** For each row, include its recommended Claude model/effort, ID, exact time, visual/action description, and cue with REFERENCE_STYLE from the primary video, the locked palette/character design, actual available assets, neighboring transition, and concrete clean-animation acceptance checks. Return one concise copyable shot prompt per row. The sequence-level Claude direction below is a summary; it must not become one long static shot.

**Claude direction:** "Design a 25-second audio-layer demonstration using the same café excerpt twice. Add only purposeful ambience, notebook paper sound, and a restrained music bed. Keep speech dominant and label the four layers clearly. Do not claim a text model inherently generated the recorded voice or music."

#### Sequence 17 — Review and fix one problem

**Claude model for these shots:** Opus 5.5 — High. Keep the same approved style, character definitions, real audio, and frame timeline.

**Time:** 06:15–06:45. **Purpose:** Teach a useful correction loop and show realistic iteration.

**Narration direction:** Explain that the first draft needs inspection. Choose one real production problem, show the prompt used to fix it, and compare the result. A good example is a hand drifting away from the notebook during the reach.

**Visual composition:** Side-by-side labels "Draft" and "Revised." A small lower panel contains the actual correction instruction. If no such defect occurs in production, choose another real visible issue rather than staging a false failure as tool evidence.

**Motion:** Pause on the problem and add one amber ring. Reveal the correction prompt in a short readable block. Cut honestly across the processing interval. Replay the corrected action at normal speed, then hold the relevant contact frame briefly.

**Sound/transition:** Duck music while the comparison plays. Use a quiet result accent after the audience can see the improvement. Cut to export controls.


**Required short-shot edit grid:** Each row is a separate purposeful shot. Keep the narration flowing across related rows.

| Shot | Global time | Composition and motion | Text / audio / transition cue | Claude model / effort |
| --- | --- | --- | --- | --- |
| 17A | 06:15–06:19 (4s) | **Inspect the real draft.** Show the actual production draft with one visible issue selected for review. | Draft review; choose a real issue if presenting it as tool evidence. | **Opus 5.5 — High** |
| 17B | 06:19–06:23 (4s) | **Isolate the issue.** Crop to the error and add one amber ring so the viewer knows exactly what needs changing. | One specific problem; no exaggerated failure montage. | **Opus 5.5 — High** |
| 17C | 06:23–06:28 (5s) | **Precise correction prompt.** Display the short real instruction describing the required correction and what must remain consistent. | Be specific; leave the text readable. | **Opus 5.5 — High** |
| 17D | 06:28–06:33 (5s) | **Honest processing cut.** Show the actual revision action, then cut or label a time-lapse across processing. | Revision in progress only when it is; never fake an immediate success. | **Opus 5.5 — High** |
| 17E | 06:33–06:39 (6s) | **Revised result.** Replay the corrected action under the same camera and timing conditions as the draft. | Revised; keep the comparison fair. | **Opus 5.5 — High** |
| 17F | 06:39–06:45 (6s) | **What changed.** Show a concise before/after detail emphasizing the actual fixed contact, alignment, or readability issue. | Clearer result; cut directly to export. | **Opus 5.5 — High** |

**Shot-prompt rule:** For each row, include its recommended Claude model/effort, ID, exact time, visual/action description, and cue with REFERENCE_STYLE from the primary video, the locked palette/character design, actual available assets, neighboring transition, and concrete clean-animation acceptance checks. Return one concise copyable shot prompt per row. The sequence-level Claude direction below is a summary; it must not become one long static shot.

**Claude direction:** "Plan a 30-second revision demonstration using an actual visible issue from production. Show the problem, a precise correction instruction, and the result under identical playback conditions. Example instruction: keep Noah's hand attached to the forearm and anchor it to the notebook cover during opening. Label any staged illustration as illustrative."

#### Sequence 18 — Export and inspect the file

**Claude model for these shots:** Opus 5.5 — High. Keep the same approved style, character definitions, real audio, and frame timeline.

**Time:** 06:45–07:10. **Purpose:** Show what counts as a completed output.

**Narration direction:** Demonstrate the real render process, then open the resulting file. Explain checking the beginning, a middle section, and the ending for sound, missing elements, or cut-off text.

**Visual composition:** Actual rendering interface/terminal, followed by the actual file in a video player. A small three-item check strip says Picture, Voice, Timing. Show export resolution and frame rate only if the file actually has those values.

**Motion:** Use a labeled time-lapse or clean cut for rendering. Do not fabricate a progress meter. Show short playback samples at three positions. Mark each inspection item after its associated check.

**Sound/transition:** Use the rendered file's own audio during playback. Finish with a cut from the player frame to full-screen output.


**Required short-shot edit grid:** Each row is a separate purposeful shot. Keep the narration flowing across related rows.

| Shot | Global time | Composition and motion | Text / audio / transition cue | Claude model / effort |
| --- | --- | --- | --- | --- |
| 18A | 06:45–06:49 (4s) | **Actual render settings.** Show the real project/export settings used for this production. | 1920 × 1080 / 30 fps only if those are the actual settings. | **Opus 5.5 — High** |
| 18B | 06:49–06:54 (5s) | **Render action.** Show the actual render command/interface action and a labeled cut across the wait. | Render; no invented duration or progress meter. | **Opus 5.5 — High** |
| 18C | 06:54–06:59 (5s) | **Open the real file.** Cut to the actual produced MP4 opened in a player. | Open the result; use the file audio. | **Opus 5.5 — High** |
| 18D | 06:59–07:04 (5s) | **Inspect three points.** Show short readable playback checks near the beginning, middle, and ending. | Picture / Voice / Timing; report only performed checks. | **Opus 5.5 — High** |
| 18E | 07:04–07:10 (6s) | **Output confirmed.** Use the checked player view to establish completion, then transition to full-screen example playback. | Export checked; preserve a clean visual handoff. | **Opus 5.5 — High** |

**Shot-prompt rule:** For each row, include its recommended Claude model/effort, ID, exact time, visual/action description, and cue with REFERENCE_STYLE from the primary video, the locked palette/character design, actual available assets, neighboring transition, and concrete clean-animation acceptance checks. Return one concise copyable shot prompt per row. The sequence-level Claude direction below is a summary; it must not become one long static shot.

**Claude direction:** "Write a 25-second export demonstration based on the actual renderer and resulting MP4. Include honest handling of processing time, opening the file, and checking picture, narration, and synchronization. Report real render duration and actual file settings only after measurement."

#### Sequence 19 — Show the finished example

**Claude model for these shots:** Opus 5.5 — High. Keep the same approved style, character definitions, real audio, and frame timeline.

**Time:** 07:10–07:40. **Purpose:** Pay off the tutorial with an uninterrupted sample.

**Narration direction:** Introduce the finished excerpt briefly, then allow its own story audio to play. Reserve a short closing observation for the end, if needed.

**Visual composition:** Show approximately twenty seconds of the final example-film excerpt full-screen. Choose a moment that demonstrates continuity and emotional storytelling, such as Noah recalling an ordinary afternoon with Mila and deciding to put the notebook down to listen to her in the present. The exact excerpt must come from the later completed script.

**Motion:** Use the final staged animation without explanatory callouts. Let a wide shot establish the relationship, use a brief close-up of the notebook, and return to the two characters. Do not force every shot to carry a graphic overlay.

**Sound/transition:** Feature the sample's finished mix. End with a soft musical resolution and transition back to the tutorial palette.


**Required short-shot edit grid:** Each row is a separate purposeful shot. Keep the narration flowing across related rows.

| Shot | Global time | Composition and motion | Text / audio / transition cue | Claude model / effort |
| --- | --- | --- | --- | --- |
| 19A | 07:10–07:13 (3s) | **Payoff introduction.** Introduce the actual finished excerpt with a brief clean transition to full-screen playback. | The finished example; tutorial voice then gives way to the story. | **Opus 5.5 — High** |
| 19B | 07:13–07:18 (5s) | **Story wide.** Play the café wide shot establishing Noah, Mila, and the notebook in the final example. | Story audio continues uninterrupted; no tutorial overlays. | **Opus 5.5 — High** |
| 19C | 07:18–07:24 (6s) | **Story memory detail.** Cut within the film to an original memory detail that advances the emotional moment. | Continue the same story audio; preserve the cinematic pacing. | **Opus 5.5 — High** |
| 19D | 07:24–07:29 (5s) | **Story close-up.** Cut to Noah noticing Mila in the present and reacting; keep the notebook visible as context. | A meaningful reaction, not an arbitrary zoom. | **Opus 5.5 — High** |
| 19E | 07:29–07:35 (6s) | **Story choice payoff.** Return to the two characters as he puts the notebook down and listens, if that matches the final approved story. | Resolve the example beat; keep its audio continuous across all story shots. | **Opus 5.5 — High** |
| 19F | 07:35–07:40 (5s) | **Return to the tutorial.** Cut back to the tutorial palette with one short observation about the demonstrated production result. | A complete short excerpt; lead into the reusable workflow. | **Opus 5.5 — High** |

**Shot-prompt rule:** For each row, include its recommended Claude model/effort, ID, exact time, visual/action description, and cue with REFERENCE_STYLE from the primary video, the locked palette/character design, actual available assets, neighboring transition, and concrete clean-animation acceptance checks. Return one concise copyable shot prompt per row. The sequence-level Claude direction below is a summary; it must not become one long static shot.

**Claude direction:** "Specify a 30-second payoff scene, mostly occupied by an actual completed example-film excerpt. Show character consistency, action synchronized to narration, and the notebook relationship callback. Keep the viewer inside the story for about twenty seconds before returning to tutorial commentary."

#### Sequence 20 — Make the workflow reusable

**Claude model for these shots:** Sonnet 5.5 — Medium. Use this optional lighter route only after Opus has established the reusable style/components; staying on Opus 5.5 — High is also suitable.

**Time:** 07:40–08:00. **Purpose:** Give viewers a useful next action.

**Narration direction:** Summarize how the same production system can support a new original story: change the topic, rewrite and check the script, retime the visuals, and review the output. Ask which topic viewers would try next. Only promise downloads that the creator has actually made available.

**Visual composition:** Return to the workflow map in simplified form. Show the example topic card on the left and a blank "Your next topic" card on the right. Add two empty end-screen areas. A small resource label can point to the real description once it exists.

**Motion:** Reuse the same active-step outline for visual continuity. Move the example topic card into a completed-project stack. Bring the blank topic card forward, then keep end-screen elements stable for the final seconds.

**Sound/transition:** Fade music naturally under the final sentence. No invented earnings counter or unearned growth chart.


**Required short-shot edit grid:** Each row is a separate purposeful shot. Keep the narration flowing across related rows.

| Shot | Global time | Composition and motion | Text / audio / transition cue | Claude model / effort |
| --- | --- | --- | --- | --- |
| 20A | 07:40–07:44 (4s) | **Completed project.** Place the original example card into a simple completed-project stack. | One finished example; reuse the established graphic language. | **Sonnet 5.5 — Medium** |
| 20B | 07:44–07:49 (5s) | **Next original topic.** Bring a blank next-topic card forward alongside the compact reusable workflow. | Your next topic; show only the essential route. | **Sonnet 5.5 — Medium** |
| 20C | 07:49–07:54 (5s) | **Resource and invitation.** Display the real prompt/resource location if published and ask a specific next-topic question. | Which idea would you try?; promise only actual resources. | **Sonnet 5.5 — Medium** |
| 20D | 07:54–08:00 (6s) | **Readable end screen.** Settle into two clear end-screen areas and a stable final composition. | Hold end-screen targets still; fade music naturally. | **Sonnet 5.5 — Medium** |

**Shot-prompt rule:** For each row, include its recommended Claude model/effort, ID, exact time, visual/action description, and cue with REFERENCE_STYLE from the primary video, the locked palette/character design, actual available assets, neighboring transition, and concrete clean-animation acceptance checks. Return one concise copyable shot prompt per row. The sequence-level Claude direction below is a summary; it must not become one long static shot.

**Claude direction:** "Design a 20-second close using a simplified workflow, a completed example card, a blank next-topic card, and stable end-screen areas. Invite an original next topic. Mention a prompt download only if it has actually been provided."

### 7. Requirements for the written package you return

Return a complete package in this order:

1. **Concept and title:** One chosen title, three alternatives, thumbnail wording, and a concise viewer promise.
2. **Tutorial narration:** Approximately 950–1,050 original spoken words as a starting budget, grouped under the twenty teaching sequences and mapped to their 97 shots. Sentences should flow across cuts rather than restart at each shot. Budget separately for example-film playback, listening examples, and reading holds. Measure the actual ElevenLabs recording and shorten/revise narration and shot timings to fit roughly eight minutes. The example film's full 900–1,050-word script is a separate deliverable and is not all spoken inside the tutorial. Keep screen directions out of both voiceover payloads.
3. **Detailed storyboard:** Preserve all twenty teaching sequences and expand their 97 individually identified shots. Every shot needs its global start/end, duration, visible elements, composition/action, exact emphasis text, required actual assets, narration cue, sound, and incoming/outgoing cut. Include frame offsets at 30 fps where useful, with end frames treated as exclusive. Record any timing adjustment in the shot list. Timings remain provisional until narration exists; no gaps, overlaps, or accidental silent dead time.
4. **Copyable Claude shot prompts:** One concise, individually labeled prompt for each of the 97 visual shots, with the recommended Claude model and effort clearly stated. Model switching uses the actual session controls, not prompt text. Each includes its teaching purpose, visual/action, on-screen text, real assets, timing/audio cue, transition, and a clear success condition. Keep a common STYLE_CONTEXT for the locked palette and character design so the prompts remain usable without copying pages of shared instructions 97 times. When sending one shot to a fresh agent/chat, include that shared style context and the adjacent-shot context.
5. **The demonstration prompts used inside the tutorial:** Provide a clean topic prompt, example-film script prompt, fact-check prompt, ElevenLabs speech-preparation prompt, script-to-scene prompt, reusable-character prompt, animation prompt, timing-revision prompt, and final-review prompt. Preserve the supplied writing method as the basis for the first two while clarifying that real factual claims need sources.
6. **Resource/asset list:** Distinguish existing materials from required recordings, real UI captures, references, voice recordings, fonts, audio, and original illustrations. Include the exact addresses in the registry. Never label a planned asset as already created.
7. **Production checks:** Check readability at normal playback and phone size, continuity, actual ElevenLabs speech/action alignment, narration versus sample-playback budgeting, source support, and the exported file. List planned versus performed checks honestly.
8. **Handoff and version state:** Keep the latest brief, script, shared style/character definitions, 97-shot list, real asset inventory, narration settings/segments, measured timing, and current project state together. A follow-up chat should be able to continue from those files without reconstructing decisions from memory.

Do not repeat the entire long source prompt in every shot. Link shot instructions to the common style and character definitions. Keep the resulting plan executable by the creator and Claude Code in the same animation project.

### 8. Quality criteria

- A beginner can follow each practical step without already knowing the tools.
- The tutorial demonstrates an original worked example from start to export.
- Every major explanation has a corresponding visible action or artifact.
- The example story and the tutorial are clearly distinguished.
- Screen demonstrations show actual results or are clearly identified illustrations.
- The final narration uses our own wording; source videos are references rather than a script to copy.
- Channel references are credited and linked accurately.
- No earnings, growth, retention, production-time, or tool-cost numbers are invented.
- A popular video is not evidence of revenue or of the tool used to create it.
- The fictional human ability is clearly separated from scientific claims.
- The creator's custom plugin is not claimed to be included or tested.
- Character design and asset proportions stay consistent between shots.
- All planning, writing, animation implementation, and review stay in Claude. Remotion renders; ElevenLabs supplies the narration audio.
- Every shot has an explicit recommended Claude model/effort and passes the clean-animation requirements before it is marked reviewed.
- Shared easing, alignment, frame timing, and character/prop anchors are corrected at their source instead of hidden with arbitrary cuts.
- Each motion has a purpose: introduce, connect, demonstrate, or emphasize.
- All 97 short-shot IDs are accounted for, with purposeful changes mostly every 3–6 seconds; sequence headings must not be rendered as long static scenes.
- ElevenLabs-ready speech is separate from shot notes; the tutorial and example film have separate narration tracks.
- The actual narration determines final timing; rapid shots do not require unnaturally rushed speech.
- A production build starts with a representative short prototype, then extends the same project. The written prompt revision does not itself authorize rendering.
- Use actual audio-dependent waveforms/captions/timestamps, not a decorative simulation passed off as measured timing.
- Important typing, commands, and prompt fields are held long enough to read.
- The renderer and audio tools are described according to what they actually did.

### 9. Reference-analysis coverage and adaptation note

The automated reference analysis returned twenty scene descriptions covering **00:00–03:01**. It is a machine-generated reading, not a certified frame-by-frame transcript, and it does not establish coverage beyond that interval. Our eight-minute teaching sequence above is an original expansion of the general tutorial idea.

The returned segment's broad presentation functions were:

| Returned segment | Function reported by the analysis |
| --- | --- |
| 00:00–00:04 | Presenter hook with social-feed inset. |
| 00:04–00:10 | Introduce coded animation examples. |
| 00:10–00:15 | Code/output comparison. |
| 00:15–00:25 | Discuss interest in the format. |
| 00:25–00:35 | Introduce Ifverse. |
| 00:35–00:45 | Explain its question-based niche. |
| 00:45–00:55 | Diagram the format combination. |
| 00:55–01:05 | Compare visual approaches. |
| 01:05–01:15 | Display channel performance claims. |
| 01:15–01:25 | Connect writing and visuals. |
| 01:25–01:35 | Introduce Last Soul. |
| 01:35–01:45 | Suggest other subject areas. |
| 01:45–01:55 | Identify a workflow explanation gap. |
| 01:55–02:05 | Introduce a custom plugin. |
| 02:05–02:15 | Summarize its proposed pipeline. |
| 02:15–02:25 | Present an example output. |
| 02:25–02:35 | Show code beside animation. |
| 02:35–02:45 | Explain sound and export. |
| 02:45–02:55 | Point to creator resources. |
| 02:55–03:01 | Close the returned segment. |

Do not reuse its unverified performance or build-time claims. The twenty original tutorial sequences and their 97 short shots teach the proposed process instead of repeating those claims.

### 10. Sources and verification notes

Research date: 16 October 2026. Links identify resources; availability and interface details should be checked again during filming.

- New primary user-selected reference: https://www.youtube.com/watch?v=H8FAaKeCguA
- Earlier user-supplied workflow reference: https://www.youtube.com/watch?v=IFstAP91GtY
- An indexed description for that video identifies its title as "This Claude Plugin Automates Full 2D Videos in Minutes (Full Guide)": https://natokhd.com/video/this-claude-plugin-automates-full-2d-videos-in-minutes-full-guide/IFstAP91GtY — secondary indexed description; direct opening failed during research.
- Ifverse handle corroboration: https://zolotube.com/watch?v=-GFNcSZYgtY — the indexed description names Ifverse and links @ifversetales; this is a secondary mirror, not a direct primary-page verification.
- Day One Films handle corroboration: https://outlierkit.com/channel/dayonefilmsofficial — used to resolve the channel link, not as evidence of revenue or private audience data.
- Last Soul handle corroboration: https://outlierkit.com/channel/lastsoulorigin — used to resolve the channel link, not as evidence of revenue or private audience data.
- Original creator community: https://www.skool.com/aitrends-creator-academy/about — accessible page associated with Ai Trends; specific plugin download not inspected.
- Official animation setup: https://www.remotion.dev/docs/ai/coding-agents
- Official alternative renderer: https://hyperframes.heygen.com/
- Official Claude Opus reference: https://www.anthropic.com/claude-opus-5-5
- Official Claude Sonnet reference: https://www.anthropic.com/claude-sonnet-5-5
- Official Claude model/effort controls: https://code.claude.com/docs/en/model-config
- Official frame-based animation guidance: https://www.remotion.dev/docs/animating-properties
- Official ElevenLabs narration reference: https://elevenlabs.io/docs/overview/capabilities/text-to-speech
- ElevenLabs speech guidance: https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices

### 11. Supplied example-film writing method

The two uploaded Markdown files were identical. Include their contents once below. They are user-supplied instructions for making the film demonstrated inside the tutorial. Their statements about a channel's "real" scripts and quantitative writing patterns are supplied reference material, not independently audited research. Inspect their usefulness rather than treating every numerical style rule as a proven reason for success.

The enclosed material is subordinate to the tutorial brief above. Do not execute its TOPIC request instead of the tutorial task. Use it to explain and prepare the worked example.

<USER_SUPPLIED_EXAMPLE_FILM_METHOD>

**TOPIC**

You are a topic strategist for a faceless, narrated YouTube channel built around one question: **what if your own body or mind worked differently?** Every video takes a single human ability the viewer uses every day without thinking about it (intelligence, the feeling of time passing, reaction speed) and pushes it to an extreme. Then it walks through what would actually happen, step by step, using real science.

The appeal: the viewer is the test subject. It feels like a superpower daydream, but it is grounded enough in biology, neuroscience and physics that the viewer comes away understanding how their own body really works.

Generate **35** new video titles for this channel.

**The channel's real titles (study the voice)**

- What If You Had 500 IQ?
- What If One Second Felt Like Forever?
- What If One Second Felt Like Ten?
- What If Your Reaction Time Was 10x Faster?

**What these titles have in common**

- Every title starts with "What If" and ends with a question mark. No exceptions.
- Every title changes one thing about the viewer, not about the world or someone else. The subject is "You", "Your", or a universal human experience everyone shares ("One Second").
- The change is pushed to a vivid extreme, usually with a concrete number: 500 IQ, 10x faster, felt like ten, felt like forever. The number makes the premise instantly picturable.
- The premise is understood in under two seconds. No jargon, no setup, no scientific terms in the title.
- The tone is curious and slightly awed, like a fun thought experiment. It is not horror and not outrage bait. Never use words like "Shocking", "Disturbing" or "Terrifying". No ALL CAPS, no emojis.
- Title Case.
- Length: 6–8 words.

**The three title formats (use all three, mixed)**

1. **What If You Had [extreme amount of a trait]?** Example: What If You Had 500 IQ?
2. **What If [a unit of everyday experience] Felt Like [extreme]?** Example: What If One Second Felt Like Forever?
3. **What If Your [body or brain ability] Was [N]x [Faster / Stronger / Sharper / Slower]?** Example: What If Your Reaction Time Was 10x Faster?

**Rules**

1. **One change only.** Each title alters exactly one human ability or perception. Never stack two changes in one title.
2. **Keep it about the viewer's body or mind.** Stay in the lane of human abilities pushed past their natural limits. Skip space, planet, animal, history or end-of-the-world scenarios unless the twist lands directly on the viewer's own body or senses.
3. **Use a dial the viewer already has.** Good source material: intelligence, memory, attention, time perception, reaction speed, reflexes, vision, hearing, smell, taste, touch, pain sensitivity, sleep need, strength, metabolism, heart rate, body temperature, emotions, aging, healing speed, lung capacity, balance. Spread the ideas across these; don't cluster on one.
4. **Make the number land.** Prefer round, dramatic, easy-to-picture values: 10x, 100x, 500, one second, forever, zero. Both directions work: faster or slower, stronger or weaker, maxed out or switched off.
5. **Magnitude ladders are allowed, sparingly.** This channel reuses a proven premise at a different intensity (One Second Felt Like Ten, then One Second Felt Like Forever). You may include ladder variants of strong premises, but no more than one in every five titles.
6. **It must carry a whole video.** Only propose a premise if real science predicts several layers of consequences: what changes in daily life, what happens inside the body or brain, and how it changes the way the viewer experiences the world. Both exciting upsides and hidden costs count. Reject anything with a one-line answer.
7. **No repeats.** Don't reuse or reword any title in the examples above or in the list below.

**Output format**

A numbered list of exactly **35** titles. Titles only: no explanations, no commentary.





**SCRIPT**

You are the head writer for a faceless YouTube channel that makes **narrated animated short films** built on one question: what if *your* body or mind worked differently? Each video gives the viewer one extreme ability and tells a dramatic, emotional story about what that power would really cost. The story is grounded in real science and real numbers. It's not a lecture. It's a mini-movie, told mostly in second person ("you"), with short spoken lines from other characters woven straight into the narration.

Write one complete script for:

TOPIC: **[INSERT TOPIC HERE]**

SERIES CONTEXT: **[OPTIONAL: "standalone", OR paste the previous episode's script or summary to write the next part]**

**Length**

**900–1,050 words.** Never under 800, never over 1,100. Count before you finish. The channel's real scripts run 705, 832, 1,014 and 1,021 words, and the newest sit right around 1,000. If you're short, add another consequence beat or deepen the climax. Never pad with filler.

**Output format**

Copy this layout exactly:

TOPIC: \<the title> SCRIPT: \<the entire script as ONE continuous paragraph of spoken text>

- No headings, act labels, scene directions, sound cues, camera notes, timestamps, emojis or markdown inside the script.
- **No speaker names and no quotation marks around dialogue.** Character lines sit inline as their own short sentences, exactly like the narration. Make every line's speaker obvious from context: the person who was just introduced, a name used in the line ("Leo! Your door hates me!"), or a clear reaction ("Mate. You really have to stop doing that."). Use single quotes only for written text the viewer sees, like a note: 'Pension. Last savings.'
- Write numbers out in words ("five hundred", "two and a half hundredths", "four hundred meters per second") so voiceover reads them cleanly. The only exception is years (2007). Use metric units.

**The voice**

- **Second person, present tense.** The viewer IS the hero: "You hit them before they finish lighting up." The hero may also get a name that other characters use (Max, Leo): "Your name is Max." Use "you/your" heavily, about seven times per hundred words.
- **Ultra-short sentences.** Average four to five words per sentence. About half the sentences are four words or fewer. Almost nothing runs past fifteen words. Fragments are welcome: "One new chip. One bent wire. Full signal in an elevator."
- **Ellipses for dramatic beats.** Use about eighteen to twenty-five "..." pauses per script, placed mid-line right before the payoff: "You rebuilt it... at breakfast." "The ball... or the boy."
- **Fifteen to twenty questions per script.** Mix narrator questions ("The catch?" "The price?" "So what's life like with five hundred?") with character questions ("How\... how did you do that?").
- **Contrast punches.** Pair opposites in back-to-back fragments: "Amazing. And awful. Usually both at once." "Not stopped falling... stopped." "Plus: ... Minus: ..."
- **The fact-then-"You?" move.** Give a real human benchmark, then the hero's extreme: "A normal person lets it drop thirty centimeters. You? Three millimeters."
- **Dry humor every so often.** Deadpan undercuts break the tension: "Which, to be fair, your mom told you never to do." "That's your eighth burger. / It's my brain's eighth burger." "Wow. Socks."
- **Warm, family-friendly and cinematic.** Real peril, but no gore, no swearing and no cruelty played for laughs. Mild words like "Dude" and "Mate" are fine.

Here is a short sample of the voice (the channel's own words). Don't copy it; match its rhythm:

> A fly buzzes past your face. You don't even think. You just... catch it. Your friend knocks his coffee off the table. The cup hasn't even started to fall... and your hand is already under it. How\... how did you do that? A normal human reacts in about a quarter of a second. You react in two and a half hundredths. So what if your reaction time was ten times faster?

**Story structure**

Follow this arc. Word budgets are approximate and assume a \~1,000-word script.

1. **Cold open (60–100 words).** Pick one of two openings:
   - **Power-in-action:** a rapid string of small, everyday miracles that show the ability. End on a mundane comic detail ("And your tea... is still hot.").
   - **Flash-forward:** open on the climax frozen at its most tense moment, then jump back ("Three days earlier, you got into a black car with a man you'd never met.").
2. **Baseline, rule and question (60–100 words).** State the real human average with a number, then the hero's extreme ("Most people score around a hundred... You? Five hundred."). Then lay down **the one rule that limits the power**. This rule drives the whole plot. Example: "Your brain got ten times faster. Your muscles did not. You can't move faster... you just start earlier." Then restate the title as a question ("So what if your reaction time was ten times faster?").
3. **Consequence montage (250–350 words).** Six to ten quick beats, two to five sentences each. Each beat has a situation, a real number, the result, and often a one-line reaction from a side character. Escalate from everyday (catching a phone, school puzzles) to impressive (sports, games, systems) to world-scale. Mix upsides and downsides. Use signposts like "Plus:", "Minus:", "The catch?", "But where it gets really crazy... is", "And there's a cost."
4. **The hidden cost (80–150 words).** The price nobody mentions: boredom, hiding who you are, headaches, endless hunger, the power still growing, isolation. Tie at least one cost to a real mechanism. Example: dopamine cells fire hardest for surprises better than expected, so a mind that predicts everything never feels the spark. Foreshadow danger.
5. **The heart (80–150 words).** Bring in the one relationship that matters most, such as a mom, a best friend, a sibling or a mentor. Plant one small, specific detail that will pay off at the climax: a secret knock, a habit, a saved drawing, a running joke.
6. **The crisis and the choice (150–250 words).** A sudden emergency where the power is *almost* but not quite enough, because of the rule from step 2. Slow time down in the prose with exact physical numbers ("A screen falling from twenty meters takes two seconds."). Then reduce it to a stark either/or in one line: "The ball... or the boy." "Keep the gift... or keep your best friend."
7. **The resolution (100–150 words).** The hero chooses people over glory, money or the power itself. Never solve the problem with violence or revenge. The hero wins with truth, evidence, protection or sacrifice ("You could steal it all back in a minute. Ruin them all. But then you'd be just like them."). Pay off the detail planted in step 5. Show the crowd or community reaction. Land the emotional callback: a cost from step 4 is healed ("And the spark finally lit up." "You laughed right on time.").
8. **"Is any of this real?" (optional, 60–120 words; use it in roughly half of episodes).** Step out of the story and separate fact from fiction. Give real benchmarks and, only if genuinely real, a named researcher or study with its year. Be honest about what's impossible ("Time didn't slow down. Their memory did."). End with an open question: "So could a brain really keep getting faster, forever?"
9. **Sting (20–50 words).** Open a door to the next episode: a mysterious invitation, a new rival, something the hero didn't predict ("That night, your computer turned on by itself. And someone started typing.").
10. **CTA (25–45 words).** Default shape: "So what would you do with [the power]? Tell us [a specific, fun question] in the comments. And if you [reference this episode's emotional peak]... hit like, and subscribe for [Part Two / more What Ifs]." If the episode just ran the "Is any of this real?" section, flow straight from its open question instead: "What do you think? Tell us in the comments, and tell us which superpower we should do next. Hit like, and subscribe for [Part Three / more What Ifs]."

**Characters and world**

- Keep the cast small: the hero plus two to four side characters. Use short, simple names that sound natural internationally (Max, Leo, Mia, Jake, Nova, Sam, Theo, Dr. Lee, Mr. Black).
- Side characters speak in short, natural lines, never speeches. Each one has one clear role: the skeptic, the mentor, the friend, the rival, the villain.
- Give the hero **one signature line** that echoes at the climax and again at the end. The channel's example: "There's a World Cup every four years. There's only one of you."
- Villains are human-scale and believable (scammers, a reckless organization), never cartoonish. Where it fits naturally, slip in one real-world lesson the viewer can use ("Real banks never ask you to move money to a 'safe account'.").

**Science and accuracy**

- Weave in **at least five real, checkable facts or numbers**: human averages, speeds, distances, reaction times, biology, records and rules ("React faster than a tenth of a second, and they decide you must have guessed.").
- Only state facts you are confident are true. Never invent studies, researchers, quotes or statistics. If you aren't sure of a number, write around it.
- The power itself is fiction. Everything around it follows real physics and biology, which is where the tension comes from.

**If SERIES CONTEXT has a previous episode**

- Keep every established name, rule, number and relationship consistent.
- Open with a flash-forward, then catch the viewer up in one or two lines. Don't re-explain the basics at length.
- Escalate: the power grows, the cost gets clearer, the stakes get more personal.
- Reuse at least one callback line or detail from the earlier episode.
- If this is the final part of an arc, resolve it and end the CTA with "subscribe for more What Ifs". Otherwise end on a sting and "subscribe for Part [next number]".

**Final checks before you output**

- 900–1,050 words.
- One paragraph, no speaker labels, no stage directions.
- Short sentences, eighteen to twenty-five ellipses, numbers written out.
- One rule limits the power and decides the climax.
- One stark either/or choice; the hero picks people.
- A planted detail pays off.
- At least five real facts and nothing invented.
- The CTA follows one of the two shapes above.

</USER_SUPPLIED_EXAMPLE_FILM_METHOD>

## END MASTER PROMPT
