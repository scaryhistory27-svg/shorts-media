"""Usage: python3 pipeline/timeline.py <episode_dir>  -> build/timeline.json + build/audio.wav
Line fields: scene, text, hl{word:'y'|'r'}, say (pronunciation), gap (pause after, default .3),
sfx: [{word|at:'start', type, offset}] types: knock knockglass buzz sting hit heart whoosh creak"""
import json,os,re,sys,numpy as np,soundfile as sf
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
        elif fx.get("at")=="end": tt=t+d+0.05   # right after the line (Strange Minute: question first, then a small ding)
        else:
            m=[x for x in wt if x["w"]==fx["word"]]; assert m,f"line {i}: sfx word {fx['word']} not found"
            tt=m[fx.get("n",0)]["s"]
        ev.append({"t":round(tt+fx.get("offset",0),3),"type":fx["type"]})
    t+=d+l.get("gap",ep.get("gap",0.5))
# signature voice tag on the end card (owner 2026-11-25): FearFiles "Sleep tight. The Watcher won't." / SM "That's one Strange Minute."
SIGV=None
if ep.get("signature",True) is not False and ep.get("sig_voice",True) is not False:
    _sv=f"assets/sig/{'strange-minute' if ep.get('style','dark')=='light' else 'fearfiles'}/build/l00.wav"
    if os.path.exists(_sv): SIGV=(_sv,sf.info(_sv).duration)
for i,s in enumerate(segs): s["e"]=segs[i+1]["s"] if i+1<len(segs) else round(t+1.8+(0.9 if ep.get("cta") else 0)+(SIGV[1]+1.2 if SIGV else 0),3)
total=segs[-1]["e"]
if ep.get("cta"): ev.append({"t":round(segs[-1]["words"][-1]["s"]+0.9+1.25,3),"type":"pop"})  # soft click when the Subscribe button is tapped
# channel signature (owner 2026-11-25): hidden Watcher (horror) / hidden Tick (Strange Minute) once per video + 3-note motif on the end card
SIG=None
if ep.get("signature",True) is not False:
    import zlib as _z; _r=np.random.default_rng(_z.crc32((ep.get("series","")+str(ep.get("episode",0))+ep.get("title","")).encode())%100000)
    _mid=ep.get("mid_cta_at",round(total/2-1.5,2)); _last=segs[-1]["words"][-1]["s"]
    for _ in range(50):
        _t=float(_r.uniform(total*0.58,_last-2.0))
        if not (_mid-1.0<_t<_mid+3.5): break
    SIG={"t":round(_t,2),"x":int(_r.choice([int(_r.uniform(130,330)),int(_r.uniform(750,950))])),"y":int(_r.uniform(520,1050))}
    if isinstance(ep.get("signature"),dict): SIG.update(ep["signature"])
    ev.append({"t":round(_last+0.9+(0.5+SIGV[1]+0.05 if SIGV else 0.3),3),"type":"sig_light" if ep.get("style","dark")=="light" else "sig_dark"})
ev.sort(key=lambda e:e["t"])
json.dump({"segs":segs,"events":ev,"total":total,"fps":FPS,"title":ep.get("title",""),"stamp":ep.get("stamp",""),"endTitle":ep.get("endTitle",""),"endSub":ep.get("endSub",""),"style":ep.get("style","dark"),"cta":ep.get("cta"),"next":ep.get("next_promise"),"sig":SIG,"midCta":({"t":ep.get("mid_cta_at",round(total/2-1.5,2)),"text":ep.get("mid_cta_text","SO YOU DON'T MISS NEW VIDEOS")} if ep.get("mid_cta",True) and total>20 else None)},open(f"{B}/timeline.json","w"),indent=1)
print("total",total)
N=int(total*SR)+SR; mix=np.zeros(N); rng=np.random.default_rng(7); ts=np.arange(N)/SR
dr=0.5*np.sin(2*np.pi*55*ts)+0.35*np.sin(2*np.pi*82.4*ts+1)+0.18*np.sin(2*np.pi*110.5*ts)+0.1*np.sin(2*np.pi*164.8*ts)
dr*=0.6+0.4*np.sin(2*np.pi*0.11*ts)
F=np.fft.rfft(rng.standard_normal(N)); fr=np.fft.rfftfreq(N,1/SR); F*=1/(1+(fr/300)**2); wind=np.fft.irfft(F,N); wind/=np.abs(wind).max()
wind*=0.5+0.5*np.sin(2*np.pi*0.07*ts+2)
bed=0.045*dr+0.05*wind
tens=np.clip((ts-total*0.55)/(total*0.4),0,1)
bed+=0.03*tens*np.sin(2*np.pi*233*ts)*np.sin(2*np.pi*246.9*ts)
LIGHT=ep.get("bed")=="light"   # channel 2 (Strange Minute): no horror drone/tension, soft airy pad instead
if LIGHT: bed=0.02*wind+0.015*np.sin(2*np.pi*110*ts)*(0.6+0.4*np.sin(2*np.pi*0.09*ts))
if LIGHT: bed*=np.clip((ts-(segs[0]["s"]+segs[0]["d"]))/1.0,0,1)
mix+=bed*np.clip(ts/1.0,0,1)*np.clip((total-ts)/1.2,0,1)
def add(sig,t0,g=1.0):
    i=int(t0*SR); j=min(N,i+len(sig)); mix[i:j]+=g*sig[:j-i]
# ---- realistic SFX (owner 2026-11-17: "make all sounds realistic, they were too loud and out of place") ----
from scipy.signal import butter,sosfilt
def _bp(x,lo,hi,o=2): return sosfilt(butter(o,[lo,hi],btype='band',fs=SR,output='sos'),x)
def _lp(x,f,o=2): return sosfilt(butter(o,f,btype='low',fs=SR,output='sos'),x)
def _hp(x,f,o=2): return sosfilt(butter(o,f,btype='high',fs=SR,output='sos'),x)
def _env(n,a,d): tt=np.arange(n)/SR; return np.clip(tt/a,0,1)*np.exp(-np.maximum(tt-a,0)*d)
def knock(glass=False):   # knuckle on a wooden door (or glass): short filtered transient + panel body resonance, slight room
    n=int(0.45*SR); tt=np.arange(n)/SR; x=rng.standard_normal(n)
    if glass: s=_bp(x,2500,7000)*_env(n,0.0005,90)+0.5*np.sin(2*np.pi*2100*tt)*np.exp(-tt*60)+0.25*np.sin(2*np.pi*3400*tt)*np.exp(-tt*80)
    else: s=_bp(x,300,2500)*_env(n,0.0008,70)*1.4+0.9*np.sin(2*np.pi*115*tt)*np.exp(-tt*28)+0.4*np.sin(2*np.pi*230*tt)*np.exp(-tt*40)
    return s/np.abs(s).max()
def buzz():   # phone vibrating on a table: ~170 Hz motor, 3 short pulses with rattle
    n=int(0.9*SR); tt=np.arange(n)/SR; g=((tt%0.3)<0.18).astype(float); g=_lp(g,40)
    s=(np.sign(np.sin(2*np.pi*170*tt))*0.5+np.sin(2*np.pi*170*tt))*g; s=_bp(s,120,1800)+0.15*_bp(rng.standard_normal(n),2000,5000)*g
    return s/np.abs(s).max()*0.8
def boom(d=2.5):   # cinematic low impact: sub drop + dull body + soft air, no harsh dissonance
    n=int(d*SR); tt=np.arange(n)/SR; sub=np.sin(2*np.pi*(55-20*tt/d)*tt)*np.exp(-tt*2.8)
    body=_lp(rng.standard_normal(n),180)*np.exp(-tt*6)*3; air=_bp(rng.standard_normal(n),400,3000)*np.exp(-tt*14)*0.4
    s=sub+body+air; return s/np.abs(s).max()
def sting(d=2.6):  # horror sting: slow-swelling low string cluster (filtered saws) + soft impact — eerie, not loud
    n=int(d*SR); tt=np.arange(n)/SR; sw=np.zeros(n)
    for f in (110,116.5,155.6,164.8):
        ph=2*np.pi*f*tt+0.3*np.sin(2*np.pi*5.2*tt); sw+=((ph/(2*np.pi))%1-0.5)
    sw=_lp(sw,1400)*np.clip(tt/0.18,0,1)*np.exp(-tt*1.3); s=0.7*sw/np.abs(sw).max()+0.6*boom(d)
    return s/np.abs(s).max()
def heart(count=8,bpm=72):   # muffled heartbeat (lub-dub) heard from inside
    beat=int(0.18*SR); tb=np.arange(beat)/SR; lub=_lp(np.sin(2*np.pi*48*tb)*np.exp(-tb*28)+0.3*rng.standard_normal(beat)*np.exp(-tb*60),150)
    out=np.zeros(int(count*60/bpm*SR)+beat)
    for k in range(count):
        p=int(k*60/bpm*SR); out[p:p+beat]+=lub; q=p+int(0.24*SR); out[q:q+beat]+=0.6*lub
    return out/np.abs(out).max()
def whoosh():   # air passing: noise through a band that sweeps up then down
    n=int(0.9*SR); tt=np.arange(n)/SR; x=rng.standard_normal(n); out=np.zeros(n); seg=int(0.03*SR)
    for k in range(0,n,seg):
        f=300+1500*np.sin(np.pi*min(1,k/n))**2; out[k:k+seg]=_bp(x[max(0,k-seg):k+seg],f*0.6,f*1.6)[-len(out[k:k+seg]):]
    out*=np.sin(np.pi*tt/0.9)**2; return out/np.abs(out).max()*0.8
def creak():   # wooden door creak: stick-slip friction pulses through a resonant band, pitch drifting
    n=int(1.3*SR); tt=np.arange(n)/SR; rate=28+22*np.sin(2*np.pi*0.6*tt+1); ph=np.cumsum(rate)/SR
    pulses=np.exp(-((ph%1)*40)); s=_bp(pulses+0.05*rng.standard_normal(n),350,1600)+0.5*_bp(pulses,900,2600)
    s*=np.sin(np.pi*tt/1.3)**1.5; return s/np.abs(s).max()*0.8
def chime():   # Strange Minute signature: bright bell cluster + airy shimmer (no boom — must not sound like the horror channel)
    n=int(2.2*SR); tt=np.arange(n)/SR; s=np.zeros(n)
    for f0,g,dl in ((1318.5,1,0),(1975.5,0.6,0.04),(2637,0.4,0.08),(987.8,0.5,0.0)):
        x=np.clip(tt-dl,0,None); s+=g*np.sin(2*np.pi*f0*x)*np.exp(-x*3.2)*(tt>=dl)*(1+0.3*np.sin(2*np.pi*5.5*x))
    F=np.fft.rfft(rng.standard_normal(n)); fr=np.fft.rfftfreq(n,1/SR); F*=(fr>4000)/(1+(fr/9000)**2); air=np.fft.irfft(F,n); air/=np.abs(air).max()
    return 0.35*s/np.abs(s).max()+0.12*air*np.exp(-tt*4)
def thud():   # horror hook accent (owner 2026-11-17: the start boom covered "Never") — short, deep, placed AFTER the hook line
    n=int(0.9*SR); tt=np.arange(n)/SR
    return (np.sin(2*np.pi*(70-30*tt)*tt)*np.exp(-tt*7)+0.25*rng.standard_normal(n)*np.exp(-tt*40))*0.9
def ding():   # small soft single bell — sits in the gap after the hook question, never under the voice
    n=int(1.2*SR); tt=np.arange(n)/SR
    return (np.sin(2*np.pi*1568*tt)+0.35*np.sin(2*np.pi*3136*tt)*np.exp(-tt*6))*np.exp(-tt*4.5)*0.5
def pop():
    n=int(0.25*SR); tt=np.arange(n)/SR
    return np.sin(2*np.pi*(500+900*tt/0.25)*tt)*np.exp(-tt*28)*0.6
def rise():
    n=int(0.9*SR); tt=np.arange(n)/SR; F=np.fft.rfft(rng.standard_normal(n)); fr=np.fft.rfftfreq(n,1/SR); F*=1/(1+(fr/2500)**2); w=np.fft.irfft(F,n); w/=np.abs(w).max()
    return 0.4*w*(tt/0.9)**2+0.2*np.sin(2*np.pi*(300+600*tt/0.9)*tt)*(tt/0.9)**2
def motif(notes,step=0.34,dark=True):   # channel signature: 3 music-box (horror) / bell (Strange Minute) notes with a soft tail
    n=int((step*len(notes)+2.2)*SR); out=np.zeros(n); f=lambda m:440*2**((m-69)/12)
    for k,m in enumerate(notes):
        i=int(k*step*SR); x=np.arange(n-i)/SR
        out[i:]+=np.exp(-x*(2.2 if dark else 3.0))*(np.sin(2*np.pi*f(m)*x)+0.3*np.sin(2*np.pi*f(m)*(2.01 if dark else 2.0)*x)*np.exp(-x*4)+0.12*np.sin(2*np.pi*f(m)*3.02*x)*np.exp(-x*6))
    return out*0.45
FX={"sig_dark":(lambda:motif([74,77,73],0.38,True),0.6),"sig_light":(lambda:motif([72,76,79],0.18,False),0.5),"thud":(thud,0.5),"ding":(ding,0.5),"chime":(chime,0.7),"pop":(pop,0.5),"rise":(rise,0.5),"knock":(lambda:knock(),0.9),"knockglass":(lambda:knock(True),0.7),
    "buzz":(buzz,0.6),"sting":(lambda:sting(2.6),0.75),"hit":(lambda:boom(2.0),0.7),"heart":(heart,0.55),"whoosh":(whoosh,0.45),"creak":(creak,0.6)}
sfx=np.zeros(N)
for e in ev:
    f,g=FX[e["type"]]; x=f(); i0=int(max(0,e["t"]-(0.05 if e["type"]=="sting" else 0))*SR); j0=min(N,i0+len(x)); sfx[i0:j0]+=g*x[:j0-i0]
# SFX bus: tame highs, add a short natural room, keep it UNDER the voice (ducked while speaking), overall level per episode
sfx=_lp(_hp(sfx,35),7000)
_nr=int(0.5*SR); _ir=rng.standard_normal(_nr)*np.exp(-np.arange(_nr)/SR*9); _ir[0]=3.0; _M=1<<int(np.ceil(np.log2(N+_nr)))
sfx=np.fft.irfft(np.fft.rfft(sfx,_M)*np.fft.rfft(_ir/np.abs(_ir).sum()*3,_M),_M)[:N]
SFX_ENV_PENDING=True
# ---- quiet mystical music bed (procedural, royalty-free): minor pads + sparse music-box notes + long reverb, ducked under the voice ----
def music_bed(N,seed):
    r=np.random.default_rng(seed); out=np.zeros(N); tt=np.arange(N)/SR
    if LIGHT: return music_pulse(N,seed) if ep.get('music_style','pulse')=='pulse' else music_light(N,seed)
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
def music_light(N,seed):
    # curious/wonder bed: major-key pads (I–V–vi–IV family) + bright plucked arpeggio, soft reverb
    r=np.random.default_rng(seed); out=np.zeros(N); tt=np.arange(N)/SR; f=lambda m:440*2**((m-69)/12)
    progs=[[(60,64,67),(67,71,74),(69,72,76),(65,69,72)],[(62,66,69),(69,73,76),(71,74,78),(67,71,74)],[(65,69,72),(60,64,67),(62,65,69),(70,74,77)]]
    prog=progs[r.integers(len(progs))]; L=4.0
    for ci in range(int(N/SR/L)+2):
        ch=prog[ci%len(prog)]; t0=ci*L; i0=int(max(0,t0-0.8)*SR); i1=min(N,int((t0+L+1.2)*SR))
        if i0>=N: break
        t=tt[i0:i1]-t0; env=np.clip((t+0.8)/1.2,0,1)*np.clip((L+1.2-t)/1.2,0,1)
        for m in ch:
            out[i0:i1]+=0.035*env*sum(np.sin(2*np.pi*f(m-12)*n*t+n)/n**2 for n in range(1,5))
        out[i0:i1]+=0.05*env*np.sin(2*np.pi*f(ch[0]-24)*t)
        for k in range(8):   # eighth-note arpeggio, every other bar dropped for air
            if ci%4==3 and k>3: break
            m=ch[k%3]+12*(1+(k//3)%2); j0=int((t0+k*L/8)*SR); n=min(N-j0,int(1.2*SR))
            if j0<0 or n<=0: continue
            x=np.arange(n)/SR; out[j0:j0+n]+=0.045*np.exp(-x*4)*(np.sin(2*np.pi*f(m)*x)+0.25*np.sin(2*np.pi*f(m)*2*x)*np.exp(-x*6))
    n=int(1.8*SR); ir=r.standard_normal(n)*np.exp(-np.arange(n)/SR*3); ir[0]=2
    M=1<<int(np.ceil(np.log2(N+n))); wet=np.fft.irfft(np.fft.rfft(out,M)*np.fft.rfft(ir,M),M)[:N]
    wet/=np.abs(wet).max()+1e-9; dry=out/(np.abs(out).max()+1e-9)
    return 0.6*dry+0.4*wet
def music_pulse(N,seed):
    # Strange Minute (owner 2026-11-18: "make the music more gripping, like popular what-if Shorts"): a driving "curiosity" bed —
    # ~108 BPM light kick on every beat, off-beat hats, 8th-note sub bass, 16th-note plucked arpeggio with a dotted echo,
    # soft pad; a clap layer + riser enter at ~55 % ("the strangest part"), and the last 2 s drop out to the pad.
    r=np.random.default_rng(seed); out=np.zeros(N); f=lambda m:440*2**((m-69)/12)
    bpm=r.choice([104,108,112]); beat=60/bpm; s16=beat/4
    progs=[[(57,60,64),(53,57,60),(48,52,55),(55,59,62)],[(50,53,57),(46,50,53),(53,57,60),(48,52,55)],[(52,55,59),(48,52,55),(55,59,62),(50,54,57)]]
    prog=progs[r.integers(len(progs))]; bar=beat*4; T=N/SR
    def put(sig,t0,g):
        i=int(t0*SR); j=min(N,i+len(sig))
        if 0<=i<N: out[i:j]+=g*sig[:j-i]
    nk=int(0.28*SR); tk=np.arange(nk)/SR; kick=np.sin(2*np.pi*(95*np.exp(-tk*30)+42)*tk)*np.exp(-tk*14)
    nh=int(0.06*SR); hat=_hp(r.standard_normal(nh),7000)*np.exp(-np.arange(nh)/SR*70)
    nc=int(0.18*SR); clap=_bp(r.standard_normal(nc),900,3500)*np.exp(-np.arange(nc)/SR*28)
    def pluck(m,d=0.35):
        n=int(d*SR); x=np.arange(n)/SR; return (np.sin(2*np.pi*f(m)*x)+0.4*np.sin(2*np.pi*f(m)*2*x)*np.exp(-x*9)+0.15*np.sign(np.sin(2*np.pi*f(m)*x)))*np.exp(-x*11)
    def bassn(m,d):
        n=int(d*SR); x=np.arange(n)/SR; w=((f(m)*x)%1-0.5)*2; return _lp(w,420)*np.clip(x/0.01,0,1)*np.exp(-x*5)
    build=T*0.55; t=0.0; k=0
    while t<T-2.0:
        ch=prog[int(t/bar)%len(prog)]
        if k%4==0: put(kick,t,0.55)
        if k%4==2: put(hat,t,0.18)
        if t>build and k%8==4: put(clap,t,0.22)
        if k%2==0: put(bassn(ch[0]-24,s16*2),t,0.35)
        m=ch[[0,1,2,1][k%4]]+12*(1+((k//4)%2)); p=pluck(m); put(p,t,0.16); put(p,t+s16*3,0.06)
        t+=s16; k+=1
    tt=np.arange(N)/SR
    for ci in range(int(T/bar)+1):
        ch=prog[ci%len(prog)]; i0=int(ci*bar*SR); i1=min(N,int((ci+1)*bar*SR))
        if i0>=N: break
        x=tt[i0:i1]-ci*bar
        for m in ch: out[i0:i1]+=0.025*np.sin(2*np.pi*f(m)*x+m)*np.clip(x/0.3,0,1)
    rs=int(min(build,T-3)*SR); n=int(1.6*SR)
    if rs-n>0:
        x=np.arange(n)/SR; out[rs-n:rs]+=0.12*_bp(r.standard_normal(n),800,6000)*(x/1.6)**2
    out[int((T-2.0)*SR):]*=0.5
    return out/(np.abs(out).max()+1e-9)
vtrack=np.zeros(N)
for i,s in enumerate(segs):
    v,_=sf.read(f"{B}/l{i:02d}.wav"); j0=int(s["s"]*SR); vtrack[j0:j0+len(v)]+=v[:N-j0]
if SIGV:
    _v,_=sf.read(SIGV[0]); _j=int((segs[-1]["words"][-1]["s"]+0.9+0.5)*SR); vtrack[_j:_j+len(_v)]+=_v[:max(0,N-_j)]
venv=np.convolve(np.abs(vtrack),np.ones(int(0.25*SR))/(0.25*SR),mode="same"); venv/=venv.max()+1e-9
duck=1-0.55*np.clip(venv*3,0,1)
mus=music_bed(N,__import__("zlib").crc32((ep.get("series","")+str(ep.get("episode",0))).encode())%10000)
m0=(segs[0]["s"]+segs[0]["d"]) if LIGHT else 0   # light style: music starts only after the hook question
mix+=ep.get("music_level",0.11 if (LIGHT and ep.get("music_style","pulse")=="pulse") else 0.11)*mus*duck*np.clip((ts-m0)/1.5,0,1)*np.clip((total-ts)/1.5,0,1)
sfx_duck=1-0.6*np.clip(venv*3,0,1)
mix+=ep.get("sfx_level",0.22)*sfx/(np.abs(sfx).max()+1e-9)*sfx_duck
for i,s in enumerate(segs):
    v,_=sf.read(f"{B}/l{i:02d}.wav"); add(v*0.95,s["s"])
if SIGV:
    _v,_=sf.read(SIGV[0]); add(_v*0.95,segs[-1]["words"][-1]["s"]+0.9+0.5)
mix=mix[:int(total*SR)]; mix/=np.abs(mix).max(); mix=np.tanh(mix*1.4)/np.tanh(1.4); mix/=np.abs(mix).max()/0.95
sf.write(f"{B}/audio.wav",mix.astype(np.float32),SR)

# ---- mastering: iterate gain so that after a -3 dB limiter (and AAC) we land at -14 LUFS, peak <= -1 dB ----
import subprocess,re as _re
def _lufs(path):
    o=subprocess.run(["ffmpeg","-nostats","-i",path,"-af","ebur128","-f","null","-"],capture_output=True,text=True).stderr
    return float(_re.findall(r"I:\s+(-?[0-9.]+) LUFS",o)[-1])
g=-14-_lufs(f"{B}/audio.wav")
for _ in range(4):
    subprocess.run(["ffmpeg","-v","error","-y","-i",f"{B}/audio.wav","-af",f"volume={g:.2f}dB,alimiter=limit=0.6:attack=1:release=50:level=false","-ar","48000",f"{B}/audio_master.wav"],check=True)
    I=_lufs(f"{B}/audio_master.wav")
    if abs(I+14)<0.25: break
    g+=(-14-I)
print("master",round(I,2),"LUFS gain",round(g,2))
