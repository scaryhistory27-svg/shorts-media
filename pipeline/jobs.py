#!/usr/bin/env python3
"""Production job state machine — one job per episode, persistent in series/jobs.json.

Stages (in order):
  planned -> scripted -> voiced -> rendered -> qa_passed -> uploaded -> scheduling -> scheduled -> published
Special statuses: needs_reconciliation (outcome of a Metricool call unknown), failed (with error).

Commands:
  jobs.py new --slot YYYY-MM-DD --series SLUG --ep N [--title T]   create (idempotent: returns existing job)
  jobs.py stage JOB STAGE [--set key=value ...]                     advance; refuses to go backwards (use --force)
  jobs.py can-schedule JOB          exit 0 = safe to call Metricool createScheduledPost; 3 = already scheduled/duplicate; 4 = not ready; 5 = needs reconciliation
  jobs.py uncertain JOB "reason"    mark needs_reconciliation (never retry blindly; reconcile via getScheduledPosts)
  jobs.py fail JOB "error"          record an error, retries += 1 (bounded: max 3, then stays failed)
  jobs.py status [--json]           unfinished jobs + last published (used by the SessionStart hook)
  jobs.py resume                    prints the job to resume and the next stage to run (exit 1 if nothing)
  jobs.py show JOB
  jobs.py next-slots [--now "YYYY-MM-DDTHH:MM"] [--horizon 36] [--max 2]   empty publish slots (LA time) from series/log.json "schedule"
Env JOBS_FILE overrides the path (used by tests). Writes are atomic (tmp + os.replace) under an exclusive flock.
"""
import argparse, contextlib, datetime as dt, fcntl, json, os, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PATH = os.environ.get("JOBS_FILE", os.path.join(ROOT, "series", "jobs.json"))
STAGES = ["planned", "scripted", "voiced", "rendered", "qa_passed", "uploaded", "scheduling", "scheduled", "published"]
MAX_RETRIES = 3

def now(): return dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

@contextlib.contextmanager
def locked():
    os.makedirs(os.path.dirname(PATH), exist_ok=True)
    with open(PATH + ".lock", "w") as lk:
        fcntl.flock(lk, fcntl.LOCK_EX)
        db = json.load(open(PATH)) if os.path.exists(PATH) else {"version": 1, "jobs": {}}
        yield db
        fd, tmp = tempfile.mkstemp(dir=os.path.dirname(PATH), prefix=".jobs.", suffix=".tmp")
        with os.fdopen(fd, "w") as f:
            json.dump(db, f, indent=1, ensure_ascii=False); f.write("\n"); f.flush(); os.fsync(f.fileno())
        os.replace(tmp, PATH)

def read():
    return json.load(open(PATH)) if os.path.exists(PATH) else {"version": 1, "jobs": {}}

def job_id(slot, series, ep): return f"{slot}-{series}-ep{int(ep)}"

def kv(pairs):
    out = {}
    for p in pairs or []:
        k, _, v = p.partition("=")
        try: v = json.loads(v)
        except Exception: pass
        out[k] = v
    return out

def cmd_new(a):
    jid = job_id(a.slot, a.series, a.ep)
    with locked() as db:
        for j in db["jobs"].values():  # same episode already has a job under another slot -> reuse it
            if j["series"] == a.series and j["episode"] == int(a.ep) and j["id"] != jid:
                print(json.dumps({"exists": True, "job": j}, ensure_ascii=False)); return 0
        if jid in db["jobs"]:
            print(json.dumps({"exists": True, "job": db["jobs"][jid]}, ensure_ascii=False)); return 0
        db["jobs"][jid] = {"id": jid, "slot": a.slot, "series": a.series, "episode": int(a.ep), "title": a.title or "",
                           "stage": "planned", "status": "active", "history": [{"stage": "planned", "at": now()}],
                           "retries": 0, "errors": [], "created": now(), "updated": now()}
        print(json.dumps({"exists": False, "job": db["jobs"][jid]}, ensure_ascii=False))
    return 0

def cmd_stage(a):
    with locked() as db:
        j = db["jobs"].get(a.job)
        if not j: print("unknown job", a.job, file=sys.stderr); return 2
        if a.stage not in STAGES: print("unknown stage", a.stage, file=sys.stderr); return 2
        cur, new = STAGES.index(j["stage"]), STAGES.index(a.stage)
        if new < cur and not a.force:
            print(f"refused: {a.job} is at '{j['stage']}', will not go back to '{a.stage}' (use --force)", file=sys.stderr); return 3
        if j.get("status") == "needs_reconciliation" and a.stage not in ("scheduled", "published") and not a.force:
            print(f"refused: {a.job} needs reconciliation — only 'scheduled'/'published' (verified in Metricool) may be recorded", file=sys.stderr); return 3
        if j.get("status") == "failed" and not a.force:
            print(f"refused: {a.job} is failed (retries exhausted) — use --force after manual review", file=sys.stderr); return 3
        j["stage"] = a.stage; j["updated"] = now(); j["history"].append({"stage": a.stage, "at": now()})
        j["status"] = "done" if a.stage == "published" else "active"
        j.update(kv(a.set))
        print(json.dumps(j, ensure_ascii=False))
    return 0

def cmd_can_schedule(a):
    db = read(); j = db["jobs"].get(a.job)
    if not j: print("unknown job"); return 2
    if j.get("status") == "needs_reconciliation" or j["stage"] == "scheduling":
        print("RECONCILE: a previous Metricool call may have succeeded — check getScheduledPosts for this title/slot first"); return 5
    if j.get("metricool_id") or STAGES.index(j["stage"]) >= STAGES.index("scheduled"):
        print(f"DUPLICATE: already scheduled (metricool_id={j.get('metricool_id')})"); return 3
    for o in db["jobs"].values():
        if o["id"] != j["id"] and o.get("metricool_id") and (o["slot"] == j["slot"] and o["series"] == j["series"] and o["episode"] == j["episode"]
                                                             or (j.get("title") and o.get("title") == j.get("title"))):
            print(f"DUPLICATE: job {o['id']} already scheduled the same episode/title"); return 3
    if STAGES.index(j["stage"]) < STAGES.index("qa_passed"):
        print(f"NOT READY: stage is '{j['stage']}', QA must pass first"); return 4
    print("OK"); return 0

def cmd_uncertain(a):
    with locked() as db:
        j = db["jobs"][a.job]; j["status"] = "needs_reconciliation"; j["updated"] = now()
        j["errors"].append({"at": now(), "error": "UNCERTAIN: " + a.reason}); print(json.dumps(j, ensure_ascii=False))
    return 0

def cmd_fail(a):
    with locked() as db:
        j = db["jobs"][a.job]; j["retries"] = j.get("retries", 0) + 1; j["updated"] = now()
        j["errors"].append({"at": now(), "stage": j["stage"], "error": a.error})
        if j["retries"] >= MAX_RETRIES: j["status"] = "failed"
        print(json.dumps({"id": j["id"], "retries": j["retries"], "status": j["status"]})); return 0 if j["status"] != "failed" else 6

def unfinished(db): return [j for j in db["jobs"].values() if j.get("status") != "done" and j["stage"] != "published"]

def cmd_status(a):
    db = read(); un = unfinished(db)
    pub = sorted([j for j in db["jobs"].values() if j["stage"] in ("scheduled", "published")], key=lambda j: j["slot"])
    if a.json: print(json.dumps({"unfinished": un, "last_scheduled_or_published": pub[-1] if pub else None}, ensure_ascii=False, indent=1)); return 0
    print(f"jobs file: {os.path.relpath(PATH, ROOT)} — {len(db['jobs'])} jobs")
    for j in pub[-3:]: print(f"  done/scheduled: {j['id']}  stage={j['stage']}  title={j.get('title','')}  url={j.get('youtube_url','-')}")
    if not un: print("  no unfinished jobs")
    for j in un:
        print(f"  UNFINISHED: {j['id']}  stage={j['stage']}  status={j.get('status')}  retries={j.get('retries',0)}"
              + (f"  last_error={j['errors'][-1]['error']}" if j.get("errors") else ""))
    return 0

def cmd_resume(a):
    un = sorted(unfinished(read()), key=lambda j: j["slot"])
    if not un: print("nothing to resume"); return 1
    j = un[0]
    if j.get("status") == "needs_reconciliation" or j["stage"] == "scheduling":
        print(f"{j['id']}: RECONCILE first (getScheduledPosts, match title/slot) — never re-create blindly"); return 0
    if j.get("status") == "failed": print(f"{j['id']}: FAILED after {j['retries']} retries — report to owner, do not retry automatically"); return 0
    nxt = STAGES[min(STAGES.index(j["stage"]) + 1, len(STAGES) - 1)]
    print(f"{j['id']}: last verified stage '{j['stage']}', next stage '{nxt}'"); return 0

def cmd_show(a): print(json.dumps(read()["jobs"].get(a.job), ensure_ascii=False, indent=1)); return 0

def slots_from_schedule(sched, start, end):
    out = []
    for r in sched:
        d = dt.date.fromisoformat(r["from"]); last = dt.date.fromisoformat(r["to"]) if r.get("to") else end.date()
        step = r.get("every_days", 1)
        while d <= last and d <= end.date():
            for t in r["times"]:
                s = dt.datetime.fromisoformat(f"{d}T{t}")
                if start < s <= end: out.append(s)
            d += dt.timedelta(days=step)
    return sorted(set(out))

def cmd_next_slots(a):
    log = json.load(open(os.environ.get("LOG_FILE", os.path.join(ROOT, "series", "log.json"))))
    if a.now: now_ = dt.datetime.fromisoformat(a.now)
    else:
        from zoneinfo import ZoneInfo
        now_ = dt.datetime.now(ZoneInfo(log.get("schedule_tz", "America/Los_Angeles"))).replace(tzinfo=None, second=0, microsecond=0)
    taken = {j["slot"] for j in read()["jobs"].values() if j.get("status") != "failed"}
    taken |= {j["slot"][:10] + "T16:00" for j in read()["jobs"].values() if len(j["slot"]) == 10}  # legacy date-only slots = 16:00
    free = [s for s in slots_from_schedule(log["schedule"], now_ + dt.timedelta(hours=1), now_ + dt.timedelta(hours=a.horizon))
            if s.strftime("%Y-%m-%dT%H:%M") not in taken][: a.max]
    for s in free: print(s.strftime("%Y-%m-%dT%H:%M"))
    return 0 if free else 1

def main():
    p = argparse.ArgumentParser(); s = p.add_subparsers(dest="c", required=True)
    n = s.add_parser("new"); n.add_argument("--slot", required=True); n.add_argument("--series", required=True); n.add_argument("--ep", required=True, type=int); n.add_argument("--title")
    st = s.add_parser("stage"); st.add_argument("job"); st.add_argument("stage"); st.add_argument("--set", nargs="*"); st.add_argument("--force", action="store_true")
    c = s.add_parser("can-schedule"); c.add_argument("job")
    u = s.add_parser("uncertain"); u.add_argument("job"); u.add_argument("reason")
    f = s.add_parser("fail"); f.add_argument("job"); f.add_argument("error")
    ss = s.add_parser("status"); ss.add_argument("--json", action="store_true")
    s.add_parser("resume")
    sh = s.add_parser("show"); sh.add_argument("job")
    ns = s.add_parser("next-slots"); ns.add_argument("--now"); ns.add_argument("--horizon", type=float, default=36); ns.add_argument("--max", type=int, default=2)
    a = p.parse_args()
    return {"new": cmd_new, "stage": cmd_stage, "can-schedule": cmd_can_schedule, "uncertain": cmd_uncertain, "fail": cmd_fail,
            "status": cmd_status, "resume": cmd_resume, "show": cmd_show, "next-slots": cmd_next_slots}[a.c](a)

if __name__ == "__main__":
    sys.exit(main())
