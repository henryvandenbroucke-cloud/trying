# ElevenLabs handoff — generate these files, drop them in, re-time automatically

**Why this is needed:** on 16 Oct 2026 the ElevenLabs connector in this session refused generations with *"Unusual activity has been detected on your account, so Free Tier access has been disabled … Please upgrade to a paid subscription."* (3 of 4 takes on the first attempt, then 2 of 3 single takes today). Only two short takes succeeded: the female TUT-01 prototype take (no longer used — you asked for a male voice) and a 2.7 s male test take (`TEST.mp3`, used as the sample clip).

## Voices and settings
- **Voice A — tutorial narrator (male):** Sami - Warm American Voice (`IK4julLaNLG5omy7C1Q5`)
- **Voice B — example-film narrator (male, different timbre):** Chris - Warm, Thoughtful (`vrZ1gMhrsD9LI0gRKrLh`)
- **Model:** Eleven Multilingual v2 for every segment. Keep the same voice settings for all segments of a voice and note the values you used.
- **Pronunciation to check by ear:** Remotion (reh-MOH-shun), ElevenLabs, Ifverse (IF-verse).

## How to deliver
1. Generate each segment below as its own take; paste only the text in the block.
2. Save as `my-video/public/audio/narration/<ID>.mp3` (e.g. `TUT-04.mp3`, `EFN-05.mp3`).
3. Run (from `my-video/`):
```
PYTHONPATH=<dir with empty srt.py> python3 scripts/asr_words.py public/audio/narration/TUT-04.mp3 <vosk-model-dir> > public/audio/narration/TUT-04.words.json   # each file
npm run timeline      # re-times all 97 shots, audio placements, captions (narration/captions.srt) and waveforms
npm run render:excerpt && npm run render:tutorial
```
Segments without a file keep their text-estimated timing, so you can deliver them in batches.

## Segments (in order)

**EFN-01** — Voice B
```
Your name is Noah. And you remember... every single day.
```
**EFN-02** — Voice B
```
You close your eyes... and you are there.
```
**TUT-01** — Voice A
```
Everything you just watched started as a plain script. In this video, we'll take one original idea, shape it into a story with one clear rule, turn that story into scenes that actually make sense, and finish with a real video file. Stay to the end, and you'll see the finished scene.
```
**TUT-02** — Voice A
```
First, the inspiration: three channels that make short, narrated animated stories. Ifverse is our main reference. Every video asks: what if your own body or mind worked differently? Day One Films tells compact, emotional stories, and so does Last Soul. We can see what they publish, not how they make it, so we borrow the format only. Our story, our characters, and our visuals are all original.
```
**TUT-03** — Voice A
```
This format has four ingredients. One clear question: what if you remembered every single day? A consequence you can see: Noah's memories keep pulling him out of the present. An emotional choice, between the past and the friend in front of him. And a payoff that calls back to the start: this blue notebook. Here's the whole route. Pick a topic, write the script, and check the facts. Then record the voice, and plan scenes from it. Next: characters, motion, and sound. Finally, review and export. The story and voice are finished before we animate.
```
**TUT-04** — Voice A
```
Three tools, three jobs. Claude writes the code, Remotion turns it into video, and ElevenLabs makes the voice. Remotion's official guide covers the setup. These commands create a blank project, add Remotion's skills for coding agents, and start the preview. In a second terminal, open Claude Code inside the same project folder. Now Claude edits the files, and you watch every change here.
```
**TUT-05** — Voice A
```
Let's start with the idea. I paste the topic prompt into Claude. Its key rule: change exactly one thing about your body or mind, and push it to an extreme. Claude sends back titles. Pick one that could carry a whole story. Inspired by these, I picked: what if you remembered every single day? It has real consequences, and it can hang on one small relationship detail.
```
**TUT-06** — Voice A
```
Next, the script prompt. I add the topic and three anchors: Noah, Mila, and a blue notebook. Claude writes the full example film; we'll only show pieces here. First, find the rule. Noah can relive the past, but he can never predict or change it. Then find the choice: the past, or the friend right in front of him. Hook, rule, consequences, choice, callback. That's the story's spine.
```
**TUT-07** — Voice A
```
Before recording, check the facts. The power is fiction, so we label it as the story premise. But the script also makes real claims about how memory works, and my first draft overstated one. So find a reliable source, ideally the original research, and change the wording until it says only what that source supports. Claims checked, premise labelled. Now the script is ready for a voice.
```
**TUT-08a** — Voice A
```
In ElevenLabs, paste only the spoken words. No headings, no notes. Choose one voice and one model, and keep them for the whole film. Listen to a short sample first.
```
**EFN-03** — Voice B
```
Not roughly. Not mostly. Every day, in perfect detail.
```
**TUT-08b** — Voice A
```
When it sounds right, generate the narration and save the real audio file. Those pauses now set the rhythm. Every cut we plan will follow this recording.
```
**TUT-09** — Voice A
```
The script is one long paragraph, but animation needs short beats. So split it wherever the action changes. Each beat gets a start, an end, its words, and one action. When the narration moves on, the picture moves on too. Every beat links one spoken line to one thing we can see. Line them up over the audio, and you have a timeline. Sentences can run across cuts.
```
**TUT-10** — Voice A
```
Now, the characters. This is Noah. Three things never change: his terracotta jacket, his proportions, and his blue notebook. Claude builds him from reusable parts, so a new pose is the same Noah doing something new. His expression can change. His design can't. Mila follows the same rules, so both stay in scale in every scene. Next, the place. Every scene is built in layers. At the back: the windows, the wall, and a slow sky. In the middle: the action layer, where the characters sit and move. And in front, the foreground. When the camera moves, near things shift more than far ones. That creates depth. Put the layers back together, and the same style works inside a memory too.
```
**TUT-11** — Voice A
```
Now, motion with a purpose. Noah is about to open his notebook. Watch for five beats: notice, reach, touch, open, react.
```
**TUT-11b** — Voice A
```
The hand stays attached and really touches the cover. Nothing floats. Anticipation before the move, contact in the middle, and a small settle at the end.
```
**EFN-04** — Voice B
```
That night, you open the notebook one last time.
```
**TUT-11c** — Voice A
```
And every movement belongs to the line it sits under.
```
**TUT-12a** — Voice A
```
Here's a timing mistake. Watch the notebook.
```
**TUT-12b** — Voice A
```
It opens before the words describing it. Find that phrase in the waveform. Ask Claude to move the action onto that cue. The audio itself doesn't change. Now play it again.
```
**TUT-12c** — Voice A
```
Same voice, same drawing. Only the timing changed, and now it feels right.
```
**TUT-13a** — Voice A
```
Next, sound. Here's the voice on its own.
```
**TUT-13b** — Voice A
```
Add quiet café ambience, and the room feels real. Then one paper sound, exactly when the cover opens. And a soft music bed that dips whenever someone speaks. Here's the full mix. The voice still leads.
```
**TUT-14** — Voice A
```
Now review the draft at normal speed, and look for problems. Here's a real one from this project: Noah's legs were drawn in front of the table, instead of under it. Describe the fix precisely: what's wrong, what should happen, and what must stay the same. Claude edits the component, and we render the shot again. Same shot, same timing. Now his legs sit under the table. Because we fixed the character component itself, every shot that reuses it improves too.
```
**TUT-15** — Voice A
```
When review passes, check the render settings you actually chose. Run the render and let it finish. We'll skip ahead. Then open the actual file. Check the beginning, the middle, and the end: picture, voice, and timing. All three pass. Here's the finished scene.
```
**EFN-05** — Voice B
```
On Monday, you're back at the café. Mila is telling you about her week. But you're somewhere else. A Tuesday, three summers ago... this same table. Same laugh. Then two taps on the table. Noah... are you even here? You look at the notebook. And you close it. For the first time in weeks... you listen.
```
**TUT-16** — Voice A
```
One script, one voice, and one consistent world. That's one finished example. For your next video, change the topic, rewrite and check the script, record the voice, and retime the scenes. So which ability would you try next? Tell me in the comments. Thanks for watching.
```
