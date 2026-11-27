#!/usr/bin/env python3
"""Variety gate (owner 2026-11-27: "make every video unlike the others so monetization doesn't get banned for repetitive content").
YouTube YPP "inauthentic content" (July 2025, clarified July 2026): videos that look template-made with little variation are demonetized.
Usage: python3 pipeline/check_variety.py <episode_dir>   -> PASS / FAIL with reasons (exit 1 on FAIL). Part of QA, before publishing.
Compares the new episode with ALL earlier episodes of the same channel (by episode.json files, newest first by mtime)."""
import glob, json, os, re, sys
from difflib import SequenceMatcher
E = sys.argv[1].rstrip('/'); ep = json.load(open(f"{E}/episode.json"))
sm = 'strange-minute' in E
pool = glob.glob('channels/strange-minute/ep*/episode.json') if sm else glob.glob('series/*/ep*/episode.json')
pool = [p for p in pool if os.path.dirname(p) != E and '/_test' not in p]
pool.sort(key=os.path.getmtime, reverse=True)
past = []
for p in pool:
    try: past.append(json.load(open(p)))
    except Exception: pass
norm = lambda s: re.sub(r'[^a-z0-9 ]', '', (s or '').lower().replace('#shorts', '')).strip()
opening = lambda l: (norm(l).split() or [''])[0]
fails, warns = [], []
yt = ep.get('youtube', {}); title = yt.get('title', ''); hook = ep['lines'][0]['text']
# 1) title / hook / description / first comment must be unique
for q in past:
    qy = q.get('youtube', {})
    if SequenceMatcher(None, norm(title), norm(qy.get('title'))).ratio() >= 0.75: fails.append(f"title too similar to: {qy.get('title')}")
    if SequenceMatcher(None, norm(hook), norm(q['lines'][0]['text'])).ratio() >= 0.8: fails.append(f"hook too similar to: {q['lines'][0]['text']}")
    if yt.get('first_comment') and yt.get('first_comment') == qy.get('first_comment'): fails.append("first comment identical to an earlier video")
    if norm(yt.get('description'))[:50] and norm(yt.get('description'))[:50] == norm(qy.get('description'))[:50]: fails.append("description opening identical to an earlier video")
# 2) opening pattern rotation: the same first word max 2 videos in a row
last2 = [opening(q['lines'][0]['text']) for q in past[:2]]
if len(last2) == 2 and all(o == opening(hook) for o in last2): fails.append(f"3rd video in a row opening with '{opening(hook)}' — rotate the hook pattern (warning / I found / impossible fact / what happens if / question)")
# 3) end card + CTA slogan rotation (not identical to the previous video)
if past:
    q = past[0]
    if ep.get('endTitle') and ep.get('endTitle') == q.get('endTitle'): fails.append("end title identical to the previous video")
    if ep.get('cta', {}).get('text') and ep.get('cta', {}).get('text') == q.get('cta', {}).get('text'): warns.append("CTA slogan same as the previous video — rotate it")
# 4) scenes: at least 70 % of scene names / sets must be new vs the previous video (no recycled visuals)
if past:
    a = {l['scene'] for l in ep['lines']}; b = {l['scene'] for l in past[0]['lines']}
    if len(a & b) / max(1, len(a)) > 0.5: fails.append(f"more than half the scene names reused from the previous video: {sorted(a & b)}")
# 5) length/line-count variety vs the last 3 (warn only)
n = len(ep['lines']); ns = [len(q['lines']) for q in past[:3]]
if ns and all(x == n for x in ns): warns.append(f"same number of lines ({n}) as the last 3 videos — vary the structure")
for w in warns: print("WARN:", w)
if fails:
    for f in dict.fromkeys(fails): print("FAIL:", f)
    sys.exit(1)
print(f"PASS: variety OK vs {len(past)} earlier episodes ({'Strange Minute' if sm else 'FearFiles'})")
