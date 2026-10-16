"""Original, procedural placeholder audio (deterministic): a soft chord pad and two table taps.
Replace with licensed/original recordings before publishing."""
import numpy as np, wave, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR = 48000

def write(name, x):
    x = np.clip(x, -1, 1)
    st = np.repeat((x * 32767).astype(np.int16)[:, None], 2, axis=1)
    with wave.open(os.path.join(ROOT, "public", "sfx", name), "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())

# pad: C – Am – F – G, 8 s each, crossfaded, gentle detune, -24 dBFS-ish
chords = [(261.6, 329.6, 392.0), (220.0, 261.6, 329.6), (174.6, 220.0, 261.6), (196.0, 246.9, 293.7)]
dur = 32; t = np.arange(dur * SR) / SR; pad = np.zeros_like(t)
for i, ch in enumerate(chords):
    env = np.clip(np.minimum((t - i * 8 + 1.5) / 1.5, (i * 8 + 9.5 - t) / 1.5), 0, 1)
    for f in ch:
        pad += env * (np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 1.003 * t) + 0.2 * np.sin(2 * np.pi * 2 * f * t))
pad *= 0.06 / 1.7
fade = np.minimum(1, np.minimum(t / 2, (dur - t) / 2))
write("music_pad_placeholder.wav", pad * fade)

# two soft knocks on wood, 0.23 s apart
tt = np.arange(int(0.6 * SR)) / SR; taps = np.zeros_like(tt)
for start in (0.0, 0.23):
    k = np.clip(tt - start, 0, None) * (tt >= start)
    taps += (0.6 * np.exp(-k * 38) * np.sin(2 * np.pi * 190 * k) + 0.3 * np.exp(-k * 60) * np.sin(2 * np.pi * 420 * k)) * (tt >= start)
write("table_taps_placeholder.wav", taps)
print("ok")
