"""Waveform peaks (RMS per 1/30 s) for every real narration file, so on-screen waveforms come
from the actual audio. Output: src/tutorial/peaks.json  {segment_id: [0..1 values]}"""
import json, os, subprocess, glob
import numpy as np
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = {}
for f in sorted(glob.glob(os.path.join(ROOT, "public", "audio", "narration", "*.mp3"))):
    pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-ac", "1", "-ar", "24000", "-f", "s16le", "-"], capture_output=True).stdout
    x = np.frombuffer(pcm, dtype=np.int16).astype(np.float32) / 32768
    hop = 800  # 24000 / 30
    n = len(x) // hop
    rms = np.sqrt((x[: n * hop].reshape(n, hop) ** 2).mean(axis=1))
    peak = rms.max() or 1
    out[os.path.basename(f)[:-4]] = [round(float(v / peak), 3) for v in rms]
json.dump(out, open(os.path.join(ROOT, "src", "tutorial", "peaks.json"), "w"))
print({k: len(v) for k, v in out.items()})
