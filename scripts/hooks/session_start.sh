#!/bin/bash
# SessionStart hook: restore project memory into the new session's context (stdout is added to context).
# Read-only except a fast-forward pull. Never renders, never publishes.
cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}" 2>/dev/null || exit 0
SRC=$(cat 2>/dev/null | python3 -c 'import sys,json
try: print(json.load(sys.stdin).get("source","manual"))
except Exception: print("manual")' 2>/dev/null)
timeout 20 git pull -q --ff-only >/dev/null 2>&1 || true
echo "=== PROJECT MEMORY RESTORED (SessionStart hook, source=${SRC:-manual}) — do NOT publish anything just because a session started ==="
[ "$SRC" = compact ] && echo "Context was just compacted in THIS session. Continue the unfinished task from the handoff/jobs below."
[ -f docs/CURRENT_STATE.md ] && { echo; cat docs/CURRENT_STATE.md; }
if [ -f docs/SESSION_HANDOFF.md ]; then echo; echo "--- latest handoff (docs/SESSION_HANDOFF.md, newest first) ---"; sed -n '1,45p' docs/SESSION_HANDOFF.md; fi
echo; echo "--- production jobs (pipeline/jobs.py) ---"; python3 pipeline/jobs.py status 2>&1 | head -20; python3 pipeline/jobs.py resume 2>&1 | head -3
[ -f .claude/state/recent_requests.md ] && { echo; echo "--- owner's recent requests (local, last 15) ---"; tail -15 .claude/state/recent_requests.md; }
[ -f .claude/state/checkpoint.log ] && { echo; echo "--- last checkpoint ---"; grep -E "pushed|failed|ABORT" .claude/state/checkpoint.log | tail -1; }
echo; echo "--- git ---"; git log --oneline -5 2>/dev/null; echo "uncommitted files: $(git status --porcelain 2>/dev/null | wc -l)"
echo; echo "Details: docs/PROJECT_MEMORY.md, docs/WORKFLOW.md, docs/CREATIVE_RULES.md, docs/DECISIONS.md, docs/RECOVERY_GUIDE.md (read only what the task needs)."
exit 0
