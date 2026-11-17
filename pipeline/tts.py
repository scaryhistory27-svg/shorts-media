"""Usage: python3 pipeline/tts.py <episode_dir>  -> writes <episode_dir>/build/lNN.wav + durs.json
voice: a Kokoro voice name or a blend "am_michael:0.6,am_onyx:0.4" (channel default).
voice_fx: "storyteller" (default, trending horror-narrator style: deep, slow, dry close-mic, slight grit) | "mystic" ( slightly lower pitch, warm low end, close-mic compression, dark room echo) or "none"."""
import json,sys,os,subprocess,numpy as np,soundfile as sf
from kokoro_onnx import Kokoro
E=sys.argv[1]; M=os.environ.get("KOKORO_DIR","/tmp/kokoro")
os.makedirs(f"{E}/build",exist_ok=True)
ep=json.load(open(f"{E}/episode.json"))
k=Kokoro(f"{M}/kokoro.onnx",f"{M}/voices.bin")
DEFAULT_VOICE="am_michael:0.45,am_onyx:0.55"   # owner chose sample B "storyteller" (2026-11-15)
FX={"storyteller":"asetrate=24000*0.92,aresample=24000,atempo=1.087,highpass=f=60,equalizer=f=110:t=q:w=1:g=5,equalizer=f=350:t=q:w=1:g=-2,"
    "equalizer=f=2600:t=q:w=1.2:g=3,equalizer=f=8000:t=q:w=2:g=-2,asoftclip=type=tanh:threshold=0.6,acompressor=threshold=0.05:ratio=6:attack=3:release=80:makeup=3,"
    "aecho=0.8:0.25:18:0.12",
    "mystic":"asetrate=24000*0.95,aresample=24000,atempo=1.0526,highpass=f=70,equalizer=f=140:t=q:w=1:g=4,"
    "equalizer=f=3200:t=q:w=1.5:g=2.5,equalizer=f=7500:t=q:w=2:g=-3,acompressor=threshold=0.08:ratio=4:attack=5:release=120:makeup=2,"
    "aecho=0.85:0.6:45|95|160:0.22|0.14|0.08","none":None,
    # Strange Minute (channel 2): clear, warm documentary narrator — no pitch shift, gentle presence + light room
    "explainer":"highpass=f=70,equalizer=f=180:t=q:w=1:g=2,equalizer=f=3000:t=q:w=1.5:g=2.5,equalizer=f=9000:t=q:w=2:g=-1.5,"
    "acompressor=threshold=0.08:ratio=3:attack=5:release=100:makeup=2,aecho=0.8:0.3:22:0.08"}
def voice(v):
    if ":" not in v and "," not in v: return v
    parts=[p.split(":") for p in v.split(",")]
    return sum(float(w)*k.get_voice_style(n) for n,w in parts)
durs=[]
for i,l in enumerate(ep["lines"]):
    a,sr=k.create(l.get("say",l["text"]),voice=voice(l.get("voice",ep.get("voice",DEFAULT_VOICE))),speed=l.get("speed",ep.get("speed",0.80)),lang="en-us")
    idx=np.where(np.abs(a)>0.01)[0]; a=a[max(0,idx[0]-400):idx[-1]+1200]
    out=f"{E}/build/l{i:02d}.wav"; sf.write(out,a,sr)
    fx=FX[l.get("voice_fx",ep.get("voice_fx","storyteller"))]
    if fx:
        subprocess.run(["ffmpeg","-v","error","-y","-i",out,"-af",fx+",apad=pad_dur=0.25","-ar",str(sr),out+".fx.wav"],check=True); os.replace(out+".fx.wav",out)
        a,_=sf.read(out)
    durs.append(len(a)/sr); print(i,round(len(a)/sr,2),l["text"])
json.dump(durs,open(f"{E}/build/durs.json","w"))
