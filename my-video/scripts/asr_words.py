"""Word timestamps for a real narration file using local Vosk ASR.
Usage: python3 scripts/asr_words.py <audio> <vosk-model-dir> > words.json
Requires `pip install vosk` (if its `srt` dependency fails to build, an empty srt.py on PYTHONPATH is enough)."""
import sys, json, subprocess
from vosk import Model, KaldiRecognizer

src, model = sys.argv[1], sys.argv[2]
pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", src, "-ar", "16000", "-ac", "1", "-f", "s16le", "-"], capture_output=True).stdout
rec = KaldiRecognizer(Model(model), 16000)
rec.SetWords(True)
words = []
for i in range(0, len(pcm), 8000):
    if rec.AcceptWaveform(pcm[i:i + 8000]):
        words += json.loads(rec.Result()).get("result", [])
words += json.loads(rec.FinalResult()).get("result", [])
print(json.dumps([{"w": w["word"], "s": round(w["start"], 3), "e": round(w["end"], 3)} for w in words]))
