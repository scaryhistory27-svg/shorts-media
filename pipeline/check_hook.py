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
            r"^(this is what happens|here's what happens|here's how|how to survive|nobody (tells|told)|no one (knows|tells))", r"^(it came back|it's (\d|one|two|three)|at (\d|exactly)|last night|yesterday,|two (days|nights) ago,|2 (days|nights) ago,)",
            r"\b(again|still|never|nobody|no one|wasn't|isn't|shouldn't|didn't)\b",
            r"^(what (if|would happen|happens)|if (the|you|earth|every|all)|you('ve| have) (never|been)|scientists|this (tiny|one|small))"]   # Strange Minute (channel 2) curiosity hooks
if not any(re.search(p, low) for p in PATTERNS): fails.append("line 1 is not a warning / impossible fact / 'I tried X' / cliffhanger-recap pattern")
try:
    tl = json.load(open(f"{E}/build/timeline.json")); s0 = tl["segs"][0]
    if s0["words"][0]["s"] > 0.4: fails.append(f"first word starts at {s0['words'][0]['s']:.2f}s (max 0.4)")
    if s0["d"] > 2.8: fails.append(f"hook line lasts {s0['d']:.2f}s (max 2.8)")
    if ep.get("style") == "light":   # Strange Minute (owner 2026-11-17): voice asks the question first, clean — then a small ding, then the story
        if any(e["t"] < s0["s"] + s0["d"] for e in tl["events"]): fails.append("light style: no sound under the hook question (put a 'ding' with at:'end')")
        if not any(s0["s"] + s0["d"] <= e["t"] < s0["e"] + 0.3 for e in tl["events"]): fails.append("light style: missing the small ding right after the hook question")
    else:   # horror (owner 2026-11-17: the loud start boom masked "Never") — the first words must be clean, the hit comes right after the hook line
        loud = [e for e in tl["events"] if e["type"] in ("hit", "sting", "knock", "knockglass", "thud", "heart") and e["t"] < s0["s"] + s0["d"] - 0.05]
        if loud: fails.append("horror: no hit/sting under the hook line — put a 'thud' with at:'end' on line 1")
        if any(e["type"] in ("hit", "sting", "thud") and s0["s"] + s0["d"] - 0.05 <= e["t"] < s0["e"] + 1.5 for e in tl["events"]): fails.append("horror: no impact sound right after the hook either (owner 2026-11-17: it talks over the text)")
except FileNotFoundError: pass
print(("FAIL: " + "; ".join(fails)) if fails else f"PASS: \"{first}\""); sys.exit(1 if fails else 0)
