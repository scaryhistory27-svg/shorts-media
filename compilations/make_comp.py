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
VF = "scale=-2:1080,pad=1920:1080:(ow-iw)/2:0:color=0x0b0b10,fps=30,format=yuv420p"
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
for k, it in enumerate(spec["items"][:3]):
    p, _, tl = src(it)
    if tl is None: continue
    ep = json.load(open(f"{it['ep']}/episode.json")); c = ep.get("cover", {}); sg = tl["segs"][min(c.get("seg", 0), len(tl["segs"])-1)]
    ts = max(0, sg["s"] + (sg["e"]-sg["s"])*c.get("frac", 0.5) - 0.8); o = f"{B}/t{k}.mp4"
    if not os.path.exists(o):
        run(["ffmpeg","-v","error","-y","-ss",f"{ts:.2f}","-t","1.6","-i",p,"-vf",VF+",fade=in:0:4,fade=out:44:4","-af","afade=t=in:d=0.1,afade=t=out:st=1.4:d=0.2"]+ENC+[o])
    tz.append(o)
card(f"{B}/title.mp4", spec.get("teaser", "SCARY STORIES"), 2.2, 96, spec.get("teaser_sub"))
parts += tz + [f"{B}/title.mp4"]; t += 1.6*len(tz) + 2.2
# 2) stories with short cards; chapters
for i, it in enumerate(spec["items"]):
    p, cut, _ = src(it); cd = f"{B}/c{i:02d}.mp4"; card(cd, it["card"], 1.3, 80)
    clip = f"{B}/v{i:02d}.mp4"
    if not os.path.exists(clip):
        run(["ffmpeg","-v","error","-y","-i",p]+(["-t",f"{cut:.2f}"] if cut else [])+["-vf",VF,"-af",f"afade=t=out:st={max(0,(cut or dur(p))-0.4):.2f}:d=0.4"]+ENC+[clip])
    chapters.append(f"{int(t//60)}:{int(t%60):02d} " + " ".join(w.capitalize() for w in it["card"].split()))
    t += 1.3 + dur(clip); parts += [cd, clip]
# 3) outro for YouTube end-screen elements (≥ 5 s)
card(f"{B}/outro.mp4", spec.get("outro", "WATCH NEXT →"), 10, 90, spec.get("outro_sub", "New stories every day"))
parts.append(f"{B}/outro.mp4"); t += 10
open(f"{B}/list.txt","w").write("".join(f"file '{os.path.abspath(p)}'\n" for p in parts))
run(["ffmpeg","-v","error","-y","-f","concat","-safe","0","-i",f"{B}/list.txt","-c:v","libx264","-preset","slow","-crf","21","-maxrate","1200k","-bufsize","2400k",
     "-c:a","aac","-b:a","160k","-af","loudnorm=I=-14:TP=-1.5","-movflags","+faststart",f"{B}/final.mp4"])
open(f"{B}/chapters.txt","w").write("\n".join(chapters)+"\n"); print("\n".join(chapters)); print("total", round(t, 1))
