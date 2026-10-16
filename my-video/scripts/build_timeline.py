"""Builds src/tutorial/timeline.json (97 shot boundaries, audio placements, word cues, captions)
from narration/segments.json + narration/shotplan.json.

Per segment timing source:
  measured  — public/audio/narration/<ID>.mp3 exists: duration via ffprobe, word times from
              <ID>.words.json (run scripts/asr_words.py), aligned to the script words.
  estimated — no file yet: word times from a text model (letters + punctuation pauses).
Run:  python3 scripts/build_timeline.py
"""
import json, os, re, subprocess, difflib

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FPS = 30
AUD = os.path.join(ROOT, "public", "audio", "narration")
segs = {s["id"]: s for s in json.load(open(os.path.join(ROOT, "narration", "segments.json")))["segments"]}
plan = json.load(open(os.path.join(ROOT, "narration", "shotplan.json")))["blocks"]

def tokens(text):
    out = []
    for raw in text.split():
        core = re.sub(r"[^\w'’]", "", raw).lower()
        if not core:
            continue
        pause = 0.0
        if raw.endswith("..."): pause = 0.5
        elif raw[-1] in ".?!": pause = 0.42
        elif raw[-1] in ",;:": pause = 0.2
        out.append({"t": raw, "k": core, "pause": pause})
    return out

def estimate(seg):
    toks = tokens(seg["text"])
    slow = 1.12 if seg["voice"] == "B" else 1.0
    t, words = 0.05, []
    for tk in toks:
        d = max(0.16, min(0.7, 0.08 + 0.055 * len(tk["k"]))) * slow
        words.append({**tk, "s": round(t, 3), "e": round(t + d, 3)})
        t += d + tk["pause"] * slow
    return words, round(words[-1]["e"] + 0.15, 3), "estimated"

def measured(seg):
    f = os.path.join(AUD, seg["id"] + ".mp3")
    wf = os.path.join(AUD, seg["id"] + ".words.json")
    if not (os.path.exists(f) and os.path.exists(wf)):
        return None
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f], capture_output=True, text=True).stdout)
    asr = json.load(open(wf))
    toks = tokens(seg["text"])
    sm = difflib.SequenceMatcher(a=[t["k"] for t in toks], b=[w["w"] for w in asr], autojunk=False)
    times = [None] * len(toks)
    for a, b, n in sm.get_matching_blocks():
        for i in range(n):
            times[a + i] = (asr[b + i]["s"], asr[b + i]["e"])
    # interpolate unmatched words between matched neighbours
    known = [i for i, x in enumerate(times) if x]
    for i in range(len(toks)):
        if times[i] is None:
            prev = max([k for k in known if k < i], default=None)
            nxt = min([k for k in known if k > i], default=None)
            s0 = times[prev][1] if prev is not None else 0.0
            s1 = times[nxt][0] if nxt is not None else dur
            span = (nxt if nxt is not None else len(toks)) - (prev if prev is not None else -1)
            pos = i - (prev if prev is not None else -1)
            s = s0 + (s1 - s0) * (pos - 0.5) / span
            times[i] = (round(s, 3), round(min(s + 0.25, s1), 3))
    return [{**tk, "s": times[i][0], "e": times[i][1]} for i, tk in enumerate(toks)], round(dur, 3), "measured"

timing = {}
for sid, seg in segs.items():
    timing[sid] = measured(seg) or estimate(seg)

def find_cue(words, cue, start):
    keys = [re.sub(r"[^\w'’]", "", c).lower() for c in cue.split()]
    for i in range(start, len(words) - len(keys) + 1):
        if [w["k"] for w in words[i:i + len(keys)]] == keys:
            return i
    raise SystemExit(f"cue not found: {cue!r}")

shots, audio, words_out, marks, report = [], [], [], {}, []
t = 0.0

def extend_last(dt):
    shots[-1]["to"] += dt

for b in plan:
    if b["type"] == "fixed":
        t0 = t
        for sid, dur in b["shots"]:
            shots.append({"id": sid, "from": t, "to": t + dur}); t += dur
        for seg_id, off in b.get("audio", []):
            w, dur, src = timing[seg_id]
            audio.append({"seg": seg_id, "at": t0 + off, "trim": 0.0, "dur": dur, "src": src, "voice": segs[seg_id]["voice"]})
            words_out += [{"seg": seg_id, "w": x["t"], "s": t0 + off + x["s"], "e": t0 + off + x["e"]} for x in w]
        continue
    gap = b.get("gap", 0.35)
    if shots and gap: extend_last(gap); t += gap
    seg_id = b["seg"]; w, dur, src = timing[seg_id]
    lead = b.get("lead", 0.25)
    a0 = t + lead
    # cue indices and holds
    cue_idx = []
    k = 0
    for sh in b["shots"]:
        cue = sh[1]
        if cue is None:
            cue_idx.append(0)
        else:
            k = find_cue(w, cue, k); cue_idx.append(k)
    holds = {}  # word index after which a hold is inserted
    for j, sh in enumerate(b["shots"]):
        h = sh[2] if len(sh) > 2 else 0
        if h:
            last = (cue_idx[j + 1] - 1) if j + 1 < len(cue_idx) else len(w) - 1
            holds[last] = holds.get(last, 0) + h
    # audio pieces split at holds (cut in the pause after the hold word)
    shift, pieces, piece_start = 0.0, [], 0.0
    shifted = []
    for i, x in enumerate(w):
        shifted.append({**x, "s": x["s"] + shift, "e": x["e"] + shift})
        if i in holds and i < len(w) - 1:
            cut = (x["e"] + w[i + 1]["s"]) / 2
            pieces.append((piece_start, cut, shift)); piece_start = cut; shift += holds[i]
    pieces.append((piece_start, dur, shift))
    for (p0, p1, sh) in pieces:
        audio.append({"seg": seg_id, "at": a0 + p0 + sh, "trim": p0, "dur": p1 - p0, "src": src, "voice": segs[seg_id]["voice"]})
    end = a0 + dur + shift + holds.get(len(w) - 1, 0)
    words_out += [{"seg": seg_id, "w": x["t"], "s": a0 + x["s"], "e": a0 + x["e"]} for x in shifted]
    for mk, cue in b.get("marks", {}).items():
        marks[mk] = a0 + shifted[find_cue(w, cue, 0)]["s"]
    # shots
    for j, sh in enumerate(b["shots"]):
        start = t if j == 0 else a0 + shifted[cue_idx[j]]["s"] - 0.2
        if j > 0: shots[-1]["to"] = start
        shots.append({"id": sh[0], "from": start, "to": end})
    if not b["shots"]:
        extend_last(end - shots[-1]["to"])
    for seg2, off in b.get("play", []):
        w2, d2, s2 = timing[seg2]
        at = end + off
        audio.append({"seg": seg2, "at": at, "trim": 0.0, "dur": d2, "src": s2, "voice": segs[seg2]["voice"], "play": True})
        words_out += [{"seg": seg2, "w": x["t"], "s": at + x["s"], "e": at + x["e"]} for x in w2]
        end = at + d2 + 0.3
        shots[-1]["to"] = end
    t = end + 0.15
    shots[-1]["to"] = t

# frames
fr = lambda s: int(round(s * FPS))
for s in shots:
    s["from"], s["to"] = fr(s["from"]), fr(s["to"])
for i in range(1, len(shots)):
    shots[i]["from"] = shots[i - 1]["to"]
for a in audio:
    a["from"] = fr(a["at"])
for x in words_out:
    x["f"] = fr(x["s"]); x["fe"] = fr(x["e"])
marks = {k: fr(v) for k, v in marks.items()}

# captions: tutorial + film narration, phrases ≤ 7 words, split at punctuation
caps, cur = [], []
for x in words_out:
    cur.append(x)
    if x["w"][-1] in ".?!,;:" or len(cur) >= 7 or x["w"].endswith("..."):
        caps.append({"text": " ".join(c["w"] for c in cur), "from": cur[0]["f"], "to": max(cur[-1]["fe"] + 5, cur[0]["f"] + 24), "seg": cur[0]["seg"]})
        cur = []
if cur:
    caps.append({"text": " ".join(c["w"] for c in cur), "from": cur[0]["f"], "to": cur[-1]["fe"] + 5, "seg": cur[0]["seg"]})
for i in range(len(caps) - 1):
    caps[i]["to"] = min(caps[i]["to"], caps[i + 1]["from"])

total = shots[-1]["to"]
durs = {s["id"]: round((s["to"] - s["from"]) / FPS, 2) for s in shots}
out = {"fps": FPS, "durationInFrames": total, "shots": shots, "audio": audio, "words": words_out, "marks": marks, "captions": caps,
       "timingSources": {k: v[2] for k, v in timing.items()}}
json.dump(out, open(os.path.join(ROOT, "src", "tutorial", "timeline.json"), "w"), indent=0)

def ts(f):
    s = f / FPS; return f"{int(s//3600):02d}:{int(s%3600//60):02d}:{int(s%60):02d},{int(round((s%1)*1000)):03d}"
with open(os.path.join(ROOT, "narration", "captions.srt"), "w") as fh:
    for i, c in enumerate(caps, 1):
        fh.write(f"{i}\n{ts(c['from'])} --> {ts(c['to'])}\n{c['text']}\n\n")

print(f"total {total} f = {total/FPS:.1f} s; sources: " + ", ".join(sorted(set(v[2] for v in timing.values()))))
short = {k: v for k, v in durs.items() if v < 2.8}; long = {k: v for k, v in durs.items() if v > 7.5}
print("short (<2.8 s):", short); print("long (>7.5 s):", long)
print("mean shot", round(sum(durs.values()) / len(durs), 2), "s")
