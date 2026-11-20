"""Channel review for the autopilot (owner 2026-11-19: "review both channels every run — what took off, which hour gets most views — and decide").

Usage:
  python3 pipeline/analytics.py add <stats.json>   # append a snapshot (vidIQ vidiq_get_videos_by_ids output, or a list of video dicts)
  python3 pipeline/analytics.py report             # print + write reports/analytics-latest.md

Each snapshot row: id, title, channelTitle, publishedAt (UTC ISO), viewCount, likeCount, commentCount.
Snapshots accumulate in reports/stats_history.jsonl, so views at ~24 h after publishing can be estimated
(interpolated between snapshots) — a fair comparison between old and new videos and between publish hours.
"""
import json, sys, os, datetime as dt
from zoneinfo import ZoneInfo

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HIST = os.path.join(ROOT, "reports", "stats_history.jsonl")
OUT = os.path.join(ROOT, "reports", "analytics-latest.md")
LA = ZoneInfo("America/Los_Angeles")


def parse(ts):
    return dt.datetime.fromisoformat(ts.replace("Z", "+00:00"))


def add(path):
    data = json.load(open(path))
    vids = data.get("videos", data) if isinstance(data, dict) else data
    now = dt.datetime.now(dt.timezone.utc).isoformat()
    os.makedirs(os.path.dirname(HIST), exist_ok=True)
    with open(HIST, "a") as f:
        for v in vids:
            f.write(json.dumps({"at": now, "id": v["id"], "title": v.get("title", ""), "channel": v.get("channelTitle", ""),
                                "published": v.get("publishedAt"), "views": int(v.get("viewCount") or 0),
                                "likes": int(v.get("likeCount") or 0), "comments": int(v.get("commentCount") or 0)}, ensure_ascii=False) + "\n")
    print(f"added {len(vids)} rows")


def views_at(snaps, pub, hours):
    """Views ~`hours` after publishing, interpolated between snapshots (None if no snapshot covers it)."""
    pts = sorted(((parse(s["at"]) - pub).total_seconds() / 3600, s["views"]) for s in snaps)
    pts = [(0.0, 0)] + pts
    for (h0, v0), (h1, v1) in zip(pts, pts[1:]):
        if h0 <= hours <= h1:
            return v0 + (v1 - v0) * (hours - h0) / max(h1 - h0, 1e-6)
    return None


def report():
    if not os.path.exists(HIST):
        print("no snapshots yet"); return
    rows = [json.loads(l) for l in open(HIST) if l.strip()]
    by = {}
    for r in rows:
        by.setdefault(r["id"], []).append(r)
    now = dt.datetime.now(dt.timezone.utc)
    vids = []
    for vid, snaps in by.items():
        last = max(snaps, key=lambda s: s["at"])
        pub = parse(last["published"])
        age = max((now - pub).total_seconds() / 3600, 0.5)
        la = pub.astimezone(LA)
        v24 = views_at(snaps, pub, 24)
        vids.append({"id": vid, "title": last["title"], "channel": last["channel"], "pub_la": la.strftime("%a %m-%d %H:%M"),
                     "hour": la.hour, "wd": la.strftime("%a"), "age_h": age, "views": last["views"], "likes": last["likes"],
                     "comments": last["comments"], "vph": last["views"] / age, "v24": v24})
    lines = [f"# Channel review — {now.astimezone(LA):%Y-%m-%d %H:%M} LA", ""]
    for ch in sorted({v["channel"] for v in vids}):
        cv = sorted([v for v in vids if v["channel"] == ch], key=lambda v: -(v["v24"] or v["views"] * min(1, 24 / v["age_h"])))
        lines += [f"## {ch}", "", "| # | video | published (LA) | age h | views | ~24 h | views/h | likes | comments |", "|---|---|---|---|---|---|---|---|---|"]
        for i, v in enumerate(cv, 1):
            lines.append(f"| {i} | {v['title'][:48]} | {v['pub_la']} | {v['age_h']:.0f} | {v['views']} | "
                         f"{'%.0f' % v['v24'] if v['v24'] is not None else '–'} | {v['vph']:.1f} | {v['likes']} | {v['comments']} |")
        hours = {}
        for v in cv:
            score = v["v24"] if v["v24"] is not None else v["views"] * min(1, 24 / v["age_h"])
            hours.setdefault(v["hour"], []).append(score)
        lines += ["", "By publish hour (LA) — avg views in the first ~24 h:", ""]
        for h in sorted(hours, key=lambda h: -sum(hours[h]) / len(hours[h])):
            lines.append(f"- {h:02d}:00 → {sum(hours[h]) / len(hours[h]):.0f} (n={len(hours[h])})")
        lines.append("")
    txt = "\n".join(lines)
    open(OUT, "w").write(txt + "\n")
    print(txt)


if __name__ == "__main__":
    if len(sys.argv) >= 3 and sys.argv[1] == "add":
        add(sys.argv[2])
    elif len(sys.argv) >= 2 and sys.argv[1] == "report":
        report()
    else:
        print(__doc__)
