#!/usr/bin/env python3
"""Long-form compilation v2 (16:9 1920x1080, 6-8 min) from finished Shorts of ONE channel.
Research 2026-11-23: retention > length; themed sets ("N Scary <theme> Stories"); cold-open teaser; no repeated per-Short subscribe end cards.
Usage: python3 compilations/make_comp.py <spec.json>  -> compilations/build/<id>/final.mp4 + chapters.txt
spec: {"id": "...", "teaser": "7 SCARY STORIES · DON'T WATCH ALONE", "outro": "MORE FEARFILES →", "color": "ff3a3a",
       "items": [{"ep": "series/<slug>/ep1", "card": "CASE 1 · STOP 14"}]}   (legacy {"path": ".../final.mp4"} still works)"""
import json, os, subprocess, sys
F = "/usr/share/fonts/opentype/inter/Inter-Black.otf"
spec = json.load(open(sys.argv[1])); B = f"compilations/build/{spec['id']}"; os.makedirs(B, exist_ok=True)
COL = spec.get("color", "ff3a3a")
def run(a): subprocess.run(a, check=True)
def dur(p): return float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",p]))
def esc(s): return s.replace("\\","\\\\").replace(":","\\:").replace("'","\u2019")
ENC = ["-c:v","libx264","-preset","medium","-crf","18","-pix_fmt","yuv420p","-r","30","-c:a","aac","-ar","48000","-ac","2"]
VF = "scale=-2:1080,pad=1920:1080:(ow-iw)/2:0:color=0x0b0b10,setsar=1,fps=30,format=yuv420p"
def card(out, text, d, size=84, sub=None):
    if os.path.exists(out): return
    vf = f"drawtext=fontfile={F}:text='{esc(text)}':fontsize={size}:fontcolor=0x{COL}:x=(w-tw)/2:y=(h-th)/2" + \
         (f",drawtext=fontfile={F}:text='{esc(sub)}':fontsize=44:fontcolor=white:x=(w-tw)/2:y=h/2+90" if sub else "") + \
         f",fade=in:0:8,fade=out:{int(d*30)-10}:10"
    run(["ffmpeg","-v","error","-y","-f","lavfi","-i",f"color=c=0x0b0b10:s=1920x1080:r=30:d={d}","-f","lavfi","-i","anullsrc=r=48000:cl=stereo",
         "-vf",vf,"-t",str(d)]+ENC+[out])
def src(it):
    if "ep" in it:
        tl = json.load(open(f"{it['ep']}/build/timeline.json")); last = tl["segs"][-1]["words"][-1]["s"]
        return f"{it['ep']}/build/final.mp4", last + 0.8, tl   # cut before the per-Short end card / subscribe CTA
    return it["path"], None, None
parts = []; chapters = ["0:00 Intro"]; t = 0.0
# 1) cold-open teaser: 3 × 1.6 s of the scariest moments (cover frames), then the title card
tz = []
narr = None
if spec.get("intro_line"):   # narrated hook (open loop) in the channel's own voice, mixed over the teaser
    I = f"{B}/intro"; os.makedirs(I, exist_ok=True)
    first = json.load(open(f"{spec['items'][0]['ep']}/episode.json"))
    ie = {k: first[k] for k in ("voice","lang","voice_fx","speed") if k in first}; ie["lines"] = [{"text": spec["intro_line"], "scene": "x"}]
    json.dump(ie, open(f"{I}/episode.json","w"))
    if not os.path.exists(f"{I}/build/l00.wav"): run(["python3","pipeline/tts.py",I])
    narr = f"{I}/build/l00.wav"
nd = dur(narr) if narr else 0
TL_ = max(1.6, (nd + 0.8 - 2.0) / 3)
for k, it in enumerate(spec["items"][:3]):
    p, _, tl = src(it)
    if tl is None: continue
    ep = json.load(open(f"{it['ep']}/episode.json")); c = ep.get("cover", {}); sg = tl["segs"][min(c.get("seg", 0), len(tl["segs"])-1)]
    ts = max(0, sg["s"] + (sg["e"]-sg["s"])*c.get("frac", 0.5) - TL_/2); o = f"{B}/t{k}.mp4"
    if not os.path.exists(o):
        run(["ffmpeg","-v","error","-y","-ss",f"{ts:.2f}","-t",f"{TL_:.2f}","-i",p,"-vf",VF+f",fade=in:0:4,fade=out:{int(TL_*30)-6}:4","-af",f"afade=t=in:d=0.1,afade=t=out:st={TL_-0.2:.2f}:d=0.2"]+ENC+[o])
    tz.append(o)
td = max(2.0, nd + 0.8 - TL_*len(tz))
card(f"{B}/title.mp4", spec.get("teaser", "SCARY STORIES"), round(td,2), 96, spec.get("teaser_sub"))
if narr:
    o = f"{B}/teaser.mp4"
    if not os.path.exists(o):
        ins = sum([["-i", x] for x in tz + [f"{B}/title.mp4"]], [])
        n = len(tz) + 1
        fc = "".join(f"[{i}:v]setsar=1,fps=30,format=yuv420p[sv{i}];[{i}:a]aformat=sample_rates=48000:channel_layouts=stereo[sa{i}];" for i in range(n)) + "".join(f"[sv{i}][sa{i}]" for i in range(n)) + f"concat=n={n}:v=1:a=1[v][a0];[a0]volume=0.25[a1];[{n}:a]aformat=sample_rates=48000:channel_layouts=stereo,adelay=200|200,volume=1.6[nv];[a1][nv]amix=inputs=2:duration=first:normalize=0[a]"
        run(["ffmpeg","-v","error","-y"]+ins+["-i",narr,"-filter_complex",fc,"-map","[v]","-map","[a]"]+ENC+[o])
    parts += [o]
else:
    parts += tz + [f"{B}/title.mp4"]
t += TL_*len(tz) + td
# 2) stories with short cards; chapters
for i, it in enumerate(spec["items"]):
    p, cut, _ = src(it); cd = f"{B}/c{i:02d}.mp4"; card(cd, it["card"], 1.3, 80)
    clip = f"{B}/v{i:02d}.mp4"
    if not os.path.exists(clip):
        run(["ffmpeg","-v","error","-y","-i",p]+(["-t",f"{cut:.2f}"] if cut else [])+["-vf",VF,"-af",f"afade=t=out:st={max(0,(cut or dur(p))-0.4):.2f}:d=0.4"]+ENC+[clip])
    chapters.append(f"{int(t//60)}:{int(t%60):02d} " + " ".join(w.capitalize() for w in it["card"].split()))
    t += 1.3 + dur(clip); parts += [cd, clip]
    if i == len(spec["items"])//2 - 1 and len(spec["items"]) >= 5:
        sc = f"{B}/still.mp4"; card(sc, "STILL TO COME", 2.0, 70, spec.get("still_sub", spec["items"][-1]["card"]))
        parts.append(sc); t += 2.0
# 3) outro for YouTube end-screen elements (≥ 5 s)
card(f"{B}/outro.mp4", spec.get("outro", "WATCH NEXT →"), 10, 90, spec.get("outro_sub", "New stories every day"))
parts.append(f"{B}/outro.mp4"); t += 10
open(f"{B}/list.txt","w").write("".join(f"file '{os.path.abspath(p)}'\n" for p in parts))
run(["ffmpeg","-v","error","-y","-f","concat","-safe","0","-i",f"{B}/list.txt","-c:v","libx264","-preset","slow","-crf","21","-maxrate","1200k","-bufsize","2400k",
     "-c:a","aac","-b:a","160k","-af","loudnorm=I=-14:TP=-1.5","-movflags","+faststart",f"{B}/final.mp4"])
open(f"{B}/chapters.txt","w").write("\n".join(chapters)+"\n"); print("\n".join(chapters)); print("total", round(t, 1))
