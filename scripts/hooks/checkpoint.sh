#!/bin/bash
# Stop / PreCompact hook: safe Git checkpoint of project memory + production state, then push (bounded retries).
# Never blocks Claude (always exit 0), never force-pushes, never commits videos/builds/secrets, skips while a render runs.
EVENT=${1:-stop}
[ -n "${CHECKPOINT_RUNNING:-}" ] && exit 0; export CHECKPOINT_RUNNING=1          # recursion guard
cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}" 2>/dev/null || exit 0
cat >/dev/null 2>&1 || true                                                     # drain hook JSON on stdin
mkdir -p .claude/state; LOG=.claude/state/checkpoint.log
log(){ echo "$(date -u +%FT%TZ) [$EVENT] $*" >> "$LOG"; }
exec 9>.git/checkpoint.lock; flock -n 9 || { log "another checkpoint running, skip"; exit 0; }
[ -d .git/rebase-merge ] || [ -d .git/rebase-apply ] || [ -f .git/MERGE_HEAD ] && { log "git busy (rebase/merge), skip"; exit 0; }
pgrep -f "pipeline/render.js" >/dev/null && { log "render in progress, skip"; exit 0; }
if [ "$EVENT" = precompact ] && [ -f docs/SESSION_HANDOFF.md ]; then             # timestamped auto-handoff entry (atomic)
  T=$(mktemp docs/.handoff.XXXX); { echo "## $(date -u +%FT%TZ) — auto checkpoint before context compaction"; echo; echo '```'; python3 pipeline/jobs.py status 2>&1 | head -12; python3 pipeline/jobs.py resume 2>&1 | head -2; echo "HEAD: $(git log --oneline -1)"; echo '```'; echo; cat docs/SESSION_HANDOFF.md; } > "$T" && mv "$T" docs/SESSION_HANDOFF.md
fi
PATHS=(CLAUDE.md docs series/log.json series/jobs.json pipeline tests scripts .gitignore)
for f in series/*/plan.md series/*/ep*/episode.json series/*/ep*/scenes.js; do [ -e "$f" ] && PATHS+=("$f"); done
[ -z "$(git status --porcelain -- "${PATHS[@]}" 2>/dev/null)" ] && exit 0      # nothing changed -> no duplicate commit
git add -- "${PATHS[@]}" 2>/dev/null
if git diff --cached | grep -E '^\+' | grep -qiE '(sk-[a-z0-9_-]{16,}|ghp_[A-Za-z0-9]{20,}|github_pat_|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY|ya29\.|AIza[0-9A-Za-z_-]{30,}|(api[_-]?key|secret|password|token)["'"'"' ]*[:=]["'"'"' ]*[A-Za-z0-9_\-]{12,})'; then
  git reset -q; log "possible secret in diff — checkpoint ABORTED, nothing committed"; exit 0; fi
N=$(git diff --cached --name-only | wc -l)
git -c user.name="scaryhistory27-svg" -c user.email="scaryhistory27-svg@users.noreply.github.com" commit -q -m "auto-checkpoint ($EVENT): $N file(s)" || { log "commit failed"; exit 0; }
for i in 1 2 3; do
  timeout 60 git push -q origin HEAD:main 2>>"$LOG" && { log "committed+pushed $N file(s)"; exit 0; }
  timeout 60 git pull -q --rebase origin main 2>>"$LOG" || { git rebase --abort 2>/dev/null; log "pull --rebase failed (kept local commit)"; }
  sleep $((i*3))
done
log "push failed 3x — local commit kept, will retry at next checkpoint"; exit 0
