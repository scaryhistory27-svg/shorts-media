#!/usr/bin/env python3
"""FearFiles long video, "forum story" format (owner 2026-11-23: scary stories "as if from Reddit").
ORIGINAL fiction written in first-person forum-post style (r/nosleep-like). No Reddit name/logo/UI copy — a generic dark forum card,
fictional usernames, and the description says "original fiction". Narrated by the FearFiles storyteller voice over a blurred, moving
background built from our own Shorts. 16:9 1920x1080, 6-8 min.
Usage: python3 compilations/reddit_long.py compilations/stories/<id>.json -> compilations/build/<id>/final.mp4 + chapters.txt"""
import json, os, subprocess, sys, textwrap
from PIL import Image, ImageDraw, ImageFont
spec = json.load(open(sys.argv[1])); B = f"compilations/build/{spec['id']}"; os.makedirs(B, exist_ok=True)
FB = "/usr/share/fonts/opentype/inter/Inter-Black.otf"; FR = "/usr/share/fonts/opentype/inter/Inter-Medium.otf"; FS = "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
W, H, GAP = 1920, 1080, 0.55
def run(a): subprocess.run(a, check=True)
def dur(p): return float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",p]))
f = lambda p, s: ImageFont.truetype(p, s)
# ---- 1) script → narration lines (intro, then per story: title + lines)
lines = [{"text": spec["intro"], "kind": "intro"}]
for si, st in enumerate(spec["stories"]):
    lines.append({"text": st["title"], "kind": "title", "s": si})
    for li, t in enumerate(st["lines"]): lines.append({"text": t, "kind": "line", "s": si, "i": li})
E = f"{B}/voice"; os.makedirs(E, exist_ok=True)
json.dump({"lines": [{"text": l["text"], "scene": "x"} for l in lines]}, open(f"{E}/episode.json", "w"))
if not os.path.exists(f"{E}/build/durs.json"): run(["python3", "pipeline/tts.py", E])
durs = json.load(open(f"{E}/build/durs.json"))
# ---- 2) cards (one PNG per line)
def card(l, k):
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    if l["kind"] == "intro":
        d.rectangle((0, 0, W, H), fill=(5, 5, 8, 150))
        y = 330
        for ln in textwrap.wrap(l["text"], 34):
            tw = d.textlength(ln, font=f(FB, 64)); d.text(((W-tw)/2, y), ln, font=f(FB, 64), fill="white", stroke_width=4, stroke_fill="black"); y += 84
        tw = d.textlength(spec["title"], font=f(FB, 40)); d.text(((W-tw)/2, 220), spec["title"], font=f(FB, 40), fill="#ff3a3a")
        return im
    st = spec["stories"][l["s"]]; x0, x1, y0 = 260, 1660, 120
    d.rounded_rectangle((x0, y0, x1, 960), radius=28, fill=(18, 18, 22, 236), outline=(60, 60, 70, 255), width=3)
    d.ellipse((x0+40, y0+36, x0+104, y0+100), fill="#ff3a3a"); d.text((x0+56, y0+44), "F", font=f(FB, 40), fill="white")
    d.text((x0+124, y0+38), st["sub"], font=f(FS, 30), fill="white"); d.text((x0+124, y0+74), f"{st['user']} · {st['age']}", font=f(FR, 26), fill="#9aa0aa")
    d.text((x1-310, y0+52), f"STORY {l['s']+1}/{len(spec['stories'])}", font=f(FB, 28), fill="#ff3a3a")
    ty = y0 + 140
    for ln in textwrap.wrap(st["title"], 46):
        d.text((x0+48, ty), ln, font=f(FB, 44), fill="#f2efe8"); ty += 56
    d.line((x0+48, ty+14, x1-48, ty+14), fill=(60, 60, 70, 255), width=2); by = ty + 50
    if l["kind"] == "line":
        prev = st["lines"][max(0, l["i"]-2):l["i"]]
        for p in prev:
            for ln in textwrap.wrap(p, 58): d.text((x0+48, by), ln, font=f(FR, 34), fill="#6b6f78"); by += 46
            by += 10
        for ln in textwrap.wrap(l["text"], 40): d.text((x0+48, by+6), ln, font=f(FB, 54), fill="white"); by += 68
    else:
        d.text((x0+48, by), "Read more…", font=f(FR, 30), fill="#6b6f78")
    d.text((x0+48, 900), f"↑ {st['votes']}  ·  {int(float(st['votes'].rstrip('k'))*37)} comments", font=f(FS, 28), fill="#9aa0aa")
    return im
os.makedirs(f"{B}/cards", exist_ok=True); seq = []; chapters = []; t = 0.0
for k, l in enumerate(lines):
    p = f"{B}/cards/c{k:03d}.png"; card(l, k).save(p); d_ = durs[k] + (GAP if l["kind"] != "title" else 0.9)
    if l["kind"] == "title":
        chapters.append(f"{int(t//60)}:{int(t%60):02d} Story {l['s']+1} · " + spec["stories"][l["s"]]["title"])
    seq.append((p, d_)); t += d_
chapters.insert(0, "0:00 Intro")
outro = f"{B}/cards/outro.png"; im = Image.new("RGBA", (W, H), (5, 5, 8, 235)); d = ImageDraw.Draw(im)
for y, txt, fo, c in [(400, "WATCH NEXT →", f(FB, 96), "#ff3a3a"), (540, "A new FearFiles case every day", f(FS, 44), "white"), (620, "All stories are original fiction.", f(FR, 30), "#9aa0aa")]:
    tw = d.textlength(txt, font=fo); d.text(((W-tw)/2, y), txt, font=fo, fill=c)
im.save(outro); seq.append((outro, 10.0)); total = t + 10.0
with open(f"{B}/cards.txt", "w") as fh:
    for p, d_ in seq: fh.write(f"file '{os.path.abspath(p)}'\nduration {d_:.3f}\n")
    fh.write(f"file '{os.path.abspath(seq[-1][0])}'\n")
# ---- 3) audio: narration with gaps + quiet dark drone
with open(f"{B}/audio.txt", "w") as fh:
    for k, l in enumerate(lines):
        fh.write(f"file '{os.path.abspath(E)}/build/l{k:02d}.wav'\n")
        g = GAP if l["kind"] != "title" else 0.9
        sil = f"{B}/sil_{int(g*1000)}.wav"
        if not os.path.exists(sil): run(["ffmpeg","-v","error","-y","-f","lavfi","-i","anullsrc=r=24000:cl=mono","-t",str(g),sil])
        fh.write(f"file '{os.path.abspath(sil)}'\n")
run(["ffmpeg","-v","error","-y","-f","concat","-safe","0","-i",f"{B}/audio.txt","-ar","48000","-ac","2",f"{B}/voice.wav"])
# ---- 4) moving background from our own Shorts (blurred, dark, slow)
bgsrc = spec.get("bg", ["series/fearfiles-room-0/ep1","series/fearfiles-trail-cam/ep1","series/fearfiles-stop-14/ep1","series/fearfiles-dryer-nine/ep1"])
with open(f"{B}/bg.txt","w") as fh:
    for e in bgsrc: fh.write(f"file '{os.path.abspath(e)}/build/final.mp4'\n")
if not os.path.exists(f"{B}/bg.mp4"):
    run(["ffmpeg","-v","error","-y","-f","concat","-safe","0","-i",f"{B}/bg.txt","-an","-vf",
         "setpts=1.6*PTS,scale=1920:-2,crop=1920:1080,boxblur=18:2,eq=brightness=-0.18:saturation=0.7,fps=30,format=yuv420p",
         "-c:v","libx264","-preset","veryfast","-crf","26",f"{B}/bg.mp4"])
run(["ffmpeg","-v","error","-y","-stream_loop","-1","-i",f"{B}/bg.mp4","-f","concat","-safe","0","-i",f"{B}/cards.txt","-i",f"{B}/voice.wav",
     "-f","lavfi","-i","anoisesrc=color=brown:amplitude=0.5:r=48000","-f","lavfi","-i","sine=f=55:r=48000",
     "-filter_complex",
     "[1:v]fps=30,format=rgba[c];[0:v][c]overlay=0:0:shortest=0,format=yuv420p[v];"
     "[3:a]lowpass=f=180,volume=0.05[n];[4:a]volume=0.02,tremolo=f=0.1:d=0.6[s];[n][s]amix=inputs=2:normalize=0,aformat=channel_layouts=stereo[bed];"
     "[2:a]apad[vo];[vo][bed]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5[a]",
     "-map","[v]","-map","[a]","-t",f"{total:.2f}","-c:v","libx264","-preset","slow","-crf","22","-maxrate","1100k","-bufsize","2200k",
     "-c:a","aac","-b:a","160k","-movflags","+faststart",f"{B}/final.mp4"])
open(f"{B}/chapters.txt","w").write("\n".join(chapters)+"\n"); print("\n".join(chapters)); print("total", round(total,1))
