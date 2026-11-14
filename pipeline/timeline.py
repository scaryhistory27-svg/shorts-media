"""Usage: python3 pipeline/timeline.py <episode_dir>  -> build/timeline.json + build/audio.wav
Line fields: scene, text, hl{word:'y'|'r'}, say (pronunciation), gap (pause after, default .3),
sfx: [{word|at:'start', type, offset}] types: knock knockglass buzz sting hit heart whoosh creak"""
import json,re,sys,numpy as np,soundfile as sf
E=sys.argv[1]; B=f"{E}/build"
ep=json.load(open(f"{E}/episode.json")); lines=ep["lines"]; durs=json.load(open(f"{B}/durs.json"))
SR=24000; FPS=30
t=0.25; segs=[]; ev=[]
for i,(l,d) in enumerate(zip(lines,durs)):
    words=l["text"].split()
    w=[len(re.sub(r'[^\w]','',x))+1.5+(4 if re.search(r'(\.\.\.|[.:!?])$',x) else 2.5 if x.endswith(',') else 0) for x in words]
    tot=sum(w)-(w[-1]-len(re.sub(r'[^\w]','',words[-1]))-1.5)
    cur=t+0.05; wt=[]
    for x,ww in zip(words,w):
        wt.append({"w":x,"s":round(cur,3),"c":l.get("hl",{}).get(x,"")}); cur+=ww/tot*(d-0.15)
    seg={"scene":l["scene"],"s":round(t,3),"d":d,"words":wt}
    if "stamp" in l: seg["stamp"]=l["stamp"]
    segs.append(seg)
    for fx in l.get("sfx",[]):
        if fx.get("at")=="start": tt=t
        else:
            m=[x for x in wt if x["w"]==fx["word"]]; assert m,f"line {i}: sfx word {fx['word']} not found"
            tt=m[fx.get("n",0)]["s"]
        ev.append({"t":round(tt+fx.get("offset",0),3),"type":fx["type"]})
    t+=d+l.get("gap",0.3)
for i,s in enumerate(segs): s["e"]=segs[i+1]["s"] if i+1<len(segs) else round(t+1.8,3)
total=segs[-1]["e"]; ev.sort(key=lambda e:e["t"])
json.dump({"segs":segs,"events":ev,"total":total,"fps":FPS,"title":ep.get("title",""),"stamp":ep.get("stamp",""),"endTitle":ep.get("endTitle",""),"endSub":ep.get("endSub","")},open(f"{B}/timeline.json","w"),indent=1)
print("total",total)
N=int(total*SR)+SR; mix=np.zeros(N); rng=np.random.default_rng(7); ts=np.arange(N)/SR
dr=0.5*np.sin(2*np.pi*55*ts)+0.35*np.sin(2*np.pi*82.4*ts+1)+0.18*np.sin(2*np.pi*110.5*ts)+0.1*np.sin(2*np.pi*164.8*ts)
dr*=0.6+0.4*np.sin(2*np.pi*0.11*ts)
F=np.fft.rfft(rng.standard_normal(N)); fr=np.fft.rfftfreq(N,1/SR); F*=1/(1+(fr/300)**2); wind=np.fft.irfft(F,N); wind/=np.abs(wind).max()
wind*=0.5+0.5*np.sin(2*np.pi*0.07*ts+2)
bed=0.045*dr+0.05*wind
tens=np.clip((ts-total*0.55)/(total*0.4),0,1)
bed+=0.03*tens*np.sin(2*np.pi*233*ts)*np.sin(2*np.pi*246.9*ts)
mix+=bed*np.clip(ts/1.0,0,1)*np.clip((total-ts)/1.2,0,1)
def add(sig,t0,g=1.0):
    i=int(t0*SR); j=min(N,i+len(sig)); mix[i:j]+=g*sig[:j-i]
def knock(glass=False):
    n=int(0.35*SR); tt=np.arange(n)/SR
    s=(0.6*np.sin(2*np.pi*900*tt)*np.exp(-tt*40)+0.5*np.sin(2*np.pi*1800*tt)*np.exp(-tt*55)+0.5*np.sin(2*np.pi*140*tt)*np.exp(-tt*25)) if glass else (np.sin(2*np.pi*(95-40*tt)*tt)*np.exp(-tt*18)+0.4*np.sin(2*np.pi*190*tt)*np.exp(-tt*35))
    return s+rng.standard_normal(n)*np.exp(-tt*300)*0.5
def buzz():
    n=int(0.28*SR); tt=np.arange(n)/SR
    return 0.35*np.sign(np.sin(2*np.pi*165*tt))*np.sin(2*np.pi*55*tt)**2*np.clip(tt*60,0,1)*np.clip((0.28-tt)*60,0,1)
def boom(d=2.5):
    n=int(d*SR); tt=np.arange(n)/SR
    s=np.sin(2*np.pi*(60-25*tt/d)*tt)*np.exp(-tt*1.6)+0.25*rng.standard_normal(n)*np.exp(-tt*6)
    return s+0.15*(np.sin(2*np.pi*311*tt)+np.sin(2*np.pi*329.6*tt)+np.sin(2*np.pi*466*tt))*np.exp(-tt*1.2)
def heart(count=10,bpm=78):
    n=int(0.25*SR); tt=np.arange(n)/SR; b=np.sin(2*np.pi*50*tt)*np.exp(-tt*22); out=np.zeros(int(count*60/bpm*SR)+n)
    for k in range(count):
        p=int(k*60/bpm*SR); out[p:p+n]+=b; q=p+int(0.22*SR); out[q:q+n]+=0.7*b
    return out
def whoosh():
    n=int(0.8*SR); tt=np.arange(n)/SR; F=np.fft.rfft(rng.standard_normal(n)); fr=np.fft.rfftfreq(n,1/SR); F*=1/(1+(fr/900)**2)
    return np.fft.irfft(F,n)/40*np.sin(np.pi*tt/0.8)**2
def creak():
    n=int(1.2*SR); tt=np.arange(n)/SR; f=180+60*np.sin(2*np.pi*0.8*tt)
    return 0.3*np.sign(np.sin(2*np.pi*np.cumsum(f)/SR))*(np.sin(2*np.pi*23*tt)>0.3)*np.sin(np.pi*tt/1.2)
FX={"knock":(lambda:knock(),0.55),"knockglass":(lambda:knock(True),0.45),"buzz":(buzz,0.5),"sting":(lambda:boom(3.0),0.6),"hit":(lambda:boom(2.0),0.35),"heart":(heart,0.5),"whoosh":(whoosh,0.5),"creak":(creak,0.35)}
for e in ev:
    f,g=FX[e["type"]]; add(f(),e["t"]-(0.05 if e["type"]=="sting" else 0),g)
# ---- quiet mystical music bed (procedural, royalty-free): minor pads + sparse music-box notes + long reverb, ducked under the voice ----
def music_bed(N,seed):
    r=np.random.default_rng(seed); out=np.zeros(N); tt=np.arange(N)/SR
    progs=[[(62,65,69),(58,62,65),(55,58,62),(57,61,64)],[(57,60,64),(53,57,60),(55,59,62),(52,55,59)],[(62,65,69),(60,64,67),(58,62,65),(57,60,64)]]
    prog=progs[r.integers(len(progs))]; L=8.0; f=lambda m:440*2**((m-69)/12)
    for ci in range(int(N/SR/L)+2):
        ch=prog[ci%len(prog)]; t0=ci*L; i0=int(max(0,t0-1.5)*SR); i1=min(N,int((t0+L+2.5)*SR))
        if i0>=N: break
        t=tt[i0:i1]-t0; env=np.clip((t+1.5)/2.5,0,1)*np.clip((L+2.5-t)/2.5,0,1)
        for m in ch:
            for det in (-0.12,0.12):
                fr=f(m-12)*2**(det/12); w=sum(np.sin(2*np.pi*fr*n*t+n)/n**1.6 for n in range(1,7))
                out[i0:i1]+=0.05*env*w*(0.8+0.2*np.sin(2*np.pi*0.13*t+m))
        out[i0:i1]+=0.06*env*np.sin(2*np.pi*f(ch[0]-24)*t)
    scale=[62,65,67,69,72,74,77,79,81]; t=1.0
    while t<N/SR-2:
        m=scale[r.integers(len(scale))]+12; i0=int(t*SR); n=min(N-i0,int(3*SR)); x=np.arange(n)/SR
        out[i0:i0+n]+=0.07*np.exp(-x*1.6)*(np.sin(2*np.pi*f(m)*x)+0.3*np.sin(2*np.pi*f(m)*2.01*x)*np.exp(-x*3)+0.15*np.sin(2*np.pi*f(m)*3.02*x)*np.exp(-x*5))
        t+=r.choice([1.5,2.0,2.5,3.0,4.0])
    n=int(3.5*SR); ir=r.standard_normal(n)*np.exp(-np.arange(n)/SR*1.8); ir[0]=1.5
    M=1<<int(np.ceil(np.log2(N+n))); wet=np.fft.irfft(np.fft.rfft(out,M)*np.fft.rfft(ir,M),M)[:N]
    wet/=np.abs(wet).max()+1e-9; dry=out/(np.abs(out).max()+1e-9)
    return 0.45*dry+0.55*wet
vtrack=np.zeros(N)
for i,s in enumerate(segs):
    v,_=sf.read(f"{B}/l{i:02d}.wav"); j0=int(s["s"]*SR); vtrack[j0:j0+len(v)]+=v[:N-j0]
venv=np.convolve(np.abs(vtrack),np.ones(int(0.25*SR))/(0.25*SR),mode="same"); venv/=venv.max()+1e-9
duck=1-0.55*np.clip(venv*3,0,1)
mus=music_bed(N,__import__("zlib").crc32((ep.get("series","")+str(ep.get("episode",0))).encode())%10000)
mix+=ep.get("music_level",0.11)*mus*duck*np.clip(ts/1.5,0,1)*np.clip((total-ts)/1.5,0,1)
for i,s in enumerate(segs):
    v,_=sf.read(f"{B}/l{i:02d}.wav"); add(v*0.95,s["s"])
mix=mix[:int(total*SR)]; mix/=np.abs(mix).max(); mix=np.tanh(mix*2.2)/np.tanh(2.2); mix/=np.abs(mix).max()/0.95
sf.write(f"{B}/audio.wav",mix.astype(np.float32),SR)

# ---- mastering: iterate gain so that after a -3 dB limiter (and AAC) we land at -14 LUFS, peak <= -1 dB ----
import subprocess,re as _re
def _lufs(path):
    o=subprocess.run(["ffmpeg","-nostats","-i",path,"-af","ebur128","-f","null","-"],capture_output=True,text=True).stderr
    return float(_re.findall(r"I:\s+(-?[0-9.]+) LUFS",o)[-1])
g=-14-_lufs(f"{B}/audio.wav")
for _ in range(4):
    subprocess.run(["ffmpeg","-v","error","-y","-i",f"{B}/audio.wav","-af",f"volume={g:.2f}dB,alimiter=limit=0.7:attack=1:release=50:level=false","-ar","48000",f"{B}/audio_master.wav"],check=True)
    I=_lufs(f"{B}/audio_master.wav")
    if abs(I+14)<0.25: break
    g+=(-14-I)
print("master",round(I,2),"LUFS gain",round(g,2))
