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
for i,s in enumerate(segs):
    v,_=sf.read(f"{B}/l{i:02d}.wav"); add(v*0.95,s["s"])
mix=mix[:int(total*SR)]; mix/=np.abs(mix).max(); mix=np.tanh(mix*2.2)/np.tanh(2.2); mix/=np.abs(mix).max()/0.95
sf.write(f"{B}/audio.wav",mix.astype(np.float32),SR)
