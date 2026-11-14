# WORKFLOW (one episode = one job)
1. `git pull`; read CLAUDE.md; `python3 pipeline/jobs.py resume` — if a job is unfinished, continue it from its last verified stage.
2. Posting-time check (CLAUDE.md "Posting time").
3. Cadence → slot date. `jobs.py new --slot <date> --series <slug> --ep <n> --title "<YouTube title>"` (idempotent).
4. Write series/<slug>/ep<n>/episode.json + scenes.js → `jobs.py stage <id> scripted`
5. `bash setup.sh; python3 pipeline/tts.py $E` → `stage voiced`
6. `python3 pipeline/timeline.py $E; node pipeline/render.js $E preview|(full)|cover` → `stage rendered`
7. QA (CLAUDE.md) passes → `stage qa_passed`
8. copy mp4 + cover to videos/, commit, push → `stage uploaded`
9. `jobs.py can-schedule <id>` must print OK (exit 0). Also getScheduledPosts: no post with the same title. Then
   `stage scheduling` → Metricool createScheduledPost → on success `stage scheduled --set metricool_id=<id> metricool_uuid='"<uuid>"' publish='"<iso>"'`;
   if the call errored/timed out → `jobs.py uncertain <id> "<what happened>"` and reconcile with getScheduledPosts (match title + date). Never call create twice blindly.
10. git rm videos files; update log.json; commit + push. Report to owner.
11. Later runs: when getScheduledPosts shows PUBLISHED → `stage published --set youtube_id='"…"' youtube_url='"…"'`.
Failures: `jobs.py fail <id> "<error>"` (max 3, then status failed → report, no auto-retry).
