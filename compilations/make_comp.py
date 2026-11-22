#!/usr/bin/env python3
"""Weekly long-form compilation (16:9, 1920x1080) from finished FearFiles Shorts.
Usage: python3 compilations/make_comp.py <spec.json>  -> compilations/build/<id>/final.mp4 + chapters.txt
spec: {"id": "...", "title_card": "...", "items": [{"path": "series/.../final.mp4", "card": "CASE 1 · THE MISSING FLOOR"}]}"""
import json, os, subprocess, sys
F = "/usr/share/fonts/opentype/inter/Inter-Black.otf"
spec = json.load(open(sys.argv[1])); B = f"compilations/build/{spec['id']}"; os.makedirs(B, exist_ok=True)
def run(a): subprocess.run(a, check=True)
def dur(p): return float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",p]))
def esc(s): return s.replace("\\","\\\\").replace(":","\\:").replace("'","\u2019")
parts=[]; chapters=[]; t=0.0
for i,it in enumerate(spec["items"]):
    card=f"{B}/c{i:02d}.mp4"
    if not os.path.exists(card): run(["ffmpeg","-v","error","-y","-f","lavfi","-i","color=c=0x0b0b10:s=1920x1080:r=30:d=2","-f","lavfi","-i","anullsrc=r=48000:cl=stereo",
         "-vf",f"drawtext=fontfile={F}:text='{esc(it['card'])}':fontsize=84:fontcolor=0xff3a3a:x=(w-tw)/2:y=(h-th)/2,fade=in:0:10,fade=out:45:15",
         "-t","2","-c:v","libx264","-pix_fmt","yuv420p","-c:a","aac","-ar","48000","-ac","2",card])
    clip=f"{B}/v{i:02d}.mp4"
    if not os.path.exists(clip): run(["ffmpeg","-v","error","-y","-i",it["path"],"-filter_complex",
         "[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,boxblur=30:3,eq=brightness=-0.25[bg];[0:v]scale=-2:1080[fg];[bg][fg]overlay=(W-w)/2:0,fps=30,format=yuv420p[v]",
         "-map","[v]","-map","0:a","-c:v","libx264","-preset","veryfast","-crf","20","-c:a","aac","-ar","48000","-ac","2",clip])
    chapters.append(f"{int(t//60)}:{int(t%60):02d} {it['card'].title()}"); t+=2+dur(clip); parts+=[card,clip]
open(f"{B}/list.txt","w").write("".join(f"file '{os.path.abspath(p)}'\n" for p in parts))
run(["ffmpeg","-v","error","-y","-f","concat","-safe","0","-i",f"{B}/list.txt","-c:v","libx264","-preset","veryfast","-crf","20","-c:a","aac","-af","loudnorm=I=-14:TP=-1.5","-movflags","+faststart",f"{B}/final.mp4"])
open(f"{B}/chapters.txt","w").write("\n".join(chapters)+"\n"); print("\n".join(chapters)); print("total",round(t,1))
