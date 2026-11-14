# RECOVERY GUIDE
- **Fresh container / new session:** repo missing → add_repo(scaryhistory27-svg/shorts-media, push) + clone. SessionStart hook prints state; else run `bash scripts/hooks/session_start.sh`.
- **Interrupted job:** `python3 pipeline/jobs.py resume` → continue from the printed next stage. Built files live in series/<slug>/ep<n>/build (not in git): if missing, redo from `voiced` (tts) — script/scenes are in git.
- **Unknown Metricool outcome (stage `scheduling` or status needs_reconciliation):** getScheduledPosts for the slot day ±1; if a post with the same title exists → `stage scheduled --set metricool_id=…`; if none → `stage uploaded --force` then schedule once.
- **Missing model/deps:** `bash setup.sh` (Kokoro from GitHub releases ~350 MB).
- **Bad change:** baseline branch `backup/baseline-2026-11-14`; `git revert <commit>` (never reset/force-push).
- **Checkpoint/push problems:** see `.claude/state/checkpoint.log` (local, not in git).
- **Scheduler check:** list_triggers → exactly one "Horror Shorts autopilot", daily 10:41 LA.
- **After automatic context compaction (same session):** the SessionStart hook (source=compact) prints memory; if it did not, run `bash scripts/hooks/session_start.sh` and `python3 pipeline/jobs.py resume`, then continue the task.
- **Context check:** get_session → external_metadata.context_usage; compaction is automatic at ~901,600 tokens.
