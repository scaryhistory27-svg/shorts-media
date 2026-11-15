#!/usr/bin/env python3
"""Hook gate (owner: the video must grab people from the very first second — no greetings, no intro).
Usage: python3 pipeline/check_hook.py <episode_dir>   exit 0 = PASS, 1 = FAIL (fix line 1 and re-render).
Checks line 1 of episode.json (+ build/timeline.json if present)."""
import json, re, sys
E = sys.argv[1]; ep = json.load(open(f"{E}/episode.json")); first = ep["lines"][0]["text"]; low = first.lower()
fails = []
BANNED = r"\b(hi|hello|hey guys|welcome|today|in this video|subscribe|let me tell you|story time|storytime|so,|ok so|this is a story)\b"
if re.search(BANNED, low): fails.append("greeting/intro words in line 1")
words = len(first.split())
if words > 12: fails.append(f"line 1 too long ({words} words, max 12)")
PATTERNS = [r"^(never|don't|do not|whatever you do|stop|if you (ever )?(hear|see|find|get|wake|try)|when you)", r"^(i tried|i found|i heard|i saw|my \w+ (started|stopped|called|texted|knocked|whispered))",
            r"^(this is what happens|here's what happens|nobody (tells|told)|no one (knows|tells))", r"^(it came back|it's (\d|one|two|three)|at (\d|exactly)|last night)",
            r"\b(again|still|never|nobody|no one|wasn't|isn't|shouldn't|didn't)\b"]
if not any(re.search(p, low) for p in PATTERNS): fails.append("line 1 is not a warning / impossible fact / 'I tried X' / cliffhanger-recap pattern")
try:
    tl = json.load(open(f"{E}/build/timeline.json")); s0 = tl["segs"][0]
    if s0["words"][0]["s"] > 0.4: fails.append(f"first word starts at {s0['words'][0]['s']:.2f}s (max 0.4)")
    if s0["d"] > 2.8: fails.append(f"hook line lasts {s0['d']:.2f}s (max 2.8)")
    if not any(e["t"] < 0.6 for e in tl["events"]): fails.append("no sound hit (hit/sting/knock/whoosh) in the first 0.6 s")
except FileNotFoundError: pass
print(("FAIL: " + "; ".join(fails)) if fails else f"PASS: \"{first}\""); sys.exit(1 if fails else 0)
