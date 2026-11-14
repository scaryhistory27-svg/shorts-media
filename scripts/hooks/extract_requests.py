#!/usr/bin/env python3
"""Extract the owner's recent typed requests from a Claude Code transcript (.jsonl) for post-compaction reload.
Output stays LOCAL (.claude/state, gitignored) — the repo is public. Emails/tokens are masked."""
import json, re, sys
rows = []
for line in open(sys.argv[1], encoding="utf-8", errors="ignore"):
    try: e = json.loads(line)
    except Exception: continue
    if e.get("type") != "user" or e.get("isMeta") or e.get("isSynthetic"): continue
    c = (e.get("message") or {}).get("content")
    if isinstance(c, list): c = " ".join(x.get("text", "") for x in c if isinstance(x, dict) and x.get("type") == "text")
    if not isinstance(c, str) or not c.strip() or c.lstrip().startswith("<") : continue
    c = re.sub(r"[\w.+-]+@[\w-]+\.[\w.]+", "<email>", c)
    c = re.sub(r"(sk-|ghp_|github_pat_|AKIA|ya29\.)[\w-]+", "<secret>", c)
    rows.append((e.get("timestamp", ""), " ".join(c.split())[:600]))
print("# Owner's recent requests (local only, extracted before compaction)\n")
for ts, t in rows[-40:]: print(f"- {ts[:16]} {t}")
