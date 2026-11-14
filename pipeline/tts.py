"""Usage: python3 pipeline/tts.py <episode_dir>  -> writes <episode_dir>/build/lNN.wav + durs.json"""
import json,sys,os,numpy as np,soundfile as sf
from kokoro_onnx import Kokoro
E=sys.argv[1]; M=os.environ.get("KOKORO_DIR","/tmp/kokoro")
os.makedirs(f"{E}/build",exist_ok=True)
ep=json.load(open(f"{E}/episode.json"))
k=Kokoro(f"{M}/kokoro.onnx",f"{M}/voices.bin")
durs=[]
for i,l in enumerate(ep["lines"]):
    a,sr=k.create(l.get("say",l["text"]),voice=l.get("voice",ep.get("voice","am_michael")),speed=l.get("speed",ep.get("speed",0.92)),lang="en-us")
    idx=np.where(np.abs(a)>0.01)[0]; a=a[max(0,idx[0]-400):idx[-1]+1200]
    sf.write(f"{E}/build/l{i:02d}.wav",a,sr); durs.append(len(a)/sr); print(i,round(len(a)/sr,2),l["text"])
json.dump(durs,open(f"{E}/build/durs.json","w"))
